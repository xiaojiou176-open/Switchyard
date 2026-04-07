import { describe, expect, it } from 'vitest';

import {
  listV1ProvidersForLane,
  normalizeLaneId,
  providerSupportedLanes,
  providerSupportsLane
} from '../../../packages/contracts/src/index';

describe('provider and lane invariants', () => {
  it('normalizes the two V1 lanes and keeps the boundary explicit', () => {
    expect(normalizeLaneId('BYOK')).toBe('byok');
    expect(normalizeLaneId('web/login')).toBe('web-login');
    expect(normalizeLaneId('agent')).toBeUndefined();
  });

  it('exposes supported provider/lane relationships without mixing future lanes', () => {
    expect(providerSupportsLane('chatgpt', 'byok')).toBe(false);
    expect(providerSupportsLane('chatgpt', 'web-login')).toBe(true);
    expect(providerSupportedLanes('gemini')).toEqual(['byok', 'web-login']);
  });

  it('returns the fixed V1 provider universe for each lane', () => {
    expect(listV1ProvidersForLane('web-login')).toContain('chatgpt');
    expect(listV1ProvidersForLane('byok')).toContain('openai');
    expect(listV1ProvidersForLane('byok')).not.toContain('chatgpt');
  });
});
