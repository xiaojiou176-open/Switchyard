import {
  createCredentialRecord,
  type CredentialHealthFacts,
  type CredentialLifecycleStage,
  type CredentialMaterialKind
} from '../../../credentials/src/index.js';
import {
  buildAuthRuntimeView,
  summarizeAuthRuntimeViews,
  type AuthRuntimeSummary,
  type AuthRuntimeView
} from '../../../diagnostics/src/index.js';
import type {
  DiagnosticRecord,
  ProviderStatusView,
  WebLiveProofResult,
  WebLaneSnapshot,
  WebSessionSnapshot
} from '../../../lanes/web/src/index.js';

export interface ServiceSurfaceMetadata {
  id: 'service-http';
  role: 'first-party-integration-entry';
  runtimeShape: 'runtime-first';
  localFirst: true;
  consumerCompatIncluded: false;
}

export interface ServiceAuthPortalMetadata {
  mode: 'local-first';
  controlPlane: false;
  capabilities: ['login', 'status', 're-auth'];
}

export interface ServiceRuntimeRouteCatalog {
  authPortal: string;
  bootstrap: string;
  entrypoint: string;
  providers: string;
  byokProviders: string;
  authStatus: string;
  health: string;
  invoke: string;
  byokInvoke: string;
  providerStatusTemplate: string;
  providerProbeTemplate: string;
  providerRemediationTemplate: string;
  providerAcquisitionStartTemplate: string;
  providerAcquisitionCaptureTemplate: string;
  providerDebugCurrentPageTemplate: string;
  providerDebugCurrentConsoleTemplate: string;
  providerDebugCurrentNetworkTemplate: string;
  providerDebugSupportBundleTemplate: string;
}

export interface ServiceProviderRouteRefs {
  status: string;
  probe: string;
  remediation: string;
  acquisitionStart: string;
  acquisitionCapture: string;
  debugCurrentPage: string;
  debugCurrentConsole: string;
  debugCurrentNetwork: string;
  debugSupportBundle: string;
}

export interface ServiceDiscoveryView {
  providerId: ProviderStatusView['provider'];
  providerDisplayName: ProviderStatusView['displayName'];
  lane: ProviderStatusView['lane'];
  authMode: ProviderStatusView['authMode'];
  stabilityTarget: ProviderStatusView['stabilityTarget'];
  models: ProviderStatusView['models'];
  available: boolean;
  routes: ServiceProviderRouteRefs;
}

export interface ServiceProviderAuthView extends AuthRuntimeView {
  lane: ProviderStatusView['lane'];
  session: ProviderStatusView['session'];
  models: ProviderStatusView['models'];
  mode?:
    | "managed-browser"
    | "isolated-chrome-root"
    | "existing-chrome-profile"
    | "existing-browser-session";
  modeLabel?: string;
  browserTarget?: {
    kind: string;
    label: string;
    summary: string;
  };
  transportHint?: string;
  availableModes?: ReadonlyArray<{
    id:
      | "managed-browser"
      | "isolated-chrome-root"
      | "existing-chrome-profile"
      | "existing-browser-session";
    label: string;
    description: string;
    advanced: boolean;
    default: boolean;
  }>;
  routes: ServiceProviderRouteRefs;
}

export interface ServiceAuthStatusView extends AuthRuntimeSummary {
  providers: ServiceProviderAuthView[];
}

export interface ServiceProviderRuntimeView {
  available: ProviderStatusView['available'];
  canInvoke: boolean;
  runtimeReadiness: ProviderStatusView['runtimeReadiness'];
  credentialState: ProviderStatusView['credentialState'];
  sessionPresence: ProviderStatusView['sessionPresence'];
  degradedInvocationPolicy: ProviderStatusView['degradedInvocationPolicy'];
}

