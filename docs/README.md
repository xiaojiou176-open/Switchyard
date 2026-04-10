# Switchyard Docs Frontdoor

`Switchyard` 的正式文档入口在这里。

This page is the developer frontdoor for `Switchyard`.

## Page Roles / 页面分工

为了不让 front door 变成三块写同一件事，先把角色分开：

- [README.md](../README.md)
  - repo front door / 项目总览 / 当前最短人话入口
- [docs/index.html](./index.html)
  - static docs atlas / reviewer-facing route map / Pages front door
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - live truth / proof wording / allowed claims
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
  - distribution status / listing truth / package-ready 边界
- [docs/README.md](./README.md)
  - full atlas / 完整文档地图

## Quick Routes / 最短路线

如果你现在只想知道“我第一站该去哪”，先从这里五选一：

- 我想先看静态 docs atlas，再决定读哪条 lane
  - [docs/index.html](./index.html)
- 我想先用 30 秒看懂它
  - [docs/media/30-second-overview.md](./media/30-second-overview.md)
- 我想先跑通默认第一把成功
  - [docs/first-success.md](./first-success.md)
- 我想先看它当前到底能证明什么
  - [docs/public-proof-pack.md](./public-proof-pack.md)
- 我想接 package / plugin / starter pack
  - [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
- 我想看 public distribution / listing / registry 状态
  - [docs/public-distribution-ledger.md](./public-distribution-ledger.md)

## Default First Success / 默认第一把成功

如果你不想一上来就翻完整 docs 树，先走这条默认路线：

1. 先看 [docs/index.html](./index.html)
   - 先按问题类型挑你真正该读的 shelf
2. 再看 [docs/media/30-second-overview.md](./media/30-second-overview.md)
   - 先用一句话记住它的第一身份
3. 再看 [docs/first-success.md](./first-success.md)
   - 先跑 service，再做第一把 bounded invoke / inspect
4. 最后看 [docs/public-proof-pack.md](./public-proof-pack.md)
   - 把当前能证明什么、不能 overclaim 什么一并看清楚

## Start Here / 从这里开始

- [docs/media/30-second-overview.md](./media/30-second-overview.md)
  - 30 秒版本的产品身份、当前可证明事实和非目标
- [docs/first-success.md](./first-success.md)
  - 当前默认 first-success 路径 / 先点火再扩展
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - 当前可证明能力、最小 smoke、allowed claims / forbidden overclaim
- [README.md](../README.md)
  - 项目总览、阶段状态、当前 truth-first 入口
- [docs/product/v1-brief.md](./product/v1-brief.md)
  - 为什么这个项目存在
- [docs/product/scope-and-nongoals.md](./product/scope-and-nongoals.md)
  - 当前做什么，不做什么
- [docs/blueprints/v1-delivery-plan.md](./blueprints/v1-delivery-plan.md)
  - 阶段顺序与 exit criteria
- [docs/blueprints/m2-kernel-beta-verdict.md](./blueprints/m2-kernel-beta-verdict.md)
  - 当前 `M2 / Kernel Beta` 的 fresh honest verdict
- [docs/blueprints/m3-first-party-integration-readiness.md](./blueprints/m3-first-party-integration-readiness.md)
  - 当前 `M3` 的主仓内 readiness package 与重入护栏
- [docs/blueprints/wave3-consumer-seam-matrix.md](./blueprints/wave3-consumer-seam-matrix.md)
  - `Wave 3` 的 5 仓 seam / bounded / shelve 正式矩阵
- [docs/blueprints/wave4-consumer-contract-freeze.md](./blueprints/wave4-consumer-contract-freeze.md)
  - `Wave 4` 的 thin compat contract freeze
- [docs/blueprints/wave5-thin-compat-starter.md](./blueprints/wave5-thin-compat-starter.md)
  - `Wave 5` 的 thin compat starter 边界
- [docs/blueprints/wave6-outward-packaging-threshold.md](./blueprints/wave6-outward-packaging-threshold.md)
  - `Wave 6` 的 outward packaging 升格门槛
- [docs/blueprints/openclaw-zero-token-adoption-ledger.md](./blueprints/openclaw-zero-token-adoption-ledger.md)
  - `openclaw-zero-token` 技术吸收状态账本
- [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md)
  - 当前 workstation / browser hygiene / runtime-cache hygiene / shared-machine budget runbook

## Contracts / 合同

- [docs/contracts/provider-runtime-contract.md](./contracts/provider-runtime-contract.md)
- [docs/contracts/auth-accounts-and-credentials.md](./contracts/auth-accounts-and-credentials.md)
- [docs/contracts/service-and-sdk-surfaces.md](./contracts/service-and-sdk-surfaces.md)

## API and SDK / API 与 SDK

- [docs/api/service-http-reference.md](./api/service-http-reference.md)
  - Current HTTP service routes, `/v1/runtime/auth-portal`, and service-first debug entrypoints
- [docs/api/openapi.yaml](./api/openapi.yaml)
  - Machine-readable OpenAPI contract for the current HTTP surface
- [docs/api/sdk-quickstart.md](./api/sdk-quickstart.md)
  - Current BYOK SDK and service-client quickstart
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
  - Current read-only MCP server starter and fail-closed boundaries
- [docs/api/error-diagnostics-reference.md](./api/error-diagnostics-reference.md)
  - Current error and diagnostics language
- [docs/api/web-login-acquisition.md](./api/web-login-acquisition.md)
  - Current login acquisition routes
- [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md)
  - Fastest Web/Login builder first-stop for auth-portal, browser hygiene, and runtime bootstrap discipline

## Explanations / 解释页

- [docs/shared-provider-runtime.md](./shared-provider-runtime.md)
  - What a shared provider runtime means
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - 当前最短 proof pack / 最小 smoke / 对外 claim 边界
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
  - 当前公开 surface / support matrix
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
  - plugin / skills / builder tooling 可直接读取的 machine-readable catalog
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
  - package-ready / starter-pack-ready / official-listing-not-claimed 的公开分发账本
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
  - public surface catalog 的 machine-readable contract schema
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
  - plugin / skills builder 从哪条窄路开始接的 starter-kit 说明书
- [docs/starter-manifest-templates.md](./starter-manifest-templates.md)
  - copy-paste 级 starter manifest 模板
- [docs/starter-manifest-templates.schema.json](./starter-manifest-templates.schema.json)
  - starter manifest 模板的 machine-readable schema
- [docs/starter-manifest-examples.md](./starter-manifest-examples.md)
  - runnable starter examples / 可直接照着改的例子
- [docs/starter-manifest-examples.schema.json](./starter-manifest-examples.schema.json)
  - starter manifest examples 的 machine-readable schema
- [examples/README.md](../examples/README.md)
  - 真正能跑通 first success 的 starter mini-projects
- [starter-packs/README.md](../starter-packs/README.md)
  - 按目标拆好的 copy-ready starter packs
- [docs/starter-pack-index.md](./starter-pack-index.md)
  - starter-packs 的 machine-readable 总目录
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
  - 回答“我该先选哪个 starter pack”的 chooser / decision frontdoor
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
  - 回答“这些 starter pack 并排看差在哪、该怎么按约束筛选”的 comparison / filter frontdoor
- [docs/builder-journeys.md](./builder-journeys.md)
  - 回答“如果我是某类 builder，我从哪一条完整旅程开始”的 journey frontdoor
- [docs/builder-intent-router.md](./builder-intent-router.md)
  - 回答“我现在这个问题第一站该去哪”的 builder 分诊台
- [docs/builder-intent-router.json](./builder-intent-router.json)
  - builder intent router 的 machine-readable source
- [docs/builder-intent-router.schema.json](./builder-intent-router.schema.json)
  - builder intent router 的 machine-readable schema
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
  - 回答“选完之后怎么接进 Codex / Claude Code / OpenClaw / MCP 宿主”的 host frontdoor
- [docs/host-integration-examples.md](./host-integration-examples.md)
  - 回答“宿主本地第一份 config/example 长什么样”的 host-local examples frontdoor
- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
  - provider / lane / authMode / stability 的静态目录
- [docs/provider-runtime-catalog.json](./provider-runtime-catalog.json)
  - provider runtime catalog 的 machine-readable source
- [docs/provider-runtime-catalog.schema.json](./provider-runtime-catalog.schema.json)
  - provider runtime catalog 的 machine-readable schema
- [docs/compat-target-catalog.md](./compat-target-catalog.md)
  - thin compat target truth 的独立目录卡
- [docs/compat-target-catalog.json](./compat-target-catalog.json)
  - compat target catalog 的 machine-readable source
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)
  - compat target catalog 的 machine-readable schema
- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
  - builder kit truth 的独立目录卡
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
  - builder kit catalog 的 machine-readable source
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
  - builder kit catalog 的 machine-readable schema
- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
  - skill pack truth 的独立目录卡
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
  - skill pack catalog 的 machine-readable source
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)
  - skill pack catalog 的 machine-readable schema
- [docs/mcp-tool-catalog.md](./mcp-tool-catalog.md)
  - read-only MCP tool inventory 的独立目录卡
- [docs/mcp-tool-catalog.json](./mcp-tool-catalog.json)
  - MCP tool inventory 的 machine-readable source
- [docs/mcp-tool-catalog.schema.json](./mcp-tool-catalog.schema.json)
  - MCP tool inventory 的 machine-readable schema
- [docs/compare/byok-vs-web-login.md](./compare/byok-vs-web-login.md)
  - Why `BYOK` and `Web/Login` both exist
- [docs/compare/switchyard-vs-codex.md](./compare/switchyard-vs-codex.md)
  - Product boundary vs Codex
- [docs/compare/switchyard-vs-claude-code.md](./compare/switchyard-vs-claude-code.md)
  - Product boundary vs Claude Code
- [docs/compare/switchyard-vs-openclaw.md](./compare/switchyard-vs-openclaw.md)
  - Product boundary and upstream relationship

