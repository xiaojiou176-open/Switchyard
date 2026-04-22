import {
  printJson,
  readPackJson,
  readRepoJson,
  readRepoText,
} from "../../_shared/pack-helpers.mjs";

const exampleDocument = readPackJson(import.meta.url, "./example.json");
const starter = exampleDocument.skillExamples[0];
const routeDocument = readRepoJson("catalogs/skill-pack-routes.json");
const route =
  routeDocument.routes.find((entry) => entry.id === "compare-runtime-pack") ?? null;
const comparisonDocument = readRepoJson("catalogs/starter-pack-comparison.json");
const skillPackCatalog = readRepoJson("catalogs/skill-pack-catalog.json");
const faq = readRepoText("docs/faq.md");
const firstSuccessFilter =
  comparisonDocument.filters.find((entry) => entry.id === "first-success-mode") ?? null;
const readOnlyFilter =
  comparisonDocument.filters.find((entry) => entry.id === "read-only-truth") ?? null;

printJson({
  starterPackId: "compare-runtime-pack",
  route,
  safeClaims: starter.safeClaims,
  comparisonCount: comparisonDocument.comparisons.length,
  filterCount: comparisonDocument.filters.length,
  landedSkillPackCount: skillPackCatalog.packs.length,
  firstSuccessModes: firstSuccessFilter?.values.length ?? 0,
  readOnlyComparisonIds: readOnlyFilter?.values[0]?.comparisonIds.length ?? 0,
  faqHasCompareSection: faq.includes("How do I compare starter packs"),
});
