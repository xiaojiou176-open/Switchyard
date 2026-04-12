import type { IncomingMessage, ServerResponse } from "node:http";

import type { GenerateTextRequest } from "../../sdk-client/src/index.js";
import type { RuntimeRequest, SwitchyardContractError } from "../../../contracts/src/index.js";
import type {
  ServiceInvokeFailure,
  ServiceInvokeResult,
  ServiceInvokeSuccess,
  ServiceSurfaceResponse,
} from "./service-invoke-contract.js";
import {
  buildAuthPortalShellModel,
  renderAuthPortalShell,
} from "./auth-portal-shell.js";
import { renderProviderDebugWorkbench } from "./provider-debug-workbench.js";
import type {
  ProviderStatusView,
  RuntimeInvocationFailure,
  RuntimeInvocationRequest,
  WebLiveProofResult,
  WebProviderId,
  WebSessionSnapshot,
} from "../../../lanes/web/src/index.js";
import type { WebLaneContext } from "../../../lanes/web/src/index.js";
import { WebLoginLane } from "../../../lanes/web/src/index.js";
import type { ProviderId } from "../../../contracts/src/index.js";
import type { SwitchyardRuntime } from "../../../kernel/src/index.js";
import {
  SERVICE_AUTH_PORTAL_METADATA,
  SERVICE_SURFACE_METADATA,
  buildRuntimeBootstrapView,
  buildServiceAuthStatusView,
  buildServiceProviderDebugSupportView,
  buildServiceDiscoveryViews,
  buildServiceProviderProbeView,
  buildServiceProviderRemediationView,
  buildServiceRemediationSummary,
  buildServiceRouteCatalog
} from "./service-language.js";

export interface SwitchyardHttpSurfaceOptions {
  webLane: WebLoginLane;
  context?: WebLaneContext;
  runtime?: SwitchyardRuntime;
  invokeRuntime?: (args: {
    request: RuntimeRequest;
    body: Record<string, unknown>;
  }) => Promise<ServiceInvokeResult | ServiceSurfaceResponse>;
  resolvePreferredLane?: (
    providerId: ProviderId,
  ) => Promise<"byok" | "web-login" | undefined>;
  serviceName?: string;
  ownerUserId?: string;
  byokClient?: {
    registry?: unknown;
    generateText(request: GenerateTextRequest): Promise<{
      ok: boolean;
      text?: string;
      diagnostics: Array<{ code: string; message: string }>;
      prepared?: unknown;
    }>;
  };
  liveProofRunners?: Partial<Record<WebProviderId, () => Promise<WebLiveProofResult>>>;
  debugSupportRunners?: Partial<
    Record<
      WebProviderId,
      (provider: ProviderStatusView) => Promise<ReturnType<typeof buildServiceProviderDebugSupportView>>
    >
  >;
  acquisitionRunners?: Partial<
    Record<
      WebProviderId,
      {
        start(request?: AcquisitionRequestBody): Promise<unknown>;
        capture(request?: AcquisitionRequestBody): Promise<unknown>;
      }
    >
  >;
}

export type SurfaceResponse = ServiceSurfaceResponse;

type AcquisitionRequestBody = {
  mode?:
    | "managed-browser"
    | "isolated-chrome-root"
    | "existing-chrome-profile"
    | "existing-browser-session";
  existingChromeProfile?: {
    userDataDir?: string;
    browserPath?: string;
    cdpUrl?: string;
  };
  existingBrowserSession?: {
    sessionUrl?: string;
  };
};

