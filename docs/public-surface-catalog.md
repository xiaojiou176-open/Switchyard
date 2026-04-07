# Switchyard Public Surface Catalog

这页是给 **plugin / skills / builder tooling** 的机器可读目录说明。

你可以把它理解成两张表的结合体：

- 给人看的招牌：哪几扇门真的开着
- 给机器看的目录：当前哪些 surface / compat target 可以被稳定读取

它不是 marketing 页。  
它也不是“今天已经全都支持”的承诺。

---

## Current Honest Role

当前它最诚实的定位是：

- `CLI` = `partial`
- `MCP` = `partial`
- `Codex / Claude Code / OpenClaw compat` = `partial`

更直白一点说：

> 现在已经有一份可以直接给外部工具吃的目录了，  
> 但这份目录描述的是 **当前真实边界**，不是把未来梦想偷写成今天支持。

如果你是来找路的，可以先这样分：

- 要看 surface / support truth：先读这页 catalog
- 要看关键词能不能诚实占位：去 [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- 要是不知道第一站该去哪：去 [docs/builder-intent-router.md](./builder-intent-router.md)
- 要选 builder 路径：去 [docs/starter-pack-chooser.md](./starter-pack-chooser.md) 或 [docs/builder-journeys.md](./builder-journeys.md)

---

## Machine-Readable Sources

### JSON catalog

- [docs/public-surface-catalog.json](./public-surface-catalog.json)
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
- [docs/public-distribution-ledger.json](./public-distribution-ledger.json)
- [docs/public-distribution-ledger.schema.json](./public-distribution-ledger.schema.json)

这份 JSON 现在覆盖：

- public surface truth
- thin compat target mirror truth
- builder-facing starter kit truth
- skills pack starter truth
- provider runtime catalog truth
- current MCP truth
- CLI read-only command inventory

如果你只想消费 compat target 这一小块，而不是整个 aggregate frontdoor，
优先直接读：

- [docs/compat-target-catalog.md](./compat-target-catalog.md)
- [docs/compat-target-catalog.json](./compat-target-catalog.json)
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)

如果你只想消费 builder kits 这一小块，而不是翻完整张 aggregate catalog：

- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)

如果你只想消费 skill packs 这一小块，而不是在 aggregate frontdoor 里来回翻：

- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)

### Read-only CLI access

当前 repo 也提供了只读 CLI 入口：

```bash
pnpm run switchyard:cli -- surface-catalog
pnpm run switchyard:cli -- surface-catalog-schema
pnpm run switchyard:cli -- public-distribution-ledger
pnpm run switchyard:cli -- public-distribution-ledger-schema
pnpm run switchyard:cli -- distribution-surfaces
pnpm run switchyard:cli -- distribution-surface --target codex
pnpm run switchyard:cli -- compat-target-catalog
pnpm run switchyard:cli -- compat-target-catalog-schema
pnpm run switchyard:cli -- compat-targets
pnpm run switchyard:cli -- compat-target --target codex
pnpm run switchyard:cli -- compat-target --target claude-code
pnpm run switchyard:cli -- compat-target --target openclaw
pnpm run switchyard:cli -- builder-kit-catalog
pnpm run switchyard:cli -- builder-kit-catalog-schema
pnpm run switchyard:cli -- builder-kits
pnpm run switchyard:cli -- builder-kit --target codex
pnpm run switchyard:cli -- builder-kit --target claude-code
pnpm run switchyard:cli -- builder-kit --target openclaw
pnpm run switchyard:cli -- builder-kit --target mcp
pnpm run switchyard:cli -- skill-pack-catalog
pnpm run switchyard:cli -- skill-pack-catalog-schema
pnpm run switchyard:cli -- skill-packs
pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack
pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack
pnpm run switchyard:cli -- starter-manifests
pnpm run switchyard:cli -- provider-catalog
pnpm run switchyard:cli -- provider-entry --target chatgpt
pnpm run switchyard:cli -- provider-entry --target openai
pnpm run switchyard:cli -- starter-examples
pnpm run switchyard:cli -- starter-manifests-schema
pnpm run switchyard:cli -- starter-examples-schema
pnpm run switchyard:cli -- builder-template --target codex
pnpm run switchyard:cli -- builder-example --target codex
pnpm run switchyard:cli -- skill-template --target runtime-diagnostics-pack
pnpm run switchyard:cli -- skill-example --target runtime-diagnostics-pack
pnpm run switchyard:cli -- mcp-status
pnpm run switchyard:cli -- mcp-tools
pnpm run switchyard:cli -- mcp-tool-catalog
pnpm run switchyard:cli -- mcp-tool-catalog-schema
pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health
pnpm run switchyard:mcp -- --base-url http://127.0.0.1:4010
```

这些命令的目标不是“执行某个 consumer product”，而是：

