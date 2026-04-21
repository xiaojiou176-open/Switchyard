import {
  printJson,
  readHostConfig,
  requestJsonAtRuntimePath,
  resolveHostExampleMeta,
  resolveRuntimeBaseUrl,
} from "../_shared/host-example-helpers.mjs";

const config = readHostConfig(import.meta.url);
const meta = resolveHostExampleMeta("openclaw");
const baseUrl = resolveRuntimeBaseUrl();
const request = config.request;

function buildInputPreview(input) {
  const normalized = `${input ?? ""}`.replace(/\s+/g, " ").trim();

  if (normalized.length <= 120) {
    return normalized;
  }

  return `${normalized.slice(0, 117)}...`;
}

async function readOptionalPreflight() {
  try {
    const [bootstrap, health, dispatchPlan, doctor] = await Promise.all([
      requestJsonAtRuntimePath("/v1/runtime/bootstrap"),
      requestJsonAtRuntimePath("/v1/runtime/health"),
      requestJsonAtRuntimePath("/v1/runtime/dispatch-plan", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(request),
      }),
      requestJsonAtRuntimePath(`/v1/runtime/providers/${request.provider}/doctor`),
    ]);

    return {
      status: "available",
      bootstrap: {
        serviceName: bootstrap.bootstrap?.serviceName,
        routeCatalog: bootstrap.bootstrap?.routeCatalog,
      },
      health: health.totals ?? health,
      dispatchPlan: dispatchPlan.dispatchPlan ?? dispatchPlan,
      doctor: doctor.doctor ?? doctor,
    };
  } catch (error) {
    return {
      status: "unavailable",
      note: "Runtime preflight routes were not fully reachable in this smoke run.",
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

const preview = {
  route: "/v1/runtime/invoke",
  runtimeRoutes: {
    bootstrap: "/v1/runtime/bootstrap",
    health: "/v1/runtime/health",
    dispatchPlan: "/v1/runtime/dispatch-plan",
    doctor: `/v1/runtime/providers/${request.provider}/doctor`,
    invoke: "/v1/runtime/invoke",
  },
  requestPreview: {
    provider: request.provider,
    model: request.model,
    lane: request.lane,
    inputPreview: buildInputPreview(request.input),
  },
};
const preflight = await readOptionalPreflight();
const response = await requestJsonAtRuntimePath("/v1/runtime/invoke", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(request),
});

printJson({
  starter: "host-example-openclaw",
  target: "openclaw",
  baseUrl,
  bestEntry: meta.bestEntry,
  smokeCommand: meta.smokeCommand,
  catalogCommand: config.catalogCommand,
  safeClaims: meta.safeClaims,
  preview,
  preflight,
  request,
  response,
});
