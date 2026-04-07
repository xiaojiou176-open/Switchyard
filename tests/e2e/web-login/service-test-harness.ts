import {
  createSwitchyardService,
  type SwitchyardServiceOptions,
} from "../../../apps/service/src/index.js";

const PORT_STATE_KEY = "__switchyardE2ePortState";
const E2E_PORT_BASE = 38_080;
const E2E_PORT_BLOCK_SIZE = 200;
const E2E_URL_PREFIX = "switchyard-e2e://service-";
const inMemoryServices = new Map<string, ReturnType<typeof createSwitchyardService>>();

function resolveWorkerOffset(): number {
  const rawValue =
    process.env.VITEST_POOL_ID ??
    process.env.VITEST_WORKER_ID ??
    "0";
  const parsedValue = Number.parseInt(rawValue, 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return 0;
  }

  return parsedValue > 0 ? parsedValue - 1 : 0;
}

function allocateE2EServicePort(): number {
  const globalState = globalThis as typeof globalThis & {
    [PORT_STATE_KEY]?: { nextPort: number };
  };
  const initialPort = E2E_PORT_BASE + resolveWorkerOffset() * E2E_PORT_BLOCK_SIZE;

  if (!globalState[PORT_STATE_KEY]) {
    globalState[PORT_STATE_KEY] = {
      nextPort: initialPort,
    };
  }

  const port = globalState[PORT_STATE_KEY]!.nextPort;
  globalState[PORT_STATE_KEY]!.nextPort += 1;
  return port;
}

export function startSwitchyardE2EService(
  options: SwitchyardServiceOptions = {},
) {
  const port = options.port ?? allocateE2EServicePort();
  const baseUrl = `${E2E_URL_PREFIX}${port}`;
  const service = createSwitchyardService(options);
  inMemoryServices.set(baseUrl, service);

  return {
    baseUrl,
    port,
    routes: service.routes,
    async close() {
      inMemoryServices.delete(baseUrl);
    },
  };
}

export function resolveInMemoryE2EService(url: string) {
  const parsed = new URL(url);
  const baseUrl = `${parsed.protocol}//${parsed.host}`;
  const service = inMemoryServices.get(baseUrl);

  if (!service) {
    throw new Error(`No in-memory Switchyard E2E service registered for ${baseUrl}.`);
  }

  return {
    service,
    pathname: parsed.pathname,
  };
}

export function isInMemoryE2EUrl(url: string) {
  return url.startsWith(E2E_URL_PREFIX);
}
