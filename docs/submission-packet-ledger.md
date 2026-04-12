# Switchyard Submission Packet Ledger

This page is the repo-side packing list for Switchyard's next heavy lanes.

Use it when you need one answer to a very practical question:

> Which exact files make up the honest submission packet for Switchyard, and
> which later lanes still need owner-side publish or read-back?

Think of it like a shipping checklist.
`README.md` is the storefront sign, while this page is the box label that says
what is actually inside before you send it to a registry or host ecosystem.

## Current lane split

Switchyard has three different outward shapes today:

| Lane | What it really is | Current truth |
| --- | --- | --- |
| Repo front door | the product story and proof-first docs atlas | live on GitHub + GitHub Pages |
| Official MCP Registry / npm lane | a read-only MCP submission packet | repo-owned packet is materialized, but publication and registry listing are not live |
| Host-native secondary packet lane | builder/runtime-diagnostics packet for host ecosystems | packet exists in repo; host receipts stay packet-scoped, not repo-wide acceptance |

## Canonical packet map

| Packet slice | What goes in the box | Exact repo paths | Current status | What it does not prove |
| --- | --- | --- | --- | --- |
| Repo-wide front door | product sentence, first success, distribution truth | `README.md`, `DISTRIBUTION.md`, `docs/public-distribution-ledger.md`, `docs/index.html` | live / repo-ready | official registry listing, npm publication, or hosted runtime launch |
| Official MCP Registry packet | machine-readable MCP descriptor + npm package contract + install docs | `packages/surfaces/mcp/server.json`, `packages/surfaces/mcp/package.json`, `packages/surfaces/mcp/README.md`, `docs/mcp.md` | packet-ready | upstream npm publish, registry acceptance, or write-capable MCP |
| Host-native runtime-diagnostics packet | reviewer-facing skill folder for host ecosystems | `distribution/claude-marketplace/plugins/switchyard-builder-suite/skills/runtime-diagnostics/README.md`, `distribution/claude-marketplace/plugins/switchyard-builder-suite/skills/runtime-diagnostics/manifest.yaml`, `distribution/claude-marketplace/plugins/switchyard-builder-suite/skills/runtime-diagnostics/references/README.md` | packet-ready with packet-scoped host receipts | repo-wide marketplace acceptance, npm publication, or official MCP Registry truth |
| Builder starter pack packet | copy-ready builder materials for Codex / Claude Code / OpenClaw / MCP | `starter-packs/README.md`, `starter-packs/builders/codex/README.md`, `starter-packs/builders/claude-code/README.md`, `starter-packs/builders/openclaw/README.md`, `starter-packs/builders/mcp/README.md` | repo-ready | official plugin listing or full host parity |

## Official MCP Registry / npm-first packet

When the later lane is "submit the real MCP server", the canonical repo-owned
packet is:

1. `packages/surfaces/mcp/server.json`
2. `packages/surfaces/mcp/package.json`
3. `packages/surfaces/mcp/README.md`
4. `docs/mcp.md`
5. `DISTRIBUTION.md`

That set is the honest "registry-facing box."
It already explains the name, version, stdio transport, environment variables,
and current not-live boundary.

What still remains later:

- publish `@switchyard/surface-mcp`
- do official registry submission/read-back
- keep wording at `packet-ready` until upstream search can actually find it

## Host-native secondary packet

The runtime-diagnostics packet is a different box.
It is useful for host ecosystems that want a self-contained folder, but it is
still a **secondary packet lane**.

If you need the current outer-lane verdicts for Cline, owner-manual forms,
Smithery, or HiMarket, open
[`docs/mcp-listings-cockpit.md`](./mcp-listings-cockpit.md).

Use these files together:

1. `distribution/claude-marketplace/plugins/switchyard-builder-suite/skills/runtime-diagnostics/README.md`
2. `distribution/claude-marketplace/plugins/switchyard-builder-suite/skills/runtime-diagnostics/manifest.yaml`
3. `distribution/claude-marketplace/plugins/switchyard-builder-suite/skills/runtime-diagnostics/references/README.md`

If a host shows a live page or a review receipt for this packet, keep that
receipt inside the packet lane.
Do not let that leak upward into repo-wide `listed-live` wording.

## Release / read-back gate order

For the next heavy-lane push, the honest order is:

1. keep the repo front door and `DISTRIBUTION.md` aligned
2. keep the MCP descriptor and package metadata frozen as the canonical
   submission packet
3. treat host-native packet receipts as packet-scoped truth
4. only upgrade npm / Official MCP Registry wording after fresh upstream
   read-back exists

## Do not mix these boxes

These materials do **not** belong in the current submission packet:

- `apps/service/` runtime internals
- hosted multi-tenant claims
- Docker / GHCR / remote runtime language
- write-capable MCP promises

Those are different cargo families.
They should not be stuffed into the current read-only registry/host packet just
to make the box look bigger.
