# Switchyard SDK Quickstart

This quickstart focuses on what is committed today.

这页只写今天已经落地的 SDK / client 用法，不提前假装 future compat 已经支持。

> `SDK/client` 是建立在同一 runtime/API substrate 上的消费入口。  
> 它不是另一套独立真理源。

## What Exists Now

- BYOK-oriented SDK client
- service client for the HTTP runtime surface
- web runtime SDK helpers

Source anchors:

- `packages/sdk/src/index.ts`
- `packages/surfaces/sdk-client/src/client.ts`
- `packages/surfaces/sdk-client/src/service-client.ts`
- `packages/sdk/src/web.ts`

## Install in a Workspace

在 monorepo 内部，当前通常直接从工作区包导入。

```ts
import { createSwitchyardSdk } from "@switchyard/sdk";
import { createSwitchyardServiceClient } from "@switchyard/sdk";
```

## BYOK Example

```ts
import { createSwitchyardSdk } from "@switchyard/sdk";

const sdk = createSwitchyardSdk();

const result = await sdk.generateText({
  model: "gemini/gemini-2.5-flash",
  prompt: "Reply with exactly HELLO and nothing else.",
});

if (result.ok) {
  console.log(result.text);
} else {
  console.log(result.diagnostics);
}
```

## Service Client Example

```ts
import { createSwitchyardServiceClient } from "@switchyard/sdk";

const client = createSwitchyardServiceClient({
  baseUrl: "http://127.0.0.1:4010",
});

const providers = await client.listProviders();
const health = await client.health();
const storeReadiness = await client.providerStoreReadiness("chatgpt");
const liveReadiness = await client.providerLiveReadiness("chatgpt");
const attachTarget = await client.providerAttachTarget("chatgpt");
const diagnoseLadder = await client.providerDiagnoseLadder("chatgpt");
const diagnose = await client.providerDiagnose("chatgpt");

const invoke = await client.invoke({
  provider: "chatgpt",
  model: "gpt-4o",
  input: "Reply with exactly HELLO and nothing else.",
});
```

如果你想看得更细一点，可以先这样理解：

- `providerStoreReadiness()` 像看“钥匙和证件有没有放进抽屉”
- `providerLiveReadiness()` 像看“人是不是已经站在正确房门前，而且门把手能转”
- `providerDiagnose()` 像拿整张体检单
- `providerDiagnoseLadder()` 像医生给你的下一步处理顺序

这几个 helper 都是 read-only 诊断入口。  
它们帮助你看清 `store-ready != live-ready`，但不等于把 `CLI` 或 future compat 提前写成今天已支持。

## Web Runtime SDK Example

```ts
import { createSwitchyardWebSdk } from "@switchyard/sdk";

const web = createSwitchyardWebSdk({
  useLocalWebAuthStore: true,
});

const auth = await web.authStatus();
const health = await web.health();
```

## Current Boundaries

### Supported now

- BYOK SDK calls
- HTTP service client
- web auth/runtime inspection helpers
- service-client diagnose/readiness projections for the current HTTP runtime surface

### Planned, not supported yet

- Codex compatibility SDK
- Claude Code compatibility SDK
- OpenClaw compatibility SDK
- committed MCP client package

## When to Choose SDK vs Service

- Choose `SDK` when you are inside the same codebase and want BYOK/runtime helpers directly.
- Choose `service client` when you want a stable `service-first` boundary.

更直白一点说：

> SDK 更像直接进机房接线。  
> service client 更像走前台标准窗口。
