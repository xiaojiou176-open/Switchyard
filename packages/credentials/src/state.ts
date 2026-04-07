import type { AuthModeId } from './catalog.js';

export const CREDENTIAL_STATES = [
  'missing',
  'ready',
  'expiring',
  'expired',
  'refreshable-but-degraded',
  'provider-unavailable',
  'user-action-required'
] as const;

export type CredentialState = (typeof CREDENTIAL_STATES)[number];

export const CREDENTIAL_WORKFLOW_IDS = ['login', 'status', 're-auth'] as const;
export type CredentialWorkflowId = (typeof CREDENTIAL_WORKFLOW_IDS)[number];

export interface CredentialWorkflowDescriptor {
  id: CredentialWorkflowId;
  label: string;
  description: string;
}

export const CREDENTIAL_WORKFLOWS: readonly CredentialWorkflowDescriptor[] = [
  {
    id: 'login',
    label: 'Login',
    description:
      'Start the first local binding flow for an end-user-owned credential. No shared pool, no platform-owned fallback.'
  },
  {
    id: 'status',
    label: 'Status',
    description:
      'Inspect local credential health, degradation, or provider availability without turning the auth portal into a control-plane product.'
  },
  {
    id: 're-auth',
    label: 'Re-auth',
    description:
      'Recover the same end-user-owned credential path after expiry or an explicit user action requirement.'
  }
] as const;

export interface CredentialHealthFacts {
  hasMaterial: boolean;
  providerAvailable: boolean;
  refreshEligible: boolean;
  expiringSoon: boolean;
  expired: boolean;
  degraded: boolean;
  userActionRequired: boolean;
  lastCheckedAt?: string;
  expiresAt?: string;
}

export const DEFAULT_CREDENTIAL_HEALTH_FACTS: CredentialHealthFacts = {
  hasMaterial: false,
  providerAvailable: true,
  refreshEligible: false,
  expiringSoon: false,
  expired: false,
  degraded: false,
  userActionRequired: false
};

export function determineCredentialState(facts: CredentialHealthFacts): CredentialState {
  if (!facts.hasMaterial) {
    return 'missing';
  }

  if (!facts.providerAvailable) {
    return 'provider-unavailable';
  }

  if (facts.expired) {
    return 'expired';
  }

  if (facts.userActionRequired) {
    return 'user-action-required';
  }

  if (facts.degraded && facts.refreshEligible) {
    return 'refreshable-but-degraded';
  }

  if (facts.expiringSoon) {
    return 'expiring';
  }

  return 'ready';
}

export function formatCredentialStateLabel(state: CredentialState): string {
  switch (state) {
    case 'missing':
      return 'Missing';
    case 'ready':
      return 'Ready';
    case 'expiring':
      return 'Expiring';
    case 'expired':
      return 'Expired';
    case 'refreshable-but-degraded':
      return 'Refreshable but degraded';
    case 'provider-unavailable':
      return 'Provider unavailable';
    case 'user-action-required':
      return 'User action required';
  }
}

export function getCredentialWorkflowId(state: CredentialState): CredentialWorkflowId {
  switch (state) {
    case 'missing':
      return 'login';
    case 'ready':
    case 'expiring':
    case 'refreshable-but-degraded':
    case 'provider-unavailable':
      return 'status';
    case 'expired':
    case 'user-action-required':
      return 're-auth';
  }
}

export function getCredentialWorkflowDescriptor(
  state: CredentialState
): CredentialWorkflowDescriptor {
  const workflowId = getCredentialWorkflowId(state);
  const descriptor = CREDENTIAL_WORKFLOWS.find((entry) => entry.id === workflowId);

  if (!descriptor) {
    throw new Error(`Unsupported credential workflow: ${workflowId}`);
  }

  return descriptor;
}

export const CREDENTIAL_USER_ACTION_IDS = [
  'provide-api-key',
  'start-web-login',
  'replace-api-key',
  'reauthenticate',
  'retry-refresh',
  'wait-for-provider',
  'view-status'
] as const;

export type CredentialUserActionId = (typeof CREDENTIAL_USER_ACTION_IDS)[number];
export type CredentialUserActionEmphasis = 'primary' | 'secondary' | 'warning';

export interface CredentialUserAction {
  id: CredentialUserActionId;
  label: string;
  description: string;
  emphasis: CredentialUserActionEmphasis;
  blocking: boolean;
}

function getMissingAction(authModeId: AuthModeId): CredentialUserAction {
  if (authModeId === 'byok') {
    return {
      id: 'provide-api-key',
      label: 'Add API Key',
      description: 'Bring your own API key from the end user and bind it to this provider slot.',
      emphasis: 'primary',
      blocking: true
    };
  }

  return {
    id: 'start-web-login',
    label: 'Start Login',
    description: 'Open a local browser-based sign-in or OAuth flow for this end-user-owned account.',
    emphasis: 'primary',
    blocking: true
  };
}

function getExpiredAction(authModeId: AuthModeId): CredentialUserAction {
  if (authModeId === 'byok') {
    return {
      id: 'replace-api-key',
      label: 'Replace API Key',
      description: 'Ask the end user to update the expired or revoked key for this provider.',
      emphasis: 'warning',
      blocking: true
    };
  }

  return {
    id: 'reauthenticate',
    label: 'Re-authenticate',
    description: 'Prompt the end user to sign in again and renew the current browser session.',
    emphasis: 'warning',
    blocking: true
  };
}

function getViewStatusAction(): CredentialUserAction {
  return {
    id: 'view-status',
    label: 'View Status',
    description: 'Review the current local credential state and diagnostics for this provider.',
    emphasis: 'secondary',
    blocking: false
  };
}

export function getCredentialUserActions(
  state: CredentialState,
  authModeId: AuthModeId
): CredentialUserAction[] {
  switch (state) {
    case 'missing':
      return [getMissingAction(authModeId)];
    case 'ready':
      return [getViewStatusAction()];
    case 'expiring':
      return [getViewStatusAction(), getExpiredAction(authModeId)];
    case 'expired':
      return [getExpiredAction(authModeId)];
    case 'refreshable-but-degraded':
      return [
        {
          id: 'retry-refresh',
          label: 'Retry Refresh',
          description: 'Try to recover the current credential without switching to another account.',
          emphasis: 'primary',
          blocking: false
        },
        getExpiredAction(authModeId)
      ];
    case 'provider-unavailable':
      return [
        {
          id: 'wait-for-provider',
          label: 'Check Provider Status',
          description: 'Provider availability is degraded. Keep the current user-owned credential and retry later.',
          emphasis: 'secondary',
          blocking: false
        },
        getViewStatusAction()
      ];
    case 'user-action-required':
      return [getExpiredAction(authModeId), getViewStatusAction()];
  }
}
