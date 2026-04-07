# Switchyard Compat Target Catalog

这页是给外部 builder 的 **静态 compat target 目录**。

它不是 consumer shell 说明书，也不是 full parity 宣称。  
你可以把它理解成一张“兼容占位目录卡”：

- 现在公开讲得出口的 compat target 有哪些
- 每个 target 当前只是 `partial`、还是以后才做
- 哪些能力必须继续 fail-closed

## Why This Exists

`docs/public-surface-catalog.json` 已经有一份 aggregate frontdoor。  
但 compat truth 还只是里面的一个内嵌字段。

这会带来一个很实际的问题：

> 如果 builder 只想读 compat 这一个小合同面，
> 还得把整张总目录都搬进来。

所以这页和配套 JSON / schema，就是把 **compat target truth** 单独冻结出来。

## Machine-readable Source

- [docs/compat-target-catalog.json](./compat-target-catalog.json)
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- compat-target-catalog
pnpm run switchyard:cli -- compat-target-catalog-schema
pnpm run switchyard:cli -- compat-targets
pnpm run switchyard:cli -- compat-target --target codex
pnpm run switchyard:cli -- compat-target --target claude-code
pnpm run switchyard:cli -- compat-target --target openclaw
```

这些命令都只读静态 compat contract，不会偷偷推断 full support。

## Read-only MCP Access

- `switchyard.catalog.compat_target_catalog`
- `switchyard.catalog.compat_target_catalog_schema`
- `switchyard.catalog.compat_targets`
- `switchyard.catalog.compat_target`

## What The Catalog Tells You

每一项至少回答五件事：

- `target`
- `status`
- `transport`
- `truthfulMeaning`
- `notYetSupported`

换句话说，它像是一个很诚实的兼容说明卡：

- 这条 compat 现在是不是只到 `partial`
- 现在靠什么窄 transport 接进去
- 哪些能力必须继续 `fail-closed`
- 哪些页面和测试是它的 source anchors

## What It Does Not Mean

这页不会替代：

- full consumer parity
- tool execution parity
- MCP execution parity
- terminal/worktree parity
- product-shell parity

更直白一点说：

> 这页说的是“现在能诚实承认哪一条 thin compat 已经落地”，
> 不是“这些目标已经完整支持”。

## Related Pages

- [docs/compat/README.md](./compat/README.md)
- [docs/compat/codex.md](./compat/codex.md)
- [docs/compat/claude-code.md](./compat/claude-code.md)
- [docs/compat/openclaw.md](./compat/openclaw.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/public-surface-catalog.json](./public-surface-catalog.json)
