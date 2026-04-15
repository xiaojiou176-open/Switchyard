# openclaw-zero-token Adoption Ledger

## Purpose

这页回答一个非常具体的问题：

> `Switchyard` 到底吸收了 `openclaw-zero-token` 的哪些关键技术，  
> 哪些还只到一半，哪些现在故意不吸。

它不是“感谢名单”，也不是“我们参考了很多”的空话。  
它是一份工程账本。

## Ledger

| Area | Current Switchyard status | openclaw-zero-token source | Status | Next priority |
| --- | --- | --- | --- | --- |
| Web/Login lane runtime boundary | 已有独立 `lane`、provider runtime、session contract、invoke readiness 语义 | `README.md`, `ARCHITECTURE.md`, `docs/gateway/index.md` | `landed` | 继续压实 provider-specific real transport 稳定性 |
| Browser onboarding / acquisition | 已有 auth portal 与 provider acquisition start/capture routes；当前 fresh rerun 证明 `ChatGPT` 与 `Gemini` 仍需要重新完成 managed-browser 登录，而不是 acquisition 骨架缺失 | `README.md` onboarding flow, `ARCHITECTURE.md` onboarding/auth write path | `partial` | 让 `ChatGPT` / `Gemini` 的 managed-browser 会话重新回到 authenticated workspace，再复验 closeout |
| Session / refresh / re-auth lifecycle | 已有 artifact model、capture/refresh/reAuth handoff、runtimeReadiness 语义；但当前 fresh truth 仍暴露 `session-incomplete` 尾巴，说明 session completeness 还没有完全 durable | `docs/gateway/authentication.md`, `ARCHITECTURE.md` auth profile flow | `partial` | 继续把 session completeness 与 rerun stability 压到可复验，而不是只停在 contract 语义 |
| Provider-owned browser transport | 已有 real-transport contract 与多家 provider live proof / invoke 路径；当前 fresh truth 证明 `Claude / Grok / Qwen` 已通，`ChatGPT / Gemini` 仍卡在 `session-incomplete`，`verify:service-live` 也会先在 `ChatGPT` 收敛到同一尾巴 | `README.md` web client + stream structure, `ARCHITECTURE.md` provider auth/client flow | `partial` | 先恢复 `ChatGPT` / `Gemini` browser-backed invoke 的 session completeness，再重新判断 M2/M3 放行 |
| Runtime HTTP frontdoor | 已有 runtime-first service surface、discovery/auth/health/remediation/invoke routes | `docs/gateway/index.md`, `docs/gateway/openresponses-http-api.md` | `partial` | 继续强化 service/runtime substrate，而不是把 operator gateway 语义直接照搬进来 |
| OpenResponses-compatible `/v1/responses` frontdoor | 当前主线没有采用 OpenClaw 的 operator-style `/v1/responses` 公开前门 | `docs/gateway/openresponses-http-api.md` | `not yet` | 如未来需要，只考虑在更后置的 adapter/compat 层做 thin slice |
| Auth artifact capture (`cookie`, `userAgent`, browser profile`) | 已有 browser-profile / cookie-bundle / user-agent / session artifact 语义 | `README.md` auth flow, `ARCHITECTURE.md` auth-profiles write path | `landed` | 继续对齐 provider-specific required artifacts 与 probe proof |
| Diagnostics / remediation language | 已有 missing credential / session / provider unavailable / user action required 等分类与 remediation 入口 | `docs/gateway/index.md` operational checks, `docs/gateway/authentication.md` status/doctor semantics | `landed` | 继续让 live scripts 与 service remediation 语言保持同义 |
| Gateway operator auth / bearer-token control plane | 当前明确不采用 OpenClaw 那种 operator-access gateway auth 作为 `Switchyard` V1 公共前门 | `docs/gateway/openresponses-http-api.md` security boundary | `intentionally not adopted` | 保持 local-user-owned credential 边界，不把 operator token 模型偷渡进来 |
| Multi-gateway / operator shell worldview | 当前明确不继承这类更大的 control-plane / operator world | `docs/gateway/index.md` multiple gateways, gateway protocol operator view | `intentionally not adopted` | 继续把这些能力留在 future/non-goal 边界之外 |

## Hard Boundary

下面这些东西现在不能 raw-copy：

- operator-first gateway worldview
- bearer-token protected full operator-access `/v1/responses` public surface
- multi-gateway / multi-profile orchestration shape
- 更大的 assistant / control-plane / channels 产品壳

原因很简单：

> 这些东西一旦整块搬进来，  
> `Switchyard` 就会从“共享 Provider Runtime”滑回“更大的 OpenClaw 系列产品”。

## Decision Summary

> `openclaw-zero-token` 现在不是一句“有参考价值”的口号。  
> 它已经是 `Switchyard` Web/Login 技术吸收的正式账本来源。  
> 但今天这轮 fresh truth 也提醒我们：吸收到“有合同和入口”不等于自动继承一份永久可用的 live 状态。  
> 吸收的是 runtime 技术，不是自动得到一张永不过期的 all-green 成绩单。
