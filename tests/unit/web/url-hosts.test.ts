import { describe, expect, it } from "vitest";

import {
  textContainsUrlWithHostname,
  urlHasPathPrefix,
  urlHostnameHasRootDomain,
  urlHostnameMatches,
  urlPathHasExtension,
  urlPathStartsWithSegments,
} from "../../../packages/providers/web/shared/url-hosts.ts";

describe("URL host helpers", () => {
  it("matches exact hosts but rejects lookalike domains", () => {
    expect(urlHostnameMatches("https://grok.com/c/123", "grok.com")).toBe(true);
    expect(urlHostnameMatches("https://evil-grok.com/c/123", "grok.com")).toBe(false);
    expect(urlHostnameMatches("https://chatgpt.com/", "grok.com")).toBe(false);
  });

  it("matches allowed root domains without substring leakage", () => {
    expect(urlHostnameHasRootDomain("https://accounts.google.com/signin", "google.com")).toBe(true);
    expect(urlHostnameHasRootDomain("https://example.google.com/app", "google.com")).toBe(true);
    expect(urlHostnameHasRootDomain("https://google.com.evil.example/sorry", "google.com")).toBe(false);
  });

  it("matches path segments and extensions on parsed URLs only", () => {
    expect(urlPathStartsWithSegments("https://gemini.google.com/app/chat", ["app"])).toBe(true);
    expect(urlPathStartsWithSegments("https://gemini.google.com/evil/app", ["app"])).toBe(false);
    expect(urlHasPathPrefix("https://accounts.google.com/CookieMismatch", "accounts.google.com", "/CookieMismatch")).toBe(true);
    expect(urlPathHasExtension("https://cdn.oaistatic.com/assets/app.js", ".js")).toBe(true);
    expect(urlPathHasExtension("https://cdn.oaistatic.com/assets/app.json", ".js")).toBe(false);
  });

  it("extracts exact host URLs from text without trusting query-string bait", () => {
    expect(
      textContainsUrlWithHostname(
        "redirected to https://evil.example/?next=https://grok.com/c/123",
        "grok.com",
      ),
    ).toBe(false);
    expect(
      textContainsUrlWithHostname(
        "workspace ready at https://grok.com/c/123",
        "grok.com",
      ),
    ).toBe(true);
  });
});
