import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  assertPathInsideAllowedRoots,
  assertSafePathSegment,
  resolveCredentialedBrowserMode,
  resolveExternalCacheRoot,
  resolveIsolatedChromeProfileDisplayName,
  resolveCacheMaxBytes,
  resolveCacheTtlDays,
  resolveIsolatedChromeUserDataDir,
  resolveSourceChromeProfileSelection,
} from "../../../scripts/runtime-policy.mjs";

describe("runtime policy path guards", () => {
  it("rejects isolated chrome roots outside allowed artifact roots", () => {
    expect(() =>
      resolveIsolatedChromeUserDataDir({
        SWITCHYARD_CHROME_USER_DATA_DIR: "/etc/switchyard-profile",
      }),
    ).toThrow(/must stay inside one of/u);
  });

  it("rejects source chrome roots outside trusted browser filesystem roots", () => {
    expect(() =>
      resolveSourceChromeProfileSelection({
        SWITCHYARD_SOURCE_CHROME_USER_DATA_DIR: "/etc/switchyard-source-profile",
      }),
    ).toThrow(/must stay inside one of/u);
  });

  it("accepts isolated browser roots under the system temp directory", () => {
    const candidate = join(tmpdir(), "switchyard-tests", "isolated-browser-root");

    expect(
      resolveIsolatedChromeUserDataDir({
        SWITCHYARD_CHROME_USER_DATA_DIR: candidate,
      }),
    ).toBe(resolve(candidate));
  });

  it("rejects profile directory values that are not single path segments", () => {
    expect(() => assertSafePathSegment("../Profile 1", "profile directory")).toThrow(
      /single path segment/u,
    );
    expect(assertSafePathSegment(" Profile 1 ", "profile directory")).toBe("Profile 1");
  });

  it("uses the documented default cache policy when no override is provided", () => {
    expect(resolveCacheTtlDays({})).toBe(7);
    expect(resolveCacheMaxBytes({})).toBe(8 * 1024 * 1024 * 1024);
  });

  it("accepts positive integer cache policy overrides from env", () => {
    expect(
      resolveCacheTtlDays({
        SWITCHYARD_CACHE_TTL_DAYS: "14",
      }),
    ).toBe(14);
    expect(
      resolveCacheMaxBytes({
        SWITCHYARD_CACHE_MAX_BYTES: `${9 * 1024 * 1024 * 1024}`,
      }),
    ).toBe(9 * 1024 * 1024 * 1024);
  });

  it("falls back to defaults when cache policy overrides are empty, invalid, or non-positive", () => {
    expect(
      resolveCacheTtlDays({
        SWITCHYARD_CACHE_TTL_DAYS: "0",
      }),
    ).toBe(7);
    expect(
      resolveCacheTtlDays({
        SWITCHYARD_CACHE_TTL_DAYS: "not-a-number",
      }),
    ).toBe(7);
    expect(
      resolveCacheMaxBytes({
        SWITCHYARD_CACHE_MAX_BYTES: "-1",
      }),
    ).toBe(8 * 1024 * 1024 * 1024);
    expect(
      resolveCacheMaxBytes({
        SWITCHYARD_CACHE_MAX_BYTES: "",
      }),
    ).toBe(8 * 1024 * 1024 * 1024);
  });

  it("expands a tilde-based external cache root outside the repo worktree", () => {
    const repoRoot = "/tmp/switchyard-repo";
    const resolved = resolveExternalCacheRoot(
      {
        SWITCHYARD_EXTERNAL_CACHE_ROOT: "~/.cache/switchyard-tests",
      },
      repoRoot,
    );

    expect(resolved.endsWith("/.cache/switchyard-tests")).toBe(true);
  });

  it("rejects external cache roots that point back inside the repo", () => {
    const repoRoot = "/tmp/switchyard-repo";

    expect(() =>
      resolveExternalCacheRoot(
        {
          SWITCHYARD_EXTERNAL_CACHE_ROOT: `${repoRoot}/.runtime-cache/external`,
        },
        repoRoot,
      ),
    ).toThrow(/must live outside the repo worktree/u);
  });

  it("accepts child paths inside allowed roots and rejects outsiders", () => {
    expect(
      assertPathInsideAllowedRoots(
        "/tmp/switchyard-safe/cache/profile",
        ["/tmp/switchyard-safe", "/tmp/other-root"],
        "browser root",
      ),
    ).toBe("/tmp/switchyard-safe/cache/profile");

    expect(() =>
      assertPathInsideAllowedRoots(
        "/etc/switchyard-profile",
        ["/tmp/switchyard-safe"],
        "browser root",
      ),
    ).toThrow(/must stay inside one of/u);
  });

  it("defaults browser mode by environment and honors explicit overrides", () => {
    expect(resolveCredentialedBrowserMode({})).toBe("isolated-chrome-root");
    expect(resolveCredentialedBrowserMode({ CI: "true" })).toBe("managed-browser");
    expect(
      resolveCredentialedBrowserMode({
        SWITCHYARD_BROWSER_MODE: "existing-browser-session",
      }),
    ).toBe("existing-browser-session");
    expect(
      resolveCredentialedBrowserMode({
        SWITCHYARD_BROWSER_MODE: "existing-chrome-profile",
      }),
    ).toBe("isolated-chrome-root");
  });

  it("uses the documented default isolated profile display name unless overridden", () => {
    expect(resolveIsolatedChromeProfileDisplayName({})).toBe("switchyard");
    expect(
      resolveIsolatedChromeProfileDisplayName({
        SWITCHYARD_CHROME_PROFILE_NAME: "Switchyard QA",
      }),
    ).toBe("Switchyard QA");
  });
});