- 让 plugin/build tooling 读取当前真实 support boundary
- 让 skills packs / automations / docs generators 不必硬编码真值
- 让 future MCP/plugin-facing surfaces 至少先有一个 truth-first catalog

如果你要把这份 JSON 当成正式合同来消费，下一步应该是：

- 先读 `docs/public-surface-catalog.schema.json`
- 再校验 `docs/public-surface-catalog.json`

### Plugin and skills starter kits

如果你不只是想“读状态”，而是想知道“现在应该从哪条窄路开始接”，就去读：

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [docs/starter-pack-index.md](./starter-pack-index.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/builder-journeys.md](./builder-journeys.md)
- [docs/builder-intent-router.md](./builder-intent-router.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)

或者直接用：

- `pnpm run switchyard:cli -- builder-kits`
- `pnpm run switchyard:cli -- builder-kit --target codex`
- `pnpm run switchyard:cli -- builder-kit --target claude-code`
- `pnpm run switchyard:cli -- builder-kit --target openclaw`
- `pnpm run switchyard:cli -- builder-kit --target mcp`
- `pnpm run switchyard:cli -- skill-packs`
- `pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack`
- `pnpm run switchyard:cli -- host-playbooks`
- `pnpm run switchyard:cli -- host-playbooks-schema`
- `pnpm run switchyard:cli -- host-playbook --target codex`
- `pnpm run switchyard:cli -- host-examples`
- `pnpm run switchyard:cli -- host-examples-schema`
- `pnpm run switchyard:cli -- host-example --target codex`
- `pnpm run switchyard:cli -- builder-journeys`
- `pnpm run switchyard:cli -- builder-journeys-schema`
- `pnpm run switchyard:cli -- builder-journey --target codex-first-success`
- `pnpm run switchyard:cli -- builder-intent-router`
- `pnpm run switchyard:cli -- builder-intent-router-schema`
- `pnpm run switchyard:cli -- builder-intent --target support-truth`
- `pnpm run switchyard:cli -- keyword-truth`
- `pnpm run switchyard:cli -- keyword-truth-schema`
- `pnpm run switchyard:cli -- keyword-entry --target switchyard-mcp`
- `pnpm run switchyard:cli -- provider-catalog`
- `pnpm run switchyard:cli -- provider-catalog-schema`
- `pnpm run switchyard:cli -- provider-entry --target chatgpt`
- `pnpm run switchyard:cli -- provider-entry --target openai:byok`
- `pnpm run switchyard:cli -- provider-entry --target gemini:web-login`
- `pnpm run switchyard:cli -- starter-manifests`
- `pnpm run switchyard:cli -- starter-examples`
- `pnpm run switchyard:cli -- starter-manifests-schema`
- `pnpm run switchyard:cli -- starter-examples-schema`
- `pnpm run switchyard:cli -- starter-pack-index`
- `pnpm run switchyard:cli -- starter-pack-index-schema`
- `pnpm run switchyard:cli -- starter-pack-entry --target codex`
- `pnpm run switchyard:cli -- starter-pack-chooser`
- `pnpm run switchyard:cli -- starter-pack-chooser-schema`
- `pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder`
- `pnpm run switchyard:cli -- starter-pack-comparison`
- `pnpm run switchyard:cli -- starter-pack-comparison-schema`
- `pnpm run switchyard:cli -- starter-pack-filter --target read-only-truth`
- `pnpm run switchyard:cli -- builder-template --target codex`
- `pnpm run switchyard:cli -- builder-example --target codex`
- `pnpm run switchyard:cli -- skill-template --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-example --target runtime-diagnostics-pack`

如果你已经在用 MCP client，不想额外绕到 CLI，这批 catalog truth 现在也可以直接从只读 MCP 面里读：

