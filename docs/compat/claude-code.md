# Switchyard for Claude Code

## Status

- `partial`
- `thin runtime adapter landed`
- `full Claude Code compatibility not supported yet`

## What We Can Truthfully Say Today

- current repo truth is now `partial`, but only in a very thin sense.
- the landed slice is intentionally narrow:
  - text-only message bridge
  - shared runtime delegation through `/v1/runtime/invoke`
  - fail-closed rejection for tool execution and terminal-shell parity

## What Is Already Landed

- `Switchyard` already has:
  - a durable service runtime
  - durable auth/session contracts
  - durable service vs SDK surface contracts
  - a thin adapter at `packages/consumers/claude-code/src/index.ts`

## What Is Not Landed

- no terminal shell / worktree parity
- no approval UX parity
- no tool/MCP parity
- no truthful basis to claim full Claude Code support today

## Boundary Reminder

不要把这些 future compat 想成：

- 复制 Claude Code 终端壳
- 复制 Claude Code plugin/worktree/approval UI

更诚实的理解是：

> 如果以后做，也应该先从网关/API 兼容层切入，  
> 而不是把 Claude Code 的产品壳搬进 `Switchyard`。

当前 landed thin adapter，只能算这条路线的第一刀，而且仍然必须 fail-closed。
