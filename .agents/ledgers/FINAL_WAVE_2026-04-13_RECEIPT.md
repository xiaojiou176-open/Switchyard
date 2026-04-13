# Switchyard Final Wave Receipt — 2026-04-13

## Final State

- `repo-ready = yes`
- `submit-ready = yes` for repo-owned closeout
- `platform-ready = no claim`
- `submission-done = no`
- `review-pending = no`
- `listed-live = out of scope`
- `product-surface-ready = yes`
- `docs-plane-ready = yes`
- `design-absorption-ready = yes`
- `quality-governance-ready = yes`
- `done-on-main = yes`

The repo-owned final wave now resolves to:

- `auth-portal` and `provider-debug-workbench` converge on builder-facing,
  verdict-first product surfaces
- public docs front door is materially narrower and no longer behaves like a
  full-repo warehouse list
- donor absorption is frozen as an executable contract for runtime surfaces and
  docs/public surfaces
- repo-side gates are green and only external blockers remain

## UIUX Endgame Ledger

- `auth-portal`
  - status: complete for repo-owned final wave
  - evidence:
    - `http://127.0.0.1:4010/v1/runtime/auth-portal`
    - final designer verdict = `no blocker`
    - axe scan = 0 violations
- `provider-debug-workbench`
  - status: complete for repo-owned final wave
  - key fix:
    - ready-vs-blocked truth mapping now fail-closes across
      `currentPage.classification` and `auth.session.state`
  - evidence:
    - `tests/unit/web/provider-debug-workbench-render.test.ts`
    - `tests/integration/service-http/http-surface.integration.test.ts`
    - final designer verdict = `no blocker`

## Public-vs-Internal Docs Ledger

- public keep:
  - `README.md`
  - `docs/index.html`
  - `docs/media/30-second-overview.md`
  - `docs/first-success.md`
  - `docs/public-proof-pack.md`
  - `docs/public-distribution-ledger.md`
  - `docs/api/service-http-reference.md`
- public keep but demote:
  - `docs/public-surface-support-matrix.md`
  - `docs/runbooks/dev-bootstrap.md`
- internal relocate:
  - `docs/submission-packet-ledger.md` ->
    `.agents/internal-docs/distribution/submission-packet-ledger.md`
- stale/remove from front door:
  - wide atlas links to compat/compare/catalog/schema shelves are removed from
    `docs/README.md`

Current docs count after relocation:

- `find docs -type f | wc -l` = `99`

## Design Absorption Ledger

- canonical donor boundary:
  - `Linear` = authenticated runtime/workbench shell
  - `Raycast` = utility chrome only
  - `Mintlify` = docs/public reading rhythm and answer-first routing
- operationalized in:
  - `.stitch/DESIGN.md`
  - `design-system/MASTER.md`
  - `design-system/DONOR_ABSORPTION_LEDGER.md`
- docs/public exception now explicit:
  - `Inter` is allowed only on `Mintlify`-governed docs/public surfaces
  - runtime/operator surfaces still default to `IBM Plex Sans + JetBrains Mono`

## Quality Governance Ledger

- fixed:
  - `stryker.config.mjs` now ignores volatile `.runtime-cache/**` so Stryker no
    longer copies mutable browser profile artifacts into its sandbox
- enforced:
  - `provider-debug-workbench` render logic now has targeted regression coverage
    for ready, session-incomplete, account-action, human-verification, and
    fallback `user-action-required` paths
- verified:
  - `test:coverage` = pass
  - `test:mutation:baseline` = pass
  - `gate:pr` = pass
  - `gate:nightly:expensive` = pass

## Verification Ledger

Fresh receipts for this final wave:

- `git status --short --branch` = clean `main...origin/main`
- `git worktree list` = one worktree on `main`
- `git branch -vv` = local only `main`
- `git ls-remote --heads origin` = remote only `main`
- `gh pr list --state open --limit 20` = none
- `gh api 'repos/xiaojiou176-open/Switchyard/code-scanning/alerts?state=open&per_page=100'` = `[]`
- `pnpm typecheck` = `0`
- `pnpm test` = `0`
- `pnpm build` = `0`
- `pnpm run test:docs-frontdoor` = `0`
- `pnpm run test:coverage` = `0`
  - `Statements = 80.06%`
  - `Lines = 80.18%`
- `pnpm run test:mutation:baseline` = `0`
  - mutation score `96.85`
- `pnpm run gate:pr` = `0`
- `pnpm run gate:nightly:expensive` = `0`
- `pnpm run verify:service-live` = `2`
  - first fail = `Claude`
  - classification = `account-action-required`
- `pnpm run verify:web-login-live` = `2`
  - `ChatGPT / Gemini / Qwen = success`
  - `Claude = external-blocker`
  - `Grok = external-blocker`
- `pnpm run reality:gate` = `2`
  - `repoOwnedGate.verdict = pass`
  - `successCount = 4`
  - `externalBlockerCount = 2`
  - `failureCount = 0`
- QA / visual:
  - `qa-02-axe` on auth portal = 0 violations
  - `qa-02-axe` on workbench = 0 violations
  - `qa-02-axe` on docs front door = 0 violations
  - final designer verdict = `no blocker`
  - final reviewer verdict = `no blocker`

## External Blocker Ledger

- `Claude`
  - class: `external-only blocker`
  - state: `account-action-required`
  - exact next step:
    - restore account/subscription access
    - rerun `bootstrap:web-login-browser -- --provider claude`
    - rerun provider-scoped live gate
- `Grok`
  - class: `owner-manual later`
  - state: `session-incomplete`
  - exact next step:
    - reopen Grok in the Switchyard browser seat
    - finish sign-in or human verification
    - rerun provider-scoped live gate

## Git Closure Ledger

- intermediate closeout PRs merged in this wave:
  - `#27 Close final wave repo-owned gaps`
  - `#28 Relocate submission packet ledger`
- current local state:
  - branch = `main`
  - worktrees = one
  - working tree = clean
- current remote state:
  - heads = only `main`
  - open PRs = 0
  - code scanning alerts = 0

## Explicitly Deferred

Only these remain outside repo-owned closeout:

- `Claude` owner/manual account-action recovery
- `Grok` owner/manual login or human-verification recovery
- anything beyond this repo-owned final wave, such as publication/listing/live
  distribution claims
