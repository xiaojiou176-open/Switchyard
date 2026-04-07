# Wave 1 Shared Doc Sync Plan

## Purpose

这份文件不是 patch 本身。
它是 future shared sync 的**补丁施工单**。

它回答的是：

> 以后如果要把这轮 isolated contract pack 吸收回共享真理源，
> 该改哪些文件、改哪类句子、依赖哪条 fresh truth、哪些今天绝对不能提前动。

---

## Hard Rule

本文件只做 patch planning，不做 patch execution。

当前明确**不改**：

- `README.md`
- `.agents/Tasks/TASK_BOARD-2026-03-29-switchyard-bootstrap.md`
- `docs/blueprints/m2-kernel-beta-verdict.md`
- `docs/blueprints/m3-first-party-integration-readiness.md`
- `docs/blueprints/v1-delivery-plan.md`
- `docs/public-surface-support-matrix.md`

原因不是这些文件不重要。
恰恰相反，正因为它们是共享楼层的承重墙，这轮才只能先画施工图，不直接拿锤子。

---

## Patch Plan Table

| Shared file | Proposed patch scope | Dependency truth | Earliest safe timing | Why not now |
| --- | --- | --- | --- | --- |
| `README.md` | 同步 phase wording、live reality 段落、`M2 ready but not done` 与 `M3 not started` 的更硬上限 | Wave1A fresh rerun for `verify:service-live` / `verify:web-login-live` / `reality:gate` | after Wave1A final rerun verdict is locked | README 是公开前门，不能在并发期抢先升格或缩写 blocker |
| `.agents/Tasks/TASK_BOARD-2026-03-29-switchyard-bootstrap.md` | 更新 truth-freeze rerun appendices、phase ledger wording、M3 re-entry guardrails | Wave1A final rerun + L1 integrator confirmation | after shared integration pass | Task Board 是 live whiteboard，直接改会和前线 rerun 互踩 |
| `docs/blueprints/m2-kernel-beta-verdict.md` | 更新 Fresh Evidence、Why It Is Not Done、Remaining Gaps、Decision Summary | Wave1A final rerun on trio + service/runtime gates | only after verdict can be restated with fresh evidence | 当前 isolated pack 只能准备证据结构，不能抢先宣判 |
| `docs/blueprints/m3-first-party-integration-readiness.md` | 更新 Current Stage Truth、Re-entry Gate、Repo Typing wording | final M2 verdict + any fresh cross-repo audit | after M2 verdict is re-locked | 否则会把 readiness package 误写成 started |
| `docs/blueprints/v1-delivery-plan.md` | 更新 Current Live Checkpoint、Phase Plan 的当前 checkpoint wording | Wave1A final rerun + updated M2/M3 shared verdict | after shared truth sources agree | delivery plan 是阶段蓝图，不能在并发时单边改口 |
| `docs/public-surface-support-matrix.md` | 默认先 `keep`; 只有当 shared verdict 改变 public claim ceiling 时才微调 truthful meaning | only if Wave1A rerun changes public surface claim ceiling | later, and only if claim ceiling truly changes | 当前 `HTTP/API supported now` 与 `SDK partial` 仍然诚实，不应为了同步而乱改 |

---

## File-by-File Patch Notes

### `README.md`

#### Target sections

- `当前 live reality`
- `当前交付阶段`
- `Public Surface Status`

#### Planned patch shape

- 保留 `service/runtime API substrate first`
- 保留 `SDK/client = partial`
- 把阶段性 wording 锁成：
  - `M1`: internal gate passed, not formally closed
  - `M2`: ready but not done
  - `M3`: not started
  - `M4`: not started

#### Must wait for

- Wave1A fresh rerun 是否把 `ChatGPT + Gemini` blocker 压平
- `verify:service-live` 是否 finally `0`

#### Must not write early

- `M2 done`
- `M3 ready now`
- `ALL LIVE GATES GREEN`

