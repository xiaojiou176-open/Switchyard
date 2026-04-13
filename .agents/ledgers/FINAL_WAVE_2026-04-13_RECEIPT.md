# Switchyard Final Wave Receipt — 2026-04-13

## Final Mainline Truth Lock

- current fact:
  - all repo-owned UIUX follow-up work is now fully mainlined
  - the stale remote branch `uiux-latest-main-polish` has been removed
  - latest `main` is the only surviving local and remote branch state
- fresh git truth:
  - local branch = `main`
  - local worktree count = `1`
  - remote heads = only `main`
  - open PR = `0`
  - open code-scanning alerts = `0`
- blocker type:
  - none on the repo-owned side
- remaining blockers:
  - `Claude = external-only blocker / account-action-required`
  - `Grok = external-only blocker / session-incomplete`
- next step:
  - none for this final-wave repo-owned contract

## Latest-Main UIUX Follow-Up Polish

- current fact:
  - one additional latest-main follow-up pass was allowed only because a fresh
    Chrome-only visual judgment still found 2 bounded high-ROI UIUX refinements
- changed in this pass:
  - `auth-portal`
    - hero-side metadata is quieter but remains WCAG-compliant
    - `account-action-required / session-incomplete / ready` first-screen
      hierarchy is stronger
  - `docs/index.html`
    - hero right rail is lighter and less tutorial-like
    - the front door remains answer-first but now carries less explanatory drag
  - `provider-debug-workbench`
    - intentionally left unchanged after fresh recheck because the page had
      already reached diminishing returns
- fresh evidence for this pass:
  - `pnpm exec vitest run tests/integration/auth-portal/auth-portal-shell.test.ts tests/integration/service-http/http-surface.integration.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
  - `pnpm typecheck` = `0`
  - `qa-02-axe`
    - auth portal = `0 violations`
    - docs front door = `0 violations`
- blocker type:
  - none
- next step:
  - mainline the two latest polished files and restore clean `main`

## Post-Closeout UIUX Extreme-Polish Addendum

- current fact:
  - after the original final-wave closeout landed on `main`, one additional
    bounded UIUX polish pass was executed locally on the same three visible
    surfaces
  - this pass stayed inside the frozen donor boundary and did not reopen
    runtime scope, docs tree governance, or quality-gate policy
- changed in this addendum pass:
  - `auth-portal`
    - `Login paths` now shows the recommended path inline and demotes the
      remaining choices into a secondary disclosure
    - repeated recommended-path noise is removed from the expanded list
    - hero metadata is quieter and first-screen urgency is stronger
  - `provider-debug-workbench`
    - `Current next step` is now the dominant hero-side action rail
    - `Current attach target` is quieter utility chrome
    - evidence trays remain narrow and the tray affordance label is neutralized
      to `Details`
  - `docs/index.html`
    - topbar remains hierarchical instead of equal-weight
    - hero right rail and route copy are lighter
    - first screen reads more like a productized docs foyer
- fresh evidence for this pass:
  - `pnpm exec vitest run tests/integration/auth-portal/auth-portal-shell.test.ts tests/unit/web/provider-debug-workbench-render.test.ts tests/integration/service-http/http-surface.integration.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - `4 files / 41 tests passed`
  - `pnpm typecheck` = `0`
  - `qa-02-axe`
    - auth portal = `0 violations`
    - workbench = `0 violations`
    - docs front door = `0 violations`
  - latest blocker-only judgments:
    - `l2-designer` = `non-blocker`
    - `l2-reviewer` = `no blocker`
- blocker type:
  - none
- next step:
  - mainline these three dirty working-tree files and return repo state to
    clean `main`

## Final State

- `repo-ready = yes`
- `submit-ready = yes`
- `platform-ready = no claim`
- `submission-done = no`
- `review-pending = no`
- `listed-live = out of scope`
- `product-surface-ready = yes`
- `docs-plane-ready = yes`
- `design-absorption-ready = yes`
- `quality-governance-ready = yes`
- `done-on-main = yes`

This closeout turn was limited to the active final-wave scope:

- `auth-portal` UI/UX endgame relock
- `provider-debug-workbench` UI/UX endgame relock
- `docs/index.html` public front-door relock
- fresh repo-side gate relock
- fresh live/browser relock with explicit `Claude / Grok` split

The repo-owned verdict for this turn is:

- visible surfaces are materially stronger and more productized
- docs front door stays answer-first instead of reverting to a file cabinet
- donor absorption remains aligned to the frozen `Linear / Raycast / Mintlify`
  boundary
