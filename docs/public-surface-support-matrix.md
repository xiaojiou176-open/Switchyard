# Switchyard Public Surface Support Matrix

## Purpose

这页是当前公开前门的真值表。  
它不是营销页，也不是路线图许愿池。

你可以把它理解成商场门口那块“今天哪些窗口真的开着、哪些还在装修”的牌子。

## Current Rule

当前主语义统一为：

- `API substrate first`
- `service/runtime` 是当前最先被承诺、最先被验证的公开 substrate
- `SDK/client` 是正式消费面，但不再覆盖主 substrate 叙事

## Matrix

| Surface | Status | Truthful meaning | Source anchors |
| --- | --- | --- | --- |
| `HTTP/API` | `supported now` | 当前公开前门已经有 durable 的 runtime discovery / auth / remediation / acquisition / invoke HTTP surface | `docs/api/openapi.yaml`, `docs/api/service-http-reference.md`, `packages/surfaces/http/src/http-surface.ts`, `packages/surfaces/http/src/service-language.ts` |
| `SDK/client` | `partial` | 当前已有 BYOK SDK、service client、web helper，但它不是当前 substrate 定义者，也还不是完整 consumer-native SDK 形态 | `docs/api/sdk-quickstart.md`, `packages/sdk/src/index.ts`, `packages/surfaces/sdk-client/src/service-client.ts` |
| `CLI` | `partial` | 当前 repo 已 landed read-only CLI starter，可读取 `providers / health / auth-status / current-page / console / network / support-bundle / readiness / diagnose ladder`；它是 local-first builder/runtime helper，不是 execution brain，也不是 distribution commitment | `scripts/switchyard-cli.mjs`, `tests/unit/web/switchyard-cli.test.ts`, `docs/blueprints/wave6-outward-packaging-threshold.md` |
| `MCP` | `partial` | 当前 repo 已 landed read-only stdio MCP server/tool surface，背后走同一套 service runtime；它不是 execution brain，也不是 Codex / Claude Code / OpenClaw parity layer | `docs/mcp.md`, `packages/surfaces/mcp/src/index.ts`, `scripts/switchyard-mcp.mjs`, `tests/unit/mcp/switchyard-mcp.test.ts` |
| `Codex compat` | `partial` | 当前 repo 已 landed fail-closed thin adapter，只覆盖 text/runtime delegation；没有 tool / MCP / worktree parity | `docs/compat/codex.md`, `packages/consumers/codex/src/index.ts`, `tests/unit/compat/codex-consumer.test.ts` |
| `Claude Code compat` | `partial` | 当前 repo 已 landed fail-closed thin adapter，只覆盖 message/runtime delegation；没有 terminal shell / approval / tool / MCP parity | `docs/compat/claude-code.md`, `packages/consumers/claude-code/src/index.ts`, `tests/unit/compat/claude-code-consumer.test.ts` |
| `OpenClaw compat` | `partial` | 当前 repo 已 landed fail-closed thin adapter，只覆盖 delegation-first runtime bridge；没有 operator/control-plane/product-shell parity | `docs/compat/openclaw.md`, `packages/consumers/openclaw/src/index.ts`, `tests/unit/compat/openclaw-consumer.test.ts` |
| `i18n` | `partial` | 当前是 bilingual developer frontdoor，不是 full product i18n | `docs/i18n.md`, `README.md`, `docs/README.md` |

## What This Explicitly Prevents

如果你想给 plugin / skills / builder tooling 直接喂 machine-readable truth，
不要手抄这张表，改用：

- `docs/public-surface-catalog.md`
- `docs/public-surface-catalog.json`
- `docs/plugin-skill-starter-kits.md`
- `pnpm run switchyard:cli -- surface-catalog`
- `pnpm run switchyard:cli -- compat-targets`
- `pnpm run switchyard:cli -- builder-kits`
- `pnpm run switchyard:cli -- mcp-status`
- `pnpm run switchyard:cli -- mcp-tools`

以下说法现在都不诚实：

- 把 `SDK/client` 写成当前主 substrate
- 把 thin fail-closed starter 写成 full parity
- 把 read-only MCP surface 写成 full execution / tool parity
- 把 `partial` 写成“已经完整支持”

## Decision Summary

> 当前 `Switchyard` 的公开前门先锁 `service/runtime API substrate`。  
> `SDK/client` 保留为正式消费面，但状态是 `partial`。  
> `CLI` 现在可以诚实写成 `partial`，因为只读 starter 已 landed。  
> `MCP` 现在可以诚实写成 `partial`，但只能指 read-only thin runtime surface。  
> `Codex / Claude Code / OpenClaw compat` 现在可以诚实写成 `partial`，但只能指 fail-closed thin adapter，不等于任何 full parity。
