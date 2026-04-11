# Switchyard for OpenClaw

## Status

- `partial`
- `thin runtime adapter landed`
- `full OpenClaw compatibility not supported yet`

## What We Can Truthfully Say Today

- `openclaw-zero-token` is a technical upstream for Web/Login runtime ideas
- the current repo truth is `partial`, but only in a delegation-first thin
  sense

## What Is Already Landed

- Switchyard already uses OpenClaw research to shape:
  - Web/Login runtime boundaries
  - auth/session design
  - thin HTTP/runtime seams
  - a delegation-first thin adapter at `packages/consumers/openclaw/src/index.ts`

## What Is Not Landed

- no operator/control-plane worldview parity
- no channels/mobile companion shell
- no truthful basis to claim full OpenClaw support today

## Boundary Reminder

OpenClaw is not a small “easy compat target.”

It carries a much larger product world:

- gateway control plane
- operator and session protocol
- plugin/backend boundaries

So this page needs to say something very specific:

> this repo is no longer pure research-only thinking,
> but it is still only fail-closed thin compat, not OpenClaw product-shell
> parity
