export const supportedByokProviders = [
  'openai',
  'anthropic',
  'gemini',
  'xai',
  'openrouter',
  'groq',
  'qwen',
  'vertex',
  'bedrock',
] as const;

export type ByokProviderId = (typeof supportedByokProviders)[number];
export type ByokLaneId = 'byok';
export type ByokImplementation =
  | 'descriptor-baseline'
  | 'executable-baseline';
export type ByokCredentialMode =
  | 'api-key'
  | 'google-vertex'
  | 'google-adc'
  | 'aws-sigv4';
export type CredentialPresenceRule =
  | {
      kind: 'any';
    }
  | {
      kind: 'all';
    }
  | {
      kind: 'any-set';
      envSets: readonly (readonly string[])[];
    };
export type CredentialState =
  | 'missing'
  | 'ready'
  | 'expiring'
  | 'expired'
  | 'refreshable-but-degraded'
  | 'provider-unavailable'
  | 'user-action-required';
export type DiagnosticCode =
  | 'missing-credential'
  | 'expired-session'
  | 'refreshable-but-degraded'
  | 'provider-unavailable'
  | 'user-action-required'
  | 'provider-capability-mismatch'
  | 'model-resolution-error'
  | 'provider-not-implemented';

export interface RuntimeDiagnostic {
  code: DiagnosticCode;
  message: string;
  provider?: ByokProviderId;
  modelReference?: string;
  state?: CredentialState;
  retryable: boolean;
  userActionRequired: boolean;
}

export interface CapabilityMatrix {
  textGeneration: boolean;
  streaming: boolean;
  toolCalling: boolean;
  imageInput: boolean;
  fileInput: boolean;
  webLogin: boolean;
  officialApi: boolean;
}

export interface CredentialRequirement {
  mode: ByokCredentialMode;
  envNames: readonly string[];
  description: string;
  presence: CredentialPresenceRule;
}

export interface ModelCatalogDescriptor {
  mode: 'inline-default' | 'provider-owned' | 'user-specified';
  defaultModel?: string;
  recommendedModel?: string;
}

export type TransportRequestShape =
  | 'responses'
  | 'messages'
  | 'chat-completions'
  | 'generate-content'
  | 'vertex-generate-content'
  | 'bedrock-converse';

export type TransportAuthScheme =
  | 'bearer'
  | 'x-api-key'
  | 'query-api-key'
  | 'google-vertex'
  | 'aws-sigv4';

export interface SdkBindingDescriptor {
  packageName: string;
  exportName: string;
  setup: 'default-provider' | 'create-provider';
  modelInvocation: string;
}

export interface TransportAuthDescriptor {
  scheme: TransportAuthScheme;
  envNames: readonly string[];
}

export interface ProviderTransportContract {
  family:
    | 'openai-responses'
    | 'anthropic-messages'
    | 'google-generative-ai'
    | 'gemini-generative-language'
    | 'openai-compatible'
    | 'google-vertex'
    | 'aws-bedrock';
  method: 'POST';
  requestShape: TransportRequestShape;
  baseUrl?: string;
  baseUrlEnvNames?: readonly string[];
  path: string;
  headers?: Readonly<Record<string, string>>;
  auth: TransportAuthDescriptor;
  sdkBinding?: SdkBindingDescriptor;
}

export interface ResolvedTransportBaseUrl {
  value: string;
  source: 'default' | 'env';
  envName?: string;
}

export interface ModelReference {
  provider: ByokProviderId;
  model: string;
  id: `${ByokProviderId}/${string}`;
}

export interface TextGenerationInput {
  prompt: string;
  system?: string;
  stream?: boolean;
  maxOutputTokens?: number;
  temperature?: number;
}

export interface ProviderTextRequest {
  model: ModelReference;
  input: TextGenerationInput;
}

export interface HttpTransportDescriptor {
  kind: 'http';
  contract: ProviderTransportContract;
  method: ProviderTransportContract['method'];
  resolvedBaseUrl: ResolvedTransportBaseUrl;
  url: string;
  headers: Readonly<Record<string, string>>;
  body: unknown;
}

export interface DescriptorTransportDescriptor {
  kind: 'descriptor';
  contract: ProviderTransportContract;
  resolvedBaseUrl?: ResolvedTransportBaseUrl;
}

export type TransportDescriptor =
  | HttpTransportDescriptor
  | DescriptorTransportDescriptor;

export interface PreparedTextInvocation {
  provider: ByokProviderId;
  model: ModelReference;
  transport: TransportDescriptor;
  credential: CredentialRequirement;
  capabilities: CapabilityMatrix;
}

export type ProviderTextPreparation =
  | {
      ok: true;
      prepared: PreparedTextInvocation;
      diagnostics: RuntimeDiagnostic[];
    }
  | {
      ok: false;
      diagnostics: RuntimeDiagnostic[];
    };

export type ProviderTextResult =
  | {
      ok: true;
      text: string;
      prepared: PreparedTextInvocation;
      diagnostics: RuntimeDiagnostic[];
      raw?: unknown;
    }
  | {
      ok: false;
      prepared?: PreparedTextInvocation;
      diagnostics: RuntimeDiagnostic[];
      raw?: unknown;
    };

export interface ProviderExecutionContext {
  env: Record<string, string | undefined>;
  fetch: typeof fetch;
  signal?: AbortSignal;
}

export interface ByokProviderRegistration {
  provider: ByokProviderId;
  displayName: string;
  lane: ByokLaneId;
  implementation: ByokImplementation;
  credential: CredentialRequirement;
  capabilities: CapabilityMatrix;
  modelCatalog: ModelCatalogDescriptor;
  transport: ProviderTransportContract;
  createModel(modelId: string): ModelReference;
  prepareText(
    request: ProviderTextRequest,
    context: ProviderExecutionContext,
  ): ProviderTextPreparation;
  invokeText?(
    request: ProviderTextRequest,
    context: ProviderExecutionContext,
  ): Promise<ProviderTextResult>;
}
