export const AUTH_MODE_CATALOG = {
  byok: {
    id: 'byok',
    label: 'BYOK',
    laneId: 'byok',
    description: 'User supplies an official API key managed as local user-owned material.'
  },
  'web-login': {
    id: 'web-login',
    label: 'Web/Login',
    laneId: 'web-login',
    description: 'User signs in with a browser, OAuth flow, or subscription-backed web session.'
  }
} as const;

export const AUTH_MODE_IDS = Object.keys(AUTH_MODE_CATALOG) as AuthModeId[];

export type AuthModeId = keyof typeof AUTH_MODE_CATALOG;
export type LaneId = AuthModeId;

export const BYOK_PROVIDER_IDS = [
  'openai',
  'anthropic',
  'gemini',
  'xai',
  'openrouter',
  'groq',
  'qwen',
  'vertex',
  'bedrock'
] as const;

export const WEB_LOGIN_PROVIDER_IDS = ['chatgpt', 'gemini', 'claude', 'grok', 'qwen'] as const;

export type ByokProviderId = (typeof BYOK_PROVIDER_IDS)[number];
export type WebLoginProviderId = (typeof WEB_LOGIN_PROVIDER_IDS)[number];
export type ProviderId = ByokProviderId | WebLoginProviderId;

export const SINGLE_PROVIDER_SINGLE_ACCOUNT = 'single-provider-single-account' as const;
export type AccountStrategy = typeof SINGLE_PROVIDER_SINGLE_ACCOUNT;
export type StabilityTarget = 'baseline' | 'high-stability';

export interface ProviderSupportDescriptor {
  providerId: ProviderId;
  displayName: string;
  authModeId: AuthModeId;
  laneId: LaneId;
  accountStrategy: AccountStrategy;
  requiredInV1: true;
  stabilityTarget: StabilityTarget;
}

export const BYOK_PROVIDER_CATALOG = [
  {
    providerId: 'openai',
    displayName: 'OpenAI',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'anthropic',
    displayName: 'Anthropic',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'gemini',
    displayName: 'Gemini',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'xai',
    displayName: 'xAI / Grok API',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'openrouter',
    displayName: 'OpenRouter',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'groq',
    displayName: 'Groq',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'qwen',
    displayName: 'Qwen API',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'vertex',
    displayName: 'Vertex AI',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'bedrock',
    displayName: 'Bedrock',
    authModeId: 'byok',
    laneId: 'byok',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  }
] as const satisfies readonly ProviderSupportDescriptor[];

export const WEB_LOGIN_PROVIDER_CATALOG = [
  {
    providerId: 'chatgpt',
    displayName: 'ChatGPT',
    authModeId: 'web-login',
    laneId: 'web-login',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'high-stability'
  },
  {
    providerId: 'gemini',
    displayName: 'Gemini',
    authModeId: 'web-login',
    laneId: 'web-login',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'high-stability'
  },
  {
    providerId: 'claude',
    displayName: 'Claude',
    authModeId: 'web-login',
    laneId: 'web-login',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'high-stability'
  },
  {
    providerId: 'grok',
    displayName: 'Grok',
    authModeId: 'web-login',
    laneId: 'web-login',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  },
  {
    providerId: 'qwen',
    displayName: 'Qwen',
    authModeId: 'web-login',
    laneId: 'web-login',
    accountStrategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
    requiredInV1: true,
    stabilityTarget: 'baseline'
  }
] as const satisfies readonly ProviderSupportDescriptor[];

export const PROVIDER_SUPPORT_CATALOG = [
  ...BYOK_PROVIDER_CATALOG,
  ...WEB_LOGIN_PROVIDER_CATALOG
] as const satisfies readonly ProviderSupportDescriptor[];

export function getProviderSupportDescriptor(
  providerId: ProviderId,
  authModeId: AuthModeId
): ProviderSupportDescriptor {
  const descriptor = PROVIDER_SUPPORT_CATALOG.find(
    (entry) => entry.providerId === providerId && entry.authModeId === authModeId
  );

  if (!descriptor) {
    throw new Error(`Unsupported provider/auth mode pair: ${providerId}/${authModeId}`);
  }

  return descriptor;
}
