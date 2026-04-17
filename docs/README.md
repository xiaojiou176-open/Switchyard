# Switchyard Docs Atlas

This is the public docs atlas for Switchyard.

Treat it like an adoption desk, not a warehouse list: the job of this page is
to route a reader to the next truthful page, not to enumerate every file in the
repo.

## Page Roles

The public front door stays intentionally split so each page keeps one job:

- `README.md`
  - repo front door, product sentence, and the shortest truthful route in
- `docs/index.html`
  - answer-first docs front door for GitHub Pages
- `docs/media/30-second-overview.md`
  - the fastest product sentence and non-goals
- `docs/first-success.md`
  - the shortest runnable first-success route
- `docs/public-proof-pack.md`
  - what the repo can honestly prove today
- `docs/public-distribution-ledger.md`
  - package-ready versus listed-live truth
- `docs/api/service-http-reference.md`
  - the primary runtime/API front door

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

## Public Language Policy

Switchyard treats the public front door as **English-first**.

- The default route for global developers stays English-first.
- Glossary, FAQ, and i18n helper pages can remain bilingual support surfaces.
- Proof and runbook pages may reference workstation-specific reality, but the
  stable landing sentence should remain English-first and repo-identity-first.

## Quick Routes

If you only need the next truthful route, choose one:

- I need the 30-second product verdict
  - [docs/media/30-second-overview.md](./media/30-second-overview.md)
- I want the shortest runnable first success
  - [docs/first-success.md](./first-success.md)
- I need proof or distribution truth
  - [docs/public-proof-pack.md](./public-proof-pack.md)
  - [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
- I need the core API front door
  - [docs/api/service-http-reference.md](./api/service-http-reference.md)
- I need the builder workflow / skills / MCP route
  - [starter pack chooser](./starter-pack-chooser.md)
  - [surface catalog](./public-surface-catalog.md)
  - [MCP front door](./mcp.md)
- I need local bootstrap or workstation-bound reality
  - [docs/runbooks/dev-bootstrap.md](./runbooks/dev-bootstrap.md)

The old Wave 1 working packs were relocated out of the public docs plane, and
the working copies now live under `.agents/internal-docs/wave1/`.

## Front Row Rules

If a new reader cannot decide where to go within a few seconds, this atlas is
already doing too much.

Use the front row for:

- product identity
- first success
- proof
- public distribution truth
- the primary API surface

Do **not** use this page to flatten:

- every compat page
- every compare page
- every builder catalog
- every schema or machine-readable companion
- every internal truth shelf

## Deeper Public Hubs

These remain valid public surfaces, but they should be opened intentionally,
not presented as the default tour:

- [docs/compat/README.md](./compat/README.md)
  - compat hub once the question is explicitly about compat
- [starter-packs/README.md](../starter-packs/README.md)
  - builder starter packs and runnable starter surfaces
- [examples/README.md](../examples/README.md)
  - host examples and integration entrypoints
- [surface catalog](./public-surface-catalog.md)
  - machine-readable surface, skill-pack, builder-kit, and MCP truth
- [MCP front door](./mcp.md)
  - read-only MCP front door once the question is explicitly about MCP

If you need every catalog, schema, or machine-readable companion, use the repo
tree or CLI surfaces instead of turning this atlas back into a file cabinet.

## Internal Truth Shelves

These remain part of the repo's truth system, but they are not first-row public
landing pages:

- `.agents/internal-docs/adr/*`
- `.agents/internal-docs/contracts/*`
- `.agents/internal-docs/blueprints/*`
- `.agents/internal-docs/product/*`
- `.agents/internal-docs/testing/testing-pyramid.md`
- packet/accounting pages such as `submission-packet-ledger`

Current working packs that already moved out of the public docs plane live
under `.agents/internal-docs/`, including:

- `.agents/internal-docs/wave1/*`
- `.agents/internal-docs/wave5/wave5-thin-compat-starter.md`
- `.agents/internal-docs/mcp/mcp-listings-cockpit.md`
- `.agents/internal-docs/distribution/submission-packet-ledger.md`

## Truthfulness Rules

- `supported` means there is a real, durable, repo-backed surface now.
- `partial` means a real narrow slice exists, but only part of the promised
  shape is landed.
- `planned` means the route is intentional but not implemented yet.
- `research` means there is evidence or design work, but no landed support
  surface yet.
- `not now` means the current public front door explicitly does not offer that
  surface.
