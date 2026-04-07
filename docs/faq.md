# Switchyard FAQ

## Is Switchyard a shared provider runtime?

Yes.

更具体地说：

`Switchyard` 当前把自己定义成：

- `shared provider runtime for AI apps`
- `BYOK + Web/Login`
- `service-first API substrate`

## Is Switchyard an AI app backend?

Partly yes, but only in a narrow sense.

它不是全家桶 AI 平台，也不是 assistant 产品。  
如果你把 “AI app backend” 理解成：

- 统一 provider access
- 统一 auth/session/diagnostics
- 暴露稳定的 service / SDK surface

那 `Switchyard` 确实是这类 backend/runtime。

## Does Switchyard support Codex today?

Partially, but only in a thin fail-closed sense.

Truthful status:

- `partial` publicly
- the repo now carries a thin runtime adapter
- `not full support`
- `no tool / MCP / worktree parity`

## Does Switchyard support Claude Code today?

Partially, but only in a thin fail-closed sense.

Truthful status:

- `partial` publicly
- the repo now carries a thin runtime adapter
- `not full support`
- `no terminal shell / approval / tool / MCP parity`

## Does Switchyard support OpenClaw today?

Partially, but only in a thin fail-closed sense.

Truthful status:

- `partial` publicly
- the repo now carries a delegation-first thin adapter
- `not full support`
- `no operator/control-plane/product-shell parity`

## Is Switchyard an MCP server today?

Partially yes, but only in a thin read-only sense.

当前最多能诚实说：

- repo 有 committed service runtime
- repo 有 committed SDK/client surfaces
- repo 现在也有 committed read-only MCP server/tool surface
- 但它还不是 execution brain
- 也不是 Codex / Claude Code / OpenClaw 的 full MCP parity

## Where should plugin or skills builders read the current truth?

优先读 machine-readable catalog，而不是手抄页面。

先把入口分成三类会更不容易迷路：

- 要看 surface / support truth：先读 `surface-catalog`
- 要是不知道第一站该去哪：先读 `builder-intent-router`
- 要看 keyword-claim truth：先读 `keyword-truth`
- 要选 builder path：先读 `starter-pack-chooser` 或 `builder-journeys`

当前最稳定的入口是：

