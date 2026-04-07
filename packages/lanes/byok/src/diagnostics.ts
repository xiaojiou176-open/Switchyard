import type {
  ByokProviderId,
  CredentialRequirement,
  CredentialState,
  RuntimeDiagnostic,
} from './contracts.js';

interface DiagnosticInput {
  provider?: ByokProviderId;
  modelReference?: string;
  state?: CredentialState;
  retryable?: boolean;
  userActionRequired?: boolean;
}

export function createDiagnostic(
  code: RuntimeDiagnostic['code'],
  message: string,
  input: DiagnosticInput = {},
): RuntimeDiagnostic {
  return {
    code,
    message,
    provider: input.provider,
    modelReference: input.modelReference,
    state: input.state,
    retryable: input.retryable ?? false,
    userActionRequired: input.userActionRequired ?? false,
  };
}

export function missingCredentialDiagnostic(
  provider: ByokProviderId,
  modelReference: string,
  requirement: CredentialRequirement,
): RuntimeDiagnostic {
  const expectation =
    requirement.presence.kind === 'all'
      ? `all of: ${requirement.envNames.join(', ')}`
      : requirement.presence.kind === 'any-set'
        ? requirement.presence.envSets
            .map(envSet => `[${envSet.join(', ')}]`)
            .join(' or ')
        : `one of: ${requirement.envNames.join(', ')}`;

  return createDiagnostic(
    'missing-credential',
    `Missing credential for ${provider}. Expected ${expectation}.`,
    {
      provider,
      modelReference,
      state: 'missing',
      userActionRequired: true,
    },
  );
}

export function providerCapabilityDiagnostic(
  provider: ByokProviderId,
  modelReference: string,
  message: string,
): RuntimeDiagnostic {
  return createDiagnostic('provider-capability-mismatch', message, {
    provider,
    modelReference,
  });
}

export function modelResolutionDiagnostic(message: string): RuntimeDiagnostic {
  return createDiagnostic('model-resolution-error', message, {
    userActionRequired: true,
  });
}

export function providerUnavailableDiagnostic(
  provider: ByokProviderId,
  modelReference: string,
  message: string,
  retryable = true,
): RuntimeDiagnostic {
  return createDiagnostic('provider-unavailable', message, {
    provider,
    modelReference,
    state: 'provider-unavailable',
    retryable,
  });
}

export function providerNotImplementedDiagnostic(
  provider: ByokProviderId,
  modelReference: string,
): RuntimeDiagnostic {
  return createDiagnostic(
    'provider-not-implemented',
    `${provider} is registered in Kernel Alpha, but only the Gemini API Key path is executable in this worker scope.`,
    {
      provider,
      modelReference,
      userActionRequired: true,
    },
  );
}