export interface ServiceProviderProbeView {
  providerId: ProviderStatusView['provider'];
  providerDisplayName: ProviderStatusView['displayName'];
  lane: ProviderStatusView['lane'];
  authMode: ProviderStatusView['authMode'];
  stabilityTarget: ProviderStatusView['stabilityTarget'];
  models: ProviderStatusView['models'];
  session: ProviderStatusView['session'];
  runtime: ServiceProviderRuntimeView;
  diagnostics: DiagnosticRecord[];
  transportHint?: string;
  liveProof?: WebLiveProofResult;
  auth: ServiceProviderAuthView;
  routes: ServiceProviderRouteRefs;
}

export interface ServiceProviderAttachTargetView {
  mode?: WebSessionSnapshot["acquisitionMode"];
  label: string;
  cdpUrl?: string;
  userDataDir?: string;
  source: "runtime-env" | "default" | "missing";
  available: boolean;
  note: string;
}

export interface ServiceProviderCurrentPageView {
  status: "captured" | "unavailable";
  url?: string;
  title?: string;
  snippet?: string;
  hasComposerSurface?: boolean;
  classification?:
    | "workspace-ready"
    | "session-incomplete"
    | "provider-unavailable"
    | "human-verification-required"
    | "account-action-required"
    | "permission-gated"
    | "unknown";
  diagnostic: string;
}

export interface ServiceProviderConsoleEntryView {
  type: string;
  text: string;
}

export interface ServiceProviderCurrentConsoleView {
  status: "captured" | "unavailable";
  entries: ServiceProviderConsoleEntryView[];
  diagnostic: string;
}

export interface ServiceProviderNetworkEntryView {
  name: string;
  initiatorType?: string;
  duration?: number;
  method?: string;
  outcome?: "finished" | "failed";
  status?: number;
  errorText?: string;
  url?: string;
  resourceType?: string;
  source?: "request-observer" | "resource-timing";
}

export interface ServiceProviderCurrentNetworkView {
  status: "captured" | "limited" | "unavailable";
  entries: ServiceProviderNetworkEntryView[];
  diagnostic: string;
}

export interface ServiceProviderDiagnoseStepView {
  id:
    | "check-store"
    | "check-attach-target"
    | "inspect-current-page"
    | "inspect-console-network"
    | "rerun-provider-live-proof"
    | "repair-session";
  status: "completed" | "recommended" | "blocked";
  summary: string;
  command?: string;
}

export interface ServiceProviderDebugSupportView {
  providerId: ProviderStatusView["provider"];
  providerDisplayName: ProviderStatusView["displayName"];
  auth: ServiceProviderAuthView;
  runtime: ServiceProviderRuntimeView;
  storeReadiness: {
    credentialState: ProviderStatusView["credentialState"];
    runtimeReadiness: ProviderStatusView["runtimeReadiness"];
    validationState?: WebSessionSnapshot["validationState"];
    note: string;
  };
  captureProvenance?: WebSessionSnapshot["captureProvenance"];
  persistenceAudit?: WebSessionSnapshot["persistenceAudit"];
  liveReadiness: {
    status: "live-ready" | "live-blocked" | "unknown";
    diagnostic: string;
  };
  attachTarget: ServiceProviderAttachTargetView;
  currentPage: ServiceProviderCurrentPageView;
  currentConsole: ServiceProviderCurrentConsoleView;
  currentNetwork: ServiceProviderCurrentNetworkView;
  diagnoseLadder: ServiceProviderDiagnoseStepView[];
  routes: ServiceProviderRouteRefs;
}

export interface ServiceProviderRemediationView extends ServiceProviderAuthView {
  runtime: ServiceProviderRuntimeView;
  diagnostics: DiagnosticRecord[];
}

export interface ServiceRemediationSummaryView {
  counts: {
    blocking: number;
    degraded: number;
    ready: number;
  };
  blockingProviders: ServiceProviderRemediationView[];
  degradedProviders: ServiceProviderRemediationView[];
}

export interface RuntimeBootstrapView {
  surface: ServiceSurfaceMetadata;
  authPortal: ServiceAuthPortalMetadata;
  bootstrap: {
    serviceName: string;
    lane: 'web';
    consumption: 'service-first';
    routeCatalog: ServiceRuntimeRouteCatalog;
  };
  discovery: {
    lane: 'web';
    providers: ServiceDiscoveryView[];
  };
  auth: ServiceAuthStatusView;
  health: {
    lane: WebLaneSnapshot['lane'];
    generatedAt: WebLaneSnapshot['generatedAt'];
    totals: WebLaneSnapshot['totals'];
  };
  remediation: ServiceRemediationSummaryView;
}

