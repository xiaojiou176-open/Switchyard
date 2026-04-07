import type { WebProviderId } from "./types.js";

export interface LiveProofEnvPresenceEntry {
  name: string;
  present: boolean;
}

export type WebLiveProofClassification =
  | "session-material-missing"
  | "session-incomplete"
  | "human-verification-required"
  | "user-action-required"
  | "provider-unavailable"
  | "transport-instability"
  | "probe-misclassification";

export interface WebLiveProofSuccess {
  status: "success";
  provider: WebProviderId;
  probeUrl: string;
  finalUrl: string;
  responseStatus: number;
  responseKind: "json" | "html";
  signal: string;
  summary: string;
  envStatus: LiveProofEnvPresenceEntry[];
}

export interface WebLiveProofExternalBlocker {
  status: "external-blocker";
  provider: WebProviderId;
  blocker: "missing-web-session-material";
  classification?: WebLiveProofClassification;
  probeUrl: string;
  envStatus: LiveProofEnvPresenceEntry[];
  missingEnvNames: string[];
  rerunCommand: string;
}

export interface WebLiveProofFailure {
  status: "failure";
  provider: WebProviderId;
  classification?: WebLiveProofClassification;
  probeUrl: string;
  finalUrl?: string;
  responseStatus?: number;
  reason: "probe-request-failed" | "probe-http-error" | "probe-unexpected-body";
  diagnostic: string;
  summary?: string;
  envStatus: LiveProofEnvPresenceEntry[];
}

export type WebLiveProofResult =
  | WebLiveProofSuccess
  | WebLiveProofExternalBlocker
  | WebLiveProofFailure;

export interface JsonProbeValidationSuccess {
  ok: true;
  signal: string;
  summary: string;
}

export interface JsonProbeValidationFailure {
  ok: false;
  classification?: WebLiveProofClassification;
  diagnostic: string;
  summary?: string;
}

export interface HtmlProbeValidationSuccess {
  ok: true;
  signal: string;
  summary: string;
}

export interface HtmlProbeValidationFailure {
  ok: false;
  classification?: WebLiveProofClassification;
  diagnostic: string;
  summary?: string;
}

export interface WebJsonProbeConfig {
  provider: WebProviderId;
  probeUrl: string;
  requiredEnvNames: readonly string[];
  rerunCommand: string;
  requestInit?: Omit<RequestInit, "headers" | "signal" | "redirect">;
  buildHeaders: (resolvedEnv: Record<string, string>) => Record<string, string>;
  validate: (
    body: unknown,
    response: Response,
  ) => JsonProbeValidationSuccess | JsonProbeValidationFailure;
}

export interface WebHtmlProbeConfig {
  provider: WebProviderId;
  probeUrl: string;
  requiredEnvNames: readonly string[];
  rerunCommand: string;
  buildHeaders: (resolvedEnv: Record<string, string>) => Record<string, string>;
  validate: (args: {
    html: string;
    response: Response;
  }) => HtmlProbeValidationSuccess | HtmlProbeValidationFailure;
}

const LIVE_PROOF_FETCH_RETRY_DELAY_MS = 500;

