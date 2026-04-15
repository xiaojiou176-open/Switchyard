# Wave 3 Consumer Seam Matrix

## Status

`partial landed`

说得更直白一点：

> `Wave 3` 现在已经不是一团雾了。  
> 但它也还没有全部施工完成。

当前 5 个 consumer 的状态已经不再是“有人在门外，有人还没拿号”。  
更诚实的说法是：

- 5 仓都已经出现 **landed but bounded** 的合法接缝
- 但每一仓都仍保留自己的产品壳和 stop line
- `Wave 3` 现在的任务不是发明第二条 seam，而是把这些 seam 做成 durable closure

---

## Purpose

这页的作用不是写愿景，而是把当前 5 个 consumer 的最新真相钉死：

- 哪些已经有合法接缝
- 哪些现在不该继续乱改
- 哪些 clean worktree 已经准备好，可以继续 bounded 实装

---

## Current Matrix

| Repo | Current verdict | What is true now | What is still not true | Clean worktree |
| --- | --- | --- | --- | --- |
| `campus-copilot` | `landed but bounded` | `apps/api` thin BFF bridge 已存在，fresh API tests + healthcheck 通过 | 这不等于 whole consumer contract landed | `campus-wave3` |
| `DealWatch` | `landed but bounded` | `switchyard_service` seam 已存在，clean-worktree repo-owned tests可通过 | 这不等于 compare/recommendation/evidence 语义迁出本仓 | `dealwatch-wave3` |
| `Shopflow` | `landed but bounded` | `ADR-004` + `packages/contracts` + `packages/core` 已落 seam contract 和 thin route builder，且当前 `main` clean、最新 seam commits 已在主线 | 这不等于 merchant live proof、review queue 或 storefront truth 迁进 `Switchyard` | `shopflow-wave3` |
| `apple-notes-snapshot` | `landed but bounded` | `./notesctl ai-diagnose` 已切到本地 `Switchyard` runtime，且 deterministic fallback 仍保留 | 这不等于 notes MCP / local API / launchd 主线迁进 `Switchyard` | `notes-wave3` |
| `multi-ai-sidepanel` | `landed but bounded` | 当前 committed repo truth 已有 maintainer-local / partial `switchyard_runtime` analyst lane | 这不等于 compare-first cockpit、tab orchestration、browser-native workflow 迁进 `Switchyard` | `sidepanel-wave3` |

---

## File-Anchored Evidence

### `campus-copilot`

- existing thin bridge lives at:
  - `<campus-copilot>/apps/api/src/index.ts`
  - `<campus-copilot>/apps/api/src/index.test.ts`
- clean-worktree validation passed:
  - `pnpm typecheck`
  - `pnpm --filter @campus-copilot/api test`
  - `bash scripts/api-healthcheck.sh`

### `DealWatch`

- existing seam lives at:
  - `<DealWatch>/src/dealwatch/application/ai_integration.py`
  - `<DealWatch>/src/dealwatch/infra/config.py`
- clean-worktree repo-owned gate passed:
  - `uv sync`
  - `./scripts/test.sh -q`

### `Shopflow`

- seam contract already exists at:
  - `<shopflow-wave3>/packages/contracts/src/provider-runtime-seam.ts`
  - `<shopflow-wave3>/packages/core/src/provider-runtime-bridge.ts`
- governing ADR:
  - `<shopflow-wave3>/docs/adr/ADR-004-switchyard-provider-runtime-seam.md`
- clean-worktree gate truth:
  - seam branch contains committed thin runtime boundary artifacts
  - but fresh `pnpm verify:release-readiness` rerun still hit coverage tmp `ENOENT`, so closure remains reviewable-only

### `apple-notes-snapshot`

- committed bounded Switchyard seam now lives at:
  - `<apple-notes-snapshot-wave3>/README.md`
  - `<apple-notes-snapshot-wave3>/scripts/ops/ai_diagnose.py`
  - `<apple-notes-snapshot-wave3>/docs/releases/v0.1.6.md`
- clean-worktree truth:
  - `./notesctl ai-diagnose` routes model invocation through a local Switchyard runtime
  - deterministic fallback still holds when the runtime is unavailable or disabled

### `multi-ai-sidepanel`

- current committed bounded seam now lives at:
  - `<multi-ai-sidepanel>/src/background/switchyardRuntime.ts`
  - `<multi-ai-sidepanel>/src/services/analysis/providers/switchyardRuntime.ts`
  - `<multi-ai-sidepanel>/src/background/productActions.ts`
- committed repo truth:
  - the `switchyard_runtime` lane is maintainer-local / partial
  - compare-first/browser-native cockpit remains local to Prompt Switchboard

---

## Hard Boundaries

### What `Switchyard` may take

- provider runtime invoke
- auth/session status
- diagnostics/remediation
- builder-facing thin adapter

### What must stay in consumer repos

- storefront truth
- student/workbench semantics
- notes workflow / local API / MCP mainline
- compare-first UI / tab orchestration / browser-native workflow

---

## Decision Summary

> `Wave 3` 当前最诚实的状态不是 “全部还没开始”，也不是 “所有 consumer 都已经彻底迁完”。  
>
> 它现在已经有五条 **landed but bounded** 的 consumer seams。  
> 下一步不是继续发明 seam，而是把这些 seam 一仓一仓关门、验收、Git-close。
