import {
  supportedByokProviders,
  type ByokProviderId,
  type ModelReference,
} from './contracts.js';

const providerIds = new Set<string>(supportedByokProviders);

export function isByokProviderId(value: string): value is ByokProviderId {
  return providerIds.has(value);
}

export function createModelReference(
  provider: ByokProviderId,
  model: string,
): ModelReference {
  const normalizedModel = model.trim();

  if (normalizedModel.length === 0) {
    throw new Error('Model id must be a non-empty string.');
  }

  return {
    provider,
    model: normalizedModel,
    id: `${provider}/${normalizedModel}` as const,
  };
}

export function parseModelReference(value: string): ModelReference {
  const normalizedValue = value.trim();
  const slashIndex = normalizedValue.indexOf('/');

  if (slashIndex <= 0 || slashIndex === normalizedValue.length - 1) {
    throw new Error(
      `Model reference "${value}" must follow the provider/model format.`,
    );
  }

  const provider = normalizedValue.slice(0, slashIndex);
  const model = normalizedValue.slice(slashIndex + 1);

  if (!isByokProviderId(provider)) {
    throw new Error(
      `Unsupported BYOK provider "${provider}" in model reference "${value}".`,
    );
  }

  return createModelReference(provider, model);
}

export function formatModelReference(reference: ModelReference): string {
  return reference.id;
}