- `switchyard.catalog.surface_catalog`
- `switchyard.catalog.surface_catalog_schema`
- `switchyard.catalog.public_distribution_ledger`
- `switchyard.catalog.public_distribution_ledger_schema`
- `switchyard.catalog.distribution_surfaces`
- `switchyard.catalog.distribution_surface`
- `switchyard.catalog.compat_target_catalog`
- `switchyard.catalog.compat_target_catalog_schema`
- `switchyard.catalog.provider_catalog`
- `switchyard.catalog.provider_entry`
- `switchyard.catalog.compat_targets`
- `switchyard.catalog.compat_target`
- `switchyard.catalog.builder_kit_catalog`
- `switchyard.catalog.builder_kit_catalog_schema`
- `switchyard.catalog.builder_kits`
- `switchyard.catalog.builder_kit`
- `switchyard.catalog.skill_pack_catalog`
- `switchyard.catalog.skill_pack_catalog_schema`
- `switchyard.catalog.skill_packs`
- `switchyard.catalog.skill_pack`
- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbooks_schema`
- `switchyard.catalog.host_playbook`
- `switchyard.catalog.host_examples`
- `switchyard.catalog.host_examples_schema`
- `switchyard.catalog.host_example`
- `switchyard.catalog.builder_journeys`
- `switchyard.catalog.builder_journeys_schema`
- `switchyard.catalog.builder_journey`
- `switchyard.catalog.builder_intent_router`
- `switchyard.catalog.builder_intent_router_schema`
- `switchyard.catalog.builder_intent`
- `switchyard.catalog.keyword_truth`
- `switchyard.catalog.keyword_truth_schema`
- `switchyard.catalog.keyword_entry`
- `switchyard.catalog.provider_catalog`
- `switchyard.catalog.provider_catalog_schema`
- `switchyard.catalog.provider_entry`
- `switchyard.catalog.starter_pack_chooser`
- `switchyard.catalog.starter_pack_chooser_schema`
- `switchyard.catalog.starter_pack_scenario`
- `switchyard.catalog.starter_pack_comparison`
- `switchyard.catalog.starter_pack_comparison_schema`
- `switchyard.catalog.starter_pack_filter`
- `switchyard.catalog.starter_manifests`
- `switchyard.catalog.starter_manifests_schema`
- `switchyard.catalog.starter_examples`
- `switchyard.catalog.starter_examples_schema`
- `switchyard.catalog.starter_pack_index`
- `switchyard.catalog.starter_pack_index_schema`
- `switchyard.catalog.starter_pack_entry`
- `switchyard.catalog.builder_template`
- `switchyard.catalog.builder_example`
- `switchyard.catalog.skill_template`
- `switchyard.catalog.skill_example`
- `switchyard.catalog.mcp_status`
- `switchyard.catalog.mcp_tools`
- `switchyard.catalog.mcp_tool_catalog`
- `switchyard.catalog.mcp_tool_catalog_schema`
- `switchyard.catalog.mcp_tool`

---

## What This Catalog Helps With

builder/skill entries 现在还多了一类 machine-readable 字段：

- `copyReadyPackPath`

说人话，就是：

> 这份 catalog 不只告诉你“有这个 starter”，  
> 现在还告诉你“该去哪个文件夹直接搬走一整包样板”。

### Plugin and skills builders

如果你在做：

- Codex helper/plugin
- Claude Code gateway-side helper
- OpenClaw runtime delegation helper
- AI agent skills pack
- docs/SEO sync tooling

这份 catalog 能帮你先回答：

- 现在到底是不是 `supported now`
- 现在是不是只有 `partial`
- 哪些 feature 仍然 fail-closed
- 哪些东西还只是 `partial / thin / fail-closed`

### Skills pack builders

如果你要做的不是 consumer helper，而是：

- runtime diagnostics pack
- docs / SEO truth sync pack
- local automation glue

那你现在应该先看 `skillPacks`，而不是把这类 starter 混写进 plugin kit。

### What It Does Not Mean

这份 catalog **不等于**：

- 已经有 full MCP backend
- 已经有 full Codex parity
- 已经有 Claude Code terminal parity
- 已经有 OpenClaw product-shell parity

它只是把当前 honest truth 做成了：

- human-readable docs
- machine-readable JSON
- read-only CLI output

---

## Related Pages

- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- [docs/discoverability-keyword-truth.json](./discoverability-keyword-truth.json)
- [docs/discoverability-keyword-truth.schema.json](./discoverability-keyword-truth.schema.json)
- [docs/builder-intent-router.md](./builder-intent-router.md)
- [docs/builder-intent-router.json](./builder-intent-router.json)
- [docs/builder-intent-router.schema.json](./builder-intent-router.schema.json)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/builder-journeys.md](./builder-journeys.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
- [docs/provider-runtime-catalog.json](./provider-runtime-catalog.json)
- [docs/provider-runtime-catalog.schema.json](./provider-runtime-catalog.schema.json)
- [docs/compat-target-catalog.md](./compat-target-catalog.md)
- [docs/compat-target-catalog.json](./compat-target-catalog.json)
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)
- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)
- [docs/mcp-tool-catalog.md](./mcp-tool-catalog.md)
- [docs/mcp-tool-catalog.json](./mcp-tool-catalog.json)
- [docs/mcp-tool-catalog.schema.json](./mcp-tool-catalog.schema.json)
- [docs/compat/README.md](./compat/README.md)
- [docs/mcp.md](./mcp.md)
- [docs/faq.md](./faq.md)

---

## Bottom Line

> `Switchyard` 现在还没到 “CLI / MCP / plugin-facing surfaces 全支持” 的阶段。  
> 但它已经有资格给外部工具提供一份 **truth-first catalog**：  
> `CLI = partial`、`MCP = partial (read-only server/tool surface only)`、compat 仍然是 thin fail-closed，而不是 full parity。
