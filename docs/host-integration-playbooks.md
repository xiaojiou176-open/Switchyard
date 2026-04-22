# Switchyard Host Integration Playbooks

If `starter-pack-chooser` answers:

> **Which pack should I start with?**

then this page answers:

> **Once I picked the pack, what is the first host-integration move?**

In plain English:

- the starter-pack index is the warehouse map
- the chooser is the front desk
- this page is the move-in handbook

It does not claim any host already has full support. It organizes the landed
narrow slices into clearer host playbooks.

One important clarification:

- if your chosen route is a **host pack**, use the host rows below
- if your chosen route is a **skill pack**, use the coordinated skill-pack route cards instead of inventing a new handoff by hand

## Machine-Readable Source

- [catalogs/host-integration-playbooks.json](../catalogs/host-integration-playbooks.json)
- [catalogs/host-integration-playbooks.schema.json](../catalogs/host-integration-playbooks.schema.json)
- [catalogs/skill-pack-routes.json](../catalogs/skill-pack-routes.json)
- [catalogs/skill-pack-routes.schema.json](../catalogs/skill-pack-routes.schema.json)

## Read-Only Access

```bash
pnpm run switchyard:cli -- host-playbooks
pnpm run switchyard:cli -- host-playbooks-schema
pnpm run switchyard:cli -- host-playbook --target codex
pnpm run switchyard:cli -- host-playbook --target mcp
pnpm run switchyard:cli -- skill-pack-routes
pnpm run switchyard:cli -- skill-pack-route --target runtime-diagnostics-pack
```

- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbooks_schema`
- `switchyard.catalog.host_playbook`
- `switchyard.catalog.skill_packs`
- `switchyard.catalog.skill_pack`

## Skill Pack Handoff

If the chooser already landed on a skill pack, this is the honest next step:

| Skill pack | CLI handoff | MCP handoff | Use this when... |
| --- | --- | --- | --- |
| `runtime-diagnostics-pack` | `pnpm run switchyard:cli -- skill-pack-route --target runtime-diagnostics-pack` | `switchyard.catalog.skill_pack --target runtime-diagnostics-pack` | you need the exact read-only provider triage surfaces first |
| `docs-seo-sync-pack` | `pnpm run switchyard:cli -- skill-pack-route --target docs-seo-sync-pack` | `switchyard.catalog.skill_pack --target docs-seo-sync-pack` | you need surface-catalog plus keyword-truth handoff first |
| `chat-app-runtime-pack` | `pnpm run switchyard:cli -- skill-pack-route --target chat-app-runtime-pack` | `switchyard.catalog.skill_pack --target chat-app-runtime-pack` | you want a service-first chat runtime bridge starter without promoting a full chat shell |
| `research-copilot-pack` | `pnpm run switchyard:cli -- skill-pack-route --target research-copilot-pack` | `switchyard.catalog.skill_pack --target research-copilot-pack` | you want truth-surface grounding before any research synthesis or outward claim |
| `compare-runtime-pack` | `pnpm run switchyard:cli -- skill-pack-route --target compare-runtime-pack` | `switchyard.catalog.skill_pack --target compare-runtime-pack` | you need compare-first route selection without auto-picking a winner |
| `byok-first-safe-pack` | `pnpm run switchyard:cli -- skill-pack-route --target byok-first-safe-pack` | `switchyard.catalog.skill_pack --target byok-first-safe-pack` | you want BYOK-first invoke planning before widening into Web/Login reality work |

These route cards do **not** upgrade support claims. They only keep the pack,
CLI, and MCP entrypoints aligned.

## Quick Pick

| Host | Start here | What first success means | Do not claim |
| --- | --- | --- | --- |
| `codex` | `starter-packs/builders/codex/` | one text-only request reaches `/v1/runtime/invoke` | tool/worktree/MCP parity |
| `claude-code` | `starter-packs/builders/claude-code/` | one message-shaped payload reaches the runtime | terminal/tool/approval parity |
| `openclaw` | `starter-packs/builders/openclaw/` | one delegation-shaped request reaches the runtime after a bootstrap/health/dispatch preflight read | operator/product-shell parity |
| `mcp` | `starter-packs/builders/mcp/` | one MCP client lists tools and reads health | execution brain / write plane |

For the `openclaw` route, the more honest first move now is:

> Read the preflight first, then fire the first delegation invoke.

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/mcp.md](./mcp.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [examples/README.md](../examples/README.md)