- `pnpm run switchyard:cli -- surface-catalog`
- `pnpm run switchyard:cli -- surface-catalog-schema`
- `pnpm run switchyard:cli -- compat-target-catalog`
- `pnpm run switchyard:cli -- compat-target-catalog-schema`
- `pnpm run switchyard:cli -- compat-targets`
- `pnpm run switchyard:cli -- compat-target --target codex`
- `pnpm run switchyard:cli -- compat-target --target claude-code`
- `pnpm run switchyard:cli -- compat-target --target openclaw`
- `pnpm run switchyard:cli -- builder-kit-catalog`
- `pnpm run switchyard:cli -- builder-kit-catalog-schema`
- `pnpm run switchyard:cli -- builder-kits`
- `pnpm run switchyard:cli -- builder-kit --target codex`
- `pnpm run switchyard:cli -- builder-kit --target claude-code`
- `pnpm run switchyard:cli -- builder-kit --target openclaw`
- `pnpm run switchyard:cli -- builder-kit --target mcp`
- `pnpm run switchyard:cli -- skill-pack-catalog`
- `pnpm run switchyard:cli -- skill-pack-catalog-schema`
- `pnpm run switchyard:cli -- skill-packs`
- `pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack`
- `pnpm run switchyard:cli -- host-playbooks`
- `pnpm run switchyard:cli -- host-playbooks-schema`
- `pnpm run switchyard:cli -- host-playbook --target codex`
- `pnpm run switchyard:cli -- host-examples`
- `pnpm run switchyard:cli -- host-example --target codex`
- `pnpm run switchyard:cli -- builder-intent-router`
- `pnpm run switchyard:cli -- builder-intent-router-schema`
- `pnpm run switchyard:cli -- builder-intent --target support-truth`
- `pnpm run switchyard:cli -- starter-manifests`
- `pnpm run switchyard:cli -- starter-manifests-schema`
- `pnpm run switchyard:cli -- starter-examples`
- `pnpm run switchyard:cli -- starter-examples-schema`
- `pnpm run switchyard:cli -- starter-pack-index`
- `pnpm run switchyard:cli -- starter-pack-index-schema`
- `pnpm run switchyard:cli -- starter-pack-entry --target codex`
- `pnpm run switchyard:cli -- starter-pack-chooser`
- `pnpm run switchyard:cli -- starter-pack-chooser-schema`
- `pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder`
- `pnpm run switchyard:cli -- starter-pack-comparison`
- `pnpm run switchyard:cli -- starter-pack-comparison-schema`
- `pnpm run switchyard:cli -- starter-pack-filter --target read-only-truth`
- `pnpm run switchyard:cli -- keyword-truth`
- `pnpm run switchyard:cli -- keyword-truth-schema`
- `pnpm run switchyard:cli -- keyword-entry --target switchyard-mcp`
- `pnpm run switchyard:cli -- builder-template --target codex`
- `pnpm run switchyard:cli -- builder-example --target codex`
- `pnpm run switchyard:cli -- skill-template --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-example --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- provider-catalog`
- `pnpm run switchyard:cli -- provider-entry --target chatgpt`
- `pnpm run switchyard:cli -- mcp-status`
- `pnpm run switchyard:cli -- mcp-tools`
- `pnpm run switchyard:cli -- mcp-tool-catalog`
- `pnpm run switchyard:cli -- mcp-tool-catalog-schema`
- `pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health`
- `docs/public-surface-catalog.json`
- `docs/public-surface-catalog.schema.json`
- `docs/compat-target-catalog.json`
- `docs/compat-target-catalog.schema.json`
- `docs/builder-kit-catalog.json`
- `docs/builder-kit-catalog.schema.json`
- `docs/skill-pack-catalog.json`
- `docs/skill-pack-catalog.schema.json`
- `docs/starter-pack-chooser.json`
- `docs/starter-pack-chooser.schema.json`
- `docs/starter-pack-comparison.json`
- `docs/starter-pack-comparison.schema.json`
- `docs/discoverability-keyword-truth.json`
- `docs/discoverability-keyword-truth.schema.json`
- `docs/builder-intent-router.json`
- `docs/builder-intent-router.schema.json`
- `docs/host-integration-playbooks.json`
- `docs/host-integration-playbooks.schema.json`
- `examples/hosts/index.json`
- `examples/hosts/index.schema.json`
- `docs/starter-manifest-templates.md`
- `docs/starter-manifest-templates.schema.json`
- `docs/starter-manifest-examples.md`
- `docs/starter-manifest-examples.schema.json`
- `docs/compat-target-catalog.md`
- `docs/builder-kit-catalog.md`
- `docs/skill-pack-catalog.md`
- `docs/provider-runtime-catalog.md`

这样做的好处是：

- plugin / skills tooling 能直接读现在的 status
- plugin / skills tooling 还能直接读“从哪条窄路开始接”
- 不会把 `partial` 误读成 `supported`
- 不会把 `MCP` 的 future direction 误读成 today shipping

## How do I choose the right starter pack?

先把这个问题理解成“导购问题”，不是“目录问题”。

也就是说：

- `starter-pack-index` 负责告诉你 pack 在哪里
- `starter-pack-chooser` 负责告诉你你该先拿哪一包

当前最短路径是：

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- `pnpm run switchyard:cli -- starter-pack-chooser`
- `pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder`
- `pnpm run switchyard:cli -- starter-pack-scenario --target mcp-inspector`

如果你只想记一句人话：

- 要接别的工具进来，先看 builder pack
- 要做诊断或 docs/SEO 配方，先看 skill pack

## How do I compare starter packs or filter them by constraints?

先把这个问题理解成“比较问题”，不是“选一个答案”的问题。

也就是说：

- `starter-pack-chooser` 负责先选路
- `starter-pack-comparison` 负责把已经 landed 的 pack truth 并排放在一起
- `starter-pack-filter` 负责按硬条件把结果缩小

当前最短路径是：

- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
- `pnpm run switchyard:cli -- starter-pack-comparison`
- `pnpm run switchyard:cli -- starter-pack-filter --target thin-runtime-bridges`
- `pnpm run switchyard:cli -- starter-pack-filter --target read-only-truth`

## Where do I start if I want one full builder journey instead of jumping across multiple docs?

先把这个问题理解成“路线总览问题”。

也就是说：

- `builder-journeys` 不是替代 chooser/comparison/playbooks/examples
- 它只是把这几步串成一张完整的路书

当前最短路径是：

- [docs/builder-journeys.md](./builder-journeys.md)
- `pnpm run switchyard:cli -- builder-journeys`
- `pnpm run switchyard:cli -- builder-journey --target codex-first-success`