- repo-side gates are green
- final live truth now converges to:
  - `ChatGPT / Gemini / Qwen = success`
  - `Claude / Grok = external-only`

## UIUX Endgame Ledger

### `auth-portal`

- current fact:
  - the first screen now behaves like a front-desk arrivals board instead of a
    two-layer triage wall
- changed in this turn:
  - the Web/Login detail wall was demoted into an explicit deeper shelf
  - the hero now asks one first question: who is ready, who needs owner
    action, and who still needs the browser seat finished
  - hash-driven drawer sync now opens the deeper shelf only when the reader
    asks for it
- evidence:
  - code: `packages/surfaces/http/src/auth-portal-shell.ts`
  - tests:
    - `tests/integration/auth-portal/auth-portal-shell.test.ts`
    - `tests/integration/service-http/http-surface.integration.test.ts`
  - live page: `http://127.0.0.1:4010/v1/runtime/auth-portal`
  - Chrome-DevTools snapshot + screenshot captured in this turn
  - `qa-02-axe` = `0 violations`
  - `l2-designer` = `non-blocker`
- blocker type:
  - none
- next step:
  - no human needed

### `provider-debug-workbench`

- current fact:
  - the workbench now reads like a diagnosis cockpit, not a generic engineering
    page
- changed in this turn:
  - hero density tightened
  - utility chrome and next-step guidance moved closer to the top
  - visual hierarchy around summary strips, verdict facts, and evidence drawers
    became more compact and more tool-like
- evidence:
  - code: `packages/surfaces/http/src/provider-debug-workbench.ts`
  - tests:
    - `tests/unit/web/provider-debug-workbench-render.test.ts`
    - `tests/integration/service-http/http-surface.integration.test.ts`
  - live page:
    - `http://127.0.0.1:4010/v1/runtime/providers/chatgpt/debug/workbench`
  - Chrome-DevTools snapshot + screenshot captured in this turn
  - `qa-02-axe` = `0 violations`
  - `l2-designer` = `non-blocker`
- blocker type:
  - none
- next step:
  - no human needed

## Public-vs-Internal Docs Ledger

- current fact:
  - the governed public first row remains:
    - `README.md`
    - `docs/index.html`
    - `docs/media/30-second-overview.md`
    - `docs/first-success.md`
    - `docs/public-proof-pack.md`
    - `docs/public-distribution-ledger.md`
    - `docs/api/service-http-reference.md`
  - public-but-demoted shelves remain:
    - `docs/public-surface-support-matrix.md`
    - `docs/runbooks/dev-bootstrap.md`
  - internal relocations from prior final-wave passes remain landed under
    `.agents/internal-docs/`
  - current docs count is still `99`
- changed in this turn:
  - `docs/index.html` was refreshed into a more Mintlify-like answer-first
    router with stronger primary-route emphasis and cleaner route-card
    hierarchy
  - no new public internal-working documents were promoted back into the front
    row
- evidence:
  - code: `docs/index.html`
  - tests:
    - `tests/integration/docs/frontdoor-docs.test.ts`
    - `tests/integration/docs/governance-drift.test.ts`
  - live page: `http://127.0.0.1:4185/docs/index.html`
  - Chrome-DevTools snapshot + screenshot captured in this turn
  - `qa-02-axe` = `0 violations`
  - `l2-designer` = `non-blocker`
  - `find docs -type f | wc -l` = `99`
- blocker type:
  - none inside the current active final-wave docs scope
- next step:
  - no human needed for repo-owned front-door governance

## Design Absorption Ledger

- current fact:
  - donor boundary remains frozen and executable:
    - `Linear` = runtime/authenticated shell grammar
    - `Raycast` = utility chrome only
    - `Mintlify` = docs/public reading rhythm only
- changed in this turn:
  - no donor contract file required new edits
  - current visible surfaces were freshly re-checked against the frozen donor
    contract and remained aligned
- evidence:
  - governing files:
    - `docs/contracts/design-mother-strategy.md`
    - `.stitch/DESIGN.md`
    - `design-system/MASTER.md`
    - `design-system/DONOR_ABSORPTION_LEDGER.md`
    - `design-system/switchyard-auth-portal/MASTER.md`
    - `design-system/switchyard-debug-cockpit/MASTER.md`
  - `l2-explorer` confirmed no new donor-boundary blocker in the current active
    surfaces
  - `l2-designer` confirmed no blocker-level surface drift against the frozen
    donor grammar
- blocker type:
  - none
- next step:
  - no human needed

