import type {
  ByokProviderId,
  ByokProviderRegistration,
  ModelReference,
} from './contracts.js';
import { createModelReference, parseModelReference } from './model-reference.js';

export class ByokProviderRegistry {
  readonly #providers = new Map<ByokProviderId, ByokProviderRegistration>();

  constructor(registrations: readonly ByokProviderRegistration[]) {
    for (const registration of registrations) {
      this.#providers.set(registration.provider, registration);
    }
  }

  list(): readonly ByokProviderRegistration[] {
    return [...this.#providers.values()];
  }

  get(provider: ByokProviderId): ByokProviderRegistration | undefined {
    return this.#providers.get(provider);
  }

  resolveModel(reference: string | ModelReference): ModelReference {
    const parsed =
      typeof reference === 'string'
        ? parseModelReference(reference)
        : createModelReference(reference.provider, reference.model);

    const provider = this.get(parsed.provider);

    if (!provider) {
      throw new Error(`Provider "${parsed.provider}" is not registered.`);
    }

    return provider.createModel(parsed.model);
  }
}
