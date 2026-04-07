import type {
  ByokProviderRegistration,
  ModelReference,
  ProviderExecutionContext,
  ProviderTextResult,
  TextGenerationInput,
} from './contracts.js';
import {
  modelResolutionDiagnostic,
  providerCapabilityDiagnostic,
  providerNotImplementedDiagnostic,
} from './diagnostics.js';
import { ByokProviderRegistry } from './provider-registry.js';

export interface ByokTextDispatchSuccess {
  ok: true;
  provider: ByokProviderRegistration;
  model: ModelReference;
  input: TextGenerationInput;
}

export type ByokTextDispatchResolution =
  | ByokTextDispatchSuccess
  | {
      ok: false;
      diagnostics: ReturnType<typeof modelResolutionDiagnostic>[];
    };

export function resolveByokTextDispatch(
  registry: ByokProviderRegistry,
  request: {
    model: string | ModelReference;
    input: TextGenerationInput;
  },
): ByokTextDispatchResolution {
  let model: ModelReference;

  try {
    model = registry.resolveModel(request.model);
  } catch (error) {
    return {
      ok: false,
      diagnostics: [
        modelResolutionDiagnostic(
          error instanceof Error ? error.message : 'Failed to resolve model.',
        ),
      ],
    };
  }

  const provider = registry.get(model.provider);

  if (!provider) {
    return {
      ok: false,
      diagnostics: [
        modelResolutionDiagnostic(
          `Provider "${model.provider}" is not registered.`,
        ),
      ],
    };
  }

  if (!provider.capabilities.textGeneration) {
    return {
      ok: false,
      diagnostics: [
        modelResolutionDiagnostic(
          `${model.id} does not support text generation.`,
        ),
      ],
    };
  }

  if (request.input.stream && !provider.capabilities.streaming) {
    return {
      ok: false,
      diagnostics: [
        modelResolutionDiagnostic(
          `${model.id} is not currently wired for streaming in Kernel Alpha.`,
        ),
      ],
    };
  }

  return {
    ok: true,
    provider,
    model,
    input: request.input,
  };
}

export function prepareByokTextInvocation(
  registry: ByokProviderRegistry,
  request: {
    model: string | ModelReference;
    input: TextGenerationInput;
  },
  context: ProviderExecutionContext,
) {
  const resolution = resolveByokTextDispatch(registry, request);

  if (!resolution.ok) {
    return resolution;
  }

  const preparation = resolution.provider.prepareText(
    {
      model: resolution.model,
      input: resolution.input,
    },
    context,
  );

  if (!preparation.ok) {
    return preparation;
  }

  return {
    ok: true as const,
    provider: resolution.provider,
    model: resolution.model,
    prepared: preparation.prepared,
    diagnostics: preparation.diagnostics,
  };
}

export async function invokeByokText(
  registry: ByokProviderRegistry,
  request: {
    model: string | ModelReference;
    input: TextGenerationInput;
  },
  context: ProviderExecutionContext,
): Promise<ProviderTextResult> {
  const preparation = prepareByokTextInvocation(registry, request, context);

  if (!preparation.ok) {
    return {
      ok: false,
      diagnostics: preparation.diagnostics,
    };
  }

  if (!preparation.provider.invokeText) {
    return {
      ok: false,
      prepared: preparation.prepared,
      diagnostics: [
        ...preparation.diagnostics,
        providerNotImplementedDiagnostic(
          preparation.provider.provider,
          preparation.model.id,
        ),
      ],
    };
  }

  const provider = preparation.provider;
  const invokeText = provider.invokeText;

  if (!invokeText) {
    return {
      ok: false,
      prepared: preparation.prepared,
      diagnostics: [
        ...preparation.diagnostics,
        providerNotImplementedDiagnostic(
          preparation.provider.provider,
          preparation.model.id,
        ),
      ],
    };
  }

  const result = await invokeText.call(
    provider,
    {
      model: preparation.model,
      input: request.input,
    },
    context,
  );

  if (!result.ok && result.prepared == null) {
    return {
      ...result,
      prepared: preparation.prepared,
    };
  }

  return result;
}
