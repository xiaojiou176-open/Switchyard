import {
  buildDiagnostics,
  deriveRuntimeReadiness,
  stateNeedsUserAction,
  stateSupportsInvocation,
} from "./diagnostics.js";
import type {
  DiagnosticCategory,
  DiagnosticRecord,
  InvokeTransportContract,
  InvokeTransportPlan,
  ProviderStatusView,
  RuntimeFailureStage,
  RuntimeInvocationFailure,
  RuntimeInvocationRequest,
  RuntimeInvocationResult,
  SessionArtifactRecord,
  SessionCapturePlan,
  SessionLifecyclePlan,
  SessionPresence,
  SessionProbeRecord,
  SessionValidationState,
  WebAuthMode,
  WebProviderDescriptor,
  WebSessionSnapshot,
} from "./types.js";

export interface WebLaneContext {
  sessions?: Partial<Record<WebProviderDescriptor["provider"], WebSessionSnapshot>>;
  env?: Record<string, string | undefined>;
  now?: () => Date;
}

export interface WebSessionContractEvaluation {
  state?: WebSessionSnapshot["state"];
  validationState?: SessionValidationState;
  refreshEligible?: boolean;
  requiredUserAction?: string;
  degradedReason?: string;
  note?: string;
  missingArtifacts?: string[];
  probe?: SessionProbeRecord;
  refresh?: SessionLifecyclePlan;
  reAuth?: SessionLifecyclePlan;
}

export interface WebProviderSessionContract {
  probeSource: string;
  probeMode?: string;
  probeHandoff?: string;
  artifacts: Array<Omit<SessionArtifactRecord, "state">>;
  capture: SessionCapturePlan;
  refresh: Pick<SessionLifecyclePlan, "supported" | "mode" | "handoff">;
  reAuth: Pick<SessionLifecyclePlan, "mode" | "handoff">;
  evaluate?: (args: {
    descriptor: Omit<WebProviderDescriptor, "lane">;
    session: WebSessionSnapshot;
    context: WebLaneContext;
    observedAt: string;
    artifactDetails: SessionArtifactRecord[];
  }) => WebSessionContractEvaluation;
}

export interface WebProviderRuntime {
  descriptor: WebProviderDescriptor;
  getStatus(context?: WebLaneContext): Promise<ProviderStatusView>;
  invoke(
    request: RuntimeInvocationRequest,
    context?: WebLaneContext,
  ): Promise<RuntimeInvocationResult>;
}

export interface WebProviderRuntimeConfig {
  descriptor: Omit<WebProviderDescriptor, "lane">;
  defaults?: Partial<WebSessionSnapshot>;
  sessionContract?: Partial<WebProviderSessionContract>;
  invokeContract?: Partial<InvokeTransportContract>;
  hasInvokeTransport?: (context: WebLaneContext) => boolean;
  invokeTransport?: (args: {
    request: RuntimeInvocationRequest;
    status: ProviderStatusView;
    context: WebLaneContext;
  }) => Promise<{ outputText: string; providerMessageId: string }>;
}

const DEFAULT_CAPTURING_NOTE =
  "Selective-transplant landing zone: ready to swap in real browser/session transport later.";

function defaultArtifacts(mode: WebAuthMode, presence: SessionPresence) {
  const sessionPresent = presence === "present";

  return {
    browserProfile: sessionPresent,
    sessionCookie: sessionPresent,
    oauthToken: mode === "oauth" ? sessionPresent : false,
  };
}

function derivePresence(
  state: WebSessionSnapshot["state"],
  explicitPresence: WebSessionSnapshot["presence"],
): SessionPresence {
  if (explicitPresence) {
    return explicitPresence;
  }

  return state === "missing" ? "missing" : "present";
}

function deriveValidationState(
  session: WebSessionSnapshot,
): SessionValidationState {
  if (session.validationState) {
    return session.validationState;
  }

  switch (session.state) {
    case "missing":
      return "unchecked";
    case "expired":
    case "user-action-required":
      return "stale";
    case "refreshable-but-degraded":
      return "recovering";
    case "provider-unavailable":
      return session.lastValidatedAt ? "validated" : "stale";
    case "ready":
    case "expiring":
      return session.lastValidatedAt ? "validated" : "unchecked";
  }
}

