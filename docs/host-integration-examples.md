# Switchyard Host Integration Examples

Treat this page as:

> **What should the first host-local config look like once I picked a starter
> pack, and what is the smallest first success?**

In plain English:

- the chooser is the front desk
- `starter-packs/` is the crate of reusable parts
- this page is the wiring diagram you copy into your own host

It does not create a new product layer. It turns the current thin compat, MCP,
and builder truth into copy-ready host-local examples.

## Machine-Readable Source

- [examples/hosts/index.json](../examples/hosts/index.json)
- [examples/hosts/index.schema.json](../examples/hosts/index.schema.json)

## Read-Only Access

```bash
pnpm run switchyard:cli -- host-examples
pnpm run switchyard:cli -- host-examples-schema
pnpm run switchyard:cli -- host-example --target codex
pnpm run switchyard:cli -- host-example --target mcp
```

- `switchyard.catalog.host_examples`
- `switchyard.catalog.host_examples_schema`
- `switchyard.catalog.host_example`

## Runnable Example Commands

```bash
pnpm run example:host-codex
pnpm run example:host-claude-code
pnpm run example:host-openclaw
pnpm run example:host-mcp
```

## Quick Pick

| If your host is... | Start here | Why | Do not expect |
| --- | --- | --- | --- |
| `Codex` | [examples/hosts/codex/README.md](../examples/hosts/codex/README.md) | Responses-style runtime bridge config plus one bounded invoke smoke | tool/worktree parity |
| `Claude Code` | [examples/hosts/claude-code/README.md](../examples/hosts/claude-code/README.md) | message/runtime bridge config plus one bounded invoke smoke | terminal/tool parity |
| `OpenClaw` | [examples/hosts/openclaw/README.md](../examples/hosts/openclaw/README.md) | delegation-first host config plus one bounded invoke smoke | product-shell parity |
| `MCP client` | [examples/hosts/mcp/README.md](../examples/hosts/mcp/README.md) | read-only stdio client wiring plus one bounded MCP smoke | execution brain / write plane |

## What These Examples Help With

- host-local first-run wiring
- copy-paste config examples for builder hosts
- bounded runnable glue for one first-success check
- SEO/discoverability pages that answer concrete builder questions

## What These Examples Do Not Mean

These examples do **not** mean:

- full host parity
- a shipped plugin marketplace
- a production-ready distro package
- an MCP execution backend

They are only the current thin, partial, fail-closed builder surfaces turned
into host-local runnable glue and config examples.

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [examples/README.md](../examples/README.md)
- [examples/hosts/README.md](../examples/hosts/README.md)
- [starter-packs/README.md](../starter-packs/README.md)
