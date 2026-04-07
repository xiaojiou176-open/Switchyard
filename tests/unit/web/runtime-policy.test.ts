import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  assertSafePathSegment,
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
  });
});
