import type { WebProviderId } from "./types.js";
import type { WebProviderRuntime } from "./provider-runtime.js";

export class WebProviderRegistry {
  readonly #providers = new Map<WebProviderId, WebProviderRuntime>();

  constructor(providers: WebProviderRuntime[]) {
    for (const provider of providers) {
      if (this.#providers.has(provider.descriptor.provider)) {
        throw new Error(
          `Duplicate Web/Login provider registration: ${provider.descriptor.provider}`,
        );
      }

      this.#providers.set(provider.descriptor.provider, provider);
    }
  }

  get(provider: WebProviderId): WebProviderRuntime | undefined {
    return this.#providers.get(provider);
  }

  list(): WebProviderRuntime[] {
    return [...this.#providers.values()];
  }
}
