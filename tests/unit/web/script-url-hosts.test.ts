import { describe, expect, it } from "vitest";

import {
  textContainsUrlWithHostAndPathPrefix,
  textContainsUrlWithHostname,
} from "../../../scripts/url-hosts.mjs";

describe("script URL host helpers", () => {
  it("detects exact-host URLs in free text without trusting query-string bait", () => {
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
    expect(
      textContainsUrlWithHostname(
        "credential bait https://user:pass@grok.com/c/123",
        "grok.com",
      ),
    ).toBe(false);
  });

  it("matches allowed host/path prefixes only on parsed URLs", () => {
    expect(
      textContainsUrlWithHostAndPathPrefix(
        "challenge page https://google.com/sorry/index?continue=https://gemini.google.com/app",
        "google.com",
        "/sorry",
      ),
    ).toBe(true);
    expect(
      textContainsUrlWithHostAndPathPrefix(
        "bait https://evil.example/google.com/sorry/index",
        "google.com",
        "/sorry",
      ),
    ).toBe(false);
    expect(
      textContainsUrlWithHostAndPathPrefix(
        "too short https://google.com/",
        "google.com",
        "/sorry",
      ),
    ).toBe(false);
  });
});
