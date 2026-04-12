# Switchyard Public Proof Pack

This page does **not** claim that Switchyard has already finished every lane,
provider, compat route, or distribution surface.

It exists to answer one narrower question:

> **What can this repository honestly prove today?**

## One-Line Verdict

Today Switchyard can be honestly proved as:

- a `shared provider runtime for AI apps`
- a `BYOK + Web/Login` service-first substrate
- a builder-facing runtime repo with partial thin compat, a partial read-only
  MCP surface, and copy-ready starter packs

## Four Things This Repo Can Prove Today

### 1. The repo-side gate is real

This is not just "the docs look polished." The repo has fresh repo-side
evidence:

- `pnpm typecheck` = `0`
- `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts tests/integration/docs/package-ready-distribution.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts` = `0`
  - `5 files / 43 tests passed`
- `pnpm build` = `0`

### 2. The service-first runtime front door is real

Start here:

- [docs/api/service-http-reference.md](./api/service-http-reference.md)
- [docs/api/openapi.yaml](./api/openapi.yaml)
- [examples/runtime-bridge/README.md](../examples/runtime-bridge/README.md)

Minimal invoke proof:

```bash
pnpm run start:service-local
pnpm run example:runtime-bridge
```

### 3. The read-only MCP surface is not just marketing copy

Minimal read-only proof:

```bash
pnpm run example:mcp-inspector
```

That proves:

- the MCP server boots
- the tool inventory is readable
- `switchyard.runtime.health` is readable
- the same runtime truth can also be opened through a thin local browser-facing
  auth/debug shell

That does **not** prove:

- a write plane
- an execution brain
- runtime invoke through MCP

### 4. The public boundary is written down, not implied

Current public truth is intentionally layered:

- `HTTP / API` = `supported now`
- `SDK/client` = `partial`
- `CLI` = `partial`
- `MCP` = `partial / read-only`
- `Codex / Claude Code / OpenClaw compat` = `partial / thin / fail-closed`
- local auth/debug HTML pages stay thin and read-only over the same runtime
  truth; they are not a hosted control plane

Use these pages:

- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
- [docs/compat/README.md](./compat/README.md)

## Current Live Truth For This Workspace

This section must stay conservative because live reality is never a repo
constant.

For the current credentialed workstation, the front door should sync to this
wording instead of copying an old scorecard:

- `repo-side gate = green`
- fresh `pnpm run verify:service-live` currently stops at
  `Claude = account-action-required`
- the current workspace external blocker pack is `Claude / Grok`
- detailed aggregate wording belongs in credentialed-workstation proof, not in
  every front-door page

In plain English:

- the repo is not blocked on internal engineering debt
- the current stop is workstation-specific browser/session/user action reality
- a different machine, cookie bundle, or browser user agent may change the
  outcome

## Minimal Proof Bundle

If you want the fastest "I believe this is real" route, run these in order:

### A. Prove the service is alive

```bash
pnpm run start:service-local
```

### B. Prove the read-only truth surface is reachable

```bash
pnpm run example:mcp-inspector
```

### C. Prove one bounded invoke path can run

```bash
pnpm run example:runtime-bridge
```

### D. If you are already on a credentialed workstation, run aggregate reality

```bash
pnpm run reality:gate
```

## Allowed Claims Now

You can honestly claim:

- `shared provider runtime`
- `BYOK + Web/Login`
- `API substrate first`
- `service-first runtime frontdoor`
- `partial thin compat`
- `partial read-only MCP surface`
- `copy-ready starter packs`
- `package-ready / starter-pack-ready / not officially listed yet`

## Forbidden Overclaims

You cannot honestly claim:

- `full Codex parity`
- `full Claude Code parity`
- `full OpenClaw parity`
- `MCP execution brain`
- `officially listed in a marketplace or registry`
- `all Web/Login providers are live-ready on every machine`

## Related Pages

- [docs/media/30-second-overview.md](./media/30-second-overview.md)
- [docs/first-success.md](./first-success.md)
- [examples/README.md](../examples/README.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
