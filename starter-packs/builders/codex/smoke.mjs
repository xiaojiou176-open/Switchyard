import {
  normalizeInvokeRequest,
  printJson,
  readPackJson,
  requestJsonAtRuntimePath,
  resolveRuntimeBaseUrl,
} from "../../_shared/pack-helpers.mjs";

const exampleDocument = readPackJson(import.meta.url, "./example.json");
const starter = exampleDocument.builderExamples[0];
const baseUrl = resolveRuntimeBaseUrl();
const request = normalizeInvokeRequest(starter.example.request);

const response = await requestJsonAtRuntimePath("/v1/runtime/invoke", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(request),
});

printJson({
  starterPackId: "codex",
  baseUrl,
  safeClaims: starter.safeClaims,
  request,
  response,
});
