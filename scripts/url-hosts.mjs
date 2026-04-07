function normalizeHost(host) {
  return `${host ?? ""}`.trim().toLowerCase();
}

function splitHostLabels(host) {
  return normalizeHost(host)
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function parseHttpUrl(urlString) {
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

function hostnameMatchesAllowedHost(hostname, allowedHost) {
  return normalizeHost(hostname) === normalizeHost(allowedHost);
}

function hostnameHasRootDomain(hostname, allowedRootDomain) {
  const hostnameLabels = splitHostLabels(hostname);
  const allowedLabels = splitHostLabels(allowedRootDomain);

  if (hostnameLabels.length < allowedLabels.length) {
    return false;
  }

  return allowedLabels.every((label, index) =>
    hostnameLabels[hostnameLabels.length - allowedLabels.length + index] === label,
  );
}

function urlPathStartsWithSegments(urlString, expectedSegments) {
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

function extractHttpUrls(text) {
  return `${text ?? ""}`.match(/https?:\/\/[^\s"'`<>]+/gu) ?? [];
}

export function textContainsUrlWithHostname(text, allowedHost) {
  return extractHttpUrls(text).some((candidate) => {
    const parsed = parseHttpUrl(candidate);
    return parsed ? hostnameMatchesAllowedHost(parsed.hostname, allowedHost) : false;
  });
}

export function textContainsUrlWithHostAndPathPrefix(text, allowedHost, pathPrefix) {
  const expectedSegments = `${pathPrefix ?? ""}`.split("/").filter(Boolean);

  return extractHttpUrls(text).some((candidate) => {
    const parsed = parseHttpUrl(candidate);
    return parsed
      ? hostnameHasRootDomain(parsed.hostname, allowedHost) &&
          urlPathStartsWithSegments(parsed.toString(), expectedSegments)
      : false;
  });
}
