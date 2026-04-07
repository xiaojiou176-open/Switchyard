import type {
  WebProviderId,
  WebSessionSnapshot,
  WebLaneContext,
} from "../../../packages/lanes/web/src/index.js";
import {
  WebLoginLane,
  WebProviderRegistry,
  WEB_PROVIDER_IDS,
} from "../../../packages/lanes/web/src/index.js";
import { createChatgptWebRuntime } from "../../../packages/providers/web/chatgpt/src/index.js";
import { createGeminiWebRuntime } from "../../../packages/providers/web/gemini/src/index.js";
import { createClaudeWebRuntime } from "../../../packages/providers/web/claude/src/index.js";
import { createGrokWebRuntime } from "../../../packages/providers/web/grok/src/index.js";
import { createQwenWebRuntime } from "../../../packages/providers/web/qwen/src/index.js";

export interface DefaultWebLaneOptions {
  providerSessions?: Partial<Record<WebProviderId, Partial<WebSessionSnapshot>>>;
  runtimeEnv?: Record<string, string | undefined>;
}

function normalizeProviderSessions(
  providerSessions: DefaultWebLaneOptions["providerSessions"] = {},
): WebLaneContext["sessions"] {
  const normalized: WebLaneContext["sessions"] = {};

  for (const provider of WEB_PROVIDER_IDS) {
    const session = providerSessions[provider];

    if (!session) {
      continue;
    }

    normalized[provider] = {
      state: "missing",
      ...session,
    };
  }

  return normalized;
}

export function createDefaultWebLane(options: DefaultWebLaneOptions = {}) {
  const registry = new WebProviderRegistry([
    createChatgptWebRuntime(),
    createGeminiWebRuntime(),
    createClaudeWebRuntime(),
    createGrokWebRuntime(),
    createQwenWebRuntime(),
  ]);

  return {
    lane: new WebLoginLane(registry),
    context: {
      env: options.runtimeEnv,
      sessions: normalizeProviderSessions(options.providerSessions),
    } satisfies WebLaneContext,
  };
}
