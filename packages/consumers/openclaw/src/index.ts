import {
  buildServiceRouteCatalog,
  type RuntimeBootstrapView,
} from "../../../surfaces/http/src/service-language.js";
import type { SwitchyardServiceClientOptions } from "../../../surfaces/sdk-client/src/index.js";
import {
  createThinCompatAdapter,
  createThinCompatManifest,
  type ThinCompatAdapterOptions,
  type ThinCompatRequest,
  type ThinCompatResponse,
  type ThinCompatUnsupportedFeature,
} from "../../shared/src/index.js";

export const OPENCLAW_THIN_COMPAT_MANIFEST = createThinCompatManifest({
  target: "openclaw",
  transport: "delegated-runtime",
  notes: [
    "future consumer-side adapter only",
    "provider/runtime delegation without product-shell inheritance",
    "no operator control plane or channel shell parity",
  ],
});

export const OPENCLAW_THIN_COMPAT_METADATA = OPENCLAW_THIN_COMPAT_MANIFEST;
export const OPENCLAW_UNSUPPORTED_FEATURES =
  OPENCLAW_THIN_COMPAT_MANIFEST.unsupportedFeatures;

export type OpenclawThinCompatRequest = ThinCompatRequest & {
  readonly mode?: "chat" | "plan" | "copilot-brain";
};

export type OpenclawThinCompatResponse = ThinCompatResponse<"openclaw">;

export interface OpenclawThinCompatAdapter {
  readonly manifest: typeof OPENCLAW_THIN_COMPAT_MANIFEST;
  delegateTurn(
    request: OpenclawThinCompatRequest,
  ): Promise<OpenclawThinCompatResponse>;
  invokeText(
    request: OpenclawThinCompatRequest,
  ): Promise<{
    compat: "partial";
    delegatedTo: "service-runtime";
    unsupportedFeatures: typeof OPENCLAW_UNSUPPORTED_FEATURES;
    ok: boolean;
    provider?: string;
    model: string;
    lane?: string;
    outputText?: string;
    providerMessageId?: string;
    error?: OpenclawThinCompatResponse["error"];
    auth?: OpenclawThinCompatResponse["auth"];
  }>;
  describeDelegation(): {
    target: "openclaw";
    compat: "partial";
    delegatedTo: "service-runtime";
    unsupportedFeatures: typeof OPENCLAW_UNSUPPORTED_FEATURES;
  };
  bootstrapDelegation(): Promise<RuntimeBootstrapView>;
  failClosed(feature: ThinCompatUnsupportedFeature): never;
}

class OpenClawBootstrapClient {
  readonly #fetch: typeof fetch;
  readonly #headers: Record<string, string>;
  readonly #routes;

  constructor(options: SwitchyardServiceClientOptions) {
    this.#fetch = options.fetch ?? fetch;
    this.#headers = options.headers ?? {};
    this.#routes = buildServiceRouteCatalog(options.baseUrl);
  }

  async bootstrap(): Promise<RuntimeBootstrapView> {
    const response = await this.#fetch(this.#routes.bootstrap, {
      headers: this.#headers,
    });

    return response.json() as Promise<RuntimeBootstrapView>;
  }
}

export function createOpenclawThinCompatAdapter(
  options: ThinCompatAdapterOptions,
): OpenclawThinCompatAdapter {
  const adapter = createThinCompatAdapter(OPENCLAW_THIN_COMPAT_MANIFEST, options);
  const bootstrapClient = new OpenClawBootstrapClient(options);

  return {
    manifest: adapter.manifest,
    describeDelegation() {
      return {
        target: "openclaw",
        compat: "partial" as const,
        delegatedTo: "service-runtime" as const,
        unsupportedFeatures: OPENCLAW_UNSUPPORTED_FEATURES,
      };
    },
    bootstrapDelegation() {
      return bootstrapClient.bootstrap();
    },
    delegateTurn(request) {
      return adapter.invokeText(request);
    },
    failClosed(feature) {
      return adapter.failClosed(feature);
    },
    async invokeText(request) {
      const response = await adapter.invokeText(request);
      return {
        compat: "partial" as const,
        delegatedTo: "service-runtime" as const,
        unsupportedFeatures: OPENCLAW_UNSUPPORTED_FEATURES,
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
  };
}

export const createOpenClawCompatAdapter = createOpenclawThinCompatAdapter;
