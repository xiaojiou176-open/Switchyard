import type { CredentialState } from './auth.js';
import type { CapabilityId, CapabilityMatrix } from './capabilities.js';
import type {
  ConsumerContext,
  LaneId,
  ProviderId,
  SurfaceId
} from './dimensions.js';
import type { DiagnosticRecord } from './diagnostics.js';
import type { ModelReference, ModelReferenceInput } from './model-reference.js';

export interface RuntimeRequest {
  readonly surface: SurfaceId;
  readonly providerId?: ProviderId;
  readonly modelReference?: ModelReferenceInput;
  readonly preferredLane?: LaneId;
  readonly credentialStates?: Partial<Record<LaneId, CredentialState>>;
  readonly requiredCapabilities?: readonly CapabilityId[];
  readonly consumer?: ConsumerContext;
}

export interface RuntimeSelection {
  readonly providerId: ProviderId;
  readonly laneId: LaneId;
  readonly model: ModelReference;
  readonly surface: SurfaceId;
}

export interface RuntimeInvocationPlan {
  readonly selection: RuntimeSelection;
  readonly capabilities: CapabilityMatrix;
  readonly diagnostics: readonly DiagnosticRecord[];
  readonly consumer?: ConsumerContext;
}
