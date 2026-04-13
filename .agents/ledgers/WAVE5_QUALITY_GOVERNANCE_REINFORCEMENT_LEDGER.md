# Wave 5 Quality Governance Reinforcement Ledger

Updated: 2026-04-12 PDT
Owner: L1 Wave 5 Commander
Status: active

## Fresh Baseline

- `pnpm typecheck` = pass
- `pnpm test` = pass
- `pnpm build` = pass
- `pnpm run test:docs-frontdoor` = pass
- `pnpm run test:coverage` = pass
  - statements `80.31%`
  - lines `80.30%`
- `pnpm run test:mutation:baseline` = pass
  - mutation score `45.45`
- `pnpm run gate:pr` = pass
- `pnpm run gate:nightly:expensive` = pass

## Already Strong / Do Not Reopen

- `typecheck / test / build / docs-frontdoor` 已经形成稳定主链
- coverage gate 已经绑定 artifact 与 floor，不再只是 `exit 0`
- host-safety gate 已接入 `gate:pr`

## Fake-Green / Drift Risks Still Present

### 1. Mutation baseline is only barely above break threshold

- Current truth:
  - score = `45.45`
  - break threshold = `45`
- Why it matters:
  - 这相当于“刚刚及格”，并不配得上 Wave 5 的 extreme quality-governance bar
  - 目前 `run-reality-gate.mjs` 里还有大量 `NoCoverage` / `Survived` mutants

### 2. `run-reality-gate.mjs` critical semantics are under-tested

- Weak zones exposed by Stryker:
  - `INTERNAL_GATE_STEPS`
  - live status aggregation filters
  - workspace classification normalization
  - artifact persistence helpers
  - CLI entrypoint / main path
- Meaning:
  - `reality:gate` 是总闸，但它最脆的几段还没被像总闸那样盯住

### 3. Docs governance has no dedicated anti-drift contract yet

- Current docs tests still偏向“链接在不在”
- 缺少：
  - 哪些 internal docs 必须退出 public front row
  - donor absorption contract 是否仍对齐
  - docs/public plane 是否继续 obey latest governance law

## Reinforcement Targets

- Add tighter tests around `scripts/run-reality-gate.mjs`
- Raise mutation floor if fresh score supports it
- Add design-boundary / docs-governance anti-drift tests
- Keep PR gate and nightly gate clearly split:
  - PR gate = hosted-safe, fast, trustworthy
  - nightly = deeper docs/coverage/mutation verification

## Success Condition

Wave 5 结束时，这本账至少要满足：

1. mutation score 不再只是擦线过关
2. `run-reality-gate.mjs` 的关键分支不再是大片 `NoCoverage`
3. docs governance 与 donor boundary 都有自动化 anti-drift contract
