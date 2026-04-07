import {
  type AuthModeId,
  SINGLE_PROVIDER_SINGLE_ACCOUNT,
  type ProviderId,
  type ProviderSupportDescriptor,
  getProviderSupportDescriptor
} from './catalog.js';
import {
  DEFAULT_CREDENTIAL_HEALTH_FACTS,
  type CredentialHealthFacts,
  type CredentialState,
  determineCredentialState
} from './state.js';

export const USER_OWNERSHIP_MODEL = 'end-user-owned' as const;
export type CredentialOwnershipModel = typeof USER_OWNERSHIP_MODEL;
export type CredentialOwnerOrigin = 'local-user' | 'imported-user-material';

export interface CredentialOwner {
  ownershipModel: CredentialOwnershipModel;
  userId: string;
  origin: CredentialOwnerOrigin;
}

export interface ProviderAccountBinding {
  strategy: typeof SINGLE_PROVIDER_SINGLE_ACCOUNT;
  providerId: ProviderId;
  accountId?: string;
  accountLabel?: string;
}

export const CREDENTIAL_LIFECYCLE_STAGES = [
  'acquire',
  'bind',
  'store',
  'check',
  'refresh-renew',
  'expire-degrade',
  're-auth',
  'revoke-remove'
] as const;

export type CredentialLifecycleStage = (typeof CREDENTIAL_LIFECYCLE_STAGES)[number];

export type CredentialMaterialKind =
  | 'api-key'
  | 'oauth-session'
  | 'browser-session'
  | 'subscription-session';

export interface CredentialRecord {
  credentialId: string;
  owner: CredentialOwner;
  provider: ProviderSupportDescriptor;
  account: ProviderAccountBinding;
  lifecycleStage: CredentialLifecycleStage;
  materialKind: CredentialMaterialKind;
  state: CredentialState;
  status: CredentialHealthFacts;
  notes: string[];
}

export interface CreateCredentialRecordInput {
  userId: string;
  providerId: ProviderId;
  authModeId: AuthModeId;
  accountId?: string;
  accountLabel?: string;
  origin?: CredentialOwnerOrigin;
  lifecycleStage?: CredentialLifecycleStage;
  materialKind?: CredentialMaterialKind;
  status?: Partial<CredentialHealthFacts>;
  notes?: string[];
}

const LIFECYCLE_TRANSITIONS: Record<CredentialLifecycleStage, readonly CredentialLifecycleStage[]> = {
  acquire: ['bind'],
  bind: ['store'],
  store: ['check', 'revoke-remove'],
  check: ['refresh-renew', 'expire-degrade', 're-auth', 'revoke-remove'],
  'refresh-renew': ['check', 're-auth', 'expire-degrade'],
  'expire-degrade': ['re-auth', 'revoke-remove'],
  're-auth': ['bind', 'store', 'check'],
  'revoke-remove': []
};

function getDefaultMaterialKind(authModeId: AuthModeId): CredentialMaterialKind {
  return authModeId === 'byok' ? 'api-key' : 'browser-session';
}

function normalizeStatus(status?: Partial<CredentialHealthFacts>): CredentialHealthFacts {
  return {
    ...DEFAULT_CREDENTIAL_HEALTH_FACTS,
    ...status
  };
}

export function createCredentialOwner(
  userId: string,
  origin: CredentialOwnerOrigin = 'local-user'
): CredentialOwner {
  return {
    ownershipModel: USER_OWNERSHIP_MODEL,
    userId,
    origin
  };
}

export function createCredentialRecord(input: CreateCredentialRecordInput): CredentialRecord {
  const provider = getProviderSupportDescriptor(input.providerId, input.authModeId);
  const status = normalizeStatus(input.status);

  return {
    credentialId: `${provider.authModeId}:${provider.providerId}:${input.userId}`,
    owner: createCredentialOwner(input.userId, input.origin),
    provider,
    account: {
      strategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
      providerId: input.providerId,
      accountId: input.accountId,
      accountLabel: input.accountLabel
    },
    lifecycleStage: input.lifecycleStage ?? 'acquire',
    materialKind: input.materialKind ?? getDefaultMaterialKind(input.authModeId),
    state: determineCredentialState(status),
    status,
    notes: input.notes ?? []
  };
}

export function isUserOwnedCredential(record: CredentialRecord): boolean {
  return record.owner.ownershipModel === USER_OWNERSHIP_MODEL;
}

export function canTransitionCredentialLifecycle(
  current: CredentialLifecycleStage,
  next: CredentialLifecycleStage
): boolean {
  return LIFECYCLE_TRANSITIONS[current].includes(next);
}

export function advanceCredentialLifecycle(
  record: CredentialRecord,
  next: CredentialLifecycleStage,
  status?: Partial<CredentialHealthFacts>
): CredentialRecord {
  if (!canTransitionCredentialLifecycle(record.lifecycleStage, next)) {
    throw new Error(`Invalid credential lifecycle transition: ${record.lifecycleStage} -> ${next}`);
  }

  const mergedStatus = normalizeStatus({
    ...record.status,
    ...status
  });

  return {
    ...record,
    lifecycleStage: next,
    status: mergedStatus,
    state: determineCredentialState(mergedStatus)
  };
}

export function bindCredentialToSingleAccount(
  record: CredentialRecord,
  accountId: string,
  accountLabel?: string
): CredentialRecord {
  return {
    ...record,
    account: {
      ...record.account,
      strategy: SINGLE_PROVIDER_SINGLE_ACCOUNT,
      accountId,
      accountLabel
    }
  };
}
