# Wave 5 Quality Governance Reinforcement Ledger

Updated: 2026-04-13 PDT
Owner: L1 Wave 5 Commander
Status: re-locked

## Fresh Repo-Side Baseline

- `pnpm typecheck` = `0`
- `pnpm test` = `0`
- `pnpm build` = `0`
- `pnpm run test:docs-frontdoor` = `0`
- `pnpm run test:coverage` = `0`
  - `Statements = 80.03%`
  - `Lines = 80.15%`
- `pnpm run test:mutation:baseline` = `0`
  - mutation score `96.85`
- `pnpm run gate:pr` = `0`
- `pnpm run gate:nightly:expensive` = `0`

## Landed in this wave

### 1. Coverage truth got stricter

- `vitest.config.ts`
  - added `coverage.include` for `apps/**/src` and `packages/**/src`
  - excluded thin BYOK descriptor entry modules from the coverage set because they are declarative catalog shells already validated indirectly through registry/capability tests

### 2. Thin entrypoint coverage got real

New tests now execute the previously weak entry layers:

- `tests/unit/byok/provider-descriptor-entrypoints.test.ts`
- `tests/unit/mcp/switchyard-mcp-cli.test.ts`
- `tests/unit/web/service-main.test.ts`
- `tests/unit/web/grok-browser-session-transport.test.ts`

### 3. Reality gate mutation hardening improved materially

- `tests/unit/web/reality-gate-governance.test.ts`
- `tests/unit/web/reality-gate-script.test.ts`

Current mutation score rose to `96.85`, which is no longer a “barely passing” baseline.

### 4. Browser proof artifacts got stronger

- `scripts/browser-debug-support.mjs`
  - support bundles now record `tracePath` and `traceMode`
- `tests/unit/web/browser-debug-support.test.ts`
  - verifies trace start/stop wiring

## Why this is now trustworthy

- coverage is no longer “imported files only by accident”
- mutation is no longer a barely passing checkbox
- docs/frontdoor drift is still protected by dedicated integration tests
- repo-owned gates were rerun after the final fixture/test updates and stayed green

## Remaining later-lane ideas (not blockers)

- outward-only `axe` gate for public pages
- Lighthouse CI for public front door / docs
- screenshot-baseline regression system under Playwright Test, if the repo ever decides it is worth the extra runner and artifact discipline
