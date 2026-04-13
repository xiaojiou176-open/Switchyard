import { rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { buildAuthPortalShellModel } from "../../../apps/auth-portal/src/index.js";
import { SwitchyardContractError } from "../../../packages/contracts/src/index.js";
import {
  createSwitchyardService,
  type SwitchyardServiceOptions,
} from "../../../apps/service/src/index.js";
import {
  createCredentialOwner,
  createCredentialRecord,
  upsertStoredWebProviderSession,
} from "../../../packages/credentials/src/index.js";
import type { WebLoginLane } from "../../../packages/lanes/web/src/index.js";
import {
  buildServiceProviderAuthView,
  buildServiceProviderRouteRefs,
  buildServiceProviderRuntimeView,
  SwitchyardHttpSurface,
} from "../../../packages/surfaces/http/src/index.js";
import {
  getInvokeProofExpectation,
  runWebLoginLiveVerification,
} from "../../../scripts/verify-web-login-live.mjs";

type TestService = ReturnType<typeof createSwitchyardService>;

const ISOLATED_RUNTIME_ENV: Record<string, string | undefined> = {
  SWITCHYARD_GEMINI_API_KEY: undefined,
  GEMINI_API_KEY: undefined,
  GOOGLE_API_KEY: undefined,
  SWITCHYARD_WEB_AUTH_CDP_URL: undefined,
  SWITCHYARD_WEB_GEMINI_CDP_URL: undefined,
  SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE: undefined,
  SWITCHYARD_WEB_CHATGPT_USER_AGENT: undefined,
  SWITCHYARD_WEB_GEMINI_COOKIE_BUNDLE: undefined,
  SWITCHYARD_WEB_GEMINI_USER_AGENT: undefined,
  SWITCHYARD_WEB_CLAUDE_COOKIE_BUNDLE: undefined,
  SWITCHYARD_WEB_CLAUDE_USER_AGENT: undefined,
  SWITCHYARD_WEB_GROK_COOKIE_BUNDLE: undefined,
  SWITCHYARD_WEB_GROK_USER_AGENT: undefined,
  SWITCHYARD_WEB_QWEN_COOKIE_BUNDLE: undefined,
  SWITCHYARD_WEB_QWEN_USER_AGENT: undefined,
};
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

function createTestService(options: SwitchyardServiceOptions = {}): TestService {
  const {
    runtimeEnv,
    liveProofEnv,
    useLocalWebAuthStore,
    ...rest
  } = options;

  return createSwitchyardService({
    ...rest,
    useLocalWebAuthStore: useLocalWebAuthStore ?? false,
    runtimeEnv: {
      ...ISOLATED_RUNTIME_ENV,
      ...runtimeEnv,
    },
    liveProofEnv: liveProofEnv
      ? {
          ...ISOLATED_RUNTIME_ENV,
          ...liveProofEnv,
        }
      : undefined,
  });
}

async function requestSurface(
  service: TestService,
  method: "GET" | "POST",
  pathname: string,
  body?: unknown,
) {
  const response = await service.surface.handle(method, pathname, body);

  return {
    status: response.status,
    headers: new Headers(response.headers ?? {}),
    async json() {
      return response.body;
    },
    async text() {
      return typeof response.body === "string"
        ? response.body
        : JSON.stringify(response.body, null, 2);
    },
  };
}

function getSurface(
  service: TestService,
  pathname: string,
) {
  return requestSurface(service, "GET", pathname);
}

function postSurface(
  service: TestService,
  pathname: string,
  body?: unknown,
) {
  return requestSurface(service, "POST", pathname, body);
}

function createMockWebLane(
  options: {
    authStatus?: () => Promise<unknown[]>;
    invoke?: () => Promise<unknown>;
  } = {},
): WebLoginLane {
  return {
    discover: async () => [],
    authStatus: options.authStatus ?? (async () => []),
    invoke:
      options.invoke ??
      (async () => ({
        ok: false,
        provider: "chatgpt",
        errorCategory: "session-incomplete",
        message: "ChatGPT session is incomplete.",
        diagnostics: [],
        suggestedAction: "Re-login in the attached browser.",
      })),
  } as unknown as WebLoginLane;
}

describe("Switchyard HTTP surface", () => {
  it("exposes browser debug support routes with honest console and network statuses", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      providerSessions: {
        chatgpt: {
          state: "ready",
          runtimeReadiness: "ready",
          acquisitionMode: "managed-browser",
          validationState: "validated",
        },
      },
      debugSupportRunners: {
        chatgpt: async (provider) => ({
          providerId: provider.provider,
          providerDisplayName: provider.displayName,
          auth: {} as never,
          runtime: {
            available: true,
            canInvoke: true,
            runtimeReadiness: "ready",
            credentialState: "ready",
            sessionPresence: "present",
            degradedInvocationPolicy: "allow-with-warning",
          },
          storeReadiness: {
            credentialState: "ready",
            runtimeReadiness: "ready",
            validationState: "validated",
            note: "Store says ready.",
          },
          liveReadiness: {
            status: "live-blocked",
            diagnostic: "Current page is still on the logged-out landing page.",
          },
          attachTarget: {
            label: "Managed onboarding browser",
            source: "runtime-env",
            available: true,
            cdpUrl: "http://127.0.0.1:39222",
            note: "Use this attach target for inspection.",
          },
          currentPage: {
            status: "captured",
            url: "https://chatgpt.com/",
            title: "ChatGPT",
            snippet: "Log in to get personalized responses",
            hasComposerSurface: false,
            classification: "session-incomplete",
            diagnostic: "Current page is still on the logged-out landing page.",
          },
          currentConsole: {
            status: "captured",
            entries: [],
            diagnostic: "Observed the attached browser, but no new console entries fired.",
          },
          currentNetwork: {
            status: "captured",
            entries: [
              {
                name: "https://chatgpt.com/api/auth/session",
                initiatorType: "fetch",
                method: "GET",
                status: 200,
                source: "request-observer",
              },
            ],
            diagnostic: "Captured live request lifecycle events.",
          },
          diagnoseLadder: [
            {
              id: "check-store",
              status: "completed",
              summary: "Store says ready.",
            },
            {
              id: "repair-session",
              status: "recommended",
              summary: "Repair the session in the managed browser.",
              command: "pnpm run bootstrap:web-login-browser -- --provider chatgpt",
            },
          ],
          routes: {
            status: "/v1/runtime/providers/chatgpt/status",
            probe: "/v1/runtime/providers/chatgpt/probe",
            remediation: "/v1/runtime/providers/chatgpt/remediation",
            acquisitionStart: "/v1/runtime/providers/chatgpt/acquisition/start",
            acquisitionCapture: "/v1/runtime/providers/chatgpt/acquisition/capture",
            debugCurrentPage: "/v1/runtime/providers/chatgpt/debug/current-page",
            debugCurrentConsole: "/v1/runtime/providers/chatgpt/debug/current-console",
            debugCurrentNetwork: "/v1/runtime/providers/chatgpt/debug/current-network",
            debugSupportBundle: "/v1/runtime/providers/chatgpt/debug/support-bundle",
            debugWorkbench: "/v1/runtime/providers/chatgpt/debug/workbench",
          },
        }),
      },
    });

    const supportBundleResponse = await getSurface(
      service,
      "/v1/runtime/providers/chatgpt/debug/support-bundle",
    );
    const supportBundlePayload = (await supportBundleResponse.json()) as {
      debug: {
        liveReadiness: { status: string; diagnostic: string };
        currentConsole: { status: string; entries: unknown[] };
        currentNetwork: { status: string; entries: Array<{ name: string }> };
        diagnoseLadder: Array<{ id: string; command?: string }>;
      };
    };

    expect(supportBundleResponse.status).toBe(200);
    expect(supportBundlePayload.debug.liveReadiness).toEqual({
      status: "live-blocked",
      diagnostic: "Current page is still on the logged-out landing page.",
    });
    expect(supportBundlePayload.debug.currentConsole.status).toBe("captured");
    expect(supportBundlePayload.debug.currentConsole.entries).toEqual([]);
    expect(supportBundlePayload.debug.currentNetwork.entries[0]?.name).toContain(
      "/api/auth/session",
    );
    expect(supportBundlePayload.debug.diagnoseLadder[1]?.command).toContain(
      "bootstrap:web-login-browser",
    );

    const currentPageResponse = await getSurface(
      service,
      "/v1/runtime/providers/chatgpt/debug/current-page",
    );
    const currentPagePayload = (await currentPageResponse.json()) as {
      debug: { classification?: string; diagnostic: string };
    };

    expect(currentPageResponse.status).toBe(200);
    expect(currentPagePayload.debug.classification).toBe("session-incomplete");

    const currentConsoleResponse = await getSurface(
      service,
      "/v1/runtime/providers/chatgpt/debug/current-console",
    );
    const currentConsolePayload = (await currentConsoleResponse.json()) as {
      debug: { status: string; diagnostic: string };
    };

    expect(currentConsoleResponse.status).toBe(200);
    expect(currentConsolePayload.debug.status).toBe("captured");
    expect(currentConsolePayload.debug.diagnostic).toContain("Observed");

    const workbenchResponse = await getSurface(
      service,
      "/v1/runtime/providers/chatgpt/debug/workbench",
    );
    const workbenchHtml = await workbenchResponse.text();

    expect(workbenchResponse.status).toBe(200);
    expect(workbenchHtml).toContain("ChatGPT Web debug workbench");
    expect(workbenchHtml).toContain("Read-only inspection surface");
    expect(workbenchHtml).toContain("/v1/runtime/providers/chatgpt/debug/support-bundle");
    expect(workbenchHtml).toContain("Current browser evidence");
  });

  it("falls back to the default fail-closed support bundle when no debug runner is registered", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      runtimeEnv: {
        SWITCHYARD_WEB_AUTH_CDP_URL: "http://127.0.0.1:9",
      },
      providerSessions: {
        chatgpt: {
          state: "ready",
          runtimeReadiness: "ready",
          validationState: "validated",
        },
      },
    });

    const response = await getSurface(
      service,
      "/v1/runtime/providers/chatgpt/debug/support-bundle",
    );
    const payload = (await response.json()) as {
      debug: {
        attachTarget: { available: boolean; source: string };
        liveReadiness: { status: string };
        currentConsole: { status: string };
        diagnoseLadder: Array<{ id: string; status: string }>;
      };
    };

    expect(response.status).toBe(200);
    expect(payload.debug.attachTarget.available).toBe(true);
    expect(["default", "runtime-env"]).toContain(payload.debug.attachTarget.source);
    expect(["unknown", "live-ready", "live-blocked"]).toContain(
      payload.debug.liveReadiness.status,
    );
    expect(payload.debug.currentConsole.status).toBe("unavailable");
    expect(payload.debug.diagnoseLadder.find((step) => step.id === "check-attach-target"))
      .toMatchObject({ status: "completed" });
  });

  it("exposes provider discovery, auth status, and health for all five web providers", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
    });

    const providersResponse = await getSurface(service, "/v1/runtime/providers");
    const providersPayload = (await providersResponse.json()) as {
      surface: { role: string };
      routes: { bootstrap: string };
      discovery: {
        lane: string;
        providers: Array<{
          providerId: string;
          authMode: string;
          models: unknown[];
          routes: { probe: string; remediation: string };
        }>;
      };
    };

    expect(providersResponse.status).toBe(200);
    expect(providersPayload.surface.role).toBe("first-party-integration-entry");
    expect(providersPayload.routes.bootstrap).toBe("/v1/runtime/bootstrap");
    expect(providersPayload.discovery.lane).toBe("web");
    expect(providersPayload.discovery.providers.map((provider) => provider.providerId)).toEqual([
      "chatgpt",
      "gemini",
      "claude",
      "grok",
      "qwen",
    ]);
    expect(
      providersPayload.discovery.providers.every((provider) => provider.models.length >= 1),
    ).toBe(
      true,
    );
    expect(
      providersPayload.discovery.providers.every(
        (provider) =>
          provider.routes.probe.endsWith(`/v1/runtime/providers/${provider.providerId}/probe`) &&
          provider.routes.remediation.endsWith(
            `/v1/runtime/providers/${provider.providerId}/remediation`,
          ),
      ),
    ).toBe(true);

    const authStatusResponse = await getSurface(service, "/v1/runtime/auth-status");
    const authStatusPayload = (await authStatusResponse.json()) as {
      authPortal: { mode: string; capabilities: string[]; controlPlane: boolean };
      workflowSummary: Array<{ id: string; count: number }>;
      providers: Array<{
        providerId: string;
        state: string;
        workflowId: string;
        diagnostic: { contractCategoryLabel: string } | null;
      }>;
    };

    expect(authStatusResponse.status).toBe(200);
    expect(authStatusPayload.authPortal.mode).toBe("local-first");
    expect(authStatusPayload.authPortal.capabilities).toEqual(["login", "status", "re-auth"]);
    expect(authStatusPayload.authPortal.controlPlane).toBe(false);
    expect(authStatusPayload.workflowSummary.map((workflow) => workflow.id)).toEqual([
      "login",
      "status",
      "re-auth",
    ]);
    expect(
      authStatusPayload.providers.every(
        (provider) =>
          provider.state === "missing" &&
          provider.workflowId === "login" &&
          provider.diagnostic?.contractCategoryLabel === "missing credential",
      ),
    ).toBe(true);

    const healthResponse = await getSurface(service, "/v1/runtime/health");
    const healthPayload = (await healthResponse.json()) as {
      routes: { invoke: string };
      authSummary: { workflowSummary: Array<{ id: string; count: number }> };
      totals: { total: number; ready: number; userActionRequired: number };
      remediation: { counts: { blocking: number; degraded: number; ready: number } };
    };

    expect(healthResponse.status).toBe(200);
    expect(healthPayload.routes.invoke).toBe("/v1/runtime/invoke");
    expect(healthPayload.totals).toMatchObject({
      total: 5,
      ready: 0,
      userActionRequired: 5,
    });
    expect(healthPayload.authSummary.workflowSummary.find((workflow) => workflow.id === "login"))
      .toMatchObject({ count: 5 });
    expect(healthPayload.remediation.counts).toEqual({
      blocking: 5,
      degraded: 0,
      ready: 0,
    });

    const bootstrapResponse = await getSurface(service, service.bootstrapPath);
    const bootstrapPayload = (await bootstrapResponse.json()) as {
      surface: { runtimeShape: string };
      bootstrap: {
        serviceName: string;
        routeCatalog: { bootstrap: string; providerProbeTemplate: string };
      };
      discovery: { providers: Array<{ providerId: string }> };
      auth: { workflowSummary: Array<{ id: string; count: number }> };
      health: { totals: { total: number } };
      remediation: {
        counts: { blocking: number };
        blockingProviders: Array<{ providerId: string; routes: { remediation: string } }>;
      };
    };

    expect(bootstrapResponse.status).toBe(200);
    expect(bootstrapPayload.surface.runtimeShape).toBe("runtime-first");
    expect(bootstrapPayload.bootstrap.serviceName).toBe("switchyard-service");
    expect(bootstrapPayload.bootstrap.routeCatalog.bootstrap).toBe("/v1/runtime/bootstrap");
    expect(bootstrapPayload.bootstrap.routeCatalog.providerProbeTemplate).toBe(
      "/v1/runtime/providers/{providerId}/probe",
    );
    expect(bootstrapPayload.discovery.providers).toHaveLength(5);
    expect(bootstrapPayload.auth.workflowSummary.find((workflow) => workflow.id === "login"))
      .toMatchObject({ count: 5 });
    expect(bootstrapPayload.health.totals.total).toBe(5);
    expect(bootstrapPayload.remediation.counts.blocking).toBe(5);
    expect(bootstrapPayload.remediation.blockingProviders[0]?.routes.remediation).toContain(
      "/v1/runtime/providers/",
    );
  });

  it("returns explicit diagnostics when invocation is blocked by a missing web session", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
    });

    const response = await postSurface(service, "/v1/runtime/invoke", {
      provider: "chatgpt",
      model: "gpt-4o",
      input: "hello from integration test",
    });

    const payload = (await response.json()) as {
      authPortal?: { capabilities: string[] };
      routes?: { bootstrap: string };
      auth?: {
        workflowId: string;
        actions: Array<{ label: string }>;
        diagnostic: { contractCategoryLabel: string } | null;
      };
      remediation?: {
        runtime: { canInvoke: boolean; credentialState: string };
        routes: { remediation: string; probe: string };
        actions: Array<{ label: string }>;
      };
      error: { type: string; suggestedAction?: string };
    };

    expect(response.status).toBe(409);
    expect(payload.authPortal?.capabilities).toEqual(["login", "status", "re-auth"]);
    expect(payload.routes?.bootstrap).toBe("/v1/runtime/bootstrap");
    expect(payload.error.type).toBe("missing-credential");
    expect(payload.error.suggestedAction).toContain("https://chatgpt.com");
    expect(payload.auth?.workflowId).toBe("login");
    expect(payload.auth?.diagnostic?.contractCategoryLabel).toBe("missing credential");
    expect(payload.auth?.actions.map((action) => action.label)).toContain("Start Login");
    expect(payload.remediation?.runtime).toMatchObject({
      canInvoke: false,
      credentialState: "missing",
    });
    expect(payload.remediation?.routes.probe).toBe("/v1/runtime/providers/chatgpt/probe");
    expect(payload.remediation?.routes.remediation).toBe(
      "/v1/runtime/providers/chatgpt/remediation",
    );
    expect(payload.remediation?.actions.map((action) => action.label)).toContain("Start Login");
  });

  it("blocks runtime invocation until a real Web/Login transport replaces the current Gemini stub", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      providerSessions: {
        gemini: {
          state: "ready",
          accountLabel: "gemini:test-user",
        },
      },
    });

    const response = await postSurface(service, "/v1/runtime/invoke", {
      provider: "gemini",
      model: "gemini-2.5-pro",
      input: "summarize the lane contract",
      lane: "web",
    });

    const payload = (await response.json()) as {
      surface: { id: string };
      error: { type: string; suggestedAction?: string };
      auth?: {
        providerId: string;
        workflowId: string;
        session: {
          runtimeReadiness: string;
          invoke?: { kind: string; mode: string; readiness: string };
        };
      };
      remediation?: {
        runtime: { canInvoke: boolean; credentialState: string };
      };
    };

    expect(response.status).toBe(400);
    expect(payload.surface.id).toBe("service-http");
    expect(payload.error.type).toBe("routing-error");
    expect(payload.error.suggestedAction).toContain("gemini.google.com/app");
    expect(payload.auth).toEqual(
      expect.objectContaining({
        providerId: "gemini",
        workflowId: "status",
        session: expect.objectContaining({
          runtimeReadiness: "ready",
          invoke: expect.objectContaining({
            kind: "synthetic-demo",
            mode: "gemini-web-dom-composer",
            readiness: "blocked",
          }),
        }),
      }),
    );
    expect(payload.remediation?.runtime).toMatchObject({
      canInvoke: false,
      credentialState: "ready",
    });
  });

  it("shares the same re-auth language between service status and auth portal cards", async () => {
    const owner = createCredentialOwner("terry-local");
    const service = createTestService({
      useLocalWebAuthStore: false,
      ownerUserId: owner.userId,
      providerSessions: {
        chatgpt: {
          state: "expired",
          accountLabel: "ChatGPT browser session",
        },
      },
    });

    const authStatusResponse = await getSurface(service, "/v1/runtime/auth-status");
    const authStatusPayload = (await authStatusResponse.json()) as {
      providers: Array<{
        providerId: string;
        workflowId: string;
        actions: Array<{ label: string }>;
        diagnostic: { contractCategoryLabel: string } | null;
      }>;
    };

    const portalModel = buildAuthPortalShellModel({
      owner,
      records: [
        createCredentialRecord({
          userId: owner.userId,
          providerId: "chatgpt",
          authModeId: "web-login",
          accountId: "chatgpt-browser",
          accountLabel: "ChatGPT browser session",
          lifecycleStage: "expire-degrade",
          status: {
            hasMaterial: true,
            expired: true,
          },
        }),
      ],
    });

    const serviceCard = authStatusPayload.providers.find((provider) => provider.providerId === "chatgpt");
    const portalCard = portalModel.sections[1]?.cards.find((card) => card.providerId === "chatgpt");

    expect(serviceCard?.workflowId).toBe(portalCard?.workflowId);
    expect(serviceCard?.diagnostic?.contractCategoryLabel).toBe(
      portalCard?.diagnostic?.contractCategoryLabel,
    );
    expect(serviceCard?.actions.map((action) => action.label)).toEqual(
      portalCard?.actions.map((action) => action.label),
    );
  });

  it("exposes provider-level probe and remediation views for runtime-first triage", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      providerSessions: {
        claude: {
          state: "refreshable-but-degraded",
          accountLabel: "claude:triage",
          lastValidatedAt: "2026-03-29T09:55:00.000Z",
          refreshEligible: true,
        },
        grok: {
          state: "user-action-required",
          accountLabel: "grok:triage",
          requiredUserAction:
            "Re-run the Grok Web OAuth/browser login flow to refresh the local session.",
        },
      },
    });

    const probeResponse = await getSurface(service, "/v1/runtime/providers/claude/probe");
    const probePayload = (await probeResponse.json()) as {
      probe: {
        providerId: string;
        runtime: { canInvoke: boolean; runtimeReadiness: string; degradedInvocationPolicy: string };
        auth: { workflowId: string };
        diagnostics: Array<{ category: string }>;
        routes: { remediation: string };
      };
    };

    expect(probeResponse.status).toBe(200);
    expect(probePayload.probe.providerId).toBe("claude");
    expect(probePayload.probe.runtime).toMatchObject({
      canInvoke: false,
      runtimeReadiness: "degraded",
      degradedInvocationPolicy: "allow-with-warning",
    });
    expect(probePayload.probe.auth.workflowId).toBe("status");
    expect(probePayload.probe.diagnostics.some((diagnostic) => diagnostic.category === "refreshable-but-degraded")).toBe(true);
    expect(probePayload.probe.routes.remediation).toBe(
      "/v1/runtime/providers/claude/remediation",
    );
    expect(probePayload.probe.liveProof).toEqual(
      expect.objectContaining({
        status: "external-blocker",
        provider: "claude",
        blocker: "missing-web-session-material",
      }),
    );

    const remediationResponse = await getSurface(
      service,
      "/v1/runtime/providers/grok/remediation",
    );
    const remediationPayload = (await remediationResponse.json()) as {
      authPortal: { mode: string };
      remediation: {
        providerId: string;
        workflowId: string;
        runtime: { canInvoke: boolean; credentialState: string };
        transportHint?: string;
        actions: Array<{ label: string }>;
      };
    };

    expect(remediationResponse.status).toBe(200);
    expect(remediationPayload.authPortal.mode).toBe("local-first");
    expect(remediationPayload.remediation.providerId).toBe("grok");
    expect(remediationPayload.remediation.workflowId).toBe("re-auth");
    expect(remediationPayload.remediation.runtime).toMatchObject({
      canInvoke: false,
      credentialState: "user-action-required",
    });
    expect(remediationPayload.remediation.transportHint).toContain("Grok Web OAuth/browser login");
    expect(remediationPayload.remediation.actions.map((action) => action.label)).toContain(
      "Re-authenticate",
    );
  });

  it("surfaces subtype-aware blocker wording in the auth portal and Claude debug workbench", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      providerSessions: {
        claude: {
          state: "user-action-required",
          accountLabel: "claude:billing",
          acquisitionMode: "isolated-chrome-root",
          requiredUserAction:
            "Restore Claude subscription access before rerunning the live gate.",
          persistenceAudit: {
            workspaceClassification: "session-incomplete",
            summary: "Stored audit still reflects a generic reusable browser seat.",
            pageUrl: "https://chatgpt.com/",
            pageTitle: "ChatGPT",
          },
        },
        grok: {
          state: "user-action-required",
          accountLabel: "grok:workspace",
          acquisitionMode: "isolated-chrome-root",
          requiredUserAction:
            "Complete the Grok browser session until it reaches a reusable workspace.",
          persistenceAudit: {
            workspaceClassification: "session-incomplete",
            summary: "The current Grok browser seat has not reached a reusable workspace yet.",
            pageUrl: "https://grok.com/",
            pageTitle: "Grok",
          },
        },
      },
      debugSupportRunners: {
        claude: async (provider) => ({
          providerId: provider.provider,
          providerDisplayName: provider.displayName,
          auth: buildServiceProviderAuthView(provider, "local-user"),
          runtime: buildServiceProviderRuntimeView(provider),
          storeReadiness: {
            credentialState: provider.credentialState,
            runtimeReadiness: provider.runtimeReadiness,
            validationState: provider.session.validationState,
            note: "Stored material still reflects a user-action-required Claude slot.",
          },
          liveReadiness: {
            status: "live-ready",
            diagnostic:
              "The current Claude browser tab still looks reusable, but account access is blocked upstream.",
          },
          attachTarget: {
            label: "Isolated Chrome root",
            source: "runtime-env",
            available: true,
            cdpUrl: "http://127.0.0.1:9338",
            note: "Claude is being inspected from the repo-owned isolated Chrome root.",
          },
          currentPage: {
            status: "captured",
            url: "https://claude.ai/new",
            title: "Claude",
            snippet: "Subscription past due",
            hasComposerSurface: true,
            classification: "account-action-required",
            diagnostic:
              "Claude billing state is still blocking access until the subscription is restored.",
          },
          currentConsole: {
            status: "captured",
            entries: [],
            diagnostic: "No fresh console entries were captured during this inspection window.",
          },
          currentNetwork: {
            status: "captured",
            entries: [],
            diagnostic: "No fresh network events were captured during this inspection window.",
          },
          diagnoseLadder: [
            {
              id: "check-store",
              status: "completed",
              summary: "Stored state = user-action-required; runtime readiness = blocked.",
            },
            {
              id: "check-attach-target",
              status: "completed",
              summary: "Canonical attach target is Isolated Chrome root at http://127.0.0.1:9338.",
            },
            {
              id: "inspect-current-page",
              status: "completed",
              summary:
                "Claude browser evidence says the account is blocked until the subscription is restored.",
            },
            {
              id: "inspect-console-network",
              status: "completed",
              summary: "No fresh console or network events were captured during this inspection window.",
            },
            {
              id: "rerun-provider-live-proof",
              status: "recommended",
              summary: "Rerun the provider live gate after Claude account access is restored.",
              command: "pnpm exec node scripts/verify-web-login-live.mjs --provider claude",
            },
          ],
          routes: buildServiceProviderRouteRefs(provider.provider),
        }),
      },
    });

    const authPortalResponse = await getSurface(service, "/v1/runtime/auth-portal");
    const authPortalHtml = await authPortalResponse.text();

    expect(authPortalResponse.status).toBe(200);
    expect(authPortalHtml).toContain("Web/Login live readiness");
    expect(authPortalHtml).toContain("The five provider verdicts that matter first");
    expect(authPortalHtml).toContain("This section now behaves like a triage wall");
    expect(authPortalHtml).toContain("Account action required");
    expect(authPortalHtml).toContain("Review current blocker");
    expect(authPortalHtml).toContain("Session incomplete");
    expect(authPortalHtml).toContain("Inspect current browser first");
    expect(authPortalHtml).toContain("Re-authenticate");
    expect(authPortalHtml).not.toContain("Ready providers (");
    expect(authPortalHtml).toContain("Current browser truth");
    expect(authPortalHtml).toContain(
      "Claude billing state is still blocking access until the subscription is restored.",
    );
    expect(authPortalHtml).toContain("https://claude.ai/new");
    expect(authPortalHtml).not.toContain("https://chatgpt.com/");
    expect(authPortalHtml).not.toContain("<span><strong>Title</strong> ChatGPT</span>");

    const workbenchResponse = await getSurface(
      service,
      "/v1/runtime/providers/claude/debug/workbench",
    );
    const workbenchHtml = await workbenchResponse.text();

    expect(workbenchResponse.status).toBe(200);
    expect(workbenchHtml).toContain("Primary verdict");
    expect(workbenchHtml).toContain("Owner action first");
    expect(workbenchHtml).toContain(
      "Restore Claude subscription access before rerunning the live gate.",
    );
    expect(workbenchHtml).toContain("Current browser evidence can still look reusable.");
    expect(workbenchHtml).toContain(
      "A reusable-looking browser page does not clear this blocker by itself.",
    );
    expect(workbenchHtml).toContain("Browser looks reusable");
    expect(workbenchHtml).toContain("technical status");
    expect(workbenchHtml).toContain("live-ready");
  });

  it("folds repeated browser-inspection failures into a detailed diagnostics tray", async () => {
    const repeatedDiagnostic =
      "Switchyard could not inspect the attached browser: browserType.connectOverCDP: connect ECONNREFUSED 127.0.0.1:9338";
    const service = createTestService({
      useLocalWebAuthStore: false,
      debugSupportRunners: {
        chatgpt: async (provider) => ({
          providerId: provider.provider,
          providerDisplayName: provider.displayName,
          auth: buildServiceProviderAuthView(provider, "local-user"),
          runtime: buildServiceProviderRuntimeView(provider),
          storeReadiness: {
            credentialState: provider.credentialState,
            runtimeReadiness: provider.runtimeReadiness,
            validationState: provider.session.validationState,
            note: "Stored session materials look ready, but fresh browser inspection is unavailable.",
          },
          liveReadiness: {
            status: "unknown",
            diagnostic: repeatedDiagnostic,
          },
          attachTarget: {
            label: "Isolated Chrome root",
            source: "runtime-env",
            available: true,
            cdpUrl: "http://127.0.0.1:9338",
            note: "ChatGPT is being inspected from the repo-owned isolated Chrome root.",
          },
          currentPage: {
            status: "unavailable",
            diagnostic: repeatedDiagnostic,
          },
          currentConsole: {
            status: "unavailable",
            entries: [],
            diagnostic: repeatedDiagnostic,
          },
          currentNetwork: {
            status: "unavailable",
            entries: [],
            diagnostic: repeatedDiagnostic,
          },
          diagnoseLadder: [
            {
              id: "check-store",
              status: "completed",
              summary: "Stored state = ready; runtime readiness = ready.",
            },
          ],
          routes: buildServiceProviderRouteRefs(provider.provider),
        }),
      },
    });

    const workbenchResponse = await getSurface(
      service,
      "/v1/runtime/providers/chatgpt/debug/workbench",
    );
    const workbenchHtml = await workbenchResponse.text();

    expect(workbenchResponse.status).toBe(200);
    expect(workbenchHtml).toContain("Detailed browser diagnostics");
    expect(workbenchHtml).toContain("Evidence stack, repair ladder, and raw JSON surfaces");
    expect(workbenchHtml).toContain(
      "Fresh browser inspection is currently unavailable. Use the detailed browser diagnostics tray below for the raw transport error.",
    );
    expect(workbenchHtml).toContain(
      "Same browser-inspection failure as above. Open detailed browser diagnostics below for the raw technical message.",
    );
  });

  it("keeps attach-failed browser seats out of the ready bucket on the auth portal", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      providerSessions: {
        chatgpt: {
          state: "user-action-required",
          accountLabel: "chatgpt:attach-failed",
          acquisitionMode: "isolated-chrome-root",
          requiredUserAction:
            "Restore the ChatGPT attach target before rerunning the live gate.",
          persistenceAudit: {
            workspaceClassification: "attach-failed",
            summary: "Switchyard could not attach to the current ChatGPT browser seat.",
            pageUrl: "https://chatgpt.com/",
            pageTitle: "ChatGPT",
          },
        },
      },
      debugSupportRunners: {
        chatgpt: async (provider) => ({
          providerId: provider.provider,
          providerDisplayName: provider.displayName,
          auth: buildServiceProviderAuthView(provider, "local-user"),
          runtime: buildServiceProviderRuntimeView(provider),
          storeReadiness: {
            credentialState: provider.credentialState,
            runtimeReadiness: provider.runtimeReadiness,
            validationState: provider.session.validationState,
            note: "Stored material says user action is still required.",
          },
          liveReadiness: {
            status: "unknown",
            diagnostic:
              "No fresh browser inspection is available for this provider during the current test window.",
          },
          attachTarget: {
            label: "Isolated Chrome root",
            source: "runtime-env",
            available: false,
            cdpUrl: undefined,
            note: "No attach target was available during this test window.",
          },
          currentPage: {
            status: "unavailable",
            classification: undefined,
            diagnostic:
              "Switchyard could not inspect the current ChatGPT browser seat during this test window.",
          },
          currentConsole: {
            status: "unavailable",
            entries: [],
            diagnostic: "No console evidence is available without a fresh browser inspection.",
          },
          currentNetwork: {
            status: "unavailable",
            entries: [],
            diagnostic: "No network evidence is available without a fresh browser inspection.",
          },
          diagnoseLadder: [
            {
              id: "check-store",
              status: "completed",
              summary: "Stored state still says user action is required.",
            },
            {
              id: "inspect-current-page",
              status: "blocked",
              summary: "No fresh browser inspection is available yet.",
            },
          ],
          routes: buildServiceProviderRouteRefs(provider.provider),
        }),
      },
    });

    const authPortalResponse = await getSurface(service, "/v1/runtime/auth-portal");
    const authPortalHtml = await authPortalResponse.text();

    expect(authPortalResponse.status).toBe(200);
    expect(authPortalHtml).toContain("Session incomplete");
    expect(authPortalHtml).toContain("User action required");
    expect(authPortalHtml).toContain("Last stored browser checkpoint");
    expect(authPortalHtml).not.toContain("Ready providers (1)");
  });

  it("returns live-proof success through the probe route when a runner is injected", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      liveProofRunners: {
        chatgpt: async () => ({
          status: "success",
          provider: "chatgpt",
          probeUrl: "https://chatgpt.com/api/auth/session",
          finalUrl: "https://chatgpt.com/api/auth/session",
          responseStatus: 200,
          responseKind: "json",
          signal: "chatgpt-session",
          summary: "ChatGPT auth session endpoint returned authenticated session metadata.",
          envStatus: [
            {
              name: "SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE",
              present: true,
            },
            {
              name: "SWITCHYARD_WEB_CHATGPT_USER_AGENT",
              present: true,
            },
          ],
        }),
      },
    });

    const response = await getSurface(service, "/v1/runtime/providers/chatgpt/probe");
    const payload = (await response.json()) as {
      probe: {
        providerId: string;
        liveProof?: {
          status: string;
          provider: string;
          signal?: string;
          summary?: string;
        };
      };
    };

    expect(response.status).toBe(200);
    expect(payload.probe.providerId).toBe("chatgpt");
    expect(payload.probe.liveProof).toMatchObject({
      status: "success",
      provider: "chatgpt",
      signal: "chatgpt-session",
      summary: "ChatGPT auth session endpoint returned authenticated session metadata.",
    });
  });

  it("keeps provider status unavailable when the transport is still synthetic even if the session looks ready", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      providerSessions: {
        chatgpt: {
          state: "ready",
          accountLabel: "chatgpt:status-check",
          lastValidatedAt: "2026-03-29T22:00:00.000Z",
        },
      },
    });

    const response = await getSurface(service, "/v1/runtime/providers/chatgpt/status");
    const payload = (await response.json()) as {
      provider: {
        available: boolean;
        workflowId: string;
        session: {
          invoke?: { kind: string; mode: string; readiness: string };
        };
      };
    };

    expect(response.status).toBe(200);
    expect(payload.provider).toEqual(
      expect.objectContaining({
        available: false,
        workflowId: "status",
        session: expect.objectContaining({
          invoke: expect.objectContaining({
            kind: "synthetic-demo",
            mode: "chatgpt-backend-api-conversation",
            readiness: "blocked",
          }),
        }),
      }),
    );
  });

  it("uses runtimeEnv as the shared truth source for both provider status and live proof when liveProofEnv is omitted", async () => {
    const liveProofFetch = async () =>
      new Response(
        JSON.stringify({
          user: {
            email: "runtime-env@example.com",
          },
          accessToken: "access-token-456",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );

    const service = createTestService({
      useLocalWebAuthStore: false,
      runtimeEnv: {
        SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE: "chatgpt_session=runtime-env",
        SWITCHYARD_WEB_CHATGPT_USER_AGENT: "SwitchyardRuntimeEnv/1.0",
      },
      liveProofFetch,
      providerSessions: {
        chatgpt: {
          state: "ready",
          accountLabel: "chatgpt:runtime-env",
        },
      },
    });

    const statusResponse = await getSurface(service, "/v1/runtime/providers/chatgpt/status");
    const statusPayload = (await statusResponse.json()) as {
      provider: {
        available: boolean;
        session: {
          invoke?: { kind: string; readiness: string };
        };
      };
    };

    expect(statusResponse.status).toBe(200);
    expect(statusPayload.provider).toEqual(
      expect.objectContaining({
        available: true,
        session: expect.objectContaining({
          invoke: expect.objectContaining({
            kind: "real-transport",
            readiness: "ready",
          }),
        }),
      }),
    );

    const probeResponse = await getSurface(service, "/v1/runtime/providers/chatgpt/probe");
    const probePayload = (await probeResponse.json()) as {
      probe: {
        liveProof?: {
          status: string;
          provider: string;
          signal?: string;
        };
      };
    };

    expect(probeResponse.status).toBe(200);
    expect(probePayload.probe.liveProof).toEqual(
      expect.objectContaining({
        status: "success",
        provider: "chatgpt",
        signal: "runtime-env@example.com",
      }),
    );
  });

  it("serves a local-first auth portal and updates provider status after acquisition capture", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      acquisitionRunners: {
        chatgpt: {
          start: async () => ({
            status: "ready-for-user-login",
            provider: "chatgpt",
            providerDisplayName: "ChatGPT Web",
            mode: "managed-browser",
            modeLabel: "Managed Browser",
            advanced: false,
            supported: true,
            loginUrl: "https://chatgpt.com",
            instructions: "Switch to the managed onboarding browser, complete the ChatGPT sign-in, then return here and click Capture Session.",
            summary: "Switchyard started the managed ChatGPT onboarding browser.",
            availableModes: [
              {
                id: "managed-browser",
                label: "Managed Browser",
                description: "Managed.",
                advanced: false,
                default: true,
              },
            ],
            browserTarget: {
              kind: "managed-onboarding-browser",
              label: "Switchyard onboarding browser",
              summary: "Let Switchyard manage a dedicated local onboarding browser for sign-in and capture.",
            },
            captureRequest: {
              mode: "managed-browser",
            },
            runtimeEnv: {
              SWITCHYARD_WEB_AUTH_ACTIVE_MODE: "managed-browser",
              SWITCHYARD_WEB_AUTH_CDP_URL: "http://127.0.0.1:39222",
            },
            browser: {
              status: "started",
              provider: "chatgpt",
              mode: "managed-browser",
              modeLabel: "Managed Browser",
              advanced: false,
              loginUrl: "https://chatgpt.com",
              loginOpened: true,
              cdpUrl: "http://127.0.0.1:39222",
              browserTarget: {
                kind: "managed-onboarding-browser",
                label: "Switchyard onboarding browser",
                summary: "Let Switchyard manage a dedicated local onboarding browser for sign-in and capture.",
              },
              summary: "Switchyard started its dedicated local onboarding browser for chatgpt and opened https://chatgpt.com.",
            },
          }),
          capture: async () => ({
            status: "success",
            provider: "chatgpt",
            providerDisplayName: "ChatGPT Web",
            mode: "managed-browser",
            modeLabel: "Managed Browser",
            advanced: false,
            supported: true,
            summary: "ChatGPT acquisition stored a ready local browser session.",
            availableModes: [
              {
                id: "managed-browser",
                label: "Managed Browser",
                description: "Managed.",
                advanced: false,
                default: true,
              },
            ],
            browserTarget: {
              kind: "managed-onboarding-browser",
              label: "Switchyard onboarding browser",
              summary: "Let Switchyard manage a dedicated local onboarding browser for sign-in and capture.",
            },
            storePath: "/tmp/switchyard-chatgpt-store.json",
            runtimeEnv: {
              SWITCHYARD_WEB_AUTH_ACTIVE_MODE: "managed-browser",
              SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE: "chatgpt_session=stored",
              SWITCHYARD_WEB_CHATGPT_USER_AGENT: "SwitchyardStored/1.0",
            },
            session: {
              state: "ready",
              acquisitionMode: "managed-browser",
              accountLabel: "chatgpt:portal",
              sessionSource: "chatgpt-browser-profile",
              lastValidatedAt: "2026-03-29T22:30:00.000Z",
              artifactStates: {
                "next-auth-session-token": "present",
                "openai-access-token": "present",
              },
            },
          }),
        },
      },
    });

    const portalResponse = await getSurface(service, "/v1/runtime/auth-portal");
    const portalHtml = await portalResponse.text();

    expect(portalResponse.status).toBe(200);
    expect(portalResponse.headers.get("content-type")).toContain("text/html");
    expect(portalHtml).toContain("Switchyard Auth Portal");
    expect(portalHtml).toContain("Skip to main content");
    expect(portalHtml).toContain("Inspect current browser");
    expect(portalHtml).toContain("/v1/runtime/providers/{providerId}/acquisition/start");
    expect(portalHtml).not.toContain("&quot;authPortal&quot;");

    const routeCatalogMatch = portalHtml.match(
      /<script type="application\/json" id="auth-portal-route-catalog">([\s\S]*?)<\/script>/,
    );

    expect(routeCatalogMatch?.[1]).toBeTruthy();
    expect(JSON.parse(routeCatalogMatch?.[1] ?? "")).toEqual({
      authPortal: "/v1/runtime/auth-portal",
      providerStatusTemplate: "/v1/runtime/providers/{providerId}/status",
      providerAcquisitionStartTemplate: "/v1/runtime/providers/{providerId}/acquisition/start",
      providerAcquisitionCaptureTemplate: "/v1/runtime/providers/{providerId}/acquisition/capture",
      providerDebugWorkbenchTemplate: "/v1/runtime/providers/{providerId}/debug/workbench",
    });

    const startResponse = await postSurface(
      service,
      "/v1/runtime/providers/chatgpt/acquisition/start",
    );
    const startPayload = (await startResponse.json()) as {
      acquisition: {
        status: string;
        loginUrl: string;
        captureUrl: string;
        browser?: {
          status: string;
          loginOpened: boolean;
        };
      };
    };

    expect(startResponse.status).toBe(200);
    expect(startPayload.acquisition).toEqual(
      expect.objectContaining({
        status: "ready-for-user-login",
        mode: "managed-browser",
        loginUrl: "https://chatgpt.com",
        captureUrl: "/v1/runtime/providers/chatgpt/acquisition/capture",
        browser: expect.objectContaining({
          status: "started",
          loginOpened: true,
        }),
      }),
    );

    const captureResponse = await postSurface(
      service,
      "/v1/runtime/providers/chatgpt/acquisition/capture",
    );
    const capturePayload = (await captureResponse.json()) as {
      acquisition: {
        status: string;
        storePath: string;
      };
      auth: {
        providerId: string;
        available: boolean;
        state: string;
        session: {
          invoke?: { kind: string; readiness: string };
        };
      };
    };

    expect(captureResponse.status).toBe(200);
    expect(capturePayload.acquisition).toEqual(
      expect.objectContaining({
        status: "success",
        mode: "managed-browser",
        storePath: "/tmp/switchyard-chatgpt-store.json",
      }),
    );
    expect(capturePayload.auth).toEqual(
      expect.objectContaining({
        providerId: "chatgpt",
        available: true,
        state: "ready",
        session: expect.objectContaining({
          invoke: expect.objectContaining({
            kind: "real-transport",
            readiness: "ready",
          }),
        }),
      }),
    );

    const statusResponse = await getSurface(service, "/v1/runtime/providers/chatgpt/status");
    const statusPayload = (await statusResponse.json()) as {
      provider: {
        available: boolean;
        state: string;
        session: {
          invoke?: { kind: string; readiness: string };
        };
      };
    };

    expect(statusResponse.status).toBe(200);
    expect(statusPayload.provider).toEqual(
      expect.objectContaining({
        available: true,
        state: "ready",
        modeLabel: "Managed Browser",
        session: expect.objectContaining({
          acquisitionMode: "managed-browser",
          invoke: expect.objectContaining({
            kind: "real-transport",
            readiness: "ready",
          }),
        }),
      }),
    );
  });

  it("accepts advanced acquisition mode input and keeps it visible after capture", async () => {
    let seenStartRequest: Record<string, unknown> | undefined;
    let seenCaptureRequest: Record<string, unknown> | undefined;
    const service = createTestService({
      useLocalWebAuthStore: false,
      acquisitionRunners: {
        chatgpt: {
          start: async (request) => {
            seenStartRequest = request as Record<string, unknown>;
            return {
              status: "ready-for-user-login",
              provider: "chatgpt",
              providerDisplayName: "ChatGPT Web",
              mode: "isolated-chrome-root",
              modeLabel: "Use Isolated Chrome Root",
              advanced: true,
              supported: true,
              loginUrl: "https://chatgpt.com",
              instructions:
                "Switch to the isolated Switchyard Chrome window, confirm ChatGPT is signed in there, then return and click Capture Session.",
              summary: "Switchyard attached or launched the isolated Chrome root.",
              availableModes: [
                {
                  id: "isolated-chrome-root",
                  label: "Use Isolated Chrome Root",
                  description: "Isolated repo Chrome root.",
                  advanced: true,
                  default: true,
                },
                {
                  id: "managed-browser",
                  label: "Managed Browser",
                  description: "Managed.",
                  advanced: false,
                  default: false,
                },
              ],
              browserTarget: {
                kind: "isolated-chrome-root",
                label: "Isolated Chrome root",
                summary: "Reuse Switchyard's dedicated Chrome root and single repo-owned profile for login and capture.",
              },
              captureRequest: {
                mode: "isolated-chrome-root",
                existingChromeProfile: {
                  userDataDir: "/mock-home/test/.cache/switchyard/browser/chrome-user-data",
                  cdpUrl: "http://127.0.0.1:9338",
                },
              },
              runtimeEnv: {
                SWITCHYARD_BROWSER_MODE: "isolated-chrome-root",
                SWITCHYARD_WEB_AUTH_ACTIVE_MODE: "isolated-chrome-root",
                SWITCHYARD_WEB_AUTH_CDP_URL: "http://127.0.0.1:9338",
                SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL: "http://127.0.0.1:9338",
              },
              cdpUrl: "http://127.0.0.1:9338",
              browser: {
                status: "started",
                provider: "chatgpt",
                mode: "isolated-chrome-root",
                modeLabel: "Use Isolated Chrome Root",
                advanced: true,
                loginUrl: "https://chatgpt.com",
                loginOpened: true,
                cdpUrl: "http://127.0.0.1:9338",
                userDataDir: "/mock-home/test/.cache/switchyard/browser/chrome-user-data",
                browserTarget: {
                  kind: "isolated-chrome-root",
                  label: "Isolated Chrome root",
                  summary:
                    "Reuse Switchyard's dedicated Chrome root and single repo-owned profile for login and capture.",
                },
                summary: "Switchyard attached or launched the isolated Chrome root.",
              },
            };
          },
          capture: async (request) => {
            seenCaptureRequest = request as Record<string, unknown>;
            return {
              status: "success",
              provider: "chatgpt",
              providerDisplayName: "ChatGPT Web",
              mode: "isolated-chrome-root",
              modeLabel: "Use Isolated Chrome Root",
              advanced: true,
              supported: true,
              summary: "ChatGPT acquisition reused the isolated Chrome root and stored a ready session.",
              availableModes: [
                {
                  id: "isolated-chrome-root",
                  label: "Use Isolated Chrome Root",
                  description: "Isolated repo Chrome root.",
                  advanced: true,
                  default: true,
                },
                {
                  id: "managed-browser",
                  label: "Managed Browser",
                  description: "Managed.",
                  advanced: false,
                  default: false,
                },
              ],
              browserTarget: {
                kind: "isolated-chrome-root",
                label: "Isolated Chrome root",
                summary: "Reuse Switchyard's dedicated Chrome root and single repo-owned profile for login and capture.",
              },
              storePath: "/tmp/switchyard-chatgpt-existing-profile-store.json",
              runtimeEnv: {
                SWITCHYARD_BROWSER_MODE: "isolated-chrome-root",
                SWITCHYARD_WEB_AUTH_ACTIVE_MODE: "isolated-chrome-root",
                SWITCHYARD_WEB_AUTH_CDP_URL: "http://127.0.0.1:9338",
                SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL: "http://127.0.0.1:9338",
                SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE: "chatgpt_session=stored",
                SWITCHYARD_WEB_CHATGPT_USER_AGENT: "SwitchyardStored/1.0",
              },
              session: {
                state: "ready",
                acquisitionMode: "isolated-chrome-root",
                accountLabel: "chatgpt:existing-profile",
                sessionSource: "chatgpt-browser-profile",
                lastValidatedAt: "2026-03-29T22:45:00.000Z",
                artifactStates: {
                  "next-auth-session-token": "present",
                  "openai-access-token": "present",
                },
              },
            };
          },
        },
      },
    });

    const startResponse = await postSurface(
      service,
      "/v1/runtime/providers/chatgpt/acquisition/start",
      {
        mode: "existing-chrome-profile",
        existingChromeProfile: {
          userDataDir: "/mock-home/test/.cache/switchyard/browser/chrome-user-data",
        },
      },
    );
    const startPayload = (await startResponse.json()) as {
      acquisition: {
        mode: string;
        modeLabel: string;
        advanced: boolean;
        captureRequest: {
          mode: string;
          existingChromeProfile?: { userDataDir?: string; cdpUrl?: string };
        };
      };
    };

    expect(startResponse.status).toBe(200);
    expect(seenStartRequest).toEqual(
      expect.objectContaining({
        mode: "existing-chrome-profile",
        existingChromeProfile: expect.objectContaining({
          userDataDir: "/mock-home/test/.cache/switchyard/browser/chrome-user-data",
        }),
      }),
    );
    expect(startPayload.acquisition).toEqual(
      expect.objectContaining({
        mode: "isolated-chrome-root",
        modeLabel: "Use Isolated Chrome Root",
        advanced: true,
        captureRequest: expect.objectContaining({
          mode: "isolated-chrome-root",
          existingChromeProfile: expect.objectContaining({
            userDataDir: "/mock-home/test/.cache/switchyard/browser/chrome-user-data",
            cdpUrl: "http://127.0.0.1:9338",
          }),
        }),
      }),
    );

    const captureResponse = await postSurface(
      service,
      "/v1/runtime/providers/chatgpt/acquisition/capture",
      startPayload.acquisition.captureRequest,
    );
    const capturePayload = (await captureResponse.json()) as {
      acquisition: {
        mode: string;
        modeLabel: string;
      };
      auth: {
        modeLabel?: string;
        session: {
          acquisitionMode?: string;
        };
      };
    };

    expect(captureResponse.status).toBe(200);
    expect(seenCaptureRequest).toEqual(
      expect.objectContaining({
        mode: "isolated-chrome-root",
        existingChromeProfile: expect.objectContaining({
          cdpUrl: "http://127.0.0.1:9338",
        }),
      }),
    );
    expect(capturePayload.acquisition).toEqual(
      expect.objectContaining({
        mode: "isolated-chrome-root",
        modeLabel: "Use Isolated Chrome Root",
      }),
    );
    expect(capturePayload.auth).toEqual(
      expect.objectContaining({
        modeLabel: "Use Isolated Chrome Root",
        session: expect.objectContaining({
          acquisitionMode: "isolated-chrome-root",
        }),
      }),
    );
  });

  it("prefers stored acquisition material over env fallback inside verify:web-login-live", async () => {
    const chatgptExpectation = getInvokeProofExpectation("chatgpt");
    const storeEnv = {
      SWITCHYARD_LOCAL_WEB_AUTH_STORE_PATH: join(
        REPO_ROOT,
        ".runtime-cache",
        "temp",
        "verify-web-login-live.store.json",
      ),
      SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE: "chatgpt_session=env-fallback",
      SWITCHYARD_WEB_CHATGPT_USER_AGENT: "EnvFallback/1.0",
    };
    rmSync(storeEnv.SWITCHYARD_LOCAL_WEB_AUTH_STORE_PATH, { force: true });

    upsertStoredWebProviderSession(
      {
        providerId: "chatgpt",
        state: "ready",
        accountLabel: "chatgpt:stored",
        sessionSource: "chatgpt-browser-profile",
        lastValidatedAt: "2026-03-29T23:00:00.000Z",
        artifactStates: {
          "next-auth-session-token": "present",
          "openai-access-token": "present",
        },
        runtimeEnv: {
          SWITCHYARD_WEB_CHATGPT_COOKIE_BUNDLE: "chatgpt_session=stored-preferred",
          SWITCHYARD_WEB_CHATGPT_USER_AGENT: "StoredPreferred/1.0",
        },
        updatedAt: "2026-03-29T23:00:00.000Z",
        source: "local-auth-portal",
      },
      storeEnv,
    );
    const seenUrls: string[] = [];

    const fetchMock = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      seenUrls.push(url);
      const headers =
        init?.headers instanceof Headers
          ? Object.fromEntries(init.headers.entries())
          : Array.isArray(init?.headers)
            ? Object.fromEntries(init.headers)
            : init?.headers;

      if (url === "https://chatgpt.com/api/auth/session") {
        expect(headers).toEqual(
          expect.objectContaining({
            cookie: "chatgpt_session=stored-preferred",
            "user-agent": "StoredPreferred/1.0",
          }),
        );

        return new Response(
          JSON.stringify({
            user: {
              email: "stored@switchyard.test",
            },
            accessToken: "stored-access-token",
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
            },
          },
        );
      }

      if (url === "https://chatgpt.com/backend-api/conversation") {
        return new Response(
          [
            `data: {"message":{"content":{"parts":["${chatgptExpectation.token}"]}}}`,
            "data: [DONE]",
          ].join("\n"),
          {
            status: 200,
            headers: {
              "content-type": "text/event-stream",
            },
          },
        );
      }

      if (
        url === "https://chatgpt.com/backend-api/conversation/init" ||
        url === "https://chatgpt.com/backend-api/sentinel/chat-requirements/prepare" ||
        url === "https://chatgpt.com/backend-api/sentinel/chat-requirements/finalize"
      ) {
        return new Response("{}", {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        });
      }

      throw new Error(`Unexpected fetch url: ${url}`);
    };

    const results = await runWebLoginLiveVerification({
      env: storeEnv,
      fetchFn: fetchMock as typeof fetch,
    });
    const chatgptResult = results.find((result) => result.provider === "chatgpt");

    expect(chatgptResult).toEqual(
      expect.objectContaining({
        status: "success",
        provider: "chatgpt",
        invokeProof: expect.objectContaining({
          status: "success",
          outputText: chatgptExpectation.token,
        }),
      }),
    );
  expect(seenUrls).toEqual([
      "https://chatgpt.com/api/auth/session",
      "https://chatgpt.com/api/auth/session",
      "https://chatgpt.com/backend-api/conversation/init",
      "https://chatgpt.com/backend-api/sentinel/chat-requirements/prepare",
      "https://chatgpt.com/backend-api/sentinel/chat-requirements/finalize",
      "https://chatgpt.com/backend-api/conversation",
    ]);

    rmSync(storeEnv.SWITCHYARD_LOCAL_WEB_AUTH_STORE_PATH, { force: true });
  }, 45_000);

  it("serves a BYOK invoke through the shared runtime entrypoint when lane=byok", async () => {
    const fetchSpy = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: "SWITCHYARD_BYOK_OK" }],
            },
          },
        ],
      }),
    });

    const service = createTestService({
      useLocalWebAuthStore: false,
      runtimeEnv: {
        SWITCHYARD_GEMINI_API_KEY: "gemini-test-key",
      },
      liveProofFetch: fetchSpy as typeof fetch,
    });

    const response = await postSurface(service, "/v1/runtime/invoke", {
      provider: "gemini",
      model: "gemini-2.5-flash",
      input: "Reply with exactly SWITCHYARD_BYOK_OK",
      lane: "byok",
    });

    const payload = (await response.json()) as {
      lane: string;
      provider: string;
      model: string;
      text: string;
    };

    expect(response.status).toBe(200);
    expect(payload.lane).toBe("byok");
    expect(payload.provider).toBe("gemini");
    expect(payload.model).toBe("gemini-2.5-flash");
    expect(payload.text).toBe("SWITCHYARD_BYOK_OK");
  });

  it("exposes BYOK provider discovery through the service frontdoor", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
    });

    const response = await getSurface(service, "/v1/runtime/byok/providers");
    const payload = (await response.json()) as {
      discovery: {
        lane: string;
        providers: Array<{
          providerId: string;
          lane: string;
          defaultModel?: string;
        }>;
      };
    };

    expect(response.status).toBe(200);
    expect(payload.discovery.lane).toBe("byok");
    expect(payload.discovery.providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          providerId: "gemini",
          lane: "byok",
          defaultModel: "gemini/gemini-2.5-flash",
        }),
        expect.objectContaining({
          providerId: "openai",
          lane: "byok",
        }),
      ]),
    );
  });

  it("uses the kernel-backed lane planner for dual-lane providers when lane is omitted", async () => {
    const fetchSpy = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: "SWITCHYARD_KERNEL_BYOK_OK" }],
            },
          },
        ],
      }),
    });

    const service = createTestService({
      useLocalWebAuthStore: false,
      runtimeEnv: {
        SWITCHYARD_GEMINI_API_KEY: "gemini-test-key",
      },
      liveProofFetch: fetchSpy as typeof fetch,
    });

    const response = await postSurface(service, "/v1/runtime/invoke", {
      provider: "gemini",
      model: "gemini-2.5-flash",
      input: "Reply with exactly SWITCHYARD_KERNEL_BYOK_OK",
    });

    const payload = (await response.json()) as {
      lane: string;
      provider: string;
      model: string;
      text: string;
    };

    expect(response.status).toBe(200);
    expect(payload.lane).toBe("byok");
    expect(payload.provider).toBe("gemini");
    expect(payload.model).toBe("gemini-2.5-flash");
    expect(payload.text).toBe("SWITCHYARD_KERNEL_BYOK_OK");
  });

  it("serves a BYOK invoke through the explicit byok route alias", async () => {
    const fetchSpy = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: "SWITCHYARD_BYOK_ALIAS_OK" }],
            },
          },
        ],
      }),
    });

    const service = createTestService({
      useLocalWebAuthStore: false,
      runtimeEnv: {
        SWITCHYARD_GEMINI_API_KEY: "gemini-test-key",
      },
      liveProofFetch: fetchSpy as typeof fetch,
    });

    const response = await postSurface(service, "/v1/runtime/byok/invoke", {
      provider: "gemini",
      model: "gemini-2.5-flash",
      input: "Reply with exactly SWITCHYARD_BYOK_ALIAS_OK",
    });

    const payload = (await response.json()) as {
      lane: string;
      provider: string;
      model: string;
      text: string;
    };

    expect(response.status).toBe(200);
    expect(payload.lane).toBe("byok");
    expect(payload.provider).toBe("gemini");
    expect(payload.model).toBe("gemini-2.5-flash");
    expect(payload.text).toBe("SWITCHYARD_BYOK_ALIAS_OK");
  });

  it("returns a structured missing-credential error for BYOK service invoke", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
      runtimeEnv: {
        SWITCHYARD_GEMINI_API_KEY: "",
        GEMINI_API_KEY: "",
        GOOGLE_API_KEY: "",
      },
    });

    const response = await postSurface(service, "/v1/runtime/invoke", {
      provider: "gemini",
      model: "gemini-2.5-flash",
      input: "hello",
      lane: "byok",
    });

    const payload = (await response.json()) as {
      lane: string;
      error: { type: string; message: string };
    };

    expect(response.status).toBe(409);
    expect(payload.lane).toBe("byok");
    expect(payload.error.type).toBe("missing-credential");
    expect(payload.error.message).toContain("Missing credential for gemini");
  });

  it("fails closed on the explicit BYOK route when no BYOK client is configured", async () => {
    const surface = new SwitchyardHttpSurface({
      webLane: createMockWebLane(),
    });

    const response = await surface.handle("POST", "/v1/runtime/byok/invoke", {
      provider: "gemini",
      model: "gemini-2.5-flash",
      input: "hello",
    });

    expect(response.status).toBe(503);
    expect(response.body).toMatchObject({
      lane: "byok",
      error: {
        type: "provider-unavailable",
      },
    });
  });

  it("maps runtime contract errors on the explicit BYOK route to structured responses", async () => {
    const surface = new SwitchyardHttpSurface({
      webLane: createMockWebLane(),
      runtime: {} as never,
      invokeRuntime: async () => {
        throw new SwitchyardContractError(
          "missing-credential",
          "Missing credential for gemini.",
        );
      },
    });

    const response = await surface.handle("POST", "/v1/runtime/byok/invoke", {
      provider: "gemini",
      model: "gemini-2.5-flash",
      input: "hello",
    });

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      error: {
        type: "missing-credential",
        message: "Missing credential for gemini.",
      },
    });
  });

  it("passes through pre-rendered runtime responses on the generic invoke route", async () => {
    const surface = new SwitchyardHttpSurface({
      webLane: createMockWebLane(),
      runtime: {} as never,
      invokeRuntime: async () => ({
        status: 202,
        body: {
          ok: true,
          source: "runtime-kernel",
        },
      }),
    });

    const response = await surface.handle("POST", "/v1/runtime/invoke", {
      provider: "chatgpt",
      model: "gpt-4o-mini",
      input: "hello",
      lane: "web",
    });

    expect(response).toMatchObject({
      status: 202,
      body: {
        ok: true,
        source: "runtime-kernel",
      },
    });
  });

  it("renders structured web-login failures through the runtime-backed generic invoke route", async () => {
    const service = createTestService({
      useLocalWebAuthStore: false,
    });

    const response = await postSurface(service, "/v1/runtime/invoke", {
      provider: "chatgpt",
      model: "gpt-4o",
      input: "hello",
      lane: "web",
    });

    const payload = (await response.json()) as {
      authPortal: { mode: string };
      routes: { authPortal: string };
      error: { type: string; diagnostics: unknown[] };
      remediation?: unknown;
    };

    expect(response.status).toBe(409);
    expect(payload.authPortal.mode).toBe("local-first");
    expect(payload.routes.authPortal).toBe("/v1/runtime/auth-portal");
    expect(payload.error.type).toBeTruthy();
    expect(Array.isArray(payload.error.diagnostics)).toBe(true);
    expect(payload.remediation).toBeTruthy();
  });

  it("maps runtime contract errors on the generic invoke route to structured responses", async () => {
    const surface = new SwitchyardHttpSurface({
      webLane: createMockWebLane(),
      runtime: {} as never,
      invokeRuntime: async () => {
        throw new SwitchyardContractError(
          "provider-unavailable",
          "Provider is currently unavailable.",
        );
      },
    });

    const response = await surface.handle("POST", "/v1/runtime/invoke", {
      provider: "chatgpt",
      model: "gpt-4o-mini",
      input: "hello",
      lane: "web",
    });

    expect(response.status).toBe(503);
    expect(response.body).toMatchObject({
      error: {
        type: "provider-unavailable",
        message: "Provider is currently unavailable.",
      },
    });
  });
});
