import "./load-local-env.mjs";

import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { runGeminiLiveVerification } from "./verify-gemini-live.mjs";
import {
  isCiEnvironment,
  resolveRealityGateArtifactPaths as resolveRealityGateArtifactPathsFromPolicy,
} from "./runtime-policy.mjs";
import { runLightweightRuntimePrune } from "./runtime-cache-maintenance.mjs";
import { runWebLoginLiveVerification } from "./verify-web-login-live.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
export const INTERNAL_GATE_STEPS = Object.freeze([
  Object.freeze(["typecheck", "pnpm", Object.freeze(["typecheck"])]),
  Object.freeze(["test", "pnpm", Object.freeze(["test"])]),
  Object.freeze(["build", "pnpm", Object.freeze(["build"])]),
]);
function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  return result.status ?? 1;
}

export function resolveWorkspaceClassification(result) {
  if (result?.persistenceAudit?.workspaceClassification) {
    return result.persistenceAudit.workspaceClassification;
  }

  const classification = `${result?.classification ?? ""}`.toLowerCase();

  if (
    classification === "session-incomplete" ||
    classification === "human-verification-required" ||
    classification === "account-action-required" ||
    classification === "permission-gated"
  ) {
    return classification;
  }

  return undefined;
}

export function summarizeLiveStatuses(geminiByok, webLogin) {
  const allResults = [geminiByok, ...webLogin].filter(Boolean);
  const classificationCounts = allResults.reduce((counts, result) => {
    if (!result.classification) {
      return counts;
    }

    counts[result.classification] = (counts[result.classification] ?? 0) + 1;
    return counts;
  }, {});
  const workspaceClassificationCounts = allResults.reduce((counts, result) => {
    const workspaceClassification = resolveWorkspaceClassification(result);

    if (!workspaceClassification) {
      return counts;
    }

    counts[workspaceClassification] = (counts[workspaceClassification] ?? 0) + 1;
    return counts;
  }, {});
  const summary = {
    successCount: allResults.filter((result) => result.status === "success").length,
    externalBlockerCount: allResults.filter((result) => result.status === "external-blocker").length,
    failureCount: allResults.filter((result) => result.status === "failure").length,
    classificationCounts,
    workspaceClassificationCounts,
  };

  return {
    summary,
    externalBlockers: allResults
      .filter((result) => result.status === "external-blocker")
      .map((result) => ({
        provider: result.provider ?? "gemini",
        blocker: result.blocker,
        classification: result.classification,
        workspaceClassification: resolveWorkspaceClassification(result),
        missingEnvNames: result.missingEnvNames ?? [],
        probeUrl: result.probeUrl,
        cdpUrl: result.cdpUrl,
        rerunCommand: result.rerunCommand,
        summary: result.summary,
        currentPage:
          result?.debug?.currentPage
            ? {
                url: result.debug.currentPage.url,
                title: result.debug.currentPage.title,
                snippet: result.debug.currentPage.snippet,
                hasComposerSurface: result.debug.currentPage.hasComposerSurface,
                classification: result.debug.currentPage.classification,
              }
            : undefined,
      })),
    failures: allResults
      .filter((result) => result.status === "failure")
      .map((result) => ({
        provider: result.provider ?? "gemini",
        reason: result.reason,
        classification: result.classification,
        invokeErrorCategory: result.invokeErrorCategory,
        failureStage: result.failureStage,
        summary: result.summary,
      })),
  };
}

export async function runWebLoginReality({
  env = process.env,
  runWebLoginLiveVerificationFn = runWebLoginLiveVerification,
  logProgress = (message) => console.error(message),
} = {}) {
  try {
    return await runWebLoginLiveVerificationFn({
      env,
      onProgress(event) {
        if (!event?.stage) {
          return;
        }

        const providerLabel = event.provider ? `[${event.provider}] ` : "";
        const summaryLabel = event.summary ? ` -> ${event.summary}` : "";
        logProgress(
          `[reality:gate] [web-login] ${providerLabel}${event.stage}${summaryLabel}`,
        );
      },
    });
  } catch (error) {
    const diagnostic = error instanceof Error
      ? error.message
      : "web-login aggregate reality rerun threw an unknown error.";

    return [
      {
        status: "failure",
        provider: "web-login-aggregate",
        reason: "probe-request-failed",
        classification: "transport-instability",
        diagnostic,
        summary: "web-login aggregate reality rerun failed before producing a stable result.",
      },
    ];
  }
}

export function buildRealityGateReport({ internalGate, geminiByok, webLogin }) {
  const internalGatePassed = internalGate.every((step) => step.exitCode === 0);
  const { summary, externalBlockers, failures } = summarizeLiveStatuses(geminiByok, webLogin);
  const repoOwnedPassed = internalGatePassed && summary.failureCount === 0;
  const repoOwnedVerdict = repoOwnedPassed ? "pass" : "fail";
  const repoOwnedStatus = !repoOwnedPassed
    ? "failure"
    : summary.externalBlockerCount > 0
      ? "pass-with-external-blockers"
      : "pass";
  const overallStatus = !internalGatePassed
    ? "failure"
    : summary.failureCount > 0
      ? "failure"
      : summary.externalBlockerCount > 0
        ? "external-blocker"
        : "success";

  return {
    generatedAt: new Date().toISOString(),
    overallStatus,
    exitCode: overallStatus === "success" ? 0 : overallStatus === "external-blocker" ? 2 : 1,
    repoOwnedGate: {
      passed: repoOwnedPassed,
      verdict: repoOwnedVerdict,
      status: repoOwnedStatus,
    },
    m1KernelAlphaRealityGate: repoOwnedVerdict,
    internalGate: {
      passed: internalGatePassed,
      steps: internalGate,
    },
    liveGate: {
      geminiByok,
      webLogin,
      summary,
    },
    externalBlockers,
    failures,
  };
}

export function resolveRealityGateArtifactPaths(env = process.env) {
  return resolveRealityGateArtifactPathsFromPolicy(env, repoRoot);
}

export function persistRealityGateReport(report, env = process.env) {
  const { runtimeCacheRoot, outputPath, exitPath } = resolveRealityGateArtifactPaths(env);

  mkdirSync(runtimeCacheRoot, {
    recursive: true,
  });
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  writeFileSync(exitPath, `${report.exitCode}\n`, "utf8");
}

async function main() {
  if (isCiEnvironment(process.env)) {
    throw new Error(
      "Switchyard reality:gate is credentialed-workstation only and must not run inside CI.",
    );
  }

  runLightweightRuntimePrune({
    repoRoot,
    env: process.env,
  });

  const internalGate = INTERNAL_GATE_STEPS.map(([name, command, args]) => ({
    name,
    exitCode: run(command, args),
  }));

  let geminiByok = {
    status: "skipped",
    reason: "internal-gate-failed",
  };
  let webLogin = [];

  if (internalGate.every((step) => step.exitCode === 0)) {
    geminiByok = await runGeminiLiveVerification();
    webLogin = (await runWebLoginReality({
      env: process.env,
    })).filter(Boolean);
  }

  const report = buildRealityGateReport({
    internalGate,
    geminiByok,
    webLogin,
  });

  persistRealityGateReport(report);
  runLightweightRuntimePrune({
    repoRoot,
    env: process.env,
  });
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.exitCode);
}

const invokedPath = process.argv[1];

if (invokedPath && resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  await main();
}
