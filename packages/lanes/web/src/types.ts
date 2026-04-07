export const WEB_PROVIDER_IDS = [
  "chatgpt",
  "gemini",
  "claude",
  "grok",
  "qwen",
] as const;

export type WebProviderId = (typeof WEB_PROVIDER_IDS)[number];
export type WebAuthMode = "browser-session" | "oauth";
export type StabilityTarget = "high" | "baseline";
export type SessionPresence = "present" | "missing";
export type RuntimeReadiness = "ready" | "degraded" | "blocked";
export type SessionValidationState =
  | "unchecked"
  | "validated"
  | "stale"
  | "recovering";
export type DegradedInvocationPolicy = "allow-with-warning" | "block";
export type SessionArtifactState = "present" | "missing" | "derived";
export type SessionArtifactKind =
  | "browser-profile"
  | "cookie-bundle"
  | "session-cookie"
  | "oauth-cookie"
  | "session-token"
  | "access-token"
  | "device-id"
  | "organization-id"
  | "user-agent"
  | "sentinel"
  | "other";
export type SessionLifecyclePlanStatus =
  | "not-needed"
  | "available"
  | "required-now"
  | "blocked";
export type SessionProbeStatus =
  | "not-run"
  | "artifacts-missing"
  | "captured-unvalidated"
  | "session-valid"
  | "refresh-recommended"
  | "session-expired"
  | "provider-unavailable"
  | "re-auth-required";
export type RuntimeFailureStage =
  | "routing"
  | "model-resolution"
  | "capture"
  | "probe"
  | "refresh"
  | "re-auth"
  | "invoke";
export type InvokeTransportKind =
  | "real-transport"
  | "synthetic-demo"
  | "missing";
export type InvokeTransportReadiness =
  | "ready"
  | "degraded-allowed"
  | "blocked";

export type CredentialState =
  | "missing"
  | "ready"
  | "expiring"
  | "expired"
  | "refreshable-but-degraded"
  | "provider-unavailable"
  | "user-action-required";

export type DiagnosticCategory =
  | "ready"
  | "expiring-session"
  | "missing-credential"
  | "expired-session"
  | "refreshable-but-degraded"
  | "provider-unavailable"
  | "user-action-required"
  | "model-resolution-error"
  | "routing-error";

export interface CapabilityDescriptor {
  textGeneration: boolean;
  streaming: boolean;
  toolCalling: boolean;
  imageInput: boolean;
  webLogin: boolean;
  officialApi: boolean;
}

export interface ProviderModelDescriptor {
  id: string;
  displayName: string;
  contextWindow: number;
  maxOutputTokens: number;
  capabilities: CapabilityDescriptor;
  alias?: string;
}

export interface ProviderAuthProfileDescriptor {
  mode: WebAuthMode;
  loginUrl: string;
  accountLabel: string;
  sessionSource: string;
}

export interface SessionArtifactsSnapshot {
  browserProfile: boolean;
  sessionCookie: boolean;
  oauthToken: boolean;
}

export interface SessionArtifactRecord {
  id: string;
  label: string;
  kind: SessionArtifactKind;
  required: boolean;
  state: SessionArtifactState;
  source:
    | "browser-profile"
    | "cookie-store"
    | "request-capture"
    | "runtime-derivation"
    | "organization-discovery"
    | "manual-paste"
    | "other";
  description: string;
}

export interface SessionCapturePlan {
  mode: string;
  referenceUrl: string;
  handoff: string;
  artifactIds: string[];
}

export interface SessionLifecyclePlan {
  supported: boolean;
  status: SessionLifecyclePlanStatus;
  mode: string;
  handoff: string;
  reason?: string;
}

export interface SessionProbeRecord {
  status: SessionProbeStatus;
  source: string;
  mode?: string;
  handoff?: string;
  checkedAt?: string;
  summary: string;
}

export interface BrowserCaptureProvenanceSnapshot {
  browserMode?:
    | "managed-browser"
    | "isolated-chrome-root"
    | "existing-chrome-profile"
    | "existing-browser-session";
  userDataDir?: string;
  profileDirectory?: string;
  profileName?: string;
  cdpUrl?: string;
  capturedAt?: string;
}

export interface BrowserPersistenceAuditSnapshot {
  source: "capture" | "verify";
  checkedAt: string;
  browserMode?:
    | "managed-browser"
    | "isolated-chrome-root"
    | "existing-chrome-profile"
    | "existing-browser-session";
  userDataDir?: string;
  profileDirectory?: string;
  profileName?: string;
  cdpUrl?: string;
  pageUrl?: string;
  pageTitle?: string;
  workspaceClassification?:
    | "workspace-ready"
    | "login-required"
    | "session-incomplete"
    | "human-verification-required"
    | "account-action-required"
    | "permission-gated"
    | "provider-adjacent"
    | "missing-page"
    | "attach-failed"
    | "unknown";
  workspaceReady: boolean;
  cookieDbPath?: string;
  cookieDbAvailable?: boolean;
  hostCookieCount?: number;
  matchedCookieNames?: string[];
  artifactStates?: Record<string, SessionArtifactState>;
  summary: string;
}

