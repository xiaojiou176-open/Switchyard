# Switchyard Plugin And Skills Starter Kits

This page does **not** claim that `Codex`, `Claude Code`, `OpenClaw`, or `MCP`
 already have full support.

It exists to give external builders a clear construction guide:

> where to start, how far the current surface really goes, and where the repo
> still needs to fail closed

If you are not even sure whether this page is your first stop, go here first:

- [docs/builder-intent-router.md](./builder-intent-router.md)

## Current Honest Role

The most truthful description of these starter kits today is:

- builder-facing
- local-first
- truth-first
- fail-closed

They do **not** pretend to be complete product integrations. They exist so
plugin builders, skills packs, docs/SEO tooling, and local automation glue can
start from a real narrow slice instead of guessing.

## Machine-Readable Source

- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)
- [docs/public-surface-catalog.json](./public-surface-catalog.json)
- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/discoverability-keyword-truth.json](./discoverability-keyword-truth.json)

Stable read-only entrypoints:

```bash
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
pnpm run switchyard:cli -- provider-catalog
pnpm run switchyard:cli -- keyword-truth
```

## If You Need A Full Directory Instead Of A Single Kit

- [starter-packs/README.md](../starter-packs/README.md)
- [docs/starter-pack-index.md](./starter-pack-index.md)

## If Your Real Question Is “Which Pack Should I Start With?”

Go here next:

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- `pnpm run switchyard:cli -- starter-pack-chooser`
- `pnpm run switchyard:cli -- starter-pack-chooser-schema`
- `pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder`
- `pnpm run switchyard:cli -- starter-pack-scenario --target docs-seo-sync-skill`

If you need side-by-side comparison instead of a quick recommendation:

- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- `pnpm run switchyard:cli -- starter-pack-comparison`
- `pnpm run switchyard:cli -- starter-pack-filter --target read-only-truth`

If you want a complete journey instead of a chooser:

- [docs/builder-journeys.md](./builder-journeys.md)
- `pnpm run switchyard:cli -- builder-journeys`

If your next question is host integration:

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- `pnpm run switchyard:cli -- host-playbooks`
- `pnpm run switchyard:cli -- host-playbook --target codex`
- `pnpm run switchyard:cli -- host-playbook --target mcp`
- `pnpm run switchyard:cli -- host-examples`
- `pnpm run switchyard:cli -- host-example --target codex`

## Starter Kits

### `codex`

- role: Responses-style runtime bridge starter
- best entry: `pnpm run switchyard:cli -- compat-target --target codex`
- required inputs:
  - service runtime base URL
  - Codex-side request text
  - explicit provider/lane choice for dual-lane providers
- do not pretend:
  - tool execution parity
  - MCP parity
  - worktree parity

### `claude-code`

- role: message/runtime bridge starter
- best entry: `pnpm run switchyard:cli -- compat-target --target claude-code`
- required inputs:
  - service runtime base URL
  - Claude Code-style message payload
  - explicit target provider when model families overlap
- do not pretend:
  - terminal shell parity
  - approval parity
  - tool/MCP parity

### `openclaw`

- role: delegation-first runtime bridge starter
- best entry: `pnpm run switchyard:cli -- compat-target --target openclaw`
- required inputs:
  - service runtime base URL
  - delegation-first request shape
- do not pretend:
  - operator parity
  - product-shell parity

### `mcp`

- role: read-only MCP inspector starter
- best entry: `pnpm run switchyard:cli -- builder-kit --target mcp`
- required inputs:
  - service runtime base URL
  - MCP client that only needs inspection truth
- do not pretend:
  - execution brain
  - write plane

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [docs/starter-pack-index.md](./starter-pack-index.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/builder-journeys.md](./builder-journeys.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
