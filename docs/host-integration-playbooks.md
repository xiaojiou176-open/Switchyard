# Switchyard Host Integration Playbooks

如果 `starter-pack-chooser` 解决的问题是：

> **“我该先选哪个 pack？”**

那这页解决的问题就是：

> **“我选完之后，接进宿主环境时第一步该怎么走？”**

说得更直白一点：

- `starter-pack-index` 像仓库总平面图
- `starter-pack-chooser` 像导购台
- 这页则像入驻手册

它不是在说这些 host 都已经 full support 了。  
它只是在把当前已经 landed 的窄切片，组织成更容易接入的 host playbooks。

## Machine-readable Source

- [docs/host-integration-playbooks.json](./host-integration-playbooks.json)
- [docs/host-integration-playbooks.schema.json](./host-integration-playbooks.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- host-playbooks
pnpm run switchyard:cli -- host-playbooks-schema
pnpm run switchyard:cli -- host-playbook --target codex
pnpm run switchyard:cli -- host-playbook --target mcp
```

## Read-only MCP Access

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

## Human Rule Of Thumb

- 如果你是在接一个 **builder host**，先看这页
- 如果你还没决定选哪包，先回到 [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- 如果你已经知道宿主类型，但想直接抄一个 host-local config 形状，再去看 [docs/host-integration-examples.md](./host-integration-examples.md)
- 如果你只是想复制整包目录，再去看 [starter-packs/README.md](../starter-packs/README.md)

## Why This Page Exists

现在 repo 已经能回答很多问题：

- 它是什么
- 哪些 surface 已经 landed
- 哪个 starter pack 适合哪类任务

但 builder 真正落地时，常见的下一堵墙是：

> “好，我选了 `codex` 或 `mcp`。那我在宿主里第一步到底怎么接？”

这页就是把那道墙变矮一点。

## What It Does Not Mean

这页不等于：

- shipped plugin marketplace
- full Codex parity
- full Claude Code parity
- full OpenClaw parity
- MCP execution brain
- host-specific launch automation

它只是把当前已经 landed 的 partial surfaces，再补成一个更像“宿主接入手册”的入口。

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [examples/README.md](../examples/README.md)
