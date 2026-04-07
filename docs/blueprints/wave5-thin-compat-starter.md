# Wave 5 Thin Compat Starter

## Status

`durable thin compat slices are now landed in the current repo change set; full parity remains fail-closed`

这页不是说 `Codex / Claude Code / OpenClaw` 现在已经支持了。

它的作用是把 `Wave 5` 的**最薄可承诺实现**写清楚，防止后面一上来就把：

- thin adapter
- product shell
- tool plane
- MCP plane

混成一整个“已经兼容”的大包。

---

## Why This Exists

说得更直白一点：

- `Wave 4` 负责把边界写死
- `Wave 5` 才开始写**真正最薄的 compat 落点**

如果没有这份 starter，后面 implementer 很容易做出两种假动作：

1. 把 prompt bridge 写成 full agent parity
2. 把 consumer 自己的 terminal / tool / approval UX 偷搬进 `Switchyard`

---

## Current Truth

当前 fresh truth 现在是：

- public `Codex compat` = `partial`
- public `Claude Code compat` = `partial`
- public `OpenClaw compat` = `partial`
- fail-closed thin adapters now land under `packages/consumers/*`
- `MCP` = `research only`

所以 `Wave 5` 当前最诚实的目标，已经从“先把形状写对”推进到了：

> **把 thin compat 作为 durable landed truth 收口，但仍然 fail-closed。**

---

## Frozen Starter Shape

### `Codex`

当前允许的第一刀只能是：

- responses-style runtime adapter
- provider/model metadata bridge
- fail-closed service/runtime client shim

当前明确不做：

- tool execution
- MCP bridge
- worktree / approval / terminal shell parity

### `Claude Code`

当前允许的第一刀只能是：

- anthropic-compatible runtime adapter
- header/body fidelity bridge
- fail-closed diagnostics passthrough

当前明确不做：

- terminal shell
- worktree UX
- tool/MCP parity

### `OpenClaw`

当前允许的第一刀只能是：

- future consumer-side adapter
- provider/runtime delegation to `Switchyard`
- no product-shell inheritance

当前明确不做：

- operator/control-plane worldview
- channels/mobile companion shell
- upstream shell cloning

---

## Mandatory Fail-Closed Rules

`Wave 5` 的 thin compat 必须遵守：

1. 不支持的能力必须明确返回 unsupported / planned
2. 不做 silent fallback
3. 不把 thin bridge 写成 full parity
4. 不把 tool / MCP / execution brain 偷渡进来

---

## Done Signal

`Wave 5` 只有在这些条件成立时才算 complete：

1. 至少一个 thin compat slice 已 committed on `main`
2. 对应代码、文档、验证三者一起闭环
3. `docs/public-surface-support-matrix.md` 和 `docs/compat/*` 可以诚实从 `planned` 升格

当前这 3 条在当前 repo change set 中都已经满足。

所以今天最诚实的结论是：

> `Wave 5 thin compat landed as fail-closed partial adapters`

---

## Decision Summary

> `Wave 5` 现在已经不只是“边界写死”。  
> 它已经把 very thin runtime adapters 真正落进 repo。  
> 但 tool / MCP / execution brain 仍然一律留在 consumer。