## Compatibility / 兼容性

- [docs/compat/README.md](./compat/README.md)
- [docs/compat/codex.md](./compat/codex.md)
- [docs/compat/claude-code.md](./compat/claude-code.md)
- [docs/compat/openclaw.md](./compat/openclaw.md)
- [packages/consumers/codex/README.md](../packages/consumers/codex/README.md)
- [packages/consumers/claude-code/README.md](../packages/consumers/claude-code/README.md)
- [packages/consumers/openclaw/README.md](../packages/consumers/openclaw/README.md)
- [packages/surfaces/mcp/README.md](../packages/surfaces/mcp/README.md)

## MCP and AI Tooling / MCP 与 AI 工具

- [docs/mcp.md](./mcp.md)
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)

## FAQ / 常见问题

- [docs/faq.md](./faq.md)

## Glossary / 术语表

- [docs/glossary.md](./glossary.md)

## i18n / 双语入口

- [docs/i18n.md](./i18n.md)

## Testing / 测试

- [docs/testing-pyramid.md](./testing-pyramid.md)
  - Includes the current `pnpm run test:coverage` entrypoint

## Keyword Truth / 关键词真值表

- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- [docs/discoverability-keyword-truth.json](./discoverability-keyword-truth.json)
  - crawler / CLI / MCP 可直接读取的 machine-readable keyword truth table
- [docs/discoverability-keyword-truth.schema.json](./discoverability-keyword-truth.schema.json)
  - keyword truth table 的 machine-readable schema

## Truthfulness Rules / 诚实规则

- `supported` means there is a real, durable, repo-backed surface now.
- `partial` means there is a real narrow slice now, but only part of the promised shape is landed; if it is still local-only, the page must say so explicitly.
- `planned` means the project intends to do it later, but it is not implemented yet.
- `research` means there is evidence or design work, but no landed support surface yet.
- `not now` means the project explicitly does not expose that surface on the current public frontdoor.

更直白一点说：

- `supported` = 现在真的能用，而且不是只停在本地临时切片
- `partial` = 已经有一片真实窄切片，但还不是完整形态；若还没 Git 收口，必须写明
- `planned` = 现在还不能用，但路线已经明确
- `research` = 现在只有研究和边界，不算支持
- `not now` = 当前公开前门明确不提供
