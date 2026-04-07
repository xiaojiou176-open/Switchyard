export function resolveRequiredEnvValues(
  envNames: readonly string[],
  env: Record<string, string | undefined> = process.env,
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

export function hasRequiredEnvValues(
  envNames: readonly string[],
  env: Record<string, string | undefined> = process.env,
): boolean {
  return resolveRequiredEnvValues(envNames, env) !== undefined;
}

export function parseCookieValue(
  cookieBundle: string,
  cookieName: string,
): string | undefined {
  const match = cookieBundle.match(
    new RegExp(`(?:^|;\\s*)${cookieName}=([^;]+)`),
  );

  return match?.[1];
}

function truncateText(value: string, limit = 1200): string {
  const normalized = value.replace(/\r/g, "").trim();

  if (normalized.length <= limit) {
    return normalized;
  }

  return `${normalized.slice(0, limit - 3)}...`;
}

function pushCandidate(candidates: string[], value: unknown) {
  if (typeof value !== "string") {
    return;
  }

  const trimmed = value.trim();

  if (!trimmed || candidates.includes(trimmed)) {
    return;
  }

  candidates.push(trimmed);
}

function collectTextCandidates(value: unknown, candidates: string[]) {
  if (typeof value === "string") {
    pushCandidate(candidates, value);
    return;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      collectTextCandidates(entry, candidates);
    }
    return;
  }

  if (typeof value !== "object" || value == null) {
    return;
  }

  const record = value as Record<string, unknown>;

  for (const key of [
    "text",
    "completion",
    "content",
    "delta",
    "parts",
    "message",
    "messages",
    "response",
    "choices",
  ]) {
    if (key in record) {
      collectTextCandidates(record[key], candidates);
    }
  }
}

export function extractTextFromEventStream(raw: string): string | undefined {
  const candidates: string[] = [];
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (!line.startsWith("data:")) {
      continue;
    }

    const payload = line.slice(5).trim();

    if (!payload || payload === "[DONE]") {
      continue;
    }

    try {
      collectTextCandidates(JSON.parse(payload), candidates);
    } catch {
      pushCandidate(candidates, payload);
    }
  }

  if (candidates.length === 0) {
    return undefined;
  }

  return truncateText(candidates.join("\n"));
}

export function summarizeRawTransportOutput(
  providerLabel: string,
  raw: string,
): string {
  return `${providerLabel} real transport accepted the upstream stream. Snippet: ${truncateText(raw)}`;
}

export async function readTextResponse(
  response: Response,
): Promise<string> {
  return response.text();
}
