import { describe, expect, test, vi } from "vitest";

import {
  createSwitchyardServiceClient,
  createSwitchyardSdk,
} from "../../../packages/sdk/src/index.js";

describe("Switchyard service client", () => {
  test("calls the runtime service bootstrap and provider discovery routes with stable catalog URLs", async () => {
    const fetchMock = vi.fn(async (input: string) => {
      if (
        input.endsWith("/v1/runtime/bootstrap") ||
        input.endsWith("/v1/runtime/entrypoint")
      ) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              bootstrap: {
                serviceName: "switchyard-local-service",
              },
            };
          },
        };
      }

      return {
        ok: true,
        status: 200,
        async json() {
          return {
            discovery: {
              providers: [
                {
                  providerId: "chatgpt",
                  providerDisplayName: "ChatGPT Web",
                },
              ],
            },
          };
        },
      };
    });

    const client = createSwitchyardServiceClient({
      baseUrl: "http://127.0.0.1:4317",
      fetch: fetchMock as unknown as typeof fetch,
    });

    const bootstrap = await client.bootstrap();
    const entrypoint = await client.entrypoint();
    const providers = await client.listProviders();

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "http://127.0.0.1:4317/v1/runtime/bootstrap",
      expect.objectContaining({
        headers: expect.any(Headers),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "http://127.0.0.1:4317/v1/runtime/entrypoint",
      expect.objectContaining({
        headers: expect.any(Headers),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      "http://127.0.0.1:4317/v1/runtime/providers",
      expect.objectContaining({
        headers: expect.any(Headers),
      }),
    );
    expect(bootstrap.bootstrap.serviceName).toBe("switchyard-local-service");
    expect(entrypoint.bootstrap.serviceName).toBe("switchyard-local-service");
    expect(providers[0]?.providerId).toBe("chatgpt");
  });

  test("invokes the runtime service with a service-first payload and exposes the client through the sdk surface", async () => {
    const fetchMock = vi.fn(async (_input: string, init?: RequestInit) => ({
      ok: true,
      status: 200,
      async json() {
        return {
          ok: true,
          provider: "chatgpt",
          model: "gpt-4o",
          lane: "web",
          outputText: "SERVICE_OK",
        };
      },
    }));

    const sdk = createSwitchyardSdk({
      service: {
        baseUrl: "http://127.0.0.1:4317",
        fetch: fetchMock as unknown as typeof fetch,
      },
    });

    const result = await sdk.service?.invoke({
      provider: "chatgpt",
      model: "gpt-4o",
      input: "Say hello",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:4317/v1/runtime/invoke",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          lane: "web",
          provider: "chatgpt",
          model: "gpt-4o",
          input: "Say hello",
        }),
      }),
    );
    expect(result?.ok).toBe(true);
    expect(result?.outputText).toBe("SERVICE_OK");
  });

  test("covers health, auth, provider route helpers, and request error payloads", async () => {
    const fetchMock = vi.fn(async (input: string, _init?: RequestInit) => {
      if (input.endsWith("/v1/runtime/health")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              lane: "web",
              generatedAt: "2026-04-01T00:00:00.000Z",
              totals: {
                total: 5,
                ready: 3,
                degraded: 1,
                userActionRequired: 1,
                unavailable: 0,
              },
            };
          },
        };
      }

      if (input.endsWith("/v1/runtime/auth-status")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              summary: { blocking: 1 },
              providers: [],
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/status")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              providerId: "chatgpt",
              routes: {
                status: "/status",
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/probe")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              providerId: "chatgpt",
              runtime: {
                canInvoke: false,
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/remediation")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              providerId: "chatgpt",
              diagnostics: [],
              runtime: {
                available: false,
                canInvoke: false,
                runtimeReadiness: "blocked",
                credentialState: "missing",
                sessionPresence: "missing",
                degradedInvocationPolicy: "allow-with-warning",
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/acquisition/start")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              status: "ready-for-user-login",
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/acquisition/capture")) {
        return {
          ok: false,
          status: 409,
          async json() {
            return {
              error: {
                type: "missing-credential",
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/debug/current-page")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              debug: {
                status: "captured",
                classification: "session-incomplete",
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/debug/current-console")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              debug: {
                status: "captured",
                entries: [],
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/debug/current-network")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              debug: {
                status: "limited",
                entries: [
                  {
                    name: "https://chatgpt.com/api/auth/session",
                  },
                ],
              },
            };
          },
        };
      }

      if (input.includes("/providers/chatgpt/debug/support-bundle")) {
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              debug: {
                storeReadiness: {
                  runtimeReadiness: "ready",
                },
                liveReadiness: {
                  status: "live-blocked",
                },
                attachTarget: {
                  available: true,
                },
                diagnoseLadder: [
                  {
                    id: "repair-session",
                  },
                ],
              },
            };
          },
        };
      }

      return {
        ok: true,
        status: 200,
        async json() {
          return {};
        },
      };
    });

    const client = createSwitchyardServiceClient({
      baseUrl: "http://127.0.0.1:4317/",
      fetch: fetchMock as unknown as typeof fetch,
      headers: {
        authorization: "Bearer test",
      },
    });

    const health = await client.health();
    const auth = await client.authStatus();
    const status = await client.providerStatus("chatgpt");
    const probe = await client.providerProbe("chatgpt");
    const remediation = await client.providerRemediation("chatgpt");
    const start = await client.startProviderAcquisition("chatgpt", { mode: "managed-browser" });
    const currentPage = await client.providerCurrentPage("chatgpt");
    const currentConsole = await client.providerCurrentConsole("chatgpt");
    const currentNetwork = await client.providerCurrentNetwork("chatgpt");
    const supportBundle = await client.providerSupportBundle("chatgpt");
    const storeReadiness = await client.providerStoreReadiness("chatgpt");
    const liveReadiness = await client.providerLiveReadiness("chatgpt");
    const attachTarget = await client.providerAttachTarget("chatgpt");
    const diagnoseLadder = await client.providerDiagnoseLadder("chatgpt");
    const diagnose = await client.providerDiagnose("chatgpt");

    await expect(
      client.captureProviderAcquisition("chatgpt", { mode: "managed-browser" }),
    ).rejects.toMatchObject({
      status: 409,
      payload: {
        error: {
          type: "missing-credential",
        },
      },
    });

    expect(health.totals.ready).toBe(3);
    expect(auth.providers).toEqual([]);
    expect(status.providerId).toBe("chatgpt");
    expect(probe.runtime.canInvoke).toBe(false);
    expect(remediation.providerId).toBe("chatgpt");
    expect(start).toEqual({
      status: "ready-for-user-login",
    });
    expect(currentPage.classification).toBe("session-incomplete");
    expect(currentConsole.status).toBe("captured");
    expect(currentNetwork.entries[0]?.name).toContain("/api/auth/session");
    expect(supportBundle.liveReadiness.status).toBe("live-blocked");
    expect(storeReadiness.runtimeReadiness).toBe("ready");
    expect(liveReadiness.status).toBe("live-blocked");
    expect(attachTarget.available).toBe(true);
    expect(diagnoseLadder[0]?.id).toBe("repair-session");
    expect(diagnose.liveReadiness.status).toBe("live-blocked");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:4317/v1/runtime/providers/chatgpt/acquisition/start",
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Headers),
      }),
    );

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers;
    expect(headers.get("authorization")).toBe("Bearer test");
  });

  test("surfaces provider lookup helpers and throws when createModel targets an unknown provider", () => {
    const sdk = createSwitchyardSdk();
    
    expect(sdk.getProvider("gemini")?.provider).toBe("gemini");
    expect(sdk.getProviderProfile("gemini")?.provider).toBe("gemini");
    expect(sdk.getProviderProfile("qwen")?.provider).toBe("qwen");
    expect(sdk.listProviders().length).toBeGreaterThan(0);
    expect(sdk.listProviderProfiles().length).toBeGreaterThan(0);

    expect(() =>
      sdk.createModel("gemini", "gemini-2.5-flash"),
    ).not.toThrow();
    expect(() =>
      sdk.createModel("unknown" as never, "mystery"),
    ).toThrow(/not registered/);
  });
});