function defaultArtifactBlueprints(
  descriptor: Omit<WebProviderDescriptor, "lane">,
): Array<Omit<SessionArtifactRecord, "state">> {
  const common = [
    {
      id: "browser-profile",
      label: "Attached browser profile",
      kind: "browser-profile",
      required: true,
      source: "browser-profile",
      description: "Local Chrome/Chromium profile attached over CDP.",
    },
    {
      id: "cookie-bundle",
      label: "Captured cookie bundle",
      kind: "cookie-bundle",
      required: true,
      source: "cookie-store",
      description: "Provider cookies captured from the user-owned browser session.",
    },
    {
      id: "user-agent",
      label: "Browser user agent",
      kind: "user-agent",
      required: true,
      source: "runtime-derivation",
      description: "User agent reused when replaying the captured browser session.",
    },
  ] as const;

  if (descriptor.authProfile.mode === "oauth") {
    return [
      ...common,
      {
        id: "oauth-cookie",
        label: "OAuth session cookie",
        kind: "oauth-cookie",
        required: true,
        source: "cookie-store",
        description: "Provider-specific OAuth/browser-login cookie material.",
      },
    ];
  }

  return [
    ...common,
    {
      id: "session-cookie",
      label: "Session cookie",
      kind: "session-cookie",
      required: true,
      source: "cookie-store",
      description: "Primary browser session cookie needed for Web/Login traffic.",
    },
  ];
}

function defaultCapturePlan(
  descriptor: Omit<WebProviderDescriptor, "lane">,
  artifacts: Array<Omit<SessionArtifactRecord, "state">>,
): SessionCapturePlan {
  return {
    mode:
      descriptor.authProfile.mode === "oauth"
        ? `${descriptor.provider}-oauth-browser-capture`
        : `${descriptor.provider}-browser-session-capture`,
    referenceUrl: descriptor.authProfile.loginUrl,
    handoff:
      descriptor.authProfile.mode === "oauth"
        ? `Open ${descriptor.authProfile.loginUrl} in the attached browser profile, complete the OAuth/browser login flow, and capture the refreshed local session artifacts.`
        : `Open ${descriptor.authProfile.loginUrl} in the attached browser profile, confirm the browser session is still valid, and capture the refreshed local session artifacts.`,
    artifactIds: artifacts.filter((artifact) => artifact.required).map((artifact) => artifact.id),
  };
}

function defaultSessionContract(
  descriptor: Omit<WebProviderDescriptor, "lane">,
): WebProviderSessionContract {
  const artifacts = defaultArtifactBlueprints(descriptor);

  return {
    probeSource: `${descriptor.provider}-default-web-session-probe`,
    probeMode:
      descriptor.authProfile.mode === "oauth"
        ? `${descriptor.provider}-oauth-session-probe`
        : `${descriptor.provider}-browser-session-probe`,
    probeHandoff:
      descriptor.authProfile.mode === "oauth"
        ? `Run the ${descriptor.displayName} OAuth/browser session probe against the captured local cookies before routing live Web/Login traffic.`
        : `Run the ${descriptor.displayName} browser-session probe against the captured local artifacts before routing live Web/Login traffic.`,
    artifacts,
    capture: defaultCapturePlan(descriptor, artifacts),
    refresh: {
      supported: true,
      mode:
        descriptor.authProfile.mode === "oauth"
          ? `${descriptor.provider}-oauth-session-refresh`
          : `${descriptor.provider}-browser-session-refresh`,
      handoff:
        descriptor.authProfile.mode === "oauth"
          ? `Re-capture the ${descriptor.displayName} OAuth/browser cookies in the attached browser session before the degraded window closes.`
          : `Refresh the ${descriptor.displayName} browser session in the attached profile and re-capture the required local artifacts.`,
    },
    reAuth: {
      mode:
        descriptor.authProfile.mode === "oauth"
          ? `${descriptor.provider}-oauth-reauth`
          : `${descriptor.provider}-browser-session-reauth`,
      handoff:
        descriptor.authProfile.mode === "oauth"
          ? `Re-run the ${descriptor.displayName} OAuth/browser login flow in the attached browser session.`
          : `Re-login to ${descriptor.displayName} in the attached browser session and capture a fresh local session.`,
    },
  };
}