export interface InvokeTransportContract {
  kind: InvokeTransportKind;
  mode: string;
  handoff: string;
  reason?: string;
}

export interface InvokeTransportPlan extends InvokeTransportContract {
  readiness: InvokeTransportReadiness;
}

export interface WebProviderDescriptor {
  provider: WebProviderId;
  lane: "web";
  displayName: string;
  stabilityTarget: StabilityTarget;
  degradedInvocationPolicy: DegradedInvocationPolicy;
  authProfile: ProviderAuthProfileDescriptor;
  models: ProviderModelDescriptor[];
  capabilities: CapabilityDescriptor;
  notes: string[];
}

export interface WebSessionSnapshot {
  state: CredentialState;
  acquisitionMode?:
    | "managed-browser"
    | "isolated-chrome-root"
    | "existing-chrome-profile"
    | "existing-browser-session";
  presence?: SessionPresence;
  runtimeReadiness?: RuntimeReadiness;
  validationState?: SessionValidationState;
  accountLabel?: string;
  sessionSource?: string;
  expiresAt?: string;
  lastValidatedAt?: string;
  refreshEligible?: boolean;
  requiredUserAction?: string;
  degradedReason?: string;
  missingArtifacts?: string[];
  artifactStates?: Record<string, SessionArtifactState>;
  captureProvenance?: BrowserCaptureProvenanceSnapshot;
  persistenceAudit?: BrowserPersistenceAuditSnapshot;
  artifactDetails?: SessionArtifactRecord[];
  artifacts?: SessionArtifactsSnapshot;
  capture?: SessionCapturePlan;
  probe?: SessionProbeRecord;
  invoke?: InvokeTransportPlan;
  refresh?: SessionLifecyclePlan;
  reAuth?: SessionLifecyclePlan;
  note?: string;
}

export interface DiagnosticRecord {
  category: DiagnosticCategory;
  severity: "info" | "warn" | "error";
  message: string;
  requiresUserAction: boolean;
  recoveryHint?: string;
  observedAt: string;
}

export interface ProviderStatusView {
  provider: WebProviderId;
  lane: "web";
  displayName: string;
  stabilityTarget: StabilityTarget;
  degradedInvocationPolicy: DegradedInvocationPolicy;
  authMode: WebAuthMode;
  credentialState: CredentialState;
  sessionPresence: SessionPresence;
  runtimeReadiness: RuntimeReadiness;
  session: WebSessionSnapshot;
  invoke: InvokeTransportPlan;
  available: boolean;
  diagnostics: DiagnosticRecord[];
  recommendedAction?: string;
  models: ProviderModelDescriptor[];
}

export interface RuntimeInvocationRequest {
  provider: WebProviderId;
  model: string;
  input: string;
  lane?: "web";
  intent?: "text-generation";
  stream?: boolean;
  requestedAt?: string;
}

export interface RuntimeInvocationSuccess {
  ok: true;
  lane: "web";
  provider: WebProviderId;
  model: string;
  outputText: string;
  providerMessageId: string;
  sessionPresence: SessionPresence;
  runtimeReadiness: RuntimeReadiness;
  executionMode: WebAuthMode;
  executedAt: string;
  accountLabel?: string;
  sessionSource?: string;
  session: WebSessionSnapshot;
  invoke: InvokeTransportPlan;
  diagnostics: DiagnosticRecord[];
}

export interface RuntimeInvocationFailure {
  ok: false;
  lane: "web";
  provider: WebProviderId;
  model: string;
  errorCode: string;
  errorCategory: DiagnosticCategory;
  message: string;
  failureStage: RuntimeFailureStage;
  sessionPresence?: SessionPresence;
  runtimeReadiness?: RuntimeReadiness;
  executionMode?: WebAuthMode;
  session?: WebSessionSnapshot;
  invoke?: InvokeTransportPlan;
  diagnostics: DiagnosticRecord[];
  suggestedAction?: string;
}

export type RuntimeInvocationResult =
  | RuntimeInvocationSuccess
  | RuntimeInvocationFailure;

export interface WebLaneSnapshot {
  lane: "web";
  generatedAt: string;
  providers: ProviderStatusView[];
  totals: {
    total: number;
    ready: number;
    degraded: number;
    userActionRequired: number;
    unavailable: number;
  };
}
