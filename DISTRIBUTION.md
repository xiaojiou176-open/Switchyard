# Distribution Status

This page separates **repo-ready public surfaces** from **actual marketplace or registry publication**.

Current public release truth:

- GitHub Pages storefront: `https://xiaojiou176-open.github.io/Switchyard/`
- GitHub release / npm / official MCP Registry / marketplace publication: **not yet published**

## Current Distribution Ledger

| Surface | Materialized in repo | Publish-ready today | Published / listed today | Notes |
| --- | --- | --- | --- | --- |
| GitHub Pages storefront | yes | yes | yes | Current homepage points to GitHub Pages and should stay the primary public front door. |
| Root npm package (`switchyard`) | yes | no | no | Root package is `private: true`; this repo does not ship a publishable root package today. |
| MCP npm package (`@switchyard/surface-mcp`) | yes | yes | no | The package contract, `mcpName`, CLI bin, and `server.json` are landed, but the package is **not yet published**. |
| Thin compat packages (`@switchyard/consumer-codex`, `@switchyard/consumer-claude-code`, `@switchyard/consumer-openclaw`) | yes | yes | no | The repo contains package-ready adapters and starter packs, but no registry publication is claimed yet. |
| Claude marketplace-compatible bundle | yes | yes | no | `distribution/claude-marketplace/` exists, but it is still a repo materialization, not a confirmed live listing. |
| Builder starter packs | yes | yes | no dedicated registry | The public repo is the current install/discovery surface. |
| Official MCP Registry listing | partial | yes | no | Submission materials exist in repo, but there is no live registry listing proof yet. |

## What "Ready" Means Here

For Switchyard, `ready` currently means:

- the public front door is explicit
- the MCP and thin-compat artifacts are package-ready
- starter packs and host examples are present
- marketplace and registry submission still remain separate later actions

It does **not** mean:

- npm publication already happened
- the official MCP Registry already lists Switchyard
- Codex / Claude Code / OpenClaw marketplace publication is already live

## Fastest Public Surfaces

- [README.md](README.md)
- [INTEGRATIONS.md](INTEGRATIONS.md)
- [docs/public-distribution-ledger.md](docs/public-distribution-ledger.md)
- [docs/plugin-skill-starter-kits.md](docs/plugin-skill-starter-kits.md)
- [docs/starter-pack-chooser.md](docs/starter-pack-chooser.md)

## Minimal Human Action Packs

### MCP

- local truth
  - `packages/surfaces/mcp/package.json`
  - `packages/surfaces/mcp/server.json`
  - `examples/hosts/mcp/`
- current status
  - package-ready
  - not yet published
  - not yet listed in the official MCP Registry

### Thin compat packages

- local truth
  - `packages/consumers/codex/`
  - `packages/consumers/claude-code/`
  - `packages/consumers/openclaw/`
  - `starter-packs/builders/*`
- current status
  - package-ready starter and host materials exist
  - no npm publication claimed
  - no marketplace listing claimed

### Claude marketplace-compatible bundle

- local truth
  - `distribution/claude-marketplace/`
- current status
  - bundle materialized
  - publish-ready
  - not yet claimed as officially listed

## How To Talk About These Surfaces

### Allowed claim now

- `package-ready`
- `starter-ready`
- `builder-facing public front door`
- `marketplace-compatible bundle landed in repo`
- `official registry surface exists, but Switchyard is not listed yet`

### Forbidden overclaim

- `officially listed`
- `published on npm now`
- `available in the official MCP Registry now`
- `full marketplace launch complete`
