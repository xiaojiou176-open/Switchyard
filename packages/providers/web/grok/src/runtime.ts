import { randomUUID } from "node:crypto";

import {
  createWebProviderRuntime,
  type WebLaneContext,
  type WebProviderRuntime,
  type WebSessionSnapshot,
} from "../../../../lanes/web/src/index.js";
import {
  GROK_INVOKE_HANDOFF,
  GROK_INVOKE_MODE,
  invokeGrokTransport,
} from "./transport.js";
import { GROK_WEB_LIVE_PROOF_ENV_NAMES } from "./live-proof.js";
import { hasRequiredEnvValues } from "../../shared/http-transport.js";

const GROK_CAPABILITIES = {
  textGeneration: true,
  streaming: true,
  toolCalling: true,
  imageInput: false,
  webLogin: true,
  officialApi: false,
} as const;

const GROK_MISSING_ARTIFACTS = [
  "browser-profile",
  "session-cookie",
  "oauth-browser-session",
] as const;

const GROK_SESSION_CONTRACT_NOTE =
  "Artifact contract: keep one local browser profile, grok.com cookies, and the Grok OAuth/browser session bound to the same end-user account. Probe contract: only treat the slot as ready after the authenticated Grok home and composer bootstrap succeed from that same profile.";

const GROK_REAUTH_ACTION =
  "Complete the Grok Web OAuth/browser login flow, then re-probe the authenticated Grok home and composer bootstrap from the same local profile.";

const GROK_BLOCKED_DEGRADED_REASON =
  "Grok baseline stays blocked once the authenticated home/composer probe turns stale, even if some local browser artifacts still exist.";

const GROK_PROVIDER_UNAVAILABLE_REASON =
  "Local Grok artifacts are still present, but the authenticated home/composer probe cannot confirm upstream reachability right now.";

const GROK_CAPTURE_HANDOFF =
  "Open https://grok.com in the attached browser profile, confirm the authenticated Grok home and composer bootstrap, then capture the grok.com session cookie, the Grok OAuth/browser session artifact, and the active user agent.";

const GROK_PROBE_HANDOFF =
  "Re-probe the authenticated Grok home and composer bootstrap from the same local profile before routing live traffic.";

const GROK_REFRESH_HANDOFF =
  "Reuse the attached Grok browser profile to refresh the authenticated home/composer probe and recapture the grok.com session cookie plus OAuth/browser session artifact before resuming traffic.";
const GROK_TRANSPORT_FALLBACK_TIMEOUT_MS = 20_000;
const GROK_DOM_FALLBACK_TIMEOUT_MS = 60_000;

async function invokeGrokBrowserDomFallbackWithTimeout(args: {
  message: string;
  env: Record<string, string | undefined>;
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, GROK_DOM_FALLBACK_TIMEOUT_MS);

  try {
    const { invokeGrokBrowserDomTransport } = await import("./browser-dom-transport.js");
    return await invokeGrokBrowserDomTransport(
      {
        message: args.message,
        signal: controller.signal,
      },
      args.env,
    );
  } catch (error) {
    if (
      controller.signal.aborted &&
      error instanceof Error &&
      error.message.toLowerCase().includes("aborted")
    ) {
      throw new Error(
        `Grok browser DOM fallback timed out after ${GROK_DOM_FALLBACK_TIMEOUT_MS}ms.`,
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function invokeGrokBrowserSessionFallback(args: {
  message: string;
  model: string;
  env: Record<string, string | undefined>;
}) {
  const { invokeGrokBrowserSessionTransport } = await import(
    "./browser-session-transport.js"
  );

  return invokeGrokBrowserSessionTransport({
    message: args.message,
    model: args.model,
    env: args.env,
  });
}

async function invokeGrokTransportWithTimeout(args: Parameters<typeof invokeGrokTransport>[0]) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      invokeGrokTransport(args),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(
            new Error(
              `Grok transport timed out after ${GROK_TRANSPORT_FALLBACK_TIMEOUT_MS}ms before the browser DOM fallback could take over.`,
            ),
          );
        }, GROK_TRANSPORT_FALLBACK_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function grokArtifacts(state: WebSessionSnapshot["state"]) {
  const present = state !== "missing";

  return {
    browserProfile: present,
    sessionCookie: present,
    oauthToken: present,
  } as const;
}

function applyGrokSessionContract(
  session: Partial<WebSessionSnapshot> = {},
): WebSessionSnapshot {
  const note = session.note ?? GROK_SESSION_CONTRACT_NOTE;
  const state = session.state ?? "missing";

  switch (state) {
    case "missing":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? grokArtifacts(state),
        missingArtifacts: session.missingArtifacts ?? [...GROK_MISSING_ARTIFACTS],
        requiredUserAction: session.requiredUserAction ?? GROK_REAUTH_ACTION,
      };
    case "expiring":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? grokArtifacts(state),
        requiredUserAction: session.requiredUserAction ?? GROK_REAUTH_ACTION,
      };
    case "refreshable-but-degraded":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? grokArtifacts(state),
        refreshEligible: session.refreshEligible ?? true,
        requiredUserAction: session.requiredUserAction ?? GROK_REAUTH_ACTION,
        degradedReason: session.degradedReason ?? GROK_BLOCKED_DEGRADED_REASON,
      };
    case "expired":
    case "user-action-required":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? grokArtifacts(state),
        requiredUserAction: session.requiredUserAction ?? GROK_REAUTH_ACTION,
      };
    case "provider-unavailable":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? grokArtifacts(state),
        degradedReason: session.degradedReason ?? GROK_PROVIDER_UNAVAILABLE_REASON,
      };
    case "ready":
      return {
        ...session,
        state,
        note,
        artifacts: session.artifacts ?? grokArtifacts(state),
      };
  }
}

