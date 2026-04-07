# Switchyard Skill Pack Catalog

这页是给外部 builder 读的 **静态 skill pack 目录卡**。

你可以把它理解成“技能包货架标签”：

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md) 像更宽的施工说明书
- 这页则只冻结 **skill packs** 本身的目录与边界

它不是 builder kit catalog。  
它也不是 docs/SEO 或 runtime diagnostics 的执行面说明书。

## Why This Exists

当前 repo 已经有这些 skill packs：

- `runtime-diagnostics-pack`
- `docs-seo-sync-pack`

但之前这些 machine-readable truth 只嵌在：

- [docs/public-surface-catalog.json](./public-surface-catalog.json)

的大目录里。

说得更直白一点：

> 以前像在总地图里顺带看到“技能包清单”。  
> 现在把技能包自己抽成一张目录卡，读者不用每次都翻整本地图。

## Machine-readable Source

- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- skill-pack-catalog
pnpm run switchyard:cli -- skill-pack-catalog-schema
pnpm run switchyard:cli -- skill-packs
pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack
pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack
```

这里有两层入口：

- `skill-pack-catalog` / `skill-pack-catalog-schema`
  - 读整张目录卡和 schema
- `skill-packs` / `skill-pack`
  - 继续保留原来的 list / single-entry 读法

## Read-only MCP Access

- `switchyard.catalog.skill_pack_catalog`
- `switchyard.catalog.skill_pack_catalog_schema`
- `switchyard.catalog.skill_packs`
- `switchyard.catalog.skill_pack`

## What Each Entry Tells You

每个 skill pack 至少回答这些问题：

- `status`
- `starterShape`
- `bestEntry`
- `requiredInputs`
- `starterSteps`
- `outputArtifacts`
- `safeClaims`
- `recommendedDocs`
- `copyReadyPackPath`
- `backingSurfaces`
- `notYetSupported`

说得更人话一点：

> 它不是告诉你“这个技能包什么都能做”，  
> 而是告诉你“这包工具最适合做什么、该从哪条窄路开始、哪些事绝对别冒充已经支持”。

## What It Does Not Mean

这页不等于：

- execution brain
- invoke plane
- browser automation plane
- marketing autopilot
- launch automation

它只是把当前已经 landed 的 **skill pack truth** 单独冻结出来。

## Related Pages

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/public-surface-catalog.json](./public-surface-catalog.json)
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
