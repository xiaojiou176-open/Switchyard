# Wave 5 Thin Compat Starter

This internal working pack moved out of the public docs plane.

- New internal path:
  - [`../wave5/wave5-thin-compat-starter.md`](../wave5/wave5-thin-compat-starter.md)
- Why it moved:
  - the public `partial / fail-closed` truth for Wave 5 now lives on outward
    surfaces such as `docs/compat/*`, `docs/public-surface-support-matrix.md`,
    and the current wave ledger
  - this file is the internal starter-boundary contract for how thin compat
    landed, not a first-row public explainer
- Public readers should start from:
  - [`docs/README.md`](../../../docs/README.md)
  - [`docs/public-surface-support-matrix.md`](../../../docs/public-surface-support-matrix.md)
  - [`docs/compat/README.md`](../../../docs/compat/README.md)
  - [`docs/public-proof-pack.md`](../../../docs/public-proof-pack.md)

This stub stays here so older links do not dead-end.

---

## Decision Summary

> `Wave 5` 现在已经不只是“边界写死”。  
> 它已经把 very thin runtime adapters 真正落进 repo。  
> 但 tool / MCP / execution brain 仍然一律留在 consumer。
