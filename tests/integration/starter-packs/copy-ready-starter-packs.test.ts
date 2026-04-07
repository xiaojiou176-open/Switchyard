import { execFile } from "node:child_process";
import { once } from "node:events";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import Ajv2020 from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

async function runPack(relativePath: string, env: NodeJS.ProcessEnv = {}) {
  const { stdout } = await execFileAsync("node", [resolve(repoRoot, relativePath)], {
    cwd: repoRoot,
    env: {
      ...process.env,
      ...env,
    },
  });

  return JSON.parse(stdout);
}

function readJson(relativePath: string) {
  return JSON.parse(readFileSync(resolve(repoRoot, relativePath), "utf8"));
}

describe("copy-ready starter packs", () => {
  it("keeps pack directories aligned with catalog pack paths and starter manifests", () => {
    const catalog = readJson("docs/public-surface-catalog.json");
    const builderKitCatalog = readJson("docs/builder-kit-catalog.json");
    const builderKitCatalogSchema = readJson("docs/builder-kit-catalog.schema.json");
    const skillPackCatalog = readJson("docs/skill-pack-catalog.json");
    const skillPackCatalogSchema = readJson("docs/skill-pack-catalog.schema.json");
    const templates = readJson("docs/starter-manifest-templates.json");
    const examples = readJson("docs/starter-manifest-examples.json");
    const starterPackIndex = readJson("starter-packs/index.json");
    const starterPackIndexSchema = readJson("starter-packs/index.schema.json");
    const starterPackChooser = readJson("docs/starter-pack-chooser.json");
    const starterPackChooserSchema = readJson("docs/starter-pack-chooser.schema.json");
    const ajv = new Ajv2020({ strict: false });
    const validateBuilderKitCatalog = ajv.compile(builderKitCatalogSchema);
    const validateSkillPackCatalog = ajv.compile(skillPackCatalogSchema);
    const validateStarterPackIndex = ajv.compile(starterPackIndexSchema);
    const validateStarterPackChooser = ajv.compile(starterPackChooserSchema);

    expect(validateBuilderKitCatalog(builderKitCatalog)).toBe(true);
    expect(validateSkillPackCatalog(skillPackCatalog)).toBe(true);
    expect(validateStarterPackIndex(starterPackIndex)).toBe(true);
    expect(validateStarterPackChooser(starterPackChooser)).toBe(true);
    expect(builderKitCatalog.kits).toEqual(catalog.builderKits);
    expect(skillPackCatalog.packs).toEqual(catalog.skillPacks);

    for (const target of ["codex", "claude-code", "openclaw", "mcp"]) {
      const packPath = `starter-packs/builders/${target}`;
      const entry = catalog.builderKits.find((item: { target: string }) => item.target === target);
      const builderKitEntry = builderKitCatalog.kits.find((item: { target: string }) => item.target === target);
      const starterPackEntry = starterPackIndex.builderPacks.find(
        (item: { target: string }) => item.target === target,
      );

      expect(entry?.copyReadyPackPath).toBe(packPath);
      expect(builderKitEntry?.copyReadyPackPath).toBe(packPath);
      expect(starterPackEntry?.packPath).toBe(packPath);
      expect(existsSync(resolve(repoRoot, packPath, "README.md"))).toBe(true);
      expect(existsSync(resolve(repoRoot, packPath, "template.json"))).toBe(true);
      expect(existsSync(resolve(repoRoot, packPath, "example.json"))).toBe(true);
      expect(readJson(`${packPath}/template.json`).builderTemplates[0]).toEqual(
        templates.builderTemplates.find((item: { target: string }) => item.target === target),
      );
      expect(readJson(`${packPath}/example.json`).builderExamples[0]).toEqual(
        examples.builderExamples.find((item: { target: string }) => item.target === target),
      );
    }

    for (const id of ["runtime-diagnostics-pack", "docs-seo-sync-pack"]) {
      const packPath = `starter-packs/skills/${id}`;
      const entry = catalog.skillPacks.find((item: { id: string }) => item.id === id);
      const skillPackEntry = skillPackCatalog.packs.find((item: { id: string }) => item.id === id);
      const starterPackEntry = starterPackIndex.skillPacks.find(
        (item: { id: string }) => item.id === id,
      );

      expect(entry?.copyReadyPackPath).toBe(packPath);
      expect(skillPackEntry?.copyReadyPackPath).toBe(packPath);
      expect(starterPackEntry?.packPath).toBe(packPath);
      expect(existsSync(resolve(repoRoot, packPath, "README.md"))).toBe(true);
      expect(existsSync(resolve(repoRoot, packPath, "template.json"))).toBe(true);
      expect(existsSync(resolve(repoRoot, packPath, "example.json"))).toBe(true);
      expect(readJson(`${packPath}/template.json`).skillTemplates[0]).toEqual(
        templates.skillTemplates.find((item: { id: string }) => item.id === id),
      );
      expect(readJson(`${packPath}/example.json`).skillExamples[0]).toEqual(
        examples.skillExamples.find((item: { id: string }) => item.id === id),
      );
    }

    for (const scenario of starterPackChooser.scenarios as Array<{
      recommendedPack: string;
      starterKind: "builder" | "skill";
      recommendedDocs: string[];
    }>) {
      if (scenario.starterKind === "builder") {
        expect(
          catalog.builderKits.find((item: { target: string }) => item.target === scenario.recommendedPack),
        ).toBeTruthy();
        expect(
          starterPackIndex.builderPacks.find((item: { target: string }) => item.target === scenario.recommendedPack),
        ).toBeTruthy();
      } else {
        expect(
          catalog.skillPacks.find((item: { id: string }) => item.id === scenario.recommendedPack),
        ).toBeTruthy();
        expect(
          starterPackIndex.skillPacks.find((item: { id: string }) => item.id === scenario.recommendedPack),
        ).toBeTruthy();
      }

      for (const path of scenario.recommendedDocs) {
        expect(existsSync(resolve(repoRoot, path))).toBe(true);
      }
    }
  });

  it("runs the builder runtime packs against a mock invoke runtime", async () => {
    const requests: Array<Record<string, unknown>> = [];
    const service = createServer((request, response) => {
      if (request.method === "POST" && request.url === "/v1/runtime/invoke") {
        const chunks: Buffer[] = [];
        request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        request.on("end", () => {
          requests.push(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          response.setHeader("content-type", "application/json");
          response.end(JSON.stringify({ ok: true, output: [{ type: "text", text: "ok" }] }));
        });
        return;
      }

      response.statusCode = 404;
      response.end(JSON.stringify({ error: "not-found" }));
    });

    service.listen(0, "127.0.0.1");
    await once(service, "listening");
    const address = service.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected starter-pack test server to expose a TCP port.");
    }

    try {
      const baseUrl = `http://127.0.0.1:${address.port}`;
      const codex = await runPack("starter-packs/builders/codex/smoke.mjs", {
        SWITCHYARD_RUNTIME_BASE_URL: baseUrl,
      });
      const claudeCode = await runPack("starter-packs/builders/claude-code/smoke.mjs", {
        SWITCHYARD_RUNTIME_BASE_URL: baseUrl,
      });
      const openclaw = await runPack("starter-packs/builders/openclaw/smoke.mjs", {
        SWITCHYARD_RUNTIME_BASE_URL: baseUrl,
      });

      expect(codex).toEqual(expect.objectContaining({ starterPackId: "codex", response: expect.objectContaining({ ok: true }) }));
      expect(claudeCode).toEqual(expect.objectContaining({ starterPackId: "claude-code", response: expect.objectContaining({ ok: true }) }));
      expect(openclaw).toEqual(expect.objectContaining({ starterPackId: "openclaw", response: expect.objectContaining({ ok: true }) }));
      expect(requests).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ provider: "chatgpt", lane: "web" }),
          expect.objectContaining({ provider: "claude", lane: "web" }),
          expect.objectContaining({ provider: "chatgpt", lane: "web" }),
        ]),
      );
    } finally {
      await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
    }
  });

  it(
    "runs the MCP pack against a mock runtime",
    async () => {
      const service = createServer((request, response) => {
        response.setHeader("content-type", "application/json");

        if (request.url === "/v1/runtime/health") {
          response.end(JSON.stringify({ totals: { ready: 5 } }));
          return;
        }

        response.statusCode = 404;
        response.end(JSON.stringify({ error: "not-found" }));
      });

      service.listen(0, "127.0.0.1");
      await once(service, "listening");
      const address = service.address();
      if (!address || typeof address === "string") {
        throw new Error("Expected MCP starter-pack test server to expose a TCP port.");
      }

      try {
        const output = await runPack("starter-packs/builders/mcp/smoke.mjs", {
          SWITCHYARD_RUNTIME_BASE_URL: `http://127.0.0.1:${address.port}`,
        });

        expect(output).toEqual(
          expect.objectContaining({
            starterPackId: "mcp",
            availableTools: expect.arrayContaining([
              "switchyard.runtime.health",
              "switchyard.catalog.starter_examples_schema",
            ]),
            toolResult: expect.objectContaining({ command: "health" }),
          }),
        );
      } finally {
        await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
      }
    },
    30_000,
  );

  it("runs the runtime diagnostics pack against mock provider routes", async () => {
    const service = createServer((request, response) => {
      response.setHeader("content-type", "application/json");

      if (request.url === "/v1/runtime/providers/chatgpt/status") {
        response.end(JSON.stringify({ provider: { providerId: "chatgpt", runtimeReadiness: "ready" } }));
        return;
      }

      if (request.url === "/v1/runtime/providers/chatgpt/probe") {
        response.end(JSON.stringify({ probe: { status: "ok" } }));
        return;
      }

      if (request.url === "/v1/runtime/providers/chatgpt/remediation") {
        response.end(JSON.stringify({ remediation: { status: "none" } }));
        return;
      }

      if (request.url === "/v1/runtime/providers/chatgpt/debug/support-bundle") {
        response.end(JSON.stringify({ debug: { attachTarget: { available: true } } }));
        return;
      }

      response.statusCode = 404;
      response.end(JSON.stringify({ error: "not-found" }));
    });

    service.listen(0, "127.0.0.1");
    await once(service, "listening");
    const address = service.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected diagnostics starter-pack test server to expose a TCP port.");
    }

    try {
      const output = await runPack("starter-packs/skills/runtime-diagnostics-pack/smoke.mjs", {
        SWITCHYARD_RUNTIME_BASE_URL: `http://127.0.0.1:${address.port}`,
      });

      expect(output).toEqual(
        expect.objectContaining({
          starterPackId: "runtime-diagnostics-pack",
          provider: "chatgpt",
          status: expect.objectContaining({ providerId: "chatgpt" }),
          probe: expect.objectContaining({ status: "ok" }),
          remediation: expect.objectContaining({ status: "none" }),
          supportBundle: expect.objectContaining({
            attachTarget: expect.objectContaining({ available: true }),
          }),
        }),
      );
    } finally {
      await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
    }
  });

  it("runs the docs SEO sync pack against repo-local truth surfaces", async () => {
    const output = await runPack("starter-packs/skills/docs-seo-sync-pack/smoke.mjs");

    expect(output).toEqual(
      expect.objectContaining({
        starterPackId: "docs-seo-sync-pack",
        publicSurfaceCount: expect.any(Number),
        compatTargetCount: expect.any(Number),
        keywordTruthHasSwitchyard: true,
        supportMatrixHasPartial: true,
      }),
    );
  });
});
