# Switchyard Public Surface Support Matrix

## Purpose

This page is the current truth table for the public front door.

Treat it like the signboard outside a store: it tells you which counters are
really open today and which ones are still under construction.

## Current Rule

The current public story is:

- `API substrate first`
- `service/runtime` is the primary promised and verified substrate
- `SDK/client` remains a formal consumer surface, but it does not replace the
  main substrate story

## Matrix

| Surface | Status | Truthful meaning | Source anchors |
| --- | --- | --- | --- |
| `HTTP/API` | `supported now` | Durable runtime discovery, auth, remediation, acquisition, and invoke HTTP routes are public and repo-backed today. | `docs/api/openapi.yaml`, `docs/api/service-http-reference.md`, `packages/surfaces/http/src/http-surface.ts`, `packages/surfaces/http/src/service-language.ts` |
| `SDK/client` | `partial` | BYOK SDK, service client, and web helper exist, but they do not replace the service/runtime substrate as the primary public front door. | `docs/api/sdk-quickstart.md`, `packages/sdk/src/index.ts`, `packages/surfaces/sdk-client/src/service-client.ts` |
| `CLI` | `partial` | The read-only builder/runtime helper is landed. It is not an execution brain or a publication claim. | `scripts/switchyard-cli.mjs`, `tests/unit/web/switchyard-cli.test.ts`, `docs/blueprints/wave6-outward-packaging-threshold.md` |
| `MCP` | `partial` | A read-only stdio MCP server/tool surface is landed on main and delegates to the same runtime inspection substrate. It is not an execution brain or full consumer parity. | `docs/mcp.md`, `packages/surfaces/mcp/src/index.ts`, `scripts/switchyard-mcp.mjs`, `tests/unit/mcp/switchyard-mcp.test.ts` |
| `Codex compat` | `partial` | A thin fail-closed adapter exists for text/runtime delegation only. | `docs/compat/codex.md`, `packages/consumers/codex/src/index.ts`, `tests/unit/compat/codex-consumer.test.ts` |
| `Claude Code compat` | `partial` | A thin fail-closed adapter exists for message/runtime delegation only. | `docs/compat/claude-code.md`, `packages/consumers/claude-code/src/index.ts`, `tests/unit/compat/claude-code-consumer.test.ts` |
| `OpenClaw compat` | `partial` | A thin fail-closed adapter exists for delegation-first runtime bridging only. | `docs/compat/openclaw.md`, `packages/consumers/openclaw/src/index.ts`, `tests/unit/compat/openclaw-consumer.test.ts` |
| `Language policy` | `partial` | The default public front door is now English-first. Glossary, FAQ, and i18n helper pages may remain bilingual support surfaces, but they no longer define the primary landing path. | `docs/i18n.md`, `README.md`, `docs/README.md`, `docs/glossary.md`, `docs/faq.md` |

## What This Prevents

If you want machine-readable truth for plugin, skills, or builder tooling, do
not copy this page by hand. Use:

- `docs/public-surface-catalog.md`
- `docs/public-surface-catalog.json`
- `docs/plugin-skill-starter-kits.md`
- `pnpm run switchyard:cli -- surface-catalog`
- `pnpm run switchyard:cli -- compat-targets`
- `pnpm run switchyard:cli -- builder-kits`
- `pnpm run switchyard:cli -- mcp-status`
- `pnpm run switchyard:cli -- mcp-tools`

The following claims are still dishonest today:

- calling `SDK/client` the primary substrate
- calling thin fail-closed adapters full parity
- calling the read-only MCP surface a full execution or tool plane
- rewriting `partial` into "fully supported"

## Decision Summary

> The public front door now locks to the `service/runtime API substrate`.
> `SDK/client` stays a formal consumer surface, but remains `partial`.
> `CLI` stays `partial` because the landed helper is read-only and builder-first.
> `MCP` stays `partial` because it is read-only and not an execution brain.
> `Codex / Claude Code / OpenClaw compat` stay `partial` because each route is
> a fail-closed thin adapter, not full parity.
