# Switchyard V1 Brief

## 文档目的

这份 brief 用来回答 4 个最基础、也最容易被写偏的问题：

1. `Switchyard` 为什么存在
2. 它到底服务谁
3. V1 真正要解决什么
4. 为什么它虽然深度借鉴强上游，但仍然必须作为独立产品存在

这份文档默认面向两类读者：

- 零上下文的新 Agent
- 未来要继续写 ADR、contracts、runbook 的工程师

---

## 证据基础

本 brief 只基于以下材料收口：

- `关于Switchyard` 主线程 3 个对话分片
- 本地参考仓入口：
  - `ai/packages/ai/README.md`
  - `ai/packages/gateway/README.md`
  - `litellm/README.md`
  - `openclaw-zero-token/README.md`
  - `openclaw-zero-token/ARCHITECTURE.md`
  - `openclaw-zero-token/docs/gateway/index.md`
  - `openclaw-zero-token/docs/gateway/authentication.md`
  - `openclaw-zero-token/docs/gateway/openresponses-http-api.md`
  - `openclaw-zero-token/docs/zh-CN/providers/models.md`
  - `openclaw-zero-token/SECURITY.md`
  - `codex/README.md`
  - `claude-code/README.md`
  - `openclaw/README.md`
  - `gemini-cli/README.md`
  - `ChatALL/README.md`

---

## 一句话定位

> `Switchyard` 是一个面向 AI 产品开发者的共享 Provider Runtime。  
> 它把终端用户已经拥有的 AI 访问资格，统一转成可被 AI 产品消费的稳定内核能力。

这里的“访问资格”不是只指 API Key，还包括：

- 官方 API Key
- Web/Login / OAuth / subscription 会话
- 未来才可能纳入的 agent-native runtime 能力来源

---

## [已确认] 项目为什么存在

### 1. 它不是为了给你自己的 3 个 repo 打补丁

你的 3 个 repo 是最重要的 first-party sample，但它们不是 `Switchyard` 的存在理由。  
`Switchyard` 的目标用户是更广泛的一类人：

> **任何想在自己的 AI 产品里加入多种 AI 能力来源、同时又不想把 provider 接入层写成一锅粥的开发者。**

也就是说，`Switchyard` 要解决的是一个更普遍的问题：

- 多个产品反复重写 provider contract
- 不同 provider 的 auth 方式和模型引用方式不一致
- Web/Login provider 非常脆弱，但真实用户又经常只有订阅、没有 API Key
- 产品侧被迫处理 provider routing、session、refresh、错误归一化、能力差异

### 2. 它不是“又一个聊天产品”

`Switchyard` 不负责成为最终聊天产品、assistant 产品、channel hub 或全家桶平台。  
它要做的是供给侧共享运行时，也就是：

- 统一 provider 目录
- 统一认证与凭证归属边界
- 统一模型引用方式
- 统一请求/响应语义
- 统一 diagnostics 和错误模型
- 统一 service surface / SDK surface 的核心语义

更直白一点说：

> `Switchyard` 不是“另一辆完整汽车”。  
> 它是给很多 AI 产品都能装的“动力总成 + 供电系统 + 统一插口标准”。

### 3. 它不是 `openclaw-zero-token` 的换皮版

`openclaw-zero-token` 已经做了很多脏活，而且做得很强。  
这不是 `Switchyard` 没价值的证据，反而说明：

> `Switchyard` 不能再靠“再做一个差不多的更大平台”来成立。

`Switchyard` 必须比它更清楚地回答：

- 我们的第一用户是谁
- 我们的第一产品身份是什么
- 我们要把哪些能力从“大产品世界”里抽出来，重做成更纯的共享 runtime
- 我们的对外 contract 为什么更适合被 AI 产品接入

---

## [已确认] 目标用户

### 第一目标用户

- 做 AI 产品的开发者
- 想在自己产品里同时支持多种 AI 能力来源的开发者
- 想降低终端用户使用门槛，而不是把所有用户都逼去准备 API Key 的团队

### first-party sample

你的 3 个 repo 是最重要的 first-party sample：

- `campus-copilot`
- `CortexPilot`
- `multi-ai-sidepanel`

但在 `Switchyard` 的产品视角里，它们只是最先会接入的消费层，不是产品边界本身。

### 后续 consumer compat 对象

以下对象保留为后续 consumer compat 目标：

- `Codex`
- `Claude Code`
- `OpenClaw`

它们当前不是 V1 的核心施工面，而是 V2 以后更明确的消费层目标。

---

## [已确认] V1 要解决的核心问题

### 核心问题不是“多接几个 provider”

V1 真正要解决的是：

> **把用户已经拥有的、形态各异的 AI 使用资格，收编成一个统一的 provider runtime。**

这包括两大类输入 lane：

1. `BYOK`
2. `Web/Login`

