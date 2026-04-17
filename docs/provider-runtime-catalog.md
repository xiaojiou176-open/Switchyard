# Switchyard Provider Runtime Catalog

这页是给外部 builder 的 **静态 provider 目录**。

它不是 live service 响应，也不是今天机器上“谁已经登录了”的状态页。  
它更像商场的楼层总表：

- 这栋楼里有哪些商户
- 每家在几楼
- 哪几家是重点柜台

## Why This Exists

现在我们已经有：

- public surface catalog
- plugin / skills starter kits
- read-only MCP surface

但外部 builder 还会碰到一个很实际的问题：

> “我到底该用哪个 provider id？它属于 BYOK 还是 Web/Login？是不是 high-stability trio 里的？”  

这页和配套 JSON，就是把这个静态目录单独拎出来。

## Machine-readable Source

- [docs/provider-runtime-catalog.json](./provider-runtime-catalog.json)
- [docs/provider-runtime-catalog.schema.json](./provider-runtime-catalog.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- provider-catalog
pnpm run switchyard:cli -- provider-catalog-schema
pnpm run switchyard:cli -- provider-entry --target chatgpt
pnpm run switchyard:cli -- provider-entry --target openai:byok
pnpm run switchyard:cli -- provider-entry --target gemini:web-login
```

这些命令只读静态 catalog，不依赖当前机器上谁登录了。

## Read-only MCP Access

- `switchyard.catalog.provider_catalog`
- `switchyard.catalog.provider_catalog_schema`
- `switchyard.catalog.provider_entry`

## What The Catalog Tells You

每一项至少回答四件事：

- `providerId`
- `lane`
- `providerId + lane` 的公开寻址方式
- `authMode`
- `stabilityTarget`

也就是说，外部 builder 至少能先分清：

- 这是 `BYOK` 还是 `Web/Login`
- 这是 high-stability trio 还是 baseline lane
- 这个 id 是不是当前 V1 正式目录里的一员

如果同一个 `providerId` 同时出现在两条 lane 里，比如 `gemini` 或 `qwen`：

- `provider-catalog` 会把两条都列出来
- `provider-entry` 必须用 `providerId:lane` 这种复合目标来 disambiguate
- 不能再悄悄返回第一条命中的记录

## What It Does Not Tell You

这页不会替代：

- live auth status
- 当前机器浏览器登录态
- provider probe / remediation
- invoke 成功与否

那些还是 runtime / service / MCP / CLI 的动态读接口负责。

## Related Pages

- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/provider-runtime-catalog.json](./provider-runtime-catalog.json)
- [docs/provider-runtime-catalog.schema.json](./provider-runtime-catalog.schema.json)
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
