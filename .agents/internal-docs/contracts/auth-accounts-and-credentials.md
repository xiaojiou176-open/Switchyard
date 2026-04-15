# Switchyard Auth, Accounts, and Credentials Contract

## 文档目的

这份文档把“终端用户自己的凭证”从口号变成正式契约。

它要回答的是：

- `Switchyard` 到底接受哪些认证来源
- 这些凭证归谁拥有、谁控制
- 凭证生命周期怎么表达
- 什么叫过期、失效、可恢复、需要用户动作
- `openclaw-zero-token` 的技术模式能借什么，哪些 trust model 不能继承

这份文档刻意不写：

- 存储路径
- JSON schema
- 加密实现
- 密钥管理产品选型

因为当前要锁的是语义边界，不是存储实现细节。

---

## Contract Scope

本 contract 只覆盖：

- auth modes
- credential ownership
- account binding
- session lifecycle
- 状态分类
- diagnostics 分类
- V1 明确不支持的 auth/account 行为

---

## 核心原则

### [已确认] Principle 1: 凭证永远归终端用户

`Switchyard` 不创造、拥有或代持公共 AI 使用资格。  
它只处理终端用户自己带来的：

- API key
- OAuth / browser login 会话
- provider 认证材料

### [已确认] Principle 2: 平台不做共享账号池

V1 不做：

- 平台级共享 provider 账号池
- 开发者共享凭证
- 公共 subscription 复用池

### [已确认] Principle 3: 用户显式控制优先

当 auth/session 出现问题时，系统要做的是：

- 明确报错
- 明确状态
- 提示用户需要什么动作

而不是：

- 偷偷切换到别的账号
- 偷偷轮转凭证
- 偷偷做隐式 failover

---

## 支持的 Auth Modes

### [已确认] `BYOK`

`BYOK` 指官方 API key 路径。

V1 里它承担：

- OpenAI
- Anthropic
- Gemini
- xAI / Grok
- OpenRouter
- Groq
- Qwen API
- Vertex AI
- Bedrock

其中：

- `Gemini API Key` 要真实打通
- 其他 provider 当前先要求代码支持，不强制全部做真实账号验证

### [已确认] `Web/Login`

`Web/Login` 指：

- 站内登录
- OAuth
- browser-session
- subscription/web credential

V1 固定目标 provider：

- `ChatGPT`
- `Gemini`
- `Claude`
- `Grok`
- `Qwen`

### [已确认] acquisition 与 reality proof 输入必须分层

`Web/Login` 在 V1 里有两层不同职责，不能混写：

1. **产品主路径**
   - 用户在 `Switchyard` 内登录 / OAuth
   - 或完成 browser-session acquisition
   - acquisition 结果进入本地 credential/session handoff

2. **Reality Gate proof 输入**
   - 当前 closeout / 验收脚本可能临时消费：
     - `SWITCHYARD_WEB_<PROVIDER>_COOKIE_BUNDLE`
     - `SWITCHYARD_WEB_<PROVIDER>_USER_AGENT`
   - 这只是当前 proof harness/fallback 输入
   - **不是最终用户主路径**

这条边界必须明确，否则后续实现很容易把：

- “现在为了验收临时喂 env”

误写成：

- “产品长期就应该让用户手填 cookie bundle / user-agent”

### [非目标] 当前不支持的 auth modes

当前不支持：

- Agent input credentials
- consumer-side tool account pooling
- 多租户平台账号体系
- 开发者集中托管的共享 provider 资格

---

## Credential Ownership Contract

### Credential Subject

每份 credential 都必须能回答：

- 它属于哪个终端用户
- 它服务哪个 provider
- 它走哪条 lane
- 当前状态是什么

### Ownership Rule

每份 credential 的最终控制权属于终端用户，而不是：

- `Switchyard`
- first-party sample repo
- 未来 control-plane
- 某个公共 operator

### Consequence

这意味着 V1 的所有 auth/account 设计，都必须默认站在下面这一边：

> **user-owned AI access**

而不是：

> **platform-owned shared access**

---

## Account Model

### [已确认] V1 Account Unit

V1 的最小账户单位是：

> **同一 provider 下的单一用户凭证集合**

在当前阶段，它表现为：

- 一个 API key
- 或一组属于同一终端用户的 Web/Login session materials

### [当前默认] 单 provider 单账户

V1 对每个 provider 当前默认单账户。

这意味着：

- 不做多账户池
- 不做同 provider account rotation
- 不做同 provider 账号优先级链

### 为什么这么收

不是因为多账户永远没价值，而是因为当前最重要的是先把：

- ownership
- session validity
- re-auth flow
- diagnostics

这些最核心的事情做稳。

---

## Credential Lifecycle

### 生命周期阶段

V1 至少要表达以下阶段：

1. **Acquire**
2. **Bind**
3. **Store**
4. **Check**
5. **Refresh / Renew**
6. **Expire / Degrade**
7. **Re-auth**
8. **Revoke / Remove**

### 1. Acquire