function resolveSessionContract(
  config: WebProviderRuntimeConfig,
): WebProviderSessionContract {
  const base = defaultSessionContract(config.descriptor);
  const override = config.sessionContract;

  if (!override) {
    return base;
  }

  return {
    probeSource: override.probeSource ?? base.probeSource,
    probeMode: override.probeMode ?? base.probeMode,
    probeHandoff: override.probeHandoff ?? base.probeHandoff,
    artifacts: override.artifacts ?? base.artifacts,
    capture: override.capture ?? base.capture,
    refresh: override.refresh ?? base.refresh,
    reAuth: override.reAuth ?? base.reAuth,
    evaluate: override.evaluate ?? base.evaluate,
  };
}

function resolveInvokeContract(
  config: WebProviderRuntimeConfig,
  context: WebLaneContext,
): InvokeTransportContract {
  const override = config.invokeContract;
  const canBindRealTransport = Boolean(
    config.invokeTransport &&
      (config.hasInvokeTransport
        ? config.hasInvokeTransport(context)
        : override?.kind !== "synthetic-demo"),
  );

  if (canBindRealTransport) {
    return {
      kind: "real-transport",
      mode: override?.mode ?? `${config.descriptor.provider}-real-web-invoke`,
      handoff:
        override?.handoff ??
        `Dispatch ${config.descriptor.displayName} through the provider-owned Web/Login transport using the captured local session artifacts.`,
      reason: override?.reason,
    };
  }

  if (override?.kind === "synthetic-demo") {
    return {
      kind: "synthetic-demo",
      mode: override.mode ?? `${config.descriptor.provider}-synthetic-demo-invoke`,
      handoff:
        override.handoff ??
        `Replace the ${config.descriptor.displayName} synthetic demo path with a provider-owned Web/Login invoke transport before routing live traffic.`,
      reason:
        override.reason ??
        `${config.descriptor.displayName} only exposes a descriptive alpha stub today, not a real Web/Login invoke transport.`,
    };
  }

  const kind = "missing";

  return {
    kind,
    mode:
      override?.mode ??
      `${config.descriptor.provider}-invoke-transport-missing`,
    handoff:
      override?.handoff ??
      `Bind a provider-owned Web/Login invoke transport for ${config.descriptor.displayName} before routing live traffic.`,
    reason:
      override?.reason ??
      `${config.descriptor.displayName} has no real Web/Login invoke transport configured yet.`,
  };
}

function buildInvokePlan(
  config: WebProviderRuntimeConfig,
  runtimeReadiness: WebSessionSnapshot["runtimeReadiness"],
  context: WebLaneContext,
): InvokeTransportPlan {
  const contract = resolveInvokeContract(config, context);

  return {
    ...contract,
    readiness:
      contract.kind !== "real-transport" || runtimeReadiness === "blocked"
        ? "blocked"
        : runtimeReadiness === "degraded"
          ? "degraded-allowed"
          : "ready",
  };
}

function buildArtifactDetails(
  session: WebSessionSnapshot,
  contract: WebProviderSessionContract,
  presence: SessionPresence,
): SessionArtifactRecord[] {
  return contract.artifacts.map((artifact) => {
    const explicitState = session.artifactStates?.[artifact.id];
    const inferredState =
      explicitState ??
      (presence === "missing"
        ? "missing"
        : artifact.source === "runtime-derivation" ||
            artifact.source === "organization-discovery"
          ? "derived"
          : "present");

    return {
      ...artifact,
      state: inferredState,
    };
  });
}

function collectMissingArtifacts(artifactDetails: SessionArtifactRecord[]): string[] {
  return artifactDetails
    .filter((artifact) => artifact.required && artifact.state === "missing")
    .map((artifact) => artifact.id);
}