### `Task Board`

#### Target sections

- `2026-04-01 truth freeze rerun`
- `2026-04-02 durable closeout rerun`
- `当前阶段判定`
- `当前 M3 重入护栏`

#### Planned patch shape

- 如果 Wave1A rerun 仍未全绿：
  - 只更新 blocker wording 与 dates
- 如果 Wave1A rerun 全绿：
  - 仍要先判断 `M1` formal close 与 `M2 done` 是否可以一起合法升格
  - 不能自动把 `M3` 改成 started

### `docs/blueprints/m2-kernel-beta-verdict.md`

#### Target sections

- `Verdict`
- `Fresh Evidence`
- `Why It Is Not Done`
- `Remaining Gaps`
- `Decision Summary`

#### Planned patch shape

- 如果 Wave1A rerun 仍非 `0`：
  - 继续写 `ready but not done`
  - 只更新 blockers 与 dates
- 如果 Wave1A rerun 变成全绿：
  - 也要先补“为什么这次可以升格”的组合证据
  - 不能只写“rerun 绿了”

### `docs/blueprints/m3-first-party-integration-readiness.md`

#### Target sections

- `Current Stage Truth`
- `Re-entry Gate`
- `Repo Typing`
- `M3 Guardrails`

#### Planned patch shape

- 保持 `not started`，除非 shared integrator 明确锁定 `M2 done` 并启动正式 M3
- repo typing 可吸收本轮 isolated contract pack 的更细 guardrail wording
- `multi-ai-sidepanel` 的 blocked status 不能被弱化

### `docs/blueprints/v1-delivery-plan.md`

#### Target sections

- `Current Live Checkpoint`
- `Phase Plan / M2`
- `Phase Plan / M3`

#### Planned patch shape

- 把 checkpoint wording 和 shared verdict 对齐
- 把 `M2` / `M3` ceiling 写得和 shared verdict 一样窄
- 不让旧乐观 wording 留在 phase plan 里当后门

### `docs/public-surface-support-matrix.md`

#### Default plan

默认先 `keep`。

#### Why likely keep

因为当前矩阵已经很克制：

- `HTTP/API` = `supported now`
- `SDK/client` = `partial`
- `CLI` = `not now`
- `MCP` = `research only`
- compat = `planned`

这张表今天最大的风险不是“写得太弱”，而是有人想把别的表述写得太强。
所以它更像一块已经诚实的门牌，不应在并发期被顺手改动。

---

## Sentences That Must Stay Frozen Until Fresh Truth Arrives

以下句子今天都不能提前升格：

- `M1 formally closed`
- `M2 done`
- `M3 ready to start now`
- `M3 partial`
- `ALL LIVE GATES GREEN`
- `high-stability trio fully service-ready`

---

## Integration Order for Later

未来共享整合时，推荐顺序是：

1. 先锁 Wave1A final rerun truth
2. 再锁 shared phase verdict
3. 再同步 `README.md` 与 `Task Board`
4. 再同步 `m2-kernel-beta-verdict.md`
5. 再同步 `m3-first-party-integration-readiness.md`
6. 最后再判断 `v1-delivery-plan.md` 与 `public-surface-support-matrix.md` 是否需要微调

### 为什么这个顺序更安全

因为它像先改总账、再改分账。
如果先改 README 或 phase plan，再回头改 verdict，很容易前后打架。

---

## Ready Signal for Shared Sync

future shared sync 只有在下面两类输入都齐了时才应启动：

1. **fresh runtime truth**
   - 来自 Wave1A 的 final rerun
2. **isolated contract truth**
   - 来自本轮 wave1 contract pack

缺一不可。

---

## Decision Summary

这份 shared-doc sync plan 的核心态度是：

> 今天先把以后要改哪块墙、刷什么漆、等哪张验收单写清楚。
> 但锤子先别落下去，等前线把最新验车结果交回来。
