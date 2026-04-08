# Switchyard Public Distribution Ledger

这页不是在宣布：

> `Switchyard` 已经进了官方 marketplace，或者已经完成 release publish。

更直白一点说：

> 这页只负责把 **当前可公开分发到哪一步**、**官方柜台是否存在**、**我们现在实际上站在哪条柜台前** 说清楚。

当前轮的边界固定是：

- package / starter-pack / docs / GitHub Pages homepage / CLI / MCP frontdoor 要做到 public-ready
- `SDK / hosted runtime / release publish / custom domain` 不在这轮
- 没有 fresh 证据，不准把 `public-ready` 写成 `officially listed`

## 当前结论

你可以把这页理解成一张“上架状态表”：

- **有些东西已经装箱、贴好了标签、写好了安装说明**
- **有些目标平台确实存在官方柜台**
- **但 `Switchyard` 目前仍主要停在 `package-ready / starter-pack-ready / docs-frontdoor-ready`，不是 `officially listed`**

## Machine-readable Source

- [docs/public-distribution-ledger.json](./public-distribution-ledger.json)
- [docs/public-distribution-ledger.schema.json](./public-distribution-ledger.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- public-distribution-ledger
pnpm run switchyard:cli -- public-distribution-ledger-schema
pnpm run switchyard:cli -- distribution-surfaces
pnpm run switchyard:cli -- distribution-surface --target codex
pnpm run switchyard:cli -- distribution-surface --target claude-code
pnpm run switchyard:cli -- distribution-surface --target openclaw
pnpm run switchyard:cli -- distribution-surface --target mcp
```

## Read-only MCP Access

- `switchyard.catalog.public_distribution_ledger`
- `switchyard.catalog.public_distribution_ledger_schema`
- `switchyard.catalog.distribution_surfaces`
- `switchyard.catalog.distribution_surface`

## Current Surface Ledger

| Surface | Official public surface exists? | Current listing status | Strongest current public distribution surface | Current artifact | Current proof loop | Allowed claim now | Forbidden overclaim |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Codex` thin compat | `yes` — official Codex plugin system and Plugin Directory docs exist | official surface exists, but `Switchyard` is **not** claiming official directory listing yet | package-ready adapter + starter pack + host example + compat docs | `@switchyard/consumer-codex`, `starter-packs/builders/codex/`, `examples/hosts/codex/`, `docs/compat/codex.md` | `pnpm run starter-pack:codex`, `pnpm run example:host-codex` | `partial / thin compat / builder-facing runtime bridge / package-ready artifact` | `official Codex marketplace listed`, `full Codex support`, `tool or MCP parity` |
| `Claude Code` thin compat | `yes` — official Claude Code plugins surface exists | official surface exists, but `Switchyard` is **not** claiming official directory listing yet | package-ready adapter + starter pack + host example + marketplace-compatible bundle | `@switchyard/consumer-claude-code`, `starter-packs/builders/claude-code/`, `examples/hosts/claude-code/`, `distribution/claude-marketplace/`, `docs/compat/claude-code.md` | `pnpm run starter-pack:claude-code`, `pnpm run example:host-claude-code` | `partial / thin compat / message-runtime bridge / package-ready artifact / marketplace-ready bundle` | `official Claude Code marketplace listed`, `full Claude Code support`, `terminal or approval parity` |
| `OpenClaw` thin compat | `yes` — official ClawHub and npm-based plugin distribution docs exist | official surfaces exist, but `Switchyard` is **not** claiming ClawHub/npm publication yet | package-ready adapter + starter pack + host example + OpenClaw-compatible Claude bundle | `@switchyard/consumer-openclaw`, `starter-packs/builders/openclaw/`, `examples/hosts/openclaw/`, `distribution/claude-marketplace/`, `docs/compat/openclaw.md` | `pnpm run starter-pack:openclaw`, `pnpm run example:host-openclaw` | `partial / thin compat / delegation-first bridge / package-ready artifact / OpenClaw-compatible bundle` | `official OpenClaw marketplace listed`, `OpenClaw product-shell parity`, `operator/control-plane parity` |
| `MCP` read-only surface | `yes` — official MCP Registry exists, currently as preview | official registry exists, but `Switchyard` is **not** claiming registry listing yet | package-ready MCP surface + stdio CLI/bin + docs + host example | `@switchyard/surface-mcp`, `switchyard-mcp` bin, `packages/surfaces/mcp/server.json`, `examples/hosts/mcp/`, `docs/mcp.md` | `pnpm run switchyard:mcp -- --base-url http://127.0.0.1:4010`, `pnpm run example:host-mcp` | `partial / read-only MCP server / package-ready artifact / registry-submission materials landed / not an execution brain` | `official MCP registry listed`, `full MCP backend`, `runtime invoke through MCP`, `acquisition write through MCP` |
| Builder starter packs | `no` — not an official marketplace surface | public repo frontdoor only | public GitHub repo paths + machine-readable index + CLI/MCP catalogs | `starter-packs/**`, `starter-packs/index.json`, `docs/starter-pack-index.md` | `pnpm run starter-pack:codex`, `pnpm run starter-pack:mcp` | `copy-ready starter packs`, `builder-facing public frontdoor`, `local-first first-success kits` | `official plugin marketplace listing`, `fully supported host product integration` |
| Skill packs / docs SEO packs | `no` — not an official marketplace surface | public repo frontdoor only | public docs + machine-readable catalogs + starter packs + marketplace-compatible bundle | `docs/skill-pack-catalog.*`, `starter-packs/skills/**`, `docs/discoverability-keyword-truth.*`, `distribution/claude-marketplace/` | `pnpm run starter-pack:runtime-diagnostics-pack`, `pnpm run starter-pack:docs-seo-sync-pack` | `truth-first builder automation packs`, `public docs/discoverability helpers`, `marketplace-ready bundle artifact` | `official plugin listing`, `launch automation`, `supported publication pipeline` |

## Official Surface Anchors

- `Codex`
  - [OpenAI Codex Plugins Overview](https://developers.openai.com/codex/plugins/overview)
  - [OpenAI Codex Plugins Build Guide](https://developers.openai.com/codex/plugins/build)
- `Claude Code`
  - [Claude Code Plugins](https://code.claude.com/docs/en/plugins)
- `OpenClaw`
  - [OpenClaw Plugins](https://docs.openclaw.ai/tools/plugin)
  - [OpenClaw ClawHub](https://docs.openclaw.ai/tools/clawhub)
- `MCP`
  - [Official MCP Registry](https://registry.modelcontextprotocol.io/)

## Minimal Human Action Packs

这些动作包的作用不是帮我们 overclaim，而是把“如果 owner 现在就继续往官方柜台走，最少还要做什么”写清楚。

### `Codex`

- exact URL
  - [OpenAI Codex Plugins Overview](https://developers.openai.com/codex/plugins/overview)
  - [OpenAI Codex Plugins Build Guide](https://developers.openai.com/codex/plugins/build)
- exact local path
  - [`packages/consumers/codex/README.md`](../packages/consumers/codex/README.md)
  - [`starter-packs/builders/codex/README.md`](../starter-packs/builders/codex/README.md)
- step 1 / 2 / 3
  - 1. 先用 starter pack / host example 走通本地链路
  - 2. 继续只把 outward wording 说成 `Codex-compatible / package-ready`
  - 3. 没有拿到官方第三方 listing 证据前，不要写 `officially listed in Codex`

### `Claude Code`

- exact URL
  - [Claude Code Plugins](https://code.claude.com/docs/en/plugins)
- exact local path
  - [`distribution/claude-marketplace/README.md`](../distribution/claude-marketplace/README.md)
  - [`distribution/claude-marketplace/.claude-plugin/marketplace.json`](../distribution/claude-marketplace/.claude-plugin/marketplace.json)
- step 1 / 2 / 3
  - 1. Validate the marketplace-compatible bundle and metadata
  - 2. Add/test the repo or URL through the Claude Code plugin flow
  - 3. 只有真的可发现后，才升级 wording 为 `listed`

### `OpenClaw`

- exact URL
  - [OpenClaw Plugins](https://docs.openclaw.ai/tools/plugin)
  - [OpenClaw ClawHub](https://docs.openclaw.ai/tools/clawhub)
- exact local path
  - [`packages/consumers/openclaw/README.md`](../packages/consumers/openclaw/README.md)
  - [`distribution/claude-marketplace/README.md`](../distribution/claude-marketplace/README.md)
- step 1 / 2 / 3
  - 1. 复用 repo 内现有的 OpenClaw-compatible bundle + starter pack
  - 2. 在 owner auth 可用时走官方 OpenClaw / ClawHub 提交路径
  - 3. 只有发布并可发现后，才写 `listed on ClawHub`

### `MCP`

- exact URL
  - [Official MCP Registry](https://registry.modelcontextprotocol.io/)
- exact local path
  - [`packages/surfaces/mcp/README.md`](../packages/surfaces/mcp/README.md)
  - [`packages/surfaces/mcp/package.json`](../packages/surfaces/mcp/package.json)
  - [`packages/surfaces/mcp/server.json`](../packages/surfaces/mcp/server.json)
- step 1 / 2 / 3
  - 1. 保持 package metadata / `mcpName` / `server.json` / CLI bin / docs 处于 publish-ready
  - 2. 在 owner auth 可用时完成 npm publish + registry submission
  - 3. 只有 registry 可检索后，才写 `listed in the official MCP Registry`

## npm Registry Truth

本轮 fresh check 只确认了一件事：

- `@switchyard/consumer-codex` 当前 **未在 npm registry 上发现已发布版本**
- `@switchyard/consumer-claude-code` 当前 **未在 npm registry 上发现已发布版本**
- `@switchyard/consumer-openclaw` 当前 **未在 npm registry 上发现已发布版本**
- `@switchyard/surface-mcp` 当前 **未在 npm registry 上发现已发布版本**

所以当前最诚实的话术是：

- `npm-ready package metadata landed in repo`
- `publish-ready artifact exists in repo`
- `no npm publish claimed yet`
- `no release publish claimed yet`

而不是：

- `available on npm now`

## How To Talk About These Surfaces

### 可以说

- `package-ready`
- `copy-ready starter pack`
- `builder-facing public frontdoor`
- `partial thin compat`
- `read-only MCP surface`
- `docs-first discoverability surface`
- `official surface exists, but Switchyard is not listed yet`

### 不可以说

- `officially listed`
- `marketplace live`
- `fully supported plugin`
- `full parity`
- `production launch complete`

## Fastest Frontdoors

- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- [docs/compat/codex.md](./compat/codex.md)
- [docs/compat/claude-code.md](./compat/claude-code.md)
- [docs/compat/openclaw.md](./compat/openclaw.md)
