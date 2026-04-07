import { describe, expect, it, vi } from "vitest";

import {
  ByokProviderRegistry,
  invokeByokText,
  prepareByokTextInvocation,
  resolveByokTextDispatch,
} from "../../../packages/lanes/byok/src/index.js";

function createProvider(overrides: Record<string, unknown> = {}) {
  return {
    provider: "gemini",
    displayName: "Gemini",
    lane: "byok",
    implementation: "executable-baseline",
    credential: {
      mode: "api-key",
      envNames: ["GEMINI_API_KEY"],
      description: "Gemini key",
      presence: { kind: "any" },
    },
    capabilities: {
      textGeneration: true,
      streaming: true,
      toolCalling: false,
      imageInput: false,
      fileInput: false,
      webLogin: false,
      officialApi: true,
    },
    modelCatalog: {
      mode: "inline-default",
      defaultModel: "gemini-2.5-flash",
    },
    transport: {
      family: "gemini-generative-language",
      method: "POST",
      requestShape: "generate-content",
      path: "/models/{model}:generateContent",
      auth: {
        scheme: "query-api-key",
        envNames: ["GEMINI_API_KEY"],
      },
    },
    createModel(modelId: string) {
      return {
        provider: "gemini",
        model: modelId,
        id: `gemini/${modelId}`,
      };
    },
    prepareText: vi.fn(() => ({
      ok: true,
      prepared: {
        provider: "gemini",
        model: {
          provider: "gemini",
          model: "gemini-2.5-flash",
          id: "gemini/gemini-2.5-flash",
        },
        transport: {
          kind: "descriptor",
        },
        credential: {
          mode: "api-key",
          envNames: ["GEMINI_API_KEY"],
          description: "Gemini key",
          presence: { kind: "any" },
        },
        capabilities: {
          textGeneration: true,
          streaming: true,
          toolCalling: false,
          imageInput: false,
          fileInput: false,
          webLogin: false,
          officialApi: true,
        },
      },
      diagnostics: [],
    })),
    invokeText: vi.fn(async () => ({
      ok: true,
      text: "ok",
      prepared: {
        provider: "gemini",
      },
      diagnostics: [],
    })),
    ...overrides,
  };
}

const baseContext = {
  env: {},
  fetch: vi.fn() as unknown as typeof fetch,
};

describe("BYOK dispatch helpers", () => {
  it("returns model resolution diagnostics when the provider is unknown", () => {
    const registry = new ByokProviderRegistry([]);

    const result = resolveByokTextDispatch(registry, {
      model: "gemini/gemini-2.5-flash",
      input: {
        prompt: "hello",
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        diagnostics: [
          expect.objectContaining({
            code: "model-resolution-error",
          }),
        ],
      }),
    );
  });

  it("rejects providers that do not support text generation or streaming", () => {
    const noTextProvider = createProvider({
      capabilities: {
        textGeneration: false,
        streaming: true,
        toolCalling: false,
        imageInput: false,
        fileInput: false,
        webLogin: false,
        officialApi: true,
      },
    });
    const noStreamingProvider = createProvider({
      capabilities: {
        textGeneration: true,
        streaming: false,
        toolCalling: false,
        imageInput: false,
        fileInput: false,
        webLogin: false,
        officialApi: true,
      },
    });

    const noTextResult = resolveByokTextDispatch(
      new ByokProviderRegistry([noTextProvider as never]),
      {
        model: "gemini/gemini-2.5-flash",
        input: {
          prompt: "hello",
        },
      },
    );
    const noStreamingResult = resolveByokTextDispatch(
      new ByokProviderRegistry([noStreamingProvider as never]),
      {
        model: "gemini/gemini-2.5-flash",
        input: {
          prompt: "hello",
          stream: true,
        },
      },
    );

    expect(noTextResult).toEqual(
      expect.objectContaining({
        ok: false,
        diagnostics: [
          expect.objectContaining({
            code: "model-resolution-error",
            message: expect.stringContaining("does not support text generation"),
          }),
        ],
      }),
    );
    expect(noStreamingResult).toEqual(
      expect.objectContaining({
        ok: false,
        diagnostics: [
          expect.objectContaining({
            code: "model-resolution-error",
            message: expect.stringContaining("not currently wired for streaming"),
          }),
        ],
      }),
    );
  });

  it("returns provider preparation failures without attempting invocation", () => {
    const provider = createProvider({
      prepareText: vi.fn(() => ({
        ok: false,
        diagnostics: [
          {
            code: "missing-credential",
            message: "Missing key",
          },
        ],
      })),
    });
    const registry = new ByokProviderRegistry([provider as never]);

    const result = prepareByokTextInvocation(
      registry,
      {
        model: "gemini/gemini-2.5-flash",
        input: {
          prompt: "hello",
        },
      },
      baseContext,
    );

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        diagnostics: [
          expect.objectContaining({
            code: "missing-credential",
          }),
        ],
      }),
    );
    expect(provider.prepareText).toHaveBeenCalledTimes(1);
  });

  it("returns provider-not-implemented when invokeText is absent", async () => {
    const provider = createProvider();
    delete (provider as Record<string, unknown>).invokeText;
    const registry = new ByokProviderRegistry([provider as never]);

    const result = await invokeByokText(
      registry,
      {
        model: "gemini/gemini-2.5-flash",
        input: {
          prompt: "hello",
        },
      },
      baseContext,
    );

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        diagnostics: expect.arrayContaining([
          expect.objectContaining({
            code: "provider-not-implemented",
          }),
        ]),
      }),
    );
  });

  it("injects the prepared payload when invokeText fails without returning one", async () => {
    const prepared = {
      provider: "gemini",
      marker: "prepared-payload",
    };
    const provider = createProvider({
      prepareText: vi.fn(() => ({
        ok: true,
        prepared,
        diagnostics: [],
      })),
      invokeText: vi.fn(async () => ({
        ok: false,
        diagnostics: [
          {
            code: "provider-unavailable",
            message: "Transient outage",
          },
        ],
      })),
    });
    const registry = new ByokProviderRegistry([provider as never]);

    const result = await invokeByokText(
      registry,
      {
        model: "gemini/gemini-2.5-flash",
        input: {
          prompt: "hello",
        },
      },
      baseContext,
    );

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        prepared,
        diagnostics: [
          expect.objectContaining({
            code: "provider-unavailable",
          }),
        ],
      }),
    );
  });
});
