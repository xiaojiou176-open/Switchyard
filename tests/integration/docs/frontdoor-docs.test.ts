import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import Ajv2020 from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();

function read(relativePath: string) {
  return readFileSync(resolve(repoRoot, relativePath), "utf8");
}

const hanRegex = /[\p{Script=Han}]/u;

describe("Switchyard docs frontdoor contracts", () => {
  it("keeps the docs frontdoor linked to the current API, compat, MCP, i18n, and testing guides", () => {
    const docsReadme = read("docs/README.md");

    expect(docsReadme).toContain("docs/api/service-http-reference.md");
    expect(docsReadme).toContain("docs/api/openapi.yaml");
    expect(docsReadme).toContain("docs/api/sdk-quickstart.md");
    expect(docsReadme).toContain("docs/api/mcp-readonly-server.md");
    expect(docsReadme).toContain("docs/api/error-diagnostics-reference.md");
    expect(docsReadme).toContain("docs/api/web-login-acquisition.md");
    expect(docsReadme).toContain("docs/public-surface-support-matrix.md");
    expect(docsReadme).toContain("docs/public-surface-catalog.md");
    expect(docsReadme).toContain("docs/public-surface-catalog.schema.json");
    expect(docsReadme).toContain("docs/plugin-skill-starter-kits.md");
    expect(docsReadme).toContain("docs/media/30-second-overview.md");
    expect(docsReadme).toContain("docs/first-success.md");
    expect(docsReadme).toContain("docs/public-proof-pack.md");
    expect(docsReadme).toContain("docs/provider-runtime-catalog.md");
    expect(docsReadme).toContain("docs/provider-runtime-catalog.json");
    expect(docsReadme).toContain("docs/provider-runtime-catalog.schema.json");
    expect(docsReadme).toContain("docs/compat-target-catalog.md");
    expect(docsReadme).toContain("docs/compat-target-catalog.json");
    expect(docsReadme).toContain("docs/compat-target-catalog.schema.json");
    expect(docsReadme).toContain("docs/builder-kit-catalog.md");
    expect(docsReadme).toContain("docs/builder-kit-catalog.json");
    expect(docsReadme).toContain("docs/builder-kit-catalog.schema.json");
    expect(docsReadme).toContain("docs/skill-pack-catalog.md");
    expect(docsReadme).toContain("docs/skill-pack-catalog.json");
    expect(docsReadme).toContain("docs/skill-pack-catalog.schema.json");
    expect(docsReadme).toContain("docs/mcp-tool-catalog.md");
    expect(docsReadme).toContain("docs/mcp-tool-catalog.json");
    expect(docsReadme).toContain("docs/mcp-tool-catalog.schema.json");
    expect(docsReadme).toContain("docs/starter-manifest-templates.md");
    expect(docsReadme).toContain("docs/starter-manifest-templates.schema.json");
    expect(docsReadme).toContain("docs/starter-manifest-examples.md");
    expect(docsReadme).toContain("docs/starter-manifest-examples.schema.json");
    expect(docsReadme).toContain("examples/README.md");
    expect(docsReadme).toContain("starter-packs/README.md");
    expect(docsReadme).toContain("docs/starter-pack-index.md");
    expect(docsReadme).toContain("docs/starter-pack-chooser.md");
    expect(docsReadme).toContain("docs/starter-pack-comparison.md");
    expect(docsReadme).toContain("docs/builder-journeys.md");
    expect(docsReadme).toContain("docs/builder-intent-router.md");
    expect(docsReadme).toContain("docs/builder-intent-router.json");
    expect(docsReadme).toContain("docs/builder-intent-router.schema.json");
    expect(docsReadme).toContain("docs/host-integration-playbooks.md");
    expect(docsReadme).toContain("docs/host-integration-examples.md");
    expect(docsReadme).toContain("docs/blueprints/m2-kernel-beta-verdict.md");
    expect(docsReadme).toContain("docs/blueprints/m3-first-party-integration-readiness.md");
    expect(docsReadme).toContain("docs/blueprints/openclaw-zero-token-adoption-ledger.md");
    expect(docsReadme).toContain("docs/compat/README.md");
    expect(docsReadme).toContain("docs/compat/codex.md");
    expect(docsReadme).toContain("docs/compat/claude-code.md");
    expect(docsReadme).toContain("docs/compat/openclaw.md");
    expect(docsReadme).toContain("docs/compare/switchyard-vs-codex.md");
    expect(docsReadme).toContain("docs/compare/switchyard-vs-claude-code.md");
    expect(docsReadme).toContain("docs/mcp.md");
    expect(docsReadme).toContain("docs/i18n.md");
    expect(docsReadme).toContain("docs/testing-pyramid.md");
    expect(docsReadme).toContain("docs/discoverability-keyword-truth.md");
    expect(docsReadme).toContain("docs/discoverability-keyword-truth.json");
    expect(docsReadme).toContain("docs/discoverability-keyword-truth.schema.json");
  });

  it("keeps the primary public frontdoor English-first while allowing helper-page bilingual support", () => {
    const frontdoorFiles = [
      "README.md",
      "docs/README.md",
      "docs/index.html",
      "docs/media/30-second-overview.md",
      "docs/first-success.md",
      "docs/public-proof-pack.md",
      "docs/public-distribution-ledger.md",
      "docs/public-surface-support-matrix.md",
      "docs/public-surface-catalog.md",
      "docs/shared-provider-runtime.md",
      "docs/product/v1-brief.md",
      "docs/product/scope-and-nongoals.md",
      "docs/compat/README.md",
      "docs/compat/codex.md",
      "docs/compat/claude-code.md",
      "docs/compat/openclaw.md",
      "docs/compare/byok-vs-web-login.md",
      "docs/compare/switchyard-vs-codex.md",
      "docs/compare/switchyard-vs-claude-code.md",
      "docs/compare/switchyard-vs-openclaw.md",
      "docs/mcp.md",
    ];

    for (const relativePath of frontdoorFiles) {
      expect(hanRegex.test(read(relativePath))).toBe(false);
    }

    const readme = read("README.md");
    const docsReadme = read("docs/README.md");
    const i18n = read("docs/i18n.md");

    expect(readme).toContain("English-first");
    expect(docsReadme).toContain("English-first");
    expect(i18n).toContain("English-first");
    expect(i18n).toContain("bilingual helper pages");
    expect(i18n).not.toContain("bilingual developer frontdoor");

    const docsIndex = read("docs/index.html");
    expect(docsIndex).toContain("Switchyard Docs Atlas");
    expect(docsIndex).toContain("Choose the shortest truthful route");
    expect(docsIndex).toContain("Open first success");
    expect(docsIndex).toContain("public-proof-pack.html");
    expect(docsIndex).toContain("public-distribution-ledger.html");
  });

  it("keeps compat claims explicitly fail-closed instead of full support", () => {
    const codexCompat = read("docs/compat/codex.md");
    const claudeCodeCompat = read("docs/compat/claude-code.md");
    const openclawCompat = read("docs/compat/openclaw.md");
    const mcpDocs = read("docs/mcp.md");
    const codexCompare = read("docs/compare/switchyard-vs-codex.md");
    const claudeCompare = read("docs/compare/switchyard-vs-claude-code.md");

    for (const document of [codexCompat, claudeCodeCompat, openclawCompat]) {
      expect(/`(planned|partial)`/.test(document)).toBe(true);
      expect(document).toContain("thin");
      expect(document.toLowerCase()).toContain("not supported yet");
      expect(document.toLowerCase()).not.toContain("supported now");
    }

    expect(mcpDocs).toContain("read-only stdio MCP server/tool surface on main");
    expect(mcpDocs).toContain("pnpm run switchyard:mcp");
    expect(codexCompare).toContain("`partial`");
    expect(codexCompare.toLowerCase()).not.toContain("does **not** support codex compatibility today");
    expect(claudeCompare).toContain("`partial`");
    expect(claudeCompare.toLowerCase()).not.toContain("does **not** support claude code today");
  });

  it("keeps MCP docs aligned with the current read-only tool inventory and route map", () => {
    const mcpDocs = read("docs/mcp.md");
    const mcpApi = read("docs/api/mcp-readonly-server.md");
    const catalogJson = JSON.parse(read("docs/public-surface-catalog.json")) as {
      mcp: { tools: Array<{ name: string }> };
    };
    const mcpToolNames = catalogJson.mcp.tools.map((tool) => tool.name);

    expect(mcpDocs).toContain("switchyard.catalog.starter_pack_index");
    expect(mcpDocs).toContain("switchyard.catalog.starter_pack_comparison");
    expect(mcpDocs).toContain("switchyard.catalog.starter_pack_chooser");
    expect(mcpDocs).toContain("switchyard.catalog.host_playbooks");
    expect(mcpDocs).toContain("switchyard.catalog.host_playbook");
    expect(mcpDocs).toContain("switchyard.catalog.host_example");
    expect(mcpDocs).toContain("switchyard.catalog.host_examples_schema");
    expect(mcpDocs).toContain("switchyard.catalog.builder_journeys");
    expect(mcpDocs).toContain("switchyard.catalog.keyword_truth");
    expect(mcpDocs).toContain("switchyard.catalog.keyword_entry");
    expect(mcpDocs).toContain("switchyard.catalog.mcp_tools");
    expect(mcpDocs).toContain("Fastest Route By Question");
    expect(mcpDocs).toContain("read-only");
    expect(mcpDocs).toContain("not an execution brain");

    expect(mcpApi).toContain("switchyard.catalog.starter_pack_index");
    expect(mcpApi).toContain("switchyard.catalog.starter_pack_comparison_schema");
    expect(mcpApi).toContain("switchyard.catalog.starter_pack_chooser");
    expect(mcpApi).toContain("switchyard.catalog.host_playbooks");
    expect(mcpApi).toContain("switchyard.catalog.host_playbook");
    expect(mcpApi).toContain("switchyard.catalog.host_example");
    expect(mcpApi).toContain("switchyard.catalog.host_examples_schema");
    expect(mcpApi).toContain("switchyard.catalog.builder_journeys_schema");
    expect(mcpApi).toContain("switchyard.catalog.keyword_truth_schema");
    expect(mcpApi).toContain("switchyard.catalog.keyword_entry");
    expect(mcpApi).toContain("switchyard.catalog.mcp_status");
    expect(mcpApi).toContain("switchyard.catalog.mcp_tools");
    expect(mcpApi).toContain("Fastest Route By Question");
    expect(mcpApi).toContain("read-only");
    expect(mcpApi).toContain("partial");

    for (const toolName of mcpToolNames) {
      expect(mcpApi).toContain(toolName);
    }
  });

  it("keeps llms.txt pointing at the current docs frontdoor and truth tables", () => {
    const llms = read("llms.txt");

    expect(llms).toContain("docs/README.md");
    expect(llms).toContain("docs/media/30-second-overview.md");
    expect(llms).toContain("docs/first-success.md");
    expect(llms).toContain("docs/public-proof-pack.md");
    expect(llms).toContain("docs/api/service-http-reference.md");
    expect(llms).toContain("docs/api/openapi.yaml");
    expect(llms).toContain("docs/api/sdk-quickstart.md");
    expect(llms).toContain("docs/api/mcp-readonly-server.md");
    expect(llms).toContain("docs/api/error-diagnostics-reference.md");
    expect(llms).toContain("docs/api/web-login-acquisition.md");
    expect(llms).toContain("docs/compat/README.md");
    expect(llms).toContain("docs/public-surface-catalog.md");
    expect(llms).toContain("docs/public-surface-catalog.json");
    expect(llms).toContain("docs/public-surface-catalog.schema.json");
    expect(llms).toContain("docs/starter-manifest-templates.md");
    expect(llms).toContain("docs/starter-manifest-templates.schema.json");
    expect(llms).toContain("docs/starter-manifest-examples.md");
    expect(llms).toContain("docs/starter-manifest-examples.schema.json");
    expect(llms).toContain("examples/README.md");
    expect(llms).toContain("starter-packs/README.md");
    expect(llms).toContain("docs/starter-pack-index.md");
    expect(llms).toContain("docs/starter-pack-chooser.md");
    expect(llms).toContain("docs/starter-pack-chooser.json");
    expect(llms).toContain("docs/starter-pack-chooser.schema.json");
    expect(llms).toContain("docs/starter-pack-comparison.md");
    expect(llms).toContain("docs/starter-pack-comparison.json");
    expect(llms).toContain("docs/starter-pack-comparison.schema.json");
    expect(llms).toContain("docs/builder-journeys.md");
    expect(llms).toContain("docs/builder-journeys.json");
    expect(llms).toContain("docs/builder-journeys.schema.json");
    expect(llms).toContain("docs/builder-intent-router.md");
    expect(llms).toContain("docs/builder-intent-router.json");
    expect(llms).toContain("docs/builder-intent-router.schema.json");
    expect(llms).toContain("docs/host-integration-playbooks.md");
    expect(llms).toContain("docs/host-integration-playbooks.json");
    expect(llms).toContain("docs/host-integration-playbooks.schema.json");
    expect(llms).toContain("docs/host-integration-examples.md");
    expect(llms).toContain("examples/hosts/index.json");
    expect(llms).toContain("examples/hosts/index.schema.json");
    expect(llms).toContain("docs/provider-runtime-catalog.md");
    expect(llms).toContain("docs/provider-runtime-catalog.json");
    expect(llms).toContain("docs/provider-runtime-catalog.schema.json");
    expect(llms).toContain("docs/compat-target-catalog.md");
    expect(llms).toContain("docs/compat-target-catalog.json");
    expect(llms).toContain("docs/compat-target-catalog.schema.json");
    expect(llms).toContain("docs/builder-kit-catalog.md");
    expect(llms).toContain("docs/builder-kit-catalog.json");
    expect(llms).toContain("docs/builder-kit-catalog.schema.json");
    expect(llms).toContain("docs/skill-pack-catalog.md");
    expect(llms).toContain("docs/skill-pack-catalog.json");
    expect(llms).toContain("docs/skill-pack-catalog.schema.json");
    expect(llms).toContain("docs/mcp-tool-catalog.md");
    expect(llms).toContain("docs/mcp-tool-catalog.json");
    expect(llms).toContain("docs/mcp-tool-catalog.schema.json");
    expect(llms).toContain("docs/mcp.md");
    expect(llms).toContain("docs/i18n.md");
    expect(llms).toContain("docs/testing-pyramid.md");
    expect(llms).toContain("docs/discoverability-keyword-truth.md");
    expect(llms).toContain("docs/discoverability-keyword-truth.json");
    expect(llms).toContain("docs/discoverability-keyword-truth.schema.json");
    expect(llms).toContain(
      "Live verification depends on local end-user credentials and browser session materials",
    );
  });

  it("keeps the README developer frontdoor aligned with truthful compatibility and docs links", () => {
    const readme = read("README.md");

    expect(readme).toContain("Shared provider runtime for AI apps.");
    expect(readme).toContain("English-first");
    expect(readme).toContain("docs/media/30-second-overview.md");
    expect(readme).toContain("docs/first-success.md");
    expect(readme).toContain("docs/public-proof-pack.md");
    expect(readme).toContain("docs/api/service-http-reference.md");
    expect(readme).toContain("docs/api/openapi.yaml");
    expect(readme).toContain("docs/api/mcp-readonly-server.md");
    expect(readme).toContain("docs/api/web-login-acquisition.md");
    expect(readme).toContain("docs/compat/README.md");
    expect(readme).toContain("docs/mcp.md");
    expect(readme).toContain("docs/glossary.md");
    expect(readme).toContain("docs/testing-pyramid.md");
    expect(readme).toContain("pnpm run test:coverage");
    expect(readme).toContain("shared provider runtime");
    expect(readme).toContain("read-only MCP descriptor");
    expect(readme).toContain("runtime-diagnostics");
    expect(readme).toContain("Artifact-ready still does **not** mean listed-live");
    expect(readme).toContain("proof / runbook truth");
    expect(readme).toContain("credentialed workstation");
    expect(readme).toContain("docs/public-surface-support-matrix.md");
    expect(readme).toContain("docs/public-surface-catalog.md");
    expect(readme).toContain("docs/public-surface-catalog.schema.json");
    expect(readme).toContain("docs/starter-manifest-templates.md");
    expect(readme).toContain("docs/starter-manifest-templates.schema.json");
    expect(readme).toContain("docs/starter-manifest-examples.md");
    expect(readme).toContain("docs/starter-manifest-examples.schema.json");
    expect(readme).toContain("examples/README.md");
    expect(readme).toContain("starter-packs/README.md");
    expect(readme).toContain("docs/starter-pack-index.md");
    expect(readme).toContain("docs/starter-pack-chooser.md");
    expect(readme).toContain("docs/starter-pack-comparison.md");
    expect(readme).toContain("docs/builder-journeys.md");
    expect(readme).toContain("docs/builder-intent-router.md");
    expect(readme).toContain("docs/host-integration-playbooks.md");
    expect(readme).toContain("docs/host-integration-examples.md");
    expect(readme).toContain("docs/provider-runtime-catalog.md");
    expect(readme).toContain("docs/provider-runtime-catalog.json");
    expect(readme).toContain("docs/provider-runtime-catalog.schema.json");
    expect(readme).toContain("docs/compat-target-catalog.md");
    expect(readme).toContain("docs/compat-target-catalog.json");
    expect(readme).toContain("docs/compat-target-catalog.schema.json");
    expect(readme).toContain("docs/builder-kit-catalog.md");
    expect(readme).toContain("docs/builder-kit-catalog.json");
    expect(readme).toContain("docs/builder-kit-catalog.schema.json");
    expect(readme).toContain("docs/skill-pack-catalog.md");
    expect(readme).toContain("docs/skill-pack-catalog.json");
    expect(readme).toContain("docs/skill-pack-catalog.schema.json");
    expect(readme).toContain("docs/blueprints/m2-kernel-beta-verdict.md");
    expect(readme).toContain("docs/blueprints/m3-first-party-integration-readiness.md");
    expect(readme).toContain("docs/blueprints/openclaw-zero-token-adoption-ledger.md");
    expect(readme).toContain("docs/discoverability-keyword-truth.json");
    expect(readme).toContain("docs/discoverability-keyword-truth.schema.json");
    expect(readme).not.toContain("fresh `verify:service-live` 当前停在 `Gemini = user-action-required`");
    expect(readme).not.toContain("workspace external blocker pack");
    expect(readme).not.toContain("bilingual developer frontdoor");
  });

  it("keeps blocker wording and default service port aligned across frontdoor docs", () => {
    const readme = read("README.md");
    const proofPack = read("docs/public-proof-pack.md");
    const v1Plan = read("docs/blueprints/v1-delivery-plan.md");
    const openapi = read("docs/api/openapi.yaml");
    const serviceReference = read("docs/api/service-http-reference.md");
    const sdkQuickstart = read("docs/api/sdk-quickstart.md");
    const webLoginAcquisition = read("docs/api/web-login-acquisition.md");

    expect(readme).toContain("Live/browser outcomes are important");
    expect(readme).not.toContain("`Gemini / Grok`");
    expect(proofPack).toContain("`Gemini / Grok`");
    expect(v1Plan).toContain("`Gemini / Grok`");
    expect(v1Plan).toContain("live snapshot 继续放在 `docs/public-proof-pack.md`");
    expect(openapi).toContain("http://127.0.0.1:4010");
    expect(openapi).not.toContain("http://127.0.0.1:4317");
    expect(serviceReference).toContain("http://127.0.0.1:4010");
    expect(sdkQuickstart).toContain("http://127.0.0.1:4010");
    expect(webLoginAcquisition).toContain("http://127.0.0.1:4010");
  });

  it("keeps a machine-readable outward catalog linked from frontdoor docs", () => {
    const compatReadme = read("docs/compat/README.md");
    const faq = read("docs/faq.md");
    const catalogJson = JSON.parse(read("docs/public-surface-catalog.json"));
    const catalogSchema = JSON.parse(read("docs/public-surface-catalog.schema.json"));
    const starterTemplatesJson = JSON.parse(read("docs/starter-manifest-templates.json"));
    const starterTemplatesSchema = JSON.parse(read("docs/starter-manifest-templates.schema.json"));
    const starterExamplesJson = JSON.parse(read("docs/starter-manifest-examples.json"));
    const starterExamplesSchema = JSON.parse(read("docs/starter-manifest-examples.schema.json"));
    const starterPackIndexJson = JSON.parse(read("starter-packs/index.json"));
    const starterPackIndexSchema = JSON.parse(read("starter-packs/index.schema.json"));
    const starterPackChooserJson = JSON.parse(read("docs/starter-pack-chooser.json"));
    const starterPackChooserSchema = JSON.parse(read("docs/starter-pack-chooser.schema.json"));
    const starterPackComparisonJson = JSON.parse(read("docs/starter-pack-comparison.json"));
    const starterPackComparisonSchema = JSON.parse(read("docs/starter-pack-comparison.schema.json"));
    const builderJourneysJson = JSON.parse(read("docs/builder-journeys.json"));
    const builderJourneysSchema = JSON.parse(read("docs/builder-journeys.schema.json"));
    const builderIntentRouterDoc = read("docs/builder-intent-router.md");
    const builderIntentRouterJson = JSON.parse(read("docs/builder-intent-router.json"));
    const builderIntentRouterSchema = JSON.parse(read("docs/builder-intent-router.schema.json"));
    const providerRuntimeCatalogDoc = read("docs/provider-runtime-catalog.md");
    const providerRuntimeCatalogJson = JSON.parse(read("docs/provider-runtime-catalog.json"));
    const providerRuntimeCatalogSchema = JSON.parse(read("docs/provider-runtime-catalog.schema.json"));
    const compatTargetCatalogDoc = read("docs/compat-target-catalog.md");
    const compatTargetCatalogJson = JSON.parse(read("docs/compat-target-catalog.json"));
    const compatTargetCatalogSchema = JSON.parse(read("docs/compat-target-catalog.schema.json"));
    const builderKitCatalogDoc = read("docs/builder-kit-catalog.md");
    const builderKitCatalogJson = JSON.parse(read("docs/builder-kit-catalog.json"));
    const builderKitCatalogSchema = JSON.parse(read("docs/builder-kit-catalog.schema.json"));
    const skillPackCatalogDoc = read("docs/skill-pack-catalog.md");
    const skillPackCatalogJson = JSON.parse(read("docs/skill-pack-catalog.json"));
    const skillPackCatalogSchema = JSON.parse(read("docs/skill-pack-catalog.schema.json"));
    const mcpToolCatalogDoc = read("docs/mcp-tool-catalog.md");
    const mcpToolCatalogJson = JSON.parse(read("docs/mcp-tool-catalog.json"));
    const mcpToolCatalogSchema = JSON.parse(read("docs/mcp-tool-catalog.schema.json"));
    const keywordTruthDoc = read("docs/discoverability-keyword-truth.md");
    const keywordTruthJson = JSON.parse(read("docs/discoverability-keyword-truth.json"));
    const keywordTruthSchema = JSON.parse(read("docs/discoverability-keyword-truth.schema.json"));
    const hostPlaybooksJson = JSON.parse(read("docs/host-integration-playbooks.json"));
    const hostPlaybooksSchema = JSON.parse(read("docs/host-integration-playbooks.schema.json"));
    const hostExamplesDoc = read("docs/host-integration-examples.md");
    const hostExamplesJson = JSON.parse(read("examples/hosts/index.json"));
    const hostExamplesSchema = JSON.parse(read("examples/hosts/index.schema.json"));

    expect(compatReadme).toContain("docs/compat/codex.md");
    expect(compatReadme).toContain("docs/compat/claude-code.md");
    expect(compatReadme).toContain("docs/compat/openclaw.md");
    expect(compatReadme).toContain("docs/public-distribution-ledger.md");
    expect(compatReadme).toContain("docs/public-surface-catalog.md");
    expect(compatReadme).toContain("docs/README.md");
    expect(compatReadme).toContain("pnpm run switchyard:cli -- public-distribution-ledger");
    expect(compatReadme).toContain("pnpm run switchyard:cli -- surface-catalog");
    expect(compatReadme).toContain("pnpm run switchyard:cli -- compat-target-catalog");
    expect(faq).toContain("pnpm run switchyard:cli -- surface-catalog");
    expect(faq).toContain("pnpm run switchyard:cli -- surface-catalog-schema");
    expect(faq).toContain("pnpm run switchyard:cli -- builder-kits");
    expect(faq).toContain("pnpm run switchyard:cli -- skill-packs");
    expect(faq).toContain("pnpm run switchyard:cli -- provider-catalog");
    expect(faq).toContain("pnpm run switchyard:cli -- provider-catalog-schema");
    expect(faq).toContain("pnpm run switchyard:cli -- compat-target-catalog");
    expect(faq).toContain("pnpm run switchyard:cli -- compat-target-catalog-schema");
    expect(faq).toContain("docs/compat-target-catalog.json");
    expect(faq).toContain("docs/compat-target-catalog.schema.json");
    expect(faq).toContain("pnpm run switchyard:cli -- builder-kit-catalog");
    expect(faq).toContain("pnpm run switchyard:cli -- builder-kit-catalog-schema");
    expect(faq).toContain("docs/builder-kit-catalog.json");
    expect(faq).toContain("docs/builder-kit-catalog.schema.json");
    expect(faq).toContain("pnpm run switchyard:cli -- skill-pack-catalog");
    expect(faq).toContain("pnpm run switchyard:cli -- skill-pack-catalog-schema");
    expect(faq).toContain("docs/skill-pack-catalog.json");
    expect(faq).toContain("docs/skill-pack-catalog.schema.json");
    expect(faq).toContain("pnpm run switchyard:cli -- starter-manifests");
    expect(faq).toContain("pnpm run switchyard:cli -- starter-manifests-schema");
    expect(faq).toContain("pnpm run switchyard:cli -- starter-examples");
    expect(faq).toContain("pnpm run switchyard:cli -- starter-examples-schema");
    expect(faq).toContain("pnpm run switchyard:cli -- starter-pack-chooser");
    expect(faq).toContain("docs/starter-pack-chooser.json");
    expect(faq).toContain("pnpm run switchyard:cli -- starter-pack-comparison");
    expect(faq).toContain("docs/starter-pack-comparison.json");
    expect(faq).toContain("pnpm run switchyard:cli -- builder-journeys");
    expect(faq).toContain("docs/builder-journeys.md");
    expect(faq).toContain("pnpm run switchyard:cli -- builder-intent-router");
    expect(faq).toContain("switchyard.catalog.builder_intent_router");
    expect(faq).toContain("pnpm run switchyard:cli -- keyword-truth");
    expect(faq).toContain("pnpm run switchyard:cli -- keyword-truth-schema");
    expect(faq).toContain("pnpm run switchyard:cli -- keyword-entry --target switchyard-mcp");
    expect(faq).toContain("docs/discoverability-keyword-truth.json");
    expect(faq).toContain("docs/discoverability-keyword-truth.schema.json");
    expect(faq).toContain("docs/builder-intent-router.json");
    expect(faq).toContain("docs/builder-intent-router.schema.json");
    expect(providerRuntimeCatalogDoc).toContain("docs/provider-runtime-catalog.json");
    expect(providerRuntimeCatalogDoc).toContain("docs/provider-runtime-catalog.schema.json");
    expect(providerRuntimeCatalogDoc).toContain("pnpm run switchyard:cli -- provider-catalog-schema");
    expect(providerRuntimeCatalogDoc).toContain("switchyard.catalog.provider_catalog_schema");
    expect(providerRuntimeCatalogDoc).toContain("providerId + lane");
    expect(providerRuntimeCatalogDoc).toContain("providerId:lane");
    expect(compatTargetCatalogDoc).toContain("docs/compat-target-catalog.json");
    expect(compatTargetCatalogDoc).toContain("docs/compat-target-catalog.schema.json");
    expect(compatTargetCatalogDoc).toContain("pnpm run switchyard:cli -- compat-target-catalog");
    expect(compatTargetCatalogDoc).toContain("switchyard.catalog.compat_target_catalog");
    expect(compatTargetCatalogDoc).toContain("fail-closed");
    expect(builderKitCatalogDoc).toContain("docs/builder-kit-catalog.json");
    expect(builderKitCatalogDoc).toContain("docs/builder-kit-catalog.schema.json");
    expect(builderKitCatalogDoc).toContain("pnpm run switchyard:cli -- builder-kit-catalog");
    expect(builderKitCatalogDoc).toContain("switchyard.catalog.builder_kit_catalog");
    expect(builderKitCatalogDoc).toContain("fail-closed");
    expect(skillPackCatalogDoc).toContain("docs/skill-pack-catalog.json");
    expect(skillPackCatalogDoc).toContain("docs/skill-pack-catalog.schema.json");
    expect(skillPackCatalogDoc).toContain("pnpm run switchyard:cli -- skill-pack-catalog");
    expect(skillPackCatalogDoc).toContain("switchyard.catalog.skill_pack_catalog");
    expect(skillPackCatalogDoc).toContain("notYetSupported");
    expect(mcpToolCatalogDoc).toContain("docs/mcp-tool-catalog.json");
    expect(mcpToolCatalogDoc).toContain("pnpm run switchyard:cli -- mcp-tool-catalog");
    expect(mcpToolCatalogDoc).toContain("switchyard.catalog.mcp_tool_catalog");
    expect(builderIntentRouterDoc).toContain("docs/builder-intent-router.json");
    expect(builderIntentRouterDoc).toContain("pnpm run switchyard:cli -- builder-intent-router");
    expect(builderIntentRouterDoc).toContain("switchyard.catalog.builder_intent_router");
    expect(faq).toContain("switchyard.catalog.keyword_truth");
    expect(keywordTruthDoc).toContain("docs/discoverability-keyword-truth.json");
    expect(keywordTruthDoc).toContain("pnpm run switchyard:cli -- keyword-truth");
    expect(keywordTruthDoc).toContain("switchyard.catalog.keyword_truth");
    expect(faq).toContain("pnpm run switchyard:cli -- host-playbooks");
    expect(faq).toContain("docs/host-integration-playbooks.json");
    expect(faq).toContain("pnpm run switchyard:cli -- host-examples");
    expect(faq).toContain("pnpm run switchyard:cli -- host-example --target mcp");
    expect(faq).toContain("examples/hosts/index.json");
    expect(hostExamplesDoc).toContain("examples/hosts/index.json");
    expect(hostExamplesDoc).toContain("pnpm run switchyard:cli -- host-example --target codex");
    expect(hostExamplesDoc).toContain("pnpm run example:host-codex");
    const ajv = new Ajv2020({
      strict: false,
    });
    const validate = ajv.compile(catalogSchema);
    expect(validate(catalogJson)).toBe(true);
    const validateStarterTemplates = ajv.compile(starterTemplatesSchema);
    expect(validateStarterTemplates(starterTemplatesJson)).toBe(true);
    const validateStarterExamples = ajv.compile(starterExamplesSchema);
    expect(validateStarterExamples(starterExamplesJson)).toBe(true);
    const validateStarterPackIndex = ajv.compile(starterPackIndexSchema);
    expect(validateStarterPackIndex(starterPackIndexJson)).toBe(true);
    const validateStarterPackChooser = ajv.compile(starterPackChooserSchema);
    expect(validateStarterPackChooser(starterPackChooserJson)).toBe(true);
    const validateStarterPackComparison = ajv.compile(starterPackComparisonSchema);
    expect(validateStarterPackComparison(starterPackComparisonJson)).toBe(true);
    const validateBuilderJourneys = ajv.compile(builderJourneysSchema);
    expect(validateBuilderJourneys(builderJourneysJson)).toBe(true);
    const validateBuilderIntentRouter = ajv.compile(builderIntentRouterSchema);
    expect(validateBuilderIntentRouter(builderIntentRouterJson)).toBe(true);
    const validateProviderRuntimeCatalog = ajv.compile(providerRuntimeCatalogSchema);
    expect(validateProviderRuntimeCatalog(providerRuntimeCatalogJson)).toBe(true);
    const validateCompatTargetCatalog = ajv.compile(compatTargetCatalogSchema);
    expect(validateCompatTargetCatalog(compatTargetCatalogJson)).toBe(true);
    const validateBuilderKitCatalog = ajv.compile(builderKitCatalogSchema);
    expect(validateBuilderKitCatalog(builderKitCatalogJson)).toBe(true);
    const validateSkillPackCatalog = ajv.compile(skillPackCatalogSchema);
    expect(validateSkillPackCatalog(skillPackCatalogJson)).toBe(true);
    const validateKeywordTruth = ajv.compile(keywordTruthSchema);
    expect(validateKeywordTruth(keywordTruthJson)).toBe(true);
    const validateHostPlaybooks = ajv.compile(hostPlaybooksSchema);
    expect(validateHostPlaybooks(hostPlaybooksJson)).toBe(true);
    const validateHostExamples = ajv.compile(hostExamplesSchema);
    expect(validateHostExamples(hostExamplesJson)).toBe(true);
    expect(catalogJson.publicSurfaces).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          surface: "CLI",
          status: "partial",
          commands: expect.arrayContaining([
            "surface-catalog-schema",
            "compat-target-catalog",
            "compat-target-catalog-schema",
            "builder-kit-catalog",
            "builder-kit-catalog-schema",
            "skill-pack-catalog",
            "skill-pack-catalog-schema",
            "provider-catalog",
            "starter-manifests",
            "starter-manifests-schema",
            "starter-examples",
            "starter-examples-schema",
            "starter-pack-index",
            "starter-pack-index-schema",
            "starter-pack-entry",
            "host-playbooks",
            "host-playbooks-schema",
            "host-playbook",
            "host-examples",
            "host-examples-schema",
            "host-example",
            "starter-pack-chooser",
            "starter-pack-chooser-schema",
            "starter-pack-scenario",
            "starter-pack-comparison",
            "starter-pack-comparison-schema",
            "starter-pack-filter",
            "builder-journeys",
            "builder-journeys-schema",
            "builder-journey",
            "builder-intent-router",
            "builder-intent-router-schema",
            "builder-intent",
            "keyword-truth",
            "keyword-truth-schema",
            "keyword-entry",
            "provider-catalog-schema",
            "mcp-tool-catalog",
            "mcp-tool-catalog-schema",
            "mcp-tool",
            "builder-template",
            "builder-example",
            "skill-template",
            "skill-example",
          ]),
        }),
        expect.objectContaining({ surface: "MCP", status: "partial" }),
      ]),
    );
    expect(catalogJson.builderKits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ target: "codex", copyReadyPackPath: "starter-packs/builders/codex" }),
        expect.objectContaining({ target: "claude-code", copyReadyPackPath: "starter-packs/builders/claude-code" }),
        expect.objectContaining({ target: "openclaw", copyReadyPackPath: "starter-packs/builders/openclaw" }),
        expect.objectContaining({ target: "mcp", copyReadyPackPath: "starter-packs/builders/mcp" }),
      ]),
    );
    expect(catalogJson.skillPacks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "runtime-diagnostics-pack", copyReadyPackPath: "starter-packs/skills/runtime-diagnostics-pack" }),
        expect.objectContaining({ id: "docs-seo-sync-pack", copyReadyPackPath: "starter-packs/skills/docs-seo-sync-pack" }),
      ]),
    );
    expect(catalogJson.hostExamples).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          target: "codex",
          examplePath: "examples/hosts/codex",
          bestEntry: "pnpm run switchyard:cli -- host-example --target codex",
          smokeCommand: "pnpm run example:host-codex",
          firstSuccessCheck: expect.any(String),
        }),
        expect.objectContaining({ target: "claude-code", examplePath: "examples/hosts/claude-code" }),
        expect.objectContaining({ target: "openclaw", examplePath: "examples/hosts/openclaw" }),
        expect.objectContaining({
          target: "mcp",
          examplePath: "examples/hosts/mcp",
          bestEntry: "pnpm run switchyard:cli -- host-example --target mcp",
          smokeCommand: "pnpm run example:host-mcp",
          firstSuccessCheck: expect.any(String),
        }),
      ]),
    );
    expect(catalogJson.providerCatalog).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ providerId: "chatgpt", lane: "web-login" }),
        expect.objectContaining({ providerId: "openai", lane: "byok" }),
      ]),
    );
    expect(providerRuntimeCatalogJson.providers).toEqual(catalogJson.providerCatalog);
    expect(catalogJson.compatTargets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ target: "codex", status: "partial" }),
        expect.objectContaining({ target: "claude-code", status: "partial" }),
        expect.objectContaining({ target: "openclaw", status: "partial" }),
      ]),
    );
    expect(compatTargetCatalogJson.targets).toEqual(catalogJson.compatTargets);
    expect(builderKitCatalogJson.kits).toEqual(catalogJson.builderKits);
    expect(skillPackCatalogJson.packs).toEqual(catalogJson.skillPacks);
    expect(catalogJson.mcp.tools).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "switchyard.catalog.compat_target_catalog" }),
        expect.objectContaining({ name: "switchyard.catalog.compat_target_catalog_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_kit_catalog" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_kit_catalog_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.skill_pack_catalog" }),
        expect.objectContaining({ name: "switchyard.catalog.skill_pack_catalog_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_manifests_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_examples_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_pack_index" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_pack_entry" }),
        expect.objectContaining({ name: "switchyard.catalog.host_playbooks" }),
        expect.objectContaining({ name: "switchyard.catalog.host_playbook" }),
        expect.objectContaining({ name: "switchyard.catalog.host_examples" }),
        expect.objectContaining({ name: "switchyard.catalog.host_example" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_pack_chooser" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_pack_scenario" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_pack_comparison" }),
        expect.objectContaining({ name: "switchyard.catalog.starter_pack_filter" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_journeys" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_journey" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_intent_router" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_intent_router_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.builder_intent" }),
        expect.objectContaining({ name: "switchyard.catalog.keyword_truth" }),
        expect.objectContaining({ name: "switchyard.catalog.keyword_truth_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.keyword_entry" }),
        expect.objectContaining({ name: "switchyard.catalog.provider_catalog_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.mcp_tool_catalog" }),
        expect.objectContaining({ name: "switchyard.catalog.mcp_tool_catalog_schema" }),
        expect.objectContaining({ name: "switchyard.catalog.mcp_tool" }),
      ]),
    );
    const validateMcpToolCatalog = ajv.compile(mcpToolCatalogSchema);
    expect(validateMcpToolCatalog(mcpToolCatalogJson)).toBe(true);
    expect(mcpToolCatalogJson.tools).toEqual(catalogJson.mcp.tools);
    expect(
      mcpToolCatalogJson.tools.find((tool: { name: string; route: string }) => tool.name === "switchyard.catalog.compat_targets")
        ?.route,
    ).toBe("docs/compat-target-catalog.json#targets");
    expect(
      mcpToolCatalogJson.tools.find((tool: { name: string; route: string }) => tool.name === "switchyard.catalog.compat_target")
        ?.route,
    ).toBe("docs/compat-target-catalog.json#targets[target]");
    expect(
      mcpToolCatalogJson.tools.find((tool: { name: string; route: string }) => tool.name === "switchyard.catalog.builder_kits")
        ?.route,
    ).toBe("docs/builder-kit-catalog.json#kits");
    expect(
      mcpToolCatalogJson.tools.find((tool: { name: string; route: string }) => tool.name === "switchyard.catalog.builder_kit")
        ?.route,
    ).toBe("docs/builder-kit-catalog.json#kits[target]");
    expect(
      mcpToolCatalogJson.tools.find((tool: { name: string; route: string }) => tool.name === "switchyard.catalog.skill_packs")
        ?.route,
    ).toBe("docs/skill-pack-catalog.json#packs");
    expect(
      mcpToolCatalogJson.tools.find((tool: { name: string; route: string }) => tool.name === "switchyard.catalog.skill_pack")
        ?.route,
    ).toBe("docs/skill-pack-catalog.json#packs[id]");
    expect(new Set(mcpToolCatalogJson.tools.map((tool: { name: string }) => tool.name)).size).toBe(
      mcpToolCatalogJson.tools.length,
    );
    expect(builderIntentRouterJson.intents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "support-truth", firstHopDoc: "docs/public-surface-catalog.md" }),
        expect.objectContaining({ id: "keyword-claim-truth", firstHopDoc: "docs/discoverability-keyword-truth.md" }),
        expect.objectContaining({ id: "inspect-read-only-mcp", firstHopDoc: "docs/mcp.md" }),
      ]),
    );
    expect(keywordTruthJson.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "switchyard-shared-provider-runtime", truthStatus: "claimable-now" }),
        expect.objectContaining({ id: "byok", truthStatus: "claimable-now" }),
        expect.objectContaining({ id: "web-login", truthStatus: "claimable-now" }),
        expect.objectContaining({ id: "service-first-ai-runtime", truthStatus: "claimable-now" }),
        expect.objectContaining({ id: "api-substrate-first", truthStatus: "claimable-now" }),
        expect.objectContaining({ id: "switchyard-mcp", truthStatus: "partial-with-label" }),
        expect.objectContaining({
          id: "switchyard-mcp",
          requiredLabels: expect.arrayContaining([
            "not full Codex / Claude Code backend parity",
          ]),
        }),
        expect.objectContaining({ id: "mcp-execution-backend", truthStatus: "not-claimable" }),
      ]),
    );
    expect(starterPackIndexJson.builderPacks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ target: "codex", kind: "builder" }),
        expect.objectContaining({ target: "mcp", kind: "builder" }),
      ]),
    );
    expect(starterPackIndexJson.skillPacks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "runtime-diagnostics-pack", kind: "skill" }),
        expect.objectContaining({ id: "docs-seo-sync-pack", kind: "skill" }),
      ]),
    );
    expect(starterPackChooserJson.scenarios).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "codex-builder", recommendedPack: "codex" }),
        expect.objectContaining({ id: "mcp-inspector", recommendedPack: "mcp" }),
      ]),
    );
    expect(starterPackComparisonJson.filters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "thin-runtime-bridges" }),
        expect.objectContaining({ id: "read-only-truth" }),
      ]),
    );
    expect(starterPackComparisonJson.comparisons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "codex-builder", recommendedPack: "codex" }),
        expect.objectContaining({ id: "docs-seo-sync-skill", recommendedPack: "docs-seo-sync-pack" }),
      ]),
    );
    expect(builderJourneysJson.journeys).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "codex-first-success", runnableCommand: "pnpm run example:host-codex" }),
        expect.objectContaining({ id: "docs-seo-truth-sync", runnableCommand: "pnpm run starter-pack:docs-seo-sync-pack" }),
      ]),
    );
    expect(hostPlaybooksJson.playbooks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ host: "codex", recommendedPack: "codex" }),
        expect.objectContaining({ host: "mcp", recommendedPack: "mcp" }),
      ]),
    );
    expect(hostExamplesJson.hostExamples).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ target: "codex", examplePath: "examples/hosts/codex" }),
        expect.objectContaining({ target: "mcp", examplePath: "examples/hosts/mcp" }),
      ]),
    );
  });
});
