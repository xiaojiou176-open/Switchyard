# Switchyard Compatibility Matrix

This page is the compatibility frontdoor.

这页是兼容性总入口，不是营销页。

## Current Truth

### Public compatibility targets

| Target | Status | Truthful Meaning |
| --- | --- | --- |
| `Codex` | `partial` | thin fail-closed runtime adapter is landed; full Codex parity is still not supported |
| `Claude Code` | `partial` | thin fail-closed runtime adapter is landed; tool/MCP/terminal parity is still not supported |
| `OpenClaw` | `partial` | thin fail-closed runtime adapter is landed; operator/control-plane parity is still not supported |
| `MCP` | `partial` | a read-only runtime-backed MCP server/tool surface is landed, but this is still not embedded Codex / Claude Code / OpenClaw parity |

### Related first-party seam snapshots

These are **related repo seam snapshots**, not public compatibility claims.

| Repo | Current relation | Truthful Meaning |
| --- | --- | --- |
| `campus-copilot` | bounded seam landed | a thin BFF bridge exists, but it is not the whole consumer contract |
| `CortexPilot` | future reselection | provider/base_url seam exists in planning, but it is not a current public compat surface |
| `multi-ai-sidepanel` | bounded seam landed | a maintainer-local runtime-backed analyst lane exists, while compare-first browser UX stays local |

## Primary Pages

- [docs/compat/codex.md](./codex.md)
- [docs/compat/claude-code.md](./claude-code.md)
- [docs/compat/openclaw.md](./openclaw.md)
- [docs/public-distribution-ledger.md](../public-distribution-ledger.md)
- [docs/public-surface-catalog.md](../public-surface-catalog.md)
- [docs/README.md](../README.md)
  - 如果你要完整 atlas，而不是 compat 这一小柜，请直接回总目录

## Builder / Plugin / Skills Entry

如果你是要给外部工具、plugin、skills pack、automation builder 读当前 truth，
不要靠人工抄文档。

优先用：

- `pnpm run switchyard:cli -- public-distribution-ledger`
- `pnpm run switchyard:cli -- public-distribution-ledger-schema`
- `pnpm run switchyard:cli -- distribution-surfaces`
- `pnpm run switchyard:cli -- distribution-surface --target codex`
- `pnpm run switchyard:cli -- surface-catalog`
- `pnpm run switchyard:cli -- surface-catalog-schema`
- `pnpm run switchyard:cli -- compat-target-catalog`
- `pnpm run switchyard:cli -- compat-target-catalog-schema`
- `pnpm run switchyard:cli -- compat-targets`
- `pnpm run switchyard:cli -- compat-target --target codex`
- `pnpm run switchyard:cli -- compat-target --target claude-code`
- `pnpm run switchyard:cli -- compat-target --target openclaw`
- `pnpm run switchyard:cli -- builder-kit-catalog`
- `pnpm run switchyard:cli -- builder-kit-catalog-schema`
- `pnpm run switchyard:cli -- builder-kits`
- `pnpm run switchyard:cli -- builder-kit --target codex`
- `pnpm run switchyard:cli -- builder-kit --target claude-code`
- `pnpm run switchyard:cli -- builder-kit --target openclaw`
- `pnpm run switchyard:cli -- builder-kit --target mcp`
- `pnpm run switchyard:cli -- skill-pack-catalog`
- `pnpm run switchyard:cli -- skill-pack-catalog-schema`
- `pnpm run switchyard:cli -- skill-packs`
- `pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack`
- `pnpm run switchyard:cli -- starter-manifests`
- `pnpm run switchyard:cli -- starter-manifests-schema`
- `pnpm run switchyard:cli -- starter-examples`
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
- `pnpm run switchyard:cli -- host-playbooks`
- `pnpm run switchyard:cli -- host-playbooks-schema`
- `pnpm run switchyard:cli -- host-playbook --target codex`
- `pnpm run switchyard:cli -- host-examples`
- `pnpm run switchyard:cli -- host-examples-schema`
- `pnpm run switchyard:cli -- host-example --target codex`
- `pnpm run switchyard:cli -- provider-catalog`
- `pnpm run switchyard:cli -- provider-catalog-schema`
- `pnpm run switchyard:cli -- provider-entry --target chatgpt`
- `pnpm run switchyard:cli -- provider-entry --target gemini:web-login`
- `pnpm run switchyard:cli -- builder-template --target codex`
- `pnpm run switchyard:cli -- builder-example --target codex`
- `pnpm run switchyard:cli -- skill-template --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-example --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- provider-catalog`
- `pnpm run switchyard:cli -- provider-entry --target chatgpt`
- `pnpm run switchyard:cli -- mcp-status`
- `pnpm run switchyard:cli -- mcp-tools`

或者直接读取：

- [docs/public-distribution-ledger.json](../public-distribution-ledger.json)
- [docs/compat-target-catalog.json](../compat-target-catalog.json)
- [docs/public-surface-catalog.json](../public-surface-catalog.json)

## Important Rule

`partial`、`planned` 和 `research only` 都不等于 `supported`。  
这页的目的就是避免把这些标签混写。

更直白一点说：

- public compatibility targets 只使用 frontdoor truth labels：`partial / planned / research only`
- first-party repo seam snapshots 不应伪装成 public support matrix
- 当某一行只是 narrow landed slice 时，必须把 `thin / bounded / fail-closed` 写明白
