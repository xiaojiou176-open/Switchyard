# Wave 1 M2 Verdict Evidence Pack

## Purpose

这份文件是 `M2 / Kernel Beta` 的**隔离 verdict 证据包**。
它不直接改写共享 verdict 文件，而是先把“为什么今天仍只能写 `ready but not done`”拆成可审查账本。

---

## Scope Boundary

这份 evidence pack 只回答四件事：

1. 当前为什么还是 `ready but not done`
2. 哪些证据已经 durable landed
3. 哪些证据必须来自 fresh runtime / live rerun
4. 哪些说法今天绝对不能提前写强

它**不**做这些事：

- 不直接修改 `docs/blueprints/m2-kernel-beta-verdict.md`
- 不重新定义 `M1`
- 不推进 `M3` 开工
- 不把一次旧绿灯当今天真相

---

## Baseline Snapshot

### `2026-04-03` internal baseline

- branch at capture time: `main`
- `HEAD`: `39a3dfbb8711f9f6b4ad85eb3c1dba6126370e4d`
- `gh pr status`: `0` open PR
- fresh internal commands:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`

### currently governing live/runtime truth

以高优先级工件中最近的 fresh wording 为准：

- `pnpm run verify:gemini-live` = `0`
- `pnpm run verify:web-login-live` = `2`
  - `chatgpt` = `external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
  - `gemini` = `external-blocker / session-incomplete / gemini-browser-session-invalid`
  - `claude` = `success`
  - `grok` = `success`
  - `qwen` = `success`
