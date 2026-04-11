# Switchyard vs Codex

## Short Answer

They solve different layers of the stack.

## Codex

Codex is closer to:

- a coding-agent product
- a terminal/app workflow shell
- a consumer-side tool surface

## Switchyard

Switchyard is closer to:

- a shared provider runtime
- auth/session/provider normalization
- an AI app backend/runtime layer

## Truthful Relationship Today

- Switchyard currently has `partial` Codex compatibility, but only in a thin
  fail-closed sense
- Codex remains a future consumer-compat target
- the landed slice today is a Responses-style runtime bridge, not a clone of
  the Codex app shell
- full Codex parity is still not supported

## Why This Page Exists

This page exists so searches like these land on a truthful explanation:

- `Switchyard vs Codex`
- `Codex alternative for shared provider runtime`
- `shared provider runtime for Codex-like apps`
