import {
  createWebProviderRuntime,
  type SessionArtifactRecord,
  type SessionLifecyclePlan,
  type SessionProbeRecord,
  type WebProviderRuntime,
  type WebSessionContractEvaluation,
} from "../../../../lanes/web/src/index.js";
import { GEMINI_WEB_LIVE_PROOF_ENV_NAMES } from "./live-proof.js";
import { invokeGeminiBrowserDomTransport } from "./browser-dom-transport.js";
import { hasRequiredEnvValues } from "../../shared/http-transport.js";

const GEMINI_CAPABILITIES = {
  textGeneration: true,
  streaming: true,
  toolCalling: true,
  imageInput: true,
  webLogin: true,
  officialApi: false,
} as const;

const GEMINI_CAPTURE_HANDOFF =
  "Attach the user-owned Chrome profile on gemini.google.com/app, complete the Google login flow, then capture the full Google cookie jar plus the current browser user agent.";
const GEMINI_REFRESH_HANDOFF =
  "Refresh gemini.google.com/app in the attached browser profile and re-capture the Google SID / `__Secure-1PSID` cookie set before the browser OAuth session degrades further.";
const GEMINI_REAUTH_HANDOFF =
  "Re-run the Google account login at https://gemini.google.com/app in the attached browser profile and recapture the full cookie jar.";
const GEMINI_INVOKE_HANDOFF =
  "Reuse the attached browser profile on https://gemini.google.com/app, keep the surviving Google cookie jar bound to the same end-user account, then drive the Composer DOM submit path and collect the streamed reply text from the logged-in page.";
const GEMINI_INVOKE_MODE = "gemini-web-dom-composer";
function sanitizeSegment(value?: string): string {
  const sanitized = (value ?? "default")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return sanitized.length > 0 ? sanitized : "default";
}

function buildGeminiProviderMessageId(model: string, accountLabel?: string): string {
  return `gemini-web-${sanitizeSegment(model)}-${sanitizeSegment(accountLabel)}`;
}

function artifactState(
  artifactDetails: SessionArtifactRecord[],
  id: string,
): SessionArtifactRecord["state"] {
  return artifactDetails.find((artifact) => artifact.id === id)?.state ?? "missing";
}

function buildProbe(
  status: SessionProbeRecord["status"],
  summary: string,
  checkedAt?: string,
): SessionProbeRecord {
  return {
    status,
    source: "gemini-google-cookie-probe",
    checkedAt,
    summary,
  };
}

function buildRefreshPlan(
  status: SessionLifecyclePlan["status"],
  reason?: string,
): SessionLifecyclePlan {
  return {
    supported: true,
    status,
    mode: "gemini-google-cookie-refresh",
    handoff: GEMINI_REFRESH_HANDOFF,
    reason,
  };
}

function buildReAuthPlan(
  status: SessionLifecyclePlan["status"],
  reason?: string,
): SessionLifecyclePlan {
  return {
    supported: true,
    status,
    mode: "gemini-google-oauth-reauth",
    handoff: GEMINI_REAUTH_HANDOFF,
    reason,
  };
}

function evaluateGeminiSession(args: {
  session: { state: string };
  observedAt: string;
  artifactDetails: SessionArtifactRecord[];
}): WebSessionContractEvaluation {
  const sidState = artifactState(args.artifactDetails, "google-sid-cookie");
  const secure1pSidState = artifactState(
    args.artifactDetails,
    "google-secure-1psid",
  );
  const cookieBundleState = artifactState(args.artifactDetails, "cookie-bundle");

  const missingPrimaryCookies =
    sidState === "missing" && secure1pSidState === "missing";

  if (
    args.session.state !== "missing" &&
    args.session.state !== "provider-unavailable" &&
    (cookieBundleState === "missing" || missingPrimaryCookies)
  ) {
    const reason =
      "Gemini no longer has a recoverable Google browser-cookie set; the local OAuth session must be re-established by the user.";

    return {
      state: "user-action-required",
      validationState: "stale",
      requiredUserAction: GEMINI_REAUTH_HANDOFF,
      probe: buildProbe("re-auth-required", reason, args.observedAt),
      refreshEligible: false,
      refresh: buildRefreshPlan("blocked", reason),
      reAuth: buildReAuthPlan("required-now", reason),
    };
  }

  if (
    (sidState === "missing" || secure1pSidState === "missing") &&
    args.session.state !== "missing" &&
    args.session.state !== "provider-unavailable"
  ) {
    const reason =
      "Gemini still has a partial Google cookie set, but both SID and `__Secure-1PSID` should be re-captured before the session degrades further.";

    return {
      state:
        args.session.state === "expired"
          ? "expired"
          : "refreshable-but-degraded",
      validationState: "recovering",
      refreshEligible: true,
      degradedReason: reason,
      probe: buildProbe("refresh-recommended", reason, args.observedAt),
      refresh: buildRefreshPlan("available", reason),
      reAuth: buildReAuthPlan("not-needed"),
    };
  }

  const summary =
    "Gemini has the expected Google browser cookies from the attached OAuth session.";
  const probeStatus =
    args.session.state === "expiring"
      ? "refresh-recommended"
      : args.session.state === "refreshable-but-degraded"
        ? "refresh-recommended"
        : args.session.state === "ready"
          ? "session-valid"
          : undefined;

  if (!probeStatus) {
    return {};
  }

  return {
    probe: buildProbe(probeStatus, summary, args.observedAt),
    refresh:
      args.session.state === "expiring"
        ? buildRefreshPlan("available", "Gemini browser cookies are still valid but nearing expiry.")
        : undefined,
  };
}

