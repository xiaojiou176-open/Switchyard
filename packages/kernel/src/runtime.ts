import {
  type DiagnosticRecord,
  type LaneId,
  type RuntimeInvocationPlan,
  type RuntimeRequest,
  SwitchyardContractError,
  createDiagnosticRecord
} from '../../contracts/src/index.js';
import { dispatchLane, type LaneDispatchOptions } from './lane-dispatch.js';
import { resolveModelReference } from './model-resolution.js';
import { type ProviderRegistry } from './provider-registry.js';

export interface SwitchyardRuntimeOptions extends LaneDispatchOptions {
  readonly registry: ProviderRegistry;
}

function buildRuntimeDiagnostics(
  request: RuntimeRequest,
  laneId: LaneId
): readonly DiagnosticRecord[] {
  if (request.credentialStates?.[laneId] !== 'refreshable-degraded') {
    return [];
  }

  return Object.freeze([
    createDiagnosticRecord({
      code: 'session-refreshable-degraded',
      message: `Lane "${laneId}" remains usable but requires refresh attention before it becomes unavailable.`,
      context: {
        providerId: request.providerId,
        laneId,
        surfaceId: request.surface,
        consumerId: request.consumer?.consumerId
      }
    })
  ]);
}

export class SwitchyardRuntime {
  readonly registry: ProviderRegistry;
  readonly laneOrder: readonly LaneId[];

  constructor(options: SwitchyardRuntimeOptions) {
    this.registry = options.registry;
    this.laneOrder = Object.freeze([...(options.laneOrder ?? ['byok', 'web-login'])]);
  }

  listProviders(filters?: { readonly laneId?: LaneId }) {
    return this.registry.list(filters);
  }

  prepareInvocation(request: RuntimeRequest): RuntimeInvocationPlan {
    if (!request.providerId && !request.modelReference) {
      throw new SwitchyardContractError(
        'routing-failed',
        'Runtime invocation requires at least providerId or modelReference.'
      );
    }

    const laneDecision = dispatchLane(this.registry, request, {
      laneOrder: this.laneOrder
    });

    const resolvedModel = resolveModelReference(
      this.registry,
      {
        providerId: laneDecision.providerId,
        laneId: laneDecision.laneId,
        modelReference: request.modelReference
      },
      {
        laneOrder: this.laneOrder
      }
    );

    const providerEntry = this.registry.require(laneDecision.providerId, laneDecision.laneId);

    return Object.freeze({
      selection: Object.freeze({
        providerId: laneDecision.providerId,
        laneId: laneDecision.laneId,
        model: resolvedModel.model,
        surface: request.surface
      }),
      capabilities: providerEntry.capabilities,
      diagnostics: buildRuntimeDiagnostics(request, laneDecision.laneId),
      consumer: request.consumer
    });
  }
}

export function createSwitchyardRuntime(options: SwitchyardRuntimeOptions): SwitchyardRuntime {
  return new SwitchyardRuntime(options);
}
