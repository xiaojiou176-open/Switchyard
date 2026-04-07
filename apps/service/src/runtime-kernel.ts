import type {
  ProviderRegistration,
  RuntimeLaneExecutors,
  SwitchyardRuntime,
} from "../../../packages/kernel/src/index.js";
import {
  createProviderRegistry,
  createSwitchyardRuntime,
} from "../../../packages/kernel/src/index.js";
import type {
  AuthMode,
  LaneId,
  ProviderId,
  RuntimeRequest,
} from "../../../packages/contracts/src/index.js";
import type { ByokProviderRegistry } from "../../../packages/lanes/byok/src/index.js";
import type {
  ProviderStatusView,
  RuntimeInvocationRequest,
  WebProviderId,
  WebProviderRuntime,
  WebProviderRegistry,
  WebLaneContext,
  WebLoginLane,
} from "../../../packages/lanes/web/src/index.js";
import { hasRequiredCredential } from "../../../packages/providers/byok/shared/provider-factory.js";
import type { GenerateTextRequest } from "../../../packages/surfaces/sdk-client/src/index.js";
import {
  SERVICE_AUTH_PORTAL_METADATA,
  SERVICE_SURFACE_METADATA,
  buildServiceAuthStatusView,
  buildServiceProviderRemediationView,
  buildServiceRouteCatalog,
} from "../../../packages/surfaces/http/src/service-language.js";
import type {
  ServiceInvokeResult,
  ServiceSurfaceResponse,
} from "../../../packages/surfaces/http/src/service-invoke-contract.js";

export interface ServiceInvokePayload {
  provider: string;
  model: string;
  input: string;
  lane?: string;
  system?: string;
  maxOutputTokens?: number;
  temperature?: number;
  stream?: boolean;
}

function toServiceInvokePayload(
  body: Record<string, unknown>,
): ServiceInvokePayload | undefined {
  if (
    typeof body.provider !== "string" ||
    typeof body.model !== "string" ||
    typeof body.input !== "string"
  ) {
    return undefined;
  }

  return {
    provider: body.provider,
    model: body.model,
    input: body.input,
    lane: typeof body.lane === "string" ? body.lane : undefined,
    system: typeof body.system === "string" ? body.system : undefined,
    maxOutputTokens:
      typeof body.maxOutputTokens === "number" ? body.maxOutputTokens : undefined,
    temperature:
      typeof body.temperature === "number" ? body.temperature : undefined,
    stream: body.stream === true,
  };
}

export const SERVICE_RUNTIME_LANE_ORDER = Object.freeze([
  "web-login",
  "byok",
] as const satisfies readonly LaneId[]);

function toByokAuthModes(): readonly AuthMode[] {
  return ["api-key"] as const;
}

function toWebAuthModes(runtime: WebProviderRuntime): readonly AuthMode[] {
  return runtime.descriptor.authProfile.mode === "oauth"
    ? (["oauth", "web-login"] as const)
    : (["session", "web-login"] as const);
}

function toByokRegistration(registration: {
  provider: string;
  lane: "byok";
  displayName: string;
  modelCatalog: {
    defaultModel?: string;
    recommendedModel?: string;
  };
  capabilities: {
    textGeneration: boolean;
    streaming: boolean;
    toolCalling: boolean;
    imageInput: boolean;
    fileInput: boolean;
    officialApi: boolean;
  };
}): ProviderRegistration {
  return {
    providerId: registration.provider,
    laneId: registration.lane,
    displayName: registration.displayName,
    authModes: toByokAuthModes(),
    defaultModel: registration.modelCatalog.defaultModel
      ? `${registration.provider}/${registration.modelCatalog.defaultModel}`
      : undefined,
    recommendedModel: registration.modelCatalog.recommendedModel
      ? `${registration.provider}/${registration.modelCatalog.recommendedModel}`
      : undefined,
    capabilities: {
      "text-generation": registration.capabilities.textGeneration,
      streaming: registration.capabilities.streaming,
      "tool-calling": registration.capabilities.toolCalling,
      "image-input": registration.capabilities.imageInput,
      "file-input": registration.capabilities.fileInput,
      "official-api": registration.capabilities.officialApi,
      "web-login": false,
    },
    diagnosticsStatus: "healthy",
    catalogSource: "static",
  };
}

