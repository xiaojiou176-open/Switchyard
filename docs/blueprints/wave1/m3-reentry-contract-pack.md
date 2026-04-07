# Wave 1 M3 Re-entry Contract Pack

## Purpose

这份文件不是 `M3` 开工令。
它是未来重新进入 `M3 / First-party Integration` 时要带在身上的**施工许可证包**。

它要解决的问题很具体：

> 以后如果 `Switchyard` 自己的 gate 重新全绿，
> 三个 first-party repo 应该怎么分型、按什么前提进场、第一刀能写哪里、哪些今天仍然绝对不能碰。

---

## Governing Truth

当前主仓阶段前提仍然是：

- `M1 / Kernel Alpha` = `internal gate passed, not formally closed`
- `M2 / Kernel Beta` = `ready but not done`
- `M3 / First-party Integration` = `not started`
- `M4 / Consumer Compat` = `not started`

所以这份合同包的法律效力只有一层：

> **允许把 M3 的进场边界写清楚，不允许把 M3 本身写成已开始。**

---

## Re-entry Before Anything Else

未来任何人想重新进入 `M3`，先满足这组主仓门禁：

1. `pnpm run verify:service-live` = `0`
2. `pnpm run verify:web-login-live` = `0`
3. `pnpm run reality:gate` = `0`
4. `ChatGPT` 与 `Gemini` 的 managed-browser 会话已重新回到可复验的 authenticated workspace
5. 目标 repo 的 safe-write 面与 ownership 已 fresh 确认

### 一句话解释

这就像总包进场前先看地基验收单。
`Switchyard` 主仓这张单子没盖章，三套样板房一套都不能开始装修。

---

## Repo Typing

| Repo | Type | What it really means | Current write status |
| --- | --- | --- | --- |
| `campus-copilot` | `BFF bridge target` | durable landed 的只是 `apps/api` BFF bridge，不是整个 extension consumer contract | `conditional` |
| `CortexPilot` | `clean seam target` | 已知最干净的接缝在 orchestrator/provider-resolution 一侧 | `conditional` |
| `multi-ai-sidepanel` | `dirty target / read-only until cleaned` | Switchyard-related slice 主要仍在 dirty worktree，不是 durable main | `blocked` |

---

## Repo-by-Repo Contract

### `campus-copilot`

#### Re-entry prerequisite

必须同时满足：

1. `Switchyard` re-entry gate 全绿
2. `campus-copilot` 当前 safe-write 面仍然限在 `apps/api/` 及邻近测试/文档
3. extension 侧 dirty 改动没有被顺手打包进来
4. 当前负责该仓的人机 ownership 清楚，没有并发写同一片路径

#### First allowed write slice

第一刀只允许落在：

- `apps/api/`
- 与 `apps/api/` 紧邻的测试
- 与该 bridge slice 直接相关的最小文档

#### Why this is the first slice

因为它像给楼里先接总水管。
先接 `BFF bridge`，能把 `service-first` 主线拉进楼内，但不会把整栋 extension 一起装修。

#### Must not do

- 不把 dirty extension 改动顺手吞进来
- 不把 consumer contract 反向写成 `Switchyard` runtime contract
- 不因为“看起来顺手”就扩到整个 extension surface

### `CortexPilot`

#### Re-entry prerequisite

必须同时满足：

1. `Switchyard` re-entry gate 全绿
2. target branch / target seam 已重新确认
3. 当前 safe-write 面仍落在 orchestrator/provider-resolution 边界
4. 没有把 feature branch 上的其他实验 slice 一起混入

#### First allowed write slice

第一刀只允许落在这些已知 seam：

- `apps/orchestrator/src/cortexpilot_orch/config.py`
- `apps/orchestrator/src/cortexpilot_orch/runners/provider_resolution.py`
- `apps/orchestrator/src/cortexpilot_orch/services/operator_copilot.py`
- `apps/orchestrator/src/cortexpilot_orch/runners/agents_runner_execution_helpers.py`

#### Why this is the first slice

这是已知最像“标准接口箱”的一组位置。
先从这里进，能让 `Switchyard` 以 service-first 方式接入，而不是让 `CortexPilot` 反过来重写核心合同。

#### Must not do

- 不在 branch target 不清楚时直接开写
- 不把 repo 内其他 feature work 混成同一轮
- 不让 orchestrator 的局部需求反向定义 `Switchyard`

### `multi-ai-sidepanel`

#### Re-entry prerequisite

必须同时满足：

1. `Switchyard` re-entry gate 全绿
2. 当前 dirty slice 已先做出明确处理：
   - `landed`
   - `shelved`
   - `clean-branch redo`
3. active AI / MCP sidecar 实验已清场，ownership 明确
4. clean worktree 已恢复，或至少目标写面已成为独立 clean branch

#### First allowed write slice

当前**没有**第一刀允许写面。
在 `landed / shelved / clean-branch decision` 之前，它只能视为：

> `read-only target`

#### Why this is blocked

因为这不是“还没排到”，而是“施工现场上还堆着别人的材料”。
这时候强行进场，最容易把别人的实验切片误写成 durable truth。

#### Must not do

- 不在 dirty worktree 上直接叠新 slice
- 不把 MCP sidecar 试验当 durable landed truth
- 不让该仓来决定 `M3` 的整体节奏

---

## Re-entry Order

### Allowed first

如果 `Switchyard` 主仓 gate 全绿，且各仓 ownership 清楚，优先顺序是：

1. `campus-copilot`
2. `CortexPilot`

### Must wait

`multi-ai-sidepanel` 必须继续等待，直到：

- clean worktree
- clear ownership
- active AI / MCP experiments 清场
- landed / shelved / clean-branch redo decision

---

## Service-First Guardrails

以后任何 `M3` 重入都必须继续守这些护栏：

1. **只走 `service-first`。**
   - 不把接入重新拉回 `SDK-first` 深耦合。
2. **first-party repo 不是真理源。**
   - 它们是消费层，不是 runtime 宪法。
3. **先守 safe-write seam，再谈体验扩展。**
   - 先接总闸，再谈装修。
4. **每次重入前都要 fresh truth reset。**
   - 不用 archive 里的旧绿灯盖住今天事实。

---

## Explicit Non-Goals

这些东西现在都不允许偷渡进 `M3`：

- `MCP`
- `CLI`
- `plugin`
- `landing`
- `marketing`
- `SEO`
- `consumer compat`
- 任何其他 repo 的顺手改造

### Why this ban stays

因为 `M3` 的任务是“让 3 个 first-party repo 通过统一 service surface 接入”。
它不是“顺便把所有未来门面都搭起来”。

---

## Re-entry Checklist Envelope

未来整合者要重新进入 `M3` 时，至少先回答这 7 个问题：

1. `Switchyard` 三个 live/runtime gates 是否 fresh 全绿
2. `M2` 是否已经从 `ready but not done` 合法升格
3. 目标 repo 的 worktree 是否 clean 或写面是否独立 clean
4. 当前 repo ownership 是否明确
5. 第一刀写面是否只落在 safe seam
6. 本轮是否仍然 strictly service-first
7. 有没有把 `MCP / CLI / plugin / compat / marketing` 偷渡进 scope

---

## Decision Summary

这份 re-entry contract pack 的核心结论可以压成一句话：

> `M3` 现在还不能开工，但将来一旦地基验收通过，
> `campus-copilot` 和 `CortexPilot` 可以按 seam-first 进场，
> `multi-ai-sidepanel` 仍必须先清理施工现场。
