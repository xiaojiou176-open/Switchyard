# Switchyard 30-Second Overview

如果你只有 30 秒，那就记这 4 句：

1. `Switchyard` 不是聊天产品。  
2. 它是一个 `shared provider runtime for AI apps`。  
3. 它把 `BYOK + Web/Login` 这两类 AI 访问资格，统一成别的 AI 产品可接入的 service-first substrate。  
4. 它今天已经有 repo-native runtime、read-only MCP descriptor、runtime-diagnostics public skill packet、starter packs 和 truth-first public docs；Docker / registry / marketplace / package publication 仍是 later lanes。

## 一句话版本

> **`Switchyard` 是给 AI 产品接的总水管，不是另一个 AI App。**

## 它解决什么问题

- 不同产品反复重写 provider contract
- auth / session / diagnostics 到处散落
- 用户明明有订阅或网页登录态，但产品层只能吃 API key
- runtime truth、starter、compat、distribution 口径容易越说越乱

## 它今天能诚实说到哪

- `shared provider runtime`
- `BYOK + Web/Login`
- `service-first runtime frontdoor`
- `partial thin compat`
- `partial read-only MCP surface`
- `runtime-diagnostics` public skill packet
- `copy-ready starter packs`

## 它今天还不能诚实说什么

- `full Codex parity`
- `full Claude Code parity`
- `full OpenClaw parity`
- `published npm/runtime package`
- `official registry or marketplace listing`
- `MCP execution brain`

## 如果你下一步只做一件事

看：

- [docs/first-success.md](../first-success.md)

如果你下一步只想先看 proof：

- [docs/public-proof-pack.md](../public-proof-pack.md)
