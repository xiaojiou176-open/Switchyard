import { describe, expect, it } from "vitest";

import { extractGrokTransportText } from "../../../packages/providers/web/grok/src/transport.js";

describe("Provider transport extraction", () => {
  it("prefers Grok NDJSON delta fields over suggestion text", () => {
    const raw = [
      '{"contentDelta":"GROK_"}',
      '{"promptSuggestions":["Explore Grok\'s capabilities further","Discuss xAI\'s latest projects"]}',
      '{"textDelta":"OK"}',
    ].join("\n");

    expect(extractGrokTransportText(raw)).toBe("GROK_OK");
  });
});
