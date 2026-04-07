import { request } from "node:http";

import {
  isInMemoryE2EUrl,
  resolveInMemoryE2EService,
} from "./service-test-harness.js";

export interface LocalJsonResponse<T> {
  status: number;
  body: T;
  rawBody: string;
}

export interface LocalJsonRequestOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
}

function normalizeBody(body: unknown): string | undefined {
  if (body == null) {
    return undefined;
  }

  return typeof body === "string" ? body : JSON.stringify(body);
}

export async function requestLocalJson<T>(
  url: string,
  options: LocalJsonRequestOptions = {},
): Promise<LocalJsonResponse<T>> {
  const requestBody = normalizeBody(options.body);

  if (isInMemoryE2EUrl(url)) {
    const { service, pathname } = resolveInMemoryE2EService(url);
    const response = await service.surface.handle(
      options.method ?? "GET",
      pathname,
      options.body,
    );
    const rawBody =
      typeof response.body === "string"
        ? response.body
        : JSON.stringify(response.body);

    return {
      status: response.status,
      body:
        typeof response.body === "string"
          ? (JSON.parse(response.body) as T)
          : (response.body as T),
      rawBody,
    };
  }

  return new Promise<LocalJsonResponse<T>>((resolve, reject) => {
    const req = request(
      url,
      {
        method: options.method ?? "GET",
        headers: {
          ...(requestBody ? { "content-length": `${Buffer.byteLength(requestBody)}` } : {}),
          ...options.headers,
        },
      },
      (res) => {
        let rawBody = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          rawBody += chunk;
        });
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            body: JSON.parse(rawBody) as T,
            rawBody,
          });
        });
      },
    );

    req.on("error", reject);

    if (requestBody) {
      req.write(requestBody);
    }

    req.end();
  });
}
