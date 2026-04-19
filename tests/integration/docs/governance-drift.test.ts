import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();

function read(relativePath: string) {
  return readFileSync(resolve(repoRoot, relativePath), "utf8");
}

describe("Switchyard docs and design governance drift contracts", () => {
  it("keeps public-plane truth aligned with fail-closed runtime wording", () => {
    const supportMatrix = read("docs/public-surface-support-matrix.md");
    const proofPack = read("docs/public-proof-pack.md");
    const serviceContract = read(".agents/internal-docs/contracts/service-and-sdk-surfaces.md");

    expect(serviceContract).toContain("API substrate first");
    expect(serviceContract).toContain("service-first");
    expect(supportMatrix).toContain("`HTTP/API` | `supported now`");
    expect(supportMatrix).toContain("`SDK/client` | `partial`");
    expect(supportMatrix).toContain("`CLI` | `partial`");
    expect(supportMatrix).toContain("`MCP` | `partial`");
    expect(supportMatrix).toContain("read-only");
    expect(supportMatrix).toContain("not an execution brain");
    expect(proofPack).toContain("shared provider runtime for AI apps");
    expect(proofPack).toContain("BYOK + Web/Login");
    expect(proofPack).toContain("partial thin compat");
    expect(proofPack).toContain("partial read-only MCP surface");
    expect(proofPack).toContain("## Forbidden Overclaims");
    expect(proofPack).toContain("`full Codex parity`");
    expect(proofPack).toContain("`full Claude Code parity`");
    expect(proofPack).toContain("`full OpenClaw parity`");
  });

  it("keeps design absorption pinned to the declared donor boundary", () => {
    const donorContract = read(".agents/internal-docs/contracts/design-mother-strategy.md");
    const stitchDesign = read(".stitch/DESIGN.md");
    const designMaster = read("design-system/MASTER.md");
    const donorLedger = read("design-system/DONOR_ABSORPTION_LEDGER.md");
    const authPortalMaster = read("design-system/switchyard-auth-portal/MASTER.md");
    const debugWorkbenchMaster = read("design-system/switchyard-debug-cockpit/MASTER.md");

    expect(donorContract).toContain("Linear");
    expect(donorContract).toContain("Raycast");
    expect(donorContract).toContain("Mintlify");
    expect(donorContract).toContain("Do not use `Raycast` as the primary application shell.");
    expect(donorContract).toContain("Do not use `Mintlify` as the primary runtime/workbench shell.");

    expect(stitchDesign).toContain("`Linear` is the primary mother for authenticated app/runtime/workbench");
    expect(stitchDesign).toContain("`Mintlify` is restricted to docs/public knowledge surfaces only");
    expect(stitchDesign).toContain("CLI and MCP are read-only inspection companions, not an execution brain");

    expect(designMaster).toContain("| Auth portal shell and first screen | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` | `Raycast` utility chrome only | no `Mintlify` shell, no Raycast-as-shell |");
    expect(designMaster).toContain("| Debug cockpit shell and evidence flow | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` | `Raycast` utility chrome only | no `Mintlify` shell, no desktop-launcher personality |");
    expect(designMaster).toContain("| README / docs front door / public help/reference | outside this wave | `Mintlify` | `Linear` restraint for proof cards | not a target for the current implementation slice |");
    expect(donorLedger).toContain("## [Confirmed] Surface Ledger");
    expect(donorLedger).toContain("| Auth portal shell | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` |");
    expect(donorLedger).toContain("| Debug cockpit shell | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` |");
    expect(donorLedger).toContain("| Public docs and help surfaces | `.agents/internal-docs/contracts/design-mother-strategy.md` | `Mintlify` |");

    expect(authPortalMaster).toContain("| Page shell | `Linear` | dark operational shell, dense-but-calm grouping, border-led structure, sustained readability | no `Mintlify` page shell, no `Raycast` launcher feel as the full page identity |");
    expect(authPortalMaster).toContain("| Quick actions or command-like entrypoints | `Raycast` utility chrome only | keyboard hints, compact quick actions, transient command grammar | must stay secondary to the page shell, must not become the primary navigation model |");
    expect(authPortalMaster).toContain('no "Contact Sales" or "Learn More" style primary CTA');

    expect(debugWorkbenchMaster).toContain("| Page shell | `Linear` | dense-but-calm shell, evidence-first hierarchy, border-led grouping, long-session readability | no `Mintlify` shell, no `Raycast` launcher shell, no glossy cockpit theater |");
    expect(debugWorkbenchMaster).toContain("| Quick actions or overlays | `Raycast` utility chrome only | compact keyboard-first actions, transient overlays, launcher-like assistive controls | must stay subordinate to evidence flow, must not become the primary navigation model |");
    expect(debugWorkbenchMaster).toContain("read-only diagnosis bench");
  });

  it("keeps moved docs wrappers out of the public docs plane while preserving machine-readable routes", () => {
    const docsReadme = read("docs/README.md");
    const publicSurfaceCatalog = read("docs/public-surface-catalog.md");
    const faq = read("docs/faq.md");
    const rootReadme = read("README.md");
    const llms = read("llms.txt");

    expect(docsReadme).not.toContain("docs/builder-intent-router.md");
    expect(docsReadme).not.toContain("docs/builder-journeys.md");
    expect(docsReadme).not.toContain("docs/starter-pack-comparison.md");
    expect(docsReadme).not.toContain("docs/compat-target-catalog.md");
    expect(docsReadme).not.toContain("docs/mcp-tool-catalog.md");

    expect(rootReadme).not.toContain("docs/builder-intent-router.md");
    expect(rootReadme).not.toContain("docs/builder-journeys.md");
    expect(rootReadme).not.toContain("docs/compat-target-catalog.md");

    expect(publicSurfaceCatalog).toContain("catalogs/builder-intent-router.json");
    expect(publicSurfaceCatalog).toContain("catalogs/builder-journeys.json");
    expect(publicSurfaceCatalog).toContain("catalogs/starter-pack-comparison.json");
    expect(publicSurfaceCatalog).toContain("catalogs/compat-target-catalog.json");

    expect(faq).toContain("catalogs/builder-intent-router.json");
    expect(faq).toContain("catalogs/builder-journeys.json");
    expect(faq).toContain("catalogs/starter-pack-comparison.json");
    expect(faq).toContain("catalogs/compat-target-catalog.json");
    expect(faq).toContain("catalogs/mcp-tool-catalog.json");

    expect(llms).not.toContain("docs/builder-intent-router.md");
    expect(llms).not.toContain("docs/builder-journeys.md");
    expect(llms).not.toContain("docs/starter-pack-comparison.md");
    expect(llms).not.toContain("docs/compat-target-catalog.md");
    expect(llms).not.toContain("docs/mcp-tool-catalog.md");

    expect(llms).toContain("catalogs/builder-intent-router.json");
    expect(llms).toContain("catalogs/builder-journeys.json");
    expect(llms).toContain("catalogs/starter-pack-comparison.json");
    expect(llms).toContain("catalogs/compat-target-catalog.json");
    expect(llms).toContain("catalogs/mcp-tool-catalog.json");

    expect(read(".agents/internal-docs/builder-routing/builder-intent-router.md")).toContain(
      "Switchyard Builder Intent Router",
    );
    expect(read(".agents/internal-docs/builder-routing/builder-journeys.md")).toContain(
      "Switchyard Builder Journeys",
    );
    expect(read(".agents/internal-docs/builder-routing/starter-pack-comparison.md")).toContain(
      "Switchyard Starter Pack Comparison",
    );
    expect(read(".agents/internal-docs/compat/compat-target-catalog.md")).toContain(
      "Switchyard Compat Target Catalog",
    );
    expect(read(".agents/internal-docs/mcp/mcp-tool-catalog.md")).toContain(
      "Switchyard MCP Tool Catalog",
    );
  });
});