用户通过两种主路径之一带来 credential：

- `BYOK`: 提供官方 API key
- `Web/Login`: 在 `Switchyard` 内登录 / OAuth，或完成 browser-session 获取

### 2. Bind

获取到的 credential 必须绑定到：

- 终端用户
- provider
- lane

### 3. Store

V1 需要有本地持久化能力，但当前 contract 不冻结持久化实现方式。

这里只冻结原则：

- 存储必须能表达 ownership
- 存储必须能表达状态
- 存储必须能支持后续状态检查与续期

### 4. Check

系统必须能检查 credential 当前是否：

- 可用
- 缺失
- 过期
- 退化
- 需要重新认证

### 5. Refresh / Renew

如果 provider/session 支持 refresh 或 renew，系统可以执行“恢复当前凭证”的动作。

但这不等于：

- 自动切换到另一个账号
- 自动改用另一份 credential

### 6. Expire / Degrade

当 credential 不再满足运行要求时，系统必须能把它归类成明确状态，而不是静默失败。

### 7. Re-auth

当 session 无法恢复时，系统必须明确提示：

- 需要用户重新登录
- 需要用户重新授权
- 需要用户重新提供 key

### [当前默认] Browser Recovery Safety Boundary

当网页登录路径需要重新拉起或重开工作区时，必须遵守：

- 只能复用当前 repo-owned browser root / attach target
- 新浏览器实例启动必须走宿主机 launcher handoff
- 已在线浏览器如果只是要补开登录页或工作区页面，必须优先走 CDP `/json/new`
- 不允许通过 `detached` child handle、host kill helper、或桌面级脚本去做浏览器恢复

### 8. Revoke / Remove

用户必须能主动撤销或移除自己带来的 credential。

---

## Credential States

### [当前默认] V1 最小状态集

- `missing`
- `ready`
- `expiring`
- `expired`
- `refreshable-but-degraded`
- `provider-unavailable`
- `user-action-required`

### 状态解释

- `missing`: 没有可用 credential
- `ready`: 当前可正常使用，而且当前 store / 当前 attached browser / 当前 browser root 之间没有已知 coherence 冲突
- `expiring`: 即将失效，但尚未完全不可用
- `expired`: 已失效，不能继续执行
- `refreshable-but-degraded`: 理论上可恢复，但当前状态不稳定
- `provider-unavailable`: provider 上游不可用，不是用户凭证本身坏了
- `user-action-required`: 必须由用户亲自做下一步动作

---

## Auth / Credential Diagnostics Taxonomy

### [已确认] V1 必须至少能区分这些诊断类别

- `missing credential`
- `expired session`
- `refreshable but degraded`
- `provider unavailable`
- `user action required`
- `human verification required`
- `account action required`
- `permission gated`

### 这些分类的作用

它们不是“日志好看”，而是为了支撑 3 件事：

1. 用户知道哪里坏了
2. first-party sample 后续接入时能做清楚的错误提示
3. service 与 SDK surface 可以共享同一套 auth 语义

---

## Relationship to openclaw-zero-token

### [已确认] 可以借的

`Switchyard` 可以深借 `openclaw-zero-token` 的：

- auth/session/runtime 技术模式
- browser login / OAuth / gateway auth 实现思路
- credential state 检查思路

### [已确认] 不能直接继承的

不能直接继承它的公开默认 trust model：

- trusted operator public default
- personal assistant worldview
- one-user operator product外壳

### 为什么必须拆开写

因为 `Switchyard` 不是要复制 OpenClaw 的产品世界。  
它要做的是把可借的 auth/runtime 逻辑，收束到自己的共享 provider runtime 边界里。

---

## [已确认]

- 终端用户自己的凭证是唯一合法来源
- 支持 `BYOK` 与 `Web/Login`
- 当前单 provider 单账户
- 必须支持 session 续期、过期提示、基本诊断
- 不做共享账号池
- 不做自动换号和隐式 failover

---

## [当前默认]

- V1 auth portal 是 local-first
- credential state 是 runtime 核心语义的一部分
- diagnostics taxonomy 需要被 service 与 SDK 共同复用
- 具体持久化实现留到后续实现层决定

---

## [非目标]

这份文档不负责：

- 定义 storage path
- 定义加密方案
- 定义 JSON schema
- 定义 remote multi-user account model
- 定义 token rotation 的自动化实现细节

---

## [后续目标]

以下内容后续再展开：

- 更复杂的 multi-account 模型是否要引入
- 是否存在远端部署下的额外 ownership 边界
- provider-specific refresh contract
- 与 consumer compat 相关的 auth handoff 细节

---

## Decision Summary

> `Switchyard` 的 auth/accounts/credentials 合同，必须围绕 **终端用户自己的凭证** 组织。
>
> `BYOK` 和 `Web/Login` 都属于合法输入，但都必须被统一进同一套 ownership、state、diagnostics 语义里。
>
> 可以深借 `openclaw-zero-token` 的 auth/runtime 技术，但不能继承它的公开产品 trust model。