export const SERVICE_SURFACE_METADATA: ServiceSurfaceMetadata = {
  id: 'service-http',
  role: 'first-party-integration-entry',
  runtimeShape: 'runtime-first',
  localFirst: true,
  consumerCompatIncluded: false
};

export const SERVICE_AUTH_PORTAL_METADATA: ServiceAuthPortalMetadata = {
  mode: 'local-first',
  controlPlane: false,
  capabilities: ['login', 'status', 're-auth']
};

export const SERVICE_RUNTIME_ROUTE_TEMPLATES: ServiceRuntimeRouteCatalog = {
  authPortal: '/v1/runtime/auth-portal',
  bootstrap: '/v1/runtime/bootstrap',
  entrypoint: '/v1/runtime/entrypoint',
  providers: '/v1/runtime/providers',
  byokProviders: '/v1/runtime/byok/providers',
  authStatus: '/v1/runtime/auth-status',
  health: '/v1/runtime/health',
  invoke: '/v1/runtime/invoke',
  byokInvoke: '/v1/runtime/byok/invoke',
  providerStatusTemplate: '/v1/runtime/providers/{providerId}/status',
  providerProbeTemplate: '/v1/runtime/providers/{providerId}/probe',
  providerRemediationTemplate: '/v1/runtime/providers/{providerId}/remediation',
  providerAcquisitionStartTemplate: '/v1/runtime/providers/{providerId}/acquisition/start',
  providerAcquisitionCaptureTemplate: '/v1/runtime/providers/{providerId}/acquisition/capture',
  providerDebugCurrentPageTemplate: '/v1/runtime/providers/{providerId}/debug/current-page',
  providerDebugCurrentConsoleTemplate: '/v1/runtime/providers/{providerId}/debug/current-console',
  providerDebugCurrentNetworkTemplate: '/v1/runtime/providers/{providerId}/debug/current-network',
  providerDebugSupportBundleTemplate: '/v1/runtime/providers/{providerId}/debug/support-bundle'
};

const WEB_ACQUISITION_MODES = [
  {
    id: "isolated-chrome-root",
    label: "Use Isolated Chrome Root",
    description:
      "Reuse Switchyard's dedicated Chrome root and single repo-owned profile for login and capture.",
    advanced: true,
    default: true,
  },
  {
    id: "managed-browser",
    label: "Managed Browser",
    description:
      "Let Switchyard launch or reattach its dedicated fallback onboarding browser for login and capture.",
    advanced: false,
    default: false,
  },
  {
    id: "existing-browser-session",
    label: "Attach Existing Browser Session",
    description:
      "Attach to a browser session that is already exposing a reusable browser-session URL.",
    advanced: true,
    default: false,
  },
] as const;

function getAcquisitionModeView(mode: string | undefined) {
  if (mode === "existing-chrome-profile") {
    return WEB_ACQUISITION_MODES.find((entry) => entry.id === "isolated-chrome-root");
  }

  return WEB_ACQUISITION_MODES.find((entry) => entry.id === mode);
}

function withBaseUrl(path: string, baseUrl?: string): string {
  if (!baseUrl) {
    return path;
  }

  return `${baseUrl.replace(/\/$/, '')}${path}`;
}

