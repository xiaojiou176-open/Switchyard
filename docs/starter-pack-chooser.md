# Switchyard Starter Pack Chooser

If the only sentence in your head is:

> **Which starter pack should I pick first?**

this page is the answer.

In plain English:

- `starter-packs/README.md` is the shelf overview
- `starter-packs/index.json` is the warehouse map
- this page is the front-desk guide

It does not invent new capability. It reorganizes the packs that already exist
into a cleaner first decision.

## Machine-Readable Source

- [catalogs/starter-pack-chooser.json](../catalogs/starter-pack-chooser.json)
- [catalogs/starter-pack-chooser.schema.json](../catalogs/starter-pack-chooser.schema.json)

## Read-Only Access

```bash
pnpm run switchyard:cli -- starter-pack-chooser
pnpm run switchyard:cli -- starter-pack-chooser-schema
pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder
pnpm run switchyard:cli -- starter-pack-scenario --target docs-seo-sync-skill
```

- `switchyard.catalog.starter_pack_chooser`
- `switchyard.catalog.starter_pack_chooser_schema`
- `switchyard.catalog.starter_pack_scenario`

## Quick Pick

| If your first job is... | Choose this pack | Why | Do not expect |
| --- | --- | --- | --- |
| Bridge Codex-style text requests into Switchyard | `codex` | thin Responses-style runtime bridge | tool execution parity / MCP parity / worktree parity |
| Bridge Claude Code-style message payloads | `claude-code` | thin message/runtime bridge | terminal shell parity / approval parity / tool parity |
| Keep OpenClaw-style delegation without copying the product shell | `openclaw` | delegation-first bridge with product boundary intact | operator parity / product-shell parity |
| Inspect runtime truth through MCP | `mcp` | read-only runtime inspector over stdio | execution brain / write plane |
| Build a provider triage recipe | `runtime-diagnostics-pack` | read-only diagnostics and support-bundle recipe | invoke / acquisition write / browser automation |
| Sync docs or SEO wording to truthful labels | `docs-seo-sync-pack` | discoverability helper with human review built in | marketing autopilot / launch automation |

## Decision Flow

```mermaid
flowchart TD
    A["What are you building first?"] --> B["A builder/helper"]
    A --> C["A skill or automation pack"]
    B --> D["Codex-style text bridge"]
    B --> E["Claude Code-style message bridge"]
    B --> F["OpenClaw-style delegation bridge"]
    B --> G["Read-only MCP inspector"]
    C --> H["Provider triage recipe"]
    C --> I["Docs or SEO truth-sync recipe"]
    D --> J["Choose `codex`"]
    E --> K["Choose `claude-code`"]
    F --> L["Choose `openclaw`"]
    G --> M["Choose `mcp`"]
    H --> N["Choose `runtime-diagnostics-pack`"]
    I --> O["Choose `docs-seo-sync-pack`"]
```

## What This Page Helps With

- first-time builder onboarding
- plugin/skills/automation discoverability
- SEO pages that answer a real route-selection question
- machine-readable pack selection for local tooling

## What It Does Not Mean

This chooser is **not**:

- a plugin marketplace
- full Codex parity
- full Claude Code parity
- full OpenClaw parity
- an MCP execution brain
- launch automation

## Related Pages

- [starter-packs/README.md](../starter-packs/README.md)
- [catalogs/starter-pack-comparison.json](../catalogs/starter-pack-comparison.json)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
