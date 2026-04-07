# Switchyard Builder Journeys

如果你不想在 `chooser / comparison / playbooks / examples` 之间自己拼路线，
可以先把这页理解成：

> **给 builder 的总导视牌。**

说得更直白一点：

- `starter-pack-chooser` 负责先选路
- `starter-pack-comparison` 负责并排比较和筛选
- `host playbooks / host examples` 负责继续往前走
- 这页负责把一整条路，从第一步到第一把成功，连成一张图

它不是 launch page，也不是 marketplace。  
它只是把已经 landed 的 builder journey 组织成一个统一入口。

## Machine-readable Source

- [docs/builder-journeys.json](./builder-journeys.json)
- [docs/builder-journeys.schema.json](./builder-journeys.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- builder-journeys
pnpm run switchyard:cli -- builder-journeys-schema
pnpm run switchyard:cli -- builder-journey --target codex-first-success
```

## Read-only MCP Access

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

## How To Use This Page

- 如果你只是在两个 pack 之间犹豫：先看 [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- 如果你已经选定 pack，要继续接宿主：再看 [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- 如果你想一步看到“从入口到点火”的完整路径：先看这页

## What This Page Does Not Mean

这页不等于：

- launch page
- plugin marketplace
- recommendation engine
- full parity promise

它只是把当前 builder-facing、partial、fail-closed 的路径做成统一导视。

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
