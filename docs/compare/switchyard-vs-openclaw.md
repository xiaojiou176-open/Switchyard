# Switchyard vs OpenClaw

## Short Answer

They are related, but they are not the same product shape.

中文短答：

它们有关联，但不是同一种产品。

## What Switchyard borrows

`Switchyard` 深借的是：

- Web/Login runtime ideas
- browser/session capture structure
- thin gateway/runtime seams

## What Switchyard does not inherit

`Switchyard` 不继承这些东西：

- OpenClaw product shell
- operator/gateway worldview
- channels / bigger assistant platform shape
- full control-plane semantics

## Product Difference

### Switchyard

- shared provider runtime
- AI app integration layer
- BYOK + Web/Login

### OpenClaw

- broader assistant / gateway / operator product world
- larger control-plane and consumer product shell

## Truthful Relationship Today

- `Switchyard` currently has `partial` OpenClaw compatibility, but only in a thin fail-closed sense.
- The landed slice today is a delegation-first runtime bridge, not an OpenClaw product-shell clone.
- Full OpenClaw parity is still not supported.

## Truthful Keyword Capture

This page is safe for:

- `Switchyard vs OpenClaw`
- `OpenClaw alternative for shared provider runtime`
- `shared provider runtime vs assistant platform`

This page is **not** a claim that:

- Switchyard already supports OpenClaw compatibility today
- Switchyard is an OpenClaw fork
- Switchyard is replacing the full OpenClaw product surface
