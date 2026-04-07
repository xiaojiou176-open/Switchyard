# Switchyard MCP Status

## Current Status

- `partial`
- `committed read-only stdio MCP server/tool surface on main`
- `not an execution brain`

## Why This Page Exists

因为很多人会搜：

- `Switchyard MCP`
- `Switchyard MCP server`
- `AI runtime MCP backend`

如果没有这一页，搜索者和 AI 工具很容易把：

- `read-only thin surface`
- `full MCP backend`

混成一回事。

## What Is True Right Now

- `Switchyard` currently ships a committed service runtime and SDK/client surfaces.
- `Switchyard` now also ships a committed **read-only stdio MCP server/tool surface**:
  - startup command:
    - `pnpm run switchyard:mcp`
  - committed package:
    - `packages/surfaces/mcp`
  - backing model:
    - service-runtime-backed
    - local-first
    - read-only
- the current landed toolset is intentionally narrow:
  - `switchyard.runtime.bootstrap`
  - `switchyard.providers.list`
  - `switchyard.runtime.health`
  - `switchyard.auth.status`
  - provider-scoped status / probe / remediation / current-page / current-console / current-network
  - provider support-bundle / readiness / attach-target / diagnose ladder
  - doc-backed catalog truth for:
    - surface catalog schema
    - compat target catalog / schema / entries
    - builder kit catalog / schema / entries
    - skill pack catalog / schema / entries
    - provider catalog / provider entry
    - builder kits / skill packs
    - host playbooks / host examples
    - builder journeys
    - builder intent router
    - keyword truth
    - starter manifests / starter examples / their schemas
    - starter-pack index / chooser / comparison
    - builder templates / builder examples
    - skill templates / skill examples
- this surface is **not**:
  - an execution brain
  - a write plane
  - a full Codex / Claude Code embedded backend
  - a worktree / tool / terminal parity layer

## What Is Plausible Later

如果未来阶段 gate 继续打开，一个更合理的方向是：

- 在当前 read-only surface 之上继续补更稳的 adapter ergonomics
- 不把 MCP 语义倒灌进 provider runtime core

如果你只是想让 plugin / skills / builder tooling 先知道当前 truth，
现在最稳的入口有两条：

- 直接连接 `pnpm run switchyard:mcp`
- 或读取：
  - `pnpm run switchyard:cli -- mcp-status`
  - `pnpm run switchyard:cli -- surface-catalog`
  - `pnpm run switchyard:cli -- compat-target-catalog`
  - `pnpm run switchyard:cli -- compat-target-catalog-schema`
  - `pnpm run switchyard:cli -- builder-kit-catalog`
  - `pnpm run switchyard:cli -- builder-kit-catalog-schema`
  - `pnpm run switchyard:cli -- skill-pack-catalog`
  - `pnpm run switchyard:cli -- skill-pack-catalog-schema`
  - `pnpm run switchyard:cli -- mcp-tools`
  - `pnpm run switchyard:cli -- mcp-tool-catalog`
  - `pnpm run switchyard:cli -- mcp-tool-catalog-schema`
  - `pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health`
  - `pnpm run switchyard:cli -- starter-manifests-schema`
  - `pnpm run switchyard:cli -- starter-examples-schema`
  - `pnpm run switchyard:cli -- starter-pack-index`
  - `pnpm run switchyard:cli -- starter-pack-index-schema`
  - `pnpm run switchyard:cli -- starter-pack-chooser`
  - `pnpm run switchyard:cli -- starter-pack-chooser-schema`
  - `pnpm run switchyard:cli -- starter-pack-scenario --target mcp-inspector`
  - `docs/public-surface-catalog.json`

如果你想要一份“能直接跑起来”的最小样板，不想自己从零拼 client 配置，
可以直接看：

- [examples/mcp-inspector/README.md](../examples/mcp-inspector/README.md)

如果你现在更想知道：

> **“我应该先拿 `mcp` 这个 starter pack，还是别的 pack？”**

那先别只看 tool inventory，直接看：

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- `switchyard.catalog.starter_pack_chooser`
- `switchyard.catalog.starter_pack_scenario`

