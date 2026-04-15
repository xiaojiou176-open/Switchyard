# M3 First-party Integration Readiness

## Status

当前状态：

> **`closed for the currently selected related-repo seams; future expansion still requires explicit reselection`**

更直白一点说：

> 当前这一批已经选中的 related repos 已经逐仓关门。  
> 以后如果还要继续扩 `M3`，那是新一轮 reselection，不是这轮旧程序欠账。

这页文档的作用不是偷跑 `M3`，而是把“以后重新进入 `M3` 时到底该看什么、先做什么、不要做什么”写成主仓内的 ready package。

---

## Current Stage Truth

这轮 fresh truth 下，`Switchyard` 主仓内最重要的事实是：

- `pnpm typecheck` = `0`
- `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts tests/integration/docs/package-ready-distribution.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts` = `0`
  - `5 files / 43 tests passed`
- `pnpm build` = `0`
- current fresh aggregate closeout in this workspace:
  - `pnpm run verify:service-live` = `0`
  - `pnpm run reality:gate` = `2`
  - `overallStatus = external-blocker`
  - `internalGate.passed = true`
  - `successCount = 3`
  - `externalBlockerCount = 3`
  - `failureCount = 0`
  - current external blockers:
    - `Claude` = `missing-web-session-material`
    - `Grok` = `missing-web-session-material`
    - `Qwen` = `missing-web-session-material`

所以当前最诚实的阶段分层是：

- `M1 / Kernel Alpha`：**repo-side closeout complete**
- `M2 / Kernel Beta`：**repo-side done; latest aggregate closeout paused only by external blockers**
- `M3 / First-party Integration`：**current selected related-repo closures complete at their bounded legal boundary**
- `M4 / Consumer Compat`：**Wave 4 freeze complete；Wave 5 / Wave 6 partial landed；full parity 仍未开始**

---

## What Is Good Enough Today

当前已经足够支撑，并且已经完成当前这一批 `M3` bounded closure 的东西，有这些：

1. `service/runtime API substrate` 已经真实存在，而且是当前主前门。
2. `HTTP` discovery / auth-status / probe / remediation / acquisition / invoke 路由都已 committed。
3. `SDK/client` 作为同一 substrate 上的正式消费面已经存在，但仍是 `partial`。
4. `Gemini BYOK` live gate 当前成功。
5. 当前这台 workspace 上的 latest rerun 已把 `ChatGPT / Gemini` 锁到 success，并把 `Claude / Grok / Qwen` fail-closed 成 session-material external blockers。
6. `reality:gate` 当前已经不是 internal failure，而是稳定收敛到一组 aggregate external blockers。

换句话说：

> 共享底盘已经站住，  
> 当前这一批已选 related repos 的 bounded seam 也已经收口，  
> 所以现在的问题不再是“继续压同一个 live blocker”，而是“以后如果再开更多 consumer 扩展，要先显式 reselection，再开新波次”。

---

## What Is Still Not Good Enough

当前还不足以把 **未来所有 consumer 扩展** 一句话写成“全部完成”的点，必须明确写清楚：

1. bounded seam closure 不等于 whole consumer contract migrated。
2. 不是每个 consumer 都应该继续往更深的 runtime cutover 推。
3. 任何新的 consumer 扩展都必须先重做 scope selection。

所以这页文档不能被读成：

- “M3 已经全阶段完成”
- “所有 consumer 都应该继续深挖”
- “Switchyard 已经完成 phase handoff”

---

## Further Expansion Gate

以后任何人想把 `M3` 从“逐仓 durable closure”继续扩成更深的 cutover，先看这 4 条。

1. 继续保持 `pnpm run verify:service-live` / `verify:web-login-live` / `reality:gate` 在 credentialed workstation 上可复验
2. 目标 repo 的 safe-write 面已经重新确认，不把 dirty local experiments 当成 durable landed truth
3. 新扩出来的 consumer slice 仍然只动 bounded seam，不倒灌产品壳
4. 先完成当前 repo-by-repo closure，再谈下一层 compat 加深

---

## Repo Typing

以下分型先给出 **planning classification**，再补一层 `2026-04-03` 的 fresh cross-repo recheck。  
这样做的目的很简单：不要把旧计划标签误当成今天的现场照片。

