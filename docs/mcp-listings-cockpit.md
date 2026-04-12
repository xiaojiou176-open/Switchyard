# Switchyard MCP Listings Cockpit

This page is the honest outer-lane cockpit for Switchyard's MCP surface.

It separates:

- exact registry blocker
- real intake receipts
- owner-manual packets
- not-honest-yet lanes

## Current Verdict

| Lane | Current status | Exact receipt or blocker |
| --- | --- | --- |
| Official MCP Registry | `exact blocker` | `npm publish` for `@switchyard/surface-mcp@0.1.0` returned `404 Not Found - PUT https://registry.npmjs.org/@switchyard%2fsurface-mcp`; current blocker is npm scope/package ownership under the active `xiaojiou176` account. |
| Cline MCP Marketplace | `review-pending` | Live issue receipt: `https://github.com/cline/mcp-marketplace/issues/1321` |
| mcpservers.org | `owner-manual-ready` | Public form packet below is complete enough for owner submit. |
| MCP.so | `owner-manual-ready` | Public `/submit` packet below is complete enough for owner submit. |
| LobeHub MCP Marketplace | `owner-manual-ready` | Listing packet below is prepared; login/import remains owner-only. |
| Smithery | `exact blocker` | No public HTTPS MCP runtime is evidenced today; current surface is local stdio plus optional local service base URL. |
| HiMarket | `exact blocker` | The repo does not currently ship an honest Higress `mcp-server.yaml`, and the current surface is not a Higress-ready gateway packet. |

## Cline Packet

- repo URL:
  - `https://github.com/xiaojiou176-open/Switchyard`
- logo URL:
  - `https://raw.githubusercontent.com/xiaojiou176-open/Switchyard/w4-switchyard-submission-packet-ledger/assets/storefront/switchyard-mcp-icon-400.png`
- install doc:
  - `llms-install.md`
- tested repo-owned path:
  - `pnpm run example:host-mcp`
- truthful additional info:
  - current install path is local checkout + stdio
  - startup command is `pnpm run switchyard:mcp -- --base-url http://127.0.0.1:4010`
  - the surface is read-only and not a hosted runtime
  - npm and Official MCP Registry are still blocked by package ownership/publication

## Owner-Manual Packet

### mcpservers.org

| Field | Value |
| --- | --- |
| Title / Project Name | `Switchyard MCP` |
| Link to GitHub Repository | `https://github.com/xiaojiou176-open/Switchyard` |
| Short Description | `Read-only MCP surface for Switchyard runtime truth, BYOK/Web-Login catalogs, and safe diagnostics.` |
| Full Description | `Switchyard ships a repo-native read-only stdio MCP surface that lets outer agent shells inspect runtime truth, provider readiness, and builder catalogs without claiming a hosted control plane or write-capable MCP backend.` |
| Project Homepage | `https://xiaojiou176-open.github.io/Switchyard/mcp.html` |
| Documentation URL | `https://xiaojiou176-open.github.io/Switchyard/mcp.html` |
| Listing Category | `Developer Tools` |
| Tags | `mcp, switchyard, diagnostics, read-only, byok, web-login` |
| Platform | `macOS, Linux` |
| Programming Language | `TypeScript` |
| License Type | `MIT` |
| Type | `MCP Server` |

### MCP.so

| Field | Value |
| --- | --- |
| Type | `MCP Server` |
| Name | `Switchyard MCP` |
| URL | `https://github.com/xiaojiou176-open/Switchyard` |
| Server Config | See the JSON snippet below. |

```json
{
  "mcpServers": {
    "switchyard": {
      "command": "pnpm",
      "args": ["run", "switchyard:mcp", "--", "--base-url", "http://127.0.0.1:4010"],
      "cwd": "/absolute/path/to/Switchyard"
    }
  }
}
```

### LobeHub MCP Marketplace

| Field | Value |
| --- | --- |
| GitHub Repository URL | `https://github.com/xiaojiou176-open/Switchyard` |
| Title | `Switchyard MCP` |
| One-liner | `Read-only MCP surface for Switchyard runtime truth and safe diagnostics.` |
| Long description | `Switchyard MCP gives coding-agent shells a governed read-only bridge into Switchyard runtime truth, provider readiness, and builder catalogs. The current install path is local checkout + stdio; it is not a hosted HTTP MCP runtime and it does not claim write-capable execution.` |
| Docs / homepage | `https://xiaojiou176-open.github.io/Switchyard/mcp.html` |
| Suggested logo | `assets/storefront/switchyard-mcp-icon-400.png` |
| Suggested screenshots | `https://xiaojiou176-open.github.io/Switchyard/` and `https://xiaojiou176-open.github.io/Switchyard/mcp.html` |

## Owner Last Click

- `mcpservers.org`: open submit form, paste fields, submit
- `MCP.so`: open `/submit`, select `MCP Server`, paste repo URL and config, submit
- `LobeHub`: log in, open community profile, `Submit Repo`, paste GitHub URL, submit
