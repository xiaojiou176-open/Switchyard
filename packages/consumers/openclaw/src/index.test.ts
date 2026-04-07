import { describe, expect, it, vi } from "vitest";

import {
  OPENCLAW_THIN_COMPAT_MANIFEST,
  OPENCLAW_UNSUPPORTED_FEATURES,
  createOpenClawCompatAdapter,
  createOpenclawThinCompatAdapter,
} from "./index.js";

describe("openclaw thin compat adapter", () => {
  it("keeps runtime delegation metadata bounded and exposes bootstrap passthrough", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.endsWith("/bootstrap")) {
        return new Response(
          JSON.stringify({
            bootstrap: {
              serviceName: "switchyard-service",
            },
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
            },
          },
        );
      }

      return new Response(
        JSON.stringify({
          provider: "chatgpt",
          model: "chatgpt/gpt-4o",
          lane: "web",
          outputText: "openclaw-ok",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    expect(OPENCLAW_THIN_COMPAT_MANIFEST).toEqual(
      expect.objectContaining({
        target: "openclaw",
        status: "partial",
        failClosed: true,
        transport: "delegated-runtime",
      }),
    );

    const adapter = createOpenClawCompatAdapter({
      baseUrl: "http://switchyard.test",
      fetch: fetchMock as unknown as typeof fetch,
    });

    expect(adapter.describeDelegation()).toEqual(
      expect.objectContaining({
        target: "openclaw",
        compat: "partial",
        delegatedTo: "service-runtime",
        unsupportedFeatures: OPENCLAW_UNSUPPORTED_FEATURES,
      }),
    );

    const bootstrap = await adapter.bootstrapDelegation();
    const thin = await createOpenclawThinCompatAdapter({
      baseUrl: "http://switchyard.test",
      fetch: fetchMock as unknown as typeof fetch,
    }).delegateTurn({
      provider: "chatgpt",
      model: "chatgpt/gpt-4o",
      input: "hello from openclaw",
      lane: "web",
    });
    const legacy = await adapter.invokeText({
      provider: "chatgpt",
      model: "chatgpt/gpt-4o",
      input: "hello from openclaw",
      lane: "web",
    });

    expect(bootstrap).toEqual(
      expect.objectContaining({
        bootstrap: expect.objectContaining({
          serviceName: "switchyard-service",
        }),
      }),
    );
    expect(thin).toEqual(
      expect.objectContaining({
        target: "openclaw",
        ok: true,
        outputText: "openclaw-ok",
      }),
    );
    expect(legacy).toEqual(
      expect.objectContaining({
        compat: "partial",
        delegatedTo: "service-runtime",
        ok: true,
        outputText: "openclaw-ok",
      }),
    );
  });
});
