# Switchyard Testing Pyramid

## Status

- `documented and measurable now`

## Why This Page Exists

测试金字塔不是“测试多不多”的漂亮话。  
它更像盖楼时的检测顺序：

- 地基先验
- 楼层再验
- 最后整栋楼通水通电再验

如果顺序反过来，项目就会很痛。

## Current Pyramid

### 1. Unit tests

位置示例：

- `tests/unit/**`

它们负责：

- 小模块逻辑
- diagnostics mapping
- provider runtime rules
- verifier helpers

### 2. Integration tests

位置示例：

- `tests/integration/**`

它们负责：

- HTTP surface contract
- auth portal shell contract
- service/runtime route wiring

### 3. E2E tests

位置示例：

- `tests/e2e/**`

它们负责：

- app-service e2e smoke
- high-stability runtime behavior

### 4. Docs frontdoor contract tests

命令：

- `pnpm run test:docs-frontdoor`

它们负责：

- README / docs / `llms.txt` 的 truth surface 不被悄悄改坏
- `planned` 和 `supported` 的说法继续对齐
- API / compat / MCP / i18n / keyword 入口继续存在

### 5. Live gates

命令：

- `pnpm run verify:gemini-live`
- `pnpm run verify-web-login-live`
- `pnpm run verify:service-live`
- `pnpm run reality:gate`

这层不是普通自动测试，而是更接近真人验收。

这里要再加一条边界，不然很容易把它们误读成“云端 CI 也该跑”：

- `Cloud-safe`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - docs frontdoor / starter pack / catalog / MCP read-only contract tests
- `Local credentialed only`
  - `pnpm run verify:gemini-live`
  - `pnpm run verify-web-login-live`
  - `pnpm run verify:service-live`
  - `pnpm run reality:gate`
  - `pnpm run diagnose:web-login-browser`
  - `pnpm run capture:web-debug-bundle`
- `Optional local isolated fallback`
  - repo-local managed-browser smoke / attach diagnostics

更直白一点说：

> GitHub Hosted Runner 负责验“仓里的代码和合同有没有坏”。
> 真实登录态 / 真实 Chrome Profile / 已登录浏览器会话，只能在 credentialed workstation 上验。

这里的“真实 Chrome Profile”现在要具体理解成：

- steady-state 默认走 `isolated-chrome-root`
- 根目录 = `~/.cache/switchyard/browser/chrome-user-data`
- 当前 repo 的 canonical isolated-root CDP 端口 = `9338`
- 默认 Chrome 根目录只在显式 seed / reseed 时读取

## Current Gate Meanings

- `typecheck`
  - 结构和类型合同没坏
- `test`
  - unit/integration/e2e/docs-frontdoor 都没坏
- `build`
  - 包装和构建链没坏
- `verify:*`
  - 真运行时 / 真 session / 真 provider 路径有没有过

## CI Policy

当前仓继续只用 GitHub Hosted Runner。

- 不引入 `self-hosted`
- 不要求云端 CI 访问你的本地 Chrome Profile
- 不要求云端 CI 复用你的登录态

如果在 CI 环境中误触发 live gate，当前脚本应该 fail-closed，直接说明：

- `credentialed-workstation only`

而不是假装还能在云端复现本地 credentialed 路径。

## 5-Layer Governance

如果把这仓的验证链理解成 5 道安检门，当前 SSOT 是：

| Layer | Current role | Current default surface |
| --- | --- | --- |
| `pre-commit` | 最早拦截 secrets 与 focused hygiene drift | `pnpm run hook:pre-commit` |
| `pre-push` | 本地提交前总闸 | `pnpm run hook:pre-push` |
| `hosted` | GitHub Actions on `push/pull_request` | `ci.yml` / `security.yml` / `workflow-hygiene.yml` |
| `nightly` | hosted-safe scheduled recheck | scheduled workflow + nightly-timed dependency automation |
| `manual` | credentialed workstation realism | `verify:*` / `reality:gate` / browser diagnosis / runtime hygiene |

说得更直白一点：

> 前四层是“仓里的合同和代码有没有坏”。
> 第五层才是“真人浏览器、真人登录态、真人账号动作有没有真的过关”。

## What This Repo Tries To Avoid

- fake tests
- only-happy-path tests
- 把 external blocker 假装成 internal failure
- 把 local green 假装成 durable landed

## Coverage Philosophy

这仓当前更重视的是：

- critical path honesty
- test pyramid balance
- verifier truthfulness

而不是只追一个好看的 coverage 数字。

## Coverage Entry Point

现在仓里已经有一个 committed coverage 入口：

- `pnpm run test:coverage`

它会产出：

- 终端 `text-summary`
- `coverage/coverage-summary.json`

如果你还需要本地 HTML 报告，走单独的辅助入口：

- `pnpm run test:coverage:html`
- `coverage/index.html`

更直白一点说：

> 以后接手的人不需要再临时拼一长串 `vitest --coverage` 参数，  
> 直接跑这一条命令，就能拿到可复验的 coverage 报告。

更直白一点说：

> 一张 95% 的 coverage 报表，如果 live gate 全是假绿，意义不大。  
> 一张稍低一点但结构 honest 的测试网，反而更值钱。

所以这仓对 coverage 的态度是：

- 要有真实、稳定、可重复的 coverage 入口
- gating path 优先稳定；HTML 报告是可选辅助，不应反过来把门禁打碎
- 要把 coverage 和 unit/integration/e2e/live gate 一起看
- 不把 coverage 百分比伪装成阶段完成证明
