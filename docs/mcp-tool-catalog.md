# Switchyard MCP Tool Catalog

如果你不想在长文档里来回找按钮，而是只想知道：

> **“这台只读 MCP 查询终端，现在到底有哪些工具？”**

那这页就是给你的。

说得更直白一点：

- [docs/mcp.md](./mcp.md) 像总说明页
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md) 像协议说明页
- 这页则像一张单独的按钮目录卡

它不是 execution brain，也不是全功能 backend 清单。  
它只是把已经 landed 的 **read-only MCP tools** 单独冻结出来。

## Machine-readable Source

- [docs/mcp-tool-catalog.json](./mcp-tool-catalog.json)
- [docs/mcp-tool-catalog.schema.json](./mcp-tool-catalog.schema.json)

## Read-only CLI Access

```bash
pnpm run switchyard:cli -- mcp-tool-catalog
pnpm run switchyard:cli -- mcp-tool-catalog-schema
pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health
```

## Read-only MCP Access

- `switchyard.catalog.mcp_tool_catalog`
- `switchyard.catalog.mcp_tool_catalog_schema`
- `switchyard.catalog.mcp_tool`

## Tool Families

先加一句护栏：

> 这页只按已经暴露出来的 tool family 分组，  
> 不负责推荐 builder 的第一站该去哪。

### Runtime inspection tools

这些工具回答的是：

> runtime / auth / provider 当前真相是什么？

它们包括：

- bootstrap
- provider list
- runtime health
- auth status
- provider status / probe / remediation
- current page / console / network
- store readiness / live readiness / attach target
- diagnose ladder / support bundle / diagnose snapshot

### Catalog-backed read-only tools

这些工具回答的是：

> 当前 repo 已经 landed 的静态 truth surfaces 是什么？

它们包括：

- surface catalog
- compat target catalog
- builder kit catalog
- provider catalog
- compat targets
- builder kits / skill packs
- host playbooks / examples
- builder journeys
- builder intent router
- keyword truth
- starter manifests / examples
- starter-pack index / chooser / comparison
- builder / skill template and example surfaces
- MCP status / MCP tools

## What This Catalog Helps With

- plugin / skills / local automation builders
- MCP client wiring
- docs / SEO / outward sync tooling
- quick tool lookup before opening longer docs

## What It Does Not Mean

这页不等于：

- full MCP backend
- execution brain
- invoke/write plane
- consumer-shell parity

它只是把当前 **read-only MCP tool inventory** 做成一个独立合同面。

## Related Pages

如果你要的是：

- MCP 的角色边界：看 [docs/mcp.md](./mcp.md)
- MCP server slice 的协议与验证：看 [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
- 全站 builder-facing 总目录：看 [docs/public-surface-catalog.md](./public-surface-catalog.md)

- [docs/mcp.md](./mcp.md)
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