function buildCoarseArtifacts(
  mode: WebAuthMode,
  presence: SessionPresence,
  artifactDetails: SessionArtifactRecord[],
): WebSessionSnapshot["artifacts"] {
  if (presence === "missing") {
    return defaultArtifacts(mode, presence);
  }

  const hasArtifact = (...ids: string[]) =>
    artifactDetails.some(
      (artifact) => ids.includes(artifact.id) && artifact.state !== "missing",
    );

  return {
    browserProfile: hasArtifact("browser-profile"),
    sessionCookie: hasArtifact("cookie-bundle", "session-cookie", "session-token"),
    oauthToken:
      mode === "oauth"
        ? hasArtifact("oauth-cookie", "access-token", "google-sid-cookie", "google-secure-1psid")
        : false,
  };
}

function defaultProbeStatus(session: WebSessionSnapshot): SessionProbeRecord["status"] {
  switch (session.state) {
    case "missing":
      return "artifacts-missing";
    case "expired":
      return "session-expired";
    case "provider-unavailable":
      return "provider-unavailable";
    case "user-action-required":
      return "re-auth-required";
    case "refreshable-but-degraded":
    case "expiring":
      return "refresh-recommended";
    case "ready":
      return session.validationState === "validated"
        ? "session-valid"
        : "captured-unvalidated";
  }
}

function defaultProbeSummary(
  descriptor: Omit<WebProviderDescriptor, "lane">,
  session: WebSessionSnapshot,
): string {
  switch (session.state) {
    case "missing":
      return `${descriptor.displayName} is missing the required local session materials.`;
    case "ready":
      return `${descriptor.displayName} has the required local session materials and is ready for runtime traffic.`;
    case "expiring":
      return `${descriptor.displayName} is still usable, but the local session window is approaching expiry.`;
    case "expired":
      return `${descriptor.displayName} session artifacts are no longer valid and must be renewed by the user.`;
    case "refreshable-but-degraded":
      return `${descriptor.displayName} still has a recoverable browser session, but the runtime is degraded until refresh finishes.`;
    case "provider-unavailable":
      return `${descriptor.displayName} local session looks present, but the upstream provider probe is failing.`;
    case "user-action-required":
      return `${descriptor.displayName} needs explicit user action before Web/Login traffic can continue.`;
  }
}

function defaultRefreshPlan(
  session: WebSessionSnapshot,
  contract: WebProviderSessionContract,
): SessionLifecyclePlan {
  if (!contract.refresh.supported) {
    return {
      supported: false,
      status: "blocked",
      mode: contract.refresh.mode,
      handoff: contract.refresh.handoff,
      reason: "This provider does not expose a runtime-managed refresh path yet.",
    };
  }

  switch (session.state) {
    case "ready":
      return {
        supported: true,
        status: "not-needed",
        mode: contract.refresh.mode,
        handoff: contract.refresh.handoff,
      };
    case "expiring":
      return {
        supported: true,
        status: "available",
        mode: contract.refresh.mode,
        handoff: contract.refresh.handoff,
        reason:
          session.degradedReason ??
          "Session still works, but refresh should happen before the expiry window closes.",
      };
    case "refreshable-but-degraded":
      return {
        supported: true,
        status: session.runtimeReadiness === "blocked" ? "required-now" : "available",
        mode: contract.refresh.mode,
        handoff: contract.refresh.handoff,
        reason:
          session.degradedReason ??
          "Recoverable session artifacts are present, but refresh is still needed.",
      };
    default:
      return {
        supported: true,
        status: "blocked",
        mode: contract.refresh.mode,
        handoff: contract.refresh.handoff,
        reason:
          session.state === "provider-unavailable"
            ? "Refresh is blocked until the provider becomes reachable again."
            : "Refresh cannot recover this state without a new user-owned login/session capture.",
      };
  }
}

function defaultReAuthPlan(
  session: WebSessionSnapshot,
  contract: WebProviderSessionContract,
): SessionLifecyclePlan {
  switch (session.state) {
    case "missing":
      return {
        supported: true,
        status: "required-now",
        mode: contract.reAuth.mode,
        handoff: contract.capture.handoff,
        reason: "No usable local session is currently bound to this provider.",
      };
    case "expired":
    case "user-action-required":
      return {
        supported: true,
        status: "required-now",
        mode: contract.reAuth.mode,
        handoff: contract.reAuth.handoff,
        reason:
          session.requiredUserAction ??
          "The current session can no longer be recovered without explicit user action.",
      };
    default:
      return {
        supported: true,
        status: "not-needed",
        mode: contract.reAuth.mode,
        handoff: contract.reAuth.handoff,
      };
  }
}

