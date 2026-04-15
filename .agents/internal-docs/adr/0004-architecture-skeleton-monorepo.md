# ADR 0004: Architecture Skeleton and Monorepo Layout

## Status

Accepted

## Date

2026-03-29

## Context

第一波文档已经锁死了 4 件事：

- `Switchyard V1` 只做 `BYOK + Web/Login`
- `provider / lane / consumer / surface` 必须拆开
- `openclaw-zero-token` 是技术母本，不是产品母本
- `API substrate first / service-first` 是当前主语义，`SDK/client` 保留为同内核上的正式消费面

接下来如果不把 monorepo 骨架写死，后续实现会出现两类高概率问题：

1. 用“平铺包名”把未来能力和当前能力混成一层
2. 为了“留空间”提前建一堆空目录，制造 zombie structure

所以这份 ADR 的目标是：

> **正式定义 `Switchyard` 的强分层骨架，并明确哪些是 Day 1 真实现，哪些只是 reserved namespace。**

---

## 术语定义

### `Day 1 implemented`

指：在 V1 第一波真正要落代码、要承担验证责任、要进入实现任务板的目录或模块。

它不等于“今天立刻全写完”，但等于：

- 这是 V1 当前交付域
- 需要在 Alpha/Beta 阶段内真正实现
- 不能只写空壳占位

### `reserved namespace`

指：命名空间、路径和职责边界现在先锁死，但当前阶段不写真实实现代码。

它的作用是：

- 给未来能力预留自然落点
- 防止以后随手长歪
- 避免今天就制造僵尸目录和僵尸代码

### `lab sidecar`

指：把完整上游运行时当作实验对照对象独立跑起来，用来：

- 观察能力边界
- 做行为对照
- 验证迁移路径
- 充当功能 oracle

它不是正式生产依赖，也不是把上游直接吃进主内核。

### `selective transplant`

指：从上游运行时中选择少量成熟且仍符合 `Switchyard` 边界的逻辑，迁入本仓并重写到 `Switchyard` 自己的层次和契约里。

它不是整仓 vendor，也不是 raw fork。

---

## Decision

### 1. 正式采用强分层骨架

`Switchyard` 采用以下四层作为正式命名空间：

- `lanes/`
- `providers/`
- `consumers/`
- `surfaces/`

并辅以以下横切层与应用层：

- `contracts/`
- `kernel/`
- `credentials/`
- `diagnostics/`
- `apps/`

### 2. 正式骨架

```text
switchyard/
├─ apps/
│  ├─ service/
│  └─ auth-portal/
├─ packages/
│  ├─ contracts/
│  ├─ kernel/
│  ├─ sdk/
│  ├─ credentials/
│  ├─ diagnostics/
│  ├─ lanes/
│  │  ├─ byok/
│  │  ├─ web/
│  │  └─ agent/
│  ├─ providers/
│  │  ├─ byok/
│  │  │  ├─ openai/
│  │  │  ├─ anthropic/
│  │  │  ├─ gemini/
│  │  │  ├─ xai/
│  │  │  ├─ openrouter/
│  │  │  ├─ groq/
│  │  │  ├─ qwen/
│  │  │  ├─ vertex/
│  │  │  ├─ bedrock/
│  │  │  ├─ deepseek/
│  │  │  ├─ huggingface/
│  │  │  └─ minimax/
│  │  └─ web/
│  │     ├─ chatgpt/
│  │     ├─ gemini/
│  │     ├─ claude/
│  │     ├─ grok/
│  │     └─ qwen/
│  ├─ consumers/
│  │  ├─ codex/
│  │  ├─ claude-code/
│  │  ├─ openclaw/
│  │  └─ gemini-cli/
│  └─ surfaces/
│     ├─ http/
│     └─ sdk-client/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  ├─ e2e/
│  └─ fixtures/
├─ docs/
└─ tooling/
```

### 3. `Day 1 implemented` 范围

以下部分属于 `Day 1 implemented`：

- `apps/service`
- `apps/auth-portal`
- `packages/contracts`
- `packages/kernel`
- `packages/sdk`
- `packages/credentials`
- `packages/diagnostics`
- `packages/lanes/byok`
- `packages/lanes/web`
- `packages/providers/byok/openai`
- `packages/providers/byok/anthropic`
- `packages/providers/byok/gemini`
- `packages/providers/byok/xai`
- `packages/providers/byok/openrouter`
- `packages/providers/byok/groq`
- `packages/providers/byok/qwen`
- `packages/providers/byok/vertex`
- `packages/providers/byok/bedrock`
- `packages/providers/web/chatgpt`
- `packages/providers/web/gemini`
- `packages/providers/web/claude`
- `packages/providers/web/grok`
- `packages/providers/web/qwen`
- `packages/surfaces/http`
- `packages/surfaces/sdk-client`
- `tests/unit`
- `tests/integration`
- `tests/e2e`
- `tests/fixtures`

### 4. `reserved namespace` 范围

以下部分当前只作为 `reserved namespace`：

- `packages/lanes/agent`
- `packages/consumers/codex`
- `packages/consumers/claude-code`
- `packages/consumers/openclaw`
- `packages/consumers/gemini-cli`
- `packages/providers/byok/deepseek`
- `packages/providers/byok/huggingface`
- `packages/providers/byok/minimax`
- 未来的 `apps/desktop`
- 未来的 `apps/web-console`

这些路径当前只在文档、蓝图、契约中保留落点，不要求现在建实际代码或空壳文件。

---

## Current Live Checkpoint

