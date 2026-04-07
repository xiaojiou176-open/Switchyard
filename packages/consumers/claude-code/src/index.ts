import {
  createThinCompatAdapter,
  createThinCompatManifest,
  ThinCompatUnsupportedFeatureError,
} from "../../shared/src/index.js";
import type {
  ThinCompatAdapterOptions,
  ThinCompatRequest,
  ThinCompatResponse,
  ThinCompatUnsupportedFeature,
} from "../../shared/src/index.js";

export const CLAUDE_CODE_THIN_COMPAT_MANIFEST = createThinCompatManifest({
  target: "claude-code",
  transport: "anthropic-compatible",
  notes: [
    "builder-facing runtime adapter only",
    "header/body fidelity bridge is intentionally thin",
    "no terminal shell, tool plane, or MCP parity",
  ],
});

export const CLAUDE_CODE_THIN_COMPAT_METADATA =
  CLAUDE_CODE_THIN_COMPAT_MANIFEST;
export const CLAUDE_CODE_UNSUPPORTED_FEATURES =
  CLAUDE_CODE_THIN_COMPAT_MANIFEST.unsupportedFeatures;

export type ClaudeCodeThinCompatRequest = ThinCompatRequest & {
  readonly messages?: ReadonlyArray<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  readonly tools?: readonly unknown[];
};
export type ClaudeCodeThinCompatResponse =
  ThinCompatResponse<"claude-code">;

function assertClaudeTools(request: ClaudeCodeThinCompatRequest) {
  if (request.tools && request.tools.length > 0) {
    throw new Error(
      "Claude Code thin compat stays fail-closed for tool execution.",
    );
  }
}

function coerceClaudeRequest(
  request: ClaudeCodeThinCompatRequest,
): ThinCompatRequest {
  assertClaudeTools(request);

  if (request.messages?.length) {
    return {
      ...request,
      input: request.messages
        .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
        .join("\n\n"),
    };
  }

  return request;
}

export interface ClaudeCodeThinCompatAdapter {
  readonly manifest: typeof CLAUDE_CODE_THIN_COMPAT_MANIFEST;
  messages(
    request: ClaudeCodeThinCompatRequest,
  ): Promise<ClaudeCodeThinCompatResponse>;
  invokeMessages(
    request: ClaudeCodeThinCompatRequest,
  ): Promise<{
    compat: "partial";
    delegatedTo: "service-runtime";
    unsupportedFeatures: typeof CLAUDE_CODE_UNSUPPORTED_FEATURES;
    ok: boolean;
    provider?: string;
    model: string;
    lane?: string;
    text?: string;
    providerMessageId?: string;
    error?: ClaudeCodeThinCompatResponse["error"];
    auth?: ClaudeCodeThinCompatResponse["auth"];
  }>;
  failClosed(feature: ThinCompatUnsupportedFeature): never;
}

export function createClaudeCodeThinCompatAdapter(
  options: ThinCompatAdapterOptions,
): ClaudeCodeThinCompatAdapter {
  const adapter = createThinCompatAdapter(
    CLAUDE_CODE_THIN_COMPAT_MANIFEST,
    options,
  );

  return {
    manifest: adapter.manifest,
    messages(request) {
      return adapter.invokeText(coerceClaudeRequest(request));
    },
    async invokeMessages(request) {
      const response = await adapter.invokeText(coerceClaudeRequest(request));
      return {
        compat: "partial",
        delegatedTo: "service-runtime",
        unsupportedFeatures: CLAUDE_CODE_UNSUPPORTED_FEATURES,
        ok: response.ok,
        provider: response.provider,
        model: response.model,
        lane: response.lane,
        text: response.outputText,
        providerMessageId: response.providerMessageId,
        error: response.error,
        auth: response.auth,
      };
    },
    failClosed(feature: ThinCompatUnsupportedFeature) {
      throw new ThinCompatUnsupportedFeatureError(feature, "claude-code");
    },
  };
}

export const createClaudeCodeCompatAdapter = createClaudeCodeThinCompatAdapter;