## How do I wire the chosen pack into a host?

先把这个问题理解成“宿主接入问题”，不是“选包问题”。

也就是说：

- `starter-pack-chooser` 负责告诉你该先选哪包
- `host-playbooks` 负责告诉你选完之后，接进宿主时第一步怎么走

当前最短路径是：

- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- `pnpm run switchyard:cli -- host-playbooks`
- `pnpm run switchyard:cli -- host-playbook --target codex`
- `pnpm run switchyard:cli -- host-playbook --target mcp`

如果你不只是想读文字手册，而是想直接看一份 host-local config 长什么样：

- [docs/host-integration-examples.md](./host-integration-examples.md)
- `pnpm run switchyard:cli -- host-examples`
- `pnpm run switchyard:cli -- host-example --target codex`
- `pnpm run switchyard:cli -- host-example --target mcp`

## Is Switchyard SDK-first?

No.

当前更诚实的写法是：

- `API substrate first`
- `service-first / runtime-first` frontdoor
- `SDK/client` 是建立在同一 substrate 上的正式消费入口

换句话说：

> SDK 没被删掉。  
> 只是它不再被写成高于 runtime/API substrate 的第一真理源。

## What is the difference between BYOK and Web/Login?

### BYOK

- 你自己带官方 API Key
- 更接近标准 API provider 接入

### Web/Login

- 你用浏览器登录、OAuth、订阅会话
- 更接近“没有 API Key，但已有真实账号使用资格”的场景

## Where do Switchyard runtime caches live now?

先把这个问题理解成“仓库自己的可清理资产放哪里”，不是“电脑上一切缓存都归它管”。

当前正式规则是：

- repo-local runtime assets
  - `.runtime-cache/`
- repo-external dedicated cache root
  - `~/.cache/switchyard`
- shared tool caches
  - 不归当前 repo 自动清理

更直白一点说：

> 当前 repo 只清自己这两个根。
> `~/.npm`、`pnpm store`、`~/Library/Caches/ms-playwright`、Docker 全局缓存、`.serena/cache` 都不是它的自动清理对象。

默认治理参数是：

- `TTL = 7 days`
- `maxBytes = 5 GiB`

## Does Switchyard own my real Chrome profile?

No.

当前更准确的说法是：

- 本地 credentialed 开发默认可以指向你分配给当前 repo 的真实 Chrome Profile
- 通过：
  - `SWITCHYARD_CHROME_USER_DATA_DIR`
  - `SWITCHYARD_CHROME_PROFILE_NAME`
- 真实 Chrome Profile 是**用户资产**
- 它不属于 repo cache
- 它不会被自动清理

repo-local 的：

- `.runtime-cache/switchyard-web-auth-browser`

现在只是显式 opt-in 的 managed fallback，不再是默认日常工位。

## Does cloud CI use my real Chrome profile or login state?

No.

当前仓继续只用 GitHub Hosted Runner。

云端 CI 只跑 repo-side gate：

- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- security / repository code scanning

而这些属于 local credentialed only：

- `pnpm run verify:gemini-live`
- `pnpm run verify-web-login-live`
- `pnpm run verify:service-live`
- `pnpm run reality:gate`
- browser diagnose / capture scripts

如果在 CI 环境中误触发这些 live 路径，现在应该 fail-closed，明确报 `credentialed-workstation only`。

## Why does this repo talk about Codex, Claude Code, and OpenClaw if they are still only thin starters?

因为这些是 future consumer compat 目标，  
而当前 repo 里刚 landed 的也只是 very thin、builder-facing、fail-closed adapters。

但这仍然不等于今天已经完整支持。

这类关键词页面存在的目的，是为了：

- truthful discoverability
- 明确 planned vs supported
- 避免搜索者或 AI 工具误判

## Where should docs or SEO tooling read truthful keyword claims?

先把这个问题理解成“读词典”，不是“写广告”。

当前最短路径是：

- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- [docs/discoverability-keyword-truth.json](./discoverability-keyword-truth.json)
- [docs/discoverability-keyword-truth.schema.json](./discoverability-keyword-truth.schema.json)
- `pnpm run switchyard:cli -- keyword-truth`
- `pnpm run switchyard:cli -- keyword-truth-schema`
- `pnpm run switchyard:cli -- keyword-entry --target switchyard-mcp`
- `switchyard.catalog.keyword_truth`
- `switchyard.catalog.keyword_truth_schema`
- `switchyard.catalog.keyword_entry`

