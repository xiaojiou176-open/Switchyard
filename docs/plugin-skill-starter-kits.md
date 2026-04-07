# Switchyard Plugin And Skills Starter Kits

这页不是在说：

> `Codex / Claude Code / OpenClaw / MCP` 都已经 full support 了。

更直白一点说：

> 这页只是给外部 builder 一份 **从哪里开始接、当前能接到什么程度、哪些地方还必须 fail-closed** 的施工说明书。

如果你连“我第一站是不是该来这页”都还不确定：

- 先读 [docs/builder-intent-router.md](./builder-intent-router.md)
- 再决定要不要继续看这页 starter kits

你可以把它理解成工地门口的施工图：

- 哪扇门已经装上门框了
- 哪扇门还只是预留洞口
- 哪些电线已经通电
- 哪些千万别直接硬接

## Current Honest Role

当前这些 starter kits 最诚实的定位是：

- builder-facing
- local-first
- truth-first
- fail-closed

它们的目标不是伪装成完整产品集成，而是让：

- plugin builders
- skills packs
- docs/SEO sync tooling
- local automation glue

至少能 **稳定读到当前边界**，并从一条真实窄切片开始接。

## Machine-readable Source

- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)
- [docs/public-surface-catalog.json](./public-surface-catalog.json)
- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [docs/discoverability-keyword-truth.json](./discoverability-keyword-truth.json)

当前最稳的读取入口：

```bash
pnpm run switchyard:cli -- builder-kit-catalog
pnpm run switchyard:cli -- builder-kit-catalog-schema
pnpm run switchyard:cli -- builder-kits
pnpm run switchyard:cli -- builder-kit --target codex
pnpm run switchyard:cli -- builder-kit --target claude-code
pnpm run switchyard:cli -- builder-kit --target openclaw
pnpm run switchyard:cli -- builder-kit --target mcp
pnpm run switchyard:cli -- skill-pack-catalog
pnpm run switchyard:cli -- skill-pack-catalog-schema
pnpm run switchyard:cli -- skill-packs
pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack
pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack
pnpm run switchyard:cli -- provider-catalog
pnpm run switchyard:cli -- keyword-truth
```

如果你做的是 docs / SEO sync 这一类“替项目写对外词”的自动化，而不是 runtime bridge：