function jsonResponse(status: number, body: unknown): SurfaceResponse {
  return {
    status,
    body,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
}

function htmlResponse(status: number, html: string): SurfaceResponse {
  return {
    status,
    body: html,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  };
}

function isServiceSurfaceResponse(
  value: ServiceInvokeResult | ServiceSurfaceResponse,
): value is ServiceSurfaceResponse {
  return "status" in value;
}

function renderInvokeSuccess(result: ServiceInvokeSuccess): SurfaceResponse {
  if (result.laneId === "byok") {
    return jsonResponse(200, {
      surface: SERVICE_SURFACE_METADATA,
      lane: "byok",
      provider: result.providerId,
      model: result.modelId,
      text: result.outputText,
      diagnostics: result.diagnostics,
      prepared: result.details?.prepared,
    });
  }

  const webResult =
    (result.details?.result as Record<string, unknown> | undefined) ?? {};

  return jsonResponse(200, {
    surface: SERVICE_SURFACE_METADATA,
    ...webResult,
  });
}

function renderInvokeFailure(result: ServiceInvokeFailure): SurfaceResponse {
  if (result.laneId === "byok") {
    return jsonResponse(result.httpStatus, {
      surface: SERVICE_SURFACE_METADATA,
      routes: result.details?.routes ?? buildServiceRouteCatalog(),
      lane: "byok",
      error: {
        message: result.message,
        type: result.errorType,
        diagnostics: result.diagnostics,
      },
    });
  }

  return jsonResponse(result.httpStatus, {
    surface: SERVICE_SURFACE_METADATA,
    authPortal: result.details?.authPortal ?? SERVICE_AUTH_PORTAL_METADATA,
    routes: result.details?.routes ?? buildServiceRouteCatalog(),
    error: {
      message: result.message,
      type: result.errorType,
      suggestedAction: result.suggestedAction,
      diagnostics: result.diagnostics,
    },
    auth: result.details?.auth,
    remediation: result.details?.remediation,
  });
}

function renderInvokeResult(
  result: ServiceInvokeResult | ServiceSurfaceResponse,
): SurfaceResponse {
  if (isServiceSurfaceResponse(result)) {
    return result;
  }

  return result.ok ? renderInvokeSuccess(result) : renderInvokeFailure(result);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeProviderPath(
  pathname: string,
): { provider?: WebProviderId; action?: "status" | "probe" | "remediation" } {
  const parts = pathname.split("/").filter(Boolean);

  if (
    parts.length === 5 &&
    parts[0] === "v1" &&
    parts[1] === "runtime" &&
    parts[2] === "providers" &&
    ["status", "probe", "remediation"].includes(parts[4] ?? "")
  ) {
    return {
      provider: parts[3] as WebProviderId,
      action: parts[4] as "status" | "probe" | "remediation",
    };
  }

  return {};
}

function normalizeAcquisitionPath(
  pathname: string,
): { provider?: WebProviderId; action?: "start" | "capture" } {
  const parts = pathname.split("/").filter(Boolean);

  if (
    parts.length === 6 &&
    parts[0] === "v1" &&
    parts[1] === "runtime" &&
    parts[2] === "providers" &&
    parts[4] === "acquisition" &&
    ["start", "capture"].includes(parts[5] ?? "")
  ) {
    return {
      provider: parts[3] as WebProviderId,
      action: parts[5] as "start" | "capture",
    };
  }

  return {};
}

function normalizeProviderDebugPath(
  pathname: string,
): {
  provider?: WebProviderId;
  action?:
    | "current-page"
    | "current-console"
    | "current-network"
    | "support-bundle"
    | "workbench";
} {
  const parts = pathname.split("/").filter(Boolean);

  if (
    parts.length === 6 &&
    parts[0] === "v1" &&
    parts[1] === "runtime" &&
    parts[2] === "providers" &&
    parts[4] === "debug" &&
    ["current-page", "current-console", "current-network", "support-bundle", "workbench"].includes(parts[5] ?? "")
  ) {
    return {
      provider: parts[3] as WebProviderId,
      action: parts[5] as
        | "current-page"
        | "current-console"
        | "current-network"
        | "support-bundle"
        | "workbench",
    };
  }

  return {};
}

function mapFailureStatus(failure: RuntimeInvocationFailure): number {
  switch (failure.errorCategory) {
    case "provider-unavailable":
      return 503;
    case "model-resolution-error":
    case "routing-error":
      return 400;
    default:
      return 409;
  }
}

function authStatusBody(providers: ProviderStatusView[], ownerUserId: string) {
  return {
    lane: "web",
    ...buildServiceAuthStatusView(providers, ownerUserId),
  };
}

function normalizeAcquisitionRequestBody(body: unknown): AcquisitionRequestBody | undefined {
  if (!isObject(body)) {
    return undefined;
  }

  const request: AcquisitionRequestBody = {};

  if (
    body.mode === "managed-browser" ||
    body.mode === "isolated-chrome-root" ||
    body.mode === "existing-chrome-profile" ||
    body.mode === "existing-browser-session"
  ) {
    request.mode = body.mode;
  }

  if (isObject(body.existingChromeProfile)) {
    request.existingChromeProfile = {
      userDataDir:
        typeof body.existingChromeProfile.userDataDir === "string"
          ? body.existingChromeProfile.userDataDir
          : undefined,
      browserPath:
        typeof body.existingChromeProfile.browserPath === "string"
          ? body.existingChromeProfile.browserPath
          : undefined,
      cdpUrl:
        typeof body.existingChromeProfile.cdpUrl === "string"
          ? body.existingChromeProfile.cdpUrl
          : undefined,
    };
  }

  if (isObject(body.existingBrowserSession)) {
    request.existingBrowserSession = {
      sessionUrl:
        typeof body.existingBrowserSession.sessionUrl === "string"
          ? body.existingBrowserSession.sessionUrl
          : undefined,
    };
  }

  return request;
}

export class SwitchyardHttpSurface {
  private readonly webLane: WebLoginLane;
  private readonly context: WebLaneContext;
  private readonly runtime?: SwitchyardRuntime;
  private readonly invokeRuntime?: SwitchyardHttpSurfaceOptions["invokeRuntime"];
  private readonly resolvePreferredLane?: SwitchyardHttpSurfaceOptions["resolvePreferredLane"];
  private readonly serviceName: string;
  private readonly ownerUserId: string;
  private readonly byokClient?: SwitchyardHttpSurfaceOptions["byokClient"];
  private readonly liveProofRunners: Partial<
    Record<WebProviderId, () => Promise<WebLiveProofResult>>
  >;
  private readonly debugSupportRunners: Partial<
    Record<
      WebProviderId,
      (provider: ProviderStatusView) => Promise<ReturnType<typeof buildServiceProviderDebugSupportView>>
    >
  >;
  private readonly acquisitionRunners: Partial<
    Record<
      WebProviderId,
      {
        start(request?: AcquisitionRequestBody): Promise<unknown>;
        capture(request?: AcquisitionRequestBody): Promise<unknown>;
      }
    >
  >;

  constructor(options: SwitchyardHttpSurfaceOptions) {
    this.webLane = options.webLane;
    this.context = options.context ?? {};
    this.runtime = options.runtime;
    this.invokeRuntime = options.invokeRuntime;
    this.resolvePreferredLane = options.resolvePreferredLane;
    this.serviceName = options.serviceName ?? "switchyard-service";
    this.ownerUserId = options.ownerUserId ?? "local-user";
    this.byokClient = options.byokClient;
    this.liveProofRunners = options.liveProofRunners ?? {};
    this.debugSupportRunners = options.debugSupportRunners ?? {};
    this.acquisitionRunners = options.acquisitionRunners ?? {};
  }

  private mapContractErrorStatus(error: SwitchyardContractError): number {
    switch (error.diagnostic.code) {
      case "missing-credential":
      case "credential-invalid":
      case "session-expired":
      case "user-action-required":
        return 409;
      case "provider-unavailable":
        return 503;
      default:
        return 400;
    }
  }

  private async buildRuntimeRequest(
    body: Record<string, unknown>,
    preferredLaneOverride?: "byok" | "web-login",
  ): Promise<RuntimeRequest | undefined> {
    if (!this.runtime) {
      return undefined;
    }

    const provider = body.provider;
    const model = body.model;
    const lane = body.lane;

    if (typeof provider !== "string" || typeof model !== "string") {
      return undefined;
    }

    const preferredLane =
      preferredLaneOverride ??
      (lane === "byok"
        ? "byok"
        : lane === "web"
          ? "web-login"
          : undefined);

    return {
      surface: "service",
      providerId: provider as ProviderId,
      modelReference: `${provider}/${model}`,
      preferredLane:
        preferredLane ??
        (this.resolvePreferredLane
          ? await this.resolvePreferredLane(provider as ProviderId)
          : undefined),
      requiredCapabilities: ["text-generation"],
    };
  }

  private async handleByokInvoke(
    body: Record<string, unknown>,
    selectionOverride?: {
      readonly providerId: string;
      readonly modelId: string;
    },
  ) {
    if (!this.byokClient) {
      return jsonResponse(503, {
        surface: SERVICE_SURFACE_METADATA,
        routes: buildServiceRouteCatalog(),
        lane: "byok",
        error: {
          message: "BYOK service invoke is not configured in the current runtime.",
          type: "provider-unavailable",
        },
      });
    }

    const provider =
      selectionOverride?.providerId ?? body.provider;
    const model = selectionOverride?.modelId ?? body.model;
    const input = body.input;
    const system = body.system;
    const maxOutputTokens = body.maxOutputTokens;
    const temperature = body.temperature;

    if (
      typeof provider !== "string" ||
      typeof model !== "string" ||
      typeof input !== "string"
    ) {
      return jsonResponse(400, {
        surface: SERVICE_SURFACE_METADATA,
        routes: buildServiceRouteCatalog(),
        lane: "byok",
        error: {
          message:
            "provider, model, and input are required string fields for BYOK invocation.",
          type: "invalid_request_error",
        },
      });
    }

    const result = await this.byokClient.generateText({
      model: `${provider}/${model}`,
      prompt: input,
      system: typeof system === "string" ? system : undefined,
      maxOutputTokens: typeof maxOutputTokens === "number" ? maxOutputTokens : undefined,
      temperature: typeof temperature === "number" ? temperature : undefined,
      stream: body.stream === true,
    });

    if (!result.ok) {
      const primaryDiagnostic = result.diagnostics[0];
      const type = primaryDiagnostic?.code ?? "provider-unavailable";
      const status =
        type === "model-resolution-error"
          ? 400
          : type === "missing-credential"
            ? 409
            : 503;

      return jsonResponse(status, {
        surface: SERVICE_SURFACE_METADATA,
        routes: buildServiceRouteCatalog(),
        lane: "byok",
        error: {
          message:
            primaryDiagnostic?.message ??
            "BYOK invocation failed without a structured diagnostic.",
          type,
          diagnostics: result.diagnostics,
        },
      });
    }

    return jsonResponse(200, {
      surface: SERVICE_SURFACE_METADATA,
      lane: "byok",
      provider,
      model,
      text: result.text,
      diagnostics: result.diagnostics,
      prepared: result.prepared,
    });
  }

  private async handleWebInvoke(
    body: Record<string, unknown>,
    selectionOverride?: {
      readonly providerId: string;
      readonly modelId: string;
      readonly laneId: "web-login";
    },
  ) {
    const provider = selectionOverride?.providerId ?? body.provider;
    const model = selectionOverride?.modelId ?? body.model;
    const input = body.input;

    if (
      typeof provider !== "string" ||
      typeof model !== "string" ||
      typeof input !== "string"
    ) {
      return jsonResponse(400, {
        error: {
          message: "provider, model, and input are required string fields.",
          type: "invalid_request_error",
        },
      });
    }

    const request: RuntimeInvocationRequest = {
      provider: provider as WebProviderId,
      model,
      input,
      lane:
        selectionOverride?.laneId === "web-login" || body.lane === "web"
          ? "web"
          : undefined,
      intent: "text-generation",
      stream: body.stream === true,
    };

    const result = await this.webLane.invoke(request, this.context);

    if (!result.ok) {
      const providers = await this.webLane.authStatus(this.context);
      const runtimeProvider = providers.find((entry) => entry.provider === result.provider);
      const auth = runtimeProvider
        ? buildServiceAuthStatusView([runtimeProvider], this.ownerUserId).providers[0]
        : undefined;

      return jsonResponse(mapFailureStatus(result), {
        surface: SERVICE_SURFACE_METADATA,
        authPortal: SERVICE_AUTH_PORTAL_METADATA,
        routes: buildServiceRouteCatalog(),
        error: {
          message: result.message,
          type: result.errorCategory,
          suggestedAction: result.suggestedAction,
          diagnostics: result.diagnostics,
        },
        auth,
        remediation: runtimeProvider
          ? buildServiceProviderRemediationView(runtimeProvider, this.ownerUserId)
          : undefined,
      });
    }

    return jsonResponse(200, {
      surface: SERVICE_SURFACE_METADATA,
      ...result,
    });
  }

  private async buildAuthPortalHtml() {
    const providers = await this.webLane.authStatus(this.context);
    const defaultModel = buildAuthPortalShellModel({
      userId: this.ownerUserId,
      routeCatalog: {
        authPortal: buildServiceRouteCatalog().authPortal,
        providerStatusTemplate: buildServiceRouteCatalog().providerStatusTemplate,
        providerAcquisitionStartTemplate:
          buildServiceRouteCatalog().providerAcquisitionStartTemplate,
        providerAcquisitionCaptureTemplate:
          buildServiceRouteCatalog().providerAcquisitionCaptureTemplate,
        providerDebugWorkbenchTemplate:
          buildServiceRouteCatalog().providerDebugWorkbenchTemplate,
      },
    });
    const byokSection = defaultModel.sections.find((section) => section.id === "byok");
    const webSection = defaultModel.sections.find((section) => section.id === "web-login");
    const webAuth = buildServiceAuthStatusView(providers, this.ownerUserId);

    return renderAuthPortalShell({
      ...defaultModel,
      sections: [
        ...(byokSection ? [byokSection] : []),
        {
          id: "web-login",
          title: webSection?.title ?? "Web/Login",
          description:
            webSection?.description ??
            "User signs in with a browser, OAuth flow, or subscription-backed web session.",
          cards: webAuth.providers,
        },
      ],
    });
  }

  private async buildAcquisitionResponse(
    providerId: WebProviderId,
    acquisition: Record<string, unknown>,
  ) {
    if (typeof acquisition.runtimeEnv === "object" && acquisition.runtimeEnv) {
      this.context.env = {
        ...(this.context.env ?? {}),
        ...(acquisition.runtimeEnv as Record<string, string | undefined>),
      };
    }

    if (typeof acquisition.session === "object" && acquisition.session) {
      this.context.sessions = {
        ...(this.context.sessions ?? {}),
        [providerId]: acquisition.session as WebSessionSnapshot,
      };
    }

    const providers = await this.webLane.authStatus(this.context);
    const provider = providers.find((entry) => entry.provider === providerId);

    return {
      surface: SERVICE_SURFACE_METADATA,
      authPortal: SERVICE_AUTH_PORTAL_METADATA,
      routes: buildServiceRouteCatalog(),
      acquisition: {
        status: acquisition.status,
        provider: acquisition.provider,
        providerDisplayName: acquisition.providerDisplayName,
        mode: acquisition.mode,
        modeLabel: acquisition.modeLabel,
        advanced: acquisition.advanced,
        supported: acquisition.supported,
        summary: acquisition.summary,
        loginUrl: acquisition.loginUrl,
        instructions: acquisition.instructions,
        availableModes: acquisition.availableModes,
        browserTarget: acquisition.browserTarget,
        captureRequest: acquisition.captureRequest,
        captureUrl: acquisition.captureUrl,
        storePath: acquisition.storePath,
        blocker: acquisition.blocker,
        cdpUrl: acquisition.cdpUrl,
        browser: acquisition.browser,
      },
      auth: provider
        ? buildServiceAuthStatusView([provider], this.ownerUserId).providers[0]
        : undefined,
      probe: provider
        ? buildServiceProviderProbeView(provider, this.ownerUserId)
        : undefined,
    };
  }

  private buildByokDiscoveryPayload() {
    const providers = this.runtime?.listProviders({ laneId: "byok" }) ?? [];

    return {
      surface: SERVICE_SURFACE_METADATA,
      routes: buildServiceRouteCatalog(),
      discovery: {
        lane: "byok",
        providers: providers.map((provider) => ({
          providerId: provider.providerId,
          lane: provider.laneId,
          displayName: provider.displayName,
          authModes: provider.authModes,
          defaultModel: provider.defaultModel?.canonical,
          recommendedModel: provider.recommendedModel?.canonical,
          capabilities: provider.capabilities,
          diagnosticsStatus: provider.diagnosticsStatus,
        })),
      },
    };
  }

  async handle(method: string, pathname: string, body?: unknown): Promise<SurfaceResponse> {
    if (method === "GET" && pathname === "/v1/runtime/auth-portal") {
      return htmlResponse(200, await this.buildAuthPortalHtml());
    }

    if (method === "GET" && pathname === "/v1/runtime/providers") {
      const providers = await this.webLane.discover(this.context);
      return jsonResponse(200, {
        surface: SERVICE_SURFACE_METADATA,
        routes: buildServiceRouteCatalog(),
        discovery: {
          lane: "web",
          providers: buildServiceDiscoveryViews(providers),
        },
      });
    }

    if (method === "GET" && pathname === "/v1/runtime/byok/providers") {
      return jsonResponse(200, this.buildByokDiscoveryPayload());
    }

    if (method === "GET" && pathname === "/v1/runtime/auth-status") {
      const providers = await this.webLane.authStatus(this.context);
      return jsonResponse(200, {
        surface: SERVICE_SURFACE_METADATA,
        authPortal: SERVICE_AUTH_PORTAL_METADATA,
        routes: buildServiceRouteCatalog(),
        ...authStatusBody(providers, this.ownerUserId),
      });
    }

    if (method === "GET" && pathname === "/v1/runtime/health") {
      const health = await this.webLane.health(this.context);
      const providers = health.providers;
      const auth = buildServiceAuthStatusView(providers, this.ownerUserId);
      return jsonResponse(200, {
        surface: SERVICE_SURFACE_METADATA,
        service: this.serviceName,
        routes: buildServiceRouteCatalog(),
        lane: health.lane,
        generatedAt: health.generatedAt,
        totals: health.totals,
        authSummary: {
          blockingCount: auth.blockingCount,
          warningCount: auth.warningCount,
          categories: auth.categories,
          workflowSummary: auth.workflowSummary,
        },
        remediation: buildServiceRemediationSummary(providers, this.ownerUserId),
      });
    }

    if (
      method === "GET" &&
      (pathname === "/v1/runtime/bootstrap" || pathname === "/v1/runtime/entrypoint")
    ) {
      const providers = await this.webLane.discover(this.context);
      const health = await this.webLane.health(this.context);
      return jsonResponse(
        200,
        buildRuntimeBootstrapView(providers, health, this.serviceName, this.ownerUserId),
      );
    }

    const providerPath = normalizeProviderPath(pathname);
    if (method === "GET" && providerPath.action && providerPath.provider) {
      const providers = await this.webLane.authStatus(this.context);
      const provider = providers.find((entry) => entry.provider === providerPath.provider);

      if (!provider) {
        return jsonResponse(404, {
          error: {
            message: `Unknown provider: ${providerPath.provider}`,
            type: "not_found",
          },
        });
      }

      if (providerPath.action === "status") {
        const auth = buildServiceAuthStatusView([provider], this.ownerUserId);
        return jsonResponse(200, {
          surface: SERVICE_SURFACE_METADATA,
          authPortal: SERVICE_AUTH_PORTAL_METADATA,
          provider: auth.providers[0],
        });
      }

      if (providerPath.action === "probe") {
        const liveProof = this.liveProofRunners[provider.provider]
          ? await this.liveProofRunners[provider.provider]!()
          : undefined;

        return jsonResponse(200, {
          surface: SERVICE_SURFACE_METADATA,
          probe: buildServiceProviderProbeView(provider, this.ownerUserId, liveProof),
        });
      }

      return jsonResponse(200, {
        surface: SERVICE_SURFACE_METADATA,
        authPortal: SERVICE_AUTH_PORTAL_METADATA,
        remediation: buildServiceProviderRemediationView(provider, this.ownerUserId),
      });
    }

    const providerDebugPath = normalizeProviderDebugPath(pathname);
    if (method === "GET" && providerDebugPath.action && providerDebugPath.provider) {
      const providers = await this.webLane.authStatus(this.context);
      const provider = providers.find((entry) => entry.provider === providerDebugPath.provider);

      if (!provider) {
        return jsonResponse(404, {
          error: {
            message: `Unknown provider: ${providerDebugPath.provider}`,
            type: "not_found",
          },
        });
      }

      const debugSupport = this.debugSupportRunners[provider.provider]
        ? await this.debugSupportRunners[provider.provider]!(provider)
        : buildServiceProviderDebugSupportView(provider, this.ownerUserId);

      if (providerDebugPath.action === "current-page") {
        return jsonResponse(200, {
          surface: SERVICE_SURFACE_METADATA,
          debug: debugSupport.currentPage,
        });
      }

      if (providerDebugPath.action === "current-console") {
        return jsonResponse(200, {
          surface: SERVICE_SURFACE_METADATA,
          debug: debugSupport.currentConsole,
        });
      }

      if (providerDebugPath.action === "current-network") {
        return jsonResponse(200, {
          surface: SERVICE_SURFACE_METADATA,
          debug: debugSupport.currentNetwork,
        });
      }

      if (providerDebugPath.action === "workbench") {
        return htmlResponse(
          200,
          renderProviderDebugWorkbench(debugSupport, buildServiceRouteCatalog().authPortal),
        );
      }

      return jsonResponse(200, {
        surface: SERVICE_SURFACE_METADATA,
        debug: debugSupport,
      });
    }

    const acquisitionPath = normalizeAcquisitionPath(pathname);
    if (method === "POST" && acquisitionPath.action && acquisitionPath.provider) {
      const runner = this.acquisitionRunners[acquisitionPath.provider];
      const acquisitionRequest = normalizeAcquisitionRequestBody(body);

      if (!runner) {
        return jsonResponse(404, {
          error: {
            message: `No acquisition runner registered for ${acquisitionPath.provider}.`,
            type: "not_found",
          },
        });
      }

      const result = (
        acquisitionPath.action === "start"
          ? await runner.start(acquisitionRequest)
          : await runner.capture(acquisitionRequest)
      ) as Record<string, unknown>;

      const payload = await this.buildAcquisitionResponse(acquisitionPath.provider, {
        ...result,
        captureUrl:
          acquisitionPath.action === "start"
            ? buildServiceRouteCatalog().providerAcquisitionCaptureTemplate.replace(
                "{providerId}",
                acquisitionPath.provider,
              )
            : undefined,
      });

      return jsonResponse(200, payload);
    }

    if (method === "POST" && pathname === "/v1/runtime/byok/invoke") {
      if (!isObject(body)) {
        return jsonResponse(400, {
          error: {
            message: "Expected a JSON object request body.",
            type: "invalid_request_error",
          },
        });
      }

      const runtimeRequest = await this.buildRuntimeRequest(body, "byok");

      if (!this.runtime || !runtimeRequest || !this.invokeRuntime) {
        return this.handleByokInvoke({
          ...body,
          lane: "byok",
        });
      }

      try {
        return renderInvokeResult(
          await this.invokeRuntime({
            request: runtimeRequest,
            body: {
              ...body,
              lane: "byok",
            },
          }),
        );
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "diagnostic" in error &&
          typeof (error as { diagnostic?: { code?: string } }).diagnostic?.code ===
            "string"
        ) {
          const contractError = error as SwitchyardContractError;

          return jsonResponse(this.mapContractErrorStatus(contractError), {
            surface: SERVICE_SURFACE_METADATA,
            routes: buildServiceRouteCatalog(),
            error: {
              message: contractError.message,
              type: contractError.diagnostic.code,
              diagnostics: [contractError.diagnostic],
            },
          });
        }

        throw error;
      }
    }

    if (method === "POST" && pathname === "/v1/runtime/invoke") {
      if (!isObject(body)) {
        return jsonResponse(400, {
          error: {
            message: "Expected a JSON object request body.",
            type: "invalid_request_error",
          },
        });
      }

      const runtimeRequest = await this.buildRuntimeRequest(body);

      try {
        if (this.runtime && runtimeRequest && this.invokeRuntime) {
          return renderInvokeResult(
            await this.invokeRuntime({
              request: runtimeRequest,
              body,
            }),
          );
        }
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "diagnostic" in error &&
          typeof (error as { diagnostic?: { code?: string } }).diagnostic?.code ===
            "string"
        ) {
          const contractError = error as SwitchyardContractError;

          return jsonResponse(this.mapContractErrorStatus(contractError), {
            surface: SERVICE_SURFACE_METADATA,
            routes: buildServiceRouteCatalog(),
            error: {
              message: contractError.message,
              type: contractError.diagnostic.code,
              diagnostics: [contractError.diagnostic],
            },
          });
        }

        throw error;
      }

      return this.handleWebInvoke(body);
    }

    return jsonResponse(404, {
      error: {
        message: `Unknown route: ${method} ${pathname}`,
        type: "not_found",
      },
    });
  }
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createNodeHttpHandler(surface: SwitchyardHttpSurface) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");

    try {
      const body =
        req.method === "POST" || req.method === "PUT" ? await readJsonBody(req) : undefined;
      const response = await surface.handle(req.method ?? "GET", url.pathname, body);
      res.statusCode = response.status;
      for (const [name, value] of Object.entries(
        response.headers ?? {
          "content-type": "application/json; charset=utf-8",
        },
      )) {
        res.setHeader(name, value);
      }
      res.end(
        typeof response.body === "string"
          ? response.body
          : JSON.stringify(response.body, null, 2),
      );
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          error: {
            message: error instanceof Error ? error.message : "Unknown internal error.",
            type: "internal_error",
          },
        }),
      );
    }
  };
}