| Repo | Type | What it means | Re-entry condition | Current guardrail |
| --- | --- | --- | --- | --- |
| `campus-copilot` | `BFF bridge target` | 上次明确 landed 的是 `apps/api` BFF bridge，不是整个 extension consumer contract | 只有在 `Switchyard` re-entry gate 全绿后，才允许重新进入 | 默认先限在 `apps/api/` 及邻近测试/文档，不顺手吞 dirty extension 改动 |
| `CortexPilot` | `clean seam target` | 上次明确的安全接缝在 orchestrator/provider-resolution 边界 | 只有在 `Switchyard` re-entry gate 全绿后，才允许重新进入 | 先守住 orchestrator seam，不让它反向定义 `Switchyard` 合同 |
| `multi-ai-sidepanel` | `bounded analyst seam target` | 当前 committed repo truth 已有 maintainer-local / partial runtime-backed analyst lane，但 compare cockpit 仍留在本仓 | 只有在不动 compare-first cockpit 的前提下，才允许继续扩展 | 当前只承认 analyst lane，不承认 whole-product cutover |

## 2026-04-03 Fresh Repo-State Recheck

这不是 `M3 started`。  
你可以把它理解成重新去工地门口看了一圈，确认哪栋楼已经有合法接口、哪栋楼今天还不能进。

### `campus-copilot`

- fresh repo truth:
  - `main...origin/main`
  - worktree clean
  - open PR `0`
- fresh seam truth:
  - optional local `Switchyard` bridge 已经 durable landed 在 `apps/api`
  - fresh `pnpm typecheck && pnpm test:api` = `0`
- current legal reading:
  - 这仓不是 `M3 complete`
  - 但 `Switchyard` 相关的最小 first-party seam 已经 landed，不需要本轮再发明第二条桥

### `CortexPilot`

- fresh repo truth:
  - `origin/main` clean
  - 公开主线已经保留 `runtime-first / chat-only / fail-closed` 的 Switchyard compatibility slice
- fresh seam truth:
  - `apps/orchestrator/README.md` 与 `provider_resolution.py` 仍明确把 `Switchyard /v1/runtime/invoke` 视作 runtime-first adapter
  - tool-calling 仍然 fail-closed，不冒充 parity
- current legal reading:
  - durable landed slice 在 `main`
  - 但当前本机 checked-out branch 可能仍处于其他 active dirty wave；如果未来要继续写，必须从 clean `main` worktree 重新进场，不在 dirty local branch 上叠写

### `multi-ai-sidepanel`

- fresh repo truth:
  - 当前产品主线仍是 `Prompt Switchboard`
  - compare-first / local-first / browser-native / MCP sidecar
- fresh clean-main recheck:
  - clean `origin/main` worktree 上，`npm run test:frontdoor` = `0`
  - clean `origin/main` worktree 上，`npm run test:mcp:smoke` = `0`
- fresh seam truth:
  - 当前 committed repo truth 已有 `switchyard_runtime` maintainer-local / partial analyst lane
  - README、task board、tests 都明确它不替代 compare-first cockpit
- current legal reading:
  - 这仓当前最诚实的状态不是 `shelved`
  - 而是 **`landed but bounded`**
  - 如果未来还要继续推进，边界也只能停在 analyst/runtime lane，不允许把 compare-first UI / tab orchestration 倒灌给 `Switchyard`

---

## M3 Guardrails

以后重新进入 `M3` 时，必须继续守这些护栏：

1. **只走 `service-first`。**
   - 不把 first-party repo 重新拉回 `SDK-first` 深耦合路径。
2. **不把 `CLI / MCP / plugin / landing / marketing / SEO` 偷渡进来。**
   - 这些不属于 `M3` 当前施工面。
3. **first-party repo 不是 `Switchyard` 核心合同的真理源。**
   - 它们是消费层，不是 runtime 宪法。
4. **不碰其他 repo，直到 `Switchyard` 自己的 rerun gate 重新全绿。**
5. **每次重入前重新做 fresh truth reset。**
   - 不准拿旧 archive 里的 green 覆盖今天的现实。

---

## What This Package Enables

这份 readiness package 现在真正做到的，是下面这件事：

> 即使下一位要在未来重开更大的 consumer 扩展，  
> 也不用从零重新想“服务前门够不够、哪些仓当前已 closure、哪些仓必须先 reselect、哪些地方不能碰”。

也就是说：

- 它**不是** `M3 globally complete`
- 它**不是** `whole consumer handoff finished`
- 它是：**当前已选 `M3` related repos 的 bounded closure 已完成，而更大扩展需新开波次**
