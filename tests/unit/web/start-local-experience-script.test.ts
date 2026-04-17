import { describe, expect, it } from "vitest";

describe("start-local-experience script helpers", () => {
  it("builds the local experience URLs from service and docs ports", async () => {
    const { buildExperienceUrls } = await import(
      "../../../scripts/start-local-experience.mjs"
    );

    expect(
      buildExperienceUrls({
        host: "127.0.0.1",
        servicePort: 4010,
        docsPort: 4185,
      }),
    ).toEqual({
      serviceBaseUrl: "http://127.0.0.1:4010",
      authPortalUrl: "http://127.0.0.1:4010/v1/runtime/auth-portal",
      chatgptWorkbenchUrl:
        "http://127.0.0.1:4010/v1/runtime/providers/chatgpt/debug/workbench",
      docsFrontDoorUrl: "http://127.0.0.1:4185/docs/index.html",
    });
  });

  it("resolves static file paths inside the repo root while rejecting traversal", async () => {
    const { repoRoot, resolveStaticFilePath } = await import(
      "../../../scripts/start-local-experience.mjs"
    );

    expect(resolveStaticFilePath(repoRoot, "/docs/index.html")).toBeTruthy();
    expect(resolveStaticFilePath(repoRoot, "/")).toContain("/docs/index.html");
    expect(resolveStaticFilePath(repoRoot, "/../package.json")).toBeNull();
  });

  it("returns readable content types for docs front door assets", async () => {
    const { getContentType } = await import(
      "../../../scripts/start-local-experience.mjs"
    );

    expect(getContentType("docs/index.html")).toBe("text/html; charset=utf-8");
    expect(getContentType("docs/public-surface-catalog.json")).toBe(
      "application/json; charset=utf-8",
    );
    expect(getContentType("docs/first-success.md")).toBe(
      "text/markdown; charset=utf-8",
    );
  });
});
