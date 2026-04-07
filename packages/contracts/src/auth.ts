export const AUTH_MODES = ['api-key', 'oauth', 'session', 'web-login'] as const;
export type AuthMode = (typeof AUTH_MODES)[number];

export const CREDENTIAL_STATES = [
  'missing',
  'configured',
  'expired',
  'invalid',
  'refreshable-degraded',
  'user-action-required'
] as const;

export type CredentialState = (typeof CREDENTIAL_STATES)[number];

export function isCredentialUsable(state: CredentialState | undefined): boolean {
  return state === 'configured' || state === 'refreshable-degraded';
}
