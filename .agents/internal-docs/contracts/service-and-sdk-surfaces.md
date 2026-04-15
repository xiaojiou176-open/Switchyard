# Switchyard Service and SDK Surfaces Contract

## 文档目的

这份文档的目标是防止 `Switchyard` 在实现期分裂成两种语言：

- 一套讲给 service 的语言
- 另一套讲给 SDK 的语言

如果两边各讲各的，后果会非常糟：

- 运行时概念会分裂
- diagnostics 会不一致
- first-party integration 会绕开 SDK 契约
- 后续 consumer compat 更难统一

所以这份文档要先锁死：

> **service surface 和 SDK surface 必须共享同一个 provider runtime 内核语义。**

---

## Surface Roles

### `service surface`

`service surface` 是 V1 中最早被真实消费的对外面：

- 你的 3 个 repo 首批通过它接入
- 它是 local-first service 的公开能力面
- 它承担 first-party integration 的第一入口

### `sdk surface`

`sdk surface` 是 `Switchyard` 的正式消费面之一：

- 它支撑“可被依赖、可被嵌入”的产品定位
- 它不是当前 substrate 定义者
- 但它必须和 service 共享同一个 runtime contract

---

## Shared Core Contract

### [已确认] 两个 surface 必须共用的核心语义

- provider registry
- model reference
- capability matrix
- credential ownership
- lane dispatch
- error taxonomy
- diagnostics semantics

这意味着：

- service 不能发明自己的一套 provider 语言
- SDK 不能发明自己的一套错误模型
- 两者的差异只能存在于“暴露形式”，不能存在于“运行时真理”

---

## `service surface` Contract

### [已确认] 它的角色

`service surface` 不是 control-plane UI，不是 consumer compat facade，不是 assistant 产品接口。  
它是：

> **围绕共享 provider runtime 暴露出来的统一服务消费面。**

### [已确认] V1 至少覆盖这些能力面

1. **runtime invocation**
2. **provider/model discovery**
3. **auth/session status**
4. **diagnostics/health**

### 1. runtime invocation

它至少要能表达：

- 目标 provider/model
- 所需 lane
- 当前请求意图
- 必要的能力要求

这里不要求现在就锁死 wire shape，但要锁死它服务的是 runtime，不是某个 consumer-side 产品外壳。

### [当前默认] 当前 service-first invoke 语义

当前默认的 service-first invoke 语义已经允许：

- 通过统一的 `runtime invocation` 入口携带 `lane`
- 在同一组 service/runtime 语义下区分：
  - `lane = web`
  - `lane = byok`

这意味着：

- `service surface` 不需要为 `BYOK` 再发明一套平行 runtime 语言
- `BYOK` 与 `Web/Login` 仍然共享同一套 runtime-first 服务入口逻辑
- first-party repo 后续做 `service-first` 接入时，可以优先依赖这个统一入口，而不是自己重写 provider transport 语义

### 2. provider/model discovery

service 侧需要有能力让调用方知道：

- 有哪些 provider
- 哪些 model 可选
- 哪些 provider 当前可用
- 哪些 lane 可走

### 3. auth/session status

service 侧需要能暴露：

- credential 是否存在
- session 是否过期
- 是否需要重新认证
- 当前 provider 是否处于 degraded 状态

### 4. diagnostics/health

service 侧需要能暴露：

- provider availability
- session health
- request failure classification
- user-facing diagnosis hints

---

## `sdk surface` Contract

### [已确认] 它的角色

`sdk surface` 不是 consumer compat 产品层，也不是简单的 service client wrapper。

它的角色是：

> **给 AI 产品开发者提供“直接依赖 `Switchyard` 能力”的正式入口。**

### [当前默认] 它至少要共享这些内核语义

- provider registry
- model reference
- capability matrix
- credential ownership contract
- diagnostics/error semantics

### [当前默认] SDK 也可以承载 service-first client

当前 `sdk surface` 不只可以暴露 direct client，也可以暴露一个围绕同一 runtime 语言构建的 `service client`。

这类 `service client` 的作用不是发明第三套语义，而是：

- 用 SDK 语言包装已经存在的 `service surface`
- 让 first-party integration 或后续 thin consumers 更容易消费统一 service entrypoint
- 保持 service / sdk 仍然围绕同一套 provider runtime contract 运转

### 它不应该做的事

- 重写一套 service 之外的新 runtime 语言
- 偷偷绕开 credential ownership contract
- 为了写起来爽，把 consumer compat 概念提前塞进去

---

## 两个 Surface 的关系

### [已确认] 关系不是二选一

`Switchyard` 不是：

- 只做 service
- 或只做 SDK

它长期要同时拥有两者。

### [当前默认] 首批消费顺序

- `Switchyard` 当前主 substrate：`API substrate first / service-first`
- SDK/client：`formal consumer surface on the same runtime`
- 你的 3 个 repo 的首批消费方式：`service-first`

这意味着：

- 产品定义上，不放弃 SDK
- 实施顺序上，优先打通 service

### 为什么这么做

因为：

- service/runtime substrate 更适合当前 frontdoor、验证脚本与 first-party integration 的隔离性
- SDK/client 仍然重要，但更适合建立在同一 substrate 之上的复用消费面

---

## Required vs Reserved for Later

### [V1 required]

以下属于 V1 必须明确的 public surface 概念：

- service 有 runtime invocation 概念
- service 有 provider/model discovery 概念
- service 有 auth/session status 概念
- service 有 diagnostics/health 概念
- SDK 和 service 共用同一 runtime 语义

### [reserved for later]

以下内容当前明确后置：

- `Codex` 的 consumer compat wire contract
- `Claude Code` 的 consumer compat wire contract
- `OpenClaw` 的 consumer compat wire contract
- agent-native input surface
- control-plane UI surface
- multi-tenant SaaS-style admin surface

---

## What This Document Explicitly Does Not Define

### [非目标]

这份文档不负责：

- 定义 HTTP path 名称
- 定义 JSON body schema
- 定义 TypeScript method 名称
- 定义 SDK 包导出清单
- 定义具体 transport 机制

这些属于后续更细的 API/schema 文档或实现层。

---

## [已确认]

- service 是 first-party integration 首批入口
- SDK 是长期第一身份之一
- 两者必须共用同一内核语义
- diagnostics 与 error taxonomy 不能分裂

---

## [当前默认]

- `surfaces/http` 先于 `surfaces/sdk-client` 进入 first-party real use
- SDK 初期可以更薄，但不能失去 contract authority
- service 和 SDK 都围绕 `provider-runtime-contract` 运转

---

## [后续目标]

后续可以继续细化：

- service 具体 wire contract
- SDK 具体 API 形态
- consumer compat surface 分层
- 更正式的 open-responses / provider-compatible exposure strategy

---

## Decision Summary

> `service surface` 和 `sdk surface` 都是 `Switchyard` 的正式公开消费面。
>
> **它们只能在暴露形式上不同，不能在运行时语义上不同。**
>
> 当前 truth freeze 先让 service/runtime API substrate 成为主前门；SDK/client 继续保留，但不再以 `SDK-first, service-second` 的说法覆盖当前主语义。