function defaultDegradedReason(
  descriptor: Omit<WebProviderDescriptor, "lane">,
  session: WebSessionSnapshot,
): string | undefined {
  if (session.degradedReason) {
    return session.degradedReason;
  }

  switch (session.state) {
    case "expiring":
      return "Local session is still usable, but the expiry window is approaching.";
    case "refreshable-but-degraded":
      return descriptor.degradedInvocationPolicy === "allow-with-warning"
        ? "Refresh path exists; runtime can keep serving while the session is renewed."
        : "Refresh path exists, but this provider is blocked until the session is renewed.";
    case "provider-unavailable":
      return "Local session is present, but the upstream provider health check is failing.";
    default:
      return undefined;
  }
}

function resolveSession(
  config: WebProviderRuntimeConfig,
  context: WebLaneContext,
): WebSessionSnapshot {
  const contract = resolveSessionContract(config);
  const observedAt = nowIso(context);
  const override = context.sessions?.[config.descriptor.provider];
  const merged: WebSessionSnapshot = {
    state: "missing",
    accountLabel: config.descriptor.authProfile.accountLabel,
    sessionSource: config.descriptor.authProfile.sessionSource,
    note: DEFAULT_CAPTURING_NOTE,
    ...config.defaults,
    ...override,
  };
  const initialPresence = derivePresence(merged.state, merged.presence);
  const initialArtifactDetails = buildArtifactDetails(merged, contract, initialPresence);
  const initialMissingArtifacts =
    merged.missingArtifacts ?? collectMissingArtifacts(initialArtifactDetails);
  const initialRuntimeReadiness =
    merged.runtimeReadiness ??
    deriveRuntimeReadiness(merged.state, config.descriptor.degradedInvocationPolicy);
  const seededSession: WebSessionSnapshot = {
    ...merged,
    presence: initialPresence,
    runtimeReadiness: initialRuntimeReadiness,
    validationState: deriveValidationState(merged),
    missingArtifacts: initialMissingArtifacts,
    artifactDetails: initialArtifactDetails,
    artifacts:
      merged.artifacts ??
      buildCoarseArtifacts(
        config.descriptor.authProfile.mode,
        initialPresence,
        initialArtifactDetails,
      ),
    capture: merged.capture ?? contract.capture,
  };

  const evaluation =
    contract.evaluate?.({
      descriptor: config.descriptor,
      session: seededSession,
      context,
      observedAt,
      artifactDetails: initialArtifactDetails,
    }) ?? {};

  const finalState = evaluation.state ?? merged.state;
  const presence = derivePresence(finalState, merged.presence);
  const artifactDetails = buildArtifactDetails(
    {
      ...seededSession,
      state: finalState,
      artifactStates: seededSession.artifactStates,
    },
    contract,
    presence,
  );
  const missingArtifacts =
    evaluation.missingArtifacts ?? merged.missingArtifacts ?? collectMissingArtifacts(artifactDetails);
  const runtimeReadiness =
    merged.runtimeReadiness ??
    deriveRuntimeReadiness(finalState, config.descriptor.degradedInvocationPolicy);
  const validationState =
    evaluation.validationState ??
    deriveValidationState({
      ...seededSession,
      state: finalState,
      runtimeReadiness,
    });

  const sessionWithoutPlans: WebSessionSnapshot = {
    ...seededSession,
    state: finalState,
    presence,
    runtimeReadiness,
    validationState,
    refreshEligible:
      evaluation.refreshEligible ??
      merged.refreshEligible ??
      (finalState === "expiring" ||
        finalState === "refreshable-but-degraded"),
    degradedReason: evaluation.degradedReason,
    missingArtifacts,
    artifactDetails,
    artifacts:
      merged.artifacts ??
      buildCoarseArtifacts(config.descriptor.authProfile.mode, presence, artifactDetails),
  };

  const refresh =
    evaluation.refresh ?? merged.refresh ?? defaultRefreshPlan(sessionWithoutPlans, contract);
  const reAuth =
    evaluation.reAuth ?? merged.reAuth ?? defaultReAuthPlan(sessionWithoutPlans, contract);
  const requiredUserAction =
    merged.requiredUserAction ??
    evaluation.requiredUserAction ??
    (finalState === "missing"
      ? contract.capture.handoff
      : reAuth.status === "required-now"
        ? reAuth.handoff
        : undefined);
  const degradedReason =
    evaluation.degradedReason ??
    merged.degradedReason ??
    defaultDegradedReason(config.descriptor, {
      ...sessionWithoutPlans,
      refresh,
      reAuth,
    });

  const session: WebSessionSnapshot = {
    ...sessionWithoutPlans,
    requiredUserAction,
    degradedReason,
    capture: merged.capture ?? contract.capture,
    probe: {
      status: defaultProbeStatus(sessionWithoutPlans),
      source: contract.probeSource,
      mode: contract.probeMode,
      handoff: contract.probeHandoff,
      checkedAt: observedAt,
      summary: defaultProbeSummary(config.descriptor, sessionWithoutPlans),
      ...merged.probe,
      ...evaluation.probe,
    },
    invoke: buildInvokePlan(
      config,
      sessionWithoutPlans.runtimeReadiness ??
        deriveRuntimeReadiness(
          sessionWithoutPlans.state,
          config.descriptor.degradedInvocationPolicy,
        ),
      context,
    ),
    refresh,
    reAuth,
  };

  return session;
}