export function createGeminiWebRuntime(): WebProviderRuntime {
  return createWebProviderRuntime({
    descriptor: {
      provider: "gemini",
      displayName: "Gemini Web",
      stabilityTarget: "high",
      degradedInvocationPolicy: "allow-with-warning",
      authProfile: {
        mode: "oauth",
        loginUrl: "https://gemini.google.com/app",
        accountLabel: "gemini:default",
        sessionSource: "gemini-google-oauth",
      },
      capabilities: GEMINI_CAPABILITIES,
      models: [
        {
          id: "gemini-2.5-pro",
          displayName: "Gemini 2.5 Pro",
          contextWindow: 1048576,
          maxOutputTokens: 8192,
          capabilities: GEMINI_CAPABILITIES,
          alias: "default",
        },
        {
          id: "gemini-2.5-flash",
          displayName: "Gemini 2.5 Flash",
          contextWindow: 1048576,
          maxOutputTokens: 8192,
          capabilities: GEMINI_CAPABILITIES,
        },
      ],
      notes: [
        "OAuth/browser-login provider path anchored to the Web/Login lane.",
        "Selective transplant target for Google session probe and refresh logic.",
        "High-stability target: degraded but refreshable sessions can continue with warnings.",
      ],
    },
    defaults: {
      state: "missing",
      note: "OAuth/browser session must be established locally before invocation.",
    },
    invokeContract: {
      kind: "synthetic-demo",
      mode: GEMINI_INVOKE_MODE,
      handoff: GEMINI_INVOKE_HANDOFF,
      reason:
        "Gemini Web currently returns a descriptive alpha stub, not a real browser-backed composer response.",
    },
    hasInvokeTransport: (context) =>
      hasRequiredEnvValues(GEMINI_WEB_LIVE_PROOF_ENV_NAMES, context.env ?? process.env),
    invokeTransport: async ({ request, status, context }) => {
      const accountLabel = status.session.accountLabel ?? "gemini:default";
      const text = await invokeGeminiBrowserDomTransport({
        message: request.input,
      }, context.env ?? process.env);

      return {
        outputText: text,
        providerMessageId: buildGeminiProviderMessageId(request.model, accountLabel),
      };
    },
    sessionContract: {
      probeSource: "gemini-google-cookie-probe",
      artifacts: [
        {
          id: "browser-profile",
          label: "Attached browser profile",
          kind: "browser-profile",
          required: true,
          source: "browser-profile",
          description: "The local Chrome profile attached to gemini.google.com over CDP.",
        },
        {
          id: "cookie-bundle",
          label: "Captured Google cookie bundle",
          kind: "cookie-bundle",
          required: true,
          source: "cookie-store",
          description:
            "The Google cookie jar captured from the user-owned Gemini browser session.",
        },
        {
          id: "google-sid-cookie",
          label: "Google SID cookie",
          kind: "oauth-cookie",
          required: true,
          source: "cookie-store",
          description:
            "The Google `SID` cookie used as one of Gemini's browser-login indicators.",
        },
        {
          id: "google-secure-1psid",
          label: "Google __Secure-1PSID cookie",
          kind: "oauth-cookie",
          required: true,
          source: "cookie-store",
          description:
            "The `__Secure-1PSID` cookie used by the Gemini browser flow as a stable auth signal.",
        },
        {
          id: "user-agent",
          label: "Browser user agent",
          kind: "user-agent",
          required: true,
          source: "runtime-derivation",
          description: "The browser user agent captured with the Gemini browser session.",
        },
      ],
      capture: {
        mode: "gemini-google-cookie-capture",
        referenceUrl: "https://gemini.google.com/app",
        handoff: GEMINI_CAPTURE_HANDOFF,
        artifactIds: [
          "browser-profile",
          "cookie-bundle",
          "google-sid-cookie",
          "google-secure-1psid",
          "user-agent",
        ],
      },
      refresh: {
        supported: true,
        mode: "gemini-google-cookie-refresh",
        handoff: GEMINI_REFRESH_HANDOFF,
      },
      reAuth: {
        mode: "gemini-google-oauth-reauth",
        handoff: GEMINI_REAUTH_HANDOFF,
      },
      evaluate: evaluateGeminiSession,
    },
  });
}
