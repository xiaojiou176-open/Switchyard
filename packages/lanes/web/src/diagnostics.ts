import type {
  CredentialState,
  DegradedInvocationPolicy,
  DiagnosticCategory,
  DiagnosticRecord,
  RuntimeReadiness,
  WebProviderDescriptor,
  WebSessionSnapshot,
} from "./types.js";

const ACTION_REQUIRED_STATES = new Set<CredentialState>([
  "missing",
  "expired",
  "user-action-required",
]);

function stateToCategory(state: CredentialState): DiagnosticCategory {
  switch (state) {
    case "ready":
      return "ready";
    case "expiring":
      return "expiring-session";
    case "missing":
      return "missing-credential";
    case "expired":
      return "expired-session";
    case "refreshable-but-degraded":
      return "refreshable-but-degraded";
    case "provider-unavailable":
      return "provider-unavailable";
    case "user-action-required":
      return "user-action-required";
  }
}

function formatList(items: string[]): string {
  if (items.length === 1) {
    return items[0];
  }

  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

function stateToMessage(
  descriptor: WebProviderDescriptor,
  session: WebSessionSnapshot,
): string {
  if (
    session.probe?.summary &&
    !(
      session.state === "refreshable-but-degraded" &&
      session.runtimeReadiness === "blocked"
    )
  ) {
    return session.probe.summary;
  }

  switch (session.state) {
    case "ready":
      return `${descriptor.displayName} session is validated and ready for Web/Login traffic.`;
    case "expiring":
      return `${descriptor.displayName} session is nearing expiry; runtime can continue in degraded mode while you renew it.`;
    case "missing":
      return `${descriptor.displayName} requires a user-owned login session before invocation.`;
    case "expired":
      return `${descriptor.displayName} session expired and the runtime is blocked until it is renewed.`;
    case "refreshable-but-degraded":
      return descriptor.degradedInvocationPolicy === "allow-with-warning"
        ? `${descriptor.displayName} session is degraded but refreshable; the high-stability runtime can continue with warnings.`
        : `${descriptor.displayName} session is degraded but refreshable; this provider stays blocked until the session is renewed.`;
    case "provider-unavailable":
      return `${descriptor.displayName} upstream is unavailable right now, even though the local session is still present.`;
    case "user-action-required":
      return `${descriptor.displayName} needs explicit user action before it can run.`;
  }
}

function defaultRecoveryHint(descriptor: WebProviderDescriptor): string {
  switch (descriptor.authProfile.mode) {
    case "browser-session":
      return `Login at ${descriptor.authProfile.loginUrl} and refresh the captured browser session.`;
    case "oauth":
      return `Re-run the ${descriptor.displayName} OAuth/browser login flow to refresh the local session.`;
  }
}

function stateToRecoveryHint(
  descriptor: WebProviderDescriptor,
  session: WebSessionSnapshot,
): string | undefined {
  if (session.requiredUserAction) {
    return session.requiredUserAction;
  }

  if (session.state === "missing") {
    return session.capture?.handoff ?? defaultRecoveryHint(descriptor);
  }

  switch (session.state) {
    case "ready":
      return undefined;
    case "provider-unavailable":
      return "Retry after the provider recovers; do not auto-fail over to another account or provider.";
    case "expiring":
      return session.refresh?.handoff ?? defaultRecoveryHint(descriptor);
    case "refreshable-but-degraded":
      return session.refresh?.handoff ?? defaultRecoveryHint(descriptor);
    case "expired":
    case "user-action-required":
      return session.reAuth?.handoff ?? defaultRecoveryHint(descriptor);
    default:
      if (session.missingArtifacts?.length) {
        return `Capture or restore the missing ${formatList(session.missingArtifacts)} and re-check the local session.`;
      }

      return defaultRecoveryHint(descriptor);
  }
}

function presenceDiagnostic(
  descriptor: WebProviderDescriptor,
  session: WebSessionSnapshot,
  observedAt: string,
): DiagnosticRecord | undefined {
  if (session.presence === "missing") {
    if (!session.missingArtifacts?.length) {
      return undefined;
    }

    return {
      category: "missing-credential",
      severity: "error",
      message: `${descriptor.displayName} is missing ${formatList(session.missingArtifacts)} in local state.`,
      requiresUserAction: true,
      recoveryHint: stateToRecoveryHint(descriptor, session),
      observedAt,
    };
  }

  return {
    category: session.state === "expiring" ? "expiring-session" : "ready",
    severity: session.runtimeReadiness === "blocked" ? "warn" : "info",
    message: `${descriptor.displayName} sees a local session for ${session.accountLabel ?? descriptor.authProfile.accountLabel} from ${session.sessionSource ?? descriptor.authProfile.sessionSource}.`,
    requiresUserAction: false,
    observedAt,
  };
}

function validationDiagnostic(
  session: WebSessionSnapshot,
  observedAt: string,
): DiagnosticRecord | undefined {
  const category =
    session.state === "expiring"
      ? "expiring-session"
      : session.state === "refreshable-but-degraded"
        ? "refreshable-but-degraded"
        : "ready";

  switch (session.validationState) {
    case "validated":
      return session.lastValidatedAt
        ? {
            category,
            severity: "info",
            message: `Local session was last validated at ${session.lastValidatedAt}.`,
            requiresUserAction: false,
            observedAt,
          }
        : undefined;
    case "recovering":
      return {
        category,
        severity: "warn",
        message: session.degradedReason
          ? session.degradedReason
          : "Local session exists, but the refresh/recovery path is still active.",
        requiresUserAction: false,
        observedAt,
      };
    case "stale":
      return {
        category: session.state === "expired" ? "expired-session" : "user-action-required",
        severity: "warn",
        message: session.lastValidatedAt
          ? `Local session exists, but validation is stale since ${session.lastValidatedAt}.`
          : "Local session exists, but validation is stale.",
        requiresUserAction: false,
        observedAt,
      };
    case "unchecked":
      if (session.presence !== "present") {
        return undefined;
      }

      return {
        category,
        severity: "warn",
        message: "Local session materials exist, but runtime has not validated them yet.",
        requiresUserAction: false,
        observedAt,
      };
  }
}

function refreshDiagnostic(
  descriptor: WebProviderDescriptor,
  session: WebSessionSnapshot,
  observedAt: string,
): DiagnosticRecord | undefined {
  if (!session.refreshEligible) {
    return undefined;
  }

  const runtimeClause =
    session.runtimeReadiness === "blocked"
      ? "traffic is currently blocked"
      : "traffic can continue with warnings";

  return {
    category: "refreshable-but-degraded",
    severity: session.runtimeReadiness === "blocked" ? "warn" : "info",
    message:
      session.refresh?.reason ??
      `${descriptor.displayName} has a refresh path and ${runtimeClause}.`,
    requiresUserAction: false,
    recoveryHint:
      session.state === "refreshable-but-degraded"
        ? session.refresh?.handoff ?? stateToRecoveryHint(descriptor, session)
        : undefined,
    observedAt,
  };
}

export function buildDiagnostics(
  descriptor: WebProviderDescriptor,
  session: WebSessionSnapshot,
  observedAt: string,
): DiagnosticRecord[] {
  const category = stateToCategory(session.state);
  const severity =
    session.state === "ready"
      ? "info"
      : session.state === "expiring" || session.state === "refreshable-but-degraded"
        ? "warn"
        : "error";

  const diagnostics: DiagnosticRecord[] = [
    {
      category,
      severity,
      message: stateToMessage(descriptor, session),
      requiresUserAction: ACTION_REQUIRED_STATES.has(session.state),
      recoveryHint:
        session.state === "ready" ? undefined : stateToRecoveryHint(descriptor, session),
      observedAt,
    },
  ];

  const presence = presenceDiagnostic(descriptor, session, observedAt);
  if (presence) {
    diagnostics.push(presence);
  }

  const validation = validationDiagnostic(session, observedAt);
  if (validation) {
    diagnostics.push(validation);
  }

  const refresh = refreshDiagnostic(descriptor, session, observedAt);
  if (refresh) {
    diagnostics.push(refresh);
  }

  return diagnostics;
}

export function deriveRuntimeReadiness(
  state: CredentialState,
  degradedInvocationPolicy: DegradedInvocationPolicy,
): RuntimeReadiness {
  switch (state) {
    case "ready":
      return "ready";
    case "expiring":
      return "degraded";
    case "refreshable-but-degraded":
      return degradedInvocationPolicy === "allow-with-warning"
        ? "degraded"
        : "blocked";
    case "missing":
    case "expired":
    case "provider-unavailable":
    case "user-action-required":
      return "blocked";
  }
}

export function stateSupportsInvocation(
  state: CredentialState,
  degradedInvocationPolicy: DegradedInvocationPolicy,
): boolean {
  return deriveRuntimeReadiness(state, degradedInvocationPolicy) !== "blocked";
}

export function stateNeedsUserAction(state: CredentialState): boolean {
  return ACTION_REQUIRED_STATES.has(state);
}
