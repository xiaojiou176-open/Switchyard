# Switchyard V1 Delivery Plan

## 文档目的

这份 blueprint 不再讨论“应不应该做什么”，而是把已经拍板的 V1 边界拆成：

- 交付阶段
- 阶段入口
- 阶段出口
- 每阶段工作包
- 明确 stop rules

它是一份给实现者的排期合同，不是 roadmap 愿景墙。

---

## Delivery Principles

### [已确认] 原则 1：先做内核，再做接入，再做 compat

交付顺序固定为：

1. `Kernel Alpha`
2. `Kernel Beta`
3. `First-party Integration`
4. `Consumer Compat`

### [已确认] 原则 2：V1 施工面只围绕 `BYOK + Web/Login`

当前任何不直接服务这两条供给 lane 的东西，都不能抢占前两阶段的施工优先级。

### [已确认] 原则 3：复用方式必须分层

V1 的外部复用方式固定为：

- `Vercel AI SDK` = `pnpm` 直接依赖
- `LiteLLM` = `lab sidecar`
- `openclaw-zero-token` = `lab sidecar` first, then `selective transplant`

---

## Current Live Checkpoint

当前 live repo 已经不再处于 “只剩 docs、还没开始代码”的状态。

它已经完成了：

- monorepo scaffold
- `contracts / kernel / credentials / diagnostics`
- `BYOK` baseline
- `Web/Login` baseline
- `service / sdk-client`
- `live-proof` / `reality:gate`

同时也已经进入更靠近 closeout 的现实阶段：

- 5 家 `Web/Login` provider 都已进入 local-first acquisition 主线
- `ChatGPT / Gemini / Claude / Grok / Qwen` 都已有真实 live-proof 路径
- `Gemini BYOK` 已有真实 live verifier 与 remediation 路径
- `typecheck / test / build` 这轮 fresh rerun 全部通过

但这类 live checkpoint 必须拆成两层来看：

- **internal gate**
  - 回答 repo 内代码、测试、构建链是不是站得住
- **live gate**
  - 回答当前这台机器上的终端用户凭证、浏览器 cookie bundle、session capture、browser user agent 是否足够支撑 live proof

按当前 fresh reality，这个 workspace checkpoint 现在更诚实的描述是：

- `repo-side gate` 仍然是 green
- fresh `verify:service-live` 当前不该再写成 trio 全绿，而是停在 `Claude = account-action-required`
- 当前 outward wording 要同步到 `Claude / Grok` 这组 workspace external blockers
- detailed live snapshot 继续放在 `docs/public-proof-pack.md` 与 current task board，不再把 exact count 长期写死在 blueprint 主体里
- 这仍然是 credentialed workstation 的时间片真相，不是 repo 常量

因此，当前最诚实的阶段语义是：

> **`M1 / Kernel Alpha` 的 repo-side closeout 已经关门。**
>
> **`M2 / Kernel Beta` 的 repo-side substrate 也已经完成当前阶段 closeout。**
>
> **当前 program 的主战场不再是压 live blocker，而是把后续波次的 truthful wording、repo-by-repo closure、以及 honest outward ceiling 做成 durable truth。**

同时保留一个重要护栏：

> **这只是当前时间片上的 fresh checkpoint。**
>
> 它不意味着未来无需重跑 live gate，也不意味着 `M2 / M3 / M4` 已经自动完成。
>
> 如果未来 fresh rerun 再次收敛成更窄的 external blocker，可以再更新文档；但在今天这轮 fresh evidence 下，文档不能继续假装旧成绩单仍然是今天真相。

当前 `M3` 的进一步扩展条件也应该按这个 checkpoint 收紧：

- 保持 `pnpm run verify:service-live` / `verify:web-login-live` / `reality:gate` 在 credentialed workstation 上可复验
- frontdoor 当前统一用 `repo-side green + workspace external blockers` 说法，不再继续抄 exact blocker counts
- 这轮要同步的 current blocker pack = `Claude / Grok`
- 更细的 provider-by-provider live snapshot 继续看 `docs/public-proof-pack.md`
- 进入 M3 之前，先读 `docs/blueprints/m3-first-party-integration-readiness.md`

---

## Phase Plan

### M1 — Kernel Alpha

#### Goal

把 `Switchyard` 的供给侧共享 runtime 做成一个**最小但真实可运行**的内核。

#### Entry Criteria

- 第一波和第二波核心文档齐套
- `provider runtime contract`
- `auth/accounts/credentials contract`
- `service and sdk surfaces contract`
- `architecture skeleton ADR`

之间没有冲突

#### Work Packages

1. **contracts baseline**
   - provider/runtime 术语冻结
   - auth/accounts/credentials 术语冻结
   - service/sdk shared semantics 冻结

2. **kernel baseline**
   - provider registry 主结构
   - lane dispatch 主结构
   - model reference 主结构
   - capability matrix 主结构

3. **BYOK baseline**
   - `Gemini API Key` 真实打通路径
   - 其他 BYOK provider 的代码支持主干位置

4. **Web/Login baseline**
   - 5 家固定网页登录 provider 全部接通
   - 单账户模式成立
   - `ChatGPT / Gemini / Claude / Grok / Qwen` 都进入真实 E2E 范围

5. **surface baseline**
   - `surfaces/http` 有最小统一 service 消费面
   - `sdk` 与 `surfaces/sdk-client` 具备共享内核的最小形态

6. **diagnostics baseline**
   - provider/session/auth 失败至少能被分类和观察

#### Exit Criteria

- 5 家网页登录 provider 全部真实接通
- `Gemini API Key` 真实打通
- 其余 BYOK provider 至少有清晰代码支持落点
- service surface 已存在
- diagnostics 基础能力已存在
- 不再需要通过口头解释说明“Switchyard 核心现在是什么”