async function wait(ms: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  fetchFn: typeof fetch,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await fetchFn(url, init);
    } catch (error) {
      lastError = error;

      if (attempt === 1) {
        throw error;
      }

      await wait(LIVE_PROOF_FETCH_RETRY_DELAY_MS);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Live probe fetch failed for ${url}.`);
}

function truncateSummary(value: string, limit = 280): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= limit) {
    return normalized;
  }

  return `${normalized.slice(0, limit - 3)}...`;
}

export function collectLiveProofEnvStatus(
  envNames: readonly string[],
  env: Record<string, string | undefined>,
): LiveProofEnvPresenceEntry[] {
  return envNames.map((name) => ({
    name,
    present: Boolean(env[name]?.trim()),
  }));
}

function missingMaterialResult(args: {
  provider: WebProviderId;
  probeUrl: string;
  envStatus: LiveProofEnvPresenceEntry[];
  rerunCommand: string;
}): WebLiveProofExternalBlocker {
  return {
    status: "external-blocker",
    provider: args.provider,
    blocker: "missing-web-session-material",
    classification: "session-material-missing",
    probeUrl: args.probeUrl,
    envStatus: args.envStatus,
    missingEnvNames: args.envStatus
      .filter((entry) => !entry.present)
      .map((entry) => entry.name),
    rerunCommand: args.rerunCommand,
  };
}

function resolveRequiredEnv(
  envNames: readonly string[],
  env: Record<string, string | undefined>,
): Record<string, string> | undefined {
  const resolved: Record<string, string> = {};

  for (const name of envNames) {
    const value = env[name]?.trim();

    if (!value) {
      return undefined;
    }

    resolved[name] = value;
  }

  return resolved;
}

async function readTextBody(response: Response): Promise<string> {
  return response.text();
}

export async function runJsonWebProbe(
  config: WebJsonProbeConfig,
  env: Record<string, string | undefined> = process.env,
  fetchFn: typeof fetch = fetch,
): Promise<WebLiveProofResult> {
  const envStatus = collectLiveProofEnvStatus(config.requiredEnvNames, env);
  const resolvedEnv = resolveRequiredEnv(config.requiredEnvNames, env);

  if (!resolvedEnv) {
    return missingMaterialResult({
      provider: config.provider,
      probeUrl: config.probeUrl,
      envStatus,
      rerunCommand: config.rerunCommand,
    });
  }

  let response: Response;

  try {
    response = await fetchWithRetry(config.probeUrl, {
      ...config.requestInit,
      method: config.requestInit?.method ?? "GET",
      headers: config.buildHeaders(resolvedEnv),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    }, fetchFn);
  } catch (error) {
    return {
      status: "failure",
      provider: config.provider,
      classification: "provider-unavailable",
      probeUrl: config.probeUrl,
      reason: "probe-request-failed",
      diagnostic:
        error instanceof Error ? error.message : "Unknown fetch failure during live probe.",
      envStatus,
    };
  }

  const rawText = await readTextBody(response);

  if (!response.ok) {
    return {
      status: "failure",
      provider: config.provider,
      classification: "provider-unavailable",
      probeUrl: config.probeUrl,
      finalUrl: response.url || config.probeUrl,
      responseStatus: response.status,
      reason: "probe-http-error",
      diagnostic: `Live probe returned HTTP ${response.status}.`,
      summary: truncateSummary(rawText),
      envStatus,
    };
  }

  let parsed: unknown;

  try {
    parsed = rawText.length > 0 ? JSON.parse(rawText) : undefined;
  } catch {
    return {
      status: "failure",
      provider: config.provider,
      classification: "probe-misclassification",
      probeUrl: config.probeUrl,
      finalUrl: response.url || config.probeUrl,
      responseStatus: response.status,
      reason: "probe-unexpected-body",
      diagnostic: "Expected JSON response body for live probe.",
      summary: truncateSummary(rawText),
      envStatus,
    };
  }

  const verdict = config.validate(parsed, response);

  if (!verdict.ok) {
    return {
      status: "failure",
      provider: config.provider,
      classification: verdict.classification ?? "probe-misclassification",
      probeUrl: config.probeUrl,
      finalUrl: response.url || config.probeUrl,
      responseStatus: response.status,
      reason: "probe-unexpected-body",
      diagnostic: verdict.diagnostic,
      summary: verdict.summary ?? truncateSummary(rawText),
      envStatus,
    };
  }

  return {
    status: "success",
    provider: config.provider,
    probeUrl: config.probeUrl,
    finalUrl: response.url || config.probeUrl,
    responseStatus: response.status,
    responseKind: "json",
    signal: verdict.signal,
    summary: verdict.summary,
    envStatus,
  };
}

export async function runHtmlWebProbe(
  config: WebHtmlProbeConfig,
  env: Record<string, string | undefined> = process.env,
  fetchFn: typeof fetch = fetch,
): Promise<WebLiveProofResult> {
  const envStatus = collectLiveProofEnvStatus(config.requiredEnvNames, env);
  const resolvedEnv = resolveRequiredEnv(config.requiredEnvNames, env);

  if (!resolvedEnv) {
    return missingMaterialResult({
      provider: config.provider,
      probeUrl: config.probeUrl,
      envStatus,
      rerunCommand: config.rerunCommand,
    });
  }

  let response: Response;

  try {
    response = await fetchFn(config.probeUrl, {
      method: "GET",
      headers: config.buildHeaders(resolvedEnv),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    return {
      status: "failure",
      provider: config.provider,
      classification: "provider-unavailable",
      probeUrl: config.probeUrl,
      reason: "probe-request-failed",
      diagnostic:
        error instanceof Error ? error.message : "Unknown fetch failure during live probe.",
      envStatus,
    };
  }

  const html = await readTextBody(response);

  if (!response.ok) {
    return {
      status: "failure",
      provider: config.provider,
      classification: "provider-unavailable",
      probeUrl: config.probeUrl,
      finalUrl: response.url || config.probeUrl,
      responseStatus: response.status,
      reason: "probe-http-error",
      diagnostic: `Live probe returned HTTP ${response.status}.`,
      summary: truncateSummary(html),
      envStatus,
    };
  }

  const verdict = config.validate({
    html,
    response,
  });

  if (!verdict.ok) {
    return {
      status: "failure",
      provider: config.provider,
      classification: verdict.classification ?? "probe-misclassification",
      probeUrl: config.probeUrl,
      finalUrl: response.url || config.probeUrl,
      responseStatus: response.status,
      reason: "probe-unexpected-body",
      diagnostic: verdict.diagnostic,
      summary: verdict.summary ?? truncateSummary(html),
      envStatus,
    };
  }

  return {
    status: "success",
    provider: config.provider,
    probeUrl: config.probeUrl,
    finalUrl: response.url || config.probeUrl,
    responseStatus: response.status,
    responseKind: "html",
    signal: verdict.signal,
    summary: verdict.summary,
    envStatus,
  };
}
