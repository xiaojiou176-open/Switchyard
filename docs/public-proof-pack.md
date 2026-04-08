# Switchyard Public Proof Pack

这页不是在喊：

> `Switchyard` 已经把所有 lane、所有 provider、所有 compat、所有 distribution 都做完了。

更直白一点说：

> 这页只负责回答：
>
> **今天这个仓到底已经能证明什么。**

## 一句话版本

`Switchyard` 当前已经能被诚实地证明成：

- 一个 `shared provider runtime for AI apps`
- `BYOK + Web/Login` 双 lane 的 service-first substrate
- 带有 partial thin compat、partial read-only MCP、copy-ready starter packs 的 builder-facing runtime repo

## 今天能证明的 4 件事

### 1. Repo-side gate 是真的

这不是“文档看起来很认真”。

当前这仓已经有 fresh repo-side evidence：

- `pnpm typecheck` = `0`
- `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts tests/integration/docs/package-ready-distribution.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts` = `0`
  - `5 files / 43 tests passed`
- `pnpm build` = `0`

### 2. Service-first runtime frontdoor 是真的

你可以直接走：

- [docs/api/service-http-reference.md](./api/service-http-reference.md)
- [docs/api/openapi.yaml](./api/openapi.yaml)
- [examples/runtime-bridge/README.md](../examples/runtime-bridge/README.md)

最小 invoke 证明命令是：

```bash
pnpm run start:service-local
pnpm run example:runtime-bridge
```

### 3. Read-only MCP surface 不是口号

最小 read-only proof 命令是：

```bash
pnpm run example:mcp-inspector
```

它能证明：

- MCP server 能起
- tool inventory 能列
- `switchyard.runtime.health` 能读

但它不证明：

- write plane
- execution brain
- runtime invoke through MCP

### 4. Public surface 的边界是被写清楚的

当前公开说法不是“全支持”，而是按 truth table 分层：

- `HTTP / API` = `supported now`
- `SDK/client` = `partial`
- `CLI` = `partial`
- `MCP` = `partial / read-only`
- `Codex / Claude Code / OpenClaw compat` = `partial / thin / fail-closed`

看这几页就够：

- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
- [docs/compat/README.md](./compat/README.md)

## 当前这台 workspace 的 latest live truth

这部分一定要用最保守、最诚实的话来说。

因为 live gate 永远不是 repo 常量。

当前这台 workspace 上，front door 现在该同步成下面这句，而不是继续贴旧成绩单：

- `repo-side gate = green`
- fresh `pnpm run verify:service-live` 当前停在 `Gemini = user-action-required`
- current workspace external blocker pack = `Gemini / Grok`
- detailed aggregate wording 仍然属于 credentialed workstation truth，不应在多个 frontdoor 页面重复抄写

翻成人话：

- repo 自己没有卡在内部工程债
- 当前卡住的是这台机器上的网页登录会话还需要真人补动作，或者继续处理外部 browser/session 问题
- 换一台机器、换一组 cookie bundle、换一套 browser user agent，结论都可能变

## 最小证明包

如果你只想最快做一轮“我信它是真的”的验证，按这个顺序：

### A. 先证明 service 活着

```bash
pnpm run start:service-local
```

### B. 先证明 read-only truth 能被读到

```bash
pnpm run example:mcp-inspector
```

### C. 再证明最小 invoke 能打通

```bash
pnpm run example:runtime-bridge
```

### D. 如果你就在 credentialed workstation 上，再跑 aggregate reality

```bash
pnpm run reality:gate
```

## Allowed Claims Now

现在可以诚实说：

- `shared provider runtime`
- `BYOK + Web/Login`
- `API substrate first`
- `service-first runtime frontdoor`
- `partial thin compat`
- `partial read-only MCP surface`
- `copy-ready starter packs`
- `package-ready / starter-pack-ready / not officially listed yet`

## Forbidden Overclaims

现在不能诚实说：

- `full Codex parity`
- `full Claude Code parity`
- `full OpenClaw parity`
- `MCP execution brain`
- `officially listed in marketplace / registry`
- `all Web/Login providers are live-ready on every machine`

## Related Pages

- [docs/media/30-second-overview.md](./media/30-second-overview.md)
- [docs/first-success.md](./first-success.md)
- [examples/README.md](../examples/README.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