export function buildServiceRouteCatalog(baseUrl?: string): ServiceRuntimeRouteCatalog {
  return {
    authPortal: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.authPortal, baseUrl),
    bootstrap: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.bootstrap, baseUrl),
    entrypoint: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.entrypoint, baseUrl),
    providers: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.providers, baseUrl),
    byokProviders: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.byokProviders, baseUrl),
    authStatus: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.authStatus, baseUrl),
    health: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.health, baseUrl),
    invoke: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.invoke, baseUrl),
    byokInvoke: withBaseUrl(SERVICE_RUNTIME_ROUTE_TEMPLATES.byokInvoke, baseUrl),
    providerStatusTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerStatusTemplate,
      baseUrl
    ),
    providerProbeTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerProbeTemplate,
      baseUrl
    ),
    providerRemediationTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerRemediationTemplate,
      baseUrl
    ),
    providerAcquisitionStartTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerAcquisitionStartTemplate,
      baseUrl
    ),
    providerAcquisitionCaptureTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerAcquisitionCaptureTemplate,
      baseUrl
    ),
    providerDebugCurrentPageTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerDebugCurrentPageTemplate,
      baseUrl
    ),
    providerDebugCurrentConsoleTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerDebugCurrentConsoleTemplate,
      baseUrl
    ),
    providerDebugCurrentNetworkTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerDebugCurrentNetworkTemplate,
      baseUrl
    ),
    providerDebugSupportBundleTemplate: withBaseUrl(
      SERVICE_RUNTIME_ROUTE_TEMPLATES.providerDebugSupportBundleTemplate,
      baseUrl
    )
  };
}

export function buildServiceProviderRouteRefs(
  providerId: ProviderStatusView['provider'],
  baseUrl?: string
): ServiceProviderRouteRefs {
  return {
    status: withBaseUrl(`/v1/runtime/providers/${providerId}/status`, baseUrl),
    probe: withBaseUrl(`/v1/runtime/providers/${providerId}/probe`, baseUrl),
    remediation: withBaseUrl(`/v1/runtime/providers/${providerId}/remediation`, baseUrl),
    acquisitionStart: withBaseUrl(`/v1/runtime/providers/${providerId}/acquisition/start`, baseUrl),
    acquisitionCapture: withBaseUrl(`/v1/runtime/providers/${providerId}/acquisition/capture`, baseUrl),
    debugCurrentPage: withBaseUrl(`/v1/runtime/providers/${providerId}/debug/current-page`, baseUrl),
    debugCurrentConsole: withBaseUrl(
      `/v1/runtime/providers/${providerId}/debug/current-console`,
      baseUrl
    ),
    debugCurrentNetwork: withBaseUrl(
      `/v1/runtime/providers/${providerId}/debug/current-network`,
      baseUrl
    ),
    debugSupportBundle: withBaseUrl(
      `/v1/runtime/providers/${providerId}/debug/support-bundle`,
      baseUrl
    ),
  };
}

function getLifecycleStage(state: WebSessionSnapshot['state']): CredentialLifecycleStage {
  switch (state) {
    case 'missing':
      return 'acquire';
    case 'refreshable-but-degraded':
      return 'refresh-renew';
    case 'expired':
      return 'expire-degrade';
    case 'user-action-required':
      return 're-auth';
    case 'ready':
    case 'expiring':
    case 'provider-unavailable':
      return 'check';
  }
}

function getMaterialKind(
  session: WebSessionSnapshot,
  authMode: ProviderStatusView['authMode']
): CredentialMaterialKind {
  if (session.sessionSource?.toLowerCase().includes('oauth') || authMode === 'oauth') {
    return 'oauth-session';
  }

  return 'browser-session';
}

function getCredentialHealthFacts(session: WebSessionSnapshot): CredentialHealthFacts {
  return {
    hasMaterial: session.state !== 'missing',
    providerAvailable: session.state !== 'provider-unavailable',
    refreshEligible:
      session.refreshEligible ?? session.state === 'refreshable-but-degraded',
    expiringSoon: session.state === 'expiring',
    expired: session.state === 'expired',
    degraded: session.state === 'refreshable-but-degraded',
    userActionRequired: session.state === 'user-action-required',
    lastCheckedAt: session.lastValidatedAt,
    expiresAt: session.expiresAt
  };
}

export function buildServiceDiscoveryViews(
  providers: readonly ProviderStatusView[]
): ServiceDiscoveryView[] {
  return providers.map((provider) => ({
    providerId: provider.provider,
    providerDisplayName: provider.displayName,
    lane: provider.lane,
    authMode: provider.authMode,
    stabilityTarget: provider.stabilityTarget,
    models: provider.models,
    available: provider.available,
    routes: buildServiceProviderRouteRefs(provider.provider)
  }));
}