function nowIso(context: WebLaneContext): string {
  return (context.now ?? (() => new Date()))().toISOString();
}

function buildInvokeDiagnostic(
  descriptor: WebProviderDescriptor,
  invoke: InvokeTransportPlan,
  observedAt: string,
): DiagnosticRecord | undefined {
  if (invoke.kind === "real-transport") {
    return undefined;
  }

  return {
    category: "routing-error",
    severity: "error",
    message:
      invoke.reason ??
      `${descriptor.displayName} cannot invoke because the shared Web/Login runtime is not backed by a real provider transport.`,
    requiresUserAction: false,
    recoveryHint: invoke.handoff,
    observedAt,
  };
}

function canInvokeStatus(args: {
  runtimeReadiness: ProviderStatusView["runtimeReadiness"];
  invoke: InvokeTransportPlan;
}): boolean {
  return args.runtimeReadiness !== "blocked" && args.invoke.kind === "real-transport";
}

function buildFailure(
  request: RuntimeInvocationRequest,
  category: DiagnosticCategory,
  message: string,
  options: {
    suggestedAction?: string;
    diagnostics?: RuntimeInvocationFailure["diagnostics"];
    status?: ProviderStatusView;
    failureStage?: RuntimeFailureStage;
  } = {},
): RuntimeInvocationFailure {
  return {
    ok: false,
    lane: "web",
    provider: request.provider,
    model: request.model,
    errorCode: category,
    errorCategory: category,
    message,
    failureStage: options.failureStage ?? "invoke",
    sessionPresence: options.status?.sessionPresence,
    runtimeReadiness: options.status?.runtimeReadiness,
    executionMode: options.status?.authMode,
    session: options.status?.session,
    invoke: options.status?.invoke,
    diagnostics: options.diagnostics ?? [],
    suggestedAction: options.suggestedAction,
  };
}

function determineFailureStage(status: ProviderStatusView): RuntimeFailureStage {
  switch (status.credentialState) {
    case "missing":
      return "capture";
    case "refreshable-but-degraded":
    case "expiring":
      return "refresh";
    case "expired":
    case "user-action-required":
      return "re-auth";
    default:
      return "probe";
  }
}

