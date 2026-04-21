# Switchyard MCP Status

## Current Status

- `partial`
- `committed read-only stdio MCP server/tool surface on main`
- `not an execution brain`

## Why This Page Exists

Many users search for:

- `Switchyard MCP`
- `Switchyard MCP server`
- `AI runtime MCP backend`

Without this page, it is easy to confuse:

- a read-only thin surface
- a full MCP backend

## What Is True Right Now

- Switchyard ships a committed service runtime and SDK/client surfaces
- Switchyard now also ships a committed **read-only stdio MCP server/tool
  surface**:
  - startup command:
    - `pnpm run switchyard:mcp`
  - committed package:
    - `packages/surfaces/mcp`
  - backing model:
    - service-runtime-backed
    - local-first
    - read-only
- the landed toolset is intentionally narrow:
  - `switchyard.runtime.bootstrap`
  - `switchyard.providers.list`
  - `switchyard.runtime.health`
  - `switchyard.runtime.doctor`
  - `switchyard.runtime.plan`
  - `switchyard.auth.status`
  - provider-scoped status, doctor, probe, remediation, current-page, current-console,
    and current-network
  - provider support-bundle, readiness, attach-target, and diagnose ladder
  - doc-backed catalog truth for:
    - surface catalog schema
    - compat target catalog, schema, and entries
    - builder kit catalog, schema, and entries
    - skill pack catalog, schema, and entries
    - skill pack route cards
    - provider catalog and provider entry
    - builder kits and skill packs
    - host playbooks and host examples
    - builder journeys
    - builder intent router
    - keyword truth
    - starter manifests and starter examples plus schemas
    - starter-pack index, chooser, and comparison
    - builder templates and builder examples
    - skill templates and skill examples
- this surface is **not**:
  - an execution brain
  - a write plane
  - a full Codex / Claude Code embedded backend
  - a worktree, tool, or terminal parity layer

## What Is Plausible Later

If later phase gates open further, a more reasonable direction is:

- improve adapter ergonomics on top of the current read-only surface
- avoid forcing MCP semantics back into the provider-runtime core

If plugin, skills, or builder tooling only needs current truth, the stable
entrypoints today are:

- connect directly to `pnpm run switchyard:mcp`
- or read:
  - `pnpm run switchyard:cli -- mcp-status`
  - `pnpm run switchyard:cli -- surface-catalog`
  - `pnpm run switchyard:cli -- compat-target-catalog`
  - `pnpm run switchyard:cli -- compat-target-catalog-schema`
  - `pnpm run switchyard:cli -- builder-kit-catalog`
  - `pnpm run switchyard:cli -- builder-kit-catalog-schema`
  - `pnpm run switchyard:cli -- skill-pack-catalog`
  - `pnpm run switchyard:cli -- skill-pack-catalog-schema`
  - `pnpm run switchyard:cli -- skill-pack-routes`
  - `pnpm run switchyard:cli -- skill-pack-routes-schema`
  - `pnpm run switchyard:cli -- skill-pack-route --target runtime-diagnostics-pack`
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
  - `catalogs/mcp-tool-catalog.json`
  - `catalogs/mcp-tool-catalog.schema.json`
  - `catalogs/skill-pack-routes.json`
  - `catalogs/public-surface-catalog.json`

If you want a minimal runnable sample instead of assembling a client manually,
open:

- [examples/mcp-inspector/README.md](../examples/mcp-inspector/README.md)

If your real question is:

> **Should I start with the `mcp` starter pack or another pack?**

Do not stop at the tool inventory. Go here next:

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- `switchyard.catalog.starter_pack_chooser`
- `switchyard.catalog.starter_pack_scenario`

If you have already decided to attach Switchyard to a host instead of only
reading current truth, go here next:

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbook`
- [docs/host-integration-examples.md](./host-integration-examples.md)
- `switchyard.catalog.host_examples`
- `switchyard.catalog.host_example`

If you already picked a **skill pack** and your real question is:

> **What is the coordinated CLI + MCP route for this pack?**

go here next:

- `pnpm run switchyard:cli -- skill-pack-routes`
- `pnpm run switchyard:cli -- skill-pack-route --target runtime-diagnostics-pack`
- `switchyard.catalog.skill_packs`
- `switchyard.catalog.skill_pack`
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)

## Fastest Route By Question

Treat this section like a triage desk:

- if you need runtime, auth, or provider state:
  - `switchyard.runtime.bootstrap`
  - `switchyard.providers.list`
  - `switchyard.runtime.health`
  - `switchyard.runtime.doctor`
  - `switchyard.runtime.plan`
  - `switchyard.auth.status`
  - `switchyard.provider.status`
  - `switchyard.provider.doctor`
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
- if you need surface, compat, or provider truth:
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
- if you need a builder path, skill pack, or starter pack:
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
- if you need a full builder journey or keyword-claim truth:
  - `switchyard.catalog.builder_journeys`
  - `switchyard.catalog.builder_journeys_schema`
  - `switchyard.catalog.builder_journey`
  - `switchyard.catalog.builder_intent_router`
  - `switchyard.catalog.builder_intent_router_schema`
  - `switchyard.catalog.builder_intent`
  - `switchyard.catalog.keyword_truth`
  - `switchyard.catalog.keyword_truth_schema`
  - `switchyard.catalog.keyword_entry`
- if you need host integration docs or runnable examples:
  - `switchyard.catalog.host_playbooks`
  - `switchyard.catalog.host_playbooks_schema`
  - `switchyard.catalog.host_playbook`
  - `switchyard.catalog.host_examples`
  - `switchyard.catalog.host_examples_schema`
  - `switchyard.catalog.host_example`
- if you need starter templates/examples or the MCP inventory itself:
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

These claims are still dishonest:

- `Switchyard MCP has full tool parity today`
- `Switchyard MCP is already an execution brain`
- `Switchyard is already a Codex/Claude Code MCP backend`

The most truthful public wording today is:

> Switchyard ships a committed **read-only MCP surface** on `main`, but it is
> still only a thin partial server/tool slice.
