# Switchyard Starter Manifest Examples

这页不是在说：

> 这些 helper / skills 已经作为完整产品 shipped 了。

更准确的说法是：

> 这里给的是 **可直接照着改的 example payloads**。  
> 它们帮助外部 builder 从模板走到第一版可运行配置，但仍然受当前 `partial / fail-closed` 边界约束。

## Why This Exists

现在仓里已经有：

- `builder-kits`
- `skill-packs`
- `starter manifest templates`

但外部 builder 真正卡住的最后一步通常不是“看不懂目录”，而是：

> “给我一个能直接改的例子。”

所以这页补的是 examples，不是新产品面。

如果你要的不是“照着改 payload”，而是“给我一份能直接跑起来的样板间”，请继续看：

- [examples/README.md](../examples/README.md)
- [starter-packs/README.md](../starter-packs/README.md)

## Machine-readable Source

- [docs/starter-manifest-examples.json](./starter-manifest-examples.json)
- [docs/starter-manifest-examples.schema.json](./starter-manifest-examples.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- starter-examples
pnpm run switchyard:cli -- starter-examples-schema
pnpm run switchyard:cli -- builder-example --target codex
pnpm run switchyard:cli -- builder-example --target mcp
pnpm run switchyard:cli -- skill-example --target runtime-diagnostics-pack
pnpm run switchyard:cli -- skill-example --target docs-seo-sync-pack
```

## What These Examples Are Good For

- plugin helper bootstrap
- skills pack bootstrap
- local automation glue
- truth-safe docs / SEO bootstrap

## What They Are Not

- shipped plugin packages
- shipped skills platform
- execution brain config
- full parity claims

## Related Pages

- [docs/starter-manifest-templates.md](./starter-manifest-templates.md)
- [docs/starter-manifest-templates.schema.json](./starter-manifest-templates.schema.json)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- [examples/README.md](../examples/README.md)