## Quality Governance Ledger

- current fact:
  - repo-side quality gates are still real enforcement, not narrative-only
    scripts
- changed in this turn:
  - fresh receipts were regenerated against the newest UI/UX and docs-frontdoor
    changes
  - a repo-owned stale `9338` Chrome seat was detected, remediated, and then
    reclassified out of the final live blocker pack
- evidence:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`
  - `pnpm run test:docs-frontdoor` = `0`
  - `pnpm run test:coverage` = `0`
    - `Statements = 80.06%`
    - `Lines = 80.18%`
  - `pnpm run test:mutation:baseline` = `0`
    - mutation score = `96.85`
  - `pnpm run gate:pr` = `0`
  - `pnpm run gate:nightly:expensive` = `0`
  - `qa-02-axe` on:
    - auth portal = `0 violations`
    - workbench = `0 violations`
    - docs front door = `0 violations`
- blocker type:
  - none
- next step:
  - no human needed

## Verification Ledger

Fresh repo-side receipts for this turn:

- `git status --short --branch`
  - before git closeout: dirty `main...origin/main` with 7 repo-owned edits
  - after git closeout: clean `main...origin/main`
- `git worktree list`
  - one worktree on `main`
- `git branch -vv`
  - local only `main`
- `git ls-remote --heads origin`
  - remote only `main`
- `gh pr list --state open --limit 20`
  - none
- `gh api 'repos/xiaojiou176-open/Switchyard/code-scanning/alerts?state=open&per_page=100'`
  - `[]`
- `find docs -type f | wc -l`
  - `99`
- `pnpm typecheck`
  - `0`
- `pnpm test`
  - `0`
- `pnpm build`
  - `0`
- `pnpm run test:docs-frontdoor`
  - `0`
- `pnpm run test:coverage`
  - `0`
- `pnpm run test:mutation:baseline`
  - `0`
- `pnpm run gate:pr`
  - `0`
- `pnpm run gate:nightly:expensive`
  - `0`

Fresh live/browser receipts for this turn:

- first aggregate `pnpm run verify:web-login-live`
  - failed for repo-owned reason
  - symptom:
    - `9338 /json/version` and `/json/list` were healthy
    - `playwright connectOverCDP` hung after websocket connected
  - classification:
    - repo-owned stale isolated Chrome seat
- repo-owned remediation completed in-turn:
  - terminate only the explicit repo-owned Chrome PID bound to `9338`
  - rerun `pnpm run bootstrap:web-login-browser -- --provider chatgpt --json`
  - prove attach recovery with a fresh `playwright-core connectOverCDP` check
- provider-scoped reruns after remediation:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt`
    - `success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini`
    - `success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen`
    - `success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider claude`
    - `external-blocker / account-action-required`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider grok`
    - `external-blocker / session-incomplete`
- final aggregate `pnpm run verify:web-login-live`
  - exit code = `2`
  - final truth:
    - `ChatGPT = success`
    - `Gemini = success`
    - `Qwen = success`
    - `Claude = external-blocker / account-action-required`
    - `Grok = external-blocker / session-incomplete`
- blocker-only verdicts:
  - `l2-reviewer` = `no blocker`
  - `l2-designer` = `non-blocker`

## External Blocker Ledger

### `Claude`

- current fact:
  - browser session proves, but the account is blocked upstream
- classification:
  - `external-only blocker`
- evidence:
  - `verify-web-login-live --provider claude`
  - HTTP `403` with `subscription_past_due`
- next step:
  - owner restores subscription/account access
  - rerun provider-scoped live gate

### `Grok`

- current fact:
  - cookie material exists, but the browser still lands on a public/login state
    rather than an authenticated workspace
- classification:
  - `external-only blocker`
- evidence:
  - `verify-web-login-live --provider grok`
  - attached browser page remains `https://grok.com/`
  - workspace classification = `session-incomplete`
- next step:
  - owner finishes sign-in / human verification inside the Switchyard browser
    seat
  - rerun provider-scoped live gate

## Git Closure Ledger

- current local state after closeout:
  - branch = `main`
  - worktrees = one
  - working tree = clean
- current remote state after closeout:
  - heads = only `main`
  - open PRs = `0`
  - code-scanning alerts = `0`
- this turn created no new long-lived branch and no open PR

## Explicitly Deferred

Only these remain outside repo-owned final-wave closure:

- `Claude` owner account-action recovery
- `Grok` owner login / human-verification completion
- broader publication / listing / marketplace / hosted control-plane claims