export function buildServiceProviderAuthView(
  provider: ProviderStatusView,
  ownerUserId = 'local-user'
): ServiceProviderAuthView {
  const record = createCredentialRecord({
    userId: ownerUserId,
    providerId: provider.provider,
    authModeId: 'web-login',
    accountId: provider.session.accountLabel ?? `${provider.provider}-local-slot`,
    accountLabel: provider.session.accountLabel,
    lifecycleStage: getLifecycleStage(provider.session.state),
    materialKind: getMaterialKind(provider.session, provider.authMode),
    status: getCredentialHealthFacts(provider.session),
    notes: provider.session.note ? [provider.session.note] : []
  });
  const view = buildAuthRuntimeView(record);
  const acquisitionMode = getAcquisitionModeView(provider.session.acquisitionMode);

  return {
    ...view,
    available: provider.available,
    lane: provider.lane,
    session: provider.session,
    models: provider.models,
    mode: acquisitionMode?.id,
    modeLabel: acquisitionMode?.label,
    browserTarget: acquisitionMode
      ? {
          kind:
            acquisitionMode.id === "managed-browser"
              ? "managed-onboarding-browser"
              : acquisitionMode.id === "isolated-chrome-root"
                ? "isolated-chrome-root"
                : "attached-browser-session",
          label: acquisitionMode.label,
          summary: acquisitionMode.description,
        }
      : undefined,
    transportHint: provider.recommendedAction,
    availableModes: WEB_ACQUISITION_MODES,
    routes: buildServiceProviderRouteRefs(provider.provider)
  };
}

export function buildServiceAuthStatusView(
  providers: readonly ProviderStatusView[],
  ownerUserId = 'local-user'
): ServiceAuthStatusView {
  const views = providers.map((provider) => buildServiceProviderAuthView(provider, ownerUserId));
  const summary = summarizeAuthRuntimeViews(views);

  return {
    ...summary,
    providers: views
  };
}

export function buildServiceProviderRuntimeView(
  provider: ProviderStatusView
): ServiceProviderRuntimeView {
  return {
    available: provider.available,
    canInvoke: provider.available,
    runtimeReadiness: provider.runtimeReadiness,
    credentialState: provider.credentialState,
    sessionPresence: provider.sessionPresence,
    degradedInvocationPolicy: provider.degradedInvocationPolicy
  };
}

export function buildServiceProviderProbeView(
  provider: ProviderStatusView,
  ownerUserId = 'local-user',
  liveProof?: WebLiveProofResult
): ServiceProviderProbeView {
  return {
    providerId: provider.provider,
    providerDisplayName: provider.displayName,
    lane: provider.lane,
    authMode: provider.authMode,
    stabilityTarget: provider.stabilityTarget,
    models: provider.models,
    session: provider.session,
    runtime: buildServiceProviderRuntimeView(provider),
    diagnostics: provider.diagnostics,
    transportHint: provider.recommendedAction,
    liveProof,
    auth: buildServiceProviderAuthView(provider, ownerUserId),
    routes: buildServiceProviderRouteRefs(provider.provider)
  };
}

