# TASK BOARD — 2026-04-03 — Switchyard Master Program

> 本文件是本轮 `Switchyard` master program 的唯一执行 SSOT。
> 任何 fresh truth、SubAgent 回收、Git 变化、blocker 归类、阶段裁决，都先回写这里，再继续推进。

## 2026-04-13 Final-Wave UIUX Refresh + Live-Reality Relock

- this addendum supersedes older same-day UIUX/live wording below whenever they conflict
- current repo-owned finish state after the final UIUX refresh wave:
  - local branch remains `main`
  - remote heads remain only `origin/main`
  - open PR = `0`
  - open code-scanning alerts = `0`
  - docs count = `99`
- current readiness vocabulary after fresh reruns:
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
  - `done-on-main = pending git closeout in this turn`
- repo-owned surfaces refreshed in this turn:
  - `auth-portal`
    - first screen now behaves like a verdict-first arrivals board
    - deeper provider evidence is demoted into an explicit second-layer shelf
  - `provider-debug-workbench`
    - shell is tighter and more cockpit-like
    - summary/next-step utility chrome is stronger before raw diagnostics
  - `docs/index.html`
    - front door is more Mintlify-like and answer-first
    - route hierarchy is clearer and more airy
- blocker-only verdict pack for this turn:
  - `l2-reviewer` = `no blocker`
  - `l2-designer` = `non-blocker / no blocker`
  - `l2-explorer`
    - highlighted residual density tails
    - no new acceptance blocker found inside the current active-scope surfaces
- fresh quality receipts in this turn:
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
- live/browser truth in this turn:
  - first aggregate rerun exposed a repo-owned stale `9338` Chrome seat
    - symptom = `/json/version` and `/json/list` were healthy
    - failure = `playwright connectOverCDP` timed out after websocket connected
  - repo-owned remediation completed in-turn:
    - recycle the dedicated isolated Chrome root process on `9338`
    - rerun `bootstrap:web-login-browser`
    - rerun provider-scoped live gates
    - rerun aggregate `verify:web-login-live`
  - final aggregate truth after remediation:
    - `ChatGPT = success`
    - `Gemini = success`
    - `Qwen = success`
    - `Claude = external-only blocker / account-action-required`
    - `Grok = external-only blocker / session-incomplete`
- exact implication:
  - the repo-owned red blocker in live verification was remediated inside this turn
  - current aggregate live truth now converges back to the intended final-wave rule:
    - repo-owned gate passes
    - only `Claude / Grok` remain external-only
  - next step after this addendum is only:
    - write final receipt
    - complete git clean closeout on `main`

## 2026-04-13 Final-Wave Closeout Addendum

- this addendum supersedes older final-wave wording below whenever they conflict
- current repo-owned finish state on `main`:
  - local only `main`
  - remote only `main`
  - open PR = `0`
  - open code-scanning alerts = `0`
  - docs count = `99`
- final repo-owned verdict:
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
- final repo-owned closures landed in this turn:
  - workbench truth mapping now fail-closes across classification and
    `user-action-required` fallback paths
  - docs front door atlas is narrower and answer-first
  - docs/public donor contract is operationalized
  - `submission-packet-ledger` is relocated to
    `.agents/internal-docs/distribution/submission-packet-ledger.md`
  - nightly mutation hygiene ignores volatile `.runtime-cache/**` artifacts
- final external-only pack:
  - `Claude = account-action-required`
  - `Grok = session-incomplete`
- final receipts live in:
  - `.agents/ledgers/FINAL_WAVE_2026-04-13_RECEIPT.md`

Last updated: 2026-04-12 13:36:00 PDT (residual-tail closeout truth reset in progress)
Owner: Codex Program L1 / Master Integrator / Final Closeout Commander
Status: RESIDUAL-TAIL CLOSEOUT IN PROGRESS - repo-side green, external blockers = `Claude / Grok`, internal absorb/closeout tails still active

---

## 2026-04-13 Wave-5-Extreme-Finish Final Addendum

- this addendum supersedes older Wave 5 wording below whenever they conflict
- current repo-owned finish state after fresh reruns:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`
  - `pnpm run test:docs-frontdoor` = `0`
  - `pnpm run test:coverage` = `0`
    - `Statements = 80.03%`
    - `Lines = 80.15%`
  - `pnpm run test:mutation:baseline` = `0`
    - mutation score = `96.85`
  - `pnpm run gate:pr` = `0`
  - `pnpm run gate:nightly:expensive` = `0`
- final blocker-only gates for the repo-owned Wave 5 surfaces:
  - `l2-reviewer` = `no blocker`
  - `l2-designer` = `NO BLOCKER`
  - `docs/public front door` blocker is cleared
  - `auth-portal` = no blocker
  - `provider-debug-workbench` = no blocker
  - donor boundary = no blocker
- current docs/public-plane truth:
  - first row remains:
    - `README.md`
    - `docs/index.html`
    - `docs/media/30-second-overview.md`
    - `docs/first-success.md`
    - `docs/public-proof-pack.md`
    - `docs/public-distribution-ledger.md`
    - `docs/api/service-http-reference.md`
  - demoted public support shelves now include:
    - `docs/public-surface-support-matrix.md`
    - `docs/runbooks/dev-bootstrap.md`
- current external-only blocker pack after the latest same-turn evidence split:
  - final stable aggregate receipt now converges to:
    - `Claude = account-action-required`
    - `Grok = session-incomplete`
    - `repoOwnedGate.verdict = pass`
  - a late-turn `ChatGPT = chatgpt-cdp-unavailable / transport-instability` spike was reproduced on the repo-owned Chrome seat
  - repo-owned non-human remediation then recovered it:
    - recycle the dedicated Switchyard Chrome root
    - rerun `bootstrap:web-login-browser -- --provider chatgpt`
    - rerun `verify-web-login-live --provider chatgpt`
    - final `chatgpt = success`
  - exact implication:
    - Wave 5 repo-owned finish is complete
    - current workstation/browser reality is still not globally all-green only because `Claude / Grok` remain external-only blockers
    - remaining tails are external-only or owner-manual, not repo-owned

---

## 2026-04-12 Residual-Tail Closeout Truth Reset

- this addendum supersedes older blocker-pack, wave-status, and final-closeout wording below whenever they conflict
- current authoritative reruns on the dirty `main` worktree now say:
  - `git status --short --branch`
    - branch = `main...origin/main`
    - current worktree is dirty with repo-owned closeout edits still open
  - repo-side gate still holds:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
    - `pnpm build` = `0`
  - fresh live/browser truth now converges to:
    - `pnpm run verify:web-login-live` = `2`
      - `ChatGPT / Gemini / Qwen = success`
      - `Claude = external-blocker / claude-account-action-required / account-action-required`
      - `Grok = external-blocker / grok-browser-session-incomplete / session-incomplete`
    - `pnpm run reality:gate` = `2`
      - `overallStatus = external-blocker`
      - `internalGate.passed = true`
      - `successCount = 4`
      - `externalBlockerCount = 2`
      - `failureCount = 0`
      - current external blocker pack for this workstation = `Claude / Grok`
    - `pnpm run verify:service-live` now also reruns to `2`
      - top-level verdict = `external-blocker`
      - provider = `claude`
      - blocker = `claude-account-action-required`
      - classification = `account-action-required`
- exact implication:
  - the old `Gemini / Grok` blocker pack below is stale
  - the old `CLI = not now` / `MCP = research only` wording below is stale
  - the old “only true external blockers remain” headline is also stale for the current turn, because repo-owned residual tails still remain:
    - current-version browser/reviewer evidence pack absorb
    - Wave 5 Git/public closure absorb
    - Wave 6 honest outward ceiling absorb
    - dirty-main closeout
- explicit external blockers for this wave:
  - `Claude = account-action-required / owner-manual`
  - `Grok = session-incomplete / owner-manual`
- explicit non-goals for this wave:
  - do not try to solve Claude payment inside repo work
  - do not try to finish Grok login / human verification inside repo work

---

## 2026-04-07 Final-Distribution-Readiness Superseding Addendum

- this addendum supersedes older repo-identity / homepage / MCP slug / blocker wording below whenever they conflict
- canonical repo truth now remains:
  - repo = `xiaojiou176-open/Switchyard`
  - the older `xiaojiou176/Switchyard` wording below is stale and must not be reused for outward/frontdoor truth
- current MCP identity truth remains:
  - `io.github.xiaojiou176-open/switchyard-mcp`
  - the older `io.github.xiaojiou176/switchyard-mcp` wording below is stale
- homepage truth to sync through the current closeout wave:
  - old GitHub blob homepage wording is stale
  - target homepage = repo GitHub Pages root for `xiaojiou176-open/Switchyard`
- current blocker wording to sync through README / proof pack / delivery plan / task board:
  - repo-side gate = green
  - fresh `verify:service-live` no longer deserves trio-green wording; current stop is `Gemini = user-action-required`
  - current workspace external blocker pack to use on the front door = `Gemini / Grok`
  - do not keep repeating the older `Claude / Grok / Qwen` pack on current outward surfaces

---

## 2026-04-06 Public-Frontdoor-and-Fresh-Workspace-Truth Addendum

- fresh rerun completed in the current workspace before the latest frontdoor / proof-pack truth-sync pass:
  - `pnpm typecheck` = `0`
  - `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts tests/integration/docs/package-ready-distribution.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts` = `0`
    - `5 files / 43 tests passed`
  - `pnpm build` = `0`
  - `pnpm run verify:service-live` = `0`
  - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 3`
    - `externalBlockerCount = 3`
    - `failureCount = 0`
    - current external blockers in this workspace:
      - `Claude`
        - `blocker = missing-web-session-material`
        - `classification = session-material-missing`
      - `Grok`
        - `blocker = missing-web-session-material`
        - `classification = session-material-missing`
      - `Qwen`
        - `blocker = missing-web-session-material`
        - `classification = session-material-missing`
- exact implication:
  - the older task-board wording that narrowed the current top blocker pack to only `Grok anti-bot / human-verification-required` is not the freshest truth for this workspace snapshot
  - the repo-side gate is still green
  - the current mismatch is at the workstation-bound browser/session-material layer, not at the repo-side engineering layer
  - current public-facing docs should describe this as:
    - repo-side green
    - live/browser truth remains environment-bound
    - latest rerun in this workspace currently stops at `Claude / Grok / Qwen` session-material gaps
  - do not flatten this newer rerun into a repo-constant claim
  - do not over-correct public docs into saying the repo regressed internally; the current rerun still proves the blocker pack is external-only

---

## 2026-04-06 Kernel-Live-Path-Bridge Addendum

- fresh structural closeout completed after the public-frontdoor / truth-sync wave:
  - generic `packages/kernel` runtime planning now enters the live service invoke path instead of staying isolated to unit tests only
  - current service/runtime invoke flow now does:
    - service assembly builds a runtime-level registry bridge from:
      - BYOK provider registry
      - Web/Login provider registry
    - `POST /v1/runtime/invoke` now lets the generic kernel prepare:
      - provider
      - lane
      - model reference
    - then hands execution off to the existing bounded lane executors
  - current practical implication:
    - the repo still does **not** yet have a single fully generic execution brain
    - but it no longer has a fully disconnected `kernel` planning layer either
    - unified runtime planning is now real on the service frontdoor
  - service/runtime frontdoor consistency also tightened in this pass:
    - `GET /v1/runtime/byok/providers` now exists on the real HTTP surface
    - `POST /v1/runtime/byok/invoke` now exists as the explicit BYOK route alias documented by the OpenAPI/frontdoor docs
- fresh verification for this pass:
  - targeted kernel/service/http suite:
    - `pnpm exec vitest run tests/unit/web/service-index.test.ts tests/unit/core/runtime-kernel.test.ts tests/integration/service-http/http-surface.integration.test.ts --config vitest.config.ts` = `0`
    - result = `3 files / 26 tests passed`
  - repo-side rerun after the kernel-live-path bridge:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
    - `pnpm build` = `0`
  - fresh aggregate rerun after the same code changes:
    - `pnpm run verify:service-live` = `0`
    - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 3`
    - `externalBlockerCount = 3`
    - `failureCount = 0`
    - blocker pack unchanged in this workspace:
      - `Claude = missing-web-session-material`
      - `Grok = missing-web-session-material`
      - `Qwen = missing-web-session-material`
- exact implication:
  - this structural pass improved real runtime unification without changing the top-level blocker layer
  - current evidence says the repo-side architecture moved forward while the latest live truth remained external-only
  - the next deeper debt, if selected later, is not “connect kernel at all” anymore
  - it is:
    - whether execution itself should also become more kernel-driven instead of only planning/routing becoming kernel-driven

---

## 2026-04-06 Kernel-Execute-Dispatch Addendum

- fresh structural closeout completed after the earlier kernel-live-path bridge:
  - generic `packages/kernel` runtime no longer only prepares invocation plans for the live service path
  - it now also dispatches execution through lane-level executors supplied by the service layer
  - current execution shape is:
    - kernel decides:
      - provider
      - lane
      - model reference
    - service injects bounded lane executors for:
      - `byok`
      - `web-login`
    - existing byok/web execution code remains reused behind those adapters
  - current frontdoor consistency also moved one step forward in the same pass:
    - `/v1/runtime/byok/providers` is now a real committed route
    - `/v1/runtime/byok/invoke` is now a real committed route alias, not just an OpenAPI/docs promise
- fresh verification for this pass:
  - targeted kernel/service/http suite:
    - `pnpm exec vitest run tests/unit/web/service-index.test.ts tests/unit/core/runtime-kernel.test.ts tests/integration/service-http/http-surface.integration.test.ts --config vitest.config.ts` = `0`
    - result = `3 files / 26 tests passed`
  - repo-side rerun after execute-dispatch wiring:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
    - `pnpm build` = `0`
  - fresh aggregate rerun after the same code changes:
    - `pnpm run verify:service-live` = `0`
    - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 3`
    - `externalBlockerCount = 3`
    - `failureCount = 0`
    - blocker pack unchanged in this workspace:
      - `Claude = missing-web-session-material`
      - `Grok = missing-web-session-material`
      - `Qwen = missing-web-session-material`
- exact implication:
  - current repo-side architecture is now one step more honest than before:
    - service/runtime invoke no longer stops at kernel planning
    - execution dispatch is also now kernel-mediated at the lane level
  - current remaining deeper debt is no longer:
    - `kernel not used by live path`
  - it is now:
    - whether result shaping / response semantics / lane execution inputs should continue to be further unified without pulling provider/auth/http detail into kernel

---

## 2026-04-06 Service-Adapter-Invoke-Unification Addendum

- fresh structural closeout completed after the earlier kernel execute-dispatch pass:
  - service-layer execution no longer only reuses kernel planning and lane dispatch
  - it now also centralizes:
    - the shared service invoke payload shape used by lane executors
    - lane-executor result shaping at the service-adapter boundary
    - the injected runtime invoker passed into `http-surface`
  - current practical effect:
    - `http-surface` now owns less lane-specific execute knowledge
    - service-layer adapters now own more of the byok/web execute translation and response packaging
    - kernel still remains provider-agnostic and does not absorb:
      - HTTP schema
      - browser/session material
      - BYOK transport preparation details
- fresh verification for this pass:
  - targeted kernel/service/http suite:
    - `pnpm exec vitest run tests/unit/web/service-index.test.ts tests/unit/core/runtime-kernel.test.ts tests/integration/service-http/http-surface.integration.test.ts --config vitest.config.ts` = `0`
    - result = `3 files / 27 tests passed`
  - repo-side rerun after service-adapter unification:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
    - `pnpm build` = `0`
  - fresh aggregate rerun after the same code changes:
    - `pnpm run verify:service-live` = `0`
    - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 3`
    - `externalBlockerCount = 3`
    - `failureCount = 0`
    - blocker pack unchanged in this workspace:
      - `Claude = missing-web-session-material`
      - `Grok = missing-web-session-material`
      - `Qwen = missing-web-session-material`
- exact implication:
  - current remaining debt is now one level deeper again:
    - not whether kernel is present in the live path
    - not whether execution dispatch is kernel-mediated
    - but whether cross-lane success/failure envelopes and executor inputs should continue to be normalized beyond the current service-adapter layer
  - current evidence still says:
    - repo-side green
    - live/browser blocker pack external-only
    - no new internal regression was introduced by the latest unification step

---

## 2026-04-06 Service-Invoke-Result Contract Addendum

- fresh structural closeout completed after the earlier service-adapter unification pass:
  - service execution now uses a more explicit internal invoke result contract instead of only returning lane-specific HTTP-shaped payloads from each executor
  - current service-layer result shape is now split into:
    - shared success skeleton
      - `ok`
      - `laneId`
      - `providerId`
      - `modelId`
      - `outputText`
      - `diagnostics`
      - optional `details`
    - shared failure skeleton
      - `ok`
      - `laneId`
      - `providerId`
      - `modelId`
      - `httpStatus`
      - `errorType`
      - `message`
      - `diagnostics`
      - optional `suggestedAction`
      - optional `details`
  - lane-private details remain intentionally out of kernel/shared root:
    - BYOK keeps `prepared` under details
    - Web keeps `auth / remediation / authPortal / routes / result` under details
  - `http-surface` now renders public JSON from this internal service result contract instead of being the only place where lane-specific result shaping exists
- fresh verification for this pass:
  - targeted kernel/service/http suite:
    - `pnpm exec vitest run tests/unit/web/service-index.test.ts tests/unit/core/runtime-kernel.test.ts tests/integration/service-http/http-surface.integration.test.ts --config vitest.config.ts` = `0`
    - result = `3 files / 27 tests passed`
  - repo-side rerun after internal result contract landing:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
    - `pnpm build` = `0`
  - fresh aggregate rerun after the same code changes:
    - `pnpm run verify:service-live` = `0`
    - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 3`
    - `externalBlockerCount = 3`
    - `failureCount = 0`
    - blocker pack unchanged in this workspace:
      - `Claude = missing-web-session-material`
      - `Grok = missing-web-session-material`
      - `Qwen = missing-web-session-material`
- exact implication:
  - the remaining debt is now deeper again:
    - not whether there is a shared kernel entrypoint
    - not whether planning or execute dispatch are kernel-mediated
    - but whether any further normalization of cross-lane success/failure envelopes is worth doing without weakening truthful public HTTP behavior
  - current evidence says the latest pass improved internal service coherence while preserving the same honest public/live boundary

---

## 2026-04-06 Repo-Identity Drift Absorption and Fresh Wave-1 Recheck Addendum

- fresh repo-identity drift absorption landed locally after the final public-entry cutover:
  - root/package metadata now points at the current live repo object:
    - `https://github.com/xiaojiou176/Switchyard`
  - MCP package metadata and submission manifest now use the current repo-backed identity:
    - `io.github.xiaojiou176/switchyard-mcp`
  - machine-readable schema `$id` surfaces that back public catalogs / starter packs / host examples now point at the live repo slug instead of the deleted `xiaojiou176-open/Switchyard`
  - distribution tests were updated to assert the new MCP identity and current repo URL
- fresh repo-side validation for this pass:
  - `pnpm exec vitest run tests/integration/docs/package-ready-distribution.test.ts tests/integration/docs/frontdoor-docs.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts` = `0`
    - `5 files / 43 tests passed`
- fresh live GitHub metadata truth for the current public repo:
  - repo = `xiaojiou176/Switchyard`
  - `description = Shared provider runtime for AI apps.`
  - `homepage = https://github.com/xiaojiou176/Switchyard/blob/main/docs/README.md`
  - topics now include:
    - `switchyard`
    - `shared-provider-runtime`
    - `mcp`
    - `byok`
    - `web-login`
    - `codex`
    - `claude-code`
    - `openclaw`
- fresh external-distribution truth for this pass:
  - npm packages still not published:
    - `@switchyard/surface-mcp` = `404`
    - `@switchyard/consumer-codex` = `404`
    - `@switchyard/consumer-claude-code` = `404`
    - `@switchyard/consumer-openclaw` = `404`
  - official MCP Registry search for `switchyard` still returns no live listing
- fresh Wave 1 truth recheck in this pass:
  - `pnpm run verify:service-live` = `0`
    - service-first truth is currently green for:
      - `chatgpt`
      - `gemini`
      - `claude`
  - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider chatgpt --reload --json` = `0`
    - `workspaceClassification = workspace-ready`
    - `workspaceReady = true`
    - current page = `https://chatgpt.com/c/...`
    - current page has composer surface
  - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider grok --reload --json` = `0`
    - current page = `https://grok.com/c/...`
    - `workspaceStatus.classification = workspace-ready`
    - store status still remains:
      - `state = user-action-required`
      - reason = upstream anti-bot / human verification required
  - current implication:
    - the older task-board wording that treated `chatgpt` as the sole authoritative remaining blocker is now stale
    - Wave 1 still should not be declared formally closed from this pass alone, because the `grok` live/browser truth still has not been cleared and aggregate closeout still lacks a fresh single final green verdict
- exact next implications for the current program:
  - do not ask the owner to do any non-distribution manual action based on the older `chatgpt-only blocker` wording
  - keep the remaining human-action surface focused on:
    - distribution/login/listing/manual-review steps
    - any future fresh `grok` anti-bot action only if a new live rerun still proves it is required

---

## 2026-04-05 Grok-Anti-Bot-Hardening Addendum

- fresh heavier internal attempt completed after the earlier `5 success / 1 blocker` convergence:
  - added a Grok browser-session transport fallback before the older DOM-only fallback
  - widened fallback triggers so browser-backed `401/403/timeout` failures do not stop at a thinner generic transport error
  - added targeted runtime tests to cover:
    - browser-session transport before DOM fallback
    - fallback ordering after `401/403`
    - fail-closed behavior when the last DOM fallback still times out
- fresh verification for this pass:
  - `pnpm exec vitest run tests/unit/web/real-transport-execution.test.ts tests/unit/web/grok-dom-transport.test.ts tests/unit/web/verify-web-login-helpers.test.ts tests/unit/web/verify-web-login-orchestration.test.ts --config vitest.config.ts` = `0`
    - `4 files / 47 tests passed`
  - `pnpm typecheck` = `0`
  - serial `pnpm run reality:gate` = `2`
    - `successCount = 5`
    - `externalBlockerCount = 1`
    - only remaining blocker:
      - `provider = Grok`
      - `blocker = grok-anti-bot-check-required`
      - `classification = human-verification-required`
      - `workspaceClassification = human-verification-required`
      - narrowed diagnostic:
        - browser-session fallback reached Grok response stage
        - upstream returned `HTTP 403`
        - payload reason = `Request rejected by anti-bot rules`
        - DOM fallback still timed out afterwards
- exact implication:
  - this program is no longer paused on a generic `provider-unavailable / workspace-ready` Grok tail
  - it is now paused on a narrower and more honest `human-verification-required / anti-bot` Grok blocker
  - this is stronger than the previous verdict because the repo has now tried:
    - direct transport
    - browser-session transport
    - DOM fallback
    and all three converge on the same anti-bot boundary

---

## 2026-04-05 Qwen-False-Negative-Cleared and Grok-Only-External-Blocker Addendum

- fresh repo-owned reruns after the latest verifier / coherence / browser-session fallback repairs:
  - `pnpm typecheck` = `0`
  - targeted verifier/runtime suite:
    - `pnpm exec vitest run tests/unit/web/real-transport-execution.test.ts tests/unit/web/diagnose-web-login-browser-script.test.ts tests/unit/web/verify-web-login-orchestration.test.ts tests/unit/web/verify-web-login-helpers.test.ts --config vitest.config.ts` = `0`
      - `4 files / 67 tests passed`
  - fresh provider-scoped diagnose truth:
    - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider qwen --reload --json` = `0`
      - `workspaceClassification = workspace-ready`
      - `workspaceReady = true`
      - `session-cookie = present`
      - `session-token = present`
    - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider grok --reload --json` = `0`
      - `workspaceClassification = workspace-ready`
      - `workspaceReady = true`
      - current page = `grok.com/c/...`
  - fresh provider-scoped live reruns:
    - `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen` = `0`
      - `status = success`
      - `signal = qwen-workspace-composer-browser-dom`
      - exact invoke proof succeeded
    - `pnpm exec node scripts/verify-web-login-live.mjs --provider grok` = `2`
      - `blocker = grok-provider-unavailable`
      - `classification = provider-unavailable`
      - `workspaceClassification = workspace-ready`
      - narrowed diagnostic = `Grok browser DOM fallback timed out after 60000ms.`
  - fresh aggregate closeout:
    - `pnpm run verify:service-live` = `0`
    - `pnpm run reality:gate` = `2`
      - `overallStatus = external-blocker`
      - `internalGate.passed = true`
      - `successCount = 5`
      - `externalBlockerCount = 1`
      - `failureCount = 0`
      - only remaining external blocker:
        - `Grok`
          - `blocker = grok-provider-unavailable`
          - `classification = provider-unavailable`
          - `workspaceClassification = workspace-ready`
- exact implication:
  - `Qwen` is no longer a real blocker in this program
    - the prior red verdict was a verifier / coherence / browser-session false negative
    - fresh page truth plus exact invoke proof now agree
  - `Grok` is now narrowed to a single honest external/provider blocker
    - page/workspace/session truth is present
    - the remaining failure happens after workspace proof, at the provider-side live response stage
  - top-level verdict still remains:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - but the blocker ledger is now materially narrower than the previous `4 success / 2 blockers` time slice
    - current fresh truth = `5 success / 1 external blocker`

---

## 2026-04-05 Post-Human-Action Closeout and Package-Ready Distribution Addendum

- fresh Phase A / Phase B truth reset completed after the user explicitly confirmed:
  - `grok` login completed
  - `qwen` login completed
  - repo-owned browser workbench was still left open
- fresh repo-owned baseline in this turn:
  - `git status --short --branch` = clean `main...origin/main`
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `gh auth status` = active account `xiaojiou176`
  - `gh pr status` = no open PR on current branch
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`
- fresh browser/workbench truth in this turn:
  - repo-owned isolated browser still active on:
    - `http://127.0.0.1:9338`
    - `~/.cache/switchyard/browser/chrome-user-data`
    - `Profile 1`
  - current machine/browser evidence showed:
    - one repo-owned Chrome listener on `9338`
    - current visible provider pages still attached inside the same repo-owned isolated root
- fresh provider-scoped reruns in this turn:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider grok` = `2`
    - standalone verifier initially classified the blocker as `grok-provider-unavailable`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen` = `2`
    - `session-cookie = present`
    - `session-token = present`
    - blocker remained `qwen-browser-session-incomplete`
    - current browser truth remained `permission-gated`
  - `pnpm run verify:service-live` = `0`
    - `chatgpt / gemini / claude` service invoke proof all succeeded
  - persisted aggregate reality report in:
    - `.runtime-cache/reality-gate.out`
    - `.runtime-cache/reality-gate.exit`
    - current authoritative aggregate truth there is:
      - `overallStatus = external-blocker`
      - `internalGate.passed = true`
      - `successCount = 4`
      - `externalBlockerCount = 2`
      - `failureCount = 0`
      - current external blockers:
        - `Grok`
          - `blocker = grok-browser-session-degraded`
          - `classification = refreshable-but-degraded`
          - `workspaceClassification = provider-adjacent`
        - `Qwen`
          - `blocker = qwen-browser-session-incomplete`
          - `classification = user-action-required`
          - `workspaceClassification = permission-gated`
- fresh repo-owned closeout hardening also landed in the same turn:
  - browser handoff now best-effort reuses an existing matching page before opening a new tab
  - `verify-service-live` now times out stalled service invokes and reuses provider-scoped external blocker truth instead of flattening timeouts into a vaguer failure
  - `verify-web-login-live` now isolates browser-backed provider reruns through an explicit child-lane marker, reducing orchestration cross-talk
  - fresh verification for those runtime/orchestration repairs:
    - `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts tests/integration/docs/package-ready-distribution.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/starter-packs/copy-ready-starter-packs.test.ts --config vitest.config.ts` = `0`
      - `3 files / 18 tests passed`
    - repo-wide recheck after these changes:
      - `pnpm typecheck` = `0`
      - `pnpm test` = `0`
      - `pnpm build` = `0`
