# Switchyard Docs Atlas

This is the full docs atlas for Switchyard.

Treat it like an adoption desk, not a giant file cabinet: start from the
shortest question-specific route, then open the deeper shelf only when the
question is clear.

## Page Roles

The public front door is intentionally split so each page keeps one job:

- `README.md`
  - repo front door, product sentence, and the shortest truthful route into the
    runtime
- `docs/index.html`
  - static docs atlas and GitHub Pages route map
- `docs/public-proof-pack.md`
  - proof-first explanation of what is really proved today
- `docs/public-distribution-ledger.md`
  - package-ready vs listed-live truth
- `docs/README.md`
  - the full atlas, grouped by question
- `docs/runbooks/dev-bootstrap.md`
  - public bootstrap and workstation-reality runbook, kept visible but demoted

Heavy-lane packet/accounting pages still exist, but they belong to deeper
reference shelves rather than the public front row.

## Public Language Policy

Switchyard treats the public front door as **English-first**.

- The default route for global developers stays English-first.
- Glossary and i18n helper pages can remain bilingual support surfaces.
- Proof and runbook pages may reference workstation-specific reality, but the
  stable landing sentence should remain English-first and repo-identity-first.

## Quick Routes

If you only need the first route, choose one:

- I want the 30-second product verdict
  - [docs/media/30-second-overview.md](./media/30-second-overview.md)
- I want the shortest runnable first success
  - [docs/first-success.md](./first-success.md)
- I want to know exactly what is proved today
  - [docs/public-proof-pack.md](./public-proof-pack.md)
- I want the package/listing/public-distribution truth
  - [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
- I need local bootstrap or workstation-bound reality
  - [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md)
- I want the full atlas on one page
  - [docs/index.html](./index.html)

The old Wave 1 working packs were relocated out of the public docs plane. The
legacy `docs/blueprints/wave1/*` paths now act only as relocation notes, while
the working copies live under `.agents/internal-docs/wave1/`.

The public first row stays intentionally narrow:

- `README.md`
- `docs/index.html`
- `docs/media/30-second-overview.md`
- `docs/first-success.md`
- `docs/public-proof-pack.md`
- `docs/public-distribution-ledger.md`
- `docs/api/service-http-reference.md`

Keep these public, but demoted one shelf deeper:

- `docs/public-surface-support-matrix.md`
- `docs/runbooks/dev-bootstrap.md`
- builder routes, catalogs, and packet/accounting pages

## Default First Success

The shortest truthful route is:

1. Open [docs/index.html](./index.html) for the route map.
2. Read [docs/media/30-second-overview.md](./media/30-second-overview.md) for
   the product sentence.
3. Run [docs/first-success.md](./first-success.md) for the bounded first
   success.
4. Check [docs/public-proof-pack.md](./public-proof-pack.md) before making
   stronger claims.

## Start Here

### Product sentence, proof, and first action

- [docs/media/30-second-overview.md](./media/30-second-overview.md)
  - the fastest product sentence and non-goals
- [docs/first-success.md](./first-success.md)
  - the shortest runnable first-success route
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - the current proof ceiling and forbidden overclaims
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
  - package-ready versus listed-live truth
- [docs/api/service-http-reference.md](./api/service-http-reference.md)
  - the primary runtime/API front door

### If the question is local browser or session realism

- [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md)
  - the workstation bootstrap and repair ladder
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - the current blocker wording and claim ceiling
- [docs/api/web-login-acquisition.md](./api/web-login-acquisition.md)
  - the lane-specific acquisition reference

### Core API and runtime shelves

- [docs/api/openapi.yaml](./api/openapi.yaml)
- [docs/api/sdk-quickstart.md](./api/sdk-quickstart.md)
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
- [docs/api/error-diagnostics-reference.md](./api/error-diagnostics-reference.md)

### Builder and host shelves

- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
- [docs/builder-journeys.md](./builder-journeys.md)
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
- [docs/host-integration-examples.md](./host-integration-examples.md)
- [starter-packs/README.md](../starter-packs/README.md)
- [examples/README.md](../examples/README.md)

### Compat and comparison shelves

- [docs/compat/README.md](./compat/README.md)
- [docs/compat/codex.md](./compat/codex.md)
- [docs/compat/claude-code.md](./compat/claude-code.md)
- [docs/compat/openclaw.md](./compat/openclaw.md)
- [docs/compare/byok-vs-web-login.md](./compare/byok-vs-web-login.md)
- [docs/compare/switchyard-vs-codex.md](./compare/switchyard-vs-codex.md)
- [docs/compare/switchyard-vs-claude-code.md](./compare/switchyard-vs-claude-code.md)
- [docs/compare/switchyard-vs-openclaw.md](./compare/switchyard-vs-openclaw.md)

### Public reference shelves

- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
- [docs/shared-provider-runtime.md](./shared-provider-runtime.md)
- [docs/product/v1-brief.md](./product/v1-brief.md)
- [docs/product/scope-and-nongoals.md](./product/scope-and-nongoals.md)
- [docs/mcp.md](./mcp.md)
- [docs/faq.md](./faq.md)
- [docs/glossary.md](./glossary.md)
- [docs/i18n.md](./i18n.md)

Machine-readable JSON and schema companions still live next to these human
pages, but they are deeper-shelf reference surfaces, not first-row routes.

### Internal truth shelves

These remain part of the repo's truth system, but they are not first-row public
landing pages:

- `docs/contracts/*`
- `docs/blueprints/*`
- [docs/testing-pyramid.md](./testing-pyramid.md)
- packet/accounting pages such as `submission-packet-ledger`

Current working packs that already moved out of the public docs plane now live
under `.agents/internal-docs/`, including:

- `.agents/internal-docs/wave1/*`
- `.agents/internal-docs/wave5/wave5-thin-compat-starter.md`
- `.agents/internal-docs/mcp/mcp-listings-cockpit.md`

If you need every catalog, schema, or machine-readable companion, use the repo
tree or CLI surfaces instead of turning this atlas back into a warehouse list.

## MCP and AI Tooling

- [docs/mcp.md](./mcp.md)
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
- [docs/public-surface-catalog.md](./public-surface-catalog.md)

## FAQ

- [docs/faq.md](./faq.md)

## Glossary

- [docs/glossary.md](./glossary.md)

## i18n

- [docs/i18n.md](./i18n.md)

## Keyword Truth

- [docs/discoverability-keyword-truth.md](./discoverability-keyword-truth.md)
- [docs/discoverability-keyword-truth.json](./discoverability-keyword-truth.json)
- [docs/discoverability-keyword-truth.schema.json](./discoverability-keyword-truth.schema.json)

## Truthfulness Rules

- `supported` means there is a real, durable, repo-backed surface now.
- `partial` means a real narrow slice exists, but only part of the promised
  shape is landed.
- `planned` means the route is intentional but not implemented yet.
- `research` means there is evidence or design work, but no landed support
  surface yet.
- `not now` means the current public front door explicitly does not offer that
  surface.
