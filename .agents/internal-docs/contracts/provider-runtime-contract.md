# Switchyard Provider Runtime Contract

## 文档目的

这份 contract 不是 TypeScript 类型定义，也不是 API schema 文档。  
它的作用是冻结 `Switchyard` 后续实现必须遵守的“母语”与“不变量”。

也就是说，这份文档回答的是：

- `Switchyard` 运行时到底在管理什么
- provider、lane、consumer、surface 之间是什么关系
- 什么算 credential ownership
- model reference 应该怎么理解
- diagnostics 和 error taxonomy 应该处于哪一层

这份文档刻意**不**冻结：

- 过细的 wire shape
- 过细的 TypeScript interface
- 过细的 HTTP body schema

因为当前阶段更重要的是先把语义锁死，而不是把实现绑死。

---

## Contract Scope

本 contract 只覆盖 V1 核心 runtime 语义：

- provider registry
- lane dispatch
- credential ownership
- model reference
- capability matrix
- request/response 概念形状
- diagnostics 和错误边界
- API substrate 与 SDK/client surface 的共享内核

本 contract 不覆盖：

- consumer compat 细节
- control-plane 细节
- UI 细节
- 多账户池化策略

---

## 核心术语

### Provider

provider 是能力来源的命名实体，例如：

- `openai`
- `anthropic`
- `gemini`
- `qwen`
- `grok`
- `openrouter`
- `bedrock`

provider 不是 consumer，也不是 lane。

### Lane

lane 是供给侧能力路径。

V1 只承认两条：

1. `BYOK`
2. `Web/Login`

### Consumer

consumer 是消费 `Switchyard` 能力的外部产品或工具，例如：

- 你的 3 个 repo
- `Codex`
- `Claude Code`
- `OpenClaw`

consumer 不定义 provider runtime 主语义。

### Surface

surface 是 `Switchyard` 对外暴露的消费面。

当前至少保留两类：

- `service / HTTP`
- `SDK`

### Credential ownership

credential ownership 指：凭证到底归谁控制、谁承担风险、谁做最终选择。

`Switchyard V1` 的核心原则是：

> **凭证永远归终端用户。**

### Model reference

model reference 是运行时中对模型的规范化指向方式。  
当前默认采用：

> `provider/model`

作为规范化思路。

---

## [已确认] 核心不变量

### 1. 凭证所有权不变量

- `Switchyard` 不拥有公共 AI 资格
- `Switchyard` 不代持平台级共享账号
- `Switchyard` 只处理终端用户自己带来的 API Key、OAuth、session、Web/Login 凭证

### 2. Lane 不变量

- `BYOK` 与 `Web/Login` 必须被当作两条独立供给 lane
- 不允许把两条 lane 抹平成同一种内部语义来源
- 不允许把 consumer-side runtime 语义偷渡进 lane 定义

### 3. Runtime 核心不变量

不管通过 SDK 还是 service 暴露，内核都必须统一处理：

- provider registry
- model resolution
- capability evaluation
- request dispatch
- error normalization
- diagnostics emission

### 4. Consumer 不变量

- consumer 可以复用相同 runtime
- consumer 不能反过来定义 runtime 核心 contract
- V1 的 consumer compat 不是核心 contract 的真理源

### 5. Error 不变量

- 失败必须是显式的
- 诊断必须是可观察的
- 平台不允许把 provider/auth/session 故障静默吃掉

---

## Provider Registry 概念

provider registry 是 `Switchyard` 的运行时目录，不是 UI 列表，也不是 README 展示页。

它至少需要表达这些概念：

- provider id
- provider 所属 lane
- 支持的 auth modes
- 默认 model / 推荐 model
- model catalog 或 catalog 来源
- capability descriptors
- diagnostics hooks
- 当前可用性状态来源

### [当前默认]

provider registry 在 V1 是运行时核心的一部分，不能把它外包给某个 consumer-side 产品定义。

---

## Credential Ownership Contract

`Switchyard` 对凭证的处理必须满足以下原则：

### [已确认]

- 终端用户凭证是唯一合法来源
- 平台不构建共享 credential pool
- 同一 provider 当前默认单账户
- V1 必须支持：
  - 站内登录 / OAuth
  - API key
  - session 续期
  - 过期提示
  - 基本诊断

### [当前默认]

credential handling 需要统一抽象：

- auth mode
- credential state
- session validity
- refresh eligibility
- user action required

### [非目标]

当前不在这份 contract 里展开：

- 多账户 rotation
- 自动 failover
- 隐式换号
- 共享池策略

这些属于后续 `auth-accounts-and-credentials` 文档。

---

## Lane Dispatch Contract

lane dispatch 回答的是：

> 一个规范化请求进入 runtime 后，应该沿哪条供给路径走。

### [已确认]

