# Wave 4 Consumer Contract Freeze

## Status

`completed on fresh 2026-04-03 program truth`

这页不是为了把 `Wave 5 / Wave 6` 提前吹成“已经支持”。

它的作用更像施工前先画线：

> **先把 `Switchyard` 和 future consumers 的边界写死，**
> **再决定哪些 thin compat 可以做，哪些一定要 fail-closed。**

如果没有这层 freeze，后面很容易发生两种坏事：

- 把 consumer 自己的产品壳搬进 `Switchyard`
- 把还只是 `planned / research only` 的东西写成今天已支持

---

## Why This Exists

说得更直白一点：

- `Wave 3` 关心的是“你的 first-party 仓到底怎么接这台共享底盘”
- `Wave 4` 关心的是“以后别人来接时，哪些只是接电源，哪些不能顺手把整间控制室搬走”

这页只回答后者。

---

## Current Preconditions

当前这页建立在以下 fresh truth 上：

- latest authoritative aggregate closeout:
  - `verify:web-login-live` = success
  - `verify:service-live` = success
  - `reality:gate` = `external-blocker`
  - remaining blockers = `Grok + Qwen` session recovery
- `M1 / Kernel Alpha` = `repo-side closeout complete`
- `M2 / Kernel Beta` = `repo-side substrate done; aggregate latest truth still environment-bound`
- `Wave 3` 里：
  - `campus-copilot` = `landed but bounded`
  - `DealWatch` = `landed but bounded`
  - `Shopflow` = `landed but bounded`
  - `apple-notes-snapshot` = `landed but bounded`
  - `multi-ai-sidepanel` = `landed but bounded`

所以这页不是“已经可以全面做 compat”的许可证。

它只是：

> **在继续推进之前，把 compat 该薄到什么程度，先定下来。**

---

## Frozen Contract

### 1. `Switchyard` 自己只提供 shared provider/runtime brain

当前允许 future consumers 复用的，只是下面这些共享底盘能力：

- `provider/model` 解析
- `lane = byok | web` 的统一 invoke 入口
- `auth-status / probe / remediation / acquisition / invoke` 这套 service/runtime 语义
- 统一 diagnostics / error taxonomy
- builder-facing service client / runtime adapter

更直白一点说：

> `Switchyard` 提供的是“供电系统 + 统一插口”，  
> 不是“前台驾驶舱 + 操作台 + 业务工作流”。

### 2. 当前允许 future consumers 先迁移的 slice

先允许进入 thin compat 的，是这些 slice：

- `chat brain`
- `plan / copilot brain`
- provider/runtime invocation bridge
- model/provider selection bridge
- diagnostics passthrough

它们有一个共同点：

> **本质上都还只是“把请求送进共享底盘，再把结果拿回来”。**

### 3. 默认继续留在 consumer 仓里的 slice

以下内容默认**不迁移**，仍留在各自 consumer 仓：

- `tool execution`
- `MCP execution plane`
- browser automation / tab orchestration
- worktree / approval / terminal shell UX
- domain-specific workflows
- retrieval / embedding / multimodal / computer-use

这里可以把它理解成：

> 共享底盘负责“发动机”，  
> 各 consumer 继续保留“方向盘、刹车、座椅布局、导航习惯”。

### 4. fail-closed 是强规则

如果 `Switchyard` 当前没有真实支持某个能力，thin compat 必须：

- 明确返回 unsupported / planned / research only
- 不做 silent fallback
- 不做假 parity
- 不把 prompt helper 说成 execution brain

尤其不能写强：

- full tool parity
- full MCP parity
- full runner parity
- full agent parity

---

## Target-Specific Freeze

### `Codex`

当前最薄、最诚实的 compat 目标是：

- responses-style runtime adapter
- provider/model metadata bridge
- service-first client shim

当前明确不做：

- worktree agent shell
- approval / execution UI
- tool/MCP parity

### `Claude Code`

当前最薄、最诚实的 compat 目标是：

- anthropic-compatible runtime adapter
- endpoint/header/body fidelity bridge
- fail-closed diagnostics passthrough

当前明确不做：

- terminal shell / worktree UX
- approval UX
- tool/MCP parity

### `OpenClaw`

当前最薄、最诚实的 compat 目标是：

- future consumer-side adapter only
- provider/runtime delegation to `Switchyard`
- no product-shell inheritance

当前明确不做：

- operator/control-plane worldview
- channels/mobile companion shell
- upstream product shell cloning

---

## Explicit Non-Goals For Wave 4

Wave 4 不负责：

- 真正落完整 `Codex / Claude Code / OpenClaw` compat 代码
- 落 `CLI`
- 落 `MCP server`
- 落 `Skills packs`
- 落 outward packaging / SEO / landing

这些都属于后续波次。

Wave 4 的职责只有一个：

> **先把 compat 边界钉死，不让后面越做越大。**

---

## Done Signal

`Wave 4` 只有在以下条件满足后才算 complete：

1. 这份 freeze artifact 已落盘
2. `docs/compat/README.md`、`docs/public-surface-support-matrix.md`、`llms.txt` 和这份 artifact 之间没有互相打架
3. future implementers 能据此明确判断：
   - 哪些能做 thin compat
   - 哪些必须继续 `planned / research only`
   - 哪些必须留在 consumer 仓

当前状态已满足以上 3 条。

所以今天最诚实的写法是：

> `Wave 4 contract freeze complete`

---

## Decision Summary

> `Wave 4` 冻结的不是“功能更多了”，  
> 而是“边界更硬了”。  
>
> 现在先允许迁移的是 `chat / plan / copilot brain` 这类 thin runtime slices。  
> `tool / MCP / execution brain` 默认继续留在 consumer 仓。  
> 任何 thin compat 都必须 fail-closed，不能靠 overclaim 看起来更完整。
