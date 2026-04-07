import { describe, expect, it } from "vitest";

import {
  buildDiagnostics,
  deriveRuntimeReadiness,
  stateNeedsUserAction,
  stateSupportsInvocation,
} from "../../../packages/lanes/web/src/diagnostics.js";

const descriptor = {
  id: "chatgpt",
  displayName: "ChatGPT",
  authProfile: {
    mode: "browser-session",
    loginUrl: "https://chatgpt.com",
    accountLabel: "chatgpt-default",
    sessionSource: "chatgpt-browser-profile",
  },
  degradedInvocationPolicy: "allow-with-warning",
} as const;

describe("web diagnostics runtime helpers", () => {
  it("builds ready diagnostics with probe and validation context", () => {
    const diagnostics = buildDiagnostics(
      descriptor,
      {
        state: "ready",
        presence: "present",
        runtimeReadiness: "ready",
        validationState: "validated",
        accountLabel: "chatgpt@example.com",
        sessionSource: "chatgpt-browser-profile",
        lastValidatedAt: "2026-04-03T18:00:00.000Z",
        probe: {
          status: "session-valid",
          source: "chatgpt-auth-session-probe",
          summary: "ChatGPT session token is present.",
        },
        missingArtifacts: [],
        artifactDetails: [],
        refreshEligible: false,
      },
      "2026-04-03T18:10:00.000Z",
    );

    expect(diagnostics).toEqual([
      expect.objectContaining({
        category: "ready",
        severity: "info",
        message: "ChatGPT session token is present.",
      }),
      expect.objectContaining({
        category: "ready",
        severity: "info",
        message: expect.stringContaining("chatgpt@example.com"),
      }),
      expect.objectContaining({
        category: "ready",
        severity: "info",
        message: expect.stringContaining("2026-04-03T18:00:00.000Z"),
      }),
    ]);
  });

  it("builds missing diagnostics with capture guidance and user-action flags", () => {
    const diagnostics = buildDiagnostics(
      descriptor,
      {
        state: "missing",
        presence: "missing",
        runtimeReadiness: "blocked",
        validationState: "unchecked",
        missingArtifacts: ["cookie-bundle", "user-agent"],
        artifactDetails: [],
        refreshEligible: false,
        capture: {
          handoff: "Open the managed browser and capture the missing artifacts.",
        },
      },
      "2026-04-03T18:10:00.000Z",
    );

    expect(diagnostics[0]).toEqual(
      expect.objectContaining({
        category: "missing-credential",
        severity: "error",
        requiresUserAction: true,
        recoveryHint: "Open the managed browser and capture the missing artifacts.",
      }),
    );
    expect(diagnostics[1]).toEqual(
      expect.objectContaining({
        category: "missing-credential",
        severity: "error",
        message: expect.stringContaining("cookie-bundle and user-agent"),
      }),
    );
  });

  it("builds refreshable diagnostics and derives invocation readiness correctly", () => {
    const diagnostics = buildDiagnostics(
      {
        ...descriptor,
        degradedInvocationPolicy: "block-until-renewed",
      },
      {
        state: "refreshable-but-degraded",
        presence: "present",
        runtimeReadiness: "blocked",
        validationState: "recovering",
        degradedReason: "Session can be renewed but is currently unstable.",
        artifactDetails: [],
        refreshEligible: true,
        refresh: {
          status: "available",
          mode: "chatgpt-auth-session-refresh",
          handoff: "Refresh the browser session.",
          reason: "Session is refreshable.",
        },
      },
      "2026-04-03T18:10:00.000Z",
    );

    expect(diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: "refreshable-but-degraded",
          severity: "warn",
          recoveryHint: "Refresh the browser session.",
        }),
        expect.objectContaining({
          category: "refreshable-but-degraded",
          severity: "warn",
          message: "Session can be renewed but is currently unstable.",
        }),
      ]),
    );

    expect(deriveRuntimeReadiness("ready", "allow-with-warning")).toBe("ready");
    expect(deriveRuntimeReadiness("expiring", "allow-with-warning")).toBe("degraded");
    expect(deriveRuntimeReadiness("refreshable-but-degraded", "allow-with-warning")).toBe("degraded");
    expect(deriveRuntimeReadiness("refreshable-but-degraded", "block-until-renewed")).toBe("blocked");
    expect(stateSupportsInvocation("refreshable-but-degraded", "allow-with-warning")).toBe(true);
    expect(stateSupportsInvocation("expired", "allow-with-warning")).toBe(false);
    expect(stateNeedsUserAction("missing")).toBe(true);
    expect(stateNeedsUserAction("provider-unavailable")).toBe(false);
  });

  it("builds expiring diagnostics with refresh guidance", () => {
    const diagnostics = buildDiagnostics(
      descriptor,
      {
        state: "expiring",
        presence: "present",
        runtimeReadiness: "degraded",
        validationState: "validated",
        lastValidatedAt: "2026-04-03T18:00:00.000Z",
        accountLabel: "chatgpt@example.com",
        sessionSource: "chatgpt-browser-profile",
        artifactDetails: [],
        refreshEligible: true,
        refresh: {
          status: "available",
          mode: "chatgpt-auth-session-refresh",
          handoff: "Renew the local browser session now.",
        },
      },
      "2026-04-03T18:10:00.000Z",
    );

    expect(diagnostics[0]).toEqual(
      expect.objectContaining({
        category: "expiring-session",
        severity: "warn",
        recoveryHint: "Renew the local browser session now.",
      }),
    );
    expect(diagnostics[2]).toEqual(
      expect.objectContaining({
        category: "expiring-session",
        severity: "info",
      }),
    );
  });

  it("builds blocked diagnostics for expired and provider-unavailable sessions", () => {
    const expired = buildDiagnostics(
      {
        ...descriptor,
        degradedInvocationPolicy: "block-until-renewed",
      },
      {
        state: "expired",
        presence: "present",
        runtimeReadiness: "blocked",
        validationState: "stale",
        artifactDetails: [],
        refreshEligible: false,
        reAuth: {
          status: "required",
          mode: "chatgpt-browser-session-reauth",
          handoff: "Sign in again to refresh the local ChatGPT session.",
        },
      },
      "2026-04-03T18:10:00.000Z",
    );

    const unavailable = buildDiagnostics(
      descriptor,
      {
        state: "provider-unavailable",
        presence: "present",
        runtimeReadiness: "blocked",
        validationState: "recovering",
        artifactDetails: [],
        refreshEligible: false,
      },
      "2026-04-03T18:10:00.000Z",
    );

    expect(expired[0]).toEqual(
      expect.objectContaining({
        category: "expired-session",
        severity: "error",
        requiresUserAction: true,
        recoveryHint: "Sign in again to refresh the local ChatGPT session.",
      }),
    );
    expect(unavailable[0]).toEqual(
      expect.objectContaining({
        category: "provider-unavailable",
        severity: "error",
        recoveryHint: "Retry after the provider recovers; do not auto-fail over to another account or provider.",
      }),
    );
  });

  it("falls back to oauth recovery guidance for unchecked user-action-required sessions", () => {
    const diagnostics = buildDiagnostics(
      {
        ...descriptor,
        displayName: "Gemini",
        authProfile: {
          ...descriptor.authProfile,
          mode: "oauth",
          loginUrl: "https://accounts.google.com",
        },
      },
      {
        state: "user-action-required",
        presence: "present",
        runtimeReadiness: "blocked",
        validationState: "unchecked",
        artifactDetails: [],
        refreshEligible: false,
      },
      "2026-04-03T18:10:00.000Z",
    );

    expect(diagnostics[0]).toEqual(
      expect.objectContaining({
        category: "user-action-required",
        severity: "error",
        requiresUserAction: true,
        recoveryHint: "Re-run the Gemini OAuth/browser login flow to refresh the local session.",
      }),
    );
    expect(diagnostics[2]).toEqual(
      expect.objectContaining({
        category: "ready",
        severity: "warn",
        message: "Local session materials exist, but runtime has not validated them yet.",
      }),
    );
  });
});
