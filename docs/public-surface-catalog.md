# Switchyard Public Surface Catalog

This page explains the **machine-readable public catalog** for Switchyard.

Think of it as two things at once:

- the human-readable signboard for which public surfaces are real today
- the machine-readable directory for the current surface, compat, builder-kit,
  skill-pack, provider, and MCP truth

It is **not** the marketing page.
It is also **not** a promise that every future surface is already supported.

## Current Honest Role

Today the catalog should be read like this:

- `CLI` = `partial`
- `MCP` = `partial`
- `Codex / Claude Code / OpenClaw compat` = `partial`
- `Language policy` = English-first public front door with bilingual helper
  pages

In plain English:

> There is now a stable outward catalog that tools can consume directly.
> That catalog describes current truth boundaries. It does not quietly rewrite
> future ambitions into present support.

If you are here to choose the right route:

- surface/support truth
  - start with this catalog
- keyword and discoverability truth
  - go to [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- first route by question
  - go to [docs/builder-intent-router.md](./builder-intent-router.md)
- starter-pack choice
  - go to [docs/starter-pack-chooser.md](./starter-pack-chooser.md) or
    [docs/builder-journeys.md](./builder-journeys.md)
- package/listing truth
  - go to [docs/public-distribution-ledger.md](./public-distribution-ledger.md)

## Machine-Readable Sources

### JSON catalogs

- [docs/public-surface-catalog.json](./public-surface-catalog.json)
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
- [docs/public-distribution-ledger.json](./public-distribution-ledger.json)
- [docs/public-distribution-ledger.schema.json](./public-distribution-ledger.schema.json)

This JSON layer currently covers:

- public surface truth
- thin compat target truth
- builder kit truth
- skill pack truth
- provider runtime truth
- current MCP truth
- read-only CLI command inventory

If you only need one slice instead of the aggregate catalog, read these directly:

- [docs/compat-target-catalog.md](./compat-target-catalog.md)
- [docs/compat-target-catalog.json](./compat-target-catalog.json)
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)

## Read-Only CLI Access

```bash
pnpm run switchyard:cli -- surface-catalog
pnpm run switchyard:cli -- surface-catalog-schema
pnpm run switchyard:cli -- public-distribution-ledger
pnpm run switchyard:cli -- public-distribution-ledger-schema
pnpm run switchyard:cli -- compat-target-catalog
pnpm run switchyard:cli -- compat-target-catalog-schema
pnpm run switchyard:cli -- compat-targets
pnpm run switchyard:cli -- compat-target --target codex
pnpm run switchyard:cli -- builder-kit-catalog
pnpm run switchyard:cli -- builder-kit-catalog-schema
pnpm run switchyard:cli -- builder-kits
pnpm run switchyard:cli -- skill-pack-catalog
pnpm run switchyard:cli -- skill-pack-catalog-schema
pnpm run switchyard:cli -- skill-packs
pnpm run switchyard:cli -- host-playbooks
pnpm run switchyard:cli -- host-examples
pnpm run switchyard:cli -- builder-journeys
pnpm run switchyard:cli -- builder-intent-router
pnpm run switchyard:cli -- keyword-truth
pnpm run switchyard:cli -- provider-catalog
pnpm run switchyard:cli -- starter-manifests
pnpm run switchyard:cli -- starter-examples
pnpm run switchyard:cli -- starter-pack-index
pnpm run switchyard:cli -- starter-pack-chooser
pnpm run switchyard:cli -- starter-pack-comparison
pnpm run switchyard:cli -- mcp-status
pnpm run switchyard:cli -- mcp-tools
pnpm run switchyard:cli -- mcp-tool-catalog
pnpm run switchyard:cli -- mcp-tool-catalog-schema
pnpm run switchyard:mcp -- --base-url http://127.0.0.1:4010
```

These commands exist so that plugin/build tooling can consume current truth
without hard-coding it.

## Read-Only MCP Access

The same catalog truth is also readable from the read-only MCP surface:

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
- `switchyard.catalog.builder_kit_catalog`
- `switchyard.catalog.builder_kit_catalog_schema`
- `switchyard.catalog.skill_pack_catalog`
- `switchyard.catalog.skill_pack_catalog_schema`
- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbook`
- `switchyard.catalog.builder_journeys`
- `switchyard.catalog.builder_intent_router`
- `switchyard.catalog.keyword_truth`
- `switchyard.catalog.mcp_status`
- `switchyard.catalog.mcp_tools`

## Builder And Skills Routes

If you need more than raw status and want a concrete builder route, open:

- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [starter-packs/README.md](../starter-packs/README.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/builder-journeys.md](./builder-journeys.md)
- [docs/builder-intent-router.md](./builder-intent-router.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)

## Truth Rules

Use this catalog to stop four common mistakes:

- turning `partial` into `supported now`
- turning read-only into execution capability
- turning package-ready into listed-live
- turning bilingual helper surfaces into the default public-language policy

## Decision Summary

> The public surface catalog is a truth-first directory, not a hype page.
> It exists so humans and tools can read the same current boundary and make the
> same honest claim.