这份 ADR 虽然定义的是骨架原则，但当前 live repo 已经不再停留在 “Day 1 还没开工”。

当前工作树现实是：

- `apps/service`
- `apps/auth-portal`
- `packages/contracts`
- `packages/kernel`
- `packages/sdk`
- `packages/credentials`
- `packages/diagnostics`
- `packages/lanes/byok`
- `packages/lanes/web`
- `packages/providers/byok/*`
- `packages/providers/web/*`
- `packages/surfaces/http`
- `packages/surfaces/sdk-client`
- `tests/unit`
- `tests/integration`
- `tests/e2e`

都已经有真实代码或测试落位。

同时，当前 live repo 还出现了一个更进一步的方向：

- `apps/service/src/web-auth-acquisition.ts`

这说明仓库已经开始从“proof 输入驱动”往“in-app acquisition 主线”推进。

这一步已经不再停在“Day 1 空骨架”的状态，因为：

- acquisition / live-proof / remediation 的主线代码已经存在
- 旧的 `playwright-core` 依赖/类型接线问题已经收口，不再是当前 fresh internal blocker
- live proof 结果本身仍然依赖当前机器上的终端用户凭证与浏览器会话材料

所以，当前最准确的 live 判断是：

> **强分层骨架已经真正长出来了，**
> **并且当前 workspace checkpoint 已经满足 `M1 / Kernel Alpha` 的 fresh internal gate 要求。**
>
> **但这不等于 `M1` 已经正式关门，也不等于所有 live gate 在任何机器上都会自动通过。**

---

## Dependency Direction

### 基础方向

- `contracts` 是最底层语义层
- `kernel` 依赖 `contracts`
- `credentials` 和 `diagnostics` 是横切层，不反向拥有业务主语义
- `providers/*` 依赖 `contracts + kernel + credentials + diagnostics`
- `surfaces/*` 依赖 `contracts + kernel + diagnostics`
- `sdk` 依赖 `contracts + kernel + providers/* + surfaces/sdk-client`
- `apps/service` 依赖 `surfaces/http`
- `apps/auth-portal` 依赖 `credentials` 相关契约与实现
- `consumers/*` 未来只允许依赖 `surfaces/*` 或公开 SDK，不允许反向污染 runtime 核心

### 明确禁止

- `kernel` 直接依赖具体 consumer
- `contracts` 依赖 provider 实现
- `surfaces/*` 定义独立于 `contracts` 之外的新 runtime 语义
- `consumers/*` 倒逼修改 provider runtime 主契约

---

## Why This Layout

### 1. `lane / provider / consumer / surface` 四层必须独立

这是第一波已经确认的结构性结论。  
如果不拆开，后面会立刻发生：

- 把 `Codex` 当 provider
- 把网页登录 provider 当 consumer
- 把 HTTP surface 写成另一套 runtime 语言
- 把未来 `consumer compat` 提前混进 V1 供给内核

### 2. 未来能力有自然落点，但不会制造空壳

这版骨架允许未来自然扩容：

- 新 provider 加到 `providers/byok/*`
- 新网页登录 provider 加到 `providers/web/*`
- 新 consumer compat 加到 `consumers/*`
- 新 agent input 相关能力加到 `lanes/agent/*`
- 新 app 加到 `apps/*`

但它不要求现在就建一堆空目录。  
**路径先锁，代码后写**，这比“先建壳”更符合可维护性。

### 3. 适配当前战略路线

这版骨架天然适合当前的三种复用方式：

- `Vercel AI SDK` 作为 `pnpm` 直接依赖进入 `sdk/contracts/byok` 相关层
- `LiteLLM` 作为 `lab sidecar` 主要对接 `apps/service` 和 `surfaces/http`
- `openclaw-zero-token` 先做 `lab sidecar` 对照，再把适合的 Web/Login runtime 逻辑做 `selective transplant`

---

## [已确认]

- 采用强分层骨架
- `apps/service` 与 `apps/auth-portal` 是正式应用层
- `packages/kernel`、`credentials`、`diagnostics` 是正式核心层
- `consumers/*` 是未来 compat 维度，不属于当前 V1 供给主线
- `lanes/agent` 只预留，不实现

---

## [当前默认]

- `tests/` 采用 `unit / integration / e2e / fixtures` 四分
- 未来 consumer compat 的第一消费者顺序仍然是：
  - `codex`
  - `claude-code`
  - `openclaw`
- `apps/service` 是当前 API substrate 与 first-party integration 的首批消费入口
- `sdk` 仍是正式公开消费面，但当前不再定义主 substrate；first-party 首批接入仍通过 service

---

## [非目标]

这份 ADR 不负责：

- 决定每个目录立即创建哪些空文件
- 决定每个 provider 的具体实现类名或包名
- 决定具体 build tool / test runner 配置
- 决定迁移哪些 `openclaw-zero-token` 文件
- 决定 `LiteLLM` 的部署脚本

---

## [后续目标]

以下内容在后续文档中展开：

- `auth-accounts-and-credentials` 的具体责任边界
- `service-and-sdk-surfaces` 的具体 surface 合同
- `v1-delivery-plan` 的阶段拆分与实施顺序
- `task board` 的文件级写边界

---

## Decision Summary

> `Switchyard` 采用 `lane / provider / consumer / surface` 四层强分层骨架。
>
> 当前阶段只实现 `Day 1 implemented` 范围；未来能力通过 `reserved namespace` 预留。
>
> 留空间靠命名空间与 ADR，不靠提前制造僵尸目录。
