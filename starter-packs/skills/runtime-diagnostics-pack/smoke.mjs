import {
  encodeRuntimePathSegment,
  printJson,
  readPackJson,
  requestJsonAtRuntimePath,
  resolveRuntimeBaseUrl,
} from "../../_shared/pack-helpers.mjs";

const exampleDocument = readPackJson(import.meta.url, "./example.json");
const starter = exampleDocument.skillExamples[0];
const provider = process.env.SWITCHYARD_RUNTIME_PROVIDER?.trim() || "chatgpt";
const encodedProvider = encodeRuntimePathSegment(
  provider,
  "Switchyard runtime diagnostics provider",
);
const baseUrl = resolveRuntimeBaseUrl();

const [statusPayload, probePayload, remediationPayload, supportBundlePayload] =
  await Promise.all([
    requestJsonAtRuntimePath(`/v1/runtime/providers/${encodedProvider}/status`),
    requestJsonAtRuntimePath(`/v1/runtime/providers/${encodedProvider}/probe`),
    requestJsonAtRuntimePath(`/v1/runtime/providers/${encodedProvider}/remediation`),
    requestJsonAtRuntimePath(
      `/v1/runtime/providers/${encodedProvider}/debug/support-bundle`,
    ),
  ]);

printJson({
  starterPackId: "runtime-diagnostics-pack",
  baseUrl,
  provider,
  safeClaims: starter.safeClaims,
  status: statusPayload.provider ?? statusPayload,
  probe: probePayload.probe ?? probePayload,
  remediation: remediationPayload.remediation ?? remediationPayload,
  supportBundle: supportBundlePayload.debug ?? supportBundlePayload,
});