export function buildServiceProviderDebugSupportView(
  provider: ProviderStatusView,
  ownerUserId = 'local-user',
): ServiceProviderDebugSupportView {
  const auth = buildServiceProviderAuthView(provider, ownerUserId);

  return {
    providerId: provider.provider,
    providerDisplayName: provider.displayName,
    auth,
    runtime: buildServiceProviderRuntimeView(provider),
    storeReadiness: {
      credentialState: provider.credentialState,
      runtimeReadiness: provider.runtimeReadiness,
      validationState: provider.session.validationState,
      note:
        'Stored session materials describe what Switchyard has in the local store. They do not guarantee that the currently attached browser page is live-ready.',
    },
    captureProvenance: provider.session.captureProvenance,
    persistenceAudit: provider.session.persistenceAudit,
    liveReadiness: {
      status: 'unknown',
      diagnostic:
        'No live page inspection runner is registered for this provider, so Switchyard will not pretend to know the current browser page state.',
    },
    attachTarget: {
      label: 'No attach target',
      source: 'missing',
      available: false,
      note:
        'No debug attach target was resolved for this provider. Capture or attach a browser session before asking for current-page evidence.',
    },
    currentPage: {
      status: 'unavailable',
      diagnostic:
        'Switchyard does not have a live page snapshot for this provider yet.',
    },
    currentConsole: {
      status: 'unavailable',
      entries: [],
      diagnostic:
        'Switchyard does not buffer detached-browser console history yet, so current-console remains fail-closed.',
    },
    currentNetwork: {
      status: 'unavailable',
      entries: [],
      diagnostic:
        'Switchyard does not have a current network snapshot for this provider yet.',
    },
    diagnoseLadder: [
      {
        id: 'check-store',
        status: 'completed',
        summary: `Stored state = ${provider.session.state}; runtime readiness = ${provider.runtimeReadiness}.`,
      },
      {
        id: 'check-attach-target',
        status: 'blocked',
        summary:
          'Resolve or reattach the canonical browser target first; without it, Switchyard cannot compare store-ready against live-ready.',
      },
      {
        id: 'inspect-current-page',
        status: 'blocked',
        summary:
          'No current page snapshot is available yet.',
      },
      {
        id: 'inspect-console-network',
        status: 'completed',
        summary:
          'Current console remains fail-closed and current network remains unavailable until a live inspection runner exists.',
      },
      {
        id: 'rerun-provider-live-proof',
        status: 'recommended',
        summary:
          `Run the provider-scoped live gate after the browser session is attached for ${provider.displayName}.`,
        command: `pnpm exec node scripts/verify-web-login-live.mjs --provider ${provider.provider}`,
      },
      {
        id: 'repair-session',
        status: 'recommended',
        summary:
          `Repair ${provider.displayName} in the managed browser when store-ready and live-ready disagree.`,
        command: `pnpm run bootstrap:web-login-browser -- --provider ${provider.provider}`,
      },
    ],
    routes: buildServiceProviderRouteRefs(provider.provider),
  };
}

export function buildServiceProviderRemediationView(
  provider: ProviderStatusView,
  ownerUserId = 'local-user'
): ServiceProviderRemediationView {
  const auth = buildServiceProviderAuthView(provider, ownerUserId);

  return {
    ...auth,
    runtime: buildServiceProviderRuntimeView(provider),
    diagnostics: provider.diagnostics
  };
}

export function buildServiceRemediationSummary(
  providers: readonly ProviderStatusView[],
  ownerUserId = 'local-user'
): ServiceRemediationSummaryView {
  const remediationViews = providers.map((provider) =>
    buildServiceProviderRemediationView(provider, ownerUserId)
  );
  const blockingProviders = remediationViews.filter((provider) => !provider.runtime.canInvoke);
  const degradedProviders = remediationViews.filter(
    (provider) => provider.runtime.runtimeReadiness === 'degraded'
  );

  return {
    counts: {
      blocking: blockingProviders.length,
      degraded: degradedProviders.length,
      ready: remediationViews.length - blockingProviders.length - degradedProviders.length
    },
    blockingProviders,
    degradedProviders
  };
}

export function buildRuntimeBootstrapView(
  providers: readonly ProviderStatusView[],
  health: WebLaneSnapshot,
  serviceName: string,
  ownerUserId = 'local-user'
): RuntimeBootstrapView {
  return {
    surface: SERVICE_SURFACE_METADATA,
    authPortal: SERVICE_AUTH_PORTAL_METADATA,
    bootstrap: {
      serviceName,
      lane: 'web',
      consumption: 'service-first',
      routeCatalog: buildServiceRouteCatalog()
    },
    discovery: {
      lane: 'web',
      providers: buildServiceDiscoveryViews(providers)
    },
    auth: buildServiceAuthStatusView(providers, ownerUserId),
    health: {
      lane: health.lane,
      generatedAt: health.generatedAt,
      totals: health.totals
    },
    remediation: buildServiceRemediationSummary(providers, ownerUserId)
  };
}
