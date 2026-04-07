# Switchyard for OpenClaw

## Status

- `partial`
- `thin runtime adapter landed`
- `full OpenClaw compatibility not supported yet`

## What We Can Truthfully Say Today

- `openclaw-zero-token` is a technical upstream for Web/Login runtime ideas.
- current repo truth is now `partial`, but only in a delegation-first thin sense.

## What Is Already Landed

- `Switchyard` already uses OpenClaw research to shape:
  - Web/Login runtime boundaries
  - auth/session design
  - thin HTTP/runtime ideas
  - a delegation-first thin adapter at `packages/consumers/openclaw/src/index.ts`

## What Is Not Landed

- no operator/control-plane worldview parity
- no channels/mobile companion shell
- no truthful basis to claim full OpenClaw support today

## Boundary Reminder

`OpenClaw` 不是一个“顺手兼容一下就好”的薄 consumer。

它更像一整套大的产品世界：

- gateway control plane
- operator/node/session protocol
- plugin/backend boundaries

所以这页要明确告诉读者：

> 现在已经不是纯 research-only thinking。  
> 但它仍然只是 fail-closed thin compat，不是 OpenClaw product-shell parity。
