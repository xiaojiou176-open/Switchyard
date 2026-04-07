import path from "node:path";

function normalizeHost(host: string): string {
  return host.trim().toLowerCase();
}

function splitHostLabels(host: string): string[] {
  return normalizeHost(host)
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function parseHttpUrl(urlString: string): URL | undefined {
  try {
    const parsed = new URL(urlString);

    if (
      (parsed.protocol !== "http:" && parsed.protocol !== "https:") ||
      parsed.username ||
      parsed.password
    ) {
      return undefined;
    }

    return parsed;
  } catch {
    return undefined;
  }
}

function hostnameMatchesAllowedHost(hostname: string, allowedHost: string): boolean {
  const normalizedHostname = normalizeHost(hostname);
  const normalizedAllowedHost = normalizeHost(allowedHost);

  return (
    normalizedHostname === normalizedAllowedHost ||
    normalizedHostname.endsWith(`.${normalizedAllowedHost}`)
  );
}

function hostnameHasRootDomain(hostname: string, allowedRootDomain: string): boolean {
  const hostnameLabels = splitHostLabels(hostname);
  const allowedLabels = splitHostLabels(allowedRootDomain);

  if (hostnameLabels.length < allowedLabels.length) {
    return false;
  }

  return allowedLabels.every((label, index) =>
    hostnameLabels[hostnameLabels.length - allowedLabels.length + index] === label,
  );
}

export function urlHostnameMatches(urlString: string, allowedHost: string): boolean {
  const parsed = parseHttpUrl(urlString);
  return parsed ? hostnameMatchesAllowedHost(parsed.hostname, allowedHost) : false;
}

export function urlHostnameMatchesAny(
  urlString: string,
  allowedHosts: readonly string[],
): boolean {
  return allowedHosts.some((allowedHost) =>
    urlHostnameMatches(urlString, allowedHost),
  );
}

export function urlHostnameHasRootDomain(
  urlString: string,
  allowedRootDomain: string,
): boolean {
  const parsed = parseHttpUrl(urlString);
  return parsed ? hostnameHasRootDomain(parsed.hostname, allowedRootDomain) : false;
}

export function urlHasPathPrefix(
  urlString: string,
  allowedHost: string,
  pathPrefix: string,
): boolean {
  const parsed = parseHttpUrl(urlString);

  return parsed
    ? hostnameMatchesAllowedHost(parsed.hostname, allowedHost) &&
        urlPathStartsWithSegments(urlString, pathPrefix.split("/").filter(Boolean))
    : false;
}

export function urlPathStartsWithSegments(
  urlString: string,
  expectedSegments: readonly string[],
): boolean {
  const parsed = parseHttpUrl(urlString);
  if (!parsed) {
    return false;
  }

  const actualSegments = parsed.pathname.split("/").filter(Boolean);
  if (actualSegments.length < expectedSegments.length) {
    return false;
  }

  return expectedSegments.every((segment, index) => actualSegments[index] === segment);
}

export function urlPathHasExtension(urlString: string, extension: string): boolean {
  const parsed = parseHttpUrl(urlString);
  if (!parsed) {
    return false;
  }

  return path.posix.extname(parsed.pathname).toLowerCase() === extension.toLowerCase();
}

function extractHttpUrls(text: string): string[] {
  return `${text ?? ""}`.match(/https?:\/\/[^\s"'`<>]+/gu) ?? [];
}

export function textContainsUrlWithHostname(
  text: string,
  allowedHost: string,
): boolean {
  return extractHttpUrls(text).some((candidate) =>
    urlHostnameMatches(candidate, allowedHost),
  );
}

export function textContainsUrlWithHostAndPathPrefix(
  text: string,
  allowedHost: string,
  pathPrefix: string,
): boolean {
  return extractHttpUrls(text).some((candidate) =>
    urlHasPathPrefix(candidate, allowedHost, pathPrefix),
  );
}