function withGrokSessionContract(context: WebLaneContext = {}): WebLaneContext {
  return {
    ...context,
    sessions: {
      ...context.sessions,
      grok: applyGrokSessionContract(context.sessions?.grok),
    },
  };
}

export function createGrokWebRuntime(): WebProviderRuntime {
  const baseRuntime = createWebProviderRuntime({
    descriptor: {
      provider: "grok",
      displayName: "Grok Web",
      stabilityTarget: "baseline",
      degradedInvocationPolicy: "block",
      authProfile: {
        mode: "oauth",
        loginUrl: "https://grok.com",
        accountLabel: "grok:default",
        sessionSource: "grok-x-oauth",
      },
      capabilities: GROK_CAPABILITIES,
      models: [
        {
          id: "grok-3",
          displayName: "Grok 3",
          contextWindow: 128000,
          maxOutputTokens: 8192,
          capabilities: GROK_CAPABILITIES,
          alias: "default",
        },
        {
          id: "grok-3-thinking",
          displayName: "Grok 3 Thinking",
          contextWindow: 128000,
          maxOutputTokens: 8192,
          capabilities: GROK_CAPABILITIES,
        },
      ],
      notes: [
        "Grok Web runtime is in scope for Kernel Alpha with single-account assumptions.",
        "No hidden fallback to xAI API keys or alternate accounts.",
        "Baseline target: refreshable degraded sessions stay blocked until the user renews them and the authenticated home/composer probe passes again.",
      ],
    },
    defaults: {
      state: "missing",
    },
    sessionContract: {
      probeSource: "grok-home-composer-probe",
      probeMode: "grok-home-composer-probe",
      probeHandoff: GROK_PROBE_HANDOFF,
      artifacts: [
        {
          id: "browser-profile",
          label: "Attached browser profile",
          kind: "browser-profile",
          required: true,
          source: "browser-profile",
          description:
            "The local Chrome/Chromium profile attached to the authenticated Grok session.",
        },
        {
          id: "session-cookie",
          label: "Grok session cookie",
          kind: "session-cookie",
          required: true,
          source: "cookie-store",
          description:
            "The grok.com cookie material reused for the authenticated home/composer browser transport.",
        },
        {
          id: "oauth-browser-session",
          label: "Grok OAuth/browser session",
          kind: "oauth-cookie",
          required: true,
          source: "cookie-store",
          description:
            "The OAuth/browser-session artifact that proves the signed-in Grok web account.",
        },
        {
          id: "user-agent",
          label: "Browser user agent",
          kind: "user-agent",
          required: false,
          source: "runtime-derivation",
          description:
            "The user agent captured alongside the authenticated Grok browser session.",
        },
      ],
      capture: {
        mode: "grok-oauth-browser-capture",
        referenceUrl: "https://grok.com",
        handoff: GROK_CAPTURE_HANDOFF,
        artifactIds: [
          "browser-profile",
          "session-cookie",
          "oauth-browser-session",
        ],
      },
      refresh: {
        supported: true,
        mode: "grok-home-composer-refresh",
        handoff: GROK_REFRESH_HANDOFF,
      },
      reAuth: {
        mode: "grok-oauth-browser-reauth",
        handoff: GROK_REAUTH_ACTION,
      },
    },
    invokeContract: {
      kind: "synthetic-demo",
      mode: GROK_INVOKE_MODE,
      handoff: GROK_INVOKE_HANDOFF,
      reason:
        "Grok Web currently returns a descriptive alpha stub, not a real authenticated browser transport response.",
    },
    hasInvokeTransport: (context) =>
      hasRequiredEnvValues(GROK_WEB_LIVE_PROOF_ENV_NAMES, context.env ?? process.env),
    invokeTransport: async (args) => {
      try {
        return await invokeGrokTransportWithTimeout(args);
      } catch (error) {
        const message = error instanceof Error ? error.message.toLowerCase() : "";

        if (
          message.includes("http 403") ||
          message.includes("http 401") ||
          message.includes("http 400") ||
          message.includes("unauthorized") ||
          message.includes("conversation creation failed") ||
          message.includes("response request failed") ||
          message.includes("anti-bot") ||
          message.includes("captcha") ||
          message.includes("timed out")
        ) {
          let browserSessionError: unknown;

          try {
            const outputText = await invokeGrokBrowserSessionFallback({
              message: args.request.input,
              model: args.request.model,
              env: args.context.env ?? process.env,
            });

            return {
              outputText: outputText.outputText,
              providerMessageId: outputText.providerMessageId,
            };
          } catch (error) {
            browserSessionError = error;

            try {
              const outputText = await invokeGrokBrowserDomFallbackWithTimeout({
                message: args.request.input,
                env: args.context.env ?? process.env,
              });

              return {
                outputText,
                providerMessageId: `grok-msg-${randomUUID()}`,
              };
            } catch (domError) {
              if (
                browserSessionError instanceof Error &&
                domError instanceof Error
              ) {
                throw new Error(
                  `Grok browser-session fallback failed: ${browserSessionError.message}; ${domError.message}`,
                );
              }

              throw domError;
            }
          }
        }

        throw error;
      }
    },
  });

  return {
    descriptor: baseRuntime.descriptor,
    getStatus(context) {
      return baseRuntime.getStatus(withGrokSessionContract(context));
    },
    invoke(request, context) {
      return baseRuntime.invoke(request, withGrokSessionContract(context));
    },
  };
}
