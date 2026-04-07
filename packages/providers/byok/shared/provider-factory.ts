import { createCapabilities } from '../../../lanes/byok/src/capabilities.js';
import type {
  ByokProviderId,
  ByokProviderRegistration,
  CapabilityMatrix,
  CredentialRequirement,
  DescriptorTransportDescriptor,
  ModelCatalogDescriptor,
  ModelReference,
  ProviderTransportContract,
  ResolvedTransportBaseUrl,
  TransportAuthScheme,
  TransportRequestShape,
} from '../../../lanes/byok/src/contracts.js';
import { missingCredentialDiagnostic } from '../../../lanes/byok/src/diagnostics.js';
import { createModelReference } from '../../../lanes/byok/src/model-reference.js';

interface DescriptorProviderOptions {
  provider: ByokProviderId;
  displayName: string;
  credential: Omit<CredentialRequirement, 'presence'> & {
    presence?: CredentialRequirement['presence'];
  };
  modelCatalog: ModelCatalogDescriptor;
  capabilities?: Partial<CapabilityMatrix>;
  transport: Partial<Omit<ProviderTransportContract, 'family' | 'auth'>> & {
    family: ProviderTransportContract['family'];
    entrypoint?: string;
    auth?: Omit<ProviderTransportContract['auth'], 'envNames'> & {
      envNames?: readonly string[];
    };
  };
}

interface ResolvedEnvValue {
  value: string;
  envName: string;
}

function normalizeBaseUrl(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function defaultRequestShape(
  family: ProviderTransportContract['family'],
): TransportRequestShape {
  switch (family) {
    case 'openai-responses':
      return 'responses';
    case 'anthropic-messages':
      return 'messages';
    case 'google-generative-ai':
    case 'gemini-generative-language':
      return 'generate-content';
    case 'google-vertex':
      return 'vertex-generate-content';
    case 'aws-bedrock':
      return 'bedrock-converse';
    case 'openai-compatible':
    default:
      return 'chat-completions';
  }
}

function defaultAuthScheme(
  family: ProviderTransportContract['family'],
): TransportAuthScheme {
  switch (family) {
    case 'anthropic-messages':
      return 'x-api-key';
    case 'gemini-generative-language':
    case 'google-generative-ai':
      return 'query-api-key';
    case 'google-vertex':
      return 'google-vertex';
    case 'aws-bedrock':
      return 'aws-sigv4';
    case 'openai-responses':
    case 'openai-compatible':
    default:
      return 'bearer';
  }
}

function defaultPath(
  family: ProviderTransportContract['family'],
  entrypoint?: string,
): string {
  if (entrypoint?.startsWith('/')) {
    return entrypoint;
  }

  switch (family) {
    case 'openai-responses':
      return '/v1/responses';
    case 'anthropic-messages':
      return '/v1/messages';
    case 'google-vertex':
      return '/publishers/google/models/{model}:generateContent';
    case 'aws-bedrock':
      return '/model/{model}/converse';
    case 'gemini-generative-language':
    case 'google-generative-ai':
      return '/models/{model}:generateContent';
    case 'openai-compatible':
    default:
      return '/v1/chat/completions';
  }
}

function cloneTransportContract(
  credential: CredentialRequirement,
  transport: DescriptorProviderOptions['transport'],
): ProviderTransportContract {
  return {
    ...transport,
    method: transport.method ?? 'POST',
    requestShape: transport.requestShape ?? defaultRequestShape(transport.family),
    path: transport.path ?? defaultPath(transport.family, transport.entrypoint),
    baseUrl: transport.baseUrl ? normalizeBaseUrl(transport.baseUrl) : undefined,
    baseUrlEnvNames: transport.baseUrlEnvNames
      ? [...transport.baseUrlEnvNames]
      : undefined,
    headers: transport.headers ? { ...transport.headers } : undefined,
    auth: {
      scheme: transport.auth?.scheme ?? defaultAuthScheme(transport.family),
      envNames: [...(transport.auth?.envNames ?? credential.envNames)],
    },
    sdkBinding: transport.sdkBinding ? { ...transport.sdkBinding } : undefined,
  };
}

export function createDescriptorProvider(
  options: DescriptorProviderOptions,
): ByokProviderRegistration {
  const capabilities = createCapabilities(options.capabilities);
  const credential: CredentialRequirement = {
    ...options.credential,
    presence: options.credential.presence ?? {
      kind: 'any',
    },
  };
  const modelCatalog = { ...options.modelCatalog };
  const transport = cloneTransportContract(credential, options.transport);

  return {
    provider: options.provider,
    displayName: options.displayName,
    lane: 'byok',
    implementation: 'descriptor-baseline',
    credential,
    capabilities,
    modelCatalog,
    transport,
    createModel(modelId: string) {
      return createModelReference(options.provider, modelId);
    },
    prepareText(request, context) {
      if (!hasRequiredCredential(context.env, credential)) {
        return {
          ok: false,
          diagnostics: [
            missingCredentialDiagnostic(
              options.provider,
              request.model.id,
              credential,
            ),
          ],
        };
      }

      const resolvedBaseUrl = resolveTransportBaseUrl(
        context.env,
        transport.baseUrl,
        transport.baseUrlEnvNames,
      );
      const descriptor: DescriptorTransportDescriptor = {
        kind: 'descriptor',
        contract: transport,
        resolvedBaseUrl,
      };

      return {
        ok: true,
        prepared: {
          provider: options.provider,
          model: request.model,
          transport: descriptor,
          credential,
          capabilities,
        },
        diagnostics: [],
      };
    },
  };
}

export function createProviderModelFactory<TProvider extends ByokProviderId>(
  provider: TProvider,
): ((modelId: string) => ModelReference) & { readonly provider: TProvider } {
  const factory = (modelId: string) => createModelReference(provider, modelId);
  return Object.assign(factory, { provider });
}

export function resolveNamedValue(
  env: Record<string, string | undefined>,
  envNames: readonly string[],
): ResolvedEnvValue | undefined {
  for (const envName of envNames) {
    const value = env[envName]?.trim();

    if (value) {
      return {
        value,
        envName,
      };
    }
  }

  return undefined;
}

export function resolveTransportBaseUrl(
  env: Record<string, string | undefined>,
  defaultBaseUrl?: string,
  envNames: readonly string[] = [],
): ResolvedTransportBaseUrl | undefined {
  const resolved = resolveNamedValue(env, envNames);

  if (resolved) {
    return {
      value: normalizeBaseUrl(resolved.value),
      source: 'env',
      envName: resolved.envName,
    };
  }

  if (!defaultBaseUrl) {
    return undefined;
  }

  return {
    value: normalizeBaseUrl(defaultBaseUrl),
    source: 'default',
  };
}

export function hasRequiredCredential(
  env: Record<string, string | undefined>,
  credential: CredentialRequirement,
): boolean {
  switch (credential.presence.kind) {
    case 'all':
      return credential.envNames.every(envName => Boolean(env[envName]?.trim()));
    case 'any-set':
      return credential.presence.envSets.some(envSet =>
        envSet.every(envName => Boolean(env[envName]?.trim())),
      );
    case 'any':
    default:
      return credential.envNames.some(envName => Boolean(env[envName]?.trim()));
  }
}

export function resolveCredentialValue(
  env: Record<string, string | undefined>,
  envNames: readonly string[],
): string | undefined {
  return resolveNamedValue(env, envNames)?.value;
}
