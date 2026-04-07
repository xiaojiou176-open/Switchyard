import {
  AUTH_MODE_CATALOG,
  buildCredentialSessionHandoff,
  CREDENTIAL_WORKFLOWS,
  formatCredentialStateLabel,
  getCredentialWorkflowDescriptor,
  isUserOwnedCredential,
  type CredentialRecord,
  type CredentialSessionHandoff,
  type CredentialUserAction,
  type CredentialWorkflowId
} from '../../credentials/src/index.js';
import {
  classifyAuthDiagnostic,
  type AuthDiagnostic,
  type DiagnosticSeverity
} from './auth-diagnostics.js';

export interface AuthRuntimeActionView extends CredentialUserAction {
  actionKey: string;
}

export interface AuthRuntimeOwnershipView {
  userOwned: boolean;
  ownershipModel: CredentialRecord['owner']['ownershipModel'];
  userId: string;
  origin: CredentialRecord['owner']['origin'];
  accountStrategy: CredentialRecord['account']['strategy'];
  accountLabel: string;
  summary: string;
}

export interface AuthRuntimeDiagnosticView {
  code: AuthDiagnostic['code'];
  category: AuthDiagnostic['category'];
  contractCategoryLabel: AuthDiagnostic['contractCategoryLabel'];
  severity: DiagnosticSeverity;
  summary: string;
  detail: string;
  requiresUserAction: boolean;
}

export interface AuthRuntimeView {
  providerId: CredentialRecord['provider']['providerId'];
  providerDisplayName: CredentialRecord['provider']['displayName'];
  authModeId: CredentialRecord['provider']['authModeId'];
  authModeLabel: string;
  laneId: CredentialRecord['provider']['laneId'];
  state: CredentialRecord['state'];
  stateLabel: string;
  lifecycleStage: CredentialRecord['lifecycleStage'];
  workflowId: CredentialWorkflowId;
  workflowLabel: string;
  workflowDescription: string;
  available: boolean;
  requiresUserAction: boolean;
  statusSummary: string;
  ownership: AuthRuntimeOwnershipView;
  diagnostic: AuthRuntimeDiagnosticView | null;
  handoff: CredentialSessionHandoff;
  actions: AuthRuntimeActionView[];
}

export interface AuthWorkflowSummaryProvider {
  providerId: AuthRuntimeView['providerId'];
  providerDisplayName: AuthRuntimeView['providerDisplayName'];
  authModeId: AuthRuntimeView['authModeId'];
  state: AuthRuntimeView['state'];
  stateLabel: AuthRuntimeView['stateLabel'];
}

export interface AuthWorkflowSummary {
  id: CredentialWorkflowId;
  label: string;
  description: string;
  count: number;
  providers: AuthWorkflowSummaryProvider[];
}

export interface AuthRuntimeSummary {
  blockingCount: number;
  warningCount: number;
  categories: string[];
  workflowSummary: AuthWorkflowSummary[];
}

function createActionView(
  record: CredentialRecord,
  action: CredentialUserAction
): AuthRuntimeActionView {
  return {
    ...action,
    actionKey: `${record.provider.authModeId}:${record.provider.providerId}:${action.id}`
  };
}

function getStatusSummary(record: CredentialRecord, diagnostic: AuthDiagnostic | null): string {
  if (diagnostic) {
    return diagnostic.summary;
  }

  switch (record.state) {
    case 'ready':
      return 'Credential is ready for runtime use.';
    case 'expiring':
      return 'Credential is nearing expiration and should be reviewed before it degrades.';
    default:
      return formatCredentialStateLabel(record.state);
  }
}

function getOwnershipView(record: CredentialRecord): AuthRuntimeOwnershipView {
  const accountLabel = record.account.accountLabel ?? record.account.accountId ?? 'unbound slot';

  return {
    userOwned: isUserOwnedCredential(record),
    ownershipModel: record.owner.ownershipModel,
    userId: record.owner.userId,
    origin: record.owner.origin,
    accountStrategy: record.account.strategy,
    accountLabel,
    summary: [
      isUserOwnedCredential(record) ? `Owned by ${record.owner.userId}` : 'Ownership unknown',
      `policy: ${record.account.strategy}`,
      `account: ${accountLabel}`
    ].join(' | ')
  };
}

function buildDiagnosticView(diagnostic: AuthDiagnostic | null): AuthRuntimeDiagnosticView | null {
  if (!diagnostic) {
    return null;
  }

  return {
    code: diagnostic.code,
    category: diagnostic.category,
    contractCategoryLabel: diagnostic.contractCategoryLabel,
    severity: diagnostic.severity,
    summary: diagnostic.summary,
    detail: diagnostic.detail,
    requiresUserAction: diagnostic.requiresUserAction
  };
}

export function buildAuthRuntimeView(record: CredentialRecord): AuthRuntimeView {
  const workflow = getCredentialWorkflowDescriptor(record.state);
  const diagnostic = classifyAuthDiagnostic(record);
  const handoff = buildCredentialSessionHandoff(record);

  return {
    providerId: record.provider.providerId,
    providerDisplayName: record.provider.displayName,
    authModeId: record.provider.authModeId,
    authModeLabel: AUTH_MODE_CATALOG[record.provider.authModeId].label,
    laneId: record.provider.laneId,
    state: record.state,
    stateLabel: formatCredentialStateLabel(record.state),
    lifecycleStage: record.lifecycleStage,
    workflowId: workflow.id,
    workflowLabel: workflow.label,
    workflowDescription: workflow.description,
    available: record.state === 'ready' || record.state === 'expiring',
    requiresUserAction: diagnostic?.requiresUserAction ?? false,
    statusSummary: getStatusSummary(record, diagnostic),
    ownership: getOwnershipView(record),
    diagnostic: buildDiagnosticView(diagnostic),
    handoff,
    actions: handoff.recommendedActions.map((action) =>
      createActionView(record, action)
    )
  };
}

export function summarizeAuthRuntimeViews(
  views: readonly AuthRuntimeView[]
): AuthRuntimeSummary {
  const workflowSummary = CREDENTIAL_WORKFLOWS.map<AuthWorkflowSummary>((workflow) => ({
    id: workflow.id,
    label: workflow.label,
    description: workflow.description,
    count: 0,
    providers: []
  }));

  views.forEach((view) => {
    const existing = workflowSummary.find((workflow) => workflow.id === view.workflowId);
    if (!existing) {
      return;
    }

    existing.count += 1;
    existing.providers.push({
      providerId: view.providerId,
      providerDisplayName: view.providerDisplayName,
      authModeId: view.authModeId,
      state: view.state,
      stateLabel: view.stateLabel
    });
  });

  return {
    blockingCount: views.filter((view) => view.requiresUserAction).length,
    warningCount: views.filter((view) => view.diagnostic?.severity === 'warning').length,
    categories: views
      .map((view) => view.diagnostic?.contractCategoryLabel)
      .filter((category): category is string => Boolean(category)),
    workflowSummary
  };
}
