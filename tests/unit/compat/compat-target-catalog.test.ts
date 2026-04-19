import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { CLAUDE_CODE_THIN_COMPAT_MANIFEST } from "../../../packages/consumers/claude-code/src/index.js";
import { CODEX_THIN_COMPAT_MANIFEST } from "../../../packages/consumers/codex/src/index.js";
import { OPENCLAW_THIN_COMPAT_MANIFEST } from "../../../packages/consumers/openclaw/src/index.js";
import { THIN_COMPAT_TARGETS } from "../../../packages/consumers/shared/src/index.js";

const repoRoot = process.cwd();

function readJson(relativePath: string) {
  return JSON.parse(
    readFileSync(resolve(repoRoot, relativePath), "utf8"),
  ) as {
    targets: Array<{
      target: string;
      status: string;
      builderFacing: boolean;
      failClosed: boolean;
      transport: string;
      route: string;
      supportedModes: string[];
      notYetSupported: string[];
      notes: string[];
      sourceAnchors: string[];
    }>;
  };
}

describe("compat target catalog contract", () => {
  it("stays aligned with the thin compat manifests", () => {
    const compatTargetCatalog = readJson("catalogs/compat-target-catalog.json");
    const entries = new Map(
      compatTargetCatalog.targets.map((entry) => [entry.target, entry]),
    );

    expect(compatTargetCatalog.targets.map((entry) => entry.target)).toEqual(
      Array.from(THIN_COMPAT_TARGETS),
    );

    const cases = [
      {
        manifest: CODEX_THIN_COMPAT_MANIFEST,
        docsAnchor: "docs/compat/codex.md",
        sourceAnchor: "packages/consumers/codex/src/index.ts",
        testAnchor: "tests/unit/compat/codex-consumer.test.ts",
      },
      {
        manifest: CLAUDE_CODE_THIN_COMPAT_MANIFEST,
        docsAnchor: "docs/compat/claude-code.md",
        sourceAnchor: "packages/consumers/claude-code/src/index.ts",
        testAnchor: "tests/unit/compat/claude-code-consumer.test.ts",
      },
      {
        manifest: OPENCLAW_THIN_COMPAT_MANIFEST,
        docsAnchor: "docs/compat/openclaw.md",
        sourceAnchor: "packages/consumers/openclaw/src/index.ts",
        testAnchor: "tests/unit/compat/openclaw-consumer.test.ts",
      },
    ] as const;

    for (const { manifest, docsAnchor, sourceAnchor, testAnchor } of cases) {
      const entry = entries.get(manifest.target);

      expect(entry).toBeDefined();
      expect(entry).toEqual(
        expect.objectContaining({
          target: manifest.target,
          status: manifest.status,
          builderFacing: manifest.builderFacing,
          failClosed: manifest.failClosed,
          transport: manifest.transport,
          route: manifest.route,
          supportedModes: Array.from(manifest.supportedModes),
          notYetSupported: Array.from(manifest.unsupportedFeatures),
          notes: Array.from(manifest.notes),
        }),
      );
      expect(entry?.sourceAnchors).toEqual(
        expect.arrayContaining([docsAnchor, sourceAnchor, testAnchor]),
      );
    }
  });
});
