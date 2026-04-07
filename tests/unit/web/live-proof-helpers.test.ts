import { describe, expect, it, vi } from "vitest";

import {
  collectLiveProofEnvStatus,
  runHtmlWebProbe,
  runJsonWebProbe,
} from "../../../packages/lanes/web/src/live-proof.js";

describe("live proof helper probes", () => {
  it("reports missing env inputs before any request is made", async () => {
    const fetchMock = vi.fn<typeof fetch>();

    const envStatus = collectLiveProofEnvStatus(["A", "B"], {
      A: "1",
    });
    const result = await runJsonWebProbe(
      {
        provider: "gemini",
        probeUrl: "https://example.com/probe",
        requiredEnvNames: ["A", "B"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: true,
            signal: "unused",
            summary: "unused",
          };
        },
      },
      {
        A: "1",
      },
      fetchMock,
    );

    expect(envStatus).toEqual([
      { name: "A", present: true },
      { name: "B", present: false },
    ]);
    expect(result).toEqual(
      expect.objectContaining({
        status: "external-blocker",
        blocker: "missing-web-session-material",
        missingEnvNames: ["B"],
      }),
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("classifies JSON fetch failures, HTTP failures, parse failures, and validator failures", async () => {
    const requestFailure = await runJsonWebProbe(
      {
        provider: "gemini",
        probeUrl: "https://example.com/probe",
        requiredEnvNames: ["COOKIE"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: true,
            signal: "unused",
            summary: "unused",
          };
        },
      },
      {
        COOKIE: "cookie",
      },
      vi.fn<typeof fetch>().mockRejectedValue(new Error("network down")),
    );

    expect(requestFailure).toEqual(
      expect.objectContaining({
        status: "failure",
        reason: "probe-request-failed",
        classification: "provider-unavailable",
      }),
    );

    const httpFailure = await runJsonWebProbe(
      {
        provider: "gemini",
        probeUrl: "https://example.com/probe",
        requiredEnvNames: ["COOKIE"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: true,
            signal: "unused",
            summary: "unused",
          };
        },
      },
      {
        COOKIE: "cookie",
      },
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response("upstream denied", {
          status: 503,
        }),
      ),
    );

    expect(httpFailure).toEqual(
      expect.objectContaining({
        status: "failure",
        reason: "probe-http-error",
        responseStatus: 503,
      }),
    );

    const parseFailure = await runJsonWebProbe(
      {
        provider: "gemini",
        probeUrl: "https://example.com/probe",
        requiredEnvNames: ["COOKIE"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: true,
            signal: "unused",
            summary: "unused",
          };
        },
      },
      {
        COOKIE: "cookie",
      },
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response("not-json", {
          status: 200,
        }),
      ),
    );

    expect(parseFailure).toEqual(
      expect.objectContaining({
        status: "failure",
        reason: "probe-unexpected-body",
        classification: "probe-misclassification",
      }),
    );

    const validatorFailure = await runJsonWebProbe(
      {
        provider: "gemini",
        probeUrl: "https://example.com/probe",
        requiredEnvNames: ["COOKIE"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: false,
            classification: "session-incomplete",
            diagnostic: "still logged out",
            summary: "needs login",
          };
        },
      },
      {
        COOKIE: "cookie",
      },
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify({ ok: false }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );

    expect(validatorFailure).toEqual(
      expect.objectContaining({
        status: "failure",
        reason: "probe-unexpected-body",
        classification: "session-incomplete",
        summary: "needs login",
      }),
    );
  });

  it("classifies HTML validator failures and successes", async () => {
    const validatorFailure = await runHtmlWebProbe(
      {
        provider: "grok",
        probeUrl: "https://example.com/html",
        requiredEnvNames: ["COOKIE"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: false,
            diagnostic: "html still looks logged out",
          };
        },
      },
      {
        COOKIE: "cookie",
      },
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response("<html>logged out</html>", {
          status: 200,
          headers: { "content-type": "text/html" },
        }),
      ),
    );

    expect(validatorFailure).toEqual(
      expect.objectContaining({
        status: "failure",
        reason: "probe-unexpected-body",
        classification: "probe-misclassification",
      }),
    );

    const success = await runHtmlWebProbe(
      {
        provider: "grok",
        probeUrl: "https://example.com/html",
        requiredEnvNames: ["COOKIE"],
        rerunCommand: "pnpm rerun",
        buildHeaders() {
          return {};
        },
        validate() {
          return {
            ok: true,
            signal: "html-ok",
            summary: "html looks authenticated",
          };
        },
      },
      {
        COOKIE: "cookie",
      },
      vi.fn<typeof fetch>().mockResolvedValue(
        new Response("<html>ok</html>", {
          status: 200,
          headers: { "content-type": "text/html" },
        }),
      ),
    );

    expect(success).toEqual(
      expect.objectContaining({
        status: "success",
        signal: "html-ok",
        responseKind: "html",
      }),
    );
  });
});
