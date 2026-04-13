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

The heavy-lane packet still exists, but it belongs to a deeper reference shelf:

- `docs/submission-packet-ledger.md`
  - the exact heavy-lane submission packet and packet-scoped receipt boundary

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
- I want the full atlas on one page
  - [docs/index.html](./index.html)

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

### Product sentence, scope, and identity

- [docs/media/30-second-overview.md](./media/30-second-overview.md)
  - the fastest product sentence, current proved facts, and non-goals
- [docs/shared-provider-runtime.md](./shared-provider-runtime.md)
  - why Switchyard exists as a shared runtime layer
- [docs/product/scope-and-nongoals.md](./product/scope-and-nongoals.md)
  - what the project intentionally does not claim

### First success, proof, and public truth

- [docs/first-success.md](./first-success.md)
  - the default first-success route
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - the shortest proof pack, smallest smoke, allowed claims, and forbidden
    overclaims
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
  - the current public surface truth table
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
  - the outward catalog of public surfaces
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
  - schema for the public surface catalog
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
  - package-ready, starter-pack-ready, and official-listing-not-claimed truth

### API and SDK

- [docs/api/service-http-reference.md](./api/service-http-reference.md)
- [docs/api/openapi.yaml](./api/openapi.yaml)
- [docs/api/sdk-quickstart.md](./api/sdk-quickstart.md)
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
- [docs/api/error-diagnostics-reference.md](./api/error-diagnostics-reference.md)
- [docs/api/web-login-acquisition.md](./api/web-login-acquisition.md)

## Builders, Starter Packs, and Host Routes

- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
  - the starter-kit explanation page for plugin/skills builders
- [docs/starter-manifest-templates.md](./starter-manifest-templates.md)
  - copy-paste starter manifest templates
- [docs/starter-manifest-templates.schema.json](./starter-manifest-templates.schema.json)
  - schema for starter manifest templates
- [docs/starter-manifest-examples.md](./starter-manifest-examples.md)
  - runnable starter manifest examples
- [docs/starter-manifest-examples.schema.json](./starter-manifest-examples.schema.json)
  - schema for starter manifest examples
- [examples/README.md](../examples/README.md)
  - runnable examples across runtime and host paths
- [starter-packs/README.md](../starter-packs/README.md)
  - copy-ready starter packs
- [docs/starter-pack-index.md](./starter-pack-index.md)
  - starter pack directory
- [docs/starter-pack-chooser.md](./starter-pack-chooser.md)
  - choose the right starter pack
- [docs/starter-pack-comparison.md](./starter-pack-comparison.md)
  - compare starter packs side by side
- [docs/builder-journeys.md](./builder-journeys.md)
  - choose a full builder journey
- [docs/builder-intent-router.md](./builder-intent-router.md)
  - route a builder question to the right first page
- [docs/builder-intent-router.json](./builder-intent-router.json)
  - machine-readable source for the intent router
- [docs/builder-intent-router.schema.json](./builder-intent-router.schema.json)
  - schema for the intent router
- [docs/host-integration-playbooks.md](./host-integration-playbooks.md)
  - host integration route map
- [docs/host-integration-examples.md](./host-integration-examples.md)
  - host-local example configs

## Public Reference Shelves

These pages are still public and useful, but they are not the first route for a
new reader.

### Capability and machine-readable reference

- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
  - the signboard version of the public truth
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
  - human-readable public surface catalog
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
  - schema for the public surface catalog
- [docs/api/mcp-readonly-server.md](./api/mcp-readonly-server.md)
  - read-only MCP capability reference
- [docs/api/web-login-acquisition.md](./api/web-login-acquisition.md)
  - web-login acquisition route reference
- [docs/testing-pyramid.md](./testing-pyramid.md)
  - testing and gate reference

### Distribution and packet reference

- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
  - public distribution truth
- [docs/submission-packet-ledger.md](./submission-packet-ledger.md)
  - heavy-lane packet/accounting reference

### Product and explanation shelf

- [docs/shared-provider-runtime.md](./shared-provider-runtime.md)
  - why the shared runtime exists
- [docs/product/v1-brief.md](./product/v1-brief.md)
  - current V1 shape for readers who need the deeper product brief

## Internal Truth Shelves (SSOT / Reference)

These pages should remain in the repo and remain readable, but they are not
front-row public landing surfaces.

### Contracts

- [docs/contracts/design-mother-strategy.md](./contracts/design-mother-strategy.md)
- [docs/contracts/provider-runtime-contract.md](./contracts/provider-runtime-contract.md)
- [docs/contracts/service-and-sdk-surfaces.md](./contracts/service-and-sdk-surfaces.md)
- [docs/contracts/auth-accounts-and-credentials.md](./contracts/auth-accounts-and-credentials.md)

