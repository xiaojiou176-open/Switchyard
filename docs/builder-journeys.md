# Switchyard Builder Journeys

If you do not want to assemble a route from chooser, comparison, playbooks, and
examples yourself, treat this page as:

> **the builder route map**

In plain English:

- the chooser helps you pick
- the comparison page helps you compare
- the host playbooks/examples help you continue
- this page connects the whole trip from first route to first success

It is not a launch page or marketplace. It is a route map for landed builder
journeys.

## Machine-Readable Source

- [docs/builder-journeys.json](./builder-journeys.json)
- [docs/builder-journeys.schema.json](./builder-journeys.schema.json)

## Read-Only Access

```bash
pnpm run switchyard:cli -- builder-journeys
pnpm run switchyard:cli -- builder-journeys-schema
pnpm run switchyard:cli -- builder-journey --target codex-first-success
```

- `switchyard.catalog.builder_journeys`
- `switchyard.catalog.builder_journeys_schema`
- `switchyard.catalog.builder_journey`

## Journey Index

| Journey | Best for | Start here | Next stop | First success |
| --- | --- | --- | --- | --- |
| `codex-first-success` | text-only Codex helper | `starter-pack-chooser` | `host playbooks` | `pnpm run example:host-codex` |
| `claude-code-first-success` | message/runtime bridge | `starter-pack-chooser` | `host playbooks` | `pnpm run example:host-claude-code` |
| `openclaw-first-success` | delegation-first bridge | `starter-pack-chooser` | `host playbooks` | `pnpm run example:host-openclaw` |
| `mcp-read-only-first-success` | read-only MCP inspection | `starter-pack-chooser` | `host playbooks` | `pnpm run example:host-mcp` |
| `runtime-diagnostics-recipe` | provider triage recipe | `starter-pack-chooser` | `plugin/skill starter kits` | `pnpm run starter-pack:runtime-diagnostics-pack` |
| `docs-seo-truth-sync` | truth-safe docs/SEO sync | `starter-pack-chooser` | `plugin/skill starter kits` | `pnpm run starter-pack:docs-seo-sync-pack` |

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
