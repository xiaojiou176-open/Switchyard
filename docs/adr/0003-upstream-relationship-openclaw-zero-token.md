# ADR 0003: Upstream Relationship with openclaw-zero-token

## Status

Accepted

## Date

2026-03-29

## Context

`openclaw-zero-token` 已经强到足以改变 `Switchyard` 的整个实现策略。

从本地参考仓和对话记录看，它已经具备：

- TypeScript / Node / pnpm workspace 主栈
- Gateway
- 多网页登录 provider
- 多种认证方式
- OpenResponses-compatible HTTP endpoint
- tool calling
- provider/model/auth runtime

这意味着它不是一个零散网页登录样本，而是一个完整的运行时平台。

真正的问题不再是“它值不值得参考”，而是：

> **既然它这么强，`Switchyard` 到底该怎样借它，又不把自己做成上游变体。**

---

## Workspace-local Upstream Root

当前工作区里，`openclaw-zero-token` 的本地研究根路径按占位写法记为：

`<local-reference-root>/openclaw-zero-token`

其中 `<local-reference-root>` 表示你在本机存放第三方参考仓的根目录；公开 ADR 不写个人绝对路径。

后续凡是讨论以下内容，都应默认优先回到这个本地路径，而不是先去看历史上那些更小、更旧的局部样本：

- Web/Login provider runtime
- browser-session / OAuth / session refresh
- gateway / OpenResponses-compatible HTTP surface
- browser client / web stream
- auth/session 状态模型

当前最值得优先读的本地入口包括：

- `README.md`
- `ARCHITECTURE.md`
- `docs/gateway/index.md`
- `docs/gateway/authentication.md`
- `docs/gateway/openresponses-http-api.md`
- `docs/zh-CN/providers/models.md`
- `SECURITY.md`
- `src/zero-token/providers/*-web-client-browser.ts`
- `src/zero-token/streams/*-web-stream.ts`

---

## Decision

### 决策总句

> **`openclaw-zero-token` 是 `Switchyard` 的技术母本，不是产品母本。**

这句话是本 ADR 的唯一核心结论。

它展开以后，意味着 4 条正式规则。

### 1. 不做公开 raw fork

`Switchyard` 不能把 `openclaw-zero-token` 直接换名、删文件、改门面后公开发布。

原因不是道德洁癖，而是产品叙事与项目归属：

- 公开 raw fork 会把第一眼 credit 给上游
- 会削弱 `Switchyard` 的产品辨识度
- 会弱化 Star 叙事和简历叙事
- 会让“为什么不直接用上游”变成难以回答的问题

### 2. 允许深度借技术逻辑

`Switchyard` 不应该为了“显得原创”而闭门重复造轮子。

允许深度借用的对象包括：

- Web/Login provider runtime
- auth/session/refresh 模式
- gateway / HTTP surface 思路
- provider routing 结构
- diagnostics 模式
- browser client / stream / DOM/CDP 交互路径

这里再强调一次：

> **在 Web/Login 这条 lane 上，默认优先深读 `openclaw-zero-token` 本地路径。**
>
> 不要先被 `ai-sdk-provider-chatgpt-oauth`、`deerflow-oauth-bridge`、`oc-chatgpt-multi-auth` 这类历史样本牵走主脑力预算。

### 3. 对外 contract 必须由 `Switchyard` 自己定义

即使实现深借上游，以下东西也必须由 `Switchyard` 自己写：

- 产品定位
- 对外 README 叙事
- SDK surface
- service surface
- provider runtime contract
- lane 模型
- consumer compat roadmap

### 4. 上游是技术母本，不是产品世界观母本

上游的很多产品包袱不能继承，否则 `Switchyard` 会失去自己的纯度。

---

## 借用边界

### [已确认] 可深借

以下内容允许深借，甚至允许重度迁移逻辑：

- Web/Login provider runtime
- OAuth / browser login / session 相关处理模式
- auth/session/refresh 模式
- gateway / HTTP surface 思路
- response-compatible service surface 思路
- provider catalog / auth profile / model reference 的高层结构

### [已确认] 可迁移但必须改写

以下内容允许 transplant，但不能原样继承：

- 局部运行时逻辑
- diagnostics 模型
- provider routing 结构
- 统一错误分类思路
- provider/model registry 的组织方式

原则是：

> **迁移的是逻辑与结构，不是上游的产品身份。**

### [已确认] 只能参考、不继承

