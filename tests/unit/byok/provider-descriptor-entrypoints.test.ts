import { describe, expect, test } from "vitest";

import anthropicByokProvider from "../../../packages/providers/byok/anthropic/src/index.js";
import bedrockByokProvider from "../../../packages/providers/byok/bedrock/src/index.js";
import groqByokProvider from "../../../packages/providers/byok/groq/src/index.js";
import openaiByokProvider from "../../../packages/providers/byok/openai/src/index.js";
import openrouterByokProvider from "../../../packages/providers/byok/openrouter/src/index.js";
import qwenByokProvider from "../../../packages/providers/byok/qwen/src/index.js";
import vertexByokProvider from "../../../packages/providers/byok/vertex/src/index.js";
import xaiByokProvider from "../../../packages/providers/byok/xai/src/index.js";

describe("BYOK provider descriptor entrypoints", () => {
  test("load the thin provider entry modules with stable metadata", () => {
    const providers = [
      openaiByokProvider,
      anthropicByokProvider,
      groqByokProvider,
      openrouterByokProvider,
      qwenByokProvider,
      vertexByokProvider,
      xaiByokProvider,
      bedrockByokProvider,
    ];

    expect(providers.map((provider) => provider.provider)).toEqual([
      "openai",
      "anthropic",
      "groq",
      "openrouter",
      "qwen",
      "vertex",
      "xai",
      "bedrock",
    ]);
    expect(providers.every((provider) => provider.lane === "byok")).toBe(true);
    expect(
      providers.every((provider) => provider.credential.envNames.length > 0),
    ).toBe(true);
    expect(openaiByokProvider.transport.family).toBe("openai-responses");
    expect(anthropicByokProvider.transport.requestShape).toBe("messages");
    expect(groqByokProvider.transport.family).toBe("openai-compatible");
    expect(openrouterByokProvider.transport.baseUrl).toContain("openrouter.ai");
    expect(qwenByokProvider.transport.baseUrl).toContain("dashscope.aliyuncs.com");
    expect(vertexByokProvider.transport.family).toBe("google-vertex");
    expect(xaiByokProvider.transport.baseUrl).toContain("api.x.ai");
    expect(bedrockByokProvider.transport.family).toBe("aws-bedrock");
  });
});
