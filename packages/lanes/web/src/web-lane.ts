import type { RuntimeInvocationRequest, WebLaneSnapshot } from "./types.js";
import type { RuntimeInvocationResult } from "./types.js";
import type { WebLaneContext } from "./provider-runtime.js";
import { WebProviderRegistry } from "./registry.js";

export class WebLoginLane {
  constructor(private readonly registry: WebProviderRegistry) {}

  async discover(context: WebLaneContext = {}) {
    return Promise.all(
      this.registry.list().map(async (provider) => provider.getStatus(context)),
    );
  }

  async authStatus(context: WebLaneContext = {}) {
    return this.discover(context);
  }

  async health(context: WebLaneContext = {}): Promise<WebLaneSnapshot> {
    const providers = await this.discover(context);

    return {
      lane: "web",
      generatedAt: (context.now ?? (() => new Date()))().toISOString(),
      providers,
      totals: {
        total: providers.length,
        ready: providers.filter((provider) => provider.runtimeReadiness === "ready").length,
        degraded: providers.filter((provider) =>
          ["expiring", "refreshable-but-degraded"].includes(provider.credentialState),
        ).length,
        userActionRequired: providers.filter((provider) =>
          ["missing", "expired", "user-action-required"].includes(
            provider.credentialState,
          ),
        ).length,
        unavailable: providers.filter(
          (provider) => provider.credentialState === "provider-unavailable",
        ).length,
      },
    };
  }

  async invoke(
    request: RuntimeInvocationRequest,
    context: WebLaneContext = {},
  ): Promise<RuntimeInvocationResult> {
    const provider = this.registry.get(request.provider);

    if (!provider) {
      return {
        ok: false,
        lane: "web",
        provider: request.provider,
        model: request.model,
        errorCode: "routing-error",
        errorCategory: "routing-error",
        message: `Unknown Web/Login provider: ${request.provider}`,
        failureStage: "routing",
        diagnostics: [],
        suggestedAction: "Use provider discovery to pick one of the five supported web providers.",
      };
    }

    return provider.invoke(request, context);
  }
}
