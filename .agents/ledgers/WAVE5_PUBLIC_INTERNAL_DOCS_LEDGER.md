# Wave 5 Public-vs-Internal Docs Ledger

Updated: 2026-04-13 PDT
Owner: L1 Wave 5 Commander
Status: re-locked

## Current front-door rule

`docs/` remains public by default, but the public first row is intentionally narrow.

## Public Keep

- `README.md`
- `docs/index.html`
- `docs/media/30-second-overview.md`
- `docs/first-success.md`
- `docs/public-proof-pack.md`
- `docs/public-distribution-ledger.md`
- `docs/api/service-http-reference.md`

## Public Keep But Demote

- `docs/public-surface-support-matrix.md`
- `docs/runbooks/dev-bootstrap.md`
- `docs/public-surface-catalog.md`
- `docs/shared-provider-runtime.md`
- `docs/product/v1-brief.md`
- `docs/product/scope-and-nongoals.md`
- `docs/mcp.md`
- `docs/compat/README.md`
- `docs/compat/*.md`
- `docs/compare/*.md`
- builder shelves such as:
  - `docs/starter-pack-chooser.md`
  - `docs/builder-journeys.md`
  - `docs/host-integration-playbooks.md`
  - `docs/host-integration-examples.md`
  - `starter-packs/README.md`
  - `examples/README.md`

## Internal Relocate / Internal Plane

- `.agents/internal-docs/wave1/*`
- `.agents/internal-docs/wave5/wave5-thin-compat-starter.md`
- `.agents/internal-docs/mcp/mcp-listings-cockpit.md`

## Stale / Remove From Front Door

- broken `../index.html` front-door link
- any first-row navigation that omits the runbook when the question is workstation/browser reality
- file-by-file warehouse listing of catalog JSON/schema artifacts on the docs atlas front page

## What changed in this wave

- `docs/index.html` no longer routes readers to a non-existent root `index.html`.
- `docs/index.html`, `README.md`, `docs/README.md`, `docs/public-proof-pack.md`, `docs/public-distribution-ledger.md`, `docs/public-surface-support-matrix.md`, and `docs/first-success.md` now all expose the runbook as `public but demoted`.
- `docs/README.md` no longer tries to behave like a warehouse index for every JSON/schema companion.

## Note on docs count

- Fresh count is still `100`.
- That is acceptable for Wave 5 because the public-plane cleanup was achieved through demotion, route tightening, and discoverability cleanup rather than brute-force deletion of SSOT.
