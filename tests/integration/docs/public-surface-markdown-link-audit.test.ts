import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();

const publicMarkdownSurfaces = [
  "README.md",
  "docs/README.md",
  "docs/first-success.md",
  "docs/public-proof-pack.md",
  "docs/public-distribution-ledger.md",
  "docs/public-surface-support-matrix.md",
  "docs/media/30-second-overview.md",
  "docs/media/README.md",
  "docs/mcp.md",
  "docs/compat/README.md",
  "docs/compat/codex.md",
  "docs/compat/claude-code.md",
  "docs/compat/openclaw.md",
  "docs/runbooks/dev-bootstrap.md",
  "examples/README.md",
  "starter-packs/README.md",
  "packages/consumers/codex/README.md",
  "packages/consumers/claude-code/README.md",
  "packages/consumers/openclaw/README.md",
  "packages/surfaces/mcp/README.md",
  "examples/hosts/codex/README.md",
  "examples/hosts/claude-code/README.md",
  "examples/hosts/openclaw/README.md",
  "examples/hosts/mcp/README.md",
] as const;

const linkPattern = /!?\[[^\]]+\]\(([^)]+)\)/g;

describe("public surface markdown link audit", () => {
  it("keeps relative markdown links in public surfaces resolvable", () => {
    for (const relativePath of publicMarkdownSurfaces) {
      const absolutePath = resolve(repoRoot, relativePath);
      const body = readFileSync(absolutePath, "utf8");
      const baseDir = dirname(absolutePath);

      for (const match of body.matchAll(linkPattern)) {
        const href = match[1]?.trim();

        if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) {
          continue;
        }

        const withoutHash = href.split("#")[0];
        const withoutQuery = withoutHash.split("?")[0];

        if (!withoutQuery) {
          continue;
        }

        const targetPath = resolve(baseDir, withoutQuery);
        expect(
          targetPath,
          `${relativePath} -> ${href} should resolve to an existing repo path`,
        ).toSatisfy((value: string) => existsSync(value));
      }
    }
  });
});
