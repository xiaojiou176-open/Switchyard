# Wave 5 Thin Compat Starter

This internal working pack moved out of the public docs plane.

## Why It Moved

- the public `partial / fail-closed` truth for Wave 5 already lives in:
  - `docs/public-surface-support-matrix.md`
  - `docs/compat/README.md`
  - the current task-board wave ledger
- this file is the internal starter-boundary contract for how thin compat
  landed, not a first-row public explainer

## Status

`durable thin compat slices are now landed in the current repo change set; full parity remains fail-closed`

This file does **not** say `Codex / Claude Code / OpenClaw` are now fully
supported.

Its job is to keep the thinnest honest implementation boundary explicit so that
future work does not silently inflate:

- thin adapter
- product shell
- tool plane
- MCP plane

into one fake “already compatible” bundle.

## Current Truth

- public `Codex compat` = `partial`
- public `Claude Code compat` = `partial`
- public `OpenClaw compat` = `partial`
- fail-closed thin adapters now land under `packages/consumers/*`
- `MCP` = `partial` as a read-only surface, not an execution brain

## Frozen Starter Shape

### `Codex`

Current first cut may include:

- responses-style runtime adapter
- provider/model metadata bridge
- fail-closed service/runtime client shim

Current first cut may not include:

- tool execution
- MCP bridge
- worktree / approval / terminal shell parity

### `Claude Code`

Current first cut may include:

- anthropic-compatible runtime adapter
- header/body fidelity bridge
- fail-closed diagnostics passthrough

Current first cut may not include:

- terminal shell
- worktree UX
- tool/MCP parity

### `OpenClaw`

Current first cut may include:

- future consumer-side adapter
- provider/runtime delegation to `Switchyard`
- no product-shell inheritance

Current first cut may not include:

- operator/control-plane worldview
- channels/mobile companion shell
- upstream shell cloning

## Mandatory Fail-Closed Rules

1. Unsupported capabilities must return explicit `unsupported` or `planned`
2. No silent fallback
3. Thin bridge must never be narrated as full parity
4. Tool / MCP / execution-brain semantics stay out unless separately landed and
   reclassified
