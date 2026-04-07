# Wave 1 Runtime Closeout Rerun

## Context

- Date: `2026-04-03`
- Time zone: `America/Los_Angeles`
- Repo: `Switchyard`
- Purpose: capture a fresh `Wave 1 / L1-A` rerun record without mutating shared truth-source docs

## Final State

> **`WAVE1A NOT DONE - INTERNAL BLOCKERS REMAIN`**

更直白一点说：

- `ChatGPT / Gemini` 仍然是 **true external session blockers**
- `Grok` fresh provider-scoped rerun 也收敛成 **external session blocker**
- `Claude` fresh provider-scoped rerun 仍然成功
- 但当前工作站出现了大规模本地回环连接异常（`EADDRNOTAVAIL`），已经把 standalone `pnpm test`、`app-service` E2E、`surface-http` integration、以及 post-patch `reality:gate` internal gate 一起拖红

所以这轮不能诚实地写成 “only true external actions remain”

## Fresh Git Truth

- Current branch: `main`
- Worktree at rerun capture time: **dirty**
- `HEAD = main = origin/main = 39a3dfbb8711f9f6b4ad85eb3c1dba6126370e4d`
- `git remote origin = https://github.com/xiaojiou176-open/Switchyard.git`
- Earlier `gh pr status` / `gh repo view` attempts failed on this workstation with `connect: can't assign requested address`

## Fresh Runtime Truth

### Static Gates

- `pnpm typecheck` = `0`
- `pnpm build` = `0`
- `pnpm exec vitest run tests/unit/web/live-proof.test.ts --config vitest.config.ts` = `0`
- standalone `pnpm test`:
  - pre-patch rerun once = `0`
  - post-patch rerun = `1`
  - current dominant failure mode = repeated local loopback `EADDRNOTAVAIL`
- `pnpm --filter @switchyard/app-service test:e2e` = `1`
  - all failing cases showed `connect EADDRNOTAVAIL 127.0.0.1:*`

### Live Gates

- `pnpm run verify:gemini-live` = `0`
  - `geminiByok = success`

- `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt` = `2`
  - `chatgpt = external-blocker / chatgpt-browser-session-incomplete / session-incomplete`
  - fresh browser evidence shows logged-out landing page, not authenticated workspace

- `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini` = `2`
  - `gemini = external-blocker / gemini-browser-session-invalid / session-incomplete`
  - fresh browser evidence shows Google sign-in / unauthenticated Gemini state

- `pnpm exec node scripts/verify-web-login-live.mjs --provider claude` = `0`
  - `claude = success`

- `pnpm exec node scripts/verify-web-login-live.mjs --provider grok` = `2`
  - `grok = external-blocker / grok-browser-session-incomplete / session-incomplete`

- `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen` = `1`
  - `qwen = failure / provider-unavailable / qwen invoke proof timed out after 60000ms`
  - current evidence suggests this is part of the same workstation-level instability wave, not a proven repo regression

- aggregate `pnpm run verify:web-login-live`
  - earlier fresh rerun completed with `exit 1`
  - web summary at that time = `success 2 / external-blocker 2 / failure 2`
  - later rerun entered abnormal long-run behavior and was not stable enough to use as the sole truth anchor

- `pnpm run verify:service-live` post-patch = `2`
  - now honestly maps `chatgpt` to `external-blocker / chatgpt-browser-session-incomplete`
  - this is narrower and more truthful than the earlier `service-invoke-failed / page closed` result

- `pnpm run reality:gate` post-patch = `1`
  - `internalGate.passed = false`
  - `typecheck = 0`
  - `test = 1`
  - `build = 0`
  - `liveGate` skipped because internal gate failed

## What Changed

- `packages/lanes/web/src/live-proof.ts`
- `packages/providers/web/grok/src/browser-dom-transport.ts`
- `scripts/verify-service-live.mjs`
- `tests/unit/web/live-proof.test.ts`

## Why These Changes Were Made

### 1. Shared live-proof fetches now tolerate one transient transport miss

`packages/lanes/web/src/live-proof.ts`

- added a single retry around thrown probe fetch failures
- purpose: avoid classifying a one-off `fetch failed` as durable provider failure too early

### 2. Grok CDP retry now recognizes the fresh workstation error we actually saw

`packages/providers/web/grok/src/browser-dom-transport.ts`

- added `EADDRNOTAVAIL` to the recoverable CDP connect error set
- purpose: stop treating this transient local connect failure as an unrecoverable provider failure on first sight

### 3. `verify:service-live` now retries managed-browser recovery before declaring failure

`scripts/verify-service-live.mjs`

- added a managed-browser bootstrap retry path for closed-page / destroyed-context / CDP-style failures
- purpose: align `service-live` with the more honest Web/Login closeout behavior
- outcome: the script now returns `chatgpt-browser-session-incomplete` instead of the noisier `service-invoke-failed / Target page ... has been closed`

### 4. Added a real regression test for the shared probe retry

`tests/unit/web/live-proof.test.ts`

- added a Claude live-proof test that fails once, then succeeds on retry
- purpose: prove the new retry path is real, not placebo

## Auto-Unblock Ledger

### ChatGPT

Attempted non-human paths:

1. provider-scoped verifier rerun
2. managed-browser ensure-only attach
3. direct CDP DOM/page-state inspection
4. existing Chrome profile path
5. existing browser session path
6. explicit donor-session attach via `9444`
7. donor capture into temp store
8. store-first record inspection

Result:

- all reasonable non-human paths were exhausted
- blocker remains **true external**
- minimal human action = re-authenticate ChatGPT inside the managed browser until the real composer workspace is visible

### Gemini

Attempted non-human paths:

1. provider-scoped verifier rerun
2. managed-browser ensure-only attach
3. direct CDP page snapshot
4. classification logic cross-check

Result:

- blocker remains **true external**
- minimal human action = re-authenticate Gemini / Google in the managed browser until the authenticated composer is visible

### Claude

Attempted non-human path:

1. provider-scoped verifier rerun

Result:

- fresh rerun = `success`
- aggregate failure evidence appears non-durable

### Grok

Attempted non-human path:

1. provider-scoped verifier rerun

Result:

- fresh rerun = `external-blocker / grok-browser-session-incomplete`
- this is narrower and more honest than the earlier aggregate `probe-request-failed`

### Qwen

Attempted non-human path:

1. provider-scoped verifier rerun

Result:

- current rerun timed out
- under the same workstation state, many unrelated local HTTP tests also failed with `EADDRNOTAVAIL`
- so Qwen is not yet safely classifiable as a pure provider regression

## Gate Convergence Verdict

### What converged better after this rerun

- `verify:service-live` now speaks a more honest ChatGPT truth
- it no longer stops at the noisier `page closed` failure wording
- it now converges with the ChatGPT `session-incomplete` story seen in provider-scoped Web/Login reruns

### What still does not converge

- `reality:gate` cannot currently reach its live truth layer because internal `test` is being red-lined by workstation loopback instability
- aggregate `verify:web-login-live` is still less trustworthy than provider-scoped reruns under the current workstation pressure

### Current shared failure source

The strongest shared non-repo signal is:

> **massive local loopback pressure on this workstation**

Fresh environment evidence:

- `127.0.0.1 ESTABLISHED` connections observed: `32152`
- dominant owners in `lsof` sample:
  - `codex`: `16033`
  - `node`: `14204`

This aligns with the repeated `connect EADDRNOTAVAIL 127.0.0.1:*` failures seen across:

- `surface-http` integration
- `app-service` e2e
- post-patch `reality:gate` internal `test`
- some provider-scoped live reruns

## Verification Ledger

### Repo / Git

- `git status --short --branch` → `0`
- `git branch --show-current` → `0`
- `git branch --list --all` → `0`
- `git rev-parse --abbrev-ref HEAD` → `0`
- `git rev-parse HEAD` → `0`
- `git rev-parse main` → `0`
- `git rev-parse origin/main` → `0`
- `git remote -v` → `0`
- `gh pr status` → `1`
- `gh repo view xiaojiou176-open/Switchyard --json nameWithOwner,visibility,url,defaultBranchRef` → `1`

### Static / Validation

- `pnpm typecheck` → `0`
- `pnpm build` → `0`
- `pnpm exec vitest run tests/unit/web/live-proof.test.ts --config vitest.config.ts` → `0`
- `pnpm test` → `1`
- `pnpm --filter @switchyard/app-service test:e2e` → `1`

### Live

- `pnpm run verify:gemini-live` → `0`
- `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt` → `2`
- `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini` → `2`
- `pnpm exec node scripts/verify-web-login-live.mjs --provider claude` → `0`
- `pnpm exec node scripts/verify-web-login-live.mjs --provider grok` → `2`
- `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen` → `1`
- `pnpm run verify:service-live` → `2`
- `pnpm run reality:gate` → `1`

### Environment

- `netstat -anp tcp | rg '127\\.0\\.0\\.1\\.' | awk '{print $6}' | sort | uniq -c` → `0`
  - `ESTABLISHED = 32152`
- `lsof -nP -iTCP -sTCP:LISTEN | rg 'node|Chrome|Chromium'` → `0`
- `lsof -nP -iTCP -sTCP:ESTABLISHED | awk 'NR>1 {print $1}' | sort | uniq -c | sort -nr | head -20` → `0`
  - top owners sampled: `codex`, `node`
- `sysctl net.inet.ip.portrange.first net.inet.ip.portrange.last net.inet.tcp.msl` → `0`

## Remaining Gaps

### True external actions

These remain real end-user actions:

1. Re-login ChatGPT in the managed browser until the real composer workspace is visible
2. Re-login Gemini in the managed browser until the real composer workspace is visible
3. Reopen Grok in the Switchyard browser and restore a trustworthy authenticated composer surface

### Internal / environment blockers still remaining

These are why this rerun is still `NOT DONE`:

1. current workstation loopback instability (`EADDRNOTAVAIL`) is red-lining internal test gates
2. aggregate `verify:web-login-live` remains less stable than provider-scoped reruns under this workstation condition
3. `Qwen` could not be cleanly reclassified under the current saturated workstation state

### Explicit do-not-do

- Do not rewrite shared truth-source docs from this rerun file alone
- Do not downgrade `ChatGPT / Gemini / Grok` external blockers into internal bugs without new browser evidence
- Do not promote `Qwen` timeout into a durable provider regression claim without a cleaner workstation rerun