- lane dispatch 必须先决定是 `BYOK` 还是 `Web/Login`
- 不允许先按 consumer 类型分流，再倒推 lane
- lane dispatch 的依据必须是 runtime 内部语义，而不是产品外壳名称

### [当前默认]

dispatch 至少受这些概念影响：

- requested provider
- requested model reference
- credential availability
- lane compatibility
- capability requirement

---

## Model Reference Contract

### [已确认]

模型引用必须是 runtime 可解释的、跨 provider 的规范化指针，而不是 consumer-side 的随意字符串。

### [当前默认]

当前默认采用：

> `provider/model`

这类结构作为规范化概念模型。

### 它的作用

- 统一 provider resolution
- 统一 model lookup
- 统一 capability mapping
- 统一 diagnostics 输出

### [后续目标]

更细的 alias、fallback、catalog discovery 规则后续再写，不在本波锁死。

---

## Capability Matrix 概念

capability matrix 不是 marketing 表，也不是 README 对比图。  
它是 runtime 对能力边界的机器可解释表达。

### 它至少需要回答

- 是否支持 text generation
- 是否支持 streaming
- 是否支持 tool calling
- 是否支持 image/file input
- 是否支持 Web/Login path
- 是否支持官方 API path

### [已确认]

capability matrix 属于 runtime contract 的一部分，不属于 consumer 自己各写各的逻辑。

---

## Request Concept

一个进入 `Switchyard` 的请求，概念上至少包含以下层：

- 目标能力意图
- provider/model 指向
- lane 约束
- credential context
- tool / stream / media 等能力要求
- diagnostics context

### [已确认]

无论最终是 service 调用还是 SDK 调用，进入内核后的请求语义必须收敛到同一套 runtime 概念。

### [非目标]

当前不冻结：

- 具体 JSON 字段名
- 具体 TypeScript 参数名
- 具体 HTTP request body 结构

---

## Response Concept

响应概念上至少需要包含：

- 成功输出
- provider/model 实际执行信息
- capability-related metadata
- diagnostics/context hints
- 可归类的错误信息

### [已确认]

响应不应该只把“成功文本”吐给上层。  
它还必须能支撑 diagnostics 和明确报错策略。

---

## Error Taxonomy 概念

V1 错误模型至少要能区分这些类别：

- auth / credential error
- session expired / session invalid
- provider upstream unavailable
- provider capability mismatch
- model resolution error
- routing / configuration error
- user action required

### [已确认]

`Switchyard` 的错误模型服务于一个核心原则：

> **明确报错，让用户知道哪里坏了。**

### [当前默认]

错误模型应优先表达：

- 错误属于哪一层
- 用户是否可自行修复
- 是否需要重新登录 / 更新凭证
- 是否是 provider 侧不可用

---

## Diagnostics Contract

diagnostics 不是“以后有空再补”的 nice-to-have。  
在 `Switchyard V1` 里，它已经是核心 contract 的一部分。

### diagnostics 至少要服务于

- provider status
- credential/session status
- request failure classification
- user-facing hints
- operator/developer 可观察性

### [已确认]

diagnostics 属于 runtime 核心，不应被 consumer 各自重写。

---

## API substrate 与 SDK/client surface 的共同内核

### [已确认]

`Switchyard` 当前先锁死的主语义是：

- API substrate first
- service/runtime surface 是当前最先被验证、最先被公开承诺的 substrate

同时，SDK/client 仍然是正式消费面：

- 它共享同一内核
- 它可以继续承载 BYOK client、service client、web helper
- 但它不再定义当前 truth freeze 的主前门

这两者共享同一个运行时内核，不允许出现：

- SDK 一套语义
- service 另一套语义

### 共同内核至少共享

- provider registry
- lane dispatch
- credential ownership contract
- model reference resolution
- capability matrix
- error taxonomy
- diagnostics semantics

---

## [V1 required]

以下概念在 V1 必须存在并被实现：

- `BYOK` lane
- `Web/Login` lane
- provider registry 基础结构
- credential ownership 原则
- model reference 基础规范
- capability matrix 基础概念
- diagnostics 基础输出
- 明确错误分类

---

## [Reserved for later]

以下内容当前保留，但不在第一波 contract 里冻结细节：

- multi-account pooling
- implicit failover
- advanced routing policy
- consumer compat wire contract
- agent input semantics
- more advanced remote deployment auth models

---

## Decision Summary

> `Switchyard` 的 provider runtime contract 必须先锁语义，再锁实现。
>
> 当前阶段冻结的是：
>
> - provider/lane/consumer/surface 的关系
> - credential ownership
> - model reference
> - capability matrix
> - request/response 概念边界
> - diagnostics 与 error taxonomy
>
> 当前阶段**不**冻结过细的 TypeScript 接口和 wire schema。
