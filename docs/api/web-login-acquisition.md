# Web/Login Acquisition API

This page documents the current acquisition endpoints that already exist on the service surface.

这页只记录当前已经落地的 acquisition 路由，不提前写未来控制面。

## Current Routes

- `POST /v1/runtime/providers/{providerId}/acquisition/start`
- `POST /v1/runtime/providers/{providerId}/acquisition/capture`

## Supported Providers

- `chatgpt`
- `gemini`
- `claude`
- `grok`
- `qwen`

## Current Modes

- `isolated-chrome-root`
- `managed-browser`
- `existing-browser-session`

Compatibility alias:

- `existing-chrome-profile`
  - still accepted on input
  - normalized internally to `isolated-chrome-root`

## Example: Start Login

```bash
curl http://127.0.0.1:4010/v1/runtime/providers/chatgpt/acquisition/start \
  -H 'content-type: application/json' \
  -d '{}'
```

## Example: Capture

```bash
curl http://127.0.0.1:4010/v1/runtime/providers/chatgpt/acquisition/capture \
  -H 'content-type: application/json' \
  -d '{}'
```

## What This Is Not

这不是：

- multi-tenant control plane
- SaaS admin UI
- shared credential pool

这只是 current local-first acquisition surface。