- fresh bigger-vision public-distribution expansion landed locally in this turn:
  - package-ready metadata now exists for:
    - `@switchyard/consumer-codex`
    - `@switchyard/consumer-claude-code`
    - `@switchyard/consumer-openclaw`
    - `@switchyard/surface-mcp`
  - new package-level frontdoors now exist:
    - `packages/consumers/codex/README.md`
    - `packages/consumers/claude-code/README.md`
    - `packages/consumers/openclaw/README.md`
    - `packages/surfaces/mcp/README.md`
  - new public distribution truth surface now exists:
    - `docs/public-distribution-ledger.md`
  - keyword/discoverability truth now also covers:
    - package names as `partial-with-label`
    - package names on npm as `not-claimable` until actual publish exists
  - `@switchyard/surface-mcp` now also has a package bin entry:
    - `switchyard-mcp`
- exact implication:
  - top-level verdict still does not change:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - but the current external blockers have become more honest than the earlier “just session recovery” wording:
    - `Grok = refreshable-but-degraded / provider-adjacent`
    - `Qwen = browser-side permission-gated / user-action-required`
  - one more repo-owned bigger-vision slice is now closed to the current honest ceiling:
    - package-ready public distribution surfaces, starter-pack-facing frontdoors, and discoverability truth are now landed in the local worktree
  - current Git closure for this turn remains intentionally open:
    - no commit / push / PR was created in this turn without explicit user authorization

---

## 2026-04-05 Skill-Pack-Catalog and Truth-Sync Addendum

- fresh repo-owned hardening completed after the builder-readiness / UI-frontdoor / Git-hygiene audit:
  - dedicated `skill-pack catalog` surface landed for builders instead of forcing every reader to pull skill-pack truth out of the aggregate public-surface catalog
    - new docs:
      - `docs/skill-pack-catalog.md`
      - `docs/skill-pack-catalog.json`
      - `docs/skill-pack-catalog.schema.json`
    - new read-only entrypoints now landed in both:
      - `scripts/switchyard-cli.mjs`
      - `packages/surfaces/mcp/src/index.ts`
    - new dedicated MCP tools now exist:
      - `switchyard.catalog.skill_pack_catalog`
      - `switchyard.catalog.skill_pack_catalog_schema`
  - frontdoor truth drift was also closed in the same pass:
    - `README.md` no longer says top-level program only has one external blocker
    - `docs/api/openapi.yaml` now matches the current default local runtime port:
      - `http://127.0.0.1:4010`
    - blueprint wording now says the current live closeout is paused by **two** external blockers, not one
    - `M3` wording no longer overclaims `Grok / Qwen = success`
- fresh verification in this turn:
  - targeted truth-sync suite:
    - `pnpm exec vitest run --config vitest.config.ts tests/integration/docs/frontdoor-docs.test.ts tests/integration/starter-packs/copy-ready-starter-packs.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts` = `0`
    - `5 files / 42 tests passed`
  - repo-wide rerun after these changes:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - `64 files / 387 tests passed`
    - `pnpm build` = `0`
  - fresh runnable builder-facing smokes in the same turn:
    - `pnpm run switchyard:cli -- skill-pack-catalog` = `0`
    - `pnpm run switchyard:cli -- skill-pack-catalog-schema` = `0`
    - `pnpm run switchyard:cli -- builder-intent-router` = `0`
    - `pnpm run example:host-codex` = `0`
    - `pnpm run example:host-claude-code` = `0`
    - `pnpm run example:host-openclaw` = `0`
    - `pnpm run example:host-mcp` = `0`
    - `pnpm run starter-pack:codex` = `0`
    - `pnpm run starter-pack:claude-code` = `0`
    - `pnpm run starter-pack:openclaw` = `0`
    - `pnpm run starter-pack:mcp` = `0`
    - `pnpm run starter-pack:runtime-diagnostics-pack` = `0`
    - `pnpm run starter-pack:docs-seo-sync-pack` = `0`
    - note:
      - first smoke attempt failed exactly as designed when no local runtime was listening on `4010`
      - the surfaced remediation text correctly pointed to:
        - `pnpm run start:service-local`
      - after starting the repo-owned local service and rerunning, the full smoke batch passed
  - repo-owned resource hygiene in this turn:
    - local service was started only for smoke verification
    - local service was then stopped by the same agent session
    - `lsof -nP -iTCP:4010 -sTCP:LISTEN` = `1`
      - no listener remained after cleanup
  - Git hygiene progress in this turn:
    - `git fetch --prune origin` = `0`
    - stale remote-tracking refs for the merged `codex/*` closeout branches were removed
- exact implication:
  - top-level program verdict still does not change:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - but one more repo-owned bigger-vision tail is now honestly closed:
    - builders, MCP clients, and docs readers now have a dedicated skill-pack truth surface
  - docs/public wording now no longer undercount the remaining external blockers or point OpenAPI readers at the stale `4317` default

## 2026-04-05 Shared-Classification Refinement Addendum

- fresh internal hardening completed after the diagnose/support truth-sync pass:
  - shared browser persistence classification now preserves finer categories instead of flattening everything back to:
    - `login-required`
    - `provider-adjacent`
  - current refinement specifically landed for:
    - `qwen -> permission-gated`
    - `grok -> session-incomplete` when required local session artifacts are still missing and the authenticated composer has not been restored
  - diagnose CLI now combines:
    - store truth
    - provider-specific artifact states
    - current network / console evidence when available
    - current page fallback
  - verify-side coherence now passes those richer inputs through instead of silently dropping them before persistence audit / store writeback
  - service/browser-debug support also stopped overclaiming blank Qwen pages as ready and now carries the same permission-gate language
- fresh verification in this turn:
  - `pnpm exec vitest run tests/unit/web/diagnose-web-login-browser-script.test.ts tests/unit/web/browser-debug-support.test.ts tests/unit/web/browser-debug-support-runtime.test.ts tests/unit/web/browser-session-coherence.test.ts tests/unit/web/verify-web-login-orchestration.test.ts --config vitest.config.ts` = `0`
    - `5 files / 56 tests passed`
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
    - `64 files / 382 tests passed`
  - `pnpm build` = `0`
  - fresh provider-scoped reruns:
    - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider qwen --reload --json` = `0`
      - `workspaceClassification = permission-gated`
      - `session-cookie = present`
      - `session-token = present`
    - `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen` = `2`
      - blocker remains `qwen-browser-session-incomplete`
      - but `persistenceAudit.workspaceClassification = permission-gated`
    - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider grok --reload --json` = `0`
      - `workspaceClassification = session-incomplete`
      - required local session artifacts still missing
    - `pnpm exec node scripts/verify-web-login-live.mjs --provider grok` = `2`
      - blocker remains `grok-browser-session-incomplete`
      - store/persistence truth now also keeps:
        - `workspaceClassification = session-incomplete`
  - fresh aggregate rerun:
    - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 4`
    - `externalBlockerCount = 2`
    - `failureCount = 0`
    - fresh blocker nuance in aggregate output now surfaces directly at top level:
      - `workspaceClassificationCounts`
        - `session-incomplete = 1`
        - `permission-gated = 1`
      - `externalBlockers`
        - `Grok`
          - `classification = session-incomplete`
          - `workspaceClassification = session-incomplete`
          - required local session artifacts still missing
          - authenticated composer surface still not restored
        - `Qwen`
          - `classification = user-action-required`
          - `workspaceClassification = permission-gated`
          - `session-cookie = present`
          - `session-token = present`
          - remaining blocker = browser-side `Unauthorized / permission gate`
- exact implication:
  - top-level program verdict still does not change
  - but repo-owned diagnose / coherence / support / store layers now retain more faithful Qwen/Grok blocker truth
  - aggregate `reality:gate` external-blocker summaries now also expose `workspaceClassification` when persistence audit carries it, so the finer truth is no longer trapped only inside nested audit objects
  - remaining blockers are still truly external:
    - `Grok authenticated composer not yet restored`
    - `Qwen browser-side permission gate not yet cleared`

## 2026-04-05 Capture-Honesty-and-Docs-Taxonomy Addendum

- fresh internal hardening completed after the shared-classification refinement:
  - `Qwen` acquisition capture no longer treats a generic HTTP probe failure and a real browser-side permission gate as the same thing
    - inconclusive HTTP probe can still be rescued by browser workspace proof
    - explicit `Unauthorized / permission-gated` truth is no longer washed into a fake success
  - `Grok` acquisition persistence audit now keeps finer page classifications:
    - `human-verification-required`
    - `account-action-required`
    - `session-incomplete`
  - diagnostics/reference docs now include the latest landed categories:
    - `human-verification-required`
    - `account-action-required`
    - `permission-gated`
- fresh verification in this turn:
  - `pnpm exec vitest run tests/unit/web/acquisition-capture.test.ts --config vitest.config.ts` = `0`
    - `1 file / 15 tests passed`
  - `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts tests/unit/web/acquisition-capture.test.ts tests/unit/web/diagnose-web-login-browser-script.test.ts tests/unit/web/browser-session-coherence.test.ts tests/unit/web/reality-gate-script.test.ts --config vitest.config.ts` = `0`
    - `5 files / 56 tests passed`
- exact implication:
  - the repo no longer only tells the finer truth during verify/diagnose
  - capture persistence and docs taxonomy are now aligned with the latest Qwen/Grok reality

---

## 2026-04-05 Diagnose-and-Support Truth Sync Addendum

- fresh internal closeout completed after the Qwen truth-narrowing pass:
  - `verify-web-login-live` no longer keeps stale Qwen fallback wording that claims the blocker is still a missing token
  - `browser-debug-support` now explains Qwen as:
    - session material already present
    - remaining blocker is browser-side `Unauthorized / permission gate`
    - stay in the same repo-owned browser before rerunning the provider-scoped gate
  - app-service browser debug support no longer overclaims a blank-title-only Qwen page as live-ready
  - long-tail Qwen/Grok e2e routing assertions were tightened from `expect.any(String)` to exact transport handoff contracts
- fresh verification in this turn:
  - `pnpm exec vitest run tests/unit/web/browser-debug-support-runtime.test.ts tests/unit/web/browser-debug-support.test.ts tests/unit/web/diagnose-web-login-browser-script.test.ts tests/unit/web/verify-web-login-helpers.test.ts tests/unit/web/verify-web-login-orchestration.test.ts --config vitest.config.ts` = `0`
    - `5 files / 54 tests passed`
  - `pnpm exec vitest run tests/e2e/web-login/long-tail-provider-baseline.test.ts --config vitest.config.ts --project app-service-e2e` = `0`
    - `1 file / 6 tests passed`
  - fresh repo-wide safety rerun after these support/debug changes:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - `64 files / 374 tests passed`
    - `pnpm build` = `0`
  - fresh `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider qwen --reload --json` = `0`
    - canonical attach target no longer carries stale `sessionUrl=39222`
    - store / ladder / persistence audit now all say:
      - `session-cookie = present`
      - `session-token = present`
      - remaining blocker = browser-side `Unauthorized / permission gate`
- exact implication:
  - this turn did not change the top-level program verdict
  - but it did remove the remaining internal wording/test/support drift around the narrowed Qwen blocker
  - current external blocker pack is still:
    - `Grok authenticated composer not yet restored`
    - `Qwen browser-side Unauthorized / permission gate not yet cleared`

---

## 2026-04-05 Qwen-Permission-Gate Truth Narrowing Addendum

- fresh internal hardening completed after the earlier aggregate rerun:
  - default isolated-root acquisition capture now routes to canonical `9338` instead of silently falling back to legacy `39222`
  - Grok acquisition page-audit now reuses provider-side browser snapshot truth instead of a thinner one-shot DOM sample
  - Qwen token provenance and disk/store/verify merge semantics now use stronger-artifact-wins rules
    - `_bl_sid`
    - `atpsida`
    - `token`
    - `session-token`
    - `session_token`
  - diagnose / verify / store wording now distinguishes:
    - `token still missing`
    - vs `token present but browser-side Unauthorized / permission gate remains`
- fresh targeted verification in this turn:
  - `pnpm exec vitest run tests/unit/web/acquisition-capture.test.ts tests/unit/web/browser-session-coherence.test.ts tests/unit/web/diagnose-web-login-browser-script.test.ts tests/unit/web/verify-web-login-orchestration.test.ts tests/unit/web/provider-transport.test.ts --config vitest.config.ts` = `0`
    - `5 files / 63 tests passed`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen` = `2`
    - blocker still = `qwen-browser-session-incomplete`
    - classification still = `user-action-required`
    - but fresh truth is now narrower:
      - `session-cookie = present`
      - `session-token = present`
      - remaining blocker = browser-side `Unauthorized / permission gate`
  - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider qwen --reload --json` = `0`
    - canonical attach target = isolated-root `9338`
    - no stale `existing-browser-session` URL remains in diagnose output
    - ladder now explicitly tells the user:
      - session material is already present
      - stay in the same repo-owned browser
      - clear the remaining browser-side gate
      - then rerun provider-scoped verify
- exact implication:
  - top-level master-program verdict is still:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - but the Qwen blocker is no longer honestly described as:
    - `missing token`
  - it is now honestly described as:
    - `session material present, bootstrap still Unauthorized / permission-gated`
  - Grok blocker remains:
    - authenticated composer still not restored in the repo-owned isolated browser

---

## 2026-04-05 Aggregate-Rerun Truth Resync Addendum

- fresh authoritative rerun in this turn:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`
  - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 4`
    - `externalBlockerCount = 2`
    - `failureCount = 0`
- current aggregate external blockers are now:
  - `Grok`
    - browser session still does not land on an authenticated composer/workspace
  - `Qwen`
    - browser session still needs explicit user action / session recovery on the credentialed workstation
- same-turn supporting reruns:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini` = `0`
  - `pnpm run verify:service-live` = `0`
- exact implication:
  - repo-side validation is still green
  - current top-level verdict remains:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - but the latest external blocker pack is now:
    - `Grok session recovery`
    - `Qwen session recovery`

---

## 2026-04-04 Isolated-Chrome-Root Port-9338 Closure Addendum

- bounded wave scope completed:
  - canonical isolated-root CDP port migrated from `39223` to `9338`
  - steady-state browser instance relaunched on:
    - `~/.cache/switchyard/browser/chrome-user-data`
    - `Profile 1`
    - `http://127.0.0.1:9338`
  - public mode language, tests, docs, runbook, `.env.example`, cache governance, auth portal shell, service surface, and verify scripts were all synchronized to:
    - `isolated-chrome-root` = primary mode
    - `existing-chrome-profile` = compat alias only
  - post-review closeout fixes also landed:
    - service runtime now keeps `existing-browser-session` bindings intact instead of rewriting every stored session to the active mode
    - auth portal frontdoor now exposes the documented `managed-browser` fallback action instead of only mentioning it in copy
  - repo constitution updated:
    - browser instance budget threshold now = `6`
    - permanent isolated browser root explicitly excluded from TTL / cap cleanup
- fresh repo-side verification in this turn:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
    - `62 files / 340 tests passed`
  - `pnpm build` = `0`
  - targeted regression packs = `0`
    - browser/runtime/http/auth/credentials focused suite = `8 files / 64 tests passed`
    - store/filter/diagnose focused suite = `3 files / 28 tests passed`
- fresh runtime hygiene verification:
  - `pnpm run audit:runtime-footprint -- --json` = `0`
  - `pnpm run cleanup:runtime -- --dry-run --json` = `0`
  - `pnpm run cleanup:runtime -- --apply --json` = `0`
    - deleted only repo-local disposable temp root
  - latest audit truth:
    - repo-local bytes = `459.0 MiB`
    - external dedicated root bytes = `4.95 GiB`
    - permanent browser root = `~/.cache/switchyard/browser/chrome-user-data`
    - permanent browser root excluded from TTL/cap = `true`
- fresh live/browser truth on port `9338`:
  - `pnpm run bootstrap:web-login-browser -- --provider chatgpt --mode isolated-chrome-root --ensure-only --json` = `0`
    - Chrome started on `http://127.0.0.1:9338`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini` = `0`
    - isolated-root workspace authenticated
    - DOM/browser proof token returned successfully
  - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider gemini --reload --json` = `0`
    - current page = `https://gemini.google.com/app/...`
    - workspaceStatus.liveReady = `true`
    - console/network evidence captured successfully
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt` = `2`
    - blocker = `chatgpt-browser-session-incomplete`
  - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider chatgpt --reload --json` = `0`
    - current page = `https://chatgpt.com/`
    - body snippet explicitly shows logged-out landing page and login/signup controls
    - workspaceStatus.liveReady = `false`
    - this is no longer a transport issue; it is a real browser login-state blocker
  - `pnpm run verify:service-live` = `2`
    - after env/store precedence fix, the service now also points at isolated-root `9338`
    - auth surface now reports `isolated-chrome-root` truthfully for the active ChatGPT session
    - only remaining blocker there = `chatgpt-browser-session-incomplete`
  - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 4`
    - `externalBlockerCount = 2`
    - external blockers now:
      - `chatgpt-browser-session-incomplete`
      - `grok-provider-unavailable`
- fresh login-persistence evidence:
  - source default Chrome profile `Profile 30` currently has:
    - `chatgpt` cookies = `0`
    - `__Secure-next-auth.session-token*` = `0`
  - target isolated root `Profile 1` currently has:
    - `chatgpt` cookies present, but `__Secure-next-auth.session-token*` = `0`
    - `gemini/google` cookies present and Gemini workspace remains authenticated
  - implication:
    - the isolated-root migration itself is functioning
    - ChatGPT did **not** lose a persistent browser session because of port migration
    - the copied browser root simply does not currently contain the persistent ChatGPT session cookie needed for authenticated workspace restore
- fresh internal fix landed during this turn:
  - stored runtime env no longer overrides current browser-routing env keys such as:
    - `SWITCHYARD_BROWSER_MODE`
    - `SWITCHYARD_WEB_AUTH_ACTIVE_MODE`
    - `SWITCHYARD_WEB_AUTH_CDP_URL`
    - `SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_CDP_URL`
    - `SWITCHYARD_WEB_GEMINI_CDP_URL`
  - service surface now projects current isolated-root mode truthfully even when older stored sessions were captured from `managed-browser`
  - exact implication:
  - this bounded wave is repo-side complete and fresh-verified
  - remaining blockers are external only:
    - ChatGPT needs a fresh human login in the isolated root
    - Grok upstream still times out / returns provider-unavailable
  - Git/GitHub closure proceeded despite those external blockers and is now complete

## 2026-04-04 Isolated-Chrome-Root Wave Git Closure Addendum

- fresh Git closure truth in this turn:
  - local commit = `3348163`
    - message = `feat: isolate browser root and harden live attach`
  - PR `#109` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/109`
    - squash merge commit on `main` = `632167e`
    - title = `feat: isolate browser root and harden live attach (#109)`
  - current branch = `main`
  - `git status --short --branch` = clean `main...origin/main`
  - `git worktree list` = main worktree only
  - remote stale branch tail removed:
    - `origin/codex/isolated-chrome-root-attach` pruned
    - remote refs now = `origin/main` only
- deliberate runtime residue left in place:
  - active repo-owned Chrome instance on `9338`
    - kept intentionally so the user can return and finish ChatGPT login inside the isolated root
  - permanent isolated browser root:
    - `~/.cache/switchyard/browser/chrome-user-data`
    - intentionally preserved
- exact implication:
  - this bounded wave no longer leaves branch / PR / worktree tail
  - top-level master program remains:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - remaining external blockers:
      - `chatgpt-browser-session-incomplete`
      - `grok-provider-unavailable`

## 2026-04-04 ChatGPT Relogin Confirmation Addendum

- fresh post-login verification after the user completed ChatGPT login inside the repo-owned isolated Chrome root:
  - current browser instance still = `127.0.0.1:9338`
  - current root = `~/.cache/switchyard/browser/chrome-user-data`
  - current profile = `Profile 1`
- fresh browser-storage truth:
  - `Profile 1/Cookies` now contains:
    - `__Secure-next-auth.session-token.0`
    - `__Secure-next-auth.session-token.1`
  - implication:
    - ChatGPT persistent session proof is now really present on disk inside the isolated root
- fresh live verification in this turn:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt` = `0`
    - `status = success`
    - `summary = ChatGPT auth session endpoint returned authenticated session metadata`
  - `pnpm run verify:service-live` = `0`
    - `chatgpt / gemini / claude` all returned exact service proof tokens
  - `pnpm run reality:gate` = `2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 5`
    - `externalBlockerCount = 1`
    - only remaining external blocker = `grok-provider-unavailable`
- exact implication:
  - ChatGPT isolated-root login is now fresh-verified end-to-end
  - this wave no longer has any ChatGPT login-state blocker
  - current top-level master-program residual blocker list is now:
    - `grok-provider-unavailable` only

---

## 2026-04-04 Isolated-Chrome-Root Wave Addendum

- this addendum opens a new bounded browser-root wave on branch `codex/isolated-chrome-root-attach`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - top-level legacy blocker still = `grok-provider-unavailable`
- fresh baseline before opening this wave:
  - repo had already returned to clean `main...origin/main`
  - previous cache-governance wave is already landed on `main`
  - current browser policy still assumes the real profile may live inside the default Chrome root:
    - `SWITCHYARD_CHROME_USER_DATA_DIR`
    - `SWITCHYARD_CHROME_PROFILE_NAME`
    - `existing-chrome-profile`
  - current steady-state still does **not** yet guarantee:
    - isolated repo-owned Chrome user-data root
    - single real Chrome instance for this repo
    - attach-only reuse on the same root
    - permanent exclusion of the repo-owned browser root from TTL/cap cleanup
- fresh machine truth captured before implementation:
  - default Chrome `Local State` currently maps display name `switchyard` to source profile dir `Profile 30`
  - current Chrome processes observed on the machine are using another repo's isolated root, not the default Chrome root
  - no active listeners currently occupy repo canonical CDP ports `39222 / 39223`
  - target external cache tree `~/.cache/switchyard/` does not yet exist
- bounded-wave scope for this round:
  - move the default real-browser strategy from shared default Chrome root to isolated root:
    - `~/.cache/switchyard/browser/chrome-user-data`
  - keep a single repo-owned profile dir there:
    - `Profile 1`
    - display name remains `switchyard`
  - implement explicit one-time seed / reseed from:
    - default Chrome root `~/Library/Application Support/Google/Chrome`
    - source profile `Profile 30`
  - switch day-to-day mode naming to a more honest primary name:
    - `isolated-chrome-root`
    - keep `existing-chrome-profile` only as compat alias
  - enforce steady-state browser semantics:
    - if missing -> launch
    - if present -> attach
    - never second-launch the same root
  - exclude `~/.cache/switchyard/browser/chrome-user-data` from TTL/cap runtime cleanup

---

## 2026-04-04 Cache-Governance-and-Real-Profile Wave Addendum

- this addendum opens a **new bounded governance wave** on branch `codex/cache-governance-profile-hardening`
- top-level program verdict remains unchanged while this bounded wave is in flight:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - top-level legacy blocker from the earlier runtime closeout still = `grok-provider-unavailable`
- fresh Git / worktree baseline before starting this wave:
  - active branch = `codex/cache-governance-profile-hardening`
  - worktree started clean on this branch
  - unrelated prior WIP was explicitly shelved instead of mixed into this wave:
    - stash = `codex-wip-skill-pack-contract-before-cache-governance`
    - source branch = `codex/skill-pack-contract`
- fresh scope for this bounded wave:
  - unify repo-local cache governance under `.runtime-cache/` as far as practical
  - add repo-external dedicated cache governance under `~/.cache/switchyard/`
  - add automatic TTL/cap cleanup policy for repo-owned disposable cache
  - switch local credentialed development default to the user-owned real Chrome profile `switchyard`
  - keep repo-local `switchyard-web-auth-browser` as explicit managed fallback only
  - keep GitHub Actions on hosted runners only, with login/profile-dependent live scripts fail-closed in CI
  - explicitly exclude `.serena/` from repo cache governance; it remains local MCP cache + ignore-only
- fresh baseline facts for this wave:
  - `.serena/` is already ignored and is **not** a cache-governance target
  - current repo-local runtime assets already mostly live under `.runtime-cache/`
  - current repo does **not** yet use `~/.cache/switchyard/`
  - current cache maintenance only governs repo-local `.runtime-cache/`; it does **not** yet support:
    - external dedicated cache root
    - TTL expiry
    - total-cap enforcement
    - repo-owning command auto-prune hooks
  - current real Chrome profile policy is still incomplete:
    - scripts still auto-detect global Chrome roots in some paths
    - existing-chrome-profile currently lacks explicit `profile-directory` handling
    - local default mode still leans `managed-browser`
  - current CI already stays on GitHub Hosted runners:
    - `.github/workflows/ci.yml` → `ubuntu-latest`
    - `.github/workflows/security.yml` → `ubuntu-latest`
    - `.github/workflows/codeql.yml` → `ubuntu-latest`
  - current repo has no repo-owned Docker runtime in flight:
    - `docker ps` baseline = empty
- bounded-wave done signal:
  - cache governance code landed with repo-local + external dedicated cache support
  - real Chrome profile env contract landed and documented
  - CI fail-closed behavior for credentialed live scripts landed
  - tests/docs/AGENTS/runbook updated and fresh verification evidence captured
- fresh closure truth for this bounded wave:
  - code/documentation/governance landed locally across:
    - `scripts/runtime-policy.mjs`
    - `scripts/runtime-cache-maintenance.mjs`
    - `scripts/bootstrap-web-auth-browser.mjs`
    - `scripts/browser-debug-support.mjs`
    - `scripts/diagnose-web-login-browser.mjs`
    - `scripts/capture-web-debug-bundle.mjs`
    - `scripts/verify-gemini-live.mjs`
    - `scripts/verify-web-login-live.mjs`
    - `scripts/verify-service-live.mjs`
    - `scripts/run-reality-gate.mjs`
    - `apps/service/src/browser-bootstrap.ts`
    - `apps/service/src/browser-debug-support.ts`
    - `apps/service/src/web-auth-acquisition.ts`
    - `packages/credentials/src/local-web-auth-store.ts`
    - `README.md`
    - `docs/runbooks/dev-bootstrap.md`
    - `docs/testing-pyramid.md`
    - `AGENTS.md`
  - fresh repo-side verification in this turn:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - `62 files / 338 tests passed`
    - `pnpm build` = `0`
    - targeted governance/unit suites = `0`
      - cache/profile/auth/runtime suite = `7 files / 46 tests passed`
      - closeout regression suite = `1 file / 27 tests passed`
  - fresh runtime-governance verification:
    - `pnpm run audit:runtime-footprint -- --json` = `0`
    - `pnpm run cleanup:runtime -- --dry-run --json` = `0`
    - `pnpm run cleanup:runtime -- --apply --json` = `0`
      - deleted only repo-local disposable temp = `95.4 KiB`
    - latest post-apply dry-run:
      - `deletableBytes = 0`
    - current audit observed:
      - repo-local bytes = `435.2 MiB`
      - external dedicated root bytes = `0 B`
      - deletable bytes = `2.55 KiB`
      - protected managed fallback profile bytes = `435.1 MiB`
    - current shell still had no explicit real-profile env during audit:
      - `protectedUserOwnedProfile.configured = false`
      - implication = the env contract is landed, but this workstation must still export the new vars before the default local mode will actually switch to the real Chrome profile
  - fresh live verification in this turn:
    - `pnpm run verify:gemini-live` = `0`
    - `pnpm run verify:web-login-live -- --provider chatgpt,gemini` = `0`
      - both providers returned exact proof tokens after the cache-governance hardening
    - `pnpm run verify:service-live` = `0`
      - trio `chatgpt / gemini / claude` all returned exact proof tokens
    - `pnpm run reality:gate` = `2`
      - `overallStatus = external-blocker`
      - `internalGate.passed = true`
      - `successCount = 5`
      - `externalBlockerCount = 1`
      - `failureCount = 0`
      - only blocker still = `grok-provider-unavailable`
  - exact implication:
    - this bounded governance wave is repo-side complete and fresh-verified
    - top-level master-program verdict remains unchanged:
      - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
      - only remaining top-level blocker still = `grok-provider-unavailable`

## 2026-04-04 Cache-Governance-and-Real-Profile Git Closure Addendum

- the bounded `cache-governance-and-real-profile` wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - commits on this wave:
    - `aa3d1f3` = `feat: harden cache governance and profile defaults`
    - `b7ea373` = `test: make live gate checks hermetic in CI`
    - `ad0567d` = `test: isolate live gate fixtures from local env`
  - PR `#108` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/108`
    - merge commit on `main` = `66dd06d`
    - squash title = `feat: harden cache governance and profile defaults (#108)`
  - local branch / worktree truth after merge:
    - current branch = `main`
    - `git status --short --branch` = clean `main...origin/main`
    - local worktree = main worktree only
  - remote branch truth after merge/prune:
    - `origin/main` only
    - `gh pr list --state open --limit 20` = empty
  - local stale branch cleanup completed:
    - deleted local `codex/cache-governance-profile-hardening` via GitHub merge cleanup
    - deleted local `codex/skill-pack-contract`
      - safe because it carried no unique commit and its unrelated WIP had already been preserved in stash
