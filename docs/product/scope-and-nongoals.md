# Switchyard V1 Scope and Non-Goals

## 文档目的

这份文档只做一件事：

> **把 V1 的边界钉死，防止项目在“看起来都很重要”的东西里膨胀。**

它不是实现计划，不是 runbook，也不是 contracts 细节。  
它的作用是告诉任何后续 Agent：

- V1 做什么
- V1 不做什么
- 哪些只是后续路线图
- 哪些东西即使很诱人，也不能提前偷渡进来

---

## [已确认] V1 in-scope

### 1. V1 只做两条供给 lane

`Switchyard V1` 只做：

1. `BYOK`
2. `Web/Login`

这两条是 V1 的唯一供给侧主线。

### 2. 固定网页登录 provider 清单

V1 固定清单如下：

1. `ChatGPT`
2. `Gemini`
3. `Claude`
4. `Grok`
5. `Qwen`

这 5 家是固定承诺，不是开放式愿望列表。

### 3. Web/Login lane 的完成深度

每个网页登录 provider 在 V1 必须满足：

- 单账户
- 用户在 `Switchyard` 内登录 / OAuth
- 会话续期
- 过期提示
- 基本诊断
- 真实 E2E 接通

这里特别强调：

> **不接受“只做结构支持”冒充完成。**

### 4. 高稳定目标

以下 3 家必须作为 V1 的高稳定目标：

- `ChatGPT`
- `Gemini`
- `Claude`

其余 2 家必须真实接通，但稳定性目标可以低一档。

### 5. BYOK lane 范围

#### 必须真实打通

- `Gemini API Key`

#### V1 必须有代码支持

- `OpenAI`
- `Anthropic`
- `Grok / xAI`
- `OpenRouter`
- `Groq`
- `Qwen API`
- `Vertex AI`
- `Bedrock`

这里的“代码支持”意思是：

- provider 入口存在
- model/provider 引用规则有位置
- 语义层可被 contract 容纳

不等于所有 provider 都要在 V1 做完整真实账号验证。

### 6. 凭证边界

V1 必须坚持：

> **永远只接受终端用户自己的凭证。**

这意味着：

- 不做共享账号池
- 不做开发者公共凭证
- 不做平台代持型“公共 AI 资格”

### 7. 运行形态

V1 形态明确为：

- `API substrate first`
- `service-first`
- `local-first`
- 未来可远端部署

同时，SDK/client 仍然保留为正式消费面，但它的角色是：

- 建立在同一 runtime substrate 之上的 consumer surface
- 不能再把 `SDK-first, service-second` 写成当前主语义

而你自己的 3 个 repo 在后续接入阶段继续优先走：

- `service-first`

---

## [已确认] V1 non-goals

以下内容明确不属于 V1：

### 1. 不做 `Agent Input Lane`

当前明确不做：

- `Codex` 作为供给侧输入来源
- `Claude Code` 作为供给侧输入来源
- `Gemini CLI`

### 2. 不做网页登录多账户池化

当前明确不做：

- 同一 provider 多账户池
- 自动轮转
- 自动换号
- 隐式 failover

### 3. 不做 raw fork 产品

V1 不允许把任何上游仓直接换名、删文件、改门面后公开发布成 `Switchyard`。

### 4. 不做 control-plane 主线

V1 不是：

- admin dashboard 产品
- operator shell 产品
- 多用户 SaaS 账号系统
- 渠道整合产品

### 5. 不做 consumer compat 实装主线

以下对象当前不是 V1 核心施工面：

- `Codex`
- `Claude Code`
- `OpenClaw`

它们保留为后续 consumer compat 目标，但现在不进入主施工面。

### 6. 不做“把所有未来 provider 都先做一遍”

当前不把这些列入 V1 必做：

- `DeepSeek`
- `HuggingFace`
- `MiniMax`

这些方向要为未来预留空间，但不进入本波交付承诺。

---

## [当前默认] V1 阶段化完成信号

### `Kernel Alpha`

达到以下条件即可视为 `Kernel Alpha`：

- provider runtime 核心边界被锁死
- `BYOK + Web/Login` 两条 lane 都有最小可运行主干
- 固定 5 家网页登录 provider 全部接通
- 基础 service surface 已存在

### `Kernel Beta`

达到以下条件即可视为 `Kernel Beta`：

- `ChatGPT / Gemini / Claude` 达到高稳定
- auth/session 流程稳定
- diagnostics 基础模型稳定
- service surface 对 first-party sample 已经可用

### `First-party Integration`

在 `Kernel Beta` 之后，进入你的 3 个 repo 的 service 接入阶段。

### `Consumer Compat`

在 first-party integration 通过后，再开始：

1. `Codex`
2. `Claude Code`
3. `OpenClaw`

的 consumer compat 实施。

---

## [当前默认] 风险处理哲学

V1 的默认哲学是：

- 用户显式控制
- 系统透明报错
- 平台不替用户偷偷做身份决策

所以遇到 provider / session / auth 故障时，优先级是：

1. 明确报错
2. 明确诊断
3. 把选择权交给用户

而不是：

- 平台暗箱切换
- 平台自动换号
- 平台自动兜底一切

---

## [后续目标]

这些东西不是不做，而是明确后置：

- `consumer compat` 正式实施
- `Agent Input Lane`
- 更复杂的 account/session 策略
- 更强的 control-plane
- 未来 provider 扩容
- 更复杂的 remote deployment story

---

## Scope Guardrails

为了防止范围偷渡，后续实现与后续文档应遵守以下 guardrails：

1. 任何新增功能如果不同时服务 `BYOK` 或 `Web/Login` 主线，应默认视为超出 V1。
2. 任何会把 `Switchyard` 拉向 assistant 产品、channel hub、mobile companion 的改动，默认视为超出 V1。
3. 任何把 `consumer compat` 提前到内核施工前面的提议，默认拒绝。
4. 任何把平台共享凭证、共享账号池引入 V1 的提议，默认拒绝。

---

## 结论

`Switchyard V1` 的范围已经足够清楚：

> **只做 `BYOK + Web/Login` 的共享 provider runtime。**

这句话看起来像是在“砍梦想”，其实不是。  
它是在保护项目不被漂亮但过早的路线拖死。