如果你已经决定把 `Switchyard` 接进一个宿主，而不是只读当前真相，
下一步再看：

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbook`
- [docs/host-integration-examples.md](./host-integration-examples.md)
- `switchyard.catalog.host_examples`
- `switchyard.catalog.host_example`

## Fastest Route By Question

你可以把这块理解成“值班台分诊表”：

- 你要看 runtime / auth / provider 当前状态：
  - `switchyard.runtime.bootstrap`
  - `switchyard.providers.list`
  - `switchyard.runtime.health`
  - `switchyard.auth.status`
  - `switchyard.provider.status`
  - `switchyard.provider.probe`
  - `switchyard.provider.remediation`
  - `switchyard.provider.current_page`
  - `switchyard.provider.current_console`
  - `switchyard.provider.current_network`
  - `switchyard.provider.store_readiness`
  - `switchyard.provider.live_readiness`
  - `switchyard.provider.attach_target`
  - `switchyard.provider.diagnose_ladder`
  - `switchyard.provider.support_bundle`
  - `switchyard.provider.diagnose`
- 你要看 surface / compat / provider truth：
  - `switchyard.catalog.surface_catalog`
  - `switchyard.catalog.surface_catalog_schema`
  - `switchyard.catalog.compat_target_catalog`
  - `switchyard.catalog.compat_target_catalog_schema`
  - `switchyard.catalog.builder_kit_catalog`
  - `switchyard.catalog.builder_kit_catalog_schema`
  - `switchyard.catalog.skill_pack_catalog`
  - `switchyard.catalog.skill_pack_catalog_schema`
  - `switchyard.catalog.provider_catalog`
  - `switchyard.catalog.provider_entry`
  - `switchyard.catalog.compat_targets`
  - `switchyard.catalog.compat_target`
- 你要选 builder path / skill pack / starter pack：
  - `switchyard.catalog.builder_kits`
  - `switchyard.catalog.builder_kit`
  - `switchyard.catalog.skill_packs`
  - `switchyard.catalog.skill_pack`
  - `switchyard.catalog.starter_manifests`
  - `switchyard.catalog.starter_manifests_schema`
  - `switchyard.catalog.starter_examples`
  - `switchyard.catalog.starter_examples_schema`
  - `switchyard.catalog.starter_pack_index`
  - `switchyard.catalog.starter_pack_index_schema`
  - `switchyard.catalog.starter_pack_entry`
  - `switchyard.catalog.starter_pack_chooser`
  - `switchyard.catalog.starter_pack_chooser_schema`
  - `switchyard.catalog.starter_pack_scenario`
  - `switchyard.catalog.starter_pack_comparison`
  - `switchyard.catalog.starter_pack_comparison_schema`
  - `switchyard.catalog.starter_pack_filter`
- 你要一条完整 builder journey，或要看 keyword-claim truth：
  - `switchyard.catalog.builder_journeys`
  - `switchyard.catalog.builder_journeys_schema`
  - `switchyard.catalog.builder_journey`
  - `switchyard.catalog.builder_intent_router`
  - `switchyard.catalog.builder_intent_router_schema`
  - `switchyard.catalog.builder_intent`
  - `switchyard.catalog.keyword_truth`
  - `switchyard.catalog.keyword_truth_schema`
  - `switchyard.catalog.keyword_entry`
- 你要宿主接入说明和 runnable example：
  - `switchyard.catalog.host_playbooks`
  - `switchyard.catalog.host_playbooks_schema`
  - `switchyard.catalog.host_playbook`
  - `switchyard.catalog.host_examples`
  - `switchyard.catalog.host_examples_schema`
  - `switchyard.catalog.host_example`
- 你要 starter template / example truth，或想先确认 MCP 自己现在暴露了什么：
  - `switchyard.catalog.builder_template`
  - `switchyard.catalog.builder_example`
- `switchyard.catalog.skill_template`
- `switchyard.catalog.skill_example`
- `switchyard.catalog.mcp_status`
- `switchyard.catalog.mcp_tools`
- `switchyard.catalog.mcp_tool_catalog`
- `switchyard.catalog.mcp_tool_catalog_schema`
- `switchyard.catalog.mcp_tool`

## What Would Be Fake Today

以下说法现在都不诚实：

- `Switchyard MCP has full tool parity today`
- `Switchyard MCP is already an execution brain`
- `Switchyard is already a Codex/Claude Code MCP backend`

当前最多能诚实写成：

> `Switchyard` now ships a committed **read-only MCP surface** on `main`, but it is still only a thin partial server/tool slice.