- residual local stash truth:
  - `stash@{0}` still exists:
    - `On codex/skill-pack-contract: codex-wip-skill-pack-contract-before-cache-governance`
  - classification:
    - unrelated preserved WIP
    - not part of this bounded wave
    - intentionally kept, not dropped
- exact implication:
  - this bounded wave no longer leaves a branch / PR / worktree tail
  - top-level verdict still remains:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only top-level remaining blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Builder-Kit-Contract Git Closure Addendum

- the bounded `builder-kit-contract` wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#107` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/107`
    - merge commit on `main` = `ad21a6b`
    - squash title = `feat: add builder kit catalog contract`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after merge:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `pnpm run cleanup:runtime -- --apply --json` pruned:
    - disposable temp root
    - 2 older debug bundles
    - deleted bytes = `4.87 KiB`
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
- exact implication:
  - the builder kit contract line is now landed on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Builder-Kit-Contract Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/builder-kit-contract`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - new human-readable builder kit directory:
    - `docs/builder-kit-catalog.md`
  - new machine-readable builder kit directory:
    - `docs/builder-kit-catalog.json`
    - `docs/builder-kit-catalog.schema.json`
  - new read-only CLI surface:
    - `builder-kit-catalog`
    - `builder-kit-catalog-schema`
  - new read-only MCP surface:
    - `switchyard.catalog.builder_kit_catalog`
    - `switchyard.catalog.builder_kit_catalog_schema`
  - preserved read-only builder-kit list/item surfaces now backed by the dedicated catalog:
    - `builder-kits`
    - `builder-kit --target <target>`
    - `switchyard.catalog.builder_kits`
    - `switchyard.catalog.builder_kit`
  - aggregate mirror kept in place with parity tests:
    - `docs/public-surface-catalog.json#builderKits`
  - frontdoor/docs sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/compat/README.md`
    - `docs/faq.md`
    - `docs/mcp.md`
    - `docs/api/mcp-readonly-server.md`
    - `docs/public-surface-catalog.md`
    - `docs/public-surface-catalog.json`
    - `docs/plugin-skill-starter-kits.md`
    - `docs/mcp-tool-catalog.md`
    - `docs/mcp-tool-catalog.json`
    - `llms.txt`
- fresh verification in this turn:
  - targeted builder-kit/CLI/MCP/frontdoor/starter-pack suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts tests/integration/starter-packs/copy-ready-starter-packs.test.ts --config vitest.config.ts` = `0`
    - result = `5 files / 41 tests passed`
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `62 files / 337 tests passed`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- builder-kit-catalog --json` = `0`
    - `pnpm run switchyard:cli -- builder-kit --target mcp --json` = `0`
- fresh review state in this turn:
  - reviewer = `APPROVE`
    - no evidence-backed blocker; residual risk only = dedicated-vs-mirror dual maintenance, now covered by parity tests
  - designer = `APPROVE`
    - page still reads like a restrained builder kit directory card, not a second giant frontdoor
- fresh contract truth in this turn:
  - dedicated builder kit catalog is now the source contract for builder-facing starter-kit truth
  - aggregate `public-surface-catalog.json#builderKits` remains as a mirror, not a second competing source
  - wording remains `partial / builder-facing / fail-closed / not full parity`
- exact implication:
  - the builder kit line is now durably landed on `main`
  - current remaining work after this addendum:
    - none for this bounded wave
    - only new independent bounded waves may continue

---

## 2026-04-04 Builder-Kit-Contract Wave Addendum

- the paused top-level program verdict still stands; this was a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/builder-kit-contract`
  - branch started from clean `main...origin/main` after PR `#106`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already exposed `builder-kits` / `builder-kit`
  - but builder-kit truth still lived only as an aggregate nested field inside `docs/public-surface-catalog.json#builderKits`
  - there was still no dedicated contract surface just for builder-kit truth
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
    - static contract only
  - do **not** turn it into:
    - skill-pack expansion
    - host playbook expansion
    - execute/write plane
    - marketing/consumer shell

---

## 2026-04-04 Compat-Target-Contract Git Closure Addendum

- the bounded `compat-target-contract` wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#106` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/106`
    - merge commit on `main` = `aba2a93`
    - squash title = `feat: add compat target catalog contract`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after merge:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `pnpm run cleanup:runtime -- --apply --json` pruned:
    - disposable temp root
    - 2 older debug bundles
    - deleted bytes = `4.87 KiB`
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
- exact implication:
  - the compat target contract line is now landed on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Compat-Target-Contract Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/compat-target-contract`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - new human-readable compat target directory:
    - `docs/compat-target-catalog.md`
  - new machine-readable compat target directory:
    - `docs/compat-target-catalog.json`
    - `docs/compat-target-catalog.schema.json`
  - new read-only CLI surface:
    - `compat-target-catalog`
    - `compat-target-catalog-schema`
  - new read-only MCP surface:
    - `switchyard.catalog.compat_target_catalog`
    - `switchyard.catalog.compat_target_catalog_schema`
  - preserved read-only compatibility list/item surfaces now backed by the dedicated catalog:
    - `compat-targets`
    - `compat-target --target <target>`
    - `switchyard.catalog.compat_targets`
    - `switchyard.catalog.compat_target`
  - aggregate mirror kept in place with parity tests:
    - `docs/public-surface-catalog.json#compatTargets`
  - frontdoor/docs sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/compat/README.md`
    - `docs/public-surface-catalog.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.schema.json`
    - `docs/mcp.md`
    - `docs/api/mcp-readonly-server.md`
    - `docs/faq.md`
    - `docs/mcp-tool-catalog.md`
    - `docs/mcp-tool-catalog.json`
    - `llms.txt`
- fresh verification in this turn:
  - targeted compat/CLI/MCP/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/unit/compat/compat-target-catalog.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `5 files / 37 tests passed`
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `62 files / 337 tests passed`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- compat-target-catalog --json` = `0`
    - `pnpm run switchyard:cli -- compat-target-catalog-schema --json` = `0`
    - `pnpm run switchyard:cli -- compat-target --target codex --json` = `0`
- fresh review state in this turn:
  - reviewer = `APPROVE`
    - no evidence-backed blocker; residual risk only = manual mirror maintenance, now covered by parity tests
  - designer = `APPROVE`
    - page still reads like a restrained compat directory card, not a second giant frontdoor
- fresh contract truth in this turn:
  - dedicated compat target catalog is now the source contract for builder-facing thin compat truth
  - aggregate `public-surface-catalog.json#compatTargets` remains as a mirror, not a second competing source
  - wording remains `partial / thin / fail-closed / not full parity`
- exact implication:
  - the compat target line is now durably landed on `main`
  - current remaining work after this addendum:
    - none for this bounded wave
    - only new independent bounded waves may continue

---

## 2026-04-04 Compat-Target-Contract Wave Addendum

- the paused top-level program verdict still stands; this was a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/compat-target-contract`
  - branch started from clean `main...origin/main` after PR `#105`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already exposed `compat-targets` / `compat-target`
  - but compat target truth still lived only as an aggregate nested field inside `docs/public-surface-catalog.json#compatTargets`
  - there was still no dedicated `md + json + schema` contract surface just for thin compat target truth
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
    - static contract only
  - do **not** turn it into:
    - full consumer parity
    - builder-kit or skill-pack expansion
    - execute/write plane
    - marketing/consumer shell

---

## 2026-04-04 MCP-Tool-Entry-Fail-Closed Hotfix Git Closure Addendum

- the bounded `mcp-tool-entry-fail-closed` hotfix is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#105` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/105`
    - merge commit on `main` = `352d8a8`
    - squash title = `fix: fail closed on ambiguous MCP tool lookups`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after merge:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `pnpm run cleanup:runtime -- --apply --json` pruned:
    - disposable temp root
    - 4 older debug bundles
    - deleted bytes = `9.75 KiB`
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
- exact implication:
  - the post-merge contract-safety blocker in `mcp-tool-catalog-contract` is now cleared on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded hotfix
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 MCP-Tool-Entry-Fail-Closed Hotfix Closure Addendum

- this addendum records verification closure of the bounded hotfix wave on branch `codex/mcp-tool-entry-fail-closed`
- hotfix target:
  - `mcp-tool` and `switchyard.catalog.mcp_tool` can no longer silently return the first duplicate `name`
  - duplicate MCP tool names must now fail closed instead of pretending the first match is authoritative
- fresh repair truth in this turn:
  - CLI single-entry lookup now raises:
    - `Ambiguous MCP tool \"...\". The MCP tool catalog must keep unique tool names.`
  - MCP single-entry lookup now raises:
    - `requires an unambiguous MCP tool. The MCP tool catalog must keep unique tool names.`
  - docs/frontdoor integration now encodes MCP tool name uniqueness as an invariant
- fresh verification in this turn:
  - targeted hotfix suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 36 tests passed`
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health --json` = `0`
- fresh review verdict in this turn:
  - reviewer = `APPROVE`
    - no remaining evidence-backed blocker in the hotfix scope
- exact implication:
  - the public single-entry MCP tool lookup contract is now fail-closed and honest on `main`
  - current remaining work after this addendum:
    - none for this hotfix wave
    - only new independent bounded waves may continue

---

## 2026-04-04 MCP-Tool-Entry-Fail-Closed Hotfix Addendum

- this addendum records a new bounded hotfix wave opened immediately after reviewer found a real post-merge blocker in `mcp-tool-catalog-contract`
- current branch in progress:
  - `codex/mcp-tool-entry-fail-closed`
- exact blocker that triggered this hotfix:
  - `mcp-tool` / `switchyard.catalog.mcp_tool` publicly promise single-entry lookup by `name`
  - but name uniqueness was not yet encoded as a contract safety invariant
  - current hotfix adds:
    - duplicate-name fail-closed guard in CLI
    - duplicate-name fail-closed guard in MCP
    - integration invariant that `tools[].name` stays unique
- exact implication:
  - merged `mcp-tool-catalog-contract` is **not** yet safe to treat as final truthful closure until this hotfix lands
- execution guardrails for this hotfix:
  - keep it:
    - read-only
    - fail-closed
    - contract-safety only
  - do **not** expand into:
    - invoke/write plane
    - broader MCP redesign
    - marketing/consumer-shell work

---

## 2026-04-04 MCP-Tool-Catalog-Contract Git Closure Addendum

- the bounded mcp-tool-catalog-contract wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#104` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/104`
    - merge commit on `main` = `801b247`
    - squash title = `feat: add MCP tool catalog contract`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after merge:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
- exact implication:
  - the MCP tool catalog line is now landed on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 MCP-Tool-Catalog-Contract Closure Addendum

- this addendum records local verification closure of a new independent builder-facing bounded wave on branch `codex/mcp-tool-catalog-contract`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - new human-readable MCP tool directory:
    - `docs/mcp-tool-catalog.md`
  - new machine-readable MCP tool directory:
    - `docs/mcp-tool-catalog.json`
    - `docs/mcp-tool-catalog.schema.json`
  - new read-only CLI surface:
    - `mcp-tool-catalog`
    - `mcp-tool-catalog-schema`
    - `mcp-tool --target <toolName>`
  - new read-only MCP surface:
    - `switchyard.catalog.mcp_tool_catalog`
    - `switchyard.catalog.mcp_tool_catalog_schema`
    - `switchyard.catalog.mcp_tool`
  - frontdoor/docs sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/mcp.md`
    - `docs/api/mcp-readonly-server.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
    - `docs/faq.md`
    - `llms.txt`
- fresh verification in this turn:
  - targeted MCP-tool-catalog/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 36 tests passed`
  - repo-side gates:
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm typecheck` = `0`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- mcp-tool --target switchyard.runtime.health --json` = `0`
    - `pnpm run switchyard:cli -- mcp-tool-catalog-schema --json` = `0`
- fresh contract truth in this turn:
  - existing `mcp-tools` / `switchyard.catalog.mcp_tools` are still preserved as read-only list surfaces
  - but their backing truth now comes from the dedicated MCP tool catalog artifact instead of only the aggregate `public-surface-catalog.json#mcp.tools`
  - aggregate `catalogJson.mcp.tools` remains as a mirror and is checked for parity against the dedicated catalog
- fresh review state in this turn:
  - designer = `APPROVE`
    - the new page still reads like a button directory card, not a second giant frontdoor
  - reviewer = `APPROVE`
    - no evidence-backed blocker in the mcp-tool-catalog scope
- current remaining work after this addendum:
  - Git/GitHub closure only
  - merge the branch honestly
  - restore clean `main...origin/main`

---

## 2026-04-04 MCP-Tool-Catalog-Contract Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/mcp-tool-catalog-contract`
  - current branch starts from clean `main...origin/main` after PR `#103`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already exposes `mcp-tools` / `switchyard.catalog.mcp_tools`
  - current MCP docs pages explain representative groups and route maps
  - but there is still no dedicated `md + json + schema` contract surface just for the MCP tool catalog itself
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
    - static tool directory only
  - do **not** turn it into:
    - execution-brain promotion
    - runtime write plane
    - marketing surface
    - consumer shell

---

## 2026-04-04 Provider-Catalog-Entry-Disambiguation Hotfix Git Closure Addendum

- the bounded provider-catalog-entry-disambiguation hotfix is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#103` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/103`
    - merge commit on `main` = `38d9f4a`
    - squash title = `fix: disambiguate provider catalog entry lookups`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after hotfix merge:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
- exact implication:
  - the provider catalog line is now repaired on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this hotfix
  - the reviewer-found post-merge blocker in `provider-runtime-catalog-freeze` is cleared on `main`
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Provider-Catalog-Entry-Disambiguation Hotfix Closure Addendum

- this addendum records verification closure of the bounded hotfix wave on branch `codex/provider-catalog-entry-disambiguation`
- hotfix target:
  - `provider-entry` / `switchyard.catalog.provider_entry` can no longer silently return the first duplicate `providerId`
  - duplicate ids must now fail closed unless the caller disambiguates with `providerId:lane`
- fresh repair truth in this turn:
  - duplicate ids like `gemini` and `qwen` now raise an `Ambiguous provider entry` error
  - explicit composite ids like `gemini:web-login` now resolve correctly
  - malformed targets like `gemini:web-login:bogus` now fail closed
- fresh verification in this turn:
  - targeted provider/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 36 tests passed`
  - repo-side gates:
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm typecheck` = `0`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- provider-entry --target gemini` = fail-closed ambiguous
    - `pnpm run switchyard:cli -- provider-entry --target gemini:web-login --json` = `0`
    - `pnpm run switchyard:cli -- provider-entry --target gemini:web-login:bogus` = fail-closed invalid
- fresh review verdict in this turn:
  - reviewer = `APPROVE`
    - no remaining blocker in the hotfix scope
- exact implication:
  - the post-merge blocker found in `provider-runtime-catalog-freeze` is now cleared
  - current remaining work after this addendum:
    - Git/GitHub closure only
    - merge the hotfix honestly
    - restore clean `main...origin/main`

---

## 2026-04-04 Provider-Catalog-Entry-Disambiguation Hotfix Addendum

- this addendum records a new bounded hotfix wave opened immediately after reviewer found a real post-merge blocker in `provider-runtime-catalog-freeze`
- current branch in progress:
  - `codex/provider-catalog-entry-disambiguation`
- exact blocker that triggered this hotfix:
  - `provider-entry` and `switchyard.catalog.provider_entry` currently use `providerId` as if it were a unique key
  - but the new provider runtime catalog contains duplicate `providerId` values across lanes:
    - `gemini` appears in both `byok` and `web-login`
    - `qwen` appears in both `byok` and `web-login`
  - current read path silently returns the first match instead of failing closed or using a unique key
- exact implication:
  - the merged `provider-runtime-catalog-freeze` wave is **not** yet safe to treat as final truthful closure
  - this hotfix must finish before any honest closeout can be written for the provider catalog line
- execution guardrails for this hotfix:
  - keep it:
    - static directory only
    - read-only
    - fail-closed
    - contract-first
  - do **not** expand into:
    - live readiness / auth status / probe
    - marketing copy
    - consumer shell

---

## 2026-04-04 Provider-Runtime-Catalog-Freeze Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/provider-runtime-catalog-freeze`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - refreshed human-readable provider directory:
    - `docs/provider-runtime-catalog.md`
  - new machine-readable provider directory:
    - `docs/provider-runtime-catalog.json`
    - `docs/provider-runtime-catalog.schema.json`
  - refreshed read-only CLI surface:
    - `provider-catalog`
    - `provider-catalog-schema`
    - `provider-entry --target <providerId>`
  - refreshed read-only MCP surface:
    - `switchyard.catalog.provider_catalog`
    - `switchyard.catalog.provider_catalog_schema`
    - `switchyard.catalog.provider_entry`
  - frontdoor/docs sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
    - `docs/compat/README.md`
    - `docs/faq.md`
    - `llms.txt`
  - docs gate hardening carried in the same branch:
    - frontdoor tests now validate the dedicated provider runtime catalog schema
    - frontdoor tests now assert dedicated provider catalog parity with the legacy aggregate provider mirror
- fresh verification in this turn:
  - targeted provider/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 36 tests passed`
  - repo-side gates:
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm typecheck` = `0`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- provider-catalog-schema --json` = `0`
- fresh contract truth in this turn:
  - provider directory is no longer only explained as an embedded aggregate field
  - dedicated provider trio now exists and is exercised directly
  - the aggregate `public-surface-catalog.json#providerCatalog` still exists as a legacy mirror and is now explicitly checked against the dedicated provider catalog artifact
- current remaining work after this addendum:
  - reviewer callback preferred but not required to continue
  - Git/GitHub closure only
  - merge the branch honestly
  - restore clean `main...origin/main`

---

## 2026-04-04 Provider-Runtime-Catalog-Freeze Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/provider-runtime-catalog-freeze`
  - current branch starts from clean `main...origin/main` after PR `#101`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already exposes:
    - `provider-catalog`
    - `provider-entry`
    - `docs/provider-runtime-catalog.md`
  - but the provider directory still lives as a nested field inside:
    - `docs/public-surface-catalog.json`
  - unlike chooser / comparison / journeys / keyword truth, it is not yet frozen as its own:
    - `md + json + schema + read-only CLI + read-only MCP + tests` surface
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
    - static directory only
  - do **not** turn it into:
    - live auth status
    - provider readiness/live probe page
    - recommendation engine
    - marketing surface
    - stronger support claim than current contracts allow

---

## 2026-04-04 Builder-Intent-Router Git Closure Addendum

- the bounded builder-intent-router wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#101` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/101`
    - merge commit on `main` = `8883ab2`
    - squash title = `feat: add builder intent router`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after PR `#101` merged:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `pnpm run cleanup:runtime -- --apply --json` safely deleted:
    - `.runtime-cache/temp`
    - 4 older debug-evidence bundles
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
- exact implication:
  - the builder-intent-router wave is landed on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Builder-Intent-Router Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/builder-intent-router`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - new human-readable first-hop router:
    - `docs/builder-intent-router.md`
  - new machine-readable first-hop router:
    - `docs/builder-intent-router.json`
    - `docs/builder-intent-router.schema.json`
  - new read-only CLI surface:
    - `builder-intent-router`
    - `builder-intent-router-schema`
    - `builder-intent --target <intentId>`
  - new read-only MCP surface:
    - `switchyard.catalog.builder_intent_router`
    - `switchyard.catalog.builder_intent_router_schema`
    - `switchyard.catalog.builder_intent`
  - frontdoor/docs sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
    - `docs/faq.md`
    - `docs/plugin-skill-starter-kits.md`
    - `llms.txt`
  - docs gate hardening carried in the same branch:
    - MCP docs inventory sync test now compares the API-facing MCP page against the full machine-readable MCP tool catalog
- fresh verification in this turn:
  - targeted router/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 36 tests passed`
  - repo-side gates:
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm typecheck` = `0`
    - `pnpm build` = `0`
  - extra local smoke:
    - `pnpm run switchyard:cli -- builder-intent --target support-truth --json` = `0`
- fresh design/exploration truth in this turn:
  - designer/explorer both converged on the same real gap:
    - the repo had many truthful builder-facing surfaces already
    - but the first-hop routing problem was still too spread out across chooser/comparison/journeys/host/keyword/catalog pages
  - this wave fixes route clarity without turning the repo into:
    - a recommendation engine
    - a launch page
    - a consumer shell
- current remaining work after this addendum:
  - Git/GitHub closure only
  - merge the branch honestly
  - restore clean `main...origin/main`

---

## 2026-04-04 Builder-Intent-Router Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/builder-intent-router`
  - current branch starts from clean `main...origin/main` after PR `#100`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has many truthful builder-facing entry surfaces:
    - compat
    - public surface catalog
    - starter-pack chooser
    - starter-pack comparison
    - builder journeys
    - host playbooks / examples
    - keyword truth
  - but the very first question is still not compressed enough:
    - `what is my first hop for the problem I have right now?`
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
    - route-clarity-first
  - do **not** turn it into:
    - launch page
    - marketing surface
    - recommendation engine
    - consumer shell
    - stronger support claim than current docs already allow

---

## 2026-04-04 MCP-Inventory Truth-Sync Git Closure Addendum

- the bounded MCP-inventory-truth-sync wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#100` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/100`
    - merge commit on `main` = `9bf7c6d`
    - squash title = `docs: sync MCP inventory truth`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after PR `#100` merged:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - no runtime/browser/docker changes were introduced by this bounded docs-sync wave
- exact implication:
  - the MCP-inventory-truth-sync wave is landed on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 MCP-Inventory Truth-Sync Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/mcp-inventory-truth-sync`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - refreshed MCP frontdoor:
    - `docs/mcp.md`
  - refreshed API-facing MCP slice explainer:
    - `docs/api/mcp-readonly-server.md`
  - strengthened docs gate:
    - `tests/integration/docs/frontdoor-docs.test.ts`
- fresh sync truth in this turn:
  - the docs now explicitly cover the landed read-only MCP route map for:
    - starter-pack index / chooser / comparison
    - host playbooks / host examples
    - builder journeys
    - keyword truth
    - MCP self-description tools
  - wording still stays fail-closed:
    - `partial`
    - `read-only`
    - `not an execution brain`
    - no full MCP backend claim
- fresh verification in this turn:
  - targeted docs-frontdoor suite:
    - `pnpm exec vitest run tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `1 file / 6 tests passed`
  - repo-side gates:
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm typecheck` = `0`
    - `pnpm build` = `0`
- fresh review verdicts in this turn:
  - reviewer = `APPROVE`
    - docs/tool inventory alignment is in scope and not overclaimed
  - designer discovery confirms this direction stays builder-facing / route-clarity-first
- current remaining work after this addendum:
  - Git/GitHub closure only
  - merge the branch honestly
  - restore clean `main...origin/main`

---

## 2026-04-04 MCP-Inventory Truth-Sync Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/mcp-inventory-truth-sync`
  - current branch starts from clean `main...origin/main` after PR `#99`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has a landed read-only MCP surface on `main`
  - public catalog / tests know about newer read-only catalog tools, including:
    - starter-pack index / chooser / comparison
    - host examples
    - builder journeys
    - keyword truth
  - but `docs/mcp.md` and `docs/api/mcp-readonly-server.md` still lag behind that landed tool inventory and route map
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
    - MCP/docs sync only
  - do **not** turn it into:
    - execution-brain promotion
    - launch/marketing copy
    - new runtime capability claim
    - consumer-shell parity claim

---

## 2026-04-04 Keyword-Truth Surface Git Closure Addendum

- the bounded keyword-truth wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#99` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/99`
    - merge commit on `main` = `86a6e3e`
    - squash title = `feat: add keyword truth surface`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after PR `#99` merged:
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - repo-owned browser process check:
    - `pgrep -af '.runtime-cache/switchyard-web-auth-browser'` = `1`
    - implication = no active repo-owned browser process currently holding the managed profile
  - `pnpm run cleanup:runtime -- --apply --json` safely deleted:
    - `.runtime-cache/temp`
    - 2 older debug-evidence bundles
  - latest `pnpm run cleanup:runtime -- --dry-run --json`:
    - `deletableBytes = 0`
    - managed browser profile remains protected
  - `docker ps` still shows:
    - 2 `sourceharbor` debug containers
    - classified as `other-repo-owned`
    - no deletion performed from this repo
- exact implication:
  - the keyword-truth wave is landed on `main`
  - no program-owned branch / PR / worktree / stash tail remains for this bounded wave
  - no repo-owned browser process or runtime temp debris remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Keyword-Truth Surface Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/keyword-truth-surface`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - human-readable keyword truth page:
    - `docs/discoverability-keyword-truth.md`
  - machine-readable keyword truth source:
    - `docs/discoverability-keyword-truth.json`
    - `docs/discoverability-keyword-truth.schema.json`
  - read-only CLI surface:
    - `keyword-truth`
    - `keyword-truth-schema`
    - `keyword-entry --target <entryId>`
  - read-only MCP surface:
    - `switchyard.catalog.keyword_truth`
    - `switchyard.catalog.keyword_truth_schema`
    - `switchyard.catalog.keyword_entry`
  - frontdoor/docs sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/faq.md`
    - `docs/plugin-skill-starter-kits.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
    - `llms.txt`
- fresh drift repair in this turn:
  - human-readable and machine-readable keyword truth are now aligned again
  - `claimable-now` coverage now includes:
    - `Switchyard`
    - `shared provider runtime`
    - `AI app backend`
    - `BYOK`
    - `Web/Login`
    - `service-first AI runtime`
    - `API substrate first`
  - `Switchyard MCP` companion labels now agree on:
    - `partial`
    - `read-only MCP server`
    - `not an execution brain`
    - `not full Codex / Claude Code backend parity`
- fresh verification in this turn:
  - targeted keyword-truth/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 35 tests passed`
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm build` = `0`
- fresh review verdicts in this turn:
  - explorer = `BLOCKER FOUND THEN CLEARED`
    - initial blocker was human/machine keyword truth drift
    - drift is now repaired before closure
  - designer = `APPROVE`
    - still a label dictionary / truthful source, not a launch page or claim amplifier
  - reviewer = `APPROVE`
    - still builder-facing / read-only / fail-closed / in-scope
- current remaining work after this addendum:
  - Git/GitHub closure only
  - merge the branch honestly
  - restore clean `main...origin/main`

---

## 2026-04-04 Keyword-Truth Surface Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/keyword-truth-surface`
  - current branch starts from clean `main...origin/main` after PR `#98`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has:
    - a human-readable keyword truth page:
      - `docs/discoverability-keyword-truth.md`
  - but it still lacks:
    - machine-readable keyword truth JSON/schema
    - read-only CLI surface for keyword truth
    - read-only MCP surface for keyword truth
    - outward catalog / frontdoor / FAQ / llms sync for that truth table
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - truth-first
    - read-only
    - fail-closed
  - do **not** turn it into:
    - launch page
    - marketing surface
    - recommendation system
    - claim amplifier
    - SEO content farm