- `pnpm run verify:service-live` = `2`
  - `chatgpt` = `external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
- `pnpm run reality:gate` = `2`
  - `overallStatus = external-blocker`
  - `internalGate.passed = true`
  - `geminiByok = success`
  - `webLogin summary = success 4 / external-blocker 2 / failure 0`

---

## Final Candidate Verdict

> **`M2 / Kernel Beta` 当前最诚实的写法仍然是 `ready but not done`。**

换句话说：

> 地基、主前门、消防通道都已经真实落地，
> 但验收章还差“高稳定 trio 经统一 service/runtime substrate fresh 全绿”这组证据。

---

## Evidence Classification

### A. Durable landed truth

这些是已经 committed、可以稳定写进 durable wording 的证据：

| Area | Durable truth | Why it matters for `M2` |
| --- | --- | --- |
| substrate identity | `service/runtime API substrate` 已是当前主前门 | `M2` 不再是空概念 |
| HTTP surface | `HTTP/API = supported now` | service-first beta frontdoor 已不是口头承诺 |
| SDK surface | `SDK/client = partial` | SDK 已存在，但不能冒充完整 beta frontdoor |
| scripts / proof path | `verify:service-live` 已 committed | `M2` 已拥有专门的 beta evidence script |
| kernel shape | contracts / kernel / credentials / diagnostics / lanes / providers / surfaces 已 durable landed | `M2` 不是 docs-only 阶段 |
| adoption posture | `openclaw-zero-token` adoption ledger 已明确 service/runtime 与 browser transport 的吸收状态 | `M2` 判断有了技术母本参照系 |

### B. Fresh runtime truth

这些证据必须来自 fresh live/runtime rerun，不能只靠 durable docs：

| Evidence | Current status | Why it blocks `done` |
| --- | --- | --- |
| `verify:service-live` | `2` | 统一 service-first invoke 还没把高稳定 trio 压到全绿 |
| `verify:web-login-live` | `2` | `ChatGPT + Gemini` 仍未回到可复验状态 |
| `reality:gate` | `2` | 全局 live verdict 仍是 `external-blocker` |
| `ChatGPT` managed-browser session completeness | missing | 高稳定 trio 少一根承重梁 |
| `Gemini` managed-browser session completeness | missing | M2 不能只靠部分 provider 成功来冒充阶段完成 |

### C. Anti-evidence

这些不是正证据，而是直接拦截 overclaim 的反证：

| Anti-evidence | Honest implication |
| --- | --- |
| `verify:service-live` 先在 `chatgpt` 掉到 `session-incomplete` | service substrate 已存在，但 beta readiness 仍未通过 |
| `reality:gate` 仍是 `external-blocker` | 不能写 `ALL LIVE GATES GREEN` |
| `M1` 仍未 formal close | `M2 done` 更不能提前宣告 |
| `SDK/client = partial` | 不能把 SDK 写成当前完整 beta frontdoor |

---

## Why It Is Still `ready but not done`

### 1. `ready`

当前足以支撑 `ready` 的证据已经够多：

- service/runtime substrate 已 durable landed
- HTTP discovery / auth / remediation / acquisition / invoke 已 committed
- `verify:service-live` 已存在，说明 beta frontdoor 已经可被专门验证
- `Gemini BYOK` 已成功
- `Claude / Grok / Qwen` 当前 web-login live proof 已成功
- `reality:gate` 当前没有 internal failure

### 2. `not done`

当前仍不能写 `done` 的根因也很集中：

- `ChatGPT + Gemini` 这组 managed-browser session completeness 还没回到可复验状态
- `verify:service-live` 仍不是 `0`
- `verify:web-login-live` 仍不是 `0`
- `reality:gate` 仍不是 `0`

说得更直白一点：

> 现在不是“连底盘都没有”，
> 而是“底盘有了，但高稳定 trio 还没一起通过上路验车”。

---

## Minimum Evidence Needed for Promotion to `done`

如果以后要把 `M2` 从 `ready but not done` 升格成 `done`，最少还差下面这组证据：

1. `pnpm run verify:service-live` = `0`
2. `pnpm run verify:web-login-live` = `0`
3. `pnpm run reality:gate` = `0`
4. `ChatGPT` managed-browser session 已重新回到 authenticated workspace，并能 provider-scoped rerun 通过
5. `Gemini` managed-browser session 已重新回到 Gemini composer，并能 provider-scoped rerun 通过
6. 新一轮 wording 同步后，shared docs 不再继续保留旧的 blocker wording

### 这组证据为什么必须成组出现

因为 `M2` 不是“某个脚本绿了”就算过。
它更像房屋验收里的三张章：

- 室内结构章
- 水电验收章
- 消防章

少一张，都不能算正式交房。

---

## What Cannot Count as Promotion Evidence

下面这些都**不能单独**拿来把 `M2` 写成 `done`：

- 一次历史上的 all-green 截图
- 只有 `pnpm typecheck / test / build` 通过
- 只有 `Gemini BYOK` 成功
- 只有 `Claude / Grok / Qwen` 成功
- “已经有 service slice 了”
- “README 里写得比较乐观”

---

## Relation to `M1` and `M3`

### Relation to `M1`

- `M2` 不是 `M1` 的同义词
- 但 `M1` 未 formal close，会限制 `M2` 的最终升格
- 当前更诚实的关系是：
  - `M1`: internal gate passed, not formally closed
  - `M2`: ready but not done

### Relation to `M3`

- `M3` 不能把 `M2 readiness` 误读成 `M2 done`
- 当前最多只允许：
  - 写 `M3 re-entry contract`
  - 写 repo typing
  - 写 shared-doc sync plan
- 当前不允许：
  - 把 first-party integration 写成已开始
  - 把其他 repo 当作今天可写施工面

---

## Promotion Guardrail Language

如果后续 shared sync 要吸收这份证据包，推荐只使用下面这类 wording：

- `ready but not done`
- `service/runtime substrate is durable landed`
- `promotion to done still depends on fresh live/runtime reruns`
- `single green slice is not enough`

### 当前禁止的 wording

- `M2 done`
- `Beta passed`
- `service layer is fully stable`
- `first-party integration may start now`

---

## Decision Summary

当前 `M2` 的证据状态最像：

> 施工标准、总闸门、入户大门都已经装好，
> 但正式验收还差 `ChatGPT + Gemini` 这两把网页登录钥匙真正插进去、转得动、而且能复验。
