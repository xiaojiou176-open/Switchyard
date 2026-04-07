# Switchyard Builder Intent Router

如果你现在脑子里只有一句话：

> **“我现在这个问题，第一站到底该去哪？”**

那这页就是给你的。

说得更直白一点：

- `README` 像机场大厅总牌子
- `docs/README` 像资料柜总目录
- 这页则像入口分诊台

它的任务不是发明新能力，而是把 **已经 landed 的 truthful surfaces** 压成一张更快选路的地图。

## Machine-readable Source

- [docs/builder-intent-router.json](./builder-intent-router.json)
- [docs/builder-intent-router.schema.json](./builder-intent-router.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- builder-intent-router
pnpm run switchyard:cli -- builder-intent-router-schema
pnpm run switchyard:cli -- builder-intent --target support-truth
```

## Read-only MCP Access

- `switchyard.catalog.builder_intent_router`
- `switchyard.catalog.builder_intent_router_schema`
- `switchyard.catalog.builder_intent`

## Quick Router

| If your first question is... | Start here | Machine-readable first hop | Do not start with |
| --- | --- | --- | --- |
| `What is actually supported right now?` | [docs/public-surface-catalog.md](./public-surface-catalog.md) | `surface-catalog` / `switchyard.catalog.surface_catalog` | `starter-pack-chooser` |
| `Which starter pack should I pick first?` | [docs/starter-pack-chooser.md](./starter-pack-chooser.md) | `starter-pack-chooser` / `switchyard.catalog.starter_pack_chooser` | `host playbooks` |
| `I need to compare or filter packs before choosing.` | [docs/starter-pack-comparison.md](./starter-pack-comparison.md) | `starter-pack-comparison` / `switchyard.catalog.starter_pack_comparison` | `builder-journeys` |
| `I want one full builder path to first success.` | [docs/builder-journeys.md](./builder-journeys.md) | `builder-journeys` / `switchyard.catalog.builder_journeys` | `compat README` |
| `I already chose a route. How do I wire a host?` | [docs/host-integration-playbooks.md](./host-integration-playbooks.md) | `host-playbooks` / `switchyard.catalog.host_playbooks` | `starter-pack-chooser` |
| `I need a runnable host-local example.` | [docs/host-integration-examples.md](./host-integration-examples.md) | `host-examples` / `switchyard.catalog.host_examples` | `keyword-truth` |
| `I need to acquire or repair a Web/Login browser session first.` | [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md) | `host-playbooks` / `switchyard.catalog.host_playbooks` | `compat README` |
| `Which keyword claims are truthful?` | [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md) | `keyword-truth` / `switchyard.catalog.keyword_truth` | `compat README` |
| `Which provider or lane am I even talking about?` | [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md) | `provider-catalog` / `switchyard.catalog.provider_catalog` | `builder-journeys` |
| `What can the read-only MCP surface inspect today?` | [docs/mcp.md](./mcp.md) | `mcp-status` / `switchyard.catalog.mcp_status` | `host examples` |

## Human Rule Of Thumb

你可以先用一句大白话来记：

- **要判断现在到底支持什么**：先看 catalog
- **要决定走哪条 builder 路**：先看 chooser / comparison / journeys
- **要落到具体接法**：先看 host playbooks / examples
- **要校正 outward wording**：先看 keyword truth
- **要看 MCP 今天到底能干什么**：先看 MCP 页面
- **要先把 Web/Login 浏览器工位修好**：先看 dev bootstrap / auth-portal / service-first runbook

## What This Router Helps With

- first-hop routing for new builders
- plugin / skills / local automation onboarding
- docs/SEO discoverability without claim inflation
- machine-readable route lookup for local tooling

## What It Does Not Mean

这张分诊台不等于：

- launch page
- recommendation engine
- plugin marketplace
- full parity promise
- stronger support claim than current docs already allow

它只是把当前 builder-facing、partial、fail-closed 的 truthful surfaces 做成一个更好找路的入口。

## Related Pages

- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/builder-journeys.md](./builder-journeys.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
- [docs/mcp.md](./mcp.md)
