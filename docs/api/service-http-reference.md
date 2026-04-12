# Switchyard Service HTTP Reference

This page documents the current `service-first` HTTP surface.

这页记录的是当前已经落地的 `service-first` HTTP 入口，不是未来愿景。

## Status

- `supported now`
- Source of truth:
  - `docs/api/openapi.yaml`
  - `packages/surfaces/http/src/service-language.ts`
  - `packages/surfaces/http/src/http-surface.ts`
  - `tests/integration/service-http/http-surface.integration.test.ts`

## Machine-readable Contract

如果你是人来读，先看这页就够了。  
如果你是 SDK、AI agent、MCP-adjacent tooling，优先读：

- `docs/api/openapi.yaml`

它像这层 HTTP surface 的“标准门牌”，让工具不用靠猜路由和字段名来摸门。

## Surface Role

`Switchyard` 当前把 HTTP surface 定义为：

- `role = first-party-integration-entry`
- `runtimeShape = runtime-first`
- `localFirst = true`
- `consumerCompatIncluded = false`

翻成人话：

> 这是一层给 first-party integration 用的统一运行时入口，  
> 不是已经完成的 `Codex / Claude Code / OpenClaw` compat façade。

## Current Routes

### Runtime bootstrap

- `GET /v1/runtime/bootstrap`
- `GET /v1/runtime/entrypoint`

用途：

- 读当前 runtime 的路线图
- discovery / auth / health / remediation 汇总入口

### Provider discovery

- `GET /v1/runtime/providers`
- `GET /v1/runtime/byok/providers`

### Auth and health

- `GET /v1/runtime/auth-portal`
- `GET /v1/runtime/auth-status`
- `GET /v1/runtime/health`

### Provider-specific status and remediation

- `GET /v1/runtime/providers/{providerId}/status`
- `GET /v1/runtime/providers/{providerId}/probe`
- `GET /v1/runtime/providers/{providerId}/remediation`
- `POST /v1/runtime/providers/{providerId}/acquisition/start`
- `POST /v1/runtime/providers/{providerId}/acquisition/capture`

### Provider debug and browser evidence

- `GET /v1/runtime/providers/{providerId}/debug/current-page`
- `GET /v1/runtime/providers/{providerId}/debug/current-console`
- `GET /v1/runtime/providers/{providerId}/debug/current-network`
- `GET /v1/runtime/providers/{providerId}/debug/support-bundle`
- `GET /v1/runtime/providers/{providerId}/debug/workbench`

`debug/workbench` is a thin local-first HTML shell over the same read-only debug
truth surfaces. It is a diagnosis bench, not a control plane.

### Invocation

- `POST /v1/runtime/invoke`
- `POST /v1/runtime/byok/invoke`

## Example: Runtime Discovery

```bash
curl http://127.0.0.1:4010/v1/runtime/providers
```

你应该看到：

- 5 个 Web/Login providers
- provider models
- 每个 provider 的 status / probe / remediation routes

## Example: Web/Login Invocation

```bash
curl http://127.0.0.1:4010/v1/runtime/invoke \
  -H 'content-type: application/json' \
  -d '{
    "provider": "chatgpt",
    "model": "gpt-4o",
    "input": "Reply with exactly HELLO and nothing else.",
    "lane": "web"
  }'
```

## Example: BYOK Invocation

```bash
curl http://127.0.0.1:4010/v1/runtime/byok/invoke \
  -H 'content-type: application/json' \
  -d '{
    "provider": "gemini",
    "model": "gemini-2.5-flash",
    "input": "Reply with exactly HELLO and nothing else."
  }'
```

## Error Model

当前最重要的错误语义是：

- `missing-credential`
- `user-action-required`
- `human-verification-required`
- `account-action-required`
- `permission-gated`
- `provider-unavailable`
- `session-incomplete`
- `refreshable-but-degraded`

生活化理解：

> 这套 API 不会假装“服务坏了”来掩盖“你还没登录”。
> 它会尽量把“钥匙没带”“门没开”“上游临时不可用”区分开。

## Not Included Yet

These are **not** part of the current committed HTTP surface:

- Codex-specific wire contract
- Claude Code-specific gateway contract
- OpenClaw gateway protocol compatibility
- committed MCP adapter surface

这些现在最多只能写成 `planned` 或 `research`，不能写成 `supported`.
