# Wave 5 Verification Ledger

Updated: 2026-04-13 PDT
Owner: L1 Wave 5 Commander

## Repo-Side Receipts

- `git status --short --branch`
  - clean `main...origin/main` before this wave patch; final git closeout rechecked separately
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

## Chrome / QA Evidence

- docs front door screenshot:
  - `.runtime-cache/wave5-final-qa/docs-index.png`
- `qa-02-axe scan_html` on the current `docs/index.html`
  - `violations = []`

## Final Gates

- `l2-reviewer` final verdict
  - `no blocker`
- `l2-designer` final verdict
  - `NO BLOCKER`

## Live Receipts

### Final stable same-turn receipts

- `pnpm run verify:service-live` = `2`
  - first failing provider = `claude`
  - blocker = `claude-account-action-required`
  - classification = `account-action-required`
- `pnpm run verify:web-login-live` = `2`
  - `chatgpt = success`
  - `gemini = success`
  - `claude = external-blocker / account-action-required`
  - `grok = external-blocker / session-incomplete`
  - `qwen = success`
- `pnpm run reality:gate` = `2`
  - `repoOwnedGate.verdict = pass`
  - `successCount = 4`
  - `externalBlockerCount = 2`
  - `failureCount = 0`

### ChatGPT transport-instability recovery receipt

- late-turn provider-scoped `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt` temporarily regressed to:
  - `chatgpt-cdp-unavailable / transport-instability`
- repo-owned remediation attempted:
  - identified the dedicated Switchyard Chrome root on `127.0.0.1:9338`
  - recycled that single repo-owned Chrome process
  - reran `pnpm run bootstrap:web-login-browser -- --provider chatgpt`
  - confirmed a minimal `playwright-core.connectOverCDP('http://127.0.0.1:9338')` probe could list the ChatGPT page again
- post-remediation receipt:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt` = `0`
  - `chatgpt = success`
