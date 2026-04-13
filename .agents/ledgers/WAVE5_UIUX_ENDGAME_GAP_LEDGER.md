# Wave 5 UIUX Endgame Gap Ledger

Updated: 2026-04-12 PDT
Owner: L1 Wave 5 Commander
Status: active

## Scope

只记录 Wave 5 允许处理的可见 surface：

- `auth-portal`
- `provider-debug-workbench`
- public/docs front door（只在理解与路由层面）

## Already Strong / Do Not Reopen

- `provider-debug-workbench` 的主结构已经接近目标状态：
  - `Primary verdict` 在首屏
  - `stored material / current browser / runtime path` 三张 summary cards 已成立
  - 证据堆栈通过 `details` 折叠，已经具备 progressive disclosure
- `README.md` 与 `docs/README.md` 的 repo identity 基本 truthful：
  - `shared provider runtime for AI apps`
  - `BYOK + Web/Login`
  - `service-first` front door
- donor boundary 没有明显漂移成 `Sentry / Vercel / HashiCorp / Claude shell`

## Blocker-Grade Gaps

### 1. Auth portal first-row truth is inconsistent with provider debug truth

- Symptom:
  - `auth-portal` 首屏分桶与 provider-scoped debug workbench 的 verdict 不一致
  - `Claude` 当前被前台归到 `session incomplete`，但 provider debug 侧是 `owner/manual account action`
- Why this is a blocker:
  - 首屏 triage wall 是前台导诊台，不能把用户带去错误路径
  - 这违反了 `verdict-first` 和 `truthful store-ready vs live-ready split`
- Primary targets:
  - `packages/surfaces/http/src/http-surface.ts`
  - `packages/surfaces/http/src/auth-portal-shell.ts`
  - `tests/integration/service-http/http-surface.integration.test.ts`
  - `tests/integration/auth-portal/auth-portal-shell.test.ts`

### 2. Auth portal leaks stale or cross-provider browser checkpoint evidence

- Symptom:
  - `Claude` card can show `Title = ChatGPT` / `chatgpt.com/...` style checkpoint text
  - the card labels that data like current browser truth even when it is store-side audit residue
- Why this is a blocker:
  - 这是“把 A 机器的温度贴到 B 机器上”的问题，直接伤害可信度
  - 当前 surface 语言把 store audit 和 live browser truth 混成一层
- Primary targets:
  - `packages/surfaces/http/src/auth-portal-shell.ts`
  - `packages/surfaces/http/src/http-surface.ts`
  - `tests/integration/service-http/http-surface.integration.test.ts`

## Non-Blocker Polish

### Auth portal

- quick actions / first blocked provider jump can be more direct
- hero copy 还能更短，更像 front desk，不像解释页
- secondary context 还能再压缩，让 `Portal rules / workflows / browser handoff` 更像折叠式 utility tray

### Provider debug workbench

- 可补更清楚的 quick-action chrome，但不是 blocker
- 当前 hero meta 可以更像 “current checkpoint + next safe action” 二分，但现状已可用

### Docs/public front door

- `docs/index.html` 当前风格更像 warm editorial atlas，不够明显对齐 `Mintlify` 的清晰文档阅读节奏
- 这是 productization opportunity，不是 current blocker

## Endgame Target

Wave 5 结束时，这条 ledger 至少要满足：

1. `auth-portal` 首屏 verdict 与 provider debug truth 不再冲突
2. `auth-portal` 不再把 store audit 误写成 current browser truth
3. `auth-portal` 和 `provider-debug-workbench` 都更接近：
   - minimal cognitive load
   - beauty
   - productization
   - progressive disclosure
