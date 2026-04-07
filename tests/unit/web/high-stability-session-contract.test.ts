import { describe, expect, it } from "vitest";

import { createChatgptWebRuntime } from "../../../packages/providers/web/chatgpt/src/index.js";
import { createClaudeWebRuntime } from "../../../packages/providers/web/claude/src/index.js";
import { createGeminiWebRuntime } from "../../../packages/providers/web/gemini/src/index.js";

describe("High-stability web session contracts", () => {
  it("downgrades ChatGPT when the browser session survives but the access token capture is gone", async () => {
    const runtime = createChatgptWebRuntime();
    const status = await runtime.getStatus({
      sessions: {
        chatgpt: {
          state: "ready",
          accountLabel: "chatgpt:unit",
          lastValidatedAt: "2026-03-29T18:00:00.000Z",
          artifactStates: {
            "next-auth-session-token": "present",
            "openai-access-token": "missing",
            "sentinel-chat-requirements": "missing",
          },
        },
      },
    });

    expect(status.credentialState).toBe("refreshable-but-degraded");
    expect(status.runtimeReadiness).toBe("degraded");
    expect(status.session.capture).toEqual(
      expect.objectContaining({
        mode: "chatgpt-browser-cdp-capture",
      }),
    );
    expect(status.session.probe).toEqual(
      expect.objectContaining({
        status: "refresh-recommended",
        source: "chatgpt-auth-session-probe",
      }),
    );
    expect(status.session.refresh).toEqual(
      expect.objectContaining({
        status: "available",
        mode: "chatgpt-auth-session-refresh",
      }),
    );
    expect(status.session.artifactDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "openai-access-token",
          state: "missing",
        }),
      ]),
    );
  });

  it("forces Gemini into explicit re-auth when both Google auth cookies disappear", async () => {
    const runtime = createGeminiWebRuntime();
    const status = await runtime.getStatus({
      sessions: {
        gemini: {
          state: "ready",
          accountLabel: "gemini:unit",
          lastValidatedAt: "2026-03-29T18:05:00.000Z",
          artifactStates: {
            "google-sid-cookie": "missing",
            "google-secure-1psid": "missing",
          },
        },
      },
    });

    expect(status.credentialState).toBe("user-action-required");
    expect(status.available).toBe(false);
    expect(status.session.probe).toEqual(
      expect.objectContaining({
        status: "re-auth-required",
        source: "gemini-google-cookie-probe",
      }),
    );
    expect(status.session.refresh).toEqual(
      expect.objectContaining({
        status: "blocked",
        mode: "gemini-google-cookie-refresh",
      }),
    );
    expect(status.session.reAuth).toEqual(
      expect.objectContaining({
        status: "required-now",
        mode: "gemini-google-oauth-reauth",
      }),
    );
    expect(status.session.requiredUserAction).toContain("gemini.google.com/app");
  });

  it("keeps Claude refreshable when only organization discovery is missing", async () => {
    const runtime = createClaudeWebRuntime();
    const status = await runtime.getStatus({
      sessions: {
        claude: {
          state: "ready",
          accountLabel: "claude:unit",
          lastValidatedAt: "2026-03-29T18:10:00.000Z",
          artifactStates: {
            "claude-session-key": "present",
            "organization-id": "missing",
          },
        },
      },
    });

    expect(status.credentialState).toBe("refreshable-but-degraded");
    expect(status.runtimeReadiness).toBe("degraded");
    expect(status.session.probe).toEqual(
      expect.objectContaining({
        status: "refresh-recommended",
        source: "claude-sessionkey-probe",
      }),
    );
    expect(status.session.refresh).toEqual(
      expect.objectContaining({
        status: "available",
        mode: "claude-organization-refresh",
      }),
    );
    expect(status.session.artifactDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "organization-id",
          state: "missing",
        }),
      ]),
    );
  });
});
