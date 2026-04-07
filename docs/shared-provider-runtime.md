# Shared Provider Runtime

## What It Means

A shared provider runtime is the layer that sits between AI apps and upstream AI providers.

中文解释：

它就像一个统一配电箱。  
不同房间都要用电，但你不想每个房间自己去拉外面的高压线。

`Switchyard` 想做的就是这层：

- provider access normalization
- auth/session normalization
- diagnostics normalization
- service / SDK surfaces for AI apps

## Why It Matters

Without a shared provider runtime, every app repeats the same work:

- provider-specific auth handling
- model naming differences
- session expiry and remediation
- error normalization
- Web/Login edge cases

## What Switchyard Claims Today

Truthfully claimable now:

- `shared provider runtime`
- `BYOK + Web/Login`
- `API substrate first`
- `service-first runtime frontdoor`
- `AI app backend` in the narrow runtime sense
- `partial Codex / Claude Code / OpenClaw thin compat`
- `partial read-only MCP surface`

Not truthfully claimable now:

- `full Codex support`
- `full Claude Code support`
- `full OpenClaw parity`
- `MCP execution brain`
- `runtime invoke through MCP`

## Why This Page Exists

因为很多搜索和 AI 工具会直接抓：

- `shared provider runtime`
- `AI app backend`
- `multi-provider runtime`

如果没有一页把这层说清楚，项目就很容易被误读成：

- 聊天产品
- agent shell
- 又一个大而全的平台
