# @switchyard/consumer-openclaw

`@switchyard/consumer-openclaw` 是 `Switchyard` 给 `OpenClaw` 风格 delegation 工作流准备的 **thin compat adapter**。

最重要的一句真话：

> 它借的是 delegation 形状，**不是**复制 OpenClaw 的 product shell。

## Current Honest Role

- `partial`
- `thin compat`
- `delegation-first runtime bridge`
- `fail-closed`

## What It Does

- 接住 delegation-first request envelope
- 把请求委托给 `Switchyard` service runtime
- 保留 bootstrap / runtime frontdoor 读取能力

## What It Does Not Claim

- OpenClaw product-shell parity
- operator/control-plane parity
- channel shell parity
- full OpenClaw compatibility

## Use It With

- [docs/compat/openclaw.md](../../../docs/compat/openclaw.md)
- [docs/runbooks/dev-bootstrap.md](../../../docs/runbooks/dev-bootstrap.md)
- [starter-packs/builders/openclaw/README.md](../../../starter-packs/builders/openclaw/README.md)
- [examples/hosts/openclaw/README.md](../../../examples/hosts/openclaw/README.md)

## Use Today

- 本地源码接入
  - 用下面的 local workspace usage 直接接 `http://127.0.0.1:4010`
- starter pack / OpenClaw-compatible bundle
  - 先看 [starter-packs/builders/openclaw/README.md](../../../starter-packs/builders/openclaw/README.md)
  - 再看 [distribution/claude-marketplace/README.md](../../../distribution/claude-marketplace/README.md)
- 当前还不能说
  - `official OpenClaw / ClawHub listing` / `product-shell parity`

## Local Workspace Usage

```ts
import { createOpenClawCompatAdapter } from "@switchyard/consumer-openclaw";

const adapter = createOpenClawCompatAdapter({
  baseUrl: "http://127.0.0.1:4010",
});
```

## Public Distribution Truth

- current repo status:
  - publish-ready package metadata landed
  - no npm publish claimed yet
- honest outward wording:
  - `partial OpenClaw compatibility`
  - `delegation-first bridge`
  - `without product-shell inheritance`

不要把这个包说成：

- `official OpenClaw marketplace plugin`
- `full OpenClaw support`
- `operator/control-plane parity`
