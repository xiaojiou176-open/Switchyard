# Wave 1 Phase Ledger Candidate

## Purpose

这份文件不是共享真理源改写稿。
它是 `Wave 1 / L1-B` 给后续整合者准备的**隔离阶段账本候选稿**。

它只做一件事：

> 把 `M1 / M2 / M3 / M4` 现在到底能写多强、哪些只是 durable landed truth、哪些只是未来可能、哪些还卡着 blocker，先拆成一张可吸收账本。

---

## Snapshot Date

- current isolated baseline date: `2026-04-03`
- current baseline branch at capture time: `main`
- current baseline `HEAD`: `39a3dfbb8711f9f6b4ad85eb3c1dba6126370e4d`
- current baseline worktree at capture time: `clean`
- current baseline PR status at capture time: `0` open PR
- current fresh internal commands on `2026-04-03`:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`

### Live-truth anchor

这轮**没有**重新跑 live/runtime gates。
当前 live/runtime stage wording 仍以高优先级工件中的最近 fresh truth 为准，特别是：

- `2026-04-02 durable closeout rerun`
- `2026-04-01 truth freeze rerun`
- `docs/blueprints/m2-kernel-beta-verdict.md`
- `docs/blueprints/m3-first-party-integration-readiness.md`
- `docs/blueprints/v1-delivery-plan.md`

说得更直白一点：

> 今天这份候选账本承认 `2026-04-03` 的 internal baseline 是绿的，
> 但不会拿这三个内部命令去覆盖 `verify:service-live` / `verify:web-login-live` / `reality:gate` 的旧 fresh truth。

---

## Global Candidate Verdict

| Phase | Current candidate wording | Why this is the honest ceiling today |
| --- | --- | --- |
| `M1 / Kernel Alpha` | `internal gate passed, not formally closed` | internal gate 已 fresh 通过，但 `ChatGPT + Gemini` managed-browser session completeness 还没回到可复验状态，不能写 formal close |
| `M2 / Kernel Beta` | `ready but not done` | service/runtime substrate 已 durable landed，但 `verify:service-live`、`verify:web-login-live`、`reality:gate` 仍不足以支撑 `done` |
| `M3 / First-party Integration` | `not started` | 只有 readiness package 与 repo typing，阶段本身没有合法开工 |
| `M4 / Consumer Compat` | `not started` | 顺序固定在 `M3` 之后，当前没有任何合法提前放行依据 |

---

## Phase Ledger

### `M1 / Kernel Alpha`

| Bucket | Candidate entry |
| --- | --- |
| fresh truth | `pnpm typecheck`、`pnpm test`、`pnpm build` 在 `2026-04-03` fresh 通过；更高优先级工件仍明确 `M1` 不能 formal close |
| durable landed truth | monorepo scaffold、contracts、kernel、credentials、diagnostics、`BYOK + Web/Login` baseline、`service surface`、`sdk surface`、`reality:gate` tooling 已 committed |
| local / unlanded possibility | 如果后续 fresh rerun 让 `ChatGPT + Gemini` managed-browser session completeness 恢复，`M1` 可以重新进入 formal close 判定 |
| blockers | `verify:web-login-live != 0`、`reality:gate != 0`、`ChatGPT` 与 `Gemini` 仍是 `session-incomplete` / `session-invalid` 类 external blocker |
| next legal move | 只允许继续做 Wave1A 风格的 session remediation + fresh rerun；不允许把 `M1` 先写成 closed |

### `M2 / Kernel Beta`

| Bucket | Candidate entry |
| --- | --- |
| fresh truth | 当前高优先级工件一致写法是 `ready but not done`；`verify:service-live` 最新 durable wording 仍未全绿 |
| durable landed truth | `service/runtime API substrate` 已存在；`HTTP/API` 当前是 `supported now`；`SDK/client` 当前是 `partial`；`verify:service-live` 已是 committed beta evidence script |
| local / unlanded possibility | 如果高稳定 trio 经 fresh rerun 全部通过统一 service-first invoke，并且 `reality:gate = 0`，可以进入 `M2 done` 重新判决 |
| blockers | `verify:service-live != 0`；高稳定 trio 还没拿到 fresh all-green；`M1` 也尚未 formal close |
| next legal move | 维持 `ready but not done`，补齐 verdict evidence pack，不越权把 shared verdict 直接升格 |

### `M3 / First-party Integration`

| Bucket | Candidate entry |
| --- | --- |
| fresh truth | 当前最诚实写法仍是 `not started` |
| durable landed truth | `service-first` guardrail 已锁；三仓 typing 已有主仓内 readiness package：`campus-copilot`、`CortexPilot`、`multi-ai-sidepanel` |
| local / unlanded possibility | 可以继续写 re-entry contract、repo prerequisites、safe-write seam，但这不等于 phase 已启动 |
| blockers | `M2` 未 done；`Switchyard` rerun gate 未全绿；三仓没有 fresh cross-repo audit；`multi-ai-sidepanel` 明确仍是 dirty target |
| next legal move | 只允许做 re-entry contract、repo typing、patch plan；不允许写 consumer compat、plugin、MCP、marketing、其他 repo 实装 |

### `M4 / Consumer Compat`

| Bucket | Candidate entry |
| --- | --- |
| fresh truth | `not started` |
| durable landed truth | consumer compat 顺序固定为 `Codex -> Claude Code -> OpenClaw`，且明确后置 |
| local / unlanded possibility | 仅存在 future ordering，不存在当前可落地施工面 |
| blockers | `M3` 未开始，更未完成；compat adapter 没有 committed 开工合同 |
| next legal move | 保持冻结，不提前打开 |

---

## Eight Required Answers

### 1. 当前 `main` 是否 clean

是。
`2026-04-03` baseline 记录显示：

- branch = `main`
- worktree = `clean`
- `gh pr status` = `0` open PR

### 2. 当前高优先级工件是否一致写 `M2 = ready but not done`

是，且一致性足够高。
至少这些文件都这样写：

- `.agents/Tasks/TASK_BOARD-2026-03-29-switchyard-bootstrap.md`
- `docs/blueprints/m2-kernel-beta-verdict.md`
- `docs/blueprints/m3-first-party-integration-readiness.md`
- `docs/blueprints/v1-delivery-plan.md`
- `README.md`

### 3. 当前高优先级工件是否一致写 `M3 = not started`

是。
当前共享 wording 的上限是：

> `M3` 只有 readiness / re-entry package，
> 不是 started，也不是 partial。

### 4. 当前是否已经有 enough evidence 支撑 `M1` formal close

没有。
阻塞点仍然集中在：

- `ChatGPT` managed browser 仍未回到 authenticated workspace
- `Gemini` managed browser 仍未回到 Gemini composer
- `verify:web-login-live` 与 `reality:gate` 仍非 `0`

### 5. 当前是否已经有 enough evidence 支撑 `M2 done`

没有。
原因不是“没有 service substrate”，而是：

- `service substrate` 已有
- 但统一 `service-first` invoke 还没把高稳定 trio 的 fresh evidence 压实到 `done`

### 6. 如果还不够，最缺哪一张证据

最缺的是这张组合证据，不是一张截图：

1. `verify:service-live = 0`
2. `verify:web-login-live = 0`
3. `reality:gate = 0`
4. `ChatGPT + Gemini` managed-browser session completeness 已恢复并可 provider-scoped rerun 复验

### 7. 当前 `M3 readiness` 里哪些是已经具备的 prerequisite

已经具备的前提包括：

- `service/runtime API substrate` 已 durable landed
- `HTTP` discovery / auth-status / probe / remediation / acquisition / invoke 路由已 committed
- `SDK/client` 已存在，但仍是 `partial`
- `Gemini BYOK` 当前有成功 live gate
- `Claude / Grok / Qwen` 当前有成功 web-login live proof
- 三仓 typing 与 service-first guardrails 已写进正式蓝图

### 8. 当前重新进入 `M3` 时最危险的 scope creep 是什么

最危险的范围膨胀有 3 类：

1. 把 `M3 readiness` 偷写成 `M3 started`
2. 把 `CLI / MCP / plugin / landing / marketing / SEO / consumer compat` 偷渡进 `M3`
3. 在 `Switchyard` gate 未全绿前，直接碰其他 repo 的 dirty worktree 或共享真理源

---

## Candidate Guardrails for Later Sync

### 可以写进未来 shared sync 的句子骨架

- `M1`：internal gate passed, not formally closed
- `M2`：ready but not done
- `M3`：not started, re-entry contract prepared
- `M4`：not started

### 当前绝对不能写强的句子

- `M1 formally closed`
- `M2 done`
- `M3 ready to start now`
- `M3 partial`
- `ALL LIVE GATES GREEN`

---

## Decision Summary

这份候选账本的核心结论只有一句：

> `Switchyard` 现在最像一栋二楼已经封顶、三楼施工许可证也写好了的楼。
> 但二楼还没拿到正式完工章，所以三楼仍然不能开工。