## Where do I start if I do not yet know which truthful surface I need?

先把这个问题理解成“找分诊台”，不是“直接去某个专科门诊”。

当前最短路径是：

- [docs/builder-intent-router.md](./builder-intent-router.md)
- [docs/builder-intent-router.json](./builder-intent-router.json)
- [docs/builder-intent-router.schema.json](./builder-intent-router.schema.json)
- `pnpm run switchyard:cli -- builder-intent-router`
- `pnpm run switchyard:cli -- builder-intent --target support-truth`
- `switchyard.catalog.builder_intent_router`
- `switchyard.catalog.builder_intent`

## Where do I look if I only need thin compat target truth?

先把这个问题理解成“看兼容性目标目录卡”，不是“看整个 aggregate 大目录”。

当前最短路径是：

- [docs/compat-target-catalog.md](./compat-target-catalog.md)
- [docs/compat-target-catalog.json](./compat-target-catalog.json)
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)
- `pnpm run switchyard:cli -- compat-target-catalog`
- `pnpm run switchyard:cli -- compat-target-catalog-schema`
- `pnpm run switchyard:cli -- compat-target --target codex`
- `pnpm run switchyard:cli -- compat-target --target claude-code`
- `pnpm run switchyard:cli -- compat-target --target openclaw`
- `switchyard.catalog.compat_target_catalog`
- `switchyard.catalog.compat_target_catalog_schema`
- `switchyard.catalog.compat_target`

## Where do I look if I only need builder kit truth?

先把这个问题理解成“看施工包目录卡”，不是“看更宽的 plugin + skill 说明书”。

当前最短路径是：

- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
- `pnpm run switchyard:cli -- builder-kit-catalog`
- `pnpm run switchyard:cli -- builder-kit-catalog-schema`
- `pnpm run switchyard:cli -- builder-kit --target codex`
- `pnpm run switchyard:cli -- builder-kit --target claude-code`
- `pnpm run switchyard:cli -- builder-kit --target openclaw`
- `pnpm run switchyard:cli -- builder-kit --target mcp`
- `switchyard.catalog.builder_kit_catalog`
- `switchyard.catalog.builder_kit_catalog_schema`
- `switchyard.catalog.builder_kit`

## Where do I look if I only need skill pack truth?

先把这个问题理解成“看技能包目录卡”，不是“看更宽的 plugin + skill 说明书”。

当前最短路径是：

- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)
- `pnpm run switchyard:cli -- skill-pack-catalog`
- `pnpm run switchyard:cli -- skill-pack-catalog-schema`
- `pnpm run switchyard:cli -- skill-pack --target runtime-diagnostics-pack`
- `pnpm run switchyard:cli -- skill-pack --target docs-seo-sync-pack`
- `switchyard.catalog.skill_pack_catalog`
- `switchyard.catalog.skill_pack_catalog_schema`
- `switchyard.catalog.skill_pack`

## Where do I look if I only need provider ids, lanes, auth mode, or stability tiers?

先把这个问题理解成“看楼层总表”，不是“看 live 状态面板”。

当前最短路径是：

- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
- [docs/provider-runtime-catalog.json](./provider-runtime-catalog.json)
- [docs/provider-runtime-catalog.schema.json](./provider-runtime-catalog.schema.json)
- `pnpm run switchyard:cli -- provider-catalog`
- `pnpm run switchyard:cli -- provider-catalog-schema`
- `pnpm run switchyard:cli -- provider-entry --target chatgpt`
- `pnpm run switchyard:cli -- provider-entry --target gemini:web-login`
- `switchyard.catalog.provider_catalog`
- `switchyard.catalog.provider_catalog_schema`
- `switchyard.catalog.provider_entry`

## Where do I look if I only need the current read-only MCP tool inventory?

先把这个问题理解成“查按钮目录”，不是“查 MCP 角色总说明”。

当前最短路径是：

- [docs/mcp-tool-catalog.md](./mcp-tool-catalog.md)
- [docs/mcp-tool-catalog.json](./mcp-tool-catalog.json)
- [docs/mcp-tool-catalog.schema.json](./mcp-tool-catalog.schema.json)
- `pnpm run switchyard:cli -- mcp-tool-catalog`
- `pnpm run switchyard:cli -- mcp-tool-catalog-schema`
- `pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health`
- `switchyard.catalog.mcp_tool_catalog`
- `switchyard.catalog.mcp_tool_catalog_schema`
- `switchyard.catalog.mcp_tool`