### Program and blueprint truth

- [docs/blueprints/m2-kernel-beta-verdict.md](./blueprints/m2-kernel-beta-verdict.md)
  - current `M2 / Kernel Beta` verdict
- [docs/blueprints/m3-first-party-integration-readiness.md](./blueprints/m3-first-party-integration-readiness.md)
  - current `M3` readiness package
- [docs/blueprints/wave3-consumer-seam-matrix.md](./blueprints/wave3-consumer-seam-matrix.md)
  - the consumer seam matrix
- [docs/blueprints/wave4-consumer-contract-freeze.md](./blueprints/wave4-consumer-contract-freeze.md)
  - thin compat contract freeze
- [docs/blueprints/wave5-thin-compat-starter.md](./blueprints/wave5-thin-compat-starter.md)
  - thin compat starter boundary
- [docs/blueprints/wave6-outward-packaging-threshold.md](./blueprints/wave6-outward-packaging-threshold.md)
  - outward packaging threshold
- [docs/blueprints/openclaw-zero-token-adoption-ledger.md](./blueprints/openclaw-zero-token-adoption-ledger.md)
  - upstream adoption ledger

## Explanations

- [docs/shared-provider-runtime.md](./shared-provider-runtime.md)
  - why the shared runtime exists
- [docs/public-proof-pack.md](./public-proof-pack.md)
  - current proof, smallest smoke, and claim boundaries
- [docs/public-surface-support-matrix.md](./public-surface-support-matrix.md)
  - current support matrix
- [docs/public-surface-catalog.md](./public-surface-catalog.md)
  - human-readable public surface catalog
- [docs/public-surface-catalog.schema.json](./public-surface-catalog.schema.json)
  - schema for the public surface catalog
- [docs/public-distribution-ledger.md](./public-distribution-ledger.md)
  - public distribution ledger
- [docs/plugin-skill-starter-kits.md](./plugin-skill-starter-kits.md)
  - how starter kits fit the builder story
- [docs/provider-runtime-catalog.md](./provider-runtime-catalog.md)
  - provider/lane/authMode/stability catalog
- [docs/provider-runtime-catalog.json](./provider-runtime-catalog.json)
  - machine-readable provider catalog
- [docs/provider-runtime-catalog.schema.json](./provider-runtime-catalog.schema.json)
  - provider catalog schema
- [docs/compat-target-catalog.md](./compat-target-catalog.md)
  - compatibility target catalog
- [docs/compat-target-catalog.json](./compat-target-catalog.json)
  - machine-readable compatibility target catalog
- [docs/compat-target-catalog.schema.json](./compat-target-catalog.schema.json)
  - compatibility target catalog schema
- [docs/builder-kit-catalog.md](./builder-kit-catalog.md)
  - builder kit catalog
- [docs/builder-kit-catalog.json](./builder-kit-catalog.json)
  - machine-readable builder kit catalog
- [docs/builder-kit-catalog.schema.json](./builder-kit-catalog.schema.json)
  - builder kit catalog schema
- [docs/skill-pack-catalog.md](./skill-pack-catalog.md)
  - skill pack catalog
- [docs/skill-pack-catalog.json](./skill-pack-catalog.json)
  - machine-readable skill pack catalog
- [docs/skill-pack-catalog.schema.json](./skill-pack-catalog.schema.json)
  - skill pack catalog schema
- [docs/mcp-tool-catalog.md](./mcp-tool-catalog.md)
  - read-only MCP tool inventory
- [docs/mcp-tool-catalog.json](./mcp-tool-catalog.json)
  - machine-readable MCP tool catalog
- [docs/mcp-tool-catalog.schema.json](./mcp-tool-catalog.schema.json)
  - MCP tool catalog schema

## Compatibility

- [docs/compat/README.md](./compat/README.md)
- [docs/compat/codex.md](./compat/codex.md)
- [docs/compat/claude-code.md](./compat/claude-code.md)
- [docs/compat/openclaw.md](./compat/openclaw.md)
- [docs/compare/switchyard-vs-codex.md](./compare/switchyard-vs-codex.md)
- [docs/compare/switchyard-vs-claude-code.md](./compare/switchyard-vs-claude-code.md)
- [docs/compare/switchyard-vs-openclaw.md](./compare/switchyard-vs-openclaw.md)
- [packages/consumers/codex/README.md](../packages/consumers/codex/README.md)
- [packages/consumers/claude-code/README.md](../packages/consumers/claude-code/README.md)
- [packages/consumers/openclaw/README.md](../packages/consumers/openclaw/README.md)
- [packages/surfaces/mcp/README.md](../packages/surfaces/mcp/README.md)

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