---

## 2026-04-04 Builder-Journeys Frontdoor Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/builder-journeys-hub`
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only top-level blocker still = `grok-provider-unavailable`
- landed slice on this branch now includes:
  - human-readable journey index:
    - `docs/builder-journeys.md`
  - machine-readable journey index:
    - `docs/builder-journeys.json`
    - `docs/builder-journeys.schema.json`
  - read-only CLI surface:
    - `builder-journeys`
    - `builder-journeys-schema`
    - `builder-journey --target <journeyId>`
  - read-only MCP surface:
    - `switchyard.catalog.builder_journeys`
    - `switchyard.catalog.builder_journeys_schema`
    - `switchyard.catalog.builder_journey`
  - frontdoor sync across:
    - `README.md`
    - `docs/README.md`
    - `docs/plugin-skill-starter-kits.md`
    - `docs/faq.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
    - `llms.txt`
- fresh verification in this turn:
  - targeted builder-journeys/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 35 tests passed`
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm build` = `0`
- fresh review verdicts in this turn:
  - reviewer = `APPROVE`
    - still builder-facing / read-only / fail-closed truth surface
  - designer = `APPROVE`
    - still a journey index, not launch page / marketplace / second giant frontdoor
- current remaining work after this addendum:
  - Git/GitHub closure only
  - merge the branch honestly
  - restore clean `main...origin/main`

---

## 2026-04-04 Builder-Journeys Frontdoor Git Closure Addendum

- the bounded builder-journeys wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#98` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/98`
    - merge commit on `main` = `8b1a43a`
    - squash title = `docs: add builder journey frontdoor`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
- fresh hygiene truth after PR `#98` merged:
  - `pnpm run cleanup:runtime -- --apply --json` had already cleared the previous safe deletions during the current extended closeout line
  - latest `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `docker ps` = empty
- exact implication:
  - the builder-journeys wave is landed on `main`
  - no program-owned branch / PR / worktree / stash / docker tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Builder-Journeys Frontdoor Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/builder-journeys-frontdoor`
  - current branch starts from `main` after PR `#96`
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has:
    - chooser
    - comparison/filter
    - host playbooks
    - host examples
    - runnable examples
  - but those surfaces still live across multiple frontdoors
  - current builder journey is truthful but still fragmented
- execution guardrails for this wave:
  - keep it:
    - builder-facing
    - docs/catalog-first
    - partial
    - fail-closed
  - do **not** turn it into:
    - recommendation engine
    - plugin marketplace
    - launch/marketing surface
    - full support upgrader

---

## 2026-04-04 Pack-Comparison Matrix And Chooser-Filters Git Closure Addendum

- the bounded comparison/filter wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#96` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/96`
    - merge commit on `main` = `bf64e18`
    - squash title = `feat: add starter pack comparison filters`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
- exact implication:
  - the comparison/filter wave is landed on `main`
  - no program-owned branch / PR tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Pack-Comparison Matrix And Chooser-Filters Closure Addendum

- this addendum records verification closure of a new independent builder-facing bounded wave on branch `codex/pack-comparison-filters`
- fresh implementation truth in this turn:
  - a new comparison/filter frontdoor now exists:
    - `docs/starter-pack-comparison.md`
    - `docs/starter-pack-comparison.json`
    - `docs/starter-pack-comparison.schema.json`
  - CLI now exposes:
    - `starter-pack-comparison`
    - `starter-pack-comparison-schema`
    - `starter-pack-filter --target <filterId>`
  - MCP now exposes:
    - `switchyard.catalog.starter_pack_comparison`
    - `switchyard.catalog.starter_pack_comparison_schema`
    - `switchyard.catalog.starter_pack_filter`
  - frontdoor/docs/copy now link the new surface from:
    - root `README.md`
    - `docs/README.md`
    - `docs/compat/README.md`
    - `docs/plugin-skill-starter-kits.md`
    - `docs/faq.md`
    - `docs/public-surface-catalog.md`
    - `docs/starter-pack-chooser.md`
    - `llms.txt`
  - public wording remains fail-closed:
    - comparison/filter stays builder-facing
    - no recommendation engine claim
    - no plugin marketplace claim
    - no new runtime capability claim
    - no full parity upgrader wording
- fresh verification in this turn:
  - comparison/filter focused suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 35 tests passed`
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm build` = `0`
- exact implication:
  - builders can now read side-by-side pack truth and filter groups without scanning long docs/JSON by hand
  - the wave is additive and internal; it does not reopen or erase the existing top-level external blocker

---

## 2026-04-04 Pack-Comparison Matrix And Chooser-Filters Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - branch in progress = `codex/pack-comparison-filters`
  - branch head currently equals `main`
  - `git status --short --branch` = clean branch tip
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo can already:
    - list packs
    - show one pack/scenario/host record at a time
    - route builders from chooser to playbooks/examples
  - but current repo still cannot give builders a first-class machine-readable way to:
    - compare packs side-by-side
    - filter by constraints like `starterKind`, `readOnly`, `needs invoke`, `host family`, `notYetSupported`
    - ask “which packs fit these limits?” without scanning long JSON/docs by hand
- execution guardrails for this wave:
  - keep the slice:
    - builder-facing
    - partial
    - fail-closed
    - truth-first
  - do **not** turn this into:
    - recommendation engine
    - plugin marketplace
    - marketing/SEO expansion wave
    - new runtime capability layer
    - full parity claim upgrader
- fresh implementation/verification closure in this turn:
  - new docs truth surfaces:
    - `docs/starter-pack-comparison.md`
    - `docs/starter-pack-comparison.json`
    - `docs/starter-pack-comparison.schema.json`
  - new read-only CLI surface:
    - `starter-pack-comparison`
    - `starter-pack-comparison-schema`
    - `starter-pack-filter --target <filterId>`
  - new read-only MCP surface:
    - `switchyard.catalog.starter_pack_comparison`
    - `switchyard.catalog.starter_pack_comparison_schema`
    - `switchyard.catalog.starter_pack_filter`
  - frontdoor sync landed across:
    - `README.md`
    - `docs/README.md`
    - `docs/compat/README.md`
    - `docs/plugin-skill-starter-kits.md`
    - `docs/starter-pack-chooser.md`
    - `docs/faq.md`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
    - `llms.txt`
  - fresh targeted verification:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts` = `0`
    - result = `4 files / 35 tests passed`
  - fresh repo-level verification after final blocker fix:
    - `pnpm test` = `0`
    - result = `61 files / 336 tests passed`
  - reviewer follow-up:
    - initial blocker on fake command names in `docs/starter-pack-comparison.md` fixed in this turn
  - current wave status after the blocker fix:
    - no known internal blocker remains on this branch snapshot

---

## 2026-04-04 Post-PR95 Hygiene Recheck Addendum

- fresh hygiene truth after PR `#95` merged:
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - managed browser profile remains protected asset:
    - `.runtime-cache/switchyard-web-auth-browser`
  - repo-owned verifier / reality-gate / browser-debug processes = `0`
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `docker ps` showed one live container:
    - `ghcr.io/xiaojiou176-open/sourceharbor-ci-standard:local-debug`
    - owner classification = `other-repo-owned`
    - action = `no destructive cleanup`
- exact implication:
  - Switchyard itself no longer has repo-owned browser / worktree / stash / branch / PR / process tails
  - remaining non-Switchyard container activity on the machine was left untouched on purpose because ownership belongs to another repo

---

## 2026-04-04 Host-Integration Runnable-Glue Git Closure Addendum

- the bounded host runnable glue wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#95` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/95`
    - merge commit on `main` = `a4ea785`
    - squash title = `feat: add runnable host example glue`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
- exact implication:
  - the runnable-glue wave is landed on `main`
  - no program-owned branch / PR tail remains for this bounded wave
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Host-Integration Runnable-Glue Closure Addendum

- this addendum records verification closure of the runnable-glue wave on branch `codex/host-runnable-glue`
- fresh implementation truth in this turn:
  - runnable host smoke / first-success glue now exists under:
    - `examples/hosts/_shared/host-example-helpers.mjs`
    - `examples/hosts/codex/smoke.mjs`
    - `examples/hosts/claude-code/smoke.mjs`
    - `examples/hosts/openclaw/smoke.mjs`
    - `examples/hosts/mcp/smoke.mjs`
  - package entry commands now exist:
    - `pnpm run example:host-codex`
    - `pnpm run example:host-claude-code`
    - `pnpm run example:host-openclaw`
    - `pnpm run example:host-mcp`
  - machine-readable host example records now include runnable glue metadata:
    - `smokeScriptPath`
    - `smokeCommand`
  - synchronized files include:
    - `examples/hosts/index.json`
    - `examples/hosts/index.schema.json`
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.schema.json`
    - host/example docs
    - CLI/MCP/docs/example tests
- fresh verification in this turn:
  - host-example focused checks:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts` = `0`
    - `pnpm exec vitest run tests/integration/examples/host-integration-examples.test.ts --config vitest.config.ts` = `0`
    - `pnpm run test:examples` = `0`
      - result = `2 files / 6 tests passed`
    - `pnpm run test:starter-packs` = `0`
      - result = `1 file / 5 tests passed`
  - note on a non-authoritative check:
    - a custom multi-project single-command vitest bundle showed duplicate-project noise after the implementation landed
    - repo-native gates and single-file reruns were used as the authoritative verification source instead
  - repo-side gates:
    - `pnpm typecheck` = `0`
    - `pnpm test` = `0`
      - result = `61 files / 336 tests passed`
    - `pnpm build` = `0`
- exact implication:
  - host examples are no longer only static config illustrations
  - they now also provide bounded runnable first-success glue
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
    - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Host-Integration Runnable-Glue Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - current top-level blocker still = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has:
    - chooser
    - starter-pack index
    - host playbooks
    - host examples
    - CLI/MCP read-only catalog access
  - but current `examples/hosts/**` still stop at:
    - config examples
    - copy-paste shape
    - non-runnable host-local wiring docs
  - the next most valuable builder-facing gap is:
    - moving host examples from `what config looks like` toward `bounded first-success runnable glue`
- execution guardrails for this wave:
  - keep the slice:
    - builder-facing
    - local-first
    - partial
    - fail-closed
  - do **not** upgrade anything into:
    - full Codex / Claude Code / OpenClaw parity
    - plugin marketplace
    - host product shell
    - MCP execution brain
  - allowed work shape:
    - runnable host smoke / first-success glue
    - machine-readable metadata for those runnable host examples
    - truthful docs/CLI/MCP/catalog/test alignment

---

## 2026-04-04 Post-Merge Live Recheck Addendum

