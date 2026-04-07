import {
  createWebProviderRuntime,
  type WebLaneContext,
  type WebProviderRuntime,
  type WebSessionSnapshot,
} from "../../../../lanes/web/src/index.js";
import {
  QWEN_INVOKE_HANDOFF,
  QWEN_INVOKE_MODE,
  invokeQwenTransport,
} from "./transport.js";
import { invokeQwenBrowserSessionTransport } from "./browser-session-transport.js";
import { QWEN_WEB_LIVE_PROOF_ENV_NAMES } from "./live-proof.js";
import { hasRequiredEnvValues } from "../../shared/http-transport.js";

const QWEN_CAPABILITIES = {
  textGeneration: true,
  streaming: true,
  toolCalling: true,
  imageInput: true,
  webLogin: true,
  officialApi: false,
} as const;

const QWEN_MISSING_ARTIFACTS = [
  "browser-profile",
  "session-cookie",
  "session-token",
] as const;

const QWEN_SESSION_CONTRACT_NOTE =
  "Artifact contract: keep one local browser profile, chat.qwen.ai cookies, and the captured session token bound to the same end-user account. Probe contract: only treat the slot as ready after the authenticated workspace and composer bootstrap load from that same profile.";

const QWEN_REAUTH_ACTION =
  "Refresh the Qwen browser session, recapture chat.qwen.ai cookies/session token, and re-probe the authenticated workspace plus composer before resuming traffic.";

const QWEN_BLOCKED_DEGRADED_REASON =
  "Qwen baseline stays blocked when the authenticated workspace/composer probe turns stale, even if cached cookies still exist.";

const QWEN_PROVIDER_UNAVAILABLE_REASON =
  "Local Qwen artifacts remain present, but the authenticated workspace/composer probe cannot confirm upstream reachability right now.";

const QWEN_CAPTURE_HANDOFF =
  "Open https://chat.qwen.ai in the attached browser profile, confirm the authenticated workspace and composer bootstrap, then capture the chat.qwen.ai session cookie, the current session token, and the active user agent.";

const QWEN_PROBE_HANDOFF =
  "Re-probe the authenticated Qwen workspace and composer bootstrap from the same local profile before routing live traffic.";

const QWEN_REFRESH_HANDOFF =
  "Reuse the attached Qwen browser profile to refresh the authenticated workspace/composer probe and recapture the session cookie plus session token before resuming traffic.";
function qwenArtifacts(state: WebSessionSnapshot["state"]) {
  const present = state !== "missing";

  return {
    browserProfile: present,
    sessionCookie: present,
    oauthToken: false,
  } as const;
}

function applyQwenSessionContract(
  session: Partial<WebSessionSnapshot> = {},
): WebSessionSnapshot {
  const note = session.note ?? QWEN_SESSION_CONTRACT_NOTE;
  const state = session.state ?? "missing";

  switch (state) {
    case "missing":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? qwenArtifacts(state),
        missingArtifacts: session.missingArtifacts ?? [...QWEN_MISSING_ARTIFACTS],
        requiredUserAction: session.requiredUserAction ?? QWEN_REAUTH_ACTION,
      };
    case "expiring":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? qwenArtifacts(state),
        requiredUserAction: session.requiredUserAction ?? QWEN_REAUTH_ACTION,
      };
    case "refreshable-but-degraded":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? qwenArtifacts(state),
        refreshEligible: session.refreshEligible ?? true,
        requiredUserAction: session.requiredUserAction ?? QWEN_REAUTH_ACTION,
        degradedReason: session.degradedReason ?? QWEN_BLOCKED_DEGRADED_REASON,
      };
    case "expired":
    case "user-action-required":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? qwenArtifacts(state),
        requiredUserAction: session.requiredUserAction ?? QWEN_REAUTH_ACTION,
      };
    case "provider-unavailable":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? qwenArtifacts(state),
        degradedReason: session.degradedReason ?? QWEN_PROVIDER_UNAVAILABLE_REASON,
      };
    case "ready":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? qwenArtifacts(state),
      };
  }
}

function withQwenSessionContract(context: WebLaneContext = {}): WebLaneContext {
  return {
    ...context,
    sessions: {
      ...context.sessions,
      qwen: applyQwenSessionContract(context.sessions?.qwen),
    },
  };
}

