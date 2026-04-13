import { describe, expect, it } from "vitest";

describe("reality gate governance helpers", () => {
  it("locks the internal gate order to typecheck, test, and build under pnpm", async () => {
    const { INTERNAL_GATE_STEPS } = await import("../../../scripts/run-reality-gate.mjs");

    expect(INTERNAL_GATE_STEPS).toEqual([
      ["typecheck", "pnpm", ["typecheck"]],
      ["test", "pnpm", ["test"]],
      ["build", "pnpm", ["build"]],
    ]);
  });

  it("maps supported workspace classifications without inventing unsupported ones", async () => {
    const { resolveWorkspaceClassification } = await import("../../../scripts/run-reality-gate.mjs");

    expect(resolveWorkspaceClassification(undefined)).toBeUndefined();
    expect(
      resolveWorkspaceClassification({
        persistenceAudit: {
          workspaceClassification: "attach-failed",
        },
        classification: "transport-instability",
      }),
    ).toBe("attach-failed");
    expect(
      resolveWorkspaceClassification({
        classification: "permission-gated",
      }),
    ).toBe("permission-gated");
    expect(
      resolveWorkspaceClassification({
        classification: "session-incomplete",
      }),
    ).toBe("session-incomplete");
    expect(
      resolveWorkspaceClassification({
        classification: "human-verification-required",
      }),
    ).toBe("human-verification-required");
    expect(
      resolveWorkspaceClassification({
        classification: "account-action-required",
      }),
    ).toBe("account-action-required");
    expect(
      resolveWorkspaceClassification({
        classification: "session-material-missing",
      }),
    ).toBeUndefined();
  });

  it("summarizes live statuses with explicit blocker and failure ledgers", async () => {
    const { summarizeLiveStatuses } = await import("../../../scripts/run-reality-gate.mjs");

    const summarized = summarizeLiveStatuses(
      {
        status: "external-blocker",
        blocker: "missing-gemini-api-key",
        classification: "session-material-missing",
        summary: "user-owned key is missing",
      },
      [
        {
          status: "success",
          provider: "chatgpt",
        },
        {
          status: "external-blocker",
          provider: "claude",
          blocker: "claude-account-action-required",
          classification: "account-action-required",
          missingEnvNames: ["SWITCHYARD_WEB_CLAUDE_COOKIE_BUNDLE"],
          persistenceAudit: {
            workspaceClassification: "attach-failed",
          },
          rerunCommand: "pnpm run verify:web-login-live -- --provider claude",
          summary: "manual account action is still required",
        },
        {
          status: "failure",
          reason: "invoke-failed",
          classification: "transport-instability",
          invokeErrorCategory: "provider-unavailable",
          failureStage: "invoke",
          summary: "web invoke failed after probe success",
        },
      ],
    );

    expect(summarized.summary).toEqual({
      successCount: 1,
      externalBlockerCount: 2,
      failureCount: 1,
      classificationCounts: {
        "session-material-missing": 1,
        "account-action-required": 1,
        "transport-instability": 1,
      },
      workspaceClassificationCounts: {
        "attach-failed": 1,
      },
    });
    expect(summarized.externalBlockers).toEqual([
      {
        provider: "gemini",
        blocker: "missing-gemini-api-key",
        classification: "session-material-missing",
        workspaceClassification: undefined,
        missingEnvNames: [],
        probeUrl: undefined,
        cdpUrl: undefined,
        rerunCommand: undefined,
        summary: "user-owned key is missing",
      },
      {
        provider: "claude",
        blocker: "claude-account-action-required",
        classification: "account-action-required",
        workspaceClassification: "attach-failed",
        missingEnvNames: ["SWITCHYARD_WEB_CLAUDE_COOKIE_BUNDLE"],
        probeUrl: undefined,
        cdpUrl: undefined,
        rerunCommand: "pnpm run verify:web-login-live -- --provider claude",
        summary: "manual account action is still required",
      },
    ]);
    expect(summarized.failures).toEqual([
      {
        provider: "gemini",
        reason: "invoke-failed",
        classification: "transport-instability",
        invokeErrorCategory: "provider-unavailable",
        failureStage: "invoke",
        summary: "web invoke failed after probe success",
      },
    ]);
  });

  it("filters falsy live results before building the summary", async () => {
    const { summarizeLiveStatuses } = await import("../../../scripts/run-reality-gate.mjs");

    const summarized = summarizeLiveStatuses(
      {
        status: "success",
        provider: "gemini",
      },
      [
        undefined,
        {
          status: "external-blocker",
          provider: "claude",
          blocker: "claude-account-action-required",
          classification: "account-action-required",
          summary: "manual account action is still required",
        },
      ],
    );

    expect(summarized.summary).toEqual({
      successCount: 1,
      externalBlockerCount: 1,
      failureCount: 0,
      classificationCounts: {
        "account-action-required": 1,
      },
      workspaceClassificationCounts: {
        "account-action-required": 1,
      },
    });
    expect(summarized.externalBlockers).toEqual([
      {
        provider: "claude",
        blocker: "claude-account-action-required",
        classification: "account-action-required",
        workspaceClassification: "account-action-required",
        missingEnvNames: [],
        probeUrl: undefined,
        cdpUrl: undefined,
        rerunCommand: undefined,
        summary: "manual account action is still required",
      },
    ]);
    expect(summarized.failures).toEqual([]);
  });

  it("reports a fully green reality gate as success", async () => {
    const { buildRealityGateReport } = await import("../../../scripts/run-reality-gate.mjs");

    const report = buildRealityGateReport({
      internalGate: [
        { name: "typecheck", exitCode: 0 },
        { name: "test", exitCode: 0 },
        { name: "build", exitCode: 0 },
      ],
      geminiByok: {
        status: "success",
        provider: "gemini",
      },
      webLogin: [
        {
          status: "success",
          provider: "chatgpt",
        },
      ],
    });

    expect(report.overallStatus).toBe("success");
    expect(report.exitCode).toBe(0);
    expect(report.repoOwnedGate).toEqual({
      passed: true,
      verdict: "pass",
      status: "pass",
    });
    expect(report.m1KernelAlphaRealityGate).toBe("pass");
  });
});
