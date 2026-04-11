# Shared Provider Runtime

## What It Means

A shared provider runtime is the layer that sits between AI apps and upstream
AI providers.

Think of it like one power box for many rooms: each room still does its own
work, but none of them has to wire directly into the high-voltage grid alone.

That is the layer Switchyard is trying to own:

- provider access normalization
- auth and session normalization
- diagnostics normalization
- service and SDK surfaces for AI apps

## Why It Matters

Without a shared provider runtime, every app keeps rebuilding the same messy
provider layer:

- provider-specific auth handling
- model naming differences
- session expiry and remediation
- error normalization
- Web/Login edge cases

## What Switchyard Can Truthfully Claim Today

Truthfully claimable now:

- `shared provider runtime`
- `BYOK + Web/Login`
- `API substrate first`
- `service-first runtime frontdoor`
- `AI app backend` in the narrow runtime sense
- `partial Codex / Claude Code / OpenClaw thin compat`
- `partial read-only MCP surface`

Not truthfully claimable now:

- `full Codex support`
- `full Claude Code support`
- `full OpenClaw parity`
- `MCP execution brain`
- `runtime invoke through MCP`

## Why This Page Exists

Searchers and AI tools often look for phrases like:

- `shared provider runtime`
- `AI app backend`
- `multi-provider runtime`

If this layer is not named clearly, the repo is easy to misread as:

- a chat product
- an agent shell
- another all-in-one AI platform
