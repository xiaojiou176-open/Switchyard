# Switchyard Starter Pack Comparison

如果 `starter-pack-chooser` 解决的问题是：

> **“我该先选哪个 pack？”**

那这页解决的问题就是：

> **“我想把几条路并排比较，或者按约束筛一遍时，该怎么看？”**

说得更直白一点：

- `starter-pack-chooser` 像导购台
- 这页则像并排货架上的对比卡

它不是推荐引擎，也不是市场化导购机器人。  
它只是把当前已经 landed 的 chooser truth，再整理成一个更适合 **side-by-side comparison** 和 **client-side filtering** 的 surface。

## Machine-readable Source

- [docs/starter-pack-comparison.json](./starter-pack-comparison.json)
- [docs/starter-pack-comparison.schema.json](./starter-pack-comparison.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- starter-pack-comparison
pnpm run switchyard:cli -- starter-pack-comparison-schema
pnpm run switchyard:cli -- starter-pack-filter --target thin-runtime-bridges
```

## Read-only MCP Access

- `switchyard.catalog.starter_pack_comparison`
- `switchyard.catalog.starter_pack_comparison_schema`
- `switchyard.catalog.starter_pack_filter`

## Comparison Matrix

| Scenario | Pack | Kind | First success mode | Read-only | Use when | Do not expect |
| --- | --- | --- | --- | --- | --- | --- |
| `codex-builder` | `codex` | `builder` | `runtime-invoke` | `false` | text-only bridge into runtime | tool / worktree / MCP parity |
| `claude-code-builder` | `claude-code` | `builder` | `runtime-invoke` | `false` | message/runtime bridge | terminal / approval / tool parity |
| `openclaw-builder` | `openclaw` | `builder` | `runtime-invoke` | `false` | delegation-first bridge | operator / product-shell parity |
| `mcp-inspector` | `mcp` | `builder` | `read-only-mcp` | `true` | stdio runtime inspection | execution brain / invoke through MCP |
| `runtime-diagnostics-skill` | `runtime-diagnostics-pack` | `skill` | `provider-diagnostics` | `true` | provider triage recipe | invoke / acquisition write / browser automation |
| `docs-seo-sync-skill` | `docs-seo-sync-pack` | `skill` | `docs-truth-sync` | `true` | truth-safe docs / SEO sync | marketing autopilot / launch automation |

## How To Filter Honestly

你可以先把筛选想成三类问题：

1. **这是 builder 还是 skill？**
2. **第一把成功是 invoke、只读 MCP、provider diagnostics，还是 docs truth sync？**
3. **我是不是必须走 read-only？**

这页和它的 JSON 正是为了回答这些问题，而不是替你自动替换判断。

## What This Page Helps With

- side-by-side pack comparison
- machine-readable client-side filtering
- builder onboarding that starts from constraints instead of long prose
- SEO/discoverability pages that answer “Which Switchyard starter fits my limit?”

## What It Does Not Mean

这页不等于：

- recommendation engine
- plugin marketplace
- full parity matrix
- launch automation

它只是把当前 **partial / fail-closed / builder-facing** starter truth 做成更好筛选的一张对比表。

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [starter-packs/README.md](../starter-packs/README.md)