以下内容最多作为背景参考，不能继承为 `Switchyard` 默认产品层：

- personal assistant worldview
- channels
- mobile companion
- consumer-facing product shell
- operator-first 外壳
- 上游 UI/product 包袱

### [已确认] 明确不继承

以下内容明确禁止继承：

- raw monorepo 产品身份
- 上游默认产品叙事
- 上游公开 roadmap
- 把 `openclaw-zero-token` 当作 `Switchyard` 的公开产品母本
- 把上游默认 trust model 直接当作 `Switchyard` 公开产品默认值

---

## 为什么不能假装没看见它

如果忽略 `openclaw-zero-token`，会直接带来两个坏处：

1. 在 Web/Login 这条最痛、最脏、最不稳定的 lane 上重复吃一遍别人已经吃过的苦
2. 为了保持“纯原创幻觉”，做出技术上低效、维护上更痛苦的实现路径

所以正确姿势不是：

- 完全 fork
- 完全无视

而是：

> **承认它很强，承认它是技术母本，但把 `Switchyard` 做成自己的产品。**

---

## 为什么这条路线更适合 Star / 简历 / 辨识度

### raw fork 的问题

raw fork 的最大问题不是“不能用”，而是：

- 产品辨识度弱
- 外部世界会自然把 credit 归给上游
- 项目叙事会变成“改造者”而不是“定义者”

### 独立产品 + 深借技术的优势

如果 `Switchyard` 采用独立产品路线，你以后可以诚实地说：

- 问题定义是我们的
- 产品边界是我们的
- contracts 是我们的
- 实现深受强上游启发，但不是 raw fork 变体

这比“完全从零重复造一切”更成熟，也比“公开 raw fork”更有作品归属感。

---

## [当前默认] 实施策略

### 公开层

- 新建 `Switchyard` 独立仓
- 独立 docs
- 独立 ADR
- 独立 package / export / surface 设计

### 内部研究层

允许：

- 本地镜像
- 私下研究 fork
- 对照实验分支

它们的用途是：

- diff
- 对照
- transplant 试验
- 功能 oracle

### 实现层

允许：

- 运行 `openclaw-zero-token`
- 观察其 Web/Login lane
- 精确定位可迁移层
- 把需要的层迁移/改写进 `Switchyard`

### 当前 live repo 的直接含义

按当前 `Switchyard` 工作树现实来看，项目已经开始沿着这条 ADR 落地：

- `live-proof`
- `reality:gate`
- `Gemini Web` 的 DOM transport
- `ChatGPT / Claude / Grok / Qwen` 的最小 real transport 路径
- `web-auth-acquisition`

这说明：

> **`Switchyard` 已经不只是“原则上要深借上游”，而是已经进入 selective transplant / selective imitation 的实现期。**

但这不意味着学习已经完成。  
尤其在 `Web/Login acquisition` 这一层，当前 repo 仍然只完成了高稳定 trio 的主路径，`Grok / Qwen` 仍未接入 in-app acquisition 主线。

---

## [非目标]

这份 ADR 不负责：

- 决定具体 transplant 文件列表
- 决定何时建立私下研究 fork
- 决定公开 acknowledgements 文案
- 决定 license 层面的最终声明

这些内容后续在采用矩阵、runbook、开源发布文档中展开。

---

## [后续目标]

后续需要继续明确：

- 哪些 `openclaw-zero-token` 层适合先作为 lab sidecar 对照
- 哪些层优先进入 transplant 清单
- 哪些 consumer-side 包袱要在 Day 1 就被排除
- 如何在 README 与 acknowledgements 中诚实表达上游影响，但不丢失产品独立性

当前更细的 adoption truth 已额外落盘到：

- `docs/blueprints/openclaw-zero-token-adoption-ledger.md`

---

## Consequences

### 正面影响

- `Switchyard` 获得强上游技术支撑，但不会失去独立产品身份
- Web/Login lane 不需要从零硬抗全部复杂度
- 对外叙事更强、更可信

### 代价

- 实现期需要做更多“抽离、去包袱化、重构”
- 不能简单地走最快路径
- 文档必须比普通项目更认真地区分“借实现”和“继承产品”

---

## Decision Summary

> **`openclaw-zero-token` 是 `Switchyard` 的技术母本，不是产品母本。**
>
> **产品独立，技术深借。**
>
> **不做公开 raw fork，但允许内部重度研究、迁移、改写。**
