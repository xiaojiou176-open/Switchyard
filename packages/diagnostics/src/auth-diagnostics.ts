import {
  buildCredentialSessionHandoff,
  formatCredentialStateLabel,
  getCredentialUserActions,
  type CredentialRecord,
  type CredentialState,
  type CredentialSessionHandoff,
  type CredentialUserAction
} from '../../credentials/src/index.js';

export const AUTH_DIAGNOSTIC_CATEGORIES = [
  'missing-credential',
  'expired-session',
  'refreshable-but-degraded',
  'provider-unavailable',
  'user-action-required'
] as const;

export type AuthDiagnosticCategory = (typeof AUTH_DIAGNOSTIC_CATEGORIES)[number];
export type DiagnosticSeverity = 'warning' | 'error';

export const AUTH_DIAGNOSTIC_CONTRACT_LABELS: Record<AuthDiagnosticCategory, string> = {
  'missing-credential': 'missing credential',
  'expired-session': 'expired session',
  'refreshable-but-degraded': 'refreshable but degraded',
  'provider-unavailable': 'provider unavailable',
  'user-action-required': 'user action required'
};

export interface AuthDiagnostic {
  code: `auth.${AuthDiagnosticCategory}`;
  category: AuthDiagnosticCategory;
  contractCategoryLabel: string;
  severity: DiagnosticSeverity;
  providerId: CredentialRecord['provider']['providerId'];
  providerDisplayName: CredentialRecord['provider']['displayName'];
  authModeId: CredentialRecord['provider']['authModeId'];
  state: CredentialState;
  summary: string;
  detail: string;
  requiresUserAction: boolean;
  handoff: CredentialSessionHandoff;
  recommendedActions: CredentialUserAction[];
}

function describeHandoff(handoff: CredentialSessionHandoff): string {
  const nextStep = `Next step: ${handoff.nextStep.label} by ${handoff.nextStep.actorLabel}.`;
  const captureRequest = handoff.captureRequest
    ? ` Capture request: ${handoff.captureRequest.artifacts
        .map(
          (artifact) =>
            `${artifact.label} via ${artifact.handoffChannelLabel}, collected by ${artifact.collectedByLabel}`
        )
        .join('; ')}.`
    : '';
  const fallbackStep = handoff.fallbackStep
    ? ` Fallback: ${handoff.fallbackStep.label} by ${handoff.fallbackStep.actorLabel}.`
    : '';

  return `${handoff.summary} ${nextStep}${captureRequest}${fallbackStep}`;
}

function getDiagnosticMetadata(category: AuthDiagnosticCategory): {
  severity: DiagnosticSeverity;
  summary: string;
  detail: string;
  requiresUserAction: boolean;
} {
  switch (category) {
    case 'missing-credential':
      return {
        severity: 'error',
        summary: 'Missing credential',
        detail: 'No end-user-owned credential is currently bound to this provider slot.',
        requiresUserAction: true
      };
    case 'expired-session':
      return {
        severity: 'error',
        summary: 'Expired session',
        detail: 'The current credential exists but can no longer be used until the end user renews it.',
        requiresUserAction: true
      };
    case 'refreshable-but-degraded':
      return {
        severity: 'warning',
        summary: 'Refreshable but degraded',
        detail: 'The current credential still belongs to the end user, but the runtime should recover it before treating the slot as healthy.',
        requiresUserAction: false
      };
    case 'provider-unavailable':
      return {
        severity: 'warning',
        summary: 'Provider unavailable',
        detail: 'The upstream provider is degraded. The user-owned credential should stay in place while the user inspects provider health.',
        requiresUserAction: false
      };
    case 'user-action-required':
      return {
        severity: 'error',
        summary: 'User action required',
        detail: 'The runtime cannot recover this credential path without an explicit action by the end user.',
        requiresUserAction: true
      };
  }
}

export function classifyAuthDiagnosticCategory(
  record: CredentialRecord
): AuthDiagnosticCategory | null {
  switch (record.state) {
    case 'missing':
      return 'missing-credential';
    case 'expired':
      return 'expired-session';
    case 'refreshable-but-degraded':
      return 'refreshable-but-degraded';
    case 'provider-unavailable':
      return 'provider-unavailable';
    case 'user-action-required':
      return 'user-action-required';
    default:
      return null;
  }
}

export function classifyAuthDiagnostic(record: CredentialRecord): AuthDiagnostic | null {
  const category = classifyAuthDiagnosticCategory(record);

  if (!category) {
    return null;
  }

  const metadata = getDiagnosticMetadata(category);
  const handoff = buildCredentialSessionHandoff(record);

  return {
    code: `auth.${category}`,
    category,
    contractCategoryLabel: AUTH_DIAGNOSTIC_CONTRACT_LABELS[category],
    severity: metadata.severity,
    providerId: record.provider.providerId,
    providerDisplayName: record.provider.displayName,
    authModeId: record.provider.authModeId,
    state: record.state,
    summary: metadata.summary,
    detail: `${metadata.detail} Current state: ${formatCredentialStateLabel(record.state)}. ${describeHandoff(
      handoff
    )}`,
    requiresUserAction: metadata.requiresUserAction,
    handoff,
    recommendedActions: getCredentialUserActions(record.state, record.provider.authModeId)
  };
}

export function getAuthDiagnosticContractLabel(category: AuthDiagnosticCategory): string {
  return AUTH_DIAGNOSTIC_CONTRACT_LABELS[category];
}

export interface AuthDiagnosticSummary {
  blockingCount: number;
  warningCount: number;
  categories: AuthDiagnosticCategory[];
  diagnostics: AuthDiagnostic[];
}

export function summarizeAuthDiagnostics(records: readonly CredentialRecord[]): AuthDiagnosticSummary {
  const diagnostics = records
    .map((record) => classifyAuthDiagnostic(record))
    .filter((diagnostic): diagnostic is AuthDiagnostic => diagnostic !== null);

  return {
    blockingCount: diagnostics.filter((diagnostic) => diagnostic.requiresUserAction).length,
    warningCount: diagnostics.filter((diagnostic) => diagnostic.severity === 'warning').length,
    categories: diagnostics.map((diagnostic) => diagnostic.category),
    diagnostics
  };
}