function toWebRegistration(runtime: WebProviderRuntime): ProviderRegistration {
  const defaultModel = runtime.descriptor.models[0]?.id;

  return {
    providerId: runtime.descriptor.provider,
    laneId: runtime.descriptor.lane,
    displayName: runtime.descriptor.displayName,
    authModes: toWebAuthModes(runtime),
    defaultModel: defaultModel
      ? `${runtime.descriptor.provider}/${defaultModel}`
      : undefined,
    recommendedModel: defaultModel
      ? `${runtime.descriptor.provider}/${defaultModel}`
      : undefined,
    capabilities: {
      "text-generation": runtime.descriptor.capabilities.textGeneration,
      streaming: runtime.descriptor.capabilities.streaming,
      "tool-calling": runtime.descriptor.capabilities.toolCalling,
      "image-input": runtime.descriptor.capabilities.imageInput,
      "file-input": false,
      "official-api": runtime.descriptor.capabilities.officialApi,
      "web-login": runtime.descriptor.capabilities.webLogin,
    },
    diagnosticsStatus: "healthy",
    catalogSource: "static",
  };
}

export function createServiceRuntimeKernel(options: {
  byokRegistry: ByokProviderRegistry;
  webRegistry: WebProviderRegistry;
}): SwitchyardRuntime {
  const registrations = [
    ...options.byokRegistry.list().map(toByokRegistration),
    ...options.webRegistry.list().map(toWebRegistration),
  ];

  return createSwitchyardRuntime({
    registry: createProviderRegistry(registrations),
    laneOrder: SERVICE_RUNTIME_LANE_ORDER,
  });
}

function isWebLaneReady(status: ProviderStatusView | undefined): boolean {
  return (
    status?.credentialState === "ready" ||
    status?.credentialState === "expiring" ||
    status?.credentialState === "refreshable-but-degraded"
  );
}

function isByokLaneReady(
  providerId: ProviderId,
  byokRegistry: ByokProviderRegistry,
  env: Record<string, string | undefined>,
): boolean {
  const registration = byokRegistry.get(providerId as never);

  if (!registration) {
    return false;
  }

  return hasRequiredCredential(env, registration.credential);
}

export function suggestServicePreferredLane(options: {
  providerId: ProviderId;
  byokRegistry: ByokProviderRegistry;
  webProviderStatuses: readonly ProviderStatusView[];
  env: Record<string, string | undefined>;
}): LaneId | undefined {
  const byokReady = isByokLaneReady(
    options.providerId,
    options.byokRegistry,
    options.env,
  );
  const webStatus = options.webProviderStatuses.find(
    (provider) => provider.provider === (options.providerId as WebProviderId),
  );
  const webReady = isWebLaneReady(webStatus);

  if (webStatus && webStatus.credentialState !== "missing") {
    return "web-login";
  }

  if (byokReady && !webReady) {
    return "byok";
  }

  if (webReady && !byokReady) {
    return "web-login";
  }

  return undefined;
}

