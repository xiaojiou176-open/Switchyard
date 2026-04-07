import { afterEach, describe, expect, it, vi } from "vitest";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

function restoreOptionalEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
    return;
  }

  process.env[name] = value;
}

function createRepoScopedArtifactDir(prefix: string) {
  const baseDir = join(process.cwd(), ".runtime-cache", "temp");
  mkdirSync(baseDir, {
    recursive: true,
  });
  return mkdtempSync(join(baseDir, prefix));
}

describe("run-reality-gate script", () => {
  it("skips live verification when an internal gate step already failed", async () => {
    const scriptPath = fileURLToPath(
      new URL("../../../scripts/run-reality-gate.mjs", import.meta.url),
    );
    const spawnSync = vi
      .fn()
      .mockReturnValueOnce({ status: 0 })
      .mockReturnValueOnce({ status: 1 })
      .mockReturnValueOnce({ status: 0 });
    const runGeminiLiveVerification = vi.fn(async () => ({ status: "success" }));
    const runWebLoginLiveVerification = vi.fn(async () => [
      {
        status: "success",
        provider: "chatgpt",
      },
    ]);
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
    const processExit = vi
      .spyOn(process, "exit")
      .mockImplementation(((code?: number) => {
        throw new Error(`EXIT:${code}`);
      }) as never);
    const artifactDir = createRepoScopedArtifactDir("switchyard-reality-gate-");

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-gemini-live.mjs", () => ({
      runGeminiLiveVerification,
    }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));

    const originalArgv = [...process.argv];
    const originalArtifactDir = process.env.SWITCHYARD_REALITY_GATE_ARTIFACT_DIR;
    const originalCi = process.env.CI;
    const originalGithubActions = process.env.GITHUB_ACTIONS;
    process.argv[1] = scriptPath;
    process.env.SWITCHYARD_REALITY_GATE_ARTIFACT_DIR = artifactDir;
    delete process.env.CI;
    delete process.env.GITHUB_ACTIONS;

    try {
      await expect(
        import(pathToFileURL(scriptPath).href),
      ).rejects.toThrow("EXIT:1");
    } finally {
      process.argv = originalArgv;
      restoreOptionalEnv("SWITCHYARD_REALITY_GATE_ARTIFACT_DIR", originalArtifactDir);
      restoreOptionalEnv("CI", originalCi);
      restoreOptionalEnv("GITHUB_ACTIONS", originalGithubActions);
      rmSync(artifactDir, {
        recursive: true,
        force: true,
      });
    }

    expect(runGeminiLiveVerification).not.toHaveBeenCalled();
    expect(runWebLoginLiveVerification).not.toHaveBeenCalled();
    expect(consoleLog).toHaveBeenCalledWith(
      expect.stringContaining('"overallStatus": "failure"'),
    );
    expect(processExit).toHaveBeenCalledWith(1);
  });

  it("runs live verification and exits with external-blocker when internal gates pass", async () => {
    const scriptPath = fileURLToPath(
      new URL("../../../scripts/run-reality-gate.mjs", import.meta.url),
    );
    const spawnSync = vi.fn(() => ({ status: 0 }));
    const runGeminiLiveVerification = vi.fn(async () => ({
      status: "external-blocker",
      provider: "gemini",
      blocker: "missing-gemini-api-key",
      classification: "session-material-missing",
      missingEnvNames: ["GEMINI_API_KEY"],
      rerunCommand: "pnpm exec node scripts/verify-gemini-live.mjs",
    }));
    const runWebLoginLiveVerification = vi.fn(async () => [
      {
        status: "success",
        provider: "chatgpt",
      },
      {
        status: "external-blocker",
        provider: "claude",
        blocker: "claude-blocked",
        classification: "session-incomplete",
        persistenceAudit: {
          workspaceClassification: "session-incomplete",
        },
      },
    ]);
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
    const processExit = vi
      .spyOn(process, "exit")
      .mockImplementation(((code?: number) => {
        throw new Error(`EXIT:${code}`);
      }) as never);
    const artifactDir = createRepoScopedArtifactDir("switchyard-reality-gate-");

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-gemini-live.mjs", () => ({
      runGeminiLiveVerification,
    }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));

    const originalArgv = [...process.argv];
    const originalArtifactDir = process.env.SWITCHYARD_REALITY_GATE_ARTIFACT_DIR;
    const originalCi = process.env.CI;
    const originalGithubActions = process.env.GITHUB_ACTIONS;
    process.argv[1] = scriptPath;
    process.env.SWITCHYARD_REALITY_GATE_ARTIFACT_DIR = artifactDir;
    delete process.env.CI;
    delete process.env.GITHUB_ACTIONS;

    try {
      await expect(
        import(pathToFileURL(scriptPath).href),
      ).rejects.toThrow("EXIT:2");
    } finally {
      process.argv = originalArgv;
      restoreOptionalEnv("SWITCHYARD_REALITY_GATE_ARTIFACT_DIR", originalArtifactDir);
      restoreOptionalEnv("CI", originalCi);
      restoreOptionalEnv("GITHUB_ACTIONS", originalGithubActions);
      rmSync(artifactDir, {
        recursive: true,
        force: true,
      });
    }

    expect(runGeminiLiveVerification).toHaveBeenCalledTimes(1);
    expect(runWebLoginLiveVerification).toHaveBeenCalledTimes(1);
    expect(consoleLog).toHaveBeenCalledWith(
      expect.stringContaining('"overallStatus": "external-blocker"'),
    );
    expect(consoleLog).toHaveBeenCalledWith(
      expect.stringContaining('"workspaceClassificationCounts"'),
    );
    expect(processExit).toHaveBeenCalledWith(2);
  });

  it("persists the final report and exit code into runtime-cache artifacts", async () => {
    const mkdirSync = vi.fn();
    const writeFileSync = vi.fn();

    vi.doMock("node:fs", async (importOriginal) => {
      const actual = await importOriginal<typeof import("node:fs")>();

      return {
        ...actual,
        mkdirSync,
        writeFileSync,
      };
    });

    const { persistRealityGateReport } = await import(
      "../../../scripts/run-reality-gate.mjs"
    );

    persistRealityGateReport(
      {
        exitCode: 0,
        overallStatus: "success",
      },
      {},
    );

    expect(mkdirSync).toHaveBeenCalledWith(
      expect.stringContaining(".runtime-cache"),
      expect.objectContaining({ recursive: true }),
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("reality-gate.out"),
      expect.stringContaining('"overallStatus": "success"'),
      "utf8",
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("reality-gate.exit"),
      "0\n",
      "utf8",
    );
  });
});
