# Switchyard Builder Kit Catalog

这页是给外部 builder 读的 **静态 builder kit 目录卡**。

你可以把它理解成一张施工入口牌：

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md) 像更宽的施工说明书
- 这页则像只冻结 **builder kits** 本身的目录卡

它不是 starter-pack chooser。  
它也不是 host playbook，更不是 full product support 宣称。

## Why This Exists

当前 repo 已经有这些 builder-facing starter kits：

- `codex`
- `claude-code`
- `openclaw`
- `mcp`

但之前这些 machine-readable truth 只嵌在：

- [docs/public-surface-catalog.json](./public-surface-catalog.json)

的大目录里。

说得更直白一点：

> 以前像在总地图里看“施工包清单”。  
> 现在把施工包本身单独做成一张目录卡，builder 不用每次都翻整本地图。

## Machine-readable Source

- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- builder-kit-catalog
pnpm run switchyard:cli -- builder-kit-catalog-schema
pnpm run switchyard:cli -- builder-kits
pnpm run switchyard:cli -- builder-kit --target codex
pnpm run switchyard:cli -- builder-kit --target claude-code
pnpm run switchyard:cli -- builder-kit --target openclaw
pnpm run switchyard:cli -- builder-kit --target mcp
```

这里有两层入口：

- `builder-kit-catalog` / `builder-kit-catalog-schema`
  - 读整张目录卡和 schema
- `builder-kits` / `builder-kit`
  - 继续保留原来的 list / single-entry 读法

## Read-only MCP Access

- `switchyard.catalog.builder_kit_catalog`
- `switchyard.catalog.builder_kit_catalog_schema`
- `switchyard.catalog.builder_kits`
- `switchyard.catalog.builder_kit`

## What Each Entry Tells You

每个 builder kit 至少回答这些问题：

- `status`
- `starterShape`
- `bestEntry`
- `requiredInputs`
- `starterSteps`
- `outputArtifacts`
- `safeClaims`
- `recommendedDocs`
- `copyReadyPackPath`
- `notYetSupported`

换句话说，它回答的不是：

> “这个目标是不是 full support？”  

而是：

> “如果我要从一条诚实、窄、fail-closed 的 builder 路开始接，现在最稳的起点是什么？”

## What It Does Not Mean

这页不等于：

- full Codex / Claude Code / OpenClaw parity
- host integration completion
- skill pack contract
- starter-pack chooser
- marketing page

它只是把当前已经 landed 的 **builder kit truth** 单独冻结出来。

## Related Pages

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/public-surface-catalog.json](./public-surface-catalog.json)
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
