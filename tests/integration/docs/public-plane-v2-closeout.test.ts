import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();

function read(relativePath: string) {
  return readFileSync(resolve(repoRoot, relativePath), "utf8");
}

describe("public-plane v2 closeout", () => {
  it("keeps stable public routes but thins the extra wrappers into narrowly scoped handoff pages", () => {
    expect(existsSync(resolve(repoRoot, "docs/host-integration-examples.md"))).toBe(true);
    expect(existsSync(resolve(repoRoot, "docs/provider-runtime-catalog.md"))).toBe(true);
    const playbooks = read("docs/host-integration-playbooks.md");
    const examples = read("docs/host-integration-examples.md");
    const catalog = read("docs/public-surface-catalog.md");
    const providerCatalog = read("docs/provider-runtime-catalog.md");

    expect(playbooks).toContain("examples/hosts/README.md");
    expect(playbooks).toContain("docs/starter-pack-chooser.md");
    expect(examples).toContain("examples/hosts/index.json");
    expect(examples).not.toContain("Which pack should I start with?");
    expect(catalog).toContain("catalogs/provider-runtime-catalog.json");
    expect(catalog).not.toContain("docs/host-integration-examples.md");
    expect(providerCatalog).toContain("catalogs/provider-runtime-catalog.json");
    expect(providerCatalog).toContain("providerId:lane");
  });

  it("shrinks public exposure so design and llms front doors stop advertising maintainer doctrine files", () => {
    const llms = read("llms.txt");
    const designFrontDoor = read("DESIGN.md");
    const designMaster = read("design-system/MASTER.md");
    const stitchDesign = read(".stitch/DESIGN.md");
    const donorLedger = read("design-system/DONOR_ABSORPTION_LEDGER.md");

    expect(llms).not.toContain("docs/host-integration-examples.md");
    expect(llms).not.toContain("design-system/DONOR_ABSORPTION_LEDGER.md");
    expect(llms).not.toContain(".stitch/DESIGN.md");

    expect(designFrontDoor).not.toContain(".stitch/DESIGN.md");
    expect(designFrontDoor).not.toContain("design-system/DONOR_ABSORPTION_LEDGER.md");
    expect(designMaster).not.toContain("private maintainer-only design mother strategy contract");
    expect(designMaster).not.toContain("Use `design-system/DONOR_ABSORPTION_LEDGER.md` as the operational checklist");
    expect(stitchDesign).not.toContain("private maintainer-only design mother strategy contract");
    expect(donorLedger).not.toContain("| Auth portal shell |");
  });
});
