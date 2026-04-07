import { afterEach, describe, expect, it, vi } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function extractExpectedToken(requestInit: RequestInit | undefined) {
  const rawBody = `${requestInit?.body ?? ""}`;
  const parsed = JSON.parse(rawBody);
  const match = /Reply with exactly ([A-Z0-9_]+) and nothing else\./.exec(
    parsed.input,
  );

  if (!match) {
    throw new Error(`Could not extract expected token from request body: ${rawBody}`);
  }

  return match[1];
}

function createCompiledServiceModule(outDir: string) {
  const serviceDir = join(outDir, "apps/service/src");
  mkdirSync(serviceDir, {
    recursive: true,
  });
  writeFileSync(
    join(serviceDir, "index.js"),
    `export async function startSwitchyardService() {
      return {
        baseUrl: "http://switchyard.test",
        async close() {}
      };
    }`,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
  vi.unstubAllGlobals();
});

describe("verify-service-live script", () => {
  it("returns success when the compiled service echoes every expected token", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (
        command === "pnpm" &&
        args.includes("apps/service/tsconfig.json")
      ) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => []);
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const expectedToken = extractExpectedToken(init);

      return new Response(
        JSON.stringify({
          outputText: expectedToken,
          providerMessageId: `msg-${expectedToken.toLowerCase()}`,
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.doMock("../../../scripts/browser-debug-support.mjs", () => ({
      captureBrowserDebugContext: vi.fn(async () => ({
        attachStatus: "attached",
        currentPage: {
          url: "https://chatgpt.com/",
          title: "ChatGPT",
        },
        currentConsole: [],
        currentNetwork: [],
        supportBundle: {
          command:
            "pnpm exec node scripts/capture-web-debug-bundle.mjs --provider chatgpt",
        },
      })),
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "success",
          baseUrl: "http://switchyard.test",
          providers: expect.arrayContaining([
            expect.objectContaining({ provider: "chatgpt" }),
            expect.objectContaining({ provider: "gemini" }),
            expect.objectContaining({ provider: "claude" }),
          ]),
        }),
      );
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(runWebLoginLiveVerification).not.toHaveBeenCalled();
      expect(
        spawnSync.mock.calls.filter(
          ([command, args]) =>
            command === "pnpm" &&
            Array.isArray(args) &&
            args.includes("apps/service/tsconfig.json"),
        ),
      ).toHaveLength(1);
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });

  it("reuses provider-scoped external blockers when the service preflight only sees a generic fetch failure", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (
        command === "pnpm" &&
        args.includes("apps/service/tsconfig.json")
      ) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => [
      {
        status: "external-blocker",
        provider: "chatgpt",
        blocker: "chatgpt-browser-session-incomplete",
        classification: "session-incomplete",
        rerunCommand:
          "pnpm run bootstrap:web-login-browser -- --provider chatgpt && pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt",
        diagnostic:
          "ChatGPT attached browser is still showing the logged-out landing page or login/signup controls, so the browser workspace is not ready for live invocation.",
        summary:
          "ChatGPT cookie material is present, but the attached browser is still on the logged-out landing page instead of an authenticated workspace. Reopen ChatGPT in the managed browser, complete sign-in there, then rerun the ChatGPT-only live gate.",
      },
    ]);
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          error: {
            message: "fetch failed",
          },
        }),
        {
          status: 503,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.doMock("../../../scripts/browser-debug-support.mjs", () => ({
      captureBrowserDebugContext: vi.fn(async () => ({
        attachStatus: "attached",
        currentPage: {
          url: "https://chatgpt.com/",
          title: "ChatGPT",
        },
        currentConsole: [],
        currentNetwork: [],
        supportBundle: {
          command:
            "pnpm exec node scripts/capture-web-debug-bundle.mjs --provider chatgpt",
        },
      })),
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "external-blocker",
          provider: "chatgpt",
          blocker: "chatgpt-browser-session-incomplete",
          classification: "session-incomplete",
          debug: expect.objectContaining({
            supportBundle: expect.objectContaining({
              command:
                "pnpm exec node scripts/capture-web-debug-bundle.mjs --provider chatgpt",
            }),
          }),
          liveVerification: expect.objectContaining({
            provider: "chatgpt",
            blocker: "chatgpt-browser-session-incomplete",
          }),
        }),
      );
      expect(runWebLoginLiveVerification).toHaveBeenCalledWith({
        env: process.env,
        providers: ["chatgpt"],
      });
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });

  it("maps chatgpt CDP attach failures into transport-instability external blockers", async () => {
    const { mapServiceInvokeFailure } = await import(
      "../../../scripts/verify-service-live.mjs"
    );

    const mapped = mapServiceInvokeFailure(
      {
        provider: "chatgpt",
        requiresManagedBrowser: true,
      },
      {
        baseUrl: "http://127.0.0.1:55907",
      },
      {
        status: 503,
      },
      {
        error: {
          message: "connectOverCDP ECONNREFUSED 127.0.0.1:39222",
        },
      },
    );

    expect(mapped).toEqual(
      expect.objectContaining({
        status: "external-blocker",
        provider: "chatgpt",
        blocker: "chatgpt-cdp-unavailable",
        classification: "transport-instability",
        responseStatus: 503,
      }),
    );
  });

  it("attaches browser debug context to direct service-side external blockers", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (command === "pnpm" && args.includes("apps/service/tsconfig.json")) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      if (command === process.execPath && args.includes("bootstrap-web-auth-browser.mjs")) {
        return {
          status: 0,
          stdout: JSON.stringify({ ok: true }),
        };
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => []);
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "ChatGPT attached browser is still showing the logged-out landing page or login/signup controls, so the browser workspace is not ready for live invocation.",
          },
        }),
        {
          status: 503,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.doMock("../../../scripts/browser-debug-support.mjs", () => ({
      captureBrowserDebugContext: vi.fn(async () => ({
        attachStatus: "attached",
        currentPage: {
          url: "https://chatgpt.com/",
          title: "ChatGPT",
        },
        currentConsole: [{ type: "warning", text: "logged out" }],
        currentNetwork: [],
        supportBundle: {
          command:
            "pnpm exec node scripts/capture-web-debug-bundle.mjs --provider chatgpt",
        },
        diagnoseLadder: ["step 1", "step 2"],
      })),
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "external-blocker",
          provider: "chatgpt",
          blocker: "chatgpt-browser-session-incomplete",
          debug: expect.objectContaining({
            attachStatus: "attached",
            currentPage: expect.objectContaining({
              url: "https://chatgpt.com/",
            }),
          }),
        }),
      );
      expect(runWebLoginLiveVerification).not.toHaveBeenCalled();
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });

  it("returns a service-token-mismatch failure when the service responds with the wrong token", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (
        command === "pnpm" &&
        args.includes("apps/service/tsconfig.json")
      ) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => []);
    const fetchMock = vi.fn(async (_url: string) => {
      return new Response(
        JSON.stringify({
          outputText: "WRONG_TOKEN",
          providerMessageId: "msg-wrong-token",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "failure",
          provider: "chatgpt",
          reason: "service-token-mismatch",
        }),
      );
      expect(runWebLoginLiveVerification).not.toHaveBeenCalled();
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });

  it("returns a fetch failure when the local service cannot be reached", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (
        command === "pnpm" &&
        args.includes("apps/service/tsconfig.json")
      ) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => []);
    const fetchMock = vi.fn(async () => {
      throw new Error("socket hang up");
    });

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "failure",
          provider: "chatgpt",
          reason: "service-invoke-fetch-failed",
          diagnostic: "socket hang up",
        }),
      );
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });

  it("times out stalled service invokes and reuses provider-scoped external blockers", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (
        command === "pnpm" &&
        args.includes("apps/service/tsconfig.json")
      ) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => [
      {
        status: "external-blocker",
        provider: "chatgpt",
        blocker: "chatgpt-browser-session-incomplete",
        classification: "session-incomplete",
        rerunCommand:
          "pnpm run bootstrap:web-login-browser -- --provider chatgpt && pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt",
        diagnostic:
          "ChatGPT attached browser is still showing the logged-out landing page or login/signup controls, so the browser workspace is not ready for live invocation.",
        summary:
          "ChatGPT cookie material is present, but the attached browser is still on the logged-out landing page instead of an authenticated workspace. Reopen ChatGPT in the managed browser, complete sign-in there, then rerun the ChatGPT-only live gate.",
      },
    ]);
    const fetchMock = vi.fn(
      async (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal as AbortSignal | undefined;

          signal?.addEventListener(
            "abort",
            () => {
              const abortError = new Error("aborted");
              abortError.name = "AbortError";
              reject(abortError);
            },
            { once: true },
          );
        }),
    );

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
        serviceInvokeTimeoutMs: 25,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "external-blocker",
          provider: "chatgpt",
          blocker: "chatgpt-browser-session-incomplete",
          classification: "session-incomplete",
          liveVerification: expect.objectContaining({
            provider: "chatgpt",
            blocker: "chatgpt-browser-session-incomplete",
          }),
        }),
      );
      expect(runWebLoginLiveVerification).toHaveBeenCalledWith({
        env: process.env,
        providers: ["chatgpt"],
      });
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });

  it("retries with a managed-browser bootstrap when the first service invoke reports a CDP attach failure", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "switchyard-service-live-"));
    const spawnSync = vi.fn((command: string, args: string[]) => {
      if (
        command === "pnpm" &&
        args.includes("apps/service/tsconfig.json")
      ) {
        const outDirIndex = args.indexOf("--outDir");
        createCompiledServiceModule(args[outDirIndex + 1]);
      }

      if (
        command === process.execPath &&
        args.includes("bootstrap-web-auth-browser.mjs")
      ) {
        return {
          status: 0,
          stdout: JSON.stringify({ ok: true }),
        };
      }

      return {
        status: 0,
      };
    });
    const runWebLoginLiveVerification = vi.fn(async () => []);
    let invocation = 0;
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      invocation += 1;

      if (invocation === 1) {
        return new Response(
          JSON.stringify({
            error: {
              message: "connectOverCDP ECONNREFUSED 127.0.0.1:39222",
            },
          }),
          {
            status: 503,
            headers: {
              "content-type": "application/json",
            },
          },
        );
      }

      return new Response(
        JSON.stringify({
          outputText: extractExpectedToken(init),
          providerMessageId: "msg-after-retry",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    vi.doMock("node:child_process", () => ({ spawnSync }));
    vi.doMock("../../../scripts/verify-web-login-live.mjs", () => ({
      runWebLoginLiveVerification,
    }));
    vi.stubGlobal("fetch", fetchMock);

    try {
      const { runServiceLiveVerification } = await import(
        "../../../scripts/verify-service-live.mjs"
      );
      const result = await runServiceLiveVerification({
        outDir,
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: "success",
        }),
      );
      expect(fetchMock).toHaveBeenCalledTimes(4);
      expect(
        spawnSync.mock.calls.filter(
          ([command, args]) =>
            command === process.execPath &&
            Array.isArray(args) &&
            args.some((arg) =>
              typeof arg === "string" && arg.includes("bootstrap-web-auth-browser.mjs"),
            ),
        ).length,
      ).toBeGreaterThan(0);
      expect(runWebLoginLiveVerification).not.toHaveBeenCalled();
    } finally {
      rmSync(outDir, {
        recursive: true,
        force: true,
      });
    }
  });
});
