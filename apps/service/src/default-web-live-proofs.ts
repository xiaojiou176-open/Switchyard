import type { WebLiveProofResult, WebProviderId } from "../../../packages/lanes/web/src/index.js";
import { runChatgptWebLiveProof } from "../../../packages/providers/web/chatgpt/src/index.js";
import { runGeminiWebLiveProof } from "../../../packages/providers/web/gemini/src/index.js";
import { runClaudeWebLiveProof } from "../../../packages/providers/web/claude/src/index.js";
import { runGrokWebLiveProof } from "../../../packages/providers/web/grok/src/index.js";
import { runQwenWebLiveProof } from "../../../packages/providers/web/qwen/src/index.js";

export type WebLiveProofRunner = () => Promise<WebLiveProofResult>;

export interface DefaultWebLiveProofOptions {
  env?: Record<string, string | undefined>;
  fetchFn?: typeof fetch;
}

export function createDefaultWebLiveProofRunners(
  options: DefaultWebLiveProofOptions = {},
): Record<WebProviderId, WebLiveProofRunner> {
  const env = options.env ?? process.env;
  const fetchFn = options.fetchFn ?? fetch;

  return {
    chatgpt: () => runChatgptWebLiveProof(env, fetchFn),
    gemini: () => runGeminiWebLiveProof(env, fetchFn),
    claude: () => runClaudeWebLiveProof(env, fetchFn),
    grok: () => runGrokWebLiveProof(env, fetchFn),
    qwen: () => runQwenWebLiveProof(env, fetchFn),
  };
}