- after the host-integration wave landed on `main`, the live gates were rerun again in this turn
- fresh rerun truth:
  - `pnpm run verify:service-live` = `0`
    - providers confirmed in the service proof:
      - `chatgpt`
      - `gemini`
      - `claude`
  - `pnpm run reality:gate` = `2`
  - final aggregate JSON:
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 5`
    - `externalBlockerCount = 1`
    - `failureCount = 0`
    - only blocker:
      - `provider = grok`
      - `blocker = grok-provider-unavailable`
      - `classification = provider-unavailable`
- exact implication:
  - the host-integration wave did not regress runtime/service truth
  - the top-level program verdict remains unchanged for a good reason:
    - all internal repo work stays closed
    - only the fresh Grok external blocker remains

---

## 2026-04-04 Host-Integration Runnable Glue Wave Addendum

- the paused top-level program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - no open PRs remain
  - latest persisted aggregate truth still says:
    - `overallStatus = external-blocker`
    - only blocker = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has:
    - chooser / index / playbooks / examples frontdoors
    - read-only CLI + MCP discovery for host examples
    - config-only host example assets under `examples/hosts/*`
  - but current host examples still stop at:
    - `copy-paste config`
    - `host-local wiring`
    - static discovery
  - they do **not** yet give a bounded host-local runnable first-success glue step
- execution decision:
  - add the smallest runnable host glue slice by:
    - adding per-host `smoke.mjs` assets under `examples/hosts/*`
    - reusing the already-landed starter-pack runtime / MCP smoke patterns
    - exposing smoke metadata in host example machine-readable surfaces
    - keeping CLI / MCP read-only as discovery/catalog surfaces only
  - keep the slice:
    - builder-facing
    - local-first
    - partial
    - fail-closed
    - explicitly non-marketplace / non-full-parity / non-execution-brain

---

## 2026-04-04 Post-Merge Hygiene Addendum

- fresh post-merge hygiene in this turn:
  - `pnpm run cleanup:runtime -- --apply --json` completed without touching the protected managed-browser profile
  - follow-up `pnpm run cleanup:runtime -- --dry-run --json` now reports:
    - `deletableBytes = 0`
    - `managed-browser-profile` still protected
    - `support-bundles` still kept
  - `git status --short --branch` = clean `main...origin/main`
  - no open PRs remain
  - no stash/worktree tail remains
- exact implication:
  - this turn no longer leaves repo-owned runtime temp/debug residue that should have been safely pruned
  - remaining disk footprint is dominated by the intentionally protected managed-browser profile, not disposable garbage

---

## 2026-04-04 Host-Integration Frontdoor And Examples Git Closure Addendum

- the bounded host-facing wave is now Git/GitHub closed end-to-end
- fresh Git closure truth in this turn:
  - PR `#94` = `MERGED`
    - URL = `https://github.com/xiaojiou176-open/Switchyard/pull/94`
    - merge commit on `main` = `63e3f20`
    - squash title = `[codex] close host frontdoor truth drift`
  - local branch inventory after merge/prune:
    - `main` only
  - remote branch inventory after prune:
    - `origin/main` only
  - `git status --short --branch` = clean `main...origin/main`
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - `docker ps` = empty
  - repo-owned verifier / reality-gate / browser-debug processes = `0`
- exact implication:
  - the host-integration frontdoor/examples wave is no longer “implemented but hanging on a PR”
  - it is landed on `main`
  - no program-owned branch / PR tail remains for this bounded wave
- top-level program verdict remains unchanged:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - only remaining top-level blocker still = `grok-provider-unavailable`

---

## 2026-04-04 Host-Integration Frontdoor And Examples Closure Addendum

- this addendum records closure of the bounded host-facing frontdoor wave; it does **not** reopen the paused top-level program verdict
- fresh wave truth in this turn:
  - branch in progress = `codex/host-integration-frontdoor`
  - current slice closes the remaining frontdoor/test drift around:
    - `docs/host-integration-playbooks.md`
    - `docs/host-integration-examples.md`
    - host example assets under `examples/hosts/**`
    - public catalog / README / llms / compat/doc frontdoors
    - CLI + MCP read-only coverage for host playbooks/examples
  - current public wording stays fail-closed:
    - host playbooks = how to start the host journey
    - host examples = what the first host-local config looks like
    - no page upgrades thin compat to full parity
    - no page upgrades MCP to execution brain
- fresh verification in this turn:
  - targeted host/frontdoor suite:
    - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts tests/integration/examples/host-integration-examples.test.ts --config vitest.config.ts` = `0`
    - result = `5 files / 36 tests passed`
  - `pnpm typecheck` = `0`
  - `pnpm run test:unit` = `0`
    - result = `61 files / 334 tests passed`
  - `pnpm build` = `0`
  - `pnpm run test:coverage` = `0`
    - result = `67 files / 368 tests passed`
    - coverage = `Statements 81.18% / Lines 81.16%`
- exact implication:
  - this new bounded wave has no remaining internal code/test/docs blocker on the current workstation
  - top-level program verdict remains unchanged:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - reason:
    - latest persisted aggregate truth still says `overallStatus = external-blocker`
    - only blocker still = `grok-provider-unavailable`
    - the host-integration closure slice is additive and internal; it does not erase the existing external blocker

---

## 2026-04-04 Host-Integration-Frontdoor Wave Addendum

- the paused closeout verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - current program closeout still stops at:
    - `reality-gate overallStatus = external-blocker`
    - only blocker = `grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already tells builders:
    - what Switchyard is
    - which starter pack to choose
    - what CLI/MCP/catalog surfaces exist
  - but it still does not give a single durable frontdoor for:
    - how to wire the chosen pack into a concrete host
    - what each host expects as the first integration step
    - how Codex / Claude Code / OpenClaw / MCP host journeys differ without overclaim
- execution decision:
  - add a host-integration frontdoor with:
    - human-readable host playbook page
    - machine-readable host playbook JSON + schema
    - read-only CLI and MCP access for host playbook discovery
  - keep the slice:
    - builder-facing
    - local-first
    - partial
    - fail-closed
    - explicitly non-marketplace / non-full-parity

---

## 2026-04-04 Current-State Reconfirm Addendum

- this addendum records a fresh re-check after the prior paused verdict, not a reopened engineering wave
- fresh current-state truth in this turn:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `docker ps` = empty
  - current repo-owned verifier / browser processes = `0`
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
- current persisted aggregate truth remains:
  - `.runtime-cache/reality-gate.exit = 2`
  - `.runtime-cache/reality-gate.out` still reports:
    - `overallStatus = external-blocker`
    - `externalBlockerCount = 1`
    - `failureCount = 0`
    - only blocker = `grok-provider-unavailable`
- exact implication:
  - this turn did not discover any new internal repo work that can honestly move the top-level verdict past pause
  - current program state remains:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`

---

## 2026-04-04 Host-Integration-Examples Wave Addendum

- the paused main-program verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - current main program still stops at:
    - `only true external blocker remains = grok-provider-unavailable`
- fresh gap for this wave:
  - current repo already has:
    - builder kits
    - skill packs
    - starter-pack index
    - starter-pack chooser
    - generic runnable mini-projects
  - but it still lacks **host-specific first-run example surfaces** for:
    - `Codex`
    - `Claude Code`
    - `OpenClaw`
    - `MCP`
  - current builders can decide *which pack* to pick, but still do not get a dedicated host example index that answers:
    - what a host-local config shape looks like
    - what the first host-local command/config file should be
    - which example is for a host integration vs a pack bundle
- execution decision:
  - add a bounded `host integration examples` surface with:
    - human-readable docs page
    - machine-readable index + schema
    - copy/paste host example assets
    - read-only CLI and MCP access
  - keep the slice:
    - builder-facing
    - local-first
    - partial
    - fail-closed
  - do **not** upgrade anything to:
    - full host parity
    - plugin marketplace
    - MCP execution brain

---

## 2026-04-04 Fresh Aggregate Re-Check Addendum

- this addendum supersedes the earlier intermediate wording inside the Grok timeout closeout note
- fresh final aggregate truth on the current workstation is now anchored by the persisted files:
  - `.runtime-cache/reality-gate.out`
  - `.runtime-cache/reality-gate.exit`
- latest fresh final `pnpm run reality:gate` result:
  - `overallStatus = external-blocker`
  - `exitCode = 2`
  - `internalGate.passed = true`
  - `successCount = 5`
  - `externalBlockerCount = 1`
  - `failureCount = 0`
  - only remaining blocker:
    - `provider = grok`
    - `blocker = grok-provider-unavailable`
    - `classification = provider-unavailable`
- exact implication:
  - the earlier aggregate `failure` wording is no longer current truth
  - after PR `#92`, aggregate-only ChatGPT attach instability is now fail-closed into the external-blocker bucket
  - current top-level program status remains:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  because no internal repo debt remains and the final fresh aggregate report now agrees

---

## 2026-04-04 Grok Timeout-Bounding / Final Re-Audit Addendum

- this addendum supersedes the earlier “aggregate missing final JSON” ambiguity for the current workstation
- fresh Git closure after the follow-up fixes:
  - `fix: bound grok dom fallback timeout` landed via PR `#89`
    - merge commit on `main` = `69bc1357ff9192f45f2b2da36fdc8e3d3a8337ea`
  - `fix: persist reality gate report artifacts` + test alignment landed via PR `#90`
    - merge commit on `main` = `4a6a63e04a19a6aea506f4e11054d6620edfb57c`
  - `fix: classify grok fallback timeout as external blocker` landed via PR `#91`
    - merge commit on `main` = `6b08259a7cd7a7b62b1f798f62b45f8358efdfbd`
  - `fix: classify chatgpt cdp attach failures` landed via PR `#92`
    - merge commit on `main` = `f287ed9d38669a1761e0be26afdeec89a2883c84`
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - `git worktree list` = main worktree only
  - `git stash list` = empty
- fresh runtime/live truth after the bounded timeout fix:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini = success`
  - `pnpm run verify:service-live = success`
    - the service path is still slow on this workstation, but it now finishes if given a full observation window
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider grok = failure`
  - after the external-blocker mapping slice landed, fresh Grok-only verification now returns:
    - `status = external-blocker`
    - `blocker = grok-provider-unavailable`
    - `classification = provider-unavailable`
    - `diagnostic = Grok browser DOM fallback timed out after 60000ms.`
  - `pnpm run reality:gate` now returns a fresh final JSON in this turn:
    - current freshest aggregate still ends in `overallStatus = failure`
    - `exitCode = 1`
    - `m1KernelAlphaRealityGate = fail`
    - internal gate:
      - `typecheck = 0`
      - `test = 0`
      - `build = 0`
    - live summary:
      - `successCount = 5`
      - `externalBlockerCount = 0`
      - `failureCount = 1`
      - only current live failure = `grok`
    - current honest interpretation:
      - the internal hang/never-finish bug is closed
      - the remaining non-green truth is still concentrated on the Grok provider/runtime condition on this workstation
- exact meaning of the fresh `grok` failure:
  - current Grok browser/support evidence says:
    - local session materials are present
    - canonical attach target is valid
    - current page is already on `https://grok.com/`
    - current console still shows provider-side error signals including `429` / `400`
  - exact implication:
    - the earlier internal “aggregate hangs and never gives a final verdict” bug is fixed
    - what remains is a workstation/provider-side runtime blocker on Grok invoke itself
    - this now looks like a true external/provider-side blocker or account/runtime gate on the current workstation, not unclosed internal repo drift
- fresh resource hygiene after this final re-audit:
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - repo-local debug/temp residue has been re-cleared after the final re-audit
  - repo-owned managed browser profile remains protected asset
  - a repo-owned canonical Chrome app instance tied to the managed profile can relaunch under macOS with `ppid=1` even after targeted `pkill` and app-level `quit`
    - this was treated as a protected managed-browser asset rather than force-escalating into broader machine-wide Chrome shutdown
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - repo-local `.runtime-cache/reality-gate.out` and `.runtime-cache/reality-gate.exit` are now persisted by the landed script slice
  - current final workstation verdict:
    - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - reason:
    - all currently discoverable internal repo tasks, Git tails, branch/worktree/stash tails, PR tails, and repo-owned runtime residue have been closed
    - fresh aggregate truth is no longer ambiguous
    - remaining blocker is the fresh Grok invoke failure on this credentialed workstation
    - current best evidence points at provider/runtime conditions outside what can be honestly forced from repo-local code without pretending green

---

## 2026-04-04 Strict Re-Audit Addendum

- this addendum records a new fresh strict re-audit after the chooser wave landed; it supersedes older prompt assumptions about root dirty files and also supersedes the earlier unconditional `PROGRAM COMPLETE` status for this workstation state
- fresh Git / closure baseline in this turn:
  - `git status --short --branch` = clean `main...origin/main`
  - `git log --oneline --decorate -n 15` shows chooser wave landed on `99f6f3a`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `docker ps` = empty for current repo context
- stale prompt fact explicitly reclassified again:
  - the stricter prompt's listed tracked dirty files:
    - `README.md`
    - `docs/runbooks/dev-bootstrap.md`
    - `package.json`
  - and listed untracked paths:
    - `scripts/runtime-cache-maintenance.mjs`
    - `tests/unit/web/runtime-cache-maintenance.test.ts`
    - `.serena/`
  are not current truth in this fresh turn
  - current exact implication:
    - there is no active root dirty-slice blocker in `Switchyard`
    - those prompt facts are stale handoff residue, not current repo reality
- fresh runtime/live truth in this turn:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini = success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider qwen = success`
  - `pnpm exec node scripts/verify-service-live.mjs = success`
  - extra fresh diagnostic truth:
    - a manual service-first ChatGPT invoke on this workstation completed successfully but took about `55s`
    - this explains why `pnpm run verify:service-live` and `reality:gate` can look hung in shorter observation windows even when the service path is still viable
  - `pnpm run reality:gate` / direct `run-reality-gate.mjs` in this turn did **not** yield a final JSON inside the observation workflow
  - freshest explanation for the missing aggregate verdict:
    - aggregate is slow on this workstation
    - command observation is noisy for long-running aggregate output
    - current blocker focus shifted to `grok`
- freshest `grok` truth in this turn:
  - aggregate progress reached:
    - `chatgpt = success`
    - `gemini = success`
    - `claude = success`
    - `grok = started`
  - current repo-owned Grok debug bundle fresh summary shows:
    - blocker = `grok-provider-unavailable`
    - current page remained on an authenticated Grok workspace URL
    - exact implication:
      - this looks more like provider/upstream reachability or human-verification gate
      - not like missing local session material
- current strict verdict on this workstation:
  - `PROGRAM PAUSED - ONLY TRUE EXTERNAL BLOCKERS REMAIN`
  - reason:
    - repo-side engineering, Git closure, branch/worktree/stash closure, chooser wave closure, and runtime hygiene are all clean
    - remaining uncertainty sits in fresh live aggregate closure because Grok is not freshly green on this workstation
    - the freshest evidence points to external/provider-side blockage, not new internal repo drift
- fresh resource hygiene in this turn:
  - machine browser instance count observed = `5`
  - repo-owned active browser/process count after cleanup = `0`
  - `pnpm run cleanup:runtime -- --apply` removed repo-owned temp/debug residue created by this re-audit
  - `pnpm run cleanup:runtime -- --dry-run --json` returned `deletableBytes = 0`
  - no repo-owned verifier / aggregate processes remain after explicit cleanup

---

## 2026-04-04 Starter-Pack-Chooser Wave Addendum

- the earlier `PROGRAM COMPLETE` verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
- fresh gap for this wave:
  - current repo already has:
    - machine-readable public surface catalog
    - copy-ready starter packs
    - starter-pack index + schema
    - read-only CLI and MCP catalog exposure
  - but a new builder still has to infer:
    - which pack fits which first job
    - which pack is builder-facing vs skill-facing
    - which pack is read-only inspection vs thin runtime bridge
  - current repo has a directory map, but not yet a **decision frontdoor**
- execution decision:
  - add a starter-pack chooser surface with:
    - human-readable chooser page
    - machine-readable chooser JSON + schema
    - read-only CLI and MCP access for chooser discovery
  - keep the slice builder-facing, partial, fail-closed, and explicitly non-marketplace

## 2026-04-04 Starter-Pack-Chooser Wave Closed Addendum

- the starter-pack-chooser wave is now durable Git truth on `main`:
  - branch = `codex/starter-pack-chooser-surface`
  - commit = `125f95f5400780d92e89c6be87f6b9ad8d9509df`
  - PR = `#88`
  - merge commit on `main` = `99f6f3a8f53684a35cd0e1fd8a4c9b69bb7b4970`
- exact landed artifacts:
  - `docs/starter-pack-chooser.md`
  - `docs/starter-pack-chooser.json`
  - `docs/starter-pack-chooser.schema.json`
  - read-only CLI exposure added for:
    - `starter-pack-chooser`
    - `starter-pack-chooser-schema`
    - `starter-pack-scenario`
  - read-only MCP exposure added for:
    - `switchyard.catalog.starter_pack_chooser`
    - `switchyard.catalog.starter_pack_chooser_schema`
    - `switchyard.catalog.starter_pack_scenario`
- truthful doc/catalog wiring landed with the same slice:
  - `README.md`
  - `docs/README.md`
  - `docs/compat/README.md`
  - `docs/faq.md`
  - `docs/mcp.md`
  - `docs/plugin-skill-starter-kits.md`
  - `docs/public-surface-catalog.json`
  - `docs/public-surface-catalog.md`
  - `docs/starter-pack-index.md`
  - `starter-packs/README.md`
  - `llms.txt`
- exact contract strengthening that landed:
  - current repo now gives both humans and tools a bounded answer to:
    - which starter pack fits which first job
    - which pack is builder-facing vs skill-facing
    - which pack is read-only inspection vs thin runtime bridge
  - chooser truth is now locked across:
    - docs frontdoor
    - machine-readable chooser JSON + schema
    - read-only CLI
    - read-only MCP
    - integration/unit tests
- fresh verification captured for this wave:
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts tests/integration/starter-packs/copy-ready-starter-packs.test.ts --config vitest.config.ts = 0`
  - `pnpm typecheck = 0`
  - `pnpm run test:unit = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.85%`
    - `Lines = 80.84%`
  - `pnpm run switchyard:cli -- starter-pack-scenario --target codex-builder = 0`
  - blocker-only reviewer recheck = `APPROVE / no blocker`
- post-merge hygiene closure:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only after `git fetch --prune`
  - `gh pr list --state open --limit 20` = empty
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - repo-owned browser / verifier / MCP process count = `0`
- exact honest meaning:
  - current repo now has not just starter-pack inventory and copy-ready packs
  - it also has a truthful chooser / decision frontdoor for builders and local tooling
  - this still does **not** upgrade Switchyard to:
    - shipped plugin marketplace
    - full Codex / Claude Code / OpenClaw parity
    - MCP execution brain

## 2026-04-04 Starter-Pack-Index Wave Addendum

- the earlier `PROGRAM COMPLETE` verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - repo-owned browser / verifier / MCP process count = `0`
- fresh gap for this wave:
  - `starter-packs/` now exists and is durable landed
  - but there is still no standalone machine-readable pack index surface for builders/tools
  - current builders must still infer pack-local assets by combining:
    - `starter-packs/README.md`
    - `copyReadyPackPath`
    - direct directory scanning
- execution decision:
  - add a dedicated starter-pack index + schema
  - expose it through read-only CLI and MCP
  - keep the slice builder-facing, partial, and fail-closed

## 2026-04-04 Starter-Pack-Index Wave Closed Addendum

- the starter-pack-index wave is now durable Git truth on `main`:
  - branch = `codex/starter-pack-index-surface`
  - commit = `72de0886b1d269a0fb5d7fd27328e840432d1ec0`
  - PR = `#87`
  - merge commit on `main` = `f1740bd7fe9bdc40fdf741991133b369c05b7e0f`
- exact landed artifacts:
  - `starter-packs/index.json`
  - `starter-packs/index.schema.json`
  - `docs/starter-pack-index.md`
  - read-only CLI exposure added for:
    - `starter-pack-index`
    - `starter-pack-index-schema`
    - `starter-pack-entry`
  - read-only MCP exposure added for:
    - `switchyard.catalog.starter_pack_index`
    - `switchyard.catalog.starter_pack_index_schema`
    - `switchyard.catalog.starter_pack_entry`
- truthful doc/catalog wiring landed with the same slice:
  - `README.md`
  - `docs/README.md`
  - `docs/compat/README.md`
  - `docs/faq.md`
  - `docs/mcp.md`
  - `docs/plugin-skill-starter-kits.md`
  - `docs/public-surface-catalog.md`
  - `docs/public-surface-catalog.json`
  - `starter-packs/README.md`
  - `llms.txt`
  - `tests/integration/docs/frontdoor-docs.test.ts`
  - `tests/integration/starter-packs/copy-ready-starter-packs.test.ts`
  - `tests/unit/web/switchyard-cli.test.ts`
  - `tests/unit/mcp/switchyard-mcp.test.ts`
- exact contract strengthening that landed:
  - builders and local tooling can now read:
    - pack-local file inventory
    - smoke command
    - readme/template/example entry paths
    - safeClaims / notYetSupported
  from a dedicated machine-readable index instead of reconstructing them from README plus path heuristics
- fresh verification captured for this wave:
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/starter-packs/copy-ready-starter-packs.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts = 0`
  - `pnpm typecheck = 0`
  - `pnpm run test:unit = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.75%`
    - `Lines = 80.74%`
  - PR `#87` checks all green:
    - `CodeQL`
    - `analyze`
    - `dependency-audit`
    - `secret-pattern-scan`
    - `verify`
- extra closeout note:
  - a manual post-merge aggregate rerun was attempted again after this wave
  - it recreated repo-owned verifier/browser processes and runtime-cache temp/bundles
  - those tails were explicitly re-cleared in the same turn
  - the latest stable aggregate success already recorded earlier in the blackboard remains the authoritative runtime closeout signal
- post-merge hygiene closure:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - repo-owned browser / verifier / MCP process count = `0`
- exact honest meaning:
  - current repo now gives external builders not just copy-ready packs, but a dedicated machine-readable pack directory
  - this still does **not** upgrade Switchyard to:
    - shipped plugin marketplace
    - full Codex / Claude Code / OpenClaw parity
    - MCP execution brain

---

## 2026-04-04 Final-Phase0-Recheck Addendum

- this addendum records a fresh recheck against the stricter closeout prompt, not a reopened failure
- fresh Git / hygiene baseline in this turn:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `git worktree list` = main worktree only
  - `git stash list` = empty
  - `gh pr list --state open --limit 20` = empty
  - `docker ps` = empty for current repo context
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - `pgrep -fal 'switchyard-mcp|switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` shows no repo-owned live process remains after cleanup
- fresh live verdicts captured in this turn:
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = success`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini = success`
  - `pnpm run verify:service-live = success`
  - `pnpm run reality:gate = 0`
  - latest final JSON from that rerun reported:
    - `overallStatus = success`
    - `m1KernelAlphaRealityGate = pass`
    - `successCount = 6`
    - `externalBlockerCount = 0`
    - `failureCount = 0`
- stale prompt fact explicitly reclassified:
  - the older prompt text that listed current dirty tracked changes in:
    - `README.md`
    - `docs/runbooks/dev-bootstrap.md`
    - `package.json`
    and older untracked items like:
    - `scripts/runtime-cache-maintenance.mjs`
    - `tests/unit/web/runtime-cache-maintenance.test.ts`
    - `.serena/`
  is no longer current truth for the repo root
  - those items are not present in the fresh current `git status`
  - exact implication:
    - they have already been absorbed / landed / ignored earlier
    - they are not an active dirty-slice blocker in the current handoff
- quick portfolio recheck in this turn:
  - `Shopflow`, `campus-copilot`, `multi-ai-sidepanel`, `CortexPilot` all currently show clean `main...origin/main` with no open PRs
  - `DealWatch` currently sits on a non-main local branch with local modifications but no open PR; treated as `owner-unknown` and intentionally not touched
  - `provenote` and `SourceHarbor` currently show open dependabot PR queues; they are not current Switchyard program-owned tails
  - `apple-notes-snapshot` is not currently in a normal worktree shape from this workstation path probe and was intentionally not mutated
- exact implication:
  - the stricter prompt's required Phase 0 recheck still lands on the same durable verdict:
    - `PROGRAM COMPLETE`
  - current remaining ambitions belong to new independent waves, not unfinished internal debt inside the current program

---

## 2026-04-04 Copy-Ready-Starter-Packs Wave Addendum

- the earlier `PROGRAM COMPLETE` verdict still stands; this is a **new independent bounded wave**
- fresh baseline before opening it:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - local/remote/worktree/stash inventory was already back to:
    - local branch = `main`
    - remote branch = `origin/main`
    - worktree = main only
    - stash = empty
- fresh gap for this wave:
  - current repo already has:
    - builder kits
    - starter templates
    - starter examples
    - runnable mini-projects
    - starter schemas
  - but external builder UX still jumps between:
    - docs
    - JSON
    - example scripts
  - and still lacks **copy-ready per-target / per-skill directory packs** that can be copied as a coherent bounded starter bundle
- execution decision:
  - create copy-ready starter-pack directories for:
    - `codex`
    - `claude-code`
    - `openclaw`
    - `mcp`
    - `runtime-diagnostics-pack`
    - `docs-seo-sync-pack`
  - keep them builder-facing, local-first, partial, and fail-closed
  - do **not** upgrade any surface to shipped plugin platform, full parity, or execution brain

## 2026-04-04 Copy-Ready-Starter-Packs Wave Closed Addendum

- the copy-ready starter-packs wave is now durable Git truth on `main`:
  - branch = `codex/copy-ready-starter-packs`
  - commit = `f1474f7c8a2d8dd5a9bc017c32f3b6db2c8d2bd2`
  - PR = `#86`
  - merge commit on `main` = `c53399513644ab70097b0466fafaabc7aa2ddfff`
- exact landed artifacts:
  - `starter-packs/README.md`
  - builder packs:
    - `starter-packs/builders/codex/**`
    - `starter-packs/builders/claude-code/**`
    - `starter-packs/builders/openclaw/**`
    - `starter-packs/builders/mcp/**`
  - skill packs:
    - `starter-packs/skills/runtime-diagnostics-pack/**`
    - `starter-packs/skills/docs-seo-sync-pack/**`
  - smoke helpers/tests:
    - `starter-packs/_shared/pack-helpers.mjs`
    - `tests/integration/starter-packs/copy-ready-starter-packs.test.ts`
- truthful doc/catalog wiring landed with the same slice:
  - `README.md`
  - `docs/README.md`
  - `docs/plugin-skill-starter-kits.md`
  - `docs/public-surface-catalog.md`
  - `docs/public-surface-catalog.json`
  - `docs/public-surface-catalog.schema.json`
  - `docs/starter-manifest-templates.md`
  - `docs/starter-manifest-examples.md`
  - `examples/README.md`
  - `llms.txt`
  - `tests/integration/docs/frontdoor-docs.test.ts`
- exact contract strengthening that landed:
  - `builderKits[*].copyReadyPackPath`
  - `skillPacks[*].copyReadyPackPath`
  now point external tooling at real copy-ready directories instead of docs-only entrypoints
- fresh validation captured for this wave:
  - `pnpm run test:starter-packs = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm typecheck = 0`
  - `pnpm run test:unit = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.81%`
    - `Lines = 80.79%`
  - PR `#86` checks all green:
    - `CodeQL`
    - `analyze`
    - `dependency-audit`
    - `secret-pattern-scan`
    - `verify`
- post-merge hygiene closure:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - `pgrep -fal 'switchyard-mcp|switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` returned no repo-owned live process remains
- exact honest meaning:
  - external builders now get not just docs, templates, examples, schemas, and runnable mini-projects
  - they also get per-target / per-skill copy-ready directory packs that can be copied as bounded starter bundles
  - this still does **not** upgrade Switchyard to:
    - shipped plugin marketplace
    - full Codex / Claude Code / OpenClaw parity
    - MCP execution brain

---

---

## 2026-04-04 Starter-Manifest-Schema Wave Addendum

- the earlier `PROGRAM COMPLETE` verdict still stands for the already-selected program scope
- this addendum records a **new independent bounded wave**, opened only because the user explicitly asked to keep pushing beyond the completed closeout
- fresh baseline before this wave:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
- fresh machine-readable gap detected in this turn:
  - `docs/starter-manifest-templates.json`
  - `docs/starter-manifest-examples.json`
  are already builder-facing truth surfaces
  - but they still do **not** have matching dedicated JSON schema files
  - negative search confirmed there is currently no:
    - `docs/starter-manifest-templates.schema.json`
    - `docs/starter-manifest-examples.schema.json`
    - or equivalent validation gate in current docs/frontdoor tests
- execution decision for this wave:
  - add dedicated schema files for both starter manifest JSON surfaces
  - wire them into fresh validation
  - and, if still cleanly bounded, expose them through the same read-only CLI/MCP truth bus pattern instead of inventing a new surface style

## 2026-04-04 Starter-Manifest-Schema Wave Closed Addendum

- the starter-manifest schema wave is now durable Git truth on `main`:
  - branch = `codex/starter-manifest-schemas`
  - commit = `c488737f98ed1906996923dc63f05a1cb94d3d74`
  - PR = `#85`
  - merge commit on `main` = `0aad3eea186d3bf063af321ea209dedab5d0a2cb`
- exact landed artifacts:
  - `docs/starter-manifest-templates.schema.json`
  - `docs/starter-manifest-examples.schema.json`
  - `$schema` pointers added to:
    - `docs/starter-manifest-templates.json`
    - `docs/starter-manifest-examples.json`
  - read-only CLI exposure added for:
    - `starter-manifests-schema`
    - `starter-examples-schema`
  - read-only MCP exposure added for:
    - `switchyard.catalog.starter_manifests_schema`
    - `switchyard.catalog.starter_examples_schema`
  - frontdoor/docs truth resynced in:
    - `README.md`
    - `docs/README.md`
    - `docs/compat/README.md`
    - `docs/faq.md`
    - `docs/mcp.md`
    - `docs/public-surface-catalog.md`
    - `docs/public-surface-catalog.json`
    - `docs/api/mcp-readonly-server.md`
    - `llms.txt`
- fresh validation captured for this wave:
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts tests/unit/mcp/switchyard-mcp.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts = 0`
  - `pnpm typecheck = 0`
  - `pnpm run test:unit = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.81%`
    - `Lines = 80.79%`
  - latest post-merge aggregate rerun on this same wave also returned:
    - `pnpm run reality:gate = 0`
    - `overallStatus = success`
    - `successCount = 6`
    - `externalBlockerCount = 0`
    - `failureCount = 0`
- exact honest meaning:
  - builder/plugin/skills tooling can now validate starter JSON against first-party schemas instead of only trusting docs prose or raw example shape
  - this strengthens machine-readable contracts
  - it still does **not** upgrade any starter/helper surface to:
    - shipped plugin platform
    - full Codex / Claude Code / OpenClaw parity
    - MCP execution brain
- Git / GitHub / hygiene closure after merge:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - `pgrep -fal 'switchyard-mcp|switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` returned no repo-owned live process remains
- one temporary platform-side hiccup did occur during closeout:
  - `gh pr merge 85 --merge --delete-branch` hit GitHub API rate limit **only on the remote branch deletion sub-step**
  - merge itself still succeeded
  - the stale remote branch was then deleted successfully with plain `git push origin --delete codex/starter-manifest-schemas`
  - exact implication:
    - no durable tail remains
    - the API limit spike was transient tooling noise, not a remaining blocker

---

## 2026-04-04 Post-Merge-Reality-Gate-Rerun Addendum

- after both builder-facing follow-on waves were merged to `main`, a fresh aggregate rerun was executed instead of assuming the earlier closeout still held
- fresh final gate evidence on the latest `main`:
  - `pnpm run reality:gate = 0`
  - final JSON reported:
    - `overallStatus = success`
    - `m1KernelAlphaRealityGate = pass`
    - `successCount = 6`
    - `externalBlockerCount = 0`
    - `failureCount = 0`
- provider-scoped live proof inside that rerun again returned:
  - `chatgpt = success`
  - `gemini = success`
  - `claude = success`
  - `grok = success`
  - `qwen = success`
  - BYOK `gemini-live = success`
- the rerun did recreate current-repo browser/runtime tails and they were re-cleared in the same turn:
  - repo-owned Chrome processes using `.runtime-cache/switchyard-web-auth-browser` were terminated by exact profile-path match
  - `pnpm run cleanup:runtime -- --apply --json` was rerun after the gate
  - follow-up `cleanup:runtime -- --dry-run --json` returned `deletableBytes = 0`
  - `pgrep -fal 'switchyard-mcp|switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` returned no repo-owned live process remains
- exact implication:
  - the repo is not just docs/test green after PR `#83` and `#84`
  - the merged `main` also still survives a fresh aggregate reality-gate rerun
  - current program state remains `PROGRAM COMPLETE`

---

## 2026-04-04 Builder-Follow-On-Waves-Closed Addendum

- fresh durable Git truth now includes **two** new builder-facing follow-on waves on `main`:
  - PR `#83`
    - head = `codex/mcp-builder-truth-bus`
    - merge commit = `6967ebe1971675dd4b178847d158429623a579d0`
    - merged at = `2026-04-04T14:29:35Z`
    - landed meaning:
      - read-only MCP now exposes the newer builder truth surfaces directly:
        - `surface_catalog_schema`
        - `provider_catalog` / `provider_entry`
        - `starter_manifests` / `starter_examples`
        - `builder_template` / `builder_example`
        - `skill_template` / `skill_example`
      - exact implication:
        - current repo no longer requires builders to go through CLI only for those truth surfaces
        - MCP remains `partial`, `read-only`, and **not** an execution brain
  - PR `#84`
    - head = `codex/runnable-starter-miniprojects`
    - commit = `3903a8a0fba8c7597ba10cbf56f961b45a3ccc77`
    - merge commit = `08a0da2554da7e09985ab52bcce3dc79fe14c5d8`
    - merged at = `2026-04-04T14:34:10Z`
    - landed meaning:
      - current repo now also ships real runnable starter mini-projects in `examples/` for:
        - thin runtime bridge
        - read-only MCP inspection
        - read-only runtime diagnostics
      - these are explicitly framed as:
        - builder-facing
        - first-success samples
        - local-runtime-dependent
        - fail-closed
      - they are **not** framed as:
        - shipped plugin packages
        - full parity
        - MCP execution brain
- fresh local verification for the runnable-starter wave:
  - `pnpm run test:examples = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run test:unit = 0`
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.75%`
    - `Lines = 80.74%`
- fresh post-merge Git / hygiene closure:
  - `git status --short --branch` = clean `main...origin/main`
  - local branch inventory = `main` only
  - remote branch inventory = `origin/main` only
  - `gh pr list --state open --limit 20` = empty
  - local stale remote refs for `origin/codex/mcp-builder-truth-bus` and `origin/codex/runnable-starter-miniprojects` were pruned after merge
  - `pnpm run cleanup:runtime -- --dry-run --json` still = `deletableBytes = 0`
  - no repo-owned live `switchyard-mcp` / verifier / managed-browser process remains after this wave
- exact implication:
  - the earlier master-program closeout remains valid
  - the repo has now also absorbed the next two honest builder-facing waves
  - current remaining bigger ideas, if any, belong to future independent waves rather than unfinished debt inside this run

---

## 2026-04-04 Runnable-Starter-Mini-Projects Addendum

- fresh correction to the earlier wave hypothesis:
  - after re-reading the current repo code, docs, and unit coverage, the supposed `read-only MCP truth-bus completeness` gap turned out to be **already landed**
  - current repo already exposes these builder-facing truth surfaces through MCP:
    - `surface_catalog_schema`
    - `provider_catalog` / `provider_entry`
    - `starter_manifests` / `starter_examples`
    - `builder_template` / `builder_example`
    - `skill_template` / `skill_example`
  - exact implication:
    - the older “CLI has them but MCP still lacks them” hypothesis was stale
    - the next real gap shifted from `one more JSON truth surface` to `runnable starter mini-projects`
- new bounded wave selected in this turn:
  - goal = close the builder `first success` gap with real runnable starters, not just more payload docs
  - direction chosen from fresh designer audits:
    - thin runtime bridge starter
    - read-only MCP inspector starter
    - read-only runtime diagnostics starter
- local artifacts now added on the working branch:
  - `examples/README.md`
  - `examples/runtime-bridge/README.md`
  - `examples/runtime-bridge/invoke.mjs`
  - `examples/mcp-inspector/README.md`
  - `examples/mcp-inspector/smoke.mjs`
  - `examples/runtime-diagnostics/README.md`
  - `examples/runtime-diagnostics/check.mjs`
  - `examples/_shared/runtime-example-helpers.mjs`
  - `tests/integration/examples/runnable-starters.test.ts`
- supporting frontdoor / validation wiring added locally:
  - `package.json`
  - `vitest.config.ts`
  - `README.md`
  - `docs/README.md`
  - `docs/starter-manifest-examples.md`
  - `docs/mcp.md`
  - `llms.txt`
  - `tests/integration/docs/frontdoor-docs.test.ts`
- fresh local verification already captured for this wave:
  - `pnpm run test:examples = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run test:unit = 0`
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
  - `pnpm run cleanup:runtime -- --dry-run --json` still = `deletableBytes = 0`
- current truth at this moment:
  - this wave is not Git-closed yet
  - current local branch = `codex/runnable-starter-miniprojects`
  - repo-local browser / verifier / MCP processes remain cleared after validation
  - next required step is honest Git/GitHub closure, not more speculative surface exploration

---

## 2026-04-04 MCP-Truth-Bus-Completeness Addendum

- the earlier master-program closeout remains valid; this addendum records a **new independent bounded wave**, not a reopened closure failure
- fresh baseline at the start of this new wave:
  - `git status --short --branch` = clean worktree on local branch `codex/mcp-builder-truth-bus`
  - local branch inventory = `codex/mcp-builder-truth-bus`, `main`
  - remote branch inventory = `origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - `pgrep -fal 'switchyard-mcp|switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` returned no repo-owned live process
- fresh gap hypothesis for this wave:
  - CLI already exposes builder-facing truth surfaces for:
    - provider catalog / provider entry
    - starter manifests
    - starter examples
    - builder templates / builder examples
    - skill templates / skill examples
    - surface catalog schema
  - current read-only MCP surface already exposes:
    - runtime/bootstrap/auth/provider diagnostics
    - outward catalog slices like compat targets, builder kits, skill packs, MCP status, MCP tools
  - but current MCP still appears to be missing direct read-only exposure for the newer builder-facing truth surfaces listed above
- execution decision for this wave:
  - continue with a narrow `read-only MCP truth bus completeness` slice
  - goal = let external builder tooling consume the same truthful catalog/template/example/provider surfaces through MCP, not only through CLI/docs
  - still fail-closed, still partial, still not an execution brain, and still not full consumer-parity support
- fresh local implementation and verification now completed on `codex/mcp-builder-truth-bus`:
  - new read-only MCP tools implemented for:
    - `switchyard.catalog.surface_catalog_schema`
    - `switchyard.catalog.provider_catalog`
    - `switchyard.catalog.provider_entry`
    - `switchyard.catalog.starter_manifests`
    - `switchyard.catalog.starter_examples`
    - `switchyard.catalog.builder_template`
    - `switchyard.catalog.builder_example`
    - `switchyard.catalog.skill_template`
    - `switchyard.catalog.skill_example`
  - machine-readable MCP tool inventory in `docs/public-surface-catalog.json` was expanded to match
  - human-facing docs were resynced in:
    - `docs/api/mcp-readonly-server.md`
    - `docs/mcp.md`
    - `docs/public-surface-catalog.md`
- fresh verification captured in this turn:
  - `pnpm exec vitest run tests/unit/mcp/switchyard-mcp.test.ts tests/unit/web/switchyard-cli.test.ts tests/integration/docs/frontdoor-docs.test.ts --config vitest.config.ts = 0`
  - `pnpm run test:mcp:smoke = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run test:unit = 0`
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
  - `pnpm run switchyard:cli -- mcp-tools --json = 0`
- fresh hygiene truth after this implementation pass:
  - `pgrep -fal 'switchyard-mcp|switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` showed no repo-owned live process tail after the smoke/tests
  - `pnpm run cleanup:runtime -- --dry-run --json` still = `deletableBytes = 0`
- current state of this wave:
  - code/docs/tests are locally ready
  - Git / GitHub closure still pending at the point of this addendum

## 2026-04-04 Runnable-Starter-Miniprojects Fresh-Slice Addendum

- after PR `#83` merged the MCP truth-bus completeness slice, a fresh local dirty slice was discovered instead of a clean idle worktree
- this slice is **not** random residue; fresh inspection shows it is a coherent next bounded wave:
  - new runnable starter assets under:
    - `examples/README.md`
    - `examples/runtime-bridge/**`
    - `examples/mcp-inspector/**`
    - `examples/runtime-diagnostics/**`
  - new integration coverage at:
    - `tests/integration/examples/runnable-starters.test.ts`
  - frontdoor wiring updates in:
    - `README.md`
    - `docs/README.md`
    - `docs/starter-manifest-examples.md`
    - `docs/mcp.md`
    - `llms.txt`
    - `tests/integration/docs/frontdoor-docs.test.ts`
  - validation-chain wiring updates in:
    - `package.json`
    - `vitest.config.ts`
- fresh classification:
  - this slice is the concrete follow-on to the earlier designer verdict:
    - move from payload/config examples to **truly runnable starter mini-projects**
  - current starter set is intentionally narrow:
    - minimal runtime bridge
    - read-only MCP inspector
    - read-only runtime diagnostics triage
  - it still stays inside truthful boundaries:
    - builder-facing
    - partial
    - fail-closed
    - not full consumer parity
    - not an execution brain
- execution decision:
  - continue absorbing and validating this slice instead of discarding it
  - if verification holds, this becomes the next honest landed wave after PR `#83`

---

## 2026-04-04 Browser-And-Runtime-Hygiene Addendum

- new repo-local operating rule locked for future L1/L2 runs:
  - before any `Chrome / Chromium` / profile / browser-bootstrap / live-proof / CDP attach action, first inventory the current machine state for:
    - current repo-owned browser processes
    - current repo-owned profile paths
    - current repo-owned `.runtime-cache` temp / debug / support bundles
    - current repo-owned Docker containers
  - do **not** reuse or attach to browsers / profiles / ports opened by other repos' L1s
  - do **not** leave large piles of current-repo tabs, live verifier processes, cloned profiles, temp bundles, or disposable runtime artifacts behind after verification
  - do **not** clean or stop other repos' Docker containers or browser instances
  - do **not** perform write actions against external user accounts unless the owner explicitly authorizes that exact write action
- fresh local evidence captured in this turn:
  - current repo-owned live verifier processes were explicitly stopped before docs/skill updates
  - current repo-owned managed browser processes using `.runtime-cache/switchyard-web-auth-browser` were explicitly closed after verification
  - repo-local runtime cleanup was exercised through:
    - `pnpm run audit:runtime-footprint -- --json`
    - `pnpm run cleanup:runtime -- --dry-run --json`
    - `pnpm run cleanup:runtime -- --apply --json`
  - repo-local `.runtime-cache/` size dropped from roughly `392M` to `362M` after cleanup
- cross-repo global-awareness note:
  - machine state inspection in this turn showed unrelated Chrome processes and `SourceHarbor` Docker containers
  - they were treated as out-of-scope resources and intentionally not touched

## 2026-04-04 Final-Rerun-And-Zero-Tail Addendum

- fresh final rerun was executed on latest `main` after the earlier closeout, not inferred from older evidence:
  - `pnpm run reality:gate = 0`
  - final JSON again reported:
    - `overallStatus = success`
    - `m1KernelAlphaRealityGate = pass`
    - `successCount = 6`
    - `externalBlockerCount = 0`
    - `failureCount = 0`
- the rerun temporarily recreated current-repo resource tails, and they were explicitly re-cleared in the same turn:
  - repo-owned verifier/browser processes tied to `.runtime-cache/switchyard-web-auth-browser` were re-inventoried
  - repo-owned Chrome processes were terminated by exact profile-path match after the gate finished
  - all thread-owned subagents used for the final audit were closed after their reports were consumed
- final repo-local hygiene proof after the rerun:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pgrep -fal 'switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` = no repo-owned live process remains
  - machine top-level Chrome app count = `1` (under the hard stop; no extra Switchyard-owned browser instance remains)
  - `docker ps` = empty for the current repo context
  - `pnpm run cleanup:runtime -- --dry-run --json` now reports:
    - `deletableBytes = 0`
    - `temp = missing`
    - `debug bundle count = 20` (at retention floor)
    - protected residual cache only:
      - managed browser profile about `368.1 MiB`
      - support bundles about `11.4 KiB`
      - report-only runtime records about `98.8 KiB`
- exact implication:
  - the earlier “Git tails cleared but resource tail still alive” finding is now closed
  - latest Switchyard main has both:
    - green aggregate reality proof
    - no active program-owned Git / PR / browser / verifier / temp cleanup tail left to clear

## 2026-04-04 Reviewer-Sweep-Resource-Reclear Addendum

- a later blocker-only reviewer sweep did catch one real reopened resource tail after the earlier closeout snapshot:
  - a repo-owned Chrome instance was still attached to:
    - `.runtime-cache/switchyard-web-auth-browser`
  - this meant the earlier `no live repo-owned process remains` sentence had become stale at that later observation point
- the tail was immediately re-cleared in the same turn:
  - repo-owned Chrome processes were terminated again by exact profile-path match
  - fresh follow-up checks then returned:
    - `git status --short --branch` = clean `main...origin/main`
    - `gh pr list --state open --limit 20` = empty
    - `pgrep -fal 'switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` = no repo-owned live process remains
    - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes 0`
- exact implication:
  - the reopened Chrome tail was real, not theoretical
  - it is now re-cleared
  - current remaining `.runtime-cache` contents are again only protected profile state, support bundles, and report-only records

## 2026-04-04 Post-Closeout-Sanity-Recheck Addendum

- another fresh post-closeout sanity pass was completed after the earlier final verdict, without reopening new external-account write actions:
  - `git status --short --branch` still = clean `main...origin/main`
  - `gh pr list --state open --limit 20` still = empty
  - `pgrep -fal 'switchyard-web-auth-browser|verify-web-login-live|verify-service-live|run-reality-gate'` again shows no repo-owned live process
  - machine top-level Chrome app count remains `1`
  - `pnpm run cleanup:runtime -- --dry-run --json` still reports:
    - `deletableBytes = 0`
    - `.runtime-cache/temp` missing
    - debug bundle retention still at `20`
- frontdoor/doc truth was re-opened for read audit again in this turn:
  - `README.md`
  - `docs/README.md`
  - `docs/compat/README.md`
  - `docs/mcp.md`
  - `docs/runbooks/dev-bootstrap.md`
  - `docs/public-surface-support-matrix.md`
  were re-read and no new drift signal surfaced
- latest design-side recheck returned no blocker
- reviewer-side recheck was re-prompted to stop exploring and give an immediate blocker-only verdict; it returned `APPROVE`
- both temporary audit agents were then explicitly closed so the extra re-audit itself did not leave coordination residue behind
- exact implication:
  - the program remains `PROGRAM COMPLETE`
  - this latest recheck did not reopen any Git, PR, resource, or frontdoor debt

## 2026-04-04 Outward-Catalog-And-Mcp-Truth Addendum

- the user explicitly requested a new “continue to the extreme” wave beyond the already-closed master program, so the work in this addendum is treated as a **new independent outward-surface hardening slice**, not as evidence that the previous closeout was incomplete
- fresh code/doc truth discovered in this slice:
  - current worktree already contained a real MCP code path, not just future wording:
    - `packages/surfaces/mcp/src/index.ts`
    - `scripts/switchyard-mcp.mjs`
    - `tests/unit/mcp/switchyard-mcp.test.ts`
  - this means the older public `MCP = research only` language had become too conservative for the current worktree
- exact landed enhancements in this slice:
  - added a machine-readable outward catalog:
    - `docs/public-surface-catalog.json`
    - `docs/public-surface-catalog.md`
  - extended the read-only CLI catalog surface:
    - `surface-catalog`
    - `compat-targets`
    - `compat-target --target <target>`
    - `mcp-status`
    - `mcp-tools`
  - repaired compare-page truth drift:
    - `switchyard-vs-codex`
    - `switchyard-vs-claude-code`
    no longer say “does not support today” while the public matrix says `partial`
  - promoted current MCP wording from stale `research only` to honest narrow truth:
    - `partial`
    - `read-only stdio server/tool surface`
    - `not an execution brain`
    - `not full consumer-parity backend`
  - surfaced the new builder/MCP pages on the frontdoor:
    - docs frontdoor
    - README frontdoor
    - FAQ
    - llms
    - support matrix
    - runbook
- fresh validation captured for this new slice:
  - `pnpm exec vitest run --config vitest.config.ts --project surface-sdk-client --project surface-mcp --project docs-frontdoor = 0`
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
  - `pnpm run switchyard:cli -- surface-catalog = 0`
  - `pnpm run switchyard:cli -- mcp-tools = 0`
  - `pnpm run switchyard:mcp = 0` as a bounded startup smoke on the current workstation
- hygiene closure for this slice:
  - runtime cleanup re-applied after validation
  - no repo-owned browser/verifier tail remained after the smoke
  - latest `cleanup:runtime -- --dry-run --json` returned back to `deletableBytes = 0`
- durable Git / GitHub closure for this slice:
  - branch = `codex/mcp-readonly-surface`
  - commits:
    - `b9e39d5` — `feat: land read-only MCP surface`
    - `d5ca4ac` — `fix: harden MCP base-url normalization`
  - PR = `#75`
  - merge commit on `main` = `8d12bd5`
  - remote branch deleted and locally pruned after merge
  - current repo is back on clean `main...origin/main`
- remote gate truth for this slice:
  - `verify` = pass
  - `analyze` = pass
  - `dependency-audit` = pass
  - `secret-pattern-scan` = pass
  - `CodeQL` = pass after replacing the trailing-slash regex on uncontrolled base-url input with a constant-time stripper
- exact implication:
  - current outward surface is now stronger and more machine-consumable without overstating parity
  - current worktree truth is now:
    - `CLI = partial`
    - `Codex / Claude Code / OpenClaw compat = partial`
    - `MCP = partial (read-only stdio starter only)`
  - `plugin / landing / launch / full parity` still remain future work, not silently upgraded

## 2026-04-04 Builder-Starter-And-Mcp-Roundtrip Addendum

- after the read-only MCP surface landed, the next bounded gap was no longer raw MCP existence but **builder usability**
- two follow-on builder-facing slices are now durable Git truth on `main`:
  - PR `#76` / merge commit `301ef85`
    - plugin and skills starter kits
  - PR `#77` / merge commit `9367d96`
    - skill starter catalog + real stdio MCP roundtrip smoke
- exact new builder-facing truth that landed:
  - current repo now exposes `builder-kits` / `builder-kit --target <target>` through the read-only CLI
  - current repo now documents plugin/skills starter kits in:
    - `docs/plugin-skill-starter-kits.md`
  - current public surface catalog now includes builder kit entries for:
    - `codex`
    - `claude-code`
    - `openclaw`
    - `mcp`
- exact meaning of those builder kits:
  - they are **starter recipes**, not shipped plugin execution planes
  - they stay builder-facing, local-first, truth-first, and fail-closed
  - they do not upgrade any target to full parity
- additional functional hardening landed with PR `#77`:
  - `tests/unit/mcp/switchyard-mcp.test.ts` now includes a real stdio MCP client roundtrip
  - the smoke path proves an external MCP client can:
    - start `pnpm run switchyard:mcp`
    - list tools
    - call `switchyard.runtime.health`
    - read a real structured payload back through stdio
  - `docs/api/mcp-readonly-server.md` now documents that roundtrip smoke explicitly
- fresh local verification captured for these two follow-on slices:
  - `pnpm run test:mcp:smoke = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run test:unit = 0`
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.36%`
    - `Lines = 80.35%`

## 2026-04-04 Starter-Examples Addendum

- after starter kits, provider catalog, and starter templates landed, the next bounded gap was still builder usability:
  - external builders could read truth and templates
  - but they still lacked **copy-ready example payloads**
- that slice is now durable Git truth on `main`:
  - branch = `codex/starter-example-payloads`
  - commit = `8885686` — `feat: publish starter manifest examples`
  - PR = `#82`
  - merge commit on `main` = `a917dd3`
  - remote branch deleted after merge
- exact artifacts landed:
  - `docs/starter-manifest-examples.json`
  - `docs/starter-manifest-examples.md`
  - CLI read-only commands:
    - `starter-examples`
    - `builder-example --target <target>`
    - `skill-example --target <target>`
  - frontdoor/doc links updated in:
    - `README.md`
    - `docs/README.md`
    - `docs/compat/README.md`
    - `docs/faq.md`
    - `llms.txt`
    - `tests/integration/docs/frontdoor-docs.test.ts`
- current honest meaning:
  - `Switchyard` now offers:
    - starter kits
    - starter templates
    - starter examples
  - all three remain:
    - builder-facing
    - local-first
    - truth-first
    - fail-closed
  - none of this implies shipped plugin packages, shipped skills platform, or full parity
- fresh local validation captured for this slice:
  - `pnpm run switchyard:cli -- starter-examples --json = 0`
  - `pnpm run switchyard:cli -- builder-example --target codex --json = 0`
  - `pnpm run switchyard:cli -- skill-example --target runtime-diagnostics-pack --json = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run test:unit = 0`
  - `pnpm build = 0`
- post-merge hygiene closure:
  - `git status --short --branch` = clean `main...origin/main`
  - `gh pr list --state open --limit 20` = empty
  - `pnpm run cleanup:runtime -- --dry-run --json` = `deletableBytes = 0`
  - stale recent builder-facing branches were deleted locally and pruned remotely; current branch inventory is back to just `main` + `origin/main`
  - `pnpm run switchyard:cli -- builder-kits --json = 0`
  - `pnpm run switchyard:cli -- builder-kit --target mcp --json = 0`
- Git / GitHub closure truth:
  - local stale branch `codex/plugin-skills-starter-kits` deleted
  - remote stale branch `origin/codex/plugin-skills-starter-kits` deleted
  - remote stale branch `origin/codex/skill-pack-starter-catalog` pruned after merge
  - follow-on PR `#80` / merge commit `d77f19b` landed:
    - surface-catalog schema
    - provider runtime catalog
    - starter manifest templates
  - duplicate PR `#81` was later explicitly closed after confirming the same slice had already landed through `#80`
  - current repo is back on clean `main...origin/main`
  - current open PR count = `0`
- hygiene closure after these slices:
  - no repo-owned live `switchyard-mcp` / verifier / browser tail remains
  - `pnpm run cleanup:runtime -- --dry-run --json` is back to `deletableBytes = 0`
- exact implication:
  - current outward surface is now not just machine-readable, but more builder-actionable
  - current repo now gives external builders:
    - public surface truth
    - compat target truth
    - MCP tool truth
    - plugin / skills starter-kit truth
    - one real MCP roundtrip proof
  - anything beyond that, such as full plugin ecosystems / full parity / landing stack / launch surface, remains a future independent wave

## 2026-04-04 Reality-Gate-Timeout-Repair Addendum

- fresh root validation and live proofs captured in this turn:
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.52%`
    - `Lines = 80.52%`
  - `pnpm run verify:gemini-live = 0`
  - `pnpm run verify:service-live = 0`
  - `pnpm run reality:gate = 0`
- fresh aggregate closeout truth after the repair:
  - `overallStatus = success`
  - `m1KernelAlphaRealityGate = pass`
  - `successCount = 6`
  - `externalBlockerCount = 0`
  - `failureCount = 0`
  - all five web/login providers returned `status = success`
- exact internal blocker that was closed:
  - root cause = `scripts/run-reality-gate.mjs` wrapped the entire aggregate `verify-web-login-live` rerun in a fixed outer `180000ms` timeout
  - consequence = the aggregate gate could fail as `web-login-aggregate / probe-request-failed / transport-instability` even when provider-scoped and service-first proofs were already green
  - repair = `run-reality-gate.mjs` now calls `runWebLoginLiveVerification()` directly and lets provider-level timeouts govern the sequential aggregate rerun instead of self-timing-out the whole batch early
  - regression proof = `pnpm exec vitest run tests/unit/web/reality-gate-script.test.ts --config vitest.config.ts = 0`
- resource hygiene applied after the rerun:
  - repo-owned `switchyard-web-auth-browser` processes were explicitly closed after the fresh green closeout
  - repo-owned verifier processes were explicitly stopped
  - repo-local cleanup re-ran successfully:
    - `pnpm run cleanup:runtime -- --apply --json`
  - current repo-local `.runtime-cache/` size at the end of the turn = about `367M`

## 2026-04-04 Runtime-Hygiene-Closure Addendum

- the current Switchyard runtime-hygiene / reality-gate repair slice is now durable Git truth:
  - branch = `codex/runtime-hygiene-and-reality-gate-closeout`
  - commit = `eca228da9b2ed051bde202e8cc65afc7f9d20070`
  - PR = `#71`
  - merge commit on `main` = `bb86339`
  - local repo is back on `main`
  - `main == origin/main`
- remote branch closure:
  - `origin/codex/runtime-hygiene-and-reality-gate-closeout` deleted at merge time
  - stale historical remote branch `origin/codex/wave1-stage-contract-pack` also deleted after verifying it had no open PR and was only an obsolete pre-closeout residue
  - current remote branch inventory for this repo is now just `origin/main`
- local branch/worktree/stash closure for the current repo:
  - no local `codex/*` branch remains
  - no extra linked worktree remains
  - no stash entries remain
  - current `git status --short --branch` = clean `main...origin/main`
- program-level implication:
  - current Switchyard repo no longer has any open PR / remote branch / local branch / worktree / stash tail tied to the runtime-hygiene + reality-gate closeout slice
  - current remaining portfolio activity now belongs to other repos' own waves unless separately reselected by a later program

## 2026-04-04 Shared-Machine-Budget Addendum

- the repo constitution now records explicit shared-machine budgets, not just generic hygiene principles:
  - machine-wide browser hard stop = `5`
  - current repo budget = `1` main browser + at most `1` short-lived diagnostic browser
  - current repo tab budget = `3`
  - same-provider login-state checking budget = `1-2` focused attempts before the issue must be recorded as a blocker
- these hard numbers were written into:
  - `AGENTS.md`
  - `docs/runbooks/dev-bootstrap.md`
  - `switchyard-reality-gate-closeout`
  - `switchyard-web-login-runtime-hardening`
  - `switchyard-local-first-web-auth-acquisition`
- exact meaning:
  - future runs in this repo should stop opening new Chrome/Chromium instances once the machine is already crowded
  - future live/browser investigations must prefer ownership clarity and early blocker declaration over endless browser/profile fan-out

## 2026-04-04 Shared-Machine-Budget-Closure Addendum

- the stricter shared-machine budget language is now durable Git truth:
  - branch = `codex/shared-machine-budget-discipline`
  - commit = `9052193eecec911cc5db8ccdfb5fc081a4826854`
  - PR = `#72`
  - merge commit on `main` = `faaadd3`
  - local repo is back on `main`
  - `main == origin/main`
- remote branch closure:
  - `origin/codex/shared-machine-budget-discipline` deleted after merge
  - current remote branch inventory for this repo is now just `origin/main`
- exact durable surfaces updated in Git:
  - `AGENTS.md`
  - `docs/runbooks/dev-bootstrap.md`
- repo-local execution surfaces updated in `.agents/`:
  - `switchyard-reality-gate-closeout`
  - `switchyard-web-login-runtime-hardening`
  - `switchyard-local-first-web-auth-acquisition`
- program-level meaning:
  - the repo now remembers not just generic hygiene, but explicit browser-instance, tab, profile, and login-attempt budgets for future runs on a shared machine

## 2026-04-04 Frontdoor-Truth-Resync Addendum

- final closure audit found a real frontdoor blocker:
  - `README.md`
  - `docs/runbooks/dev-bootstrap.md`
  - `docs/compat/README.md`
  - plus higher-priority phase ledgers (`m2-kernel-beta-verdict`, `m3-first-party-integration-readiness`, `v1-delivery-plan`, `wave4-consumer-contract-freeze`, `llms.txt`)
  still carried the older `chatgpt-browser-session-incomplete` / `ready but not done` storyline after the latest successful closeout
- this drift is now repaired:
  - README and runbook no longer say the repo is still blocked on a single ChatGPT browser session
  - compat frontdoor now separates public compatibility targets from first-party seam snapshots instead of mixing rollout-local labels into one public table
  - `M2 / Kernel Beta` wording is upgraded from `ready but not done` to `done on the latest credentialed closeout`
  - `M3` wording now distinguishes current bounded closures from future reselection / future expansion
  - `llms.txt` and docs frontdoor tests now align with the latest green closeout truth
- fresh proof after the resync:
  - `pnpm run test:docs-frontdoor = 0`

## 2026-04-04 Final-Closure-Audit Addendum

- final blocker-only review verdict = `APPROVE`
  - no remaining evidence-backed blocker inside the current Switchyard program boundary
- final design/frontdoor audit blocker was real and is now cleared:
  - `README.md`
  - `docs/runbooks/dev-bootstrap.md`
  - `docs/compat/README.md`
  - `llms.txt`
  - `m2-kernel-beta-verdict`
  - `m3-first-party-integration-readiness`
  - `v1-delivery-plan`
  - `wave4-consumer-contract-freeze`
  were resynced to the latest successful closeout instead of the older single-ChatGPT-blocker storyline
- latest durable Git truth for that repair:
  - branch = `codex/frontdoor-truth-resync`
  - commit = `0c28b1cee3e7dc448cbc935b2dff3852055c7ddd`
  - PR = `#73`
  - merge commit on `main` = `32f6c36`
  - local repo is back on `main`
  - `main == origin/main`
  - remote branch `origin/codex/frontdoor-truth-resync` deleted after merge
- additional cross-repo tail audit in this turn:
  - `SourceHarbor` PR `#53` merged
  - stale local branches removed
  - temp verify-side-effects stashes archived and dropped
  - current `SourceHarbor` no longer carries any Switchyard-program-owned tail
- resource hygiene verification after the final audit:
  - current `Switchyard` repo-owned browser/verifier processes = none
  - current top-level Chrome app count on the machine = `2`
  - current repo-local `.runtime-cache` remains as a managed/protected runtime asset at about `368M`
  - residual cache state is recorded, repo-local, and no longer an active cleanup blocker

## 2026-04-04 Final-Frontdoor-Blocker-Closure Addendum

- a final designer audit still found one real blocker after the earlier closeout:
  - README still mixed old pre-closeout wording with the new green closeout truth
  - docs frontdoor still omitted the runbook entrypoint
- that blocker is now closed as durable Git truth:
  - branch = `codex/final-frontdoor-blocker-closeout`
  - commit = `eebd8e73e6ea1d7bc1662c8254de8b48c1c1fa5c`
  - PR = `#74`
  - merge commit on `main` = `a9e4f9e`
  - local repo is back on `main`
  - `main == origin/main`
  - remote branch deleted after merge
- exact repair:
  - README no longer speaks from the older single-ChatGPT-blocker era
  - docs frontdoor now links `docs/runbooks/dev-bootstrap.md`
  - docs/frontdoor contract tests now accept the latest green closeout wording instead of requiring the older blocker language
- fresh proof after the repair:
  - `pnpm run test:docs-frontdoor = 0`

## 2026-04-04 Portfolio-Tail-Audit Addendum

- fresh repo-by-repo audit after the Switchyard root closeout confirms:
  - `campus-copilot` PR `#85` is now merged
  - `DealWatch` PR `#20` is now merged
  - `SourceHarbor` PR `#53` is now merged
- additional local cleanup already applied in `SourceHarbor` after merge:
  - stale local branches `codex/final-closeout-wave-20260404` and `codex/wave-lmn-final-refresh-closeout` deleted
  - temporary untracked release artifact tree `artifacts/releases/v0.1.5/` removed
  - three `codex-temp-verify-side-effects-2026-04-01*` stash entries archived under ignored `.agents/Tasks/residue-archives/2026-04-04-sourceharbor/` and then dropped
- current legal-scope reading after this audit:
  - the remaining dirty states / local branches / worktrees in `Shopflow`, `campus-copilot`, `DealWatch`, `apple-notes-snapshot`, `multi-ai-sidepanel`, `provenote`, and `CortexPilot` belong to those repos' own ongoing or future waves
  - they are no longer Switchyard master-program tails unless a later program explicitly reselects them
- exact implication:
  - current Switchyard master program no longer has any known program-owned open PR / branch / worktree / stash tail left in the related-repo portfolio

---

## 2026-04-04 Stash-Archive-And-Drop Addendum

- the previously classified non-blocking stash residue has now been fully archived and removed from active `git stash` state:
  - archive location:
    - `residue-archives/2026-04-04/shopflow-wave3-coverage-experiment.patch`
    - `residue-archives/2026-04-04/switchyard-codex-cleanup-stray-worktree.patch`
    - `residue-archives/2026-04-04/switchyard-timeout-m2-sync-transfer.patch`
- stash cleanup now completed:
  - `Switchyard`
    - old `stash@{0}` / `stash@{1}` dropped after archival
    - current `git stash list` = empty
  - `Shopflow`
    - old `stash@{0}` dropped after archival
    - current `git stash list` = empty
- exact meaning:
  - the program footprint no longer has any active stash residue left in `Switchyard` or the 5 related repos
  - historical local patch material is still preserved in ignored archive files under the master-program SSOT tree
  - local Git residue is now fully reduced to clean `main` worktrees only; there is no longer any active stash, linked worktree, or `codex/*` program branch tail left to classify

## 2026-04-04 Repo-By-Repo-Stash-Inventory Addendum

- a fresh stash sweep across the 5 related repos plus the root repo now gives the complete local-residue inventory:
  - `Shopflow`
    - `stash@{0}: On codex/wave3-shopflow-seam: preserve stale wave3 coverage experiment before worktree cleanup`
    - already classified as preserved non-blocking residue
  - `campus-copilot`
    - no local stash entries
  - `DealWatch`
    - no local stash entries
  - `apple-notes-snapshot`
    - no local stash entries
  - `multi-ai-sidepanel`
    - no local stash entries
  - `Switchyard`
    - `stash@{0}: On main: codex-cleanup-stray-worktree`
    - `stash@{1}: On codex/chatgpt-timeout-m2-sync: codex-switchyard-timeout-m2-sync-transfer`
    - both already classified as preserved historical residue / do-not-apply
- exact meaning:
  - there is no hidden local stash tail left in the 5 related repos beyond the already-known `Shopflow` preserved stash
  - the only remaining local Git residue across the entire program footprint is now exactly three explicit stash entries:
    - one in `Shopflow`
    - two in `Switchyard`
  - all three are documented and non-blocking; there is no unknown stash residue left to investigate

## 2026-04-04 Root-Stash-Residue Classification Addendum

- a fresh root-repo sweep confirms:
  - `Switchyard` local branch state = single clean `main`
  - linked worktree count = `1`
  - open PR count = `0`
  - the only remaining local Git residue in the root repo is two preserved stash entries
- stash classification:
  - `stash@{0}: On main: codex-cleanup-stray-worktree`
    - content is a small docs-truth patch against older `README.md` / `m2-kernel-beta-verdict.md` / `v1-delivery-plan.md` wording from an earlier non-green checkpoint
    - current root truth has already moved past that checkpoint, and the current blackboard / root closeout wording supersedes it
    - verdict = preserved historical residue, **do not apply**
  - `stash@{1}: On codex/chatgpt-timeout-m2-sync: codex-switchyard-timeout-m2-sync-transfer`
    - content includes a larger transport/docs/tests bundle around ChatGPT timeout fallback, Gemini live-proof assertions, closeout-gate tests, and truth-reset docs
    - current root `main` already contains the key runtime/test surfaces that matter:
      - `packages/providers/web/chatgpt/src/runtime.ts` already has `CHATGPT_TRANSPORT_FALLBACK_TIMEOUT_MS`
      - current tests already include the timeout fallback and Gemini missing-env assertions
      - later root commits (`efe9f82`, `39a3dfb`, `bf0eb9e`) already absorbed or superseded the useful parts
    - verdict = preserved historical residue, **do not apply**
- exact meaning:
  - these two root stash entries are **not** active program-owned blockers
  - they do **not** invalidate `PROGRAM COMPLETE`
  - they are intentionally left untouched because dropping them would discard pre-existing local history that is no longer needed for current closure, but also not safe to delete without explicit owner intent

## 2026-04-04 Local-Worktree-Scaffolding-Cleanup Addendum

- a fresh post-closeout sweep across the 5 related repos now confirms that the local Git scaffolding has also been cleaned up, not just the remote PR state:
  - `Shopflow`
    - local branch/worktree tail `codex/wave3-shopflow-seam` removed
    - repo is now back to a single clean `main` worktree
    - one stale local-only coverage experiment was **not** landed, because fresh `pnpm run verify:coverage` on current `main` already passes
    - that obsolete experiment was preserved as a local stash instead of being silently discarded:
      - `stash@{0}: On codex/wave3-shopflow-seam: preserve stale wave3 coverage experiment before worktree cleanup`
  - `campus-copilot`
    - local branches `codex/wave3-campus-seam` and `codex/campus-wave47-closeout` removed
    - old linked worktree removed
    - repo is now back to a single clean `main` worktree
  - `DealWatch`
    - local branch `codex/wave3-dealwatch-seam` removed
    - old linked worktree removed
    - repo is now back to a single clean `main` worktree
  - `apple-notes-snapshot`
    - local branch `codex/wave3-notes-seam` removed
    - old linked worktree removed
    - repo is now back to a single clean `main` worktree
  - `multi-ai-sidepanel`
    - local branches `codex/wave3-sidepanel-seam` and `codex/wave3-multi-clean` removed
    - old linked worktree removed
    - repo is now back to a single clean `main` worktree
- shared local scaffolding cleanup:
  - the program-owned directory `_switchyard_program_worktrees/` is now removed because it became empty after the worktree cleanup
- fresh meaning:
  - there is no longer any active local linked worktree left from the Switchyard master-program rollout
  - there is no longer any active local `codex/*` branch left in the 5 related repos that still represents a program-owned seam tail
  - the only preserved non-main artifact is the explicit `Shopflow` stash noted above, and it is preserved on purpose because current `main` already verifies green and the old coverage patch is no longer required for durable program closure

## 2026-04-04 Campus-Live-Truth-Closeout Addendum

- the remaining repo-owned post-closeout wave on `campus-copilot` is now also durable remote truth:
  - PR `#84` merged
  - merge commit = `b0f924043cb30c651fb37539900c36038ff8afc2`
  - local repo is back on `main`
  - `main == origin/main`
  - remote branch `codex/campus-live-truth-closeout` is deleted
- exact blocker class that was closed:
  - one real shell/runtime review thread in `scripts/provider-roundtrip-smoke.sh`
    - fixed by introducing explicit `stop_server` cleanup before retry continuation
    - non-healthy API startup now fails fast with a clear JSON error instead of leaving orphaned processes behind
  - one docs truth drift thread in `docs/12-wave4-7-omnibus-ledger.md`
    - fixed by reconciling Wave 4 wording so `repo-local complete` and `final convergence pass still pending` are now one coherent truth instead of two competing sentences
- fresh validation before merge:
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
  - `pnpm verify = 0`
  - `pnpm smoke:provider = 0`
- GitHub gate truth at merge time:
  - all PR checks green
  - unresolved review threads manually resolved after the fix push
  - `gh pr merge 84 --squash --delete-branch --admin = 0`
- updated program-level implication:
  - the earlier Switchyard master-program closeout stays complete
  - `campus-copilot` no longer has an active program-relevant Git tail hanging off a draft/ready PR
  - there is no active related-repo PR left in the current post-closeout wave that still needs Program L1 action

## 2026-04-04 Post-Closeout-Consumer-Git-Closure Addendum

- after the root Switchyard closeout was already green, the two remaining consumer-side Git tails have now also been closed as durable remote truth:
  - `DealWatch`
    - PR `#19` merged
    - `main == origin/main == 22a551bf162df6a900132586a717d4790f97e3f7`
    - open PR count for the active program branch = `0`
  - `multi-ai-sidepanel`
    - PR `#33` merged
    - `main == origin/main == 0cbcccf07de86f8570016a840b15c328435c838e`
    - open PR count for the active program branch = `0`
- exact meaning:
  - the earlier “do not absorb the broader dirty wave” verdict is still true at the product-boundary layer
  - but the concrete bounded slices that were still hanging on remote draft branches are no longer hanging
  - those tails are now durable Git truth on each repo's `main`
- updated program-level implication:
  - `Switchyard` root repo = durable landed on `main`
  - `DealWatch` program-relevant bounded slice = durable landed on `main`
  - `multi-ai-sidepanel` program-relevant bounded slice = durable landed on `main`
  - there is no longer any active repo-side Git closure tail left in this master program

## 2026-04-03 Wave1-All-Green-Closeout Addendum

- after reattaching the managed browser and pushing the ChatGPT login chain through the actual OpenAI sign-in path, the latest fresh live proofs are now all green:
  - `pnpm run verify:web-login-live = 0`
  - `pnpm run verify:service-live = 0`
  - `pnpm run reality:gate = 0`
- latest authoritative aggregate truth:
  - `overallStatus = success`
  - `internalGate.passed = true`
  - `successCount = 6`
  - `externalBlockerCount = 0`
  - `failureCount = 0`
  - `externalBlockers = []`
- the resolved blocker was:
  - `chatgpt-browser-session-incomplete`
- direct meaning:
  - `M1 / Kernel Alpha` closeout gate is now green on the current credentialed workstation
  - `M2 / Kernel Beta` closeout evidence is now green on the current credentialed workstation
  - the previous `grok` aggregation noise is gone in the newest authoritative rerun
  - there is no longer any active Wave 1 blocker left in the current session
- program-level implication:
  - Switchyard root repo already had durable Git closure on `main`
  - the remaining consumer repos do not need additional Git action for the Switchyard slice in this program run, because their relevant bounded seams were already landed and the currently visible dirty waves belong to their own broader independent programs

## 2026-04-03 Main-Synced-After-Merge Addendum

- latest Program L1 Git truth after the CodeQL-safe host-boundary fix:
  - PR `#70` is now merged
  - merge commit = `bf0eb9ee2fa9886a13ef78e752b7b4cff2416368`
  - local repo is back on `main`
  - `main == origin/main`
  - open PR count = `0`
- latest authoritative aggregate live truth after the `reality:gate` hardening:
  - `pnpm run reality:gate = 2`
  - `overallStatus = external-blocker`
  - `internalGate.passed = true`
  - `successCount = 5`
  - `externalBlockerCount = 1`
  - `failureCount = 0`
  - sole blocker = `chatgpt-browser-session-incomplete`
- direct meaning:
  - the previous `grok` aggregate noise is no longer an active blocker
  - the Switchyard root slice is now durable landed Git truth on `main`
  - current live lane now only has one real human/browser-session action left on `ChatGPT`

## 2026-04-03 Final-Program-L1-Rerun Addendum

- later fresh reruns in this same Program L1 turn supersede parts of the 20:36 PDT snapshot:
  - `pnpm run test:docs-frontdoor = 0` was achieved once after local wording repair, but the current dirty worktree still contains competing public-truth edits; later reruns can still flip it back to `1`
  - `pnpm run test:coverage = 1`
    - current failure: `ENOENT` while writing `coverage/.tmp/coverage-*.json`
    - this is now a real internal validation-chain blocker
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = 0`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini = 0`
  - `pnpm exec node scripts/diagnose-web-login-browser.mjs --provider chatgpt --reload --json = 0`
    - auth store still says `ready`
    - managed browser body evidence still shows logged-out landing page / login controls
  - `pnpm exec node scripts/verify-service-live.mjs = 2`
    - authoritative blocker remains `chatgpt-browser-session-incomplete`
  - `pnpm exec node scripts/run-reality-gate.mjs = 1`
    - internal gate can still fail on docs/frontdoor drift before live truth is even fully evaluated
- practical reading:
  - current program truth is no longer "only external actions remain"
  - current internal blockers are now explicit:
    - unstable v8 coverage gate
    - docs/frontdoor truth drift inside the dirty slice
    - Wave 1 verifier truth split between provider-scoped success and stricter attached-browser workspace truth

## 2026-04-03 Baseline-Rerun-Update Addendum

- Program L1 continued the mandatory baseline from the current dirty worktree and refreshed the evidence again:
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.55%`
    - `Lines = 80.59%`
  - `pnpm run verify:gemini-live = 0`
- newest standalone live truth:
  - `pnpm run verify:web-login-live = 2`
    - `chatgpt = external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
    - `gemini = success`
    - `claude = success`
    - `grok = success`
    - `qwen = success`
  - `pnpm run verify:service-live = 2`
    - first failing provider = `chatgpt`
    - blocker = `chatgpt-browser-session-incomplete`
  - retry attempt:
    - `pnpm run bootstrap:web-login-browser -- --provider chatgpt = 0`
    - immediate `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = 2`
    - result = simple browser reattach/reopen did not self-heal the ChatGPT workspace
- newest aggregate truth:
  - `pnpm run reality:gate = 1`
  - `overallStatus = failure`
  - `internalGate.passed = true`
  - `successCount = 4`
  - `externalBlockerCount = 1`
  - `failureCount = 1`
  - real external blocker = `chatgpt-browser-session-incomplete`
  - aggregate failure/noise = `grok / probe-request-failed / transport-instability`
- current honest interpretation:
  - the earlier same-session all-green window is now historical, not current authoritative truth
  - `gemini-browser-session-invalid` remains cleared in the newer rerun
  - `chatgpt-browser-session-incomplete` is again the active live blocker
  - `reality:gate` still needs minimal durability hardening because aggregate `grok` can regress to noise even while standalone full `verify:web-login-live` reports `grok = success`

## 2026-04-03 Frontdoor-Reconciliation Addendum

- repo/docs truth has now been re-synced to the newer authoritative rerun instead of the older same-session all-green window:
  - kept as current truth:
    - sole real live blocker = `chatgpt-browser-session-incomplete`
    - aggregate durability noise = `grok / probe-request-failed / transport-instability`
    - `M1` = internal gate passed, not formally closed
    - `M2` = ready but not done
  - explicitly promoted and kept:
    - `CLI = partial`
    - `Codex compat = partial`
    - `Claude Code compat = partial`
    - `OpenClaw compat = partial`
    - `MCP = research only`
- Wave 3 matrix correction also landed in this pass:
  - `multi-ai-sidepanel` no longer stays `shelved until explicit reselection`
  - current committed repo truth is `landed but bounded`
  - exact meaning:
    - maintainer-local / partial `switchyard_runtime` analyst lane exists
    - compare-first cockpit, tab orchestration, and browser-native workflow remain local
- validation-chain hardening landed in this pass:
  - `package.json` coverage entrypoints now clear Vitest cache before coverage runs
  - this removes the cache-stale false-red where docs-frontdoor coverage could read yesterday's wording after today's docs patch
- fresh verification after the reconciliation pass:
  - `pnpm test = 0`
  - `pnpm build = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.46%`
    - `Lines = 80.50%`

## 2026-04-03 Switchyard-Git-Closure Addendum

- the root repo slice is no longer only local branch truth:
  - commit `e70bb52 feat: land browser diagnostics and thin compat slices`
  - commit `0e7c264 fix: simplify reality gate web-login aggregation`
  - branch pushed: `origin/codex/master-program-durable-closeout`
  - draft PR opened: `#70`
- what this root PR now honestly contains:
  - browser-debug support surfaces
  - support-bundle / diagnose ladder runtime paths
  - fail-closed thin compat adapters for `Codex / Claude Code / OpenClaw`
  - read-only CLI starter
  - frontdoor/docs truth sync
  - coverage-entrypoint cache hardening
- what this root PR does **not** settle yet:
  - `chatgpt-browser-session-incomplete`
  - `reality:gate` aggregate `grok` noise
  - repo-by-repo consumer Git closure outside the Switchyard root repo

## 2026-04-03 Root-CodeQL-Fix Addendum

- PR `#70` initially showed one failing remote check:
  - GitHub Advanced Security / `CodeQL`
  - finding = `Incomplete URL substring sanitization`
  - hotspot = `apps/service/src/browser-debug-support.ts`
- fix landed in:
  - commit `4b65bbe fix: tighten browser host matching`
- exact repair:
  - replaced substring URL matching with parsed host matching for `grok.com` and `claude.ai`
  - tightened the Grok runtime page lookup to use the same host-boundary rule
  - added a redirected non-Grok host regression test so `https://evil.example/?next=https://grok.com/` cannot be treated as a valid Grok workspace
- fresh verification after the fix:
  - `pnpm test = 0`
- latest remote check truth after the push:
  - prior failing `CodeQL` red light is no longer the active blocker
  - `analyze (javascript-typescript)` / `dependency-audit` / `verify` have re-queued and are pending on the updated head

## 2026-04-03 Live-Blocker-Cleared Addendum

- same-session fresh truth that supersedes the older `session-incomplete` snapshot for current program execution:
  - `ChatGPT` managed browser manual login completed
  - `Gemini` managed browser manual login completed
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = 0`
  - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini = 0`
  - `pnpm run verify:web-login-live = 0`
  - `pnpm run verify:service-live = 0`
  - `pnpm run reality:gate = 0`
  - aggregate closeout payload:
    - `overallStatus = success`
    - `externalBlockers = []`
    - `failureCount = 0`
- direct meaning:
  - `chatgpt-browser-session-incomplete` is now resolved
  - `gemini-browser-session-invalid` is now resolved
  - Wave 1 is no longer blocked on managed-browser human action
  - the program has moved from "live blockers still active" to "absorb the fresh green truth into durable docs/Git/public closure"
- still-open program gaps after the blocker clearance:
  - fresh root baseline rerun under current Program L1 still needs to be re-executed and recorded against the current dirty worktree
  - Switchyard main worktree still contains a large unclosed local slice that must be reviewed, validated, split if needed, and Git-closed
  - Wave 5 thin compat is real local code, but not yet durable/Git-closed/publicly reclassified
  - Wave 6 local CLI/service-client outward slice is real local code, but still not yet promoted to an honest durable outward surface
  - Wave 3 repo-by-repo Git closure still remains open across the touched consumer worktrees
- active blocker policy reset:
  - remove `chatgpt-browser-session-incomplete` from the active blocker list
  - remove `gemini-browser-session-invalid` from the active blocker list
  - keep only the remaining internal program blockers until the next fresh rerun proves otherwise

## 2026-04-03 Authoritative-Fresh-Rerun Addendum

- Program L1 fresh reran the current dirty worktree after the earlier same-session green window and got a narrower but still non-green authoritative closeout:
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.46%`
    - `Lines = 80.50%`
  - `pnpm run verify:gemini-live = 0`
  - standalone aggregate `pnpm run verify:web-login-live` briefly emitted one provider-isolated `grok` noise packet, so it is **not** the authoritative closeout reading for this rerun
  - `pnpm run verify:service-live = 2`
    - current first blocker = `chatgpt-browser-session-incomplete`
    - attached browser still resolves to ChatGPT login/landing instead of an authenticated workspace
  - `pnpm run reality:gate = 2`
    - `overallStatus = external-blocker`
    - `internalGate.passed = true`
    - `successCount = 5`
    - `externalBlockerCount = 1`
    - `failureCount = 0`
    - sole external blocker = `chatgpt-browser-session-incomplete`
- provider-level fresh reading after the authoritative rerun:
  - `chatgpt = external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
  - `gemini = success`
  - `claude = success`
  - `grok = success`
  - `qwen = success`
- rebootstrap attempt already retried and did **not** self-heal the blocker:
  - `pnpm run bootstrap:web-login-browser -- --provider chatgpt = 0`
  - immediate provider-scoped rerun still returned `chatgpt-browser-session-incomplete`
- direct meaning:
  - the earlier same-session green window is still valuable evidence, but it is no longer the current authoritative closeout truth for this worktree
  - current honest Wave 1 reading is **not legally closed**
  - current live blocker is now narrower than the older `ChatGPT + Gemini` picture, but it is still real
  - internal program work on Wave 5/6 docs/code/Git closure remains actionable even while this single external live blocker is open

## 2026-04-03 Main-Git-Closure Addendum

- Switchyard mainline Git closure is now completed:
  - branch used for closure = `codex/master-program-durable-closeout`
  - PR = `#70`
  - PR state = `MERGED`
  - merge commit on `main` = `bf0eb9e`
  - local checkout is now back on `main...origin/main`
- merge scope now durably landed on the repo side:
  - browser diagnostics substrate
  - thin fail-closed consumer compat adapters for `Codex / Claude Code / OpenClaw`
  - read-only CLI starter / service-client diagnose projections
  - Wave 3/4/5/6 blueprint artifacts
  - frontdoor/docs/support-matrix truth sync
- current honest program reading after mainline closure:
  - main repo-side landing is durable
  - the remaining non-Git blocker is still the authoritative Wave 1 external blocker `chatgpt-browser-session-incomplete`
  - `.serena/` remains local tooling residue and is intentionally excluded from Git truth

## 2026-04-03 Shared-Client-Projections Addendum

- additional internal-only Wave 6 hardening landed in the current worktree:
  - `SwitchyardServiceClient` now exposes shared projection helpers for:
    - `providerStoreReadiness`
    - `providerLiveReadiness`
    - `providerAttachTarget`
    - `providerDiagnoseLadder`
    - `providerDiagnose`
- practical meaning:
  - browser debug/readiness projections are no longer only a CLI-side convenience
  - builder-facing runtime clients can now read the same single-purpose diagnostics without manually unpacking the whole support bundle
  - this reduces drift risk between the local CLI starter and the shared SDK/service-client surface
- touched files for this addendum:
  - `packages/surfaces/sdk-client/src/service-client.ts`
  - `packages/surfaces/sdk-client/src/index.ts`
  - `scripts/switchyard-cli.mjs`
  - `scripts/switchyard-cli.d.ts`
  - `docs/api/sdk-quickstart.md`
  - `docs/runbooks/dev-bootstrap.md`
  - `tests/unit/byok/service-client.test.ts`
  - `tests/unit/web/switchyard-cli.test.ts`
- fresh evidence for this addendum:
  - `pnpm exec vitest run tests/unit/byok/service-client.test.ts --config vitest.config.ts --project surface-sdk-client = 0`
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts --project surface-sdk-client = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
- docs alignment for this addendum:
  - `docs/api/sdk-quickstart.md` now shows the shared service-client diagnose/readiness helpers
  - `docs/runbooks/dev-bootstrap.md` now shows the local-only CLI diagnose projections as part of the workstation runbook
  - public HTTP/API docs remain conservative; the new helper layer is documented as SDK/client usage, not as a public CLI/MCP promotion or a new committed OpenAPI contract
- honest boundary remains unchanged:
  - this is still local program truth, not public CLI promotion
  - this does not change public `CLI = not now`
  - this does not change public `MCP = research only`

## 2026-04-03 Docs-Truth-Repair Addendum

- blocker-level review found public/frontdoor truth drift around Wave 5 compat wording:
  - local-only thin compat starters had been described too strongly as committed `main` support
  - public truth has now been pulled back to:
    - `Codex compat = planned`
    - `Claude Code compat = planned`
    - `OpenClaw compat = planned`
- the local code progress is still preserved, but only in the honest places:
  - this task board
  - `docs/blueprints/wave5-thin-compat-starter.md`
  - `docs/blueprints/wave6-outward-packaging-threshold.md`
- fresh validation after the docs/frontdoor repair:
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
- validation-chain repair also landed in this turn:
  - `pnpm run test:coverage` now writes to `coverage/coverage-summary.json`
  - the previous `.runtime-cache/coverage-stable/.tmp` ENOENT failure path has been removed from the scripted gate
  - fresh `pnpm run test:coverage = 0`
    - `Statements = 80.38%`
    - `Lines = 80.41%`
- current ceiling after this repair:
  - `Wave 2` remains complete
  - `Wave 5` remains local-only starter progress, not committed/publicly promoted support
  - `Wave 6` remains local-only CLI starter progress; public `CLI = not now` still holds

---

## 2026-04-03 CLI-Diagnose Addendum

- additional local-only Wave 6 progress landed in the current worktree:
  - `pnpm run switchyard:cli -- health`
  - `pnpm run switchyard:cli -- provider-diagnose --provider <providerId>`
- the new commands stay read-only and do not promote `CLI` to public support:
  - `health` exposes the already-committed service runtime health snapshot through the local CLI starter
  - `provider-diagnose` is a clearer local alias for the existing support-bundle debug truth, including:
    - `storeReadiness`
    - `liveReadiness`
    - `attachTarget`
    - `currentPage`
    - `currentConsole`
    - `currentNetwork`
    - `diagnoseLadder`
- fresh evidence for this addendum:
  - `pnpm typecheck = 0`
  - `pnpm build = 0`
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts --project surface-sdk-client = 0`
  - `pnpm run test:docs-frontdoor = 0`
  - `pnpm run switchyard:cli -- health = 0`
  - `pnpm run switchyard:cli -- provider-diagnose --provider chatgpt = 0`
    - current fresh truth from the live local service still shows:
      - `auth.state = ready`
      - `storeReadiness.runtimeReadiness = ready`
      - `liveReadiness.status = live-blocked`
      - `currentPage.classification = session-incomplete`
      - this continues to prove `store-ready != live-ready` on the tool surface, not just in wording
  - latest fresh `pnpm run test:coverage = 0`
    - `Statements = 80.33%`
    - `Lines = 80.38%`

## 2026-04-03 CLI-Debug-Projections Addendum

- additional local-only Wave 6 value landed in the current worktree:
  - `pnpm run switchyard:cli -- provider-store-readiness --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-live-readiness --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-attach-target --provider <providerId>`
  - `pnpm run switchyard:cli -- provider-diagnose-ladder --provider <providerId>`
- these commands keep the same honest boundary:
  - read-only only
  - local/runtime-facing only
  - still **not** a public CLI promotion
- fresh evidence for this addendum:
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts --project surface-sdk-client = 0`
  - `pnpm run switchyard:cli -- provider-store-readiness --provider chatgpt = 0`
    - result = `credentialState=ready`, `runtimeReadiness=ready`, `validationState=validated`
  - `pnpm run switchyard:cli -- provider-live-readiness --provider chatgpt = 0`
    - result = `status=live-blocked`
    - diagnostic = logged-out landing page / login/signup controls still visible
  - `pnpm run switchyard:cli -- provider-attach-target --provider chatgpt = 0`
    - result = managed-browser canonical attach target at `http://127.0.0.1:39222`
  - `pnpm run switchyard:cli -- provider-diagnose-ladder --provider chatgpt = 0`
    - result = direct repair/rerun ladder from the local CLI
  - latest fresh `pnpm run test:coverage = 0`
    - `Statements = 80.38%`
    - `Lines = 80.41%`
- practical effect:
  - `store-ready != live-ready` is now visible from dedicated CLI commands, not only from the whole support bundle blob
  - the canonical attach target and next-step repair ladder are now separately queryable

## 2026-04-03 Late-Session Addendum

- fresh root gates after the latest code changes:
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - `Statements = 80.09%`
    - `Lines = 80.17%`
- fresh live proofs after the latest code changes:
  - `pnpm run verify:gemini-live = 0`
  - `pnpm run verify:service-live = 2`
    - `chatgpt = external-blocker / chatgpt-browser-session-incomplete`
    - the payload now exposes `diagnoseCommand` and `supportBundlePath`
  - provider-scoped Web/Login reruns:
    - `chatgpt = external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
    - `gemini = external-blocker / session-incomplete / gemini-browser-session-invalid`
    - `grok = success`
    - `qwen = success`
    - `claude = success` still appeared in the fresh aggregate partial rerun before the long-run stall
- current Wave 1 truth:
  - browser diagnose/support-bundle surfaces are now locally landed
  - aggregate `verify:web-login-live` still long-runs after `grok`, so provider-scoped reruns are the fresher truth source for `grok/qwen`
  - a redirected `reality:gate` attempt under `sh` fell back to `node v20.16.0`, emitted engine warnings, and was killed with `EXIT=137`; it is not authoritative
- current Wave 5 truth:
  - `packages/consumers/shared`
  - `packages/consumers/codex`
  - `packages/consumers/claude-code`
  - `packages/consumers/openclaw`
  - these thin compat packages now exist locally and pass root validation/test coverage, but still lack Git closure
- current program ceiling:
  - `Wave 2` has reached truthful frontdoor closure
  - `Wave 3` has reached honest repo-by-repo ceiling statuses
  - `Wave 4` docs freeze is materially landed
  - `Wave 5` now has real code, tests, and docs in the worktree
  - `Wave 6` is still threshold-only
  - overall program still cannot be called complete because aggregate Wave 1 closeout and Git closure remain open

## 2026-04-03 Final-Rerun Addendum

- final fresh root validation after the latest local fixes:
  - `pnpm typecheck = 0`
  - `pnpm test = 0`
  - `pnpm build = 0`
  - `pnpm run test:coverage = 0`
    - stable path = `coverage/coverage-summary.json`
    - `Statements = 80.09%`
    - `Lines = 80.17%`
- final fresh standalone live truth after the latest local fixes:
  - `pnpm run verify:gemini-live = 0`
  - `pnpm run verify:web-login-live = 2`
    - `chatgpt = external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
    - `gemini = external-blocker / session-incomplete / gemini-browser-session-invalid`
    - `claude = success`
    - `grok = success`
    - `qwen = success`
  - `pnpm run verify:service-live = 2`
    - first failing provider = `chatgpt`
    - blocker = `chatgpt-browser-session-incomplete`
    - result now carries `diagnoseCommand` + `supportBundlePath`
- final fresh aggregate gate after the latest local fixes:
  - `pnpm run reality:gate = 2`
  - `overallStatus = external-blocker`
  - `internalGate.passed = true`
  - `successCount = 4`
  - `externalBlockerCount = 2`
  - `failureCount = 0`
  - external blockers = `chatgpt-browser-session-incomplete`, `gemini-browser-session-invalid`
- Wave 1 aggregate reading is now aligned again with the fresh standalone gates:
  - provider business truth = external-blocker-only (`ChatGPT + Gemini`)
  - aggregate orchestration no longer introduces a fake `transport-instability` failure for `chatgpt`
- final repo-by-repo Wave 3 reading for this turn:
  - `campus-copilot = landed but bounded`
  - `DealWatch = landed but bounded`
  - `Shopflow = landed but bounded locally, Git closure pending`
  - `apple-notes-snapshot = landed but bounded`
  - `multi-ai-sidepanel = shelved until explicit reselection`
- final phase reading for this turn:
  - `Wave 2 = complete`
  - `Wave 3 = durable verdict matrix complete, Git closure pending`
  - `Wave 4 = complete`
  - `Wave 5 = partial landed`
  - `Wave 6 = not started`

## 2026-04-03 CLI-Starter Addendum

- local-only Wave 6 progress landed in the current worktree:
  - `scripts/switchyard-cli.mjs`
  - `scripts/switchyard-cli.d.ts`
  - `package.json` now exposes `pnpm run switchyard:cli`
  - the starter is read-only and builder/runtime facing
  - current command surface:
    - `providers`
    - `auth-status`
    - `provider-status --provider <id>`
    - `provider-probe --provider <id>`
    - `provider-remediation --provider <id>`
    - `provider-support-bundle --provider <id>`
- fresh evidence for the local CLI starter:
  - `pnpm exec vitest run tests/unit/web/switchyard-cli.test.ts --config vitest.config.ts --project surface-sdk-client = 0`
  - `pnpm run switchyard:cli -- providers = 0` while a local service is running
  - `pnpm run switchyard:cli -- auth-status = 0`
  - `pnpm run switchyard:cli -- provider-current-page --provider chatgpt = 0`
  - `pnpm run switchyard:cli -- provider-support-bundle --provider chatgpt = 0`
  - latest fresh `pnpm run test:coverage = 0`
    - `Statements = 80.31%`
    - `Lines = 80.36%`
- important truth boundary:
  - this is a local, read-only CLI starter in the current worktree
  - it is **not** yet Git-closed or publicly promoted
  - public truth can still keep `CLI = not now` until Git closure and public wording sync are explicitly chosen

---

## A. Program Goal

### 终局目标

- 一次性把 `Wave 1 -> Wave 6` 推到 honest ceiling，并尽量做到 `PROGRAM COMPLETE`
- 在不扭曲 `Switchyard` 产品边界的前提下，完成 fresh rerun、truth freeze、consumer seams、compat thin slices、outward packaging

### 当前成功定义

- `Wave 1` fresh closeout rerun 与 browser capability hardening 有 fresh evidence
- `Wave 2` frontdoor/docs/support matrix 统一成同一种真话
- `Wave 3` 五个 consumer repo 都到达 durable 状态：`landed` / `landed but bounded` / `adapter seam created and reviewable` / `shared-gap escalated with evidence`
- `Wave 4` consumer contract freeze 正式落盘
- `Wave 5` `Codex / Claude Code / OpenClaw` 至少出现 committed thin compat slice
- `Wave 6` outward packaging 只在前置波次真实落地后再升格
- 所有 touched repos 完成 honest Git closure

### 当前禁止区

- 不把 `Switchyard` 做成聊天产品 / OpenClaw 换皮 / consumer 杂烩平台
- 不把 `CLI / MCP / compat / plugin / landing` 偷写成 today supported
- 不用 archive 历史绿灯覆盖今天 fresh rerun
- 不用 `auth-status ready` 覆盖 live verifier
- 不把 consumer-specific 语义反灌进 `Switchyard` 核心合同

---

## B. Truth Snapshot

### Switchyard

- Branch / worktree / PR:
  - branch = `main...origin/main`
  - `HEAD = origin/main = 282c922d8c708da73d9b9cf9520dd7f5daf49681`
  - open PR count = `0`
  - worktree is **not fully clean**
    - current modified files:
      - `README.md`
      - `docs/README.md`
      - `docs/blueprints/m2-kernel-beta-verdict.md`
      - `docs/blueprints/m3-first-party-integration-readiness.md`
      - `docs/blueprints/v1-delivery-plan.md`
      - `docs/compat/README.md`
      - `docs/runbooks/dev-bootstrap.md`
      - `docs/testing-pyramid.md`
      - `llms.txt`
      - `package.json`
      - `scripts/build-package.mjs`
      - `scripts/verify-service-live.mjs`
      - `scripts/verify-web-login-live.mjs`
      - `tests/unit/web/gemini-live-script.test.ts`
      - `tests/unit/web/live-proof.test.ts`
      - `tests/unit/web/service-live-classification.test.ts`
    - current untracked path:
      - `.serena/`
      - `docs/blueprints/wave3-consumer-seam-matrix.md`
      - `docs/blueprints/wave4-consumer-contract-freeze.md`
      - `docs/blueprints/wave5-thin-compat-starter.md`
      - `docs/blueprints/wave6-outward-packaging-threshold.md`
      - `tests/unit/byok/diagnostics.test.ts`
      - `tests/unit/web/diagnostics-runtime.test.ts`
      - `tests/unit/web/service-index.test.ts`
      - `tests/unit/web/verify-service-live-script.test.ts`
- Root validation:
  - `pnpm typecheck` = `0`
  - `pnpm test` = `0`
  - `pnpm build` = `0`
  - `pnpm run test:coverage` = `0`
    - stable gating path = `coverage/coverage-summary.json`
    - `Statements = 80.38%`
    - `Lines = 80.41%`
    - fresh truth = official scripted coverage entrypoint is green again and back above the repo-wide `>= 80%` floor
  - `pnpm run test:docs-frontdoor` = `0`
- Live gates:
  - `pnpm run verify:gemini-live` = `0`
    - `status = success`
    - model = `gemini/gemini-2.5-flash`
    - baseUrl = default Google Generative Language API
  - `pnpm run verify:web-login-live` = `2`
    - `chatgpt` = `external-blocker / session-incomplete / chatgpt-browser-session-incomplete`
    - `gemini` = `external-blocker / session-incomplete / gemini-browser-session-invalid`
    - `claude` = `success`
    - `grok` = `success`
    - `qwen` = `success`
  - `pnpm run verify:service-live` = `2`
    - `status = external-blocker`
    - first failing provider = `chatgpt`
    - blocker = `chatgpt-browser-session-incomplete`
    - classification = `session-incomplete`
  - `pnpm run reality:gate` = `2`
    - current bounded rerun left orphan `run-reality-gate` / `verify-web-login-live --provider grok` processes and was manually killed
    - current safe reading = standalone fresh gates still converge on `chatgpt-browser-session-incomplete` + `gemini-browser-session-invalid`
    - last good report in this program = `overallStatus = external-blocker`, `internalGate.passed = true`, `successCount = 4`, `externalBlockerCount = 2`, `failureCount = 0`
- Current stage ledger:
  - `M1`: 旧黑板最新正式口径 = internal gate 通过，但 `ChatGPT + Gemini` managed browser session 仍属 external blocker，尚未 formal close
  - `M2`: 旧黑板口径 = `ready but not done`
  - `M3`: 旧黑板口径 = `not started`
  - `M4`: thin-starter consumer compat work has landed, but the full program is still not globally complete
  - `Wave 4`: freeze artifact and support-surface sync complete
  - `Wave 5`: local-only thin compat starters now exist under `packages/consumers/{shared,codex,claude-code,openclaw}`, but public truth still stays `planned` until committed/Git-closed
  - `Wave 6`: local read-only CLI starter now exists in the worktree, but no outward packaging surface has earned public promotion

### 5 个 consumer 当前 reality

- `Shopflow`:
  - `main...origin/main`, dirty
  - `HEAD = bb65e4e243e61ae15855533c4c9cfa230ab1ae26`
  - local constitution: independent Chrome-first shopping extension family; storefront truth and builder workflow must stay local
- `campus-copilot`:
  - `main...origin/main`, dirty
  - `HEAD = 3eacae1e3efb8409e7dcb971fc39be70497cb923`
  - local constitution: local-first academic workspace; current formal AI path remains API-key first and `Switchyard` is future provider-runtime direction
  - fresh seam evidence:
    - `pnpm --filter @campus-copilot/api test` = `0`
    - `bash scripts/api-healthcheck.sh` = `0`
    - provider status currently reports `switchyard.ready = false / missing_runtime_url`, so the thin bridge is landed but bounded, not default-live
- `DealWatch`:
  - `main...origin/main`, dirty
  - `HEAD = 931a6cb547f860030a2ae3d4121fef17745f39d7`
  - local constitution: price-tracking product repo with FastAPI/APScheduler/PostgreSQL/Preact runtime that must remain local
  - fresh seam evidence:
    - `./scripts/test.sh -q` = `0`
    - `src/dealwatch/application/ai_integration.py` already contains `SwitchyardServiceNarrativeProvider` and `AI_PROVIDER=switchyard_service` support
- `apple-notes-snapshot`:
  - current branch = `codex/waved-through-g-final-convergence`, dirty
  - `HEAD = 5548c6ab51989b4875e012a022dc64f1f80fead3`
  - local constitution: local-first Apple Notes export wrapper; `notesctl` and notes-specific wrapper remain canonical
- `multi-ai-sidepanel`:
  - `main...origin/main`, dirty
  - `HEAD = cca5ba4b6fcfae8baf4fcc69b9dd186aaab52831`
  - local constitution: public Prompt Switchboard extension; compare-first UI and thin public doc surface remain local

### 当前已知 truth anchors

- 真理源顺序：`AGENTS.md` -> 本轮 master task board -> 旧 bootstrap task board -> `docs/adr` -> `docs/contracts` -> `docs/blueprints` -> `docs/product` -> `docs/runbooks` -> `README.md`
- 稳定产品身份：`Switchyard` = shared Provider Runtime；`V1` = `BYOK + Web/Login`
- 当前第一优先级：先做 fresh truth reset，不接受历史 closeout 冒充今日状态
- 当前 frontdoor 诚实口径：
  - `HTTP/API = supported now`
  - `SDK/client = partial`
  - `CLI = not now`
  - `MCP = research only`
  - `Codex / Claude Code / OpenClaw compat = partial (thin, fail-closed adapters only)`
  - `i18n = partial`
- Explorer B capability gap 初判：
  - shared runtime semantics 已有
  - debug control plane 仍缺
  - 应补：`canonical attach target`, `diagnose ladder`, `current-page`, `current-console`, `current-network`, `support bundle`, `blocked evidence bundle`
  - 不应补：consumer-specific profile rules、UI cockpit、release/reviewer outer shell

---

## C. Wave Ledger

| Wave | Current status | Notes |
| :--- | :--- | :--- |
| Wave 1 | in_progress (truth aligned) | fresh `verify:web-login-live` / `verify:service-live` / `reality:gate` 现在全部收敛到 `Claude / Grok` external blockers；repo-side gate 已过，当前 residual tail 不再是 provider root-cause 侦查，而是 blocker wording、evidence pack、and closeout absorb |
| Wave 2 | complete | frontdoor/docs/support matrix/proof pack/runbook 已同步到当前真话：`HTTP/API = supported now`, `CLI = partial`, `MCP = partial`, workspace blocker pack = `Claude / Grok`, 且 `pnpm run test:docs-frontdoor = 0` |
| Wave 3 | complete | `campus-copilot`、`DealWatch`、`apple-notes-snapshot` = `landed but bounded`；`Shopflow` = `adapter seam created and reviewable`；`multi-ai-sidepanel` = `shelved until explicit reselection` |
| Wave 4 | complete | freeze artifact、compat docs、support matrix 与 `llms.txt` 已完成当前 main 的边界对账 |
| Wave 5 | partial landed and publicly reclassified | thin adapters 已 landed 到 `packages/consumers/{shared,codex,claude-code,openclaw}`；public truth 已升格为 `partial / fail-closed`；当前 residual tail 主要是 Git closure 与 task-board absorb，不再是“只有 blueprint 没有代码” |
| Wave 6 | partial landed, outward ceiling still bounded | read-only CLI starter 与 read-only MCP surface 都已可诚实写成 `partial`；`plugin / landing / launch` 仍未 landed；当前 residual tail 是 honest outward wording / Git closure / evidence absorb，而不是“CLI 根本还没开始” |

---

## D. Repo Matrix

### Switchyard

- Current verdict: root validation green after rerun, but Wave 1 still blocked by provider session completeness
- This round should modify:
  - `scripts/verify-*.mjs`
  - browser/runtime supporting files
  - docs/frontdoor/support matrix/contracts if fresh truth demands
- Must not modify:
  - product boundary / ADR truth without evidence-backed reason
  - unsupported surfaces by overclaim
- Current blocker:
  - `chatgpt-browser-session-incomplete`
  - `gemini-browser-session-invalid`
- Current landed this turn:
  - `test:coverage` false-red fixed by serializing Vitest coverage execution
  - `verify-web-login-live` progress logging added so aggregate run no longer stays completely silent during provider sequencing
- Current owner: Program L1 + first-wave SubAgents
- Git closure: pending

### Shopflow

- Current verdict: adapter seam created and reviewable
- This round should modify: no further change required unless storefront-side semantics attempt to leak into the seam
- Must not modify: storefront truth, builder workflow, runtime read models
- Current blocker:
  - seam is intentionally bounded to provider/runtime delegation only
  - clean-worktree repo gate previously hit coverage tmp `ENOENT`, so Git closure remains reviewable-only
- Current owner: clean-worktree verification completed; no extra code change needed in this round unless a dedicated Shopflow stabilization pass is explicitly selected
- Git closure: dirty `main` remains frozen; clean worktree now exists at `_switchyard_program_worktrees/shopflow-wave3` on branch `codex/wave3-shopflow-seam`

### campus-copilot

- Current verdict: landed but bounded thin BFF bridge exists in `apps/api`; fresh API tests and healthcheck pass, but Switchyard runtime is still optional and currently unconfigured by default
- This round should modify: `apps/api` Switchyard seam and adjacent tests/docs only
- Must not modify: extension UI / student workflow unless fresh evidence demands
- Current blocker:
  - repo-wide `pnpm typecheck` is currently blocked elsewhere at `packages/edstem-api`
  - current healthcheck reports `switchyard.ready = false / missing_runtime_url`
- Current owner: clean-worktree verification completed; no extra code change needed in this round
- Git closure: dirty `main` remains frozen; clean worktree now exists at `_switchyard_program_worktrees/campus-wave3` on branch `codex/wave3-campus-seam`

### DealWatch

- Current verdict: landed but bounded `switchyard_service` seam already exists; fresh clean-worktree repo-owned tests now pass after env bootstrap
- This round should modify: consumer-side `AI_BASE_URL / openai_compatible` seam and nearby tests/docs
- Must not modify: merchant / recommendation / evidence product semantics
- Current blocker: seam is landed but still bounded by local runtime configuration and builder-facing docs clarity
- Current owner: clean-worktree verification completed; no extra code change needed in this round
- Git closure: dirty `main` remains frozen; clean worktree now exists at `_switchyard_program_worktrees/dealwatch-wave3` on branch `codex/wave3-dealwatch-seam`

### apple-notes-snapshot

- Current verdict: landed but bounded on the clean worktree; `./notesctl ai-diagnose` now routes AI invocation through a local Switchyard runtime while preserving deterministic fallback
- This round should modify: thin notes-specific AI adapter seam only if a smaller follow-up is still required
- Must not modify: notes MCP / snapshot / launchd mainline
- Current blocker: Git closure for the clean-worktree slice remains separate from dirty/non-main local work
- Current owner: Program L1 verifying whether the current committed slice already satisfies honest Wave 3 closure
- Git closure: dirty non-main branch remains frozen; clean worktree now exists at `_switchyard_program_worktrees/notes-wave3` on branch `codex/wave3-notes-seam`

### multi-ai-sidepanel

- Current verdict: shelved / explicit reselection required; dirty tree has no committed Switchyard seam
- This round should modify: provider/runtime seam only if explicitly reselected by evidence
- Must not modify: compare-first UI, tab orchestration, browser-native workflow
- Current blocker: seam exists only as task-board direction, not landed code
- Current owner: pending implementer only after explicit re-selection
- Git closure: dirty `main` remains frozen; clean worktree now exists at `_switchyard_program_worktrees/sidepanel-wave3` on branch `codex/wave3-sidepanel-seam`

### Codex

- Current verdict: partial thin adapter landed inside Switchyard
- This round should modify: only fail-closed thin adapter artifacts inside `packages/consumers/codex/**`
- Must not modify: full tool/MCP parity claims
- Current blocker: no full Codex shell/worktree/tool/MCP parity; only text/runtime delegation is landed
- Current owner: Program L1
- Git closure: pending

### Claude Code

- Current verdict: partial thin adapter landed inside Switchyard
- This round should modify: only fail-closed thin adapter artifacts inside `packages/consumers/claude-code/**`
- Must not modify: full runner parity claims
- Current blocker: no full Claude Code shell/approval/tool/MCP parity; only text/runtime delegation is landed
- Current owner: Program L1
- Git closure: pending

### OpenClaw

- Current verdict: partial thin adapter landed inside Switchyard
- This round should modify: only fail-closed thin adapter artifacts inside `packages/consumers/openclaw/**`
- Must not modify: product identity confusion with `openclaw-zero-token`
- Current blocker: no operator/control-plane/channel shell parity; only delegation-first runtime slice is landed
- Current owner: Program L1
- Git closure: pending

---

## E. SubAgent Queue

| Queue | Agent type | Scope | Write scope | Status | Absorbed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A | `l2-debugger` | Switchyard Wave 1 closeout / browser runtime lane | `scripts/verify-web-login-live.mjs`, `scripts/verify-service-live.mjs`, `scripts/run-reality-gate.mjs`, related tests, minimal browser/runtime supporting files | partial landed (`019d5474-9ddd-7770-af69-376f852286a8`, McClintock) | yes |
| B | `l2-explorer` | Switchyard browser capability gap map | read-only | completed (`019d5474-9ed8-7042-b173-5c170176e445`, Euclid) | yes |
| C | `l2-explorer` | Wave 2 truthful frontdoor audit | read-only | completed (`019d5474-a077-7bc0-a0c1-519e01d8c131`, Gauss) | yes |
| D | `l2-explorer` | 5 consumer seam map | read-only | completed (`019d5474-a2b3-76a1-aebb-c2da99491787`, Kuhn) | yes |
| E | `l2-librarian` | Wave 4/5/6 contract and surface research | read-only | completed (`019d5474-a518-7c63-bd38-a25ebbde15dd`, Banach) | yes |
| F | `l2-reviewer` | blocker-only review before merges | read-only | pending trigger | no |
| G | `l2-implementer` | Switchyard Wave 2 truthful frontdoor sync | `README.md`, `docs/blueprints/m2-kernel-beta-verdict.md`, `docs/blueprints/m3-first-party-integration-readiness.md`, `llms.txt`, optional `docs/compat/README.md` | shutdown (`019d5494-36d5-7c70-993a-e31448625a3d`, Mencius) | yes |
| H | `l2-implementer` | Switchyard coverage recovery around `verify-service-live` | `tests/unit/web/service-live-classification.test.ts`, optional `tests/unit/web/verify-service-live-script.test.ts`, optional minimal `scripts/verify-service-live.mjs` | shutdown (`019d5494-3ae6-7cf3-9710-7255c400a2e9`, Hypatia) | yes |
| I | `l2-implementer` | `campus-copilot` `apps/api` bounded Switchyard seam | `apps/api/src/index.ts`, `apps/api/src/index.test.ts`, `docs/05-ai-provider-and-runtime.md`, `docs/10-builder-api-and-ecosystem-fit.md`, `docs/api/openapi.yaml` | shutdown (`019d5494-4263-79b3-8a61-9319bec42d71`, Kant) | no |
| J | `l2-implementer` | `DealWatch` bounded Switchyard seam | `src/dealwatch/application/ai_integration.py`, `src/dealwatch/infra/config.py`, `tests/test_product_service.py`, `tests/test_product_api.py`, `docs/integrations/README.md` | shutdown (`019d5494-4947-79d3-a7d2-1db92406312b`, Hubble) | no |
| K | `l2-implementer` | `campus-copilot` clean-worktree bounded seam retry | same bounded scope as queue I, but only inside clean worktree | completed (`019d54c6-f733-7261-b85e-6e9e0df6892f`, Laplace) | yes |
| L | `l2-implementer` | `DealWatch` clean-worktree bounded seam retry | same bounded scope as queue J, but only inside clean worktree | completed (`019d54c6-f850-7db0-98f0-e13f1212398b`, Parfit) | yes |
| M | `l2-debugger` | Switchyard Wave 1 closeout / browser runtime lane rerun | `scripts/verify-web-login-live.mjs`, `scripts/verify-service-live.mjs`, `scripts/run-reality-gate.mjs`, related tests, minimal browser/runtime supporting files | running (`019d54ec-b633-76d1-8859-74b6bdbd01a6`, Wegener) | no |
| N | `l2-explorer` | Switchyard browser capability gap map rerun | read-only | running (`019d54ec-beec-7053-9e0d-c1f07476c7bb`, Einstein) | no |
| O | `l2-explorer` | Wave 2 truthful frontdoor audit rerun | read-only | running (`019d54ec-c659-70a2-95a3-f698c3212eba`, Carson) | no |
| P | `l2-explorer` | 5 consumer seam map rerun | read-only | running (`019d54ec-caaf-7420-9db2-e36505ae6db2`, Locke) | no |
| Q | `l2-librarian` | Wave 4/5/6 contract and surface research rerun | read-only | running (`019d54ec-d651-73a2-9f77-74d61f4fcf8f`, Popper) | no |
| R | `l2-implementer` | Switchyard Wave 1 browser/runtime debug control-plane | `apps/service/src/**`, `packages/surfaces/http/src/**`, `packages/surfaces/sdk-client/src/**`, `scripts/**`, `tests/unit/web/**`, `tests/integration/service-http/**` | running (`019d54f1-e285-76d1-8524-5d3d946a820c`, Erdos) | no |
| S | `l2-implementer` | Switchyard Wave 5 thin compat code slice | `packages/consumers/**`, optional `packages/contracts/src/**`, `vitest.config.ts`, `package.json`, compat tests | running (`019d54f1-e5fd-73f0-98e2-7f53a5e824c4`, Lorentz) | no |

Session / agent ids:

- A = `019d5474-9ddd-7770-af69-376f852286a8`
- B = `019d5474-9ed8-7042-b173-5c170176e445`
- C = `019d5474-a077-7bc0-a0c1-519e01d8c131`
- D = `019d5474-a2b3-76a1-aebb-c2da99491787`
- E = `019d5474-a518-7c63-bd38-a25ebbde15dd`
- G = `019d5494-36d5-7c70-993a-e31448625a3d`
- H = `019d5494-3ae6-7cf3-9710-7255c400a2e9`
- I = `019d5494-4263-79b3-8a61-9319bec42d71`
- J = `019d5494-4947-79d3-a7d2-1db92406312b`
- K = `019d54c6-f733-7261-b85e-6e9e0df6892f`
- L = `019d54c6-f850-7db0-98f0-e13f1212398b`
- M = `019d54ec-b633-76d1-8859-74b6bdbd01a6`
- N = `019d54ec-beec-7053-9e0d-c1f07476c7bb`
- O = `019d54ec-c659-70a2-95a3-f698c3212eba`
- P = `019d54ec-caaf-7420-9db2-e36505ae6db2`
- Q = `019d54ec-d651-73a2-9f77-74d61f4fcf8f`
- R = `019d54f1-e285-76d1-8524-5d3d946a820c`
- S = `019d54f1-e5fd-73f0-98e2-7f53a5e824c4`

---

## F. Decision Log

1. 先做 fresh truth reset，再谈任何 `PROGRAM COMPLETE`
   - Why: 用户明确禁止旧 archive 绿灯覆盖今天 fresh rerun
   - Evidence: 本轮用户主任务；旧 bootstrap board 已记录 2026-04-02 external blockers 仍在
   - Impacts: `Wave 1` 必须最先开打

2. 当前主黑板作为唯一执行 SSOT
   - Why: 用户要求防失忆，且本轮涉及多 repo / 多 SubAgent / 多波次 truth
   - Evidence: 本轮用户指令第 2 节
   - Impacts: 所有阶段、Git、blocker、owner 状态都要先回写这里

3. 第一波先派 debugger + explorers + librarian，不先派 implementers
   - Why: 先锁 fresh truth、browser gap、consumer seam 与 outward surface honest ceiling
   - Evidence: 用户第 6 节 Mandatory SubAgent Program
   - Impacts: 第二波 implementers 只在边界清楚后再分仓并行

4. 当前 external-only closeout 口径仍然不能沿用到本轮
   - Why: 虽然 root validation 现在已完全站稳、coverage 也回到 80 线以上，但 Wave 2-6 仍未 landed，不能把 Wave 1 的 external-only 状态偷换成整个 program 的 external-only
   - Evidence:
     - `pnpm run test:coverage = 0`
     - `Statements = 80.11%`
     - `Lines = 80.18%`
     - `pnpm run verify:web-login-live = 2`
     - `pnpm run verify:service-live = 2`
     - `pnpm run reality:gate = 2`
   - Impacts: 当前 program verdict 仍不能写成 external-only，因为 Wave 2-6 还没压平；但 root validation 与 Wave 1 自身已不再有 fresh internal provider failure

5. 当前 live-gate truth 发生分化，不能再用单句 “gates red/green” 概括
   - Why: `gemini-live` 绿，`service-live` 与 aggregate `verify:web-login-live` 都收敛到同一组 external blockers，`reality:gate` 也给出单一聚合报告
   - Evidence: 本轮 fresh command ledger
   - Impacts: Wave 1 可以诚实写成“internal gate passed, external blockers remain”，但还不能 formal close `M1`

6. Browser capability升级要补 shared runtime 的“诊断后视镜”，不是 consumer 的“驾驶舱”
   - Why: Explorer B 已证明 `Switchyard` 已有 shared semantics，但缺 `current-page/current-console/current-network/support bundle`
   - Evidence: Explorer B completion；负搜索 `current-page/current-console/current-network/support bundle` in Switchyard = miss
   - Impacts: 第二波 Switchyard implementer 若开工，应优先补 runtime debug control plane，不搬 consumer UI/cockpit 语义

7. Wave 2 已开始合法落盘，但目前只完成了不依赖 Wave 1 最终 verdict 的那一部分 honest sync
   - Why: `docs/compat/README.md` 与 `llms.txt` 有明确 stale wording，可先在不冒充 Wave 1 closeout 的前提下修正
   - Evidence:
     - `docs/compat/README.md` 已把 `campus-copilot` fresh audit 与 `multi-ai-sidepanel` 的 shelved truth 写清
     - `llms.txt` 已把 coverage drop、partial rerun truth、multi-ai fresh audit 写清
     - `pnpm run test:docs-frontdoor = 0`
   - Impacts: Wave 2 不是零进展，但也还没有 complete

8. validation-chain 里的 “命令级 race” 已被 fresh evidence 压平，coverage gate 也已重新达标
   - Why: 工作树中的 `package.json`、`scripts/build-package.mjs` 与新增测试补丁已经被 fresh `build` 和 `test:coverage` 重新验证
   - Evidence:
   - `pnpm build = 0`
   - `pnpm run test:coverage = 0`
   - coverage 结果已到 `Statements 80.09% / Lines 80.17%`
   - official coverage path now writes to `.runtime-cache/coverage-stable`
  - Impacts: `coverage tmp artifact failure` 和 `coverage below repo floor` 都可以从 active blocker 列表移除

9. Wave 5 目前仍然只有 blueprint，没有代码
   - Why: `pnpm-workspace.yaml` 虽然早就为 `packages/consumers/*` 预留了合法落点，但当前 `Switchyard` 工作树下并不存在这些 compat packages
   - Evidence:
     - `pnpm-workspace.yaml` includes `packages/consumers/*`
     - `packages/` current listing has no `consumers/` directory
     - `docs/compat/*.md` still truthfully say `no committed ... adapter on main`
   - Impacts: Wave 5 不能再被描述成 “starter defined 之外还有 landed slice”；下一步若继续推进，必须落真实 compat code

10. Shopflow clean-worktree truth 需要降级到 “reviewable branch, not clean closure”
   - Why: clean worktree 上确实存在 seam branch commits，但 fresh repo-owned gate 重新失败了
   - Evidence:
     - branch `codex/wave3-shopflow-seam` contains local seam commits
     - fresh `pnpm run verify:release-readiness` = `1`
     - error = `.runtime-cache/coverage/.tmp/coverage-23.json` `ENOENT`
   - Impacts: Wave 3 对 Shopflow 的当前最诚实状态不能写成 clean green landed；只能写成 adapter seam branch exists and is reviewable, but clean verification is not closed

11. `apple-notes-snapshot` clean worktree truth 需要升级到 `landed but bounded`
   - Why: fresh clean-worktree recheck now shows committed Switchyard-backed `AI Diagnose` migration with deterministic fallback preserved
   - Evidence:
     - `README.md` states `./notesctl ai-diagnose` routes model calls through a local Switchyard runtime
     - `docs/releases/v0.1.6.md`
     - `scripts/ops/ai_diagnose.py`
   - `tests/unit/test_ai_diagnose_unit.py`
   - Impacts: Wave 3 对 `apple-notes-snapshot` 不能再写成 fit-audit only 或 shelved；它已经是 bounded landed seam

12. 同会话 fresh rerun 已证明 `ChatGPT + Gemini` managed-browser blockers 全部解除
   - Why: 当前 closeout truth 已不再是旧的 `session-incomplete` external-blocker picture
   - Evidence:
     - `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = 0`
     - `pnpm exec node scripts/verify-web-login-live.mjs --provider gemini = 0`
     - `pnpm run verify:web-login-live = 0`
     - `pnpm run verify:service-live = 0`
     - `pnpm run reality:gate = 0`
     - aggregate `overallStatus = success / externalBlockers = [] / failureCount = 0`
   - Impacts: Wave 1 进入 durable closeout / docs alignment / Git absorption 阶段；当前程序级 blocker 重心改为 Git closure、Wave 5/6 durable landing 和 repo-by-repo closure，而不再是 live browser human action

13. 当前 authoritative fresh rerun 又把 Wave 1 收窄回单一 `ChatGPT` external blocker
   - Why: 最新从当前 dirty worktree 跑出的 `reality:gate` 与 `verify:service-live` 都不支持“Wave 1 已 formal close”
   - Evidence:
     - `pnpm run verify:service-live = 2`
     - `pnpm run reality:gate = 2`
     - `overallStatus = external-blocker`
     - `successCount = 5`
     - `externalBlockerCount = 1`
     - sole blocker = `chatgpt-browser-session-incomplete`
     - `pnpm run bootstrap:web-login-browser -- --provider chatgpt = 0`
     - immediate `pnpm exec node scripts/verify-web-login-live.mjs --provider chatgpt = 2`
   - Impacts: earlier same-session green evidence remains historical proof that the lane can go green, but current closeout wording, task-board blocker state, and final verdict must use the new authoritative rerun

---

## G. Blocker Ledger

| Blocker | Layer | Type | Root cause | Exact next step |
| :--- | :--- | :--- | :--- | :--- |
| Claude overdue subscription payment | Wave 1 live gate | external | the stored browser session is real, but the provider account behind it is currently plan/payment gated and needs owner/manual action before live invoke can continue | restore access on the Claude account, then rerun `pnpm exec node scripts/verify-web-login-live.mjs --provider claude`, `pnpm run verify:service-live`, and `pnpm run reality:gate` |
| Grok browser session incomplete | Wave 1 live gate | external | Grok cookie material is present, but the attached browser is still landing on the public surface instead of an authenticated composer workspace | finish sign-in / any human verification in the attached Grok browser, then rerun `pnpm exec node scripts/verify-web-login-live.mjs --provider grok` and `pnpm run reality:gate` |
| Current-version evidence pack not fully absorbed | Wave B evidence | internal | auth portal / provider debug workbench current-version proof is now real, but the focused browser/reviewer evidence pack and visible-truth hardening are still being absorbed on this dirty main | finish browser proof capture, absorb visible-layer wording fixes, then rerun blocker-only review |
| Wave 5 thin compat honest closure still open | Wave 5 | internal | thin compat code and public `partial` truth are both real now, but the latest task-board/Git closure still lags behind current repo truth | absorb the current `partial / fail-closed` verdict into task-board/Git closure and then close the dirty-main slice honestly |
| Wave 6 outward honest ceiling still open | Wave 6 | internal | `CLI = partial` and `MCP = partial` are already repo-truth, but the current closeout still needs to absorb that narrower outward ceiling without overclaiming plugin/landing/launch | keep outward wording at the current honest ceiling, absorb it into closeout truth, and leave non-landed launch surfaces explicitly below the line |
| Dirty-main closeout still open | Current turn | internal | the worktree still contains repo-owned code/docs/task-board changes, plus untracked design artifacts that have not yet been consciously absorbed or dropped | finish the residual-tail edits, decide the fate of untracked design residue, rerun gates, and only then declare closeout |

---

## H. Human Action Pack

当前为空。

只有在确认所有 internal blocker 全部压平，且剩余动作真的只能由 Terry 本人执行时，才允许写入。
