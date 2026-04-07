# Switchyard vs Codex

## Short Answer

They solve different layers of the stack.

中文短答：

它们不是同一层产品。

## Codex

更接近：

- coding agent product
- terminal/app workflow
- consumer-side tool surface

## Switchyard

更接近：

- shared provider runtime
- auth/session/provider normalization
- AI app backend/runtime layer

## Truthful Relationship Today

- `Switchyard` currently has `partial` Codex compatibility, but only in a thin fail-closed sense.
- `Codex` is a future consumer compat target.
- The landed slice today is a Responses-style runtime bridge, not a clone of the Codex app shell.
- Full Codex parity is still not supported.

## Why This Page Exists

为了让这些搜索是 truthfully captured 的：

- `Switchyard vs Codex`
- `Codex alternative for shared provider runtime`
- `shared provider runtime for Codex-like apps`
