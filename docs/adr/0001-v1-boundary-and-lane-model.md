# ADR 0001: V1 Boundary and Lane Model

## Status

Accepted

## Date

2026-03-29

## Context

`Switchyard` 的早期讨论很容易把 3 类不同的东西混在一起：

- provider
- lane
- consumer

一旦这 3 类维度不拆开，后续就会出现典型混乱：

- 把 `Codex` 当 provider
- 把网页登录 provider 当成 consumer
- 把 consumer compat 提前写进 provider runtime 核心
- 把未来 `Agent Input Lane` 和当前 V1 施工面混成一锅

与此同时，对话记录已经把另外一个重要事实说清楚了：

> `Switchyard` 长期可以是 `Hybrid`，  
> 但 **V1 实际必须聚焦 `Provider Runtime`**。

所以这份 ADR 的目标不是发明新概念，而是：

> **把 V1 的边界和维度正式拍板，防止后续文档和实现越写越糊。**

---

## Decision

### 1. 长期身份与 V1 身份分开

#### 长期身份

`Switchyard` 长期是 `Hybrid`：

- `Provider Runtime`
- `Agent Runtime`

都可能进入长期产品身份。

#### V1 身份

`Switchyard V1` 的实际第一身份是：

> **面向 AI 产品的共享 Provider Runtime**

也就是说，V1 只以 provider runtime 为主施工面，不以 agent runtime 为主施工面。

### 2. V1 供给侧只有两条 lane

V1 只承认两条供给 lane：

1. `BYOK`
2. `Web/Login`

任何其他 lane，包括 `Agent Input Lane`，都不属于 V1 当前交付范围。

### 3. `consumer` 是独立维度

V1 明确把以下对象放入 `consumer` 维度，而不是放入 provider 或 lane：

- 你的 3 个 repo
- `Codex`
- `Claude Code`
- `OpenClaw`
- 未来可能出现的其他消费层产品

这意味着：

> consumer 是“谁来消费 Switchyard”的问题，  
> 不是“Switchyard 用什么方式供给能力”的问题。

### 4. `provider` 是独立维度

provider 维度回答的是：

- OpenAI
- Anthropic
- Gemini
- Qwen
- Grok
- OpenRouter
- Bedrock
- 以及未来 DeepSeek / HuggingFace / MiniMax

这些对象属于 provider universe，不等于 consumer，也不等于 lane。

### 5. `surface` 是独立维度

对外 surface 也必须从 lane/provider/consumer 中拆出来。

当前至少保留两类 surface：

- `service / HTTP surface`
- `SDK surface`

这样做的原因是：

- 相同 provider runtime 可以通过多个 surface 暴露
- 同一个 consumer 也可能通过不同 surface 接入
- surface 不能反过来定义核心 runtime

### 6. `consumer compat` 后置

consumer compat 明确保留，但 V1 后置，顺序固定为：

1. `Switchyard` 自己的 kernel 完成
2. 你的 3 个 repo 接入
3. `Codex / Claude Code / OpenClaw` 的 consumer compat

### 7. `Codex` 当前不是输入来源

`Codex` 的当前定位是：

- 保留为后续 consumer compat 目标
- 当前不是 V1 供给侧输入来源

这条规则同时适用于：

- `Claude Code`
- `Gemini CLI`

其中 `Gemini CLI` 当前甚至不在 V1 主线里。

---

## [已确认]

- `Switchyard` 长期可以是 `Hybrid`
- V1 实际聚焦 `Provider Runtime`
- V1 只做 `BYOK + Web/Login`
- `consumer` 是独立维度
- `provider` 是独立维度
- `surface` 是独立维度
- `consumer compat` 后置
- `Codex` 当前不是输入来源

---

## [当前默认]

### 强分层 monorepo 原则

当前默认采用以下结构原则：

- `lanes/`
- `providers/`
- `consumers/`
- `surfaces/`

这份 ADR 只冻结“原则”，不冻结具体目录树。

### 为什么默认采用强分层

因为未来一定还会新增：

- 新 lane
- 新 provider
- 新 consumer
- 新 surface

如果不在 Day 1 把这 4 个维度分开，后面任何新增都会把边界重新搅混。

---

## [非目标]

这份 ADR 不负责：

- 冻结完整目录清单
- 冻结 wire schema
- 冻结 TypeScript 接口命名
- 冻结 consumer compat 的具体协议
- 决定每个 provider 的内部实现方式

---

## [后续目标]

以下内容在后续 ADR 中展开：

- 强分层 monorepo 的正式目录结构
- service surface 与 SDK surface 的更细 contract
- consumer compat 的分阶段 contract
- auth/accounts/credentials 的专门契约

---

## Consequences

### 正面影响

- 后续实现不会再把 consumer-side 产品接口误当成 provider runtime 核心
- 未来扩容时，不需要重做整套命名空间
- V1 范围更容易守住

### 代价

- 早期文档会显得更克制
- 一些“看起来很想做”的功能必须明确后置
- consumer compat 的期待必须被主动降温

---

## Decision Summary

> **`Switchyard V1` 是一个聚焦于 `BYOK + Web/Login` 的共享 Provider Runtime。**
>
> **lane、provider、consumer、surface 四个维度必须拆开。**
>
> **consumer compat 保留，但后置。**