- 先读 [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- 再读 `pnpm run switchyard:cli -- keyword-truth`
- 需要定点查一条时用 `pnpm run switchyard:cli -- keyword-entry --target switchyard-mcp`

如果你更想直接拿一整套目录骨架，而不是自己从 catalog、template、example 三处拼：

- [starter-packs/README.md](../starter-packs/README.md)
- [docs/starter-pack-index.md](./starter-pack-index.md)

如果你现在更卡在：

> **“我到底应该先选哪个 pack？”**

那先别在几页文档里来回跳，直接看：

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- `pnpm run switchyard:cli -- starter-pack-chooser`
- `pnpm run switchyard:cli -- starter-pack-chooser-schema`
- `pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder`
- `pnpm run switchyard:cli -- starter-pack-scenario --target docs-seo-sync-skill`

如果你不是在问“先选哪个”，而是在问：

> **“这些 pack 并排看差在哪，我该怎么按约束筛？”**

那继续看：

- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- `pnpm run switchyard:cli -- starter-pack-comparison`
- `pnpm run switchyard:cli -- starter-pack-filter --target read-only-truth`

如果你不想自己在几张页面之间来回跳，而是想直接看一条完整旅程：

- [docs/builder-journeys.md](./builder-journeys.md)
- `pnpm run switchyard:cli -- builder-journeys`

如果你已经选完了 pack，但下一句问题变成：

> **“那我接进宿主环境的时候，第一步怎么走？”**

那直接继续看：

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- `pnpm run switchyard:cli -- host-playbooks`
- `pnpm run switchyard:cli -- host-playbook --target codex`
- `pnpm run switchyard:cli -- host-playbook --target mcp`
- `pnpm run switchyard:cli -- host-examples`
- `pnpm run switchyard:cli -- host-example --target codex`

如果你要的是机器能读的 pack 总目录，而不是人类自己扫文件夹：

- `pnpm run switchyard:cli -- starter-pack-index`
- `pnpm run switchyard:cli -- starter-pack-index-schema`
- `pnpm run switchyard:cli -- starter-pack-entry --target codex`
- `pnpm run switchyard:cli -- starter-pack-entry --target runtime-diagnostics-pack`

如果你已经在接 MCP client，也可以直接读 starter truth：

- `switchyard.catalog.builder_kit_catalog`
- `switchyard.catalog.builder_kit_catalog_schema`
- `switchyard.catalog.builder_kits`
- `switchyard.catalog.builder_kit`
- `switchyard.catalog.skill_pack_catalog`
- `switchyard.catalog.skill_pack_catalog_schema`
- `switchyard.catalog.skill_packs`
- `switchyard.catalog.skill_pack`
- `switchyard.catalog.starter_pack_chooser`
- `switchyard.catalog.starter_pack_chooser_schema`
- `switchyard.catalog.starter_pack_scenario`
- `switchyard.catalog.host_playbooks`
- `switchyard.catalog.host_playbooks_schema`
- `switchyard.catalog.host_playbook`
- `switchyard.catalog.host_examples`
- `switchyard.catalog.host_examples_schema`
- `switchyard.catalog.host_example`

## Starter Kits

### `codex`

- role:
  - Responses-style runtime bridge starter
- best entry:
  - `pnpm run switchyard:cli -- compat-target --target codex`
- required inputs:
  - service runtime base URL
  - Codex-side request text
  - explicit provider/lane choice for dual-lane providers
- starter steps:
  - 先读 Codex compat truth，再接 runtime base URL
  - 保持 text-only
  - 通过 thin compat adapter 委托 invoke
  - unsupported features 必须 fail-closed
- output artifacts:
  - builder-side runtime helper
  - thin request bridge
  - truthful README snippet
- package-ready artifact:
  - `@switchyard/consumer-codex`
- copy-ready pack:
  - `starter-packs/builders/codex/`
  - `pnpm run starter-pack:codex`
- use this when:
  - 你要做一个只负责把文本请求委托给 `Switchyard` runtime 的 helper/plugin
- do not pretend:
  - tool execution parity
  - MCP parity
  - worktree parity

### `claude-code`

- role:
  - message/runtime bridge starter
- best entry:
  - `pnpm run switchyard:cli -- compat-target --target claude-code`
- required inputs:
  - service runtime base URL
  - Claude Code-style message payload
  - explicit target provider when model families overlap
- starter steps:
  - 先读 Claude Code compat truth
  - 把 message payload 变成 thin runtime bridge 形状
  - 委托到现有 runtime invoke route
  - terminal / tool / approval 全部保持 fail-closed
- output artifacts:
  - message/runtime bridge helper
  - gateway-format adapter
  - bounded parity disclaimer
- package-ready artifact:
  - `@switchyard/consumer-claude-code`
- copy-ready pack:
  - `starter-packs/builders/claude-code/`
  - `pnpm run starter-pack:claude-code`
- use this when:
  - 你要做一个网关/API format 对齐的 helper，而不是复制 Claude Code shell
- do not pretend:
  - terminal shell parity
  - approval UI parity
  - tool / MCP parity

### `openclaw`

- role:
  - delegation-first runtime bridge starter
- best entry:
  - `pnpm run switchyard:cli -- compat-target --target openclaw`
- required inputs:
  - service runtime base URL
  - delegation-first request envelope
  - 明确知道 OpenClaw product shell 不会被搬进来
- starter steps:
  - 先读 OpenClaw compat truth 和 upstream boundary
  - 只用 delegation-first bridge，不复制产品壳
  - operator/control-plane 预期留在外面
  - 对剩余差距写清楚
- output artifacts:
  - delegation-first runtime helper
  - thin adapter README
  - bounded parity note
- package-ready artifact:
  - `@switchyard/consumer-openclaw`
- copy-ready pack:
  - `starter-packs/builders/openclaw/`
  - `pnpm run starter-pack:openclaw`
- use this when:
  - 你要把 OpenClaw 风格的 runtime delegation 接到 `Switchyard`
- do not pretend:
  - operator/control-plane parity
  - product-shell parity
  - channel shell parity

### `mcp`

- role:
  - read-only MCP server/tool surface starter
- best entry:
  - `pnpm run switchyard:cli -- mcp-status`
  - `pnpm run switchyard:cli -- mcp-tools`
  - `pnpm run switchyard:mcp -- --base-url http://127.0.0.1:4010`
- required inputs:
  - service runtime base URL
  - local stdio-capable MCP client
  - read-only use case
- starter steps:
  - 启动 read-only Switchyard MCP server
  - 先枚举 tools，再接 client UX
  - 只通过它走 inspection / diagnostics
  - invoke / acquisition / browser automation 全部保持不可用
- output artifacts:
  - stdio MCP client config
  - read-only runtime inspector
  - bounded tool inventory
- package-ready artifact:
  - `@switchyard/surface-mcp`
  - `switchyard-mcp` bin
- copy-ready pack:
  - `starter-packs/builders/mcp/`
  - `pnpm run starter-pack:mcp`
- use this when:
  - 你要给 plugin / skills / local automation 暴露一条只读 runtime inspection 通道
- do not pretend:
  - execution brain
  - write plane
  - runtime invoke through MCP
  - acquisition write through MCP

## Skill Packs

### `runtime-diagnostics-pack`

- role:
  - read-only runtime diagnostics starter
- best entry:
  - `pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack`
- required inputs:
  - current provider id
  - runtime diagnostics access
  - read-only automation context
- starter steps:
  - 先读 provider diagnose 与 support bundle
  - 汇总 readiness / remediation / attach-target truth
  - 把缺失登录态写成明确 blocker
  - 全程只读
- output artifacts:
  - diagnostics skill recipe
  - provider triage checklist
  - bounded incident summary
- copy-ready pack:
  - `starter-packs/skills/runtime-diagnostics-pack/`
  - `pnpm run starter-pack:runtime-diagnostics-pack`
- use this when:
  - 你要做一个只读诊断型 skills pack，去读 provider status / probe / remediation / support bundle
- do not pretend:
  - invoke
  - acquisition write
  - browser automation
  - execution brain parity

### `docs-seo-sync-pack`

- role:
  - truth-sync / discoverability starter
- best entry:
  - `pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack`
- required inputs:
  - current public-surface catalog
  - discoverability keyword table
  - human review before publishing claims
- starter steps:
  - 先读 surface catalog 和 keyword truth
  - 同步 docs / metadata 到最新 truthful labels
  - 保留 partial / research / fail-closed 标记
  - 对外发布前先过人工 review
- output artifacts:
  - docs sync recipe
  - SEO/discoverability checklist
  - truth-safe keyword set
- copy-ready pack:
  - `starter-packs/skills/docs-seo-sync-pack/`
  - `pnpm run starter-pack:docs-seo-sync-pack`
- use this when:
  - 你要做一个只读 docs / SEO / discoverability 同步工具，而不是营销自动机
- do not pretend:
  - 自动生成 launch claims
  - 自动升级 support status
  - 绕过人工审阅直接发外部内容

## Recommended Fields For Builders

外部 builder 最需要的不是大话，而是这几类字段：

- `status`
  - 现在是 `partial` 还是 `supported now`
- `bestEntry`
  - 最稳的 CLI / MCP / doc 入口
- `recommendedDocs`
  - 应该先读哪几页
- `notYetSupported`
  - 现在明确不能宣称什么
- `starterShape`
  - 这是 gateway helper、skills pack、还是 read-only inspector

## Bottom Line

> 现在 `Switchyard` 已经不只是“有一些 partial slice”。  
> 它已经开始给外部 builder 提供 **可读、可接、可 machine-consume 的 starter kit truth**。  
> 现在还多了一层 **按目标分箱的 copy-ready starter packs**。  

如果你只想看 builder kits 自己的目录卡，不想把 skill packs 一起读进来：

- 先读 [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
- 或直接读 [docs/builder-kit-catalog.json](./builder-kit-catalog.json)

如果你只想看 skill packs 自己的目录卡，不想把 builder kits 一起读进来：

- 先读 [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
- 或直接读 [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
> 但这些 starter kit 仍然是窄切片，不是 full parity 承诺。