#### Stop Rules

- 不进入你的 3 个 repo 接入
- 不进入 `Codex / Claude Code / OpenClaw` compat
- 不引入 `Gemini CLI`
- 不引入多账户池化

---

### M2 — Kernel Beta

#### Goal

把内核从“可运行”推进到“可信 Beta”。

#### Entry Criteria

- `Kernel Alpha` 全部出口条件满足

#### Work Packages

1. **高稳定网页登录目标**
   - `ChatGPT`
   - `Gemini`
   - `Claude`

2. **session/auth 稳定化**
   - 续期路径稳定
   - 过期提示清晰
   - 用户动作要求明确

3. **service surface 稳定化**
   - first-party integration 可以真正开始依赖

4. **diagnostics 稳定化**
   - missing credential
   - expired session
   - refreshable but degraded
   - provider unavailable
   - user action required

这些分类在真实使用中可工作

#### Exit Criteria

- `ChatGPT / Gemini / Claude` 达到高稳定
- service surface 对 first-party sample 已可用
- auth/session/diagnostics 不再处于“概念成立但不可靠”的状态

#### Stop Rules

- 仍然不进入 `consumer compat`
- 仍然不把你的 3 个 repo 当作“今天就必须一起改”

---

### M3 — First-party Integration

#### Goal

开始让你的 3 个 repo 通过统一 service surface 接入 `Switchyard`。

#### Entry Criteria

- `Kernel Beta` 全部出口条件满足

#### Work Packages

1. **integration contract**
   - 3 个 repo 统一走 service-first
   - 不走 repo 内深耦合 SDK-first

2. **first-party sample rollout**
   - `campus-copilot`
   - `CortexPilot`
   - `multi-ai-sidepanel`

3. **用户级稳定目标**
   - 接入后故障能被明确报错
   - provider/auth/session 状态可诊断
   - 不把 first-party repo 反向变成 runtime 核心契约定义者

#### Exit Criteria

- 你的 3 个 repo 均完成 service-first 接入
- first-party 路径达到用户级稳定
- first-party integration 不再要求修改 `Switchyard` 的核心身份

#### Stop Rules

- 不提前把 `consumer compat` 混进 M3
- 不把某个 repo 的私有产品逻辑抽回 `Switchyard` 核心

---

### M4 — Consumer Compat

#### Goal

开始做后置的 consumer-native compat。

#### 顺序

1. `Codex`
2. `Claude Code`
3. `OpenClaw`

#### Entry Criteria

- M3 全部出口条件满足

#### Work Packages

1. `Codex` compat
2. `Claude Code` compat
3. `OpenClaw` compat

每一项都应围绕：

- 作为上游能力层接入
- 基础 compat contract
- 更友好的 adapter/bridge 是否需要

#### Exit Criteria

- consumer compat 有真实 contract，而不是只停在 README 愿景

#### Stop Rules

- `Gemini CLI` 不进入当前波次
- 不把 consumer compat 倒逼回 V1 核心定义

---

## Adoption Forms in Delivery Terms

### [已确认] `Vercel AI SDK`

- 形式：`pnpm` 直接依赖
- 作用：SDK/contracts/byok abstraction 骨架
- 进入阶段：M1 即进入主施工面

### [已确认] `LiteLLM`

- 形式：`lab sidecar`
- 作用：BYOK gateway / routing / proxy study target
- 进入阶段：M1 即作为对照运行时进入

### [已确认] `openclaw-zero-token`

- 形式：`lab sidecar` first, then `selective transplant`
- 作用：Web/Login 技术母本
- 进入阶段：M1 即进入，但以对照运行时和迁移来源身份出现，不作为公开产品母本

### [已确认] `ChatALL`

- 形式：`reference only`
- 作用：能力矩阵 / 产品样板参考
- 进入阶段：仅作为边缘参考，不进入主施工链

---

## Phase-Level Acceptance Rules

### 文档一致性要求

所有实现阶段都必须继续服从以下已确认事实：

- V1 只做 `BYOK + Web/Login`
- 固定 5 家网页登录 provider
- 3 家高稳定目标为 `ChatGPT / Gemini / Claude`
- 凭证永远归终端用户
- `consumer compat` 后置
- `openclaw-zero-token` 是技术母本，不是产品母本

### 失败策略要求

任何阶段都不能把下列行为当作“为了先跑起来”的默认策略：

- 自动换账号
- 自动切 provider
- 黑盒吞错
- 共享账号池

---

## [已确认]

- M1-M4 的顺序已经固定
- first-party integration 在 Kernel Beta 后开始
- consumer compat 在 3 个 repo 稳定接入之后开始
- `Gemini CLI` 不进入当前波次

---

## [当前默认]

- 3 个 repo 的具体接入先后顺序可以在 task board 再按实时准备度细化
- 但“全部 service-first，且在 M3 完成后再进入 M4”这一点已经锁死

---

## [非目标]

这份 blueprint 不负责：

- 具体任务分配到文件级
- 具体 commit 批次
- 具体测试命令
- 具体 CI 设计

这些内容属于后续 task board 和执行期文档。

---

## [后续目标]

后续可以进一步拆：

- M1 内部波次
- M2 内部稳定性门槛
- M3 repo-by-repo integration board
- M4 compat-by-consumer 子计划

---

## Decision Summary

> `Switchyard V1` 的交付不是“一把做完”，而是按：
>
> - `Kernel Alpha`
> - `Kernel Beta`
> - `First-party Integration`
> - `Consumer Compat`
>
> 四阶段推进。
>
> 任何试图跳过阶段边界、把后置内容偷渡进前两阶段的实现，都视为偏离合同。
