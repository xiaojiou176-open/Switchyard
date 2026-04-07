# Switchyard Host Integration Examples

这页可以先把它理解成：

> **选完 starter pack 之后，第一把 host-local 配置到底长什么样，而且最小 first success 要怎么跑。**

说得更直白一点：

- `docs/starter-pack-chooser.md` 像导购台
- `starter-packs/` 像整包搬运箱
- 这页则像“装到你家主机上的接线示意图”

它的目标不是再发明一个产品层，而是把当前已经 landed 的 thin compat / MCP / builder-facing truth，补成一组更容易复制、也更容易点火的 host-local examples。

## Machine-readable Source

- [examples/hosts/index.json](../examples/hosts/index.json)
- [examples/hosts/index.schema.json](../examples/hosts/index.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- host-examples
pnpm run switchyard:cli -- host-examples-schema
pnpm run switchyard:cli -- host-example --target codex
pnpm run switchyard:cli -- host-example --target mcp
```

## Runnable Example Commands

```bash
pnpm run example:host-codex
pnpm run example:host-claude-code
pnpm run example:host-openclaw
pnpm run example:host-mcp
```

## Read-only MCP Access

- `switchyard.catalog.host_examples`
- `switchyard.catalog.host_examples_schema`
- `switchyard.catalog.host_example`

## Quick Pick

| If your host is... | Start here | Why | Do not expect |
| --- | --- | --- | --- |
| `Codex` | [examples/hosts/codex/README.md](../examples/hosts/codex/README.md) | Responses-style runtime bridge config + one bounded invoke smoke | tool/worktree parity |
| `Claude Code` | [examples/hosts/claude-code/README.md](../examples/hosts/claude-code/README.md) | message/runtime bridge config + one bounded invoke smoke | terminal/tool parity |
| `OpenClaw` | [examples/hosts/openclaw/README.md](../examples/hosts/openclaw/README.md) | delegation-first host config + one bounded invoke smoke | product-shell parity |
| `MCP client` | [examples/hosts/mcp/README.md](../examples/hosts/mcp/README.md) | read-only stdio client wiring + one bounded MCP smoke | execution brain / write plane |

## What These Examples Help With

- host-local first-run wiring
- copy-paste config examples for builder hosts
- bounded runnable glue for one first-success check
- SEO/discoverability pages that answer:
  - `How do I wire Switchyard into Codex?`
  - `How do I wire Switchyard into Claude Code?`
  - `What does a Switchyard MCP client config look like?`

## What These Examples Do Not Mean

这些 examples 不等于：

- full host parity
- shipped plugin marketplace
- production-ready distro package
- MCP execution backend

它们只是当前 thin / partial / fail-closed builder surfaces 的 **host-local runnable glue + config examples**。

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [examples/README.md](../examples/README.md)
- [examples/hosts/README.md](../examples/hosts/README.md)
- [starter-packs/README.md](../starter-packs/README.md)
