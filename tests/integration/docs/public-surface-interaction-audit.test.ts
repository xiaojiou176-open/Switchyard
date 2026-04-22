import { mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { launchChromiumForUiTest } from "../../support/chromium.js";

const repoRoot = process.cwd();

const routeChecks = [
  {
    href: "./README.md",
    urlSuffix: "/README.md",
    snippet: "Switchyard Public Docs",
  },
  {
    href: "./media/30-second-overview.md",
    urlSuffix: "/media/30-second-overview.md",
    snippet: "Switchyard 30-Second Overview",
  },
  {
    href: "./first-success.md",
    urlSuffix: "/first-success.md",
    snippet: "Switchyard Default First Success",
  },
  {
    href: "./public-proof-pack.md",
    urlSuffix: "/public-proof-pack.md",
    snippet: "Switchyard Public Proof Pack",
  },
  {
    href: "./public-distribution-ledger.md",
    urlSuffix: "/public-distribution-ledger.md",
    snippet: "Switchyard Public Distribution Ledger",
  },
  {
    href: "./public-surface-support-matrix.md",
    urlSuffix: "/public-surface-support-matrix.md",
    snippet: "Switchyard Public Surface Support Matrix",
  },
  {
    href: "./runbooks/dev-bootstrap.md",
    urlSuffix: "/runbooks/dev-bootstrap.md",
    snippet: "Switchyard Dev Bootstrap",
  },
  {
    href: "./api/service-http-reference.md",
    urlSuffix: "/api/service-http-reference.md",
    snippet: "Switchyard Service HTTP Reference",
  },
  {
    href: "./api/error-diagnostics-reference.md",
    urlSuffix: "/api/error-diagnostics-reference.md",
    snippet: "Switchyard Error and Diagnostics Reference",
  },
] as const;

describe("public surface interaction audit", () => {
  it(
    "keeps first-row docs interactions working from both root-path and project-site front doors",
    async () => {
      const tempRoot = mkdtempSync(resolve(tmpdir(), "switchyard-public-ui-"));
      const projectRoot = resolve(tempRoot, "Switchyard");
      symlinkSync(repoRoot, projectRoot, "dir");

      const { startDocsStaticServer } = await import("../../../scripts/start-local-experience.mjs");

      const rootServer = await startDocsStaticServer({
        rootDir: repoRoot,
        host: "127.0.0.1",
        port: 0,
      });
      const projectServer = await startDocsStaticServer({
        rootDir: tempRoot,
        host: "127.0.0.1",
        port: 0,
      });

      const rootAddress = rootServer.address();
      if (!rootAddress || typeof rootAddress === "string") {
        throw new Error("Expected root docs front door test server to expose a TCP port.");
      }

      const projectAddress = projectServer.address();
      if (!projectAddress || typeof projectAddress === "string") {
        throw new Error("Expected project-site docs front door test server to expose a TCP port.");
      }

      try {
        const browser = await launchChromiumForUiTest();
        try {
          const page = await browser.newPage();

          for (const [baseUrl, prefix] of [
            [`http://127.0.0.1:${rootAddress.port}/`, ""],
            [`http://127.0.0.1:${projectAddress.port}/Switchyard/`, "/Switchyard"],
          ] as const) {
            for (const route of routeChecks) {
              await page.goto(baseUrl, { waitUntil: "networkidle" });
              await page.locator(`a[href="${route.href}"]`).first().click();
              await page.waitForLoadState("networkidle").catch(() => undefined);
              expect(page.url()).toContain(`${prefix}${route.urlSuffix}`);
              expect((await page.textContent("body")) ?? "").toContain(route.snippet);
            }
          }
        } finally {
          await browser.close();
        }
      } finally {
        await new Promise<void>((resolveClose) => rootServer.close(() => resolveClose()));
        await new Promise<void>((resolveClose) => projectServer.close(() => resolveClose()));
        rmSync(tempRoot, { recursive: true, force: true });
      }
    },
    60_000,
  );
});
