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

## Machine-Readable Source

- [docs/host-integration-playbooks.json](./host-integration-playbooks.json)
- [docs/host-integration-playbooks.schema.json](./host-integration-playbooks.schema.json)

## Read-Only Access

```bash
pnpm run switchyard:cli -- host-playbooks
pnpm run switchyard:cli -- host-playbooks-schema
pnpm run switchyard:cli -- host-playbook --target codex
pnpm run switchyard:cli -- host-playbook --target mcp
```

- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbooks_schema`
- `switchyard.catalog.host_playbook`

## Quick Pick

| Host | Start here | What first success means | Do not claim |
| --- | --- | --- | --- |
| `codex` | `starter-packs/builders/codex/` | one text-only request reaches `/v1/runtime/invoke` | tool/worktree/MCP parity |
| `claude-code` | `starter-packs/builders/claude-code/` | one message-shaped payload reaches the runtime | terminal/tool/approval parity |
| `openclaw` | `starter-packs/builders/openclaw/` | one delegation-shaped request reaches the runtime | operator/product-shell parity |
| `mcp` | `starter-packs/builders/mcp/` | one MCP client lists tools and reads health | execution brain / write plane |

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [examples/README.md](../examples/README.md)
