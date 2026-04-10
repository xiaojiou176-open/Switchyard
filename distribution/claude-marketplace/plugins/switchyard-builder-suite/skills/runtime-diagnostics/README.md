# Switchyard Runtime Diagnostics Public Skill Packet

This folder is the public, self-contained skill packet for Switchyard's
read-only MCP runtime diagnostics lane.

Use it when you want one portable skill folder that teaches an agent four
things:

- how to attach the current Switchyard MCP server
- which read-only runtime and catalog tools are safe first
- what one good first diagnostic loop looks like
- which claims stay out of bounds until a real package, listing, or registry
  entry exists

## What this packet includes

- `SKILL.md`
- `manifest.yaml`
- `references/README.md`
- `references/INSTALL.md`
- `references/OPENHANDS_MCP_CONFIG.json`
- `references/OPENCLAW_MCP_CONFIG.json`
- `references/CAPABILITIES.md`
- `references/DEMO.md`
- `references/TROUBLESHOOTING.md`

## Best-fit hosts

- OpenHands/extensions-style contribution or review flow
- ClawHub-style host-native skill lane
- repo-local import flows that expect a standalone folder with install, config,
  capability, and demo notes

## Current truthful state

- the repo-owned packet is complete as a portable host-native skill folder
- a ClawHub skill page for this packet can be read back live today
- the OpenHands/extensions lane currently has a fresh external review receipt at
  PR #161, but `review-pending` is still not the same as `listed-live`
- this packet stays secondary to the repo's primary runtime identity

## What this packet must not claim

- no live OpenHands/extensions listing without fresh PR or read-back
- no published npm package or official MCP Registry listing without fresh
  receipt
- no execution-brain or full host-parity claim
