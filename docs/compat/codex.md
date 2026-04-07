# Switchyard for Codex

## Status

- `partial`
- `thin runtime adapter landed`
- `full Codex compatibility not supported yet`

This page exists so the keyword is truthful and discoverable.

这页的作用是把 `Switchyard + Codex` 这个关系讲清楚，但不把 thin adapter 写成 full parity。

## What We Can Truthfully Say Today

- current repo truth is now `partial`, but only in a very thin sense.
- the landed slice is intentionally narrow:
  - text-only runtime delegation
  - Responses-style request bridge into `/v1/runtime/invoke`
  - fail-closed unsupported features for tool execution, MCP, and runner shell

## What Is Already Landed

- `Switchyard` has a durable `service-first` runtime surface.
- the repo now carries a thin adapter at `packages/consumers/codex/src/index.ts`.
- that landed slice keeps `Codex` in the consumer dimension, not the V1 input lane.

## What Is Not Landed

- no tool execution parity
- no MCP bridge
- no worktree / approval / terminal shell parity
- no truthful basis to claim full Codex support today

## Why This Page Exists

因为很多开发者会搜：

- `Switchyard Codex`
- `shared provider runtime for Codex`
- `Codex Responses runtime`

这页告诉他们：

> 现在已经不是 “zero adapter thinking”。  
> 但这仍然只是 fail-closed thin compat，不是 `Codex` full support。
