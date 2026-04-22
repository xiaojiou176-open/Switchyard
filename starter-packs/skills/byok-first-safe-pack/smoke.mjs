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
  routeDocument.routes.find((entry) => entry.id === "byok-first-safe-pack") ?? null;
const providerCatalog = readRepoJson("catalogs/provider-runtime-catalog.json");
const surfaceCatalog = readRepoJson("catalogs/public-surface-catalog.json");
const serviceHttpReference = readRepoText("docs/api/service-http-reference.md");
const sdkQuickstart = readRepoText("docs/api/sdk-quickstart.md");
const byokProviders = providerCatalog.providers.filter((entry) => entry.lane === "byok");
const dualLaneProviders = providerCatalog.providers.filter((entry) =>
  entry.dispatchPolicy.registeredLanes.includes("web-login"),
);

printJson({
  starterPackId: "byok-first-safe-pack",
  route,
  safeClaims: starter.safeClaims,
  byokProviderCount: byokProviders.length,
  dualLaneProviderCount: dualLaneProviders.length,
  publicSurfaceCount: surfaceCatalog.publicSurfaces.length,
  hasByokInvokeDoc: serviceHttpReference.includes("/v1/runtime/byok/invoke"),
  hasByokQuickstartLabel: sdkQuickstart.includes("BYOK Example"),
});
