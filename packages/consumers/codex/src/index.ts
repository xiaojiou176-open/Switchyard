import {
  createThinCompatAdapter,
  createThinCompatManifest,
  type ThinCompatAdapterOptions,
  type ThinCompatRequest,
  type ThinCompatResponse,
  type ThinCompatUnsupportedFeature,
} from "../../shared/src/index.js";

export const CODEX_THIN_COMPAT_MANIFEST = createThinCompatManifest({
  target: "codex",
  transport: "responses",
  notes: [
    "builder-facing runtime adapter only",
    "no tool or MCP parity",
  ],
});

export const CODEX_THIN_COMPAT_METADATA = CODEX_THIN_COMPAT_MANIFEST;
export const CODEX_UNSUPPORTED_FEATURES =
  CODEX_THIN_COMPAT_MANIFEST.unsupportedFeatures;

export type CodexThinCompatRequest = ThinCompatRequest;
export type CodexThinCompatResponse = ThinCompatResponse<"codex">;

export interface CodexThinCompatAdapter {
  readonly manifest: typeof CODEX_THIN_COMPAT_MANIFEST;
  responses(request: CodexThinCompatRequest): Promise<CodexThinCompatResponse>;
  invokeText(request: CodexThinCompatRequest): Promise<{
    compat: "partial";
    delegatedTo: "service-runtime";
    unsupportedFeatures: typeof CODEX_UNSUPPORTED_FEATURES;
    ok: boolean;
    provider?: string;
    model: string;
    lane?: string;
    outputText?: string;
    providerMessageId?: string;
    error?: CodexThinCompatResponse["error"];
    auth?: CodexThinCompatResponse["auth"];
  }>;
  describe(): {
    target: "codex";
    compat: "partial";
    delegatedTo: "service-runtime";
    unsupportedFeatures: typeof CODEX_UNSUPPORTED_FEATURES;
  };
  failClosed(feature: ThinCompatUnsupportedFeature): never;
}

export function createCodexThinCompatAdapter(
  options: ThinCompatAdapterOptions,
): CodexThinCompatAdapter {
  const adapter = createThinCompatAdapter(CODEX_THIN_COMPAT_MANIFEST, options);

  return {
    manifest: adapter.manifest,
    responses(request) {
      return adapter.invokeText(request);
    },
    async invokeText(request) {
      const response = await adapter.invokeText(request);
      return {
        compat: "partial",
        delegatedTo: "service-runtime",
        unsupportedFeatures: CODEX_UNSUPPORTED_FEATURES,
        ok: response.ok,
        provider: response.provider,
        model: response.model,
        lane: response.lane,
        outputText: response.outputText,
        providerMessageId: response.providerMessageId,
        error: response.error,
        auth: response.auth,
      };
    },
    describe() {
      return {
        target: "codex",
        compat: "partial",
        delegatedTo: "service-runtime",
        unsupportedFeatures: CODEX_UNSUPPORTED_FEATURES,
      };
    },
    failClosed(feature) {
      return adapter.failClosed(feature);
    },
  };
}

export const createCodexCompatAdapter = createCodexThinCompatAdapter;
