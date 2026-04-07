export const V1_LANE_IDS = ['byok', 'web-login'] as const;
export type LaneId = (typeof V1_LANE_IDS)[number];

export const V1_BYOK_PROVIDER_IDS = [
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

export const V1_WEB_LOGIN_PROVIDER_IDS = [
  'chatgpt',
  'gemini',
  'claude',
  'grok',
  'qwen'
] as const;

export const V1_PROVIDER_IDS = [
  'openai',
  'anthropic',
  'gemini',
  'xai',
  'openrouter',
  'groq',
  'qwen',
  'vertex',
  'bedrock',
  'chatgpt',
  'claude',
  'grok'
] as const;

export type ProviderId = (typeof V1_PROVIDER_IDS)[number];

export const SURFACE_IDS = ['service', 'sdk'] as const;
export type SurfaceId = (typeof SURFACE_IDS)[number];

export const CONSUMER_PLACEMENTS = ['first-party', 'future-compat'] as const;
export type ConsumerPlacement = (typeof CONSUMER_PLACEMENTS)[number];

export interface ConsumerContext {
  readonly consumerId: string;
  readonly placement: ConsumerPlacement;
}

const PROVIDER_LANE_COMPATIBILITY: Readonly<Record<ProviderId, readonly LaneId[]>> = {
  openai: ['byok'],
  anthropic: ['byok'],
  gemini: ['byok', 'web-login'],
  xai: ['byok'],
  openrouter: ['byok'],
  groq: ['byok'],
  qwen: ['byok', 'web-login'],
  vertex: ['byok'],
  bedrock: ['byok'],
  chatgpt: ['web-login'],
  claude: ['web-login'],
  grok: ['web-login']
};

const PROVIDER_ALIASES: Readonly<Record<string, ProviderId>> = {
  'chat-gpt': 'chatgpt',
  'claude-ai': 'claude',
  'open-router': 'openrouter',
  'x-ai': 'xai',
  'x.ai': 'xai'
};

export function isLaneId(value: string): value is LaneId {
  return normalizeLaneId(value) !== undefined;
}

export function normalizeLaneId(value: string): LaneId | undefined {
  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, '-');

  switch (normalized) {
    case 'byok':
    case 'api-key':
      return 'byok';
    case 'web':
    case 'weblogin':
    case 'web-login':
    case 'web/login':
      return 'web-login';
    default:
      return undefined;
  }
}

export function isProviderId(value: string): value is ProviderId {
  return normalizeProviderId(value) !== undefined;
}

export function normalizeProviderId(value: string): ProviderId | undefined {
  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, '-');
  const canonical = PROVIDER_ALIASES[normalized] ?? normalized;

  return (V1_PROVIDER_IDS as readonly string[]).includes(canonical)
    ? (canonical as ProviderId)
    : undefined;
}

export function providerSupportsLane(providerId: ProviderId, laneId: LaneId): boolean {
  return PROVIDER_LANE_COMPATIBILITY[providerId].includes(laneId);
}

export function providerSupportedLanes(providerId: ProviderId): readonly LaneId[] {
  return PROVIDER_LANE_COMPATIBILITY[providerId];
}

export function listV1ProvidersForLane(laneId: LaneId): readonly ProviderId[] {
  return (V1_PROVIDER_IDS as readonly ProviderId[]).filter((providerId) =>
    providerSupportsLane(providerId, laneId)
  );
}
