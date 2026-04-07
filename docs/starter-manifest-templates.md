# Switchyard Starter Manifest Templates

这页不是在说：

> 这些 plugin / skills 已经作为完整产品 shipped 了。

更准确的说法是：

> 这里给的是 **copy-paste 级 starter manifest 模板**。  
> 它们帮助外部 builder 更快开始接，但仍然严格受当前 `partial / fail-closed` 边界约束。

## Why This Exists

前面已经有：

- `builder-kits`
- `skill-packs`
- `public-surface-catalog.json`

但如果只给“目录”，外部 builder 还是得自己拼第一版配置。

所以这里多给一层：

- starter manifest 模板
- 可 copy / adapt
- 但不自动把未来梦想升级成今天支持

如果你要的不是“模板字段”，而是“整包可复制目录”，继续看：

- [starter-packs/README.md](../starter-packs/README.md)

## Machine-readable Source

- [docs/starter-manifest-templates.json](./starter-manifest-templates.json)
- [docs/starter-manifest-templates.schema.json](./starter-manifest-templates.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- starter-manifests
pnpm run switchyard:cli -- starter-manifests-schema
pnpm run switchyard:cli -- builder-template --target codex
pnpm run switchyard:cli -- builder-template --target mcp
pnpm run switchyard:cli -- skill-template --target runtime-diagnostics-pack
pnpm run switchyard:cli -- skill-template --target docs-seo-sync-pack
```

## What These Templates Are Good For

- plugin helper bootstrap
- skills pack bootstrap
- local automation glue
- truth-safe docs / SEO starter generation

## What They Are Not

- shipped plugin packages
- shipped skills platform
- execution brain config
- launch automation engine

## Related Pages

- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/starter-manifest-examples.schema.json](./starter-manifest-examples.schema.json)
