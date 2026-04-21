# OpenClaw Starter Pack

这个 pack 适合的是 delegation-first runtime bridge，不是 OpenClaw 的产品壳。

## 当前诚实边界

- `partial`
- delegation-first bridge
- fail-closed adapter starter with builder preflight

## 当前不该吹的东西

- operator/control-plane parity
- product-shell parity
- channel shell parity

## 默认 builder 走法

最窄但最好用的顺序现在是：

1. 先看 delegation preview
2. 再读 provider doctor / runtime bootstrap / health / dispatch-plan
3. 最后才打一发真正的 `/v1/runtime/invoke`

这个 pack 的 `smoke.mjs` 现在会：

- 始终打印本地 request preview
- 在 runtime 暴露相关只读面时，额外打印 preflight snapshot
- 最后再跑一次真实 invoke

如果你接的是旧 mock runtime，preflight 读不到时会诚实标成 `unavailable`，不会偷偷假装有更多 parity。

## 运行

```bash
pnpm run start:service-local
pnpm run starter-pack:openclaw
```
