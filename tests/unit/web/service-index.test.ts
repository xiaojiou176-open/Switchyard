import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
  vi.unstubAllGlobals();
});

describe("service index wiring", () => {
  it("merges stored, env, and option state into the service shell", async () => {
    const buildStoredWebProviderSessions = vi.fn(() => ({
      chatgpt: {
        state: "ready",
        accountLabel: "stored-account",
      },
    }));
    const buildStoredWebRuntimeEnv = vi.fn(() => ({
      STORED_ENV: "1",
    }));
    const createSwitchyardSdkClient = vi.fn(() => ({
      kind: "sdk-client",
    }));
    const createDefaultWebLane = vi.fn(({ providerSessions, runtimeEnv }) => ({
      lane: { id: "lane" },
      context: {
        providerSessions,
        runtimeEnv,
      },
    }));
    const createDefaultWebAcquisitionRunners = vi.fn(() => ({
      chatgpt: "acquisition-runner",
    }));
    const createDefaultWebDebugSupportRunners = vi.fn(() => ({
      chatgpt: "debug-support-runner",
    }));
    const createDefaultWebLiveProofRunners = vi.fn(() => ({
      chatgpt: "live-proof-runner",
    }));
    const createNodeHttpHandler = vi.fn(() => "handler");
    const buildServiceRouteCatalog = vi.fn((baseUrl?: string) => ({
      bootstrap: baseUrl
        ? `${baseUrl}/v1/runtime/bootstrap`
        : "/v1/runtime/bootstrap",
    }));
    const loadLocalEnvFiles = vi.fn();
    const loadProviderSessionsFromEnv = vi.fn(() => ({
      chatgpt: {
        sessionSource: "env-session",
      },
    }));
    const loadServicePort = vi.fn(() => 4242);

    vi.doMock("../../../packages/credentials/src/index.js", () => ({
      buildStoredWebProviderSessions,
      buildStoredWebRuntimeEnv,
    }));
    vi.doMock("../../../packages/surfaces/sdk-client/src/index.js", () => ({
      createSwitchyardSdkClient,
    }));
    vi.doMock("../../../packages/surfaces/http/src/index.js", () => ({
      SwitchyardHttpSurface: vi.fn(function SwitchyardHttpSurface(this: { options?: unknown }, options: unknown) {
        this.options = options;
      }),
      createNodeHttpHandler,
      buildServiceRouteCatalog,
    }));
    vi.doMock("../../../apps/service/src/default-web-lane.js", () => ({
      createDefaultWebLane,
    }));
    vi.doMock("../../../apps/service/src/web-auth-acquisition.js", () => ({
      createDefaultWebAcquisitionRunners,
    }));
    vi.doMock("../../../apps/service/src/browser-debug-support.js", () => ({
      createDefaultWebDebugSupportRunners,
    }));
    vi.doMock("../../../apps/service/src/default-web-live-proofs.js", () => ({
      createDefaultWebLiveProofRunners,
    }));
    vi.doMock("../../../apps/service/src/env.js", () => ({
      loadLocalEnvFiles,
      loadProviderSessionsFromEnv,
      loadServicePort,
    }));

    const { createSwitchyardService } = await import(
      "../../../apps/service/src/index.js"
    );

    const service = createSwitchyardService({
      providerSessions: {
        chatgpt: {
          note: "option-session",
        },
      },
      runtimeEnv: {
        OPTION_ENV: "2",
      },
      liveProofEnv: {
        LIVE_PROOF_ENV: "3",
      },
      serviceName: "switchyard-test-service",
      ownerUserId: "local-user",
    });

    expect(loadLocalEnvFiles).toHaveBeenCalledTimes(1);
    expect(buildStoredWebProviderSessions).toHaveBeenCalledWith(process.env);
    expect(loadProviderSessionsFromEnv).toHaveBeenCalledWith(process.env);
    expect(createDefaultWebLane).toHaveBeenCalledWith(
      expect.objectContaining({
        providerSessions: expect.objectContaining({
          chatgpt: expect.objectContaining({
            state: "ready",
            accountLabel: "stored-account",
            sessionSource: "env-session",
            note: "option-session",
          }),
        }),
        runtimeEnv: expect.objectContaining({
          STORED_ENV: "1",
          OPTION_ENV: "2",
          LIVE_PROOF_ENV: "3",
        }),
      }),
    );
    expect(createSwitchyardSdkClient).toHaveBeenCalledWith(
      expect.objectContaining({
        env: expect.objectContaining({
          STORED_ENV: "1",
          OPTION_ENV: "2",
          LIVE_PROOF_ENV: "3",
        }),
      }),
    );
    expect(createDefaultWebLiveProofRunners).toHaveBeenCalledWith(
      expect.objectContaining({
        env: expect.objectContaining({
          STORED_ENV: "1",
          OPTION_ENV: "2",
          LIVE_PROOF_ENV: "3",
        }),
      }),
    );
    expect(createDefaultWebAcquisitionRunners).toHaveBeenCalledWith(
      expect.objectContaining({
        STORED_ENV: "1",
        OPTION_ENV: "2",
        LIVE_PROOF_ENV: "3",
      }),
    );
    expect(createDefaultWebDebugSupportRunners).toHaveBeenCalledWith(
      expect.objectContaining({
        STORED_ENV: "1",
        OPTION_ENV: "2",
        LIVE_PROOF_ENV: "3",
      }),
    );
    expect(createNodeHttpHandler).toHaveBeenCalled();
    expect(service.bootstrapPath).toBe("/v1/runtime/bootstrap");
    expect(service.routes).toEqual({
      bootstrap: "/v1/runtime/bootstrap",
    });
  });

  it("starts and closes the service using the requested port and route catalog", async () => {
    vi.doMock("../../../packages/credentials/src/index.js", () => ({
      buildStoredWebProviderSessions: () => ({}),
      buildStoredWebRuntimeEnv: () => ({}),
    }));
    vi.doMock("../../../packages/surfaces/sdk-client/src/index.js", () => ({
      createSwitchyardSdkClient: () => ({ kind: "sdk-client" }),
    }));
    vi.doMock("../../../packages/surfaces/http/src/index.js", () => ({
      SwitchyardHttpSurface: class SwitchyardHttpSurface {},
      createNodeHttpHandler: () => (_req: unknown, res: { statusCode: number; end(body: string): void }) => {
        res.statusCode = 200;
        res.end("ok");
      },
      buildServiceRouteCatalog: (baseUrl?: string) => ({
        bootstrap: baseUrl
          ? `${baseUrl}/v1/runtime/bootstrap`
          : "/v1/runtime/bootstrap",
      }),
    }));
    vi.doMock("../../../apps/service/src/default-web-lane.js", () => ({
      createDefaultWebLane: () => ({
        lane: { id: "lane" },
        context: { source: "mocked" },
      }),
    }));
    vi.doMock("../../../apps/service/src/web-auth-acquisition.js", () => ({
      createDefaultWebAcquisitionRunners: () => ({}),
    }));
    vi.doMock("../../../apps/service/src/browser-debug-support.js", () => ({
      createDefaultWebDebugSupportRunners: () => ({}),
    }));
    vi.doMock("../../../apps/service/src/default-web-live-proofs.js", () => ({
      createDefaultWebLiveProofRunners: () => ({}),
    }));
    vi.doMock("../../../apps/service/src/env.js", () => ({
      loadLocalEnvFiles: vi.fn(),
      loadProviderSessionsFromEnv: () => ({}),
      loadServicePort: () => 0,
    }));

    const { startSwitchyardService, startFromProcessEnv } = await import(
      "../../../apps/service/src/index.js"
    );

    const started = await startSwitchyardService({
      port: 0,
      serviceName: "switchyard-start-test",
    });

    expect(started.baseUrl).toMatch(/^http:\/\/127\.0\.0\.1:\d+$/);
    expect(started.bootstrapUrl).toBe(
      `${started.baseUrl}/v1/runtime/bootstrap`,
    );

    await started.close();

    const startedFromEnv = await startFromProcessEnv();
    expect(startedFromEnv.baseUrl).toMatch(/^http:\/\/127\.0\.0\.1:\d+$/);
    await startedFromEnv.close();
  });

  it("keeps explicit existing-browser-session bindings even when the runtime default is isolated chrome root", async () => {
    const buildStoredWebProviderSessions = vi.fn(() => ({
      chatgpt: {
        state: "ready",
        acquisitionMode: "existing-browser-session",
      },
      gemini: {
        state: "ready",
        acquisitionMode: "managed-browser",
      },
    }));
    const buildStoredWebRuntimeEnv = vi.fn(() => ({
      SWITCHYARD_WEB_AUTH_EXISTING_BROWSER_SESSION_URL: "http://127.0.0.1:9555",
    }));
    const createDefaultWebLane = vi.fn(({ providerSessions, runtimeEnv }) => ({
      lane: { id: "lane" },
      context: {
        providerSessions,
        runtimeEnv,
      },
    }));

    vi.doMock("../../../packages/credentials/src/index.js", () => ({
      buildStoredWebProviderSessions,
      buildStoredWebRuntimeEnv,
    }));
    vi.doMock("../../../packages/surfaces/sdk-client/src/index.js", () => ({
      createSwitchyardSdkClient: () => ({ kind: "sdk-client" }),
    }));
    vi.doMock("../../../packages/surfaces/http/src/index.js", () => ({
      SwitchyardHttpSurface: vi.fn(function SwitchyardHttpSurface(this: { options?: unknown }, options: unknown) {
        this.options = options;
      }),
      createNodeHttpHandler: vi.fn(() => "handler"),
      buildServiceRouteCatalog: vi.fn(() => ({
        bootstrap: "/v1/runtime/bootstrap",
      })),
    }));
    vi.doMock("../../../apps/service/src/default-web-lane.js", () => ({
      createDefaultWebLane,
    }));
    vi.doMock("../../../apps/service/src/web-auth-acquisition.js", () => ({
      createDefaultWebAcquisitionRunners: () => ({}),
    }));
    vi.doMock("../../../apps/service/src/browser-debug-support.js", () => ({
      createDefaultWebDebugSupportRunners: () => ({}),
    }));
    vi.doMock("../../../apps/service/src/default-web-live-proofs.js", () => ({
      createDefaultWebLiveProofRunners: () => ({}),
    }));
    vi.doMock("../../../apps/service/src/env.js", () => ({
      loadLocalEnvFiles: vi.fn(),
      loadProviderSessionsFromEnv: () => ({}),
      loadServicePort: () => 4242,
    }));

    const { createSwitchyardService } = await import(
      "../../../apps/service/src/index.js"
    );

    createSwitchyardService({
      runtimeEnv: {
        SWITCHYARD_BROWSER_MODE: "isolated-chrome-root",
      },
    });

    expect(createDefaultWebLane).toHaveBeenCalledWith(
      expect.objectContaining({
        providerSessions: expect.objectContaining({
          chatgpt: expect.objectContaining({
            acquisitionMode: "existing-browser-session",
          }),
          gemini: expect.objectContaining({
            acquisitionMode: "isolated-chrome-root",
          }),
        }),
      }),
    );
  });

  it("derives isolated-root routing env from stored capture provenance when store routing env is intentionally filtered", async () => {
    const buildStoredWebProviderSessions = vi.fn(() => ({
      chatgpt: {
        state: "ready",
        acquisitionMode: "isolated-chrome-root",
        captureProvenance: {
          browserMode: "isolated-chrome-root",
          userDataDir: "/tmp/switchyard-browser",
          profileName: "switchyard",
          cdpUrl: "http://127.0.0.1:9338",
        },
      },
    }));
    const buildStoredWebRuntimeEnv = vi.fn(() => ({}));
    const createDefaultWebLane = vi.fn(({ runtimeEnv }) => ({
      lane: { id: "lane" },
      context: { runtimeEnv },
    }));
    const createDefaultWebLiveProofRunners = vi.fn(() => ({}));
    const createDefaultWebDebugSupportRunners = vi.fn(() => ({}));
    const createDefaultWebAcquisitionRunners = vi.fn(() => ({}));

    vi.doMock("../../../packages/credentials/src/index.js", () => ({
      buildStoredWebProviderSessions,
      buildStoredWebRuntimeEnv,
    }));
    vi.doMock("../../../packages/surfaces/sdk-client/src/index.js", () => ({
      createSwitchyardSdkClient: () => ({ kind: "sdk-client" }),
    }));
    vi.doMock("../../../packages/surfaces/http/src/index.js", () => ({
      SwitchyardHttpSurface: vi.fn(function SwitchyardHttpSurface(this: { options?: unknown }, options: unknown) {
        this.options = options;
      }),
      createNodeHttpHandler: vi.fn(() => "handler"),
      buildServiceRouteCatalog: vi.fn(() => ({
        bootstrap: "/v1/runtime/bootstrap",
      })),
    }));
    vi.doMock("../../../apps/service/src/default-web-lane.js", () => ({
      createDefaultWebLane,
    }));
    vi.doMock("../../../apps/service/src/default-web-live-proofs.js", () => ({
      createDefaultWebLiveProofRunners,
    }));
    vi.doMock("../../../apps/service/src/browser-debug-support.js", () => ({
      createDefaultWebDebugSupportRunners,
    }));
    vi.doMock("../../../apps/service/src/web-auth-acquisition.js", () => ({
      createDefaultWebAcquisitionRunners,
    }));
    vi.doMock("../../../apps/service/src/env.js", () => ({
      loadLocalEnvFiles: vi.fn(),
      loadProviderSessionsFromEnv: () => ({}),
      loadServicePort: () => 4242,
    }));

    const { createSwitchyardService } = await import(
      "../../../apps/service/src/index.js"
    );

    createSwitchyardService();

    expect(createDefaultWebLane).toHaveBeenCalledWith(
      expect.objectContaining({
        runtimeEnv: expect.objectContaining({
          SWITCHYARD_BROWSER_MODE: "isolated-chrome-root",
          SWITCHYARD_WEB_AUTH_ACTIVE_MODE: "isolated-chrome-root",
          SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL: "http://127.0.0.1:9338",
          SWITCHYARD_WEB_AUTH_CDP_URL: "http://127.0.0.1:9338",
          SWITCHYARD_WEB_GEMINI_CDP_URL: "http://127.0.0.1:9338",
          SWITCHYARD_CHROME_USER_DATA_DIR: "/tmp/switchyard-browser",
          SWITCHYARD_CHROME_PROFILE_NAME: "switchyard",
        }),
      }),
    );
    expect(createDefaultWebLiveProofRunners).toHaveBeenCalledWith(
      expect.objectContaining({
        env: expect.objectContaining({
          SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL: "http://127.0.0.1:9338",
          SWITCHYARD_WEB_AUTH_CDP_URL: "http://127.0.0.1:9338",
        }),
      }),
    );
    expect(createDefaultWebDebugSupportRunners).toHaveBeenCalledWith(
      expect.objectContaining({
        SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL: "http://127.0.0.1:9338",
      }),
    );
    expect(createDefaultWebAcquisitionRunners).toHaveBeenCalledWith(
      expect.objectContaining({
        SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL: "http://127.0.0.1:9338",
      }),
    );
  });
});