function jsonResponse(status: number, body: unknown): ServiceSurfaceResponse {
  return {
    status,
    body,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
}

function mapWebFailureStatus(failure: {
  errorCategory:
    | "provider-unavailable"
    | "model-resolution-error"
    | "routing-error"
    | string;
}): number {
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

function createByokExecutor(options: {
  byokClient: {
    generateText(request: GenerateTextRequest): Promise<{
      ok: boolean;
      text?: string;
      diagnostics: Array<{ code: string; message: string }>;
      prepared?: unknown;
    }>;
  };
}): RuntimeLaneExecutors<ServiceInvokePayload, ServiceInvokeResult>["byok"] {
  return {
    execute: async ({ plan, input }) => {
      const payload = input;
      const result = await options.byokClient.generateText({
        model: `${plan.selection.providerId}/${plan.selection.model.modelId}`,
        prompt: payload.input,
        system:
          typeof payload.system === "string" ? payload.system : undefined,
        maxOutputTokens:
          typeof payload.maxOutputTokens === "number"
            ? payload.maxOutputTokens
            : undefined,
        temperature:
          typeof payload.temperature === "number"
            ? payload.temperature
            : undefined,
        stream: payload.stream === true,
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

        return {
          ok: false,
          laneId: "byok",
          providerId: plan.selection.providerId,
          modelId: plan.selection.model.modelId,
          httpStatus: status,
          errorType: type,
          message:
            primaryDiagnostic?.message ??
            "BYOK invocation failed without a structured diagnostic.",
          diagnostics: result.diagnostics,
          details: {
            routes: buildServiceRouteCatalog(),
          },
        };
      }

      return {
        ok: true,
        laneId: "byok",
        providerId: plan.selection.providerId,
        modelId: plan.selection.model.modelId,
        outputText: result.text ?? "",
        diagnostics: result.diagnostics,
        details: {
          prepared: result.prepared,
        },
      };
    },
  };
}

function createWebExecutor(options: {
  webLane: WebLoginLane;
  context: WebLaneContext;
  ownerUserId: string;
}): RuntimeLaneExecutors<ServiceInvokePayload, ServiceInvokeResult>["web-login"] {
  return {
    execute: async ({ plan, input }) => {
      const request: RuntimeInvocationRequest = {
        provider: plan.selection.providerId as WebProviderId,
        model: plan.selection.model.modelId,
        input: input.input,
        lane:
          plan.selection.laneId === "web-login" || input.lane === "web"
            ? "web"
            : undefined,
        intent: "text-generation",
        stream: input.stream === true,
      };

      const result = await options.webLane.invoke(request, options.context);

      if (!result.ok) {
        const providers = await options.webLane.authStatus(options.context);
        const runtimeProvider = providers.find(
          (entry) => entry.provider === result.provider,
        );
        const auth = runtimeProvider
          ? buildServiceAuthStatusView(
              [runtimeProvider],
              options.ownerUserId,
            ).providers[0]
          : undefined;

        return {
          ok: false,
          laneId: "web-login",
          providerId: plan.selection.providerId,
          modelId: plan.selection.model.modelId,
          httpStatus: mapWebFailureStatus(result),
          errorType: result.errorCategory,
          message: result.message,
          diagnostics: result.diagnostics,
          suggestedAction: result.suggestedAction,
          details: {
            authPortal: SERVICE_AUTH_PORTAL_METADATA,
            routes: buildServiceRouteCatalog(),
            auth,
            remediation: runtimeProvider
              ? buildServiceProviderRemediationView(
                  runtimeProvider,
                  options.ownerUserId,
                )
              : undefined,
          },
        };
      }

      return {
        ok: true,
        laneId: "web-login",
        providerId: plan.selection.providerId,
        modelId: plan.selection.model.modelId,
        outputText: result.outputText,
        diagnostics: result.diagnostics,
        details: {
          result,
        },
      };
    },
  };
}

export function createServiceRuntimeInvoker(options: {
  runtime: SwitchyardRuntime;
  byokClient: {
    generateText(request: GenerateTextRequest): Promise<{
      ok: boolean;
      text?: string;
      diagnostics: Array<{ code: string; message: string }>;
      prepared?: unknown;
    }>;
  };
  webLane: WebLoginLane;
  context: WebLaneContext;
  ownerUserId: string;
}) {
  const executors: RuntimeLaneExecutors<
    ServiceInvokePayload,
    ServiceInvokeResult
  > = {
    byok: createByokExecutor({
      byokClient: options.byokClient,
    }),
    "web-login": createWebExecutor({
      webLane: options.webLane,
      context: options.context,
      ownerUserId: options.ownerUserId,
    }),
  };

  return async (args: {
    request: RuntimeRequest;
    body: Record<string, unknown>;
  }): Promise<ServiceInvokeResult | ServiceSurfaceResponse> =>
  {
    const payload = toServiceInvokePayload(args.body);

    if (!payload) {
      return jsonResponse(400, {
        error: {
          message: "provider, model, and input are required string fields.",
          type: "invalid_request_error",
        },
      });
    }

    return options.runtime.invoke(args.request, executors, {
      byok: payload,
      "web-login": payload,
    });
  };
}