export function createWebProviderRuntime(
  config: WebProviderRuntimeConfig,
): WebProviderRuntime {
  const descriptor: WebProviderDescriptor = {
    ...config.descriptor,
    lane: "web",
  };

  return {
    descriptor,
    async getStatus(context: WebLaneContext = {}): Promise<ProviderStatusView> {
      const session = resolveSession(config, context);
      const observedAt = nowIso(context);
      const sessionDiagnostics = buildDiagnostics(descriptor, session, observedAt);
      const invokeDiagnostic =
        session.runtimeReadiness === "blocked"
          ? undefined
          : buildInvokeDiagnostic(descriptor, session.invoke!, observedAt);
      const diagnostics = invokeDiagnostic
        ? [invokeDiagnostic, ...sessionDiagnostics]
        : sessionDiagnostics;
      const runtimeReadiness =
        session.runtimeReadiness ??
        deriveRuntimeReadiness(session.state, descriptor.degradedInvocationPolicy);
      const available = canInvokeStatus({
        runtimeReadiness,
        invoke: session.invoke!,
      });

      return {
        provider: descriptor.provider,
        lane: "web",
        displayName: descriptor.displayName,
        stabilityTarget: descriptor.stabilityTarget,
        degradedInvocationPolicy: descriptor.degradedInvocationPolicy,
        authMode: descriptor.authProfile.mode,
        credentialState: session.state,
        sessionPresence: session.presence ?? "missing",
        runtimeReadiness,
        session,
        invoke: session.invoke!,
        available,
        diagnostics,
        recommendedAction:
          stateNeedsUserAction(session.state) ||
          runtimeReadiness === "degraded" ||
          !stateSupportsInvocation(session.state, descriptor.degradedInvocationPolicy)
            ? diagnostics.find((diagnostic) => diagnostic.recoveryHint)?.recoveryHint
            : !available
              ? session.invoke?.handoff
            : undefined,
        models: descriptor.models,
      };
    },
    async invoke(
      request: RuntimeInvocationRequest,
      context: WebLaneContext = {},
    ): Promise<RuntimeInvocationResult> {
      if (request.lane && request.lane !== "web") {
        return buildFailure(
          request,
          "routing-error",
          `Web/Login lane cannot execute a ${request.lane} lane request.`,
          {
            suggestedAction: "Send the request to the Web/Login lane or omit the lane field.",
            failureStage: "routing",
          },
        );
      }

      const status = await this.getStatus(context);
      const modelSupported = status.models.some((model) => model.id === request.model);

      if (!modelSupported) {
        return buildFailure(
          request,
          "model-resolution-error",
          `${descriptor.displayName} does not expose model ${request.model}.`,
          {
            suggestedAction: "Use a model id returned by provider discovery.",
            status,
            failureStage: "model-resolution",
          },
        );
      }

      if (status.runtimeReadiness !== "blocked" && status.invoke.kind !== "real-transport") {
        return buildFailure(
          request,
          "routing-error",
          status.invoke.reason ??
            `${descriptor.displayName} has no executable Web/Login invoke transport.`,
          {
            suggestedAction: status.invoke.handoff,
            diagnostics: status.diagnostics,
            status,
            failureStage: "invoke",
          },
        );
      }

      if (!status.available) {
        const primaryDiagnostic = status.diagnostics[0];
        return buildFailure(
          request,
          primaryDiagnostic?.category ?? "user-action-required",
          primaryDiagnostic?.message ??
            `${descriptor.displayName} is not ready for invocation.`,
          {
            suggestedAction: status.recommendedAction,
            diagnostics: status.diagnostics,
            status,
            failureStage: determineFailureStage(status),
          },
        );
      }

      let response: Awaited<ReturnType<NonNullable<typeof config.invokeTransport>>>;

      try {
        response = await config.invokeTransport!({ request, status, context });
      } catch (error) {
        return buildFailure(
          request,
          "provider-unavailable",
          error instanceof Error ? error.message : "Web/Login transport failed unexpectedly.",
          {
            suggestedAction: status.recommendedAction,
            diagnostics: status.diagnostics,
            status,
            failureStage: "invoke",
          },
        );
      }
      const executedAt = nowIso(context);

      return {
        ok: true,
        lane: "web",
        provider: request.provider,
        model: request.model,
        outputText: response.outputText,
        providerMessageId: response.providerMessageId,
        sessionPresence: status.sessionPresence,
        runtimeReadiness: status.runtimeReadiness,
        executionMode: status.authMode,
        executedAt,
        accountLabel: status.session.accountLabel,
        sessionSource: status.session.sessionSource,
        session: status.session,
        invoke: status.invoke,
        diagnostics: status.diagnostics,
      };
    },
  };
}
