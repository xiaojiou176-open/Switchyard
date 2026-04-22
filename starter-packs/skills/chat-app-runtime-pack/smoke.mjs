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
  routeDocument.routes.find((entry) => entry.id === "chat-app-runtime-pack") ?? null;
const surfaceCatalog = readRepoJson("catalogs/public-surface-catalog.json");
const providerCatalog = readRepoJson("catalogs/provider-runtime-catalog.json");
const serviceHttpReference = readRepoText("docs/api/service-http-reference.md");
const sdkQuickstart = readRepoText("docs/api/sdk-quickstart.md");
const byokProviders = providerCatalog.providers.filter((entry) => entry.lane === "byok");

printJson({
  starterPackId: "chat-app-runtime-pack",
  route,
  safeClaims: starter.safeClaims,
  surfaceCount: surfaceCatalog.publicSurfaces.length,
  compatTargetCount: surfaceCatalog.compatTargets.length,
  byokProviderCount: byokProviders.length,
  hasRuntimeInvokeDoc: serviceHttpReference.includes("/v1/runtime/invoke"),
  hasSdkInvokeExample: sdkQuickstart.includes("client.invoke"),
});
