import { describe, expect, it } from "vitest";

import { createWebProviderRuntime } from "../src/provider-runtime.js";
import type { WebProviderRuntimeConfig } from "../src/provider-runtime.js";

const TEST_DESCRIPTOR: WebProviderRuntimeConfig["descriptor"] = {
  provider: "chatgpt",
  displayName: "ChatGPT",
  stabilityTarget: "high",
  degradedInvocationPolicy: "allow-with-warning",
  authProfile: {
    mode: "browser-session",
    loginUrl: "https://chatgpt.com/auth/login",
    accountLabel: "chatgpt-local-slot",
    sessionSource: "chatgpt-browser-profile",
  },
  models: [
    {
      id: "gpt-4o",
      displayName: "GPT-4o",
      contextWindow: 128000,
      maxOutputTokens: 16384,
      capabilities: {
        textGeneration: true,
        streaming: true,
        toolCalling: true,
        imageInput: true,
        webLogin: true,
        officialApi: false,
      },
    },
  ],
  capabilities: {
    textGeneration: true,
    streaming: true,
    toolCalling: true,
    imageInput: true,
    webLogin: true,
    officialApi: false,
  },
  notes: [],
};

function createRuntime(overrides: Partial<WebProviderRuntimeConfig> = {}) {
  return createWebProviderRuntime({
    descriptor: TEST_DESCRIPTOR,
    defaults: {
      state: "ready",
      accountLabel: "chatgpt:test",
      lastValidatedAt: "2026-03-29T20:00:00.000Z",
    },
    ...overrides,
  });
}

describe("Web/Login invoke transport contract", () => {
  it("blocks ready sessions when no real invoke transport is configured", async () => {
    const runtime = createRuntime();
    const status = await runtime.getStatus();

    expect(status.runtimeReadiness).toBe("ready");
    expect(status.available).toBe(false);
    expect(status.invoke).toEqual(
      expect.objectContaining({
        kind: "missing",
        readiness: "blocked",
        mode: "chatgpt-invoke-transport-missing",
      }),
    );
    expect(status.session.invoke).toEqual(status.invoke);
    expect(status.diagnostics[0]).toEqual(
      expect.objectContaining({
        category: "routing-error",
        recoveryHint: expect.stringContaining("Bind a provider-owned Web/Login invoke transport"),
      }),
    );

    const result = await runtime.invoke({
      provider: "chatgpt",
      model: "gpt-4o",
      input: "hello from ready session",
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        errorCategory: "routing-error",
        failureStage: "invoke",
        suggestedAction: expect.stringContaining(
          "Bind a provider-owned Web/Login invoke transport",
        ),
        invoke: expect.objectContaining({
          kind: "missing",
          readiness: "blocked",
        }),
      }),
    );

    if (result.ok) {
      throw new Error("Expected invoke failure for missing transport.");
    }

    expect(result.message).toContain("no real Web/Login invoke transport configured yet");
  });

  it("allows degraded-but-allowed traffic only when a real transport is explicitly bound", async () => {
    const runtime = createRuntime({
      defaults: {
        state: "refreshable-but-degraded",
        accountLabel: "chatgpt:degraded",
        lastValidatedAt: "2026-03-29T20:05:00.000Z",
        refreshEligible: true,
      },
      invokeTransport: async ({ request }) => ({
        outputText: `real transport accepted ${request.input}`,
        providerMessageId: "chatgpt-msg-1",
      }),
    });
    const status = await runtime.getStatus();

    expect(status.runtimeReadiness).toBe("degraded");
    expect(status.available).toBe(true);
    expect(status.invoke).toEqual(
      expect.objectContaining({
        kind: "real-transport",
        readiness: "degraded-allowed",
      }),
    );

    const result = await runtime.invoke({
      provider: "chatgpt",
      model: "gpt-4o",
      input: "recover the local session",
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        outputText: "real transport accepted recover the local session",
        providerMessageId: "chatgpt-msg-1",
        runtimeReadiness: "degraded",
        invoke: expect.objectContaining({
          kind: "real-transport",
          readiness: "degraded-allowed",
        }),
      }),
    );
  });

  it("keeps explicit synthetic demo contracts blocked instead of treating them as success", async () => {
    const runtime = createRuntime({
      invokeContract: {
        kind: "synthetic-demo",
        mode: "chatgpt-demo-only",
        handoff:
          "Replace the ChatGPT synthetic demo path with a provider-owned Web/Login invoke transport before routing live traffic.",
      },
    });
    const status = await runtime.getStatus();

    expect(status.available).toBe(false);
    expect(status.invoke).toEqual(
      expect.objectContaining({
        kind: "synthetic-demo",
        readiness: "blocked",
        mode: "chatgpt-demo-only",
      }),
    );

    const result = await runtime.invoke({
      provider: "chatgpt",
      model: "gpt-4o",
      input: "demo should not run",
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        errorCategory: "routing-error",
        failureStage: "invoke",
        suggestedAction: expect.stringContaining(
          "Replace the ChatGPT synthetic demo path",
        ),
        invoke: expect.objectContaining({
          kind: "synthetic-demo",
          readiness: "blocked",
        }),
      }),
    );

    if (result.ok) {
      throw new Error("Expected synthetic demo path to stay blocked.");
    }

    expect(result.message).toContain("synthetic demo invoke path");
  });
});
