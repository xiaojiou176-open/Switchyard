# Switchyard Starter Pack Index

这页可以先把它理解成：

> `starter-packs/` 的机器可读总目录。

说得更直白一点：

- `starter-packs/README.md` 像样板房导览手册
- `starter-packs/index.json` 则像物业总平面图

如果你是 builder / plugin / skills tooling，不想自己扫目录猜：

- 哪些 pack 存在
- 每个 pack 里有哪些关键文件
- 该跑哪个 smoke 命令

那就先读这套 index。

如果你不是想“扫目录”，而是想直接回答：

> **“我该先选哪个 pack？”**

那别停在这页，直接继续看：

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- `pnpm run switchyard:cli -- starter-pack-chooser`

如果你已经选完 pack，下一句问题变成：

> **“那我接进宿主时第一步怎么走，或者第一份 config 长什么样？”**

那继续看：

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)

## Machine-readable Source

- [starter-packs/index.json](../starter-packs/index.json)
- [starter-packs/index.schema.json](../starter-packs/index.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- starter-pack-index
pnpm run switchyard:cli -- starter-pack-index-schema
pnpm run switchyard:cli -- starter-pack-entry --target codex
pnpm run switchyard:cli -- starter-pack-entry --target runtime-diagnostics-pack
```

## Read-only MCP Access

- `switchyard.catalog.starter_pack_index`
- `switchyard.catalog.starter_pack_index_schema`
- `switchyard.catalog.starter_pack_entry`

## What This Index Helps With

- machine-readable pack discovery
- pack-local file inventory lookup
- smoke command lookup
- docs / README / scaffolding generators
- local automation that wants to copy a bounded starter bundle

## What It Does Not Mean

这张目录表不等于：

- shipped plugin marketplace
- full Codex parity
- full Claude Code parity
- full OpenClaw parity
- MCP execution brain

它只是把当前已经 landed 的 copy-ready packs 再补成一份 **工具能稳定消费的总目录**。

## Related Pages

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [starter-packs/README.md](../starter-packs/README.md)
