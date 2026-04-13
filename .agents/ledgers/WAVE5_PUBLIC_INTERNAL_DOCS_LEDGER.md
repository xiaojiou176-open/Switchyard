# Wave 5 Public-vs-Internal Docs Ledger

Updated: 2026-04-12 PDT
Owner: L1 Wave 5 Commander
Status: active

## Goal

把 `docs/` 当成 public plane，而不是仓库库房。

规则：

- public keep = 外部读者真的该看到的页面
- public keep but demote = 可以保留，但不能继续站一排
- internal relocate = 适合搬去 `.agents/` 的内部 working truth
- stale/remove from front door = 不该继续在 README / docs atlas 首屏占位

## Public Keep

- `README.md`
- `docs/README.md`
- `docs/index.html`
- `docs/media/30-second-overview.md`
- `docs/first-success.md`
- `docs/public-proof-pack.md`
- `docs/public-distribution-ledger.md`
- `docs/public-surface-support-matrix.md`
- `docs/public-surface-catalog.md`
- `docs/api/service-http-reference.md`
- `docs/api/openapi.yaml`
- `docs/api/sdk-quickstart.md`
- `docs/api/mcp-readonly-server.md`
- `docs/api/error-diagnostics-reference.md`
- `docs/api/web-login-acquisition.md`
- `docs/shared-provider-runtime.md`
- `docs/product/v1-brief.md`
- `docs/product/scope-and-nongoals.md`
- `docs/mcp.md`
- `docs/plugin-skill-starter-kits.md`
- `docs/starter-pack-chooser.md`
- `docs/builder-journeys.md`
- `docs/host-integration-playbooks.md`
- `docs/host-integration-examples.md`
- `docs/i18n.md`
- `docs/glossary.md`
- `docs/faq.md`

## Public Keep But Demote

- `docs/public-surface-catalog.json`
- `docs/public-surface-catalog.schema.json`
- `docs/public-distribution-ledger.json`
- `docs/public-distribution-ledger.schema.json`
- `docs/provider-runtime-catalog.*`
- `docs/compat-target-catalog.*`
- `docs/builder-kit-catalog.*`
- `docs/skill-pack-catalog.*`
- `docs/mcp-tool-catalog.*`
- `docs/starter-manifest-templates.*`
- `docs/starter-manifest-examples.*`
- `docs/starter-pack-index.md`
- `docs/starter-pack-comparison.*`
- `docs/builder-intent-router.*`
- `docs/discoverability-keyword-truth.*`
- `docs/testing-pyramid.md`
- `docs/compat/README.md`
- `docs/compat/codex.md`
- `docs/compat/claude-code.md`
- `docs/compat/openclaw.md`
- `docs/compare/*.md`

Reason:

- 它们仍然是 public truth 或 machine-readable truth
- 但不该继续在 first-row public route 里堆成一长串

## Internal Relocate (Current Best Candidates)

- `docs/submission-packet-ledger.md`
- `docs/mcp-listings-cockpit.md`
- `docs/blueprints/wave1/m2-verdict-evidence-pack.md`
- `docs/blueprints/wave1/m3-reentry-contract-pack.md`
- `docs/blueprints/wave1/phase-ledger-candidate.md`
- `docs/blueprints/wave1/runtime-closeout-rerun.md`
- `docs/blueprints/wave1/shared-doc-sync-plan.md`
- `docs/blueprints/openclaw-zero-token-adoption-ledger.md`

Reason:

- 这些更像 packet accounting、working evidence、adoption ledger、program-internal planning
- 它们对 repo 内施工仍有价值，但不该继续占据 public docs plane

## Stale / Remove From Front Door

- 任何把 `docs/README.md` 当完整仓库文件清单的段落
- 任何继续把 internal wave/program ledgers 暴露成 public first-row routes 的导航项
- 任何把 packet/accounting 页面当新读者入口的 CTA

## Success Condition

Wave 5 完成时，这本账要体现出三件事：

1. front door 更薄
2. internal-only matter 从 public plane 退出
3. public docs 仍然 truthful、不断链、不丢 SSOT