这两条 lane 为什么都必须做：

- 只做 BYOK，会把没有 API Key 的真实用户挡在外面
- 只做 Web/Login，会让开发者侧的正规 API 接入不完整
- 两条都不做统一层，产品侧就会继续重复写 provider plumbing

### 为什么现在不做 Agent Input Lane

因为这条线虽然长期重要，但现在会显著拉高 V1 的复杂度：

- 供给侧语义会被混进 consumer-side runtime 语义
- `Codex` / `Claude Code` / `Gemini CLI` 的产品边界会污染 V1 核心
- 实现复杂度会从“共享 provider runtime”膨胀成“agent ecosystem 平台”

所以当前策略是：

> **V1 先把 `BYOK + Web/Login` 做成。**

---

## [已确认] V1 成功标准

### Kernel Alpha

- 共享 runtime 的术语、边界、lane 模型、provider contract 被锁死
- `BYOK` 主干可以工作
- 固定 5 家网页登录 provider 全部接通
- HTTP/service surface 有统一方向

### Kernel Beta

- `ChatGPT`
- `Gemini`
- `Claude`

这 3 家达到更高稳定性，同时：

- 单账户模型稳定
- 站内登录 / OAuth 路径稳定
- 会话续期、过期提示、基本诊断可用

### First-party Integration

在 `Switchyard` 核心进入 Beta 后，开始接入你的 3 个 repo，且首批接入方式为 service-first。

### Consumer Compat

在 first-party integration 稳定后，再进入：

1. `Codex`
2. `Claude Code`
3. `OpenClaw`

的 consumer compat 实施。

---

## [已确认] 产品性格

`Switchyard` 的 V1 不是黑盒中台，也不是偷偷帮用户做所有决定的代理层。

它的产品性格已经锁死为：

- 用户显式控制
- 系统透明诊断
- 平台不替用户偷偷切换身份边界

所以失败策略优先级是：

1. 明确报错
2. 让用户知道哪里坏了
3. 让用户自己选择下一步动作

当前不做：

- 自动换账号
- 自动切 provider
- 黑盒式 failover

---

## [当前默认] 技术路线

### 1. 产品独立，技术深借

当前默认路线不是 raw fork，也不是闭门从零重复造轮子。

而是：

> **Independent Product, Upstream-Informed Runtime**

翻成人话：

- 产品独立
- 上游深借
- 局部迁移 / 改写
- 对外契约必须由 `Switchyard` 自己定义

### 2. API substrate first, service-first frontdoor

`Switchyard` 当前要统一到一条更诚实的主语义：

- API substrate first
- service-first frontdoor
- SDK/client 仍然是正式消费面，但不再定义主 substrate

这句话翻成人话就是：

- 今天最该先锁死的“地基”是 runtime/service 这层公共 API substrate
- first-party sample 继续优先走隔离性更好的 service 接入
- SDK/client 仍然重要，但它要建立在同一层 substrate 上，而不是反过来压过 service/runtime

这也意味着：

- 对外产品形态仍然可以同时保留 service 与 SDK/client
- 但当前 truth freeze、frontdoor 叙事、M2 gate 与主要公开 contract，都要先围绕 service/runtime substrate 对齐

### 3. Local-first

当前默认是：

- 本地优先
- 未来可远端部署

这意味着 V1 的 auth、session、gateway、service surface 都优先按 local-first 设计。

---

## [非目标]

以下内容不是 `Switchyard V1` 的目标：

- 变成另一个 personal assistant 产品
- 变成 channel hub / operator shell / mobile companion 平台
- 做 raw fork 产品
- 做多账户网页登录池化
- 做平台共享凭证
- 做 `Agent Input Lane`
- 把 `Codex` 作为 V1 供给侧输入来源
- 把 `Claude Code` 作为 V1 供给侧输入来源
- 做 `Gemini CLI`
- 让 consumer compat 提前污染 provider runtime 主线

---

## [后续目标]

以下方向是明确保留的，但不属于当前首批交付：

- `Codex / Claude Code / OpenClaw` 的 consumer compat
- `Gemini CLI` 是否重回 roadmap
- `DeepSeek / HuggingFace / MiniMax` 等 provider 的更完整落位
- 更强的 service surface
- 更明确的 SDK client contract
- 更完整的 auth/accounts/credentials formal contract

---

## 结论

`Switchyard` 的存在理由已经足够明确：

> 它不是为了和强上游拼“做得更多”。  
> 它要赢的是：
>
> - 更纯的 provider/runtime 边界
> - 更适合被 AI 产品接入的 contract
> - 更清楚的产品身份
> - 更克制的 V1 范围

如果后续文档与本 brief 冲突，以 `AGENTS.md`、`docs/adr/`、`docs/contracts/`、`docs/blueprints/` 为准；本 brief 负责解释产品，不负责越级改写更高真理源。
