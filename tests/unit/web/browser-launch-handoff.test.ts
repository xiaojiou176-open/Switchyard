import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("browser launch handoff", () => {
  it("launches Chrome via the macOS app bundle handoff", async () => {
    const spawnSyncImpl = vi.fn(() => ({ status: 0 }));

    const { launchBrowserViaOsHandoff } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );
    const result = launchBrowserViaOsHandoff(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      ["--remote-debugging-port=9338", "https://chatgpt.com"],
      {
        platform: "darwin",
        spawnSyncImpl: spawnSyncImpl as never,
      },
    );

    expect(result).toEqual({
      launchMode: "darwin-open-app",
    });
    expect(spawnSyncImpl).toHaveBeenCalledWith(
      "/usr/bin/open",
      [
        "-n",
        "-a",
        "/Applications/Google Chrome.app",
        "--args",
        "--remote-debugging-port=9338",
        "https://chatgpt.com",
      ],
      expect.objectContaining({
        stdio: "ignore",
        windowsHide: false,
      }),
    );
  });

  it("rejects non-app browser targets on macOS", async () => {
    const { launchBrowserViaOsHandoff } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );

    expect(() =>
      launchBrowserViaOsHandoff(
        "/usr/bin/google-chrome",
        [],
        {
          platform: "darwin",
          spawnSyncImpl: vi.fn() as never,
        },
      ),
    ).toThrow(/requires a Chrome or Chromium app bundle path/i);
  });

  it("builds a Windows Start-Process handoff for Chrome binaries", async () => {
    const spawnSyncImpl = vi.fn(() => ({ status: 0 }));

    const { launchBrowserViaOsHandoff } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );
    const result = launchBrowserViaOsHandoff(
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      ["--remote-debugging-port=9338", "https://grok.com"],
      {
        platform: "win32",
        spawnSyncImpl: spawnSyncImpl as never,
      },
    );

    expect(result).toEqual({
      launchMode: "windows-start-process",
    });
    expect(spawnSyncImpl).toHaveBeenCalledWith(
      "powershell.exe",
      expect.arrayContaining([
        "-NoLogo",
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        expect.stringContaining("Start-Process -FilePath"),
      ]),
      expect.objectContaining({
        stdio: "ignore",
        windowsHide: true,
      }),
    );
  });

  it("refuses unsupported non-macOS and non-Windows launch hosts", async () => {
    const { launchBrowserViaOsHandoff } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );

    expect(() =>
      launchBrowserViaOsHandoff(
        "/usr/bin/google-chrome",
        [],
        {
          platform: "linux",
          spawnSyncImpl: vi.fn() as never,
        },
      ),
    ).toThrow(/cannot prove a detached-free launch handoff on this host/i);
  });

  it("activates an existing matching page before opening a new tab", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: "chatgpt-page",
            type: "page",
            url: "https://chatgpt.com/c/abc123",
          },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    const { openUrlInExistingBrowserViaCdp } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );
    const opened = await openUrlInExistingBrowserViaCdp(
      "http://127.0.0.1:9338",
      "https://chatgpt.com",
      { fetchImpl: fetchImpl as typeof fetch },
    );

    expect(opened).toBe(true);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      new URL("http://127.0.0.1:9338/json/list"),
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      new URL("http://127.0.0.1:9338/json/activate/chatgpt-page"),
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("falls back to opening a new tab when no matching page exists", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    const { openUrlInExistingBrowserViaCdp } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );
    const opened = await openUrlInExistingBrowserViaCdp(
      "http://127.0.0.1:9338",
      "https://chat.qwen.ai",
      { fetchImpl: fetchImpl as typeof fetch },
    );

    expect(opened).toBe(true);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      "http://127.0.0.1:9338/json/new?https%3A%2F%2Fchat.qwen.ai",
      expect.objectContaining({
        method: "PUT",
      }),
    );
  });

  it("falls back from PUT to GET when opening a new tab over CDP", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    const { openUrlInExistingBrowserViaCdp } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );
    const opened = await openUrlInExistingBrowserViaCdp(
      "http://127.0.0.1:9338",
      "https://claude.ai/new",
      { fetchImpl: fetchImpl as typeof fetch },
    );

    expect(opened).toBe(true);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      "http://127.0.0.1:9338/json/new?https%3A%2F%2Fclaude.ai%2Fnew",
      expect.objectContaining({
        method: "PUT",
      }),
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      3,
      "http://127.0.0.1:9338/json/new?https%3A%2F%2Fclaude.ai%2Fnew",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("surfaces launcher failures when the host handoff exits non-zero", async () => {
    const { launchBrowserViaOsHandoff } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );

    expect(() =>
      launchBrowserViaOsHandoff(
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        [],
        {
          platform: "darwin",
          spawnSyncImpl: vi.fn(() => ({ status: 1 })) as never,
        },
      ),
    ).toThrow(/browser launch handoff exited with status 1/i);
  });

  it("returns false when the target URL is invalid and CDP cannot open a new tab", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    const { openUrlInExistingBrowserViaCdp } = await import(
      "../../../scripts/browser-launch-handoff.mjs"
    );
    const opened = await openUrlInExistingBrowserViaCdp(
      "http://127.0.0.1:9338",
      "not a valid url",
      { fetchImpl: fetchImpl as typeof fetch },
    );

    expect(opened).toBe(false);
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      "http://127.0.0.1:9338/json/new?not%20a%20valid%20url",
      expect.objectContaining({
        method: "PUT",
      }),
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      "http://127.0.0.1:9338/json/new?not%20a%20valid%20url",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });
});
