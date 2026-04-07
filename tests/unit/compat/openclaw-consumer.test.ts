import { describe, expect, it, vi } from "vitest";

import {
  OPENCLAW_THIN_COMPAT_MANIFEST,
  createOpenclawThinCompatAdapter,
} from "../../../packages/consumers/openclaw/src/index.ts";

describe("OpenClaw thin compat adapter", () => {
  it("exposes runtime delegation metadata without product-shell inheritance", () => {
    const adapter = createOpenclawThinCompatAdapter({
      baseUrl: "http://switchyard.test",
      fetch: vi.fn() as typeof fetch,
    });

    expect(adapter.manifest).toEqual(
      expect.objectContaining({
        target: "openclaw",
        transport: "delegated-runtime",
        failClosed: true,
      }),
    );
    expect(OPENCLAW_THIN_COMPAT_MANIFEST.notes).toContain(
      "provider/runtime delegation without product-shell inheritance",
    );
  });

  it("delegates invoke calls through the shared runtime and normalizes web responses", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(`${init?.body ?? "{}"}`);

      expect(body).toMatchObject({
        provider: "chatgpt",
        model: "chatgpt/gpt-4o",
        input: "hello from openclaw",
        lane: "web",
      });

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

    const adapter = createOpenclawThinCompatAdapter({
      baseUrl: "http://switchyard.test",
      fetch: fetchMock as typeof fetch,
    });
    const result = await adapter.delegateTurn({
      provider: "chatgpt",
      model: "chatgpt/gpt-4o",
      input: "hello from openclaw",
      lane: "web",
      mode: "copilot-brain",
    });

    expect(result).toEqual(
      expect.objectContaining({
        target: "openclaw",
        mode: "copilot-brain",
        ok: true,
        lane: "web",
        outputText: "openclaw-ok",
      }),
    );
  });
});
