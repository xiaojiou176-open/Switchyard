import { execFile } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

type CommandFailure = Error & {
  code?: number | string | null;
  stdout?: string;
  stderr?: string;
};

async function runExampleCommand(commandName: string, env: NodeJS.ProcessEnv) {
  return execFileAsync("pnpm", ["run", commandName], {
    cwd: repoRoot,
    env: {
      ...process.env,
      ...env,
    },
    maxBuffer: 1024 * 1024,
  });
}

async function expectCommandFailure(commandName: string, env: NodeJS.ProcessEnv) {
  try {
    await runExampleCommand(commandName, env);
  } catch (error) {
    return error as CommandFailure;
  }

  throw new Error(`Expected pnpm run ${commandName} to fail.`);
}

function parseJsonFromCommandStdout(stdout: string) {
  const jsonStart = stdout.indexOf("{");

  if (jsonStart < 0) {
    throw new Error(`Expected command stdout to include JSON, received:\n${stdout}`);
  }

  return JSON.parse(stdout.slice(jsonStart));
}

async function reserveClosedPort() {
  const service = createServer();
  service.listen(0, "127.0.0.1");
  await once(service, "listening");

  const address = service.address();
  if (!address || typeof address === "string") {
    await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
    throw new Error("Expected to reserve a TCP port for the unreachable runtime test.");
  }

  const { port } = address;
  await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
  return port;
}

describe("example package-script entrypoints", () => {
  it("guards the example:runtime-bridge alias against a mock runtime", async () => {
    let receivedBody: Record<string, unknown> | undefined;
    const service = createServer((request, response) => {
      if (request.method === "POST" && request.url === "/v1/runtime/invoke") {
        const chunks: Buffer[] = [];
        request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        request.on("end", () => {
          receivedBody = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          response.setHeader("content-type", "application/json");
          response.end(
            JSON.stringify({
              ok: true,
              output: [{ type: "text", text: "alias-ok" }],
            }),
          );
        });
        return;
      }

      response.statusCode = 404;
      response.end(JSON.stringify({ error: "not-found" }));
    });

    service.listen(0, "127.0.0.1");
    await once(service, "listening");

    const address = service.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected the runtime bridge command test server to expose a TCP port.");
    }

    try {
      const { stdout } = await runExampleCommand("example:runtime-bridge", {
        SWITCHYARD_RUNTIME_BASE_URL: `http://127.0.0.1:${address.port}`,
      });
      const output = parseJsonFromCommandStdout(stdout) as {
        starter: string;
        request: Record<string, unknown>;
        response: { ok: boolean };
      };

      expect(output).toEqual(
        expect.objectContaining({
          starter: "thin-runtime-bridge",
          request: expect.objectContaining({
            provider: "openai",
            lane: "byok",
          }),
          response: expect.objectContaining({
            ok: true,
          }),
        }),
      );
      expect(receivedBody).toEqual(output.request);
    } finally {
      await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
    }
  });

  it(
    "guards the example:mcp-inspector alias against a mock runtime",
    async () => {
      const requests: string[] = [];
      const service = createServer((request, response) => {
        requests.push(`${request.method} ${request.url}`);
        response.setHeader("content-type", "application/json");

        if (request.url === "/v1/runtime/health") {
          response.end(
            JSON.stringify({
              lane: "web",
              totals: {
                total: 5,
                ready: 5,
              },
            }),
          );
          return;
        }

        response.statusCode = 404;
        response.end(JSON.stringify({ error: "not-found" }));
      });

      service.listen(0, "127.0.0.1");
      await once(service, "listening");

      const address = service.address();
      if (!address || typeof address === "string") {
        throw new Error("Expected the MCP inspector command test server to expose a TCP port.");
      }

      try {
        const { stdout } = await runExampleCommand("example:mcp-inspector", {
          SWITCHYARD_RUNTIME_BASE_URL: `http://127.0.0.1:${address.port}`,
        });
        const output = parseJsonFromCommandStdout(stdout) as {
          starter: string;
          availableTools: string[];
          runtimeHealth: { command: string; result: { totals: { ready: number } } };
          catalogTools: { command: string };
        };

        expect(output).toEqual(
          expect.objectContaining({
            starter: "read-only-mcp-inspector",
            availableTools: expect.arrayContaining([
              "switchyard.runtime.health",
              "switchyard.catalog.mcp_tools",
            ]),
            runtimeHealth: expect.objectContaining({
              command: "health",
              result: expect.objectContaining({
                totals: expect.objectContaining({
                  ready: 5,
                }),
              }),
            }),
            catalogTools: expect.objectContaining({
              command: "mcp-tools",
            }),
          }),
        );
        expect(requests).toContain("GET /v1/runtime/health");
      } finally {
        await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
      }
    },
    150_000,
  );

  it("fails closed when the runtime bridge alias hits a missing-credential runtime response", async () => {
    const service = createServer((request, response) => {
      if (request.method === "POST" && request.url === "/v1/runtime/invoke") {
        response.statusCode = 409;
        response.setHeader("content-type", "application/json");
        response.end(
          JSON.stringify({
            lane: "byok",
            error: {
              type: "missing-credential",
              message: "Missing credential for gemini.",
            },
          }),
        );
        return;
      }

      response.statusCode = 404;
      response.end(JSON.stringify({ error: "not-found" }));
    });

    service.listen(0, "127.0.0.1");
    await once(service, "listening");

    const address = service.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected the missing-credential test server to expose a TCP port.");
    }

    try {
      const failure = await expectCommandFailure("example:runtime-bridge", {
        SWITCHYARD_RUNTIME_BASE_URL: `http://127.0.0.1:${address.port}`,
      });

      expect(failure.code).not.toBe(0);
      expect(failure.stderr ?? "").toContain("HTTP 409");
      expect(failure.stderr ?? "").toContain("missing-credential");
      expect(failure.stderr ?? "").toContain("Missing credential for gemini.");
    } finally {
      await new Promise<void>((resolveClose) => service.close(() => resolveClose()));
    }
  });

  it("fails truthfully when the runtime bridge alias cannot reach any runtime", async () => {
    const port = await reserveClosedPort();
    const failure = await expectCommandFailure("example:runtime-bridge", {
      SWITCHYARD_RUNTIME_BASE_URL: `http://127.0.0.1:${port}`,
    });

    expect(failure.code).not.toBe(0);
    expect(failure.stderr ?? "").toContain("Switchyard runtime is not reachable");
    expect(failure.stderr ?? "").toContain("pnpm run start:service-local");
    expect(failure.stderr ?? "").toContain("/v1/runtime/invoke");
  });
});