export function createQwenWebRuntime(): WebProviderRuntime {
  const baseRuntime = createWebProviderRuntime({
    descriptor: {
      provider: "qwen",
      displayName: "Qwen Web",
      stabilityTarget: "baseline",
      degradedInvocationPolicy: "block",
      authProfile: {
        mode: "browser-session",
        loginUrl: "https://chat.qwen.ai",
        accountLabel: "qwen:default",
        sessionSource: "qwen-browser-profile",
      },
      capabilities: QWEN_CAPABILITIES,
      models: [
        {
          id: "qwen3.5-plus",
          displayName: "Qwen 3.5 Plus",
          contextWindow: 131072,
          maxOutputTokens: 8192,
          capabilities: QWEN_CAPABILITIES,
          alias: "default",
        },
        {
          id: "qwen3.5-turbo",
          displayName: "Qwen 3.5 Turbo",
          contextWindow: 131072,
          maxOutputTokens: 8192,
          capabilities: QWEN_CAPABILITIES,
        },
      ],
      notes: [
        "Qwen Web remains a Web/Login provider, not a consumer or fallback API path.",
        "Local session ownership stays with the end user.",
        "Baseline target: refreshable degraded sessions stay blocked until the user renews them and the authenticated workspace/composer probe passes again.",
      ],
    },
    defaults: {
      state: "missing",
    },
    sessionContract: {
      probeSource: "qwen-workspace-composer-probe",
      probeMode: "qwen-workspace-composer-probe",
      probeHandoff: QWEN_PROBE_HANDOFF,
      artifacts: [
        {
          id: "browser-profile",
          label: "Attached browser profile",
          kind: "browser-profile",
          required: true,
          source: "browser-profile",
          description:
            "The local Chrome/Chromium profile attached to the authenticated Qwen session.",
        },
        {
          id: "session-cookie",
          label: "Qwen session cookie",
          kind: "session-cookie",
          required: true,
          source: "cookie-store",
          description:
            "The chat.qwen.ai cookie material reused for the authenticated workspace/composer transport.",
        },
        {
          id: "session-token",
          label: "Captured Qwen session token",
          kind: "session-token",
          required: true,
          source: "request-capture",
          description:
            "The session token captured from the authenticated Qwen browser workspace.",
        },
        {
          id: "user-agent",
          label: "Browser user agent",
          kind: "user-agent",
          required: false,
          source: "runtime-derivation",
          description:
            "The user agent captured alongside the authenticated Qwen browser session.",
        },
      ],
      capture: {
        mode: "qwen-browser-workspace-capture",
        referenceUrl: "https://chat.qwen.ai",
        handoff: QWEN_CAPTURE_HANDOFF,
        artifactIds: [
          "browser-profile",
          "session-cookie",
          "session-token",
        ],
      },
      refresh: {
        supported: true,
        mode: "qwen-workspace-composer-refresh",
        handoff: QWEN_REFRESH_HANDOFF,
      },
      reAuth: {
        mode: "qwen-browser-session-reauth",
        handoff: QWEN_REAUTH_ACTION,
      },
    },
    invokeContract: {
      kind: "synthetic-demo",
      mode: QWEN_INVOKE_MODE,
      handoff: QWEN_INVOKE_HANDOFF,
      reason:
        "Qwen Web currently returns a descriptive alpha stub, not a real authenticated workspace transport response.",
    },
    hasInvokeTransport: (context) =>
      hasRequiredEnvValues(QWEN_WEB_LIVE_PROOF_ENV_NAMES, context.env ?? process.env),
    invokeTransport: async (args) => {
      try {
        return await invokeQwenTransport(args);
      } catch (error) {
        const message = error instanceof Error ? error.message.toLowerCase() : "";

        if (
          message.includes("unauthorized") ||
          message.includes("do not have permission") ||
          message.includes("contact your administrator") ||
          message.includes("http 401") ||
          message.includes("http 403")
        ) {
          return await invokeQwenBrowserSessionTransport({
            message: args.request.input,
            model: args.request.model,
            env: args.context.env ?? process.env,
          });
        }

        throw error;
      }
    },
  });

  return {
    descriptor: baseRuntime.descriptor,
    getStatus(context) {
      return baseRuntime.getStatus(withQwenSessionContract(context));
    },
    invoke(request, context) {
      return baseRuntime.invoke(request, withQwenSessionContract(context));
    },
  };
}
