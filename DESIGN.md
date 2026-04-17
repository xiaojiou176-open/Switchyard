# Switchyard Design Front Door

This file is the single front door for Switchyard design work.

It exists so future changes do not depend on chat memory, private taste, or
half-remembered screenshots before touching a governed surface.

## Product Truth

Switchyard is a shared provider runtime for AI apps.

It is not:

- a chat product
- a hosted control plane
- a multi-tenant admin console
- a marketing-first showcase shell

Every UI and public surface must reinforce the same product truth:

- `BYOK + Web/Login` are the only V1 supply lanes
- the service/runtime substrate is the primary public promise
- runtime/operator surfaces stay local-first and builder-facing
- docs/public surfaces stay truthful, answer-first, and narrow

## Start Here

If you are changing any UI, public surface, or visual language, read in this
order:

1. `DESIGN.md`
2. `design-system/MASTER.md`
3. the matching page master
   - `design-system/switchyard-auth-portal/MASTER.md`
   - `design-system/switchyard-debug-cockpit/MASTER.md`
4. `design-system/DONOR_ABSORPTION_LEDGER.md`
5. `.stitch/DESIGN.md`

If a change does not fit this stack, update the governing contract first.

## Donor Boundary

Switchyard uses three doctrine donors only.

| Surface family | Primary donor | Allowed secondary | What it is for |
| --- | --- | --- | --- |
| Authenticated runtime shells | `Linear` | `Raycast` utility chrome only | dense-but-calm operator surfaces, verdict-first hierarchy, long-session readability |
| Docs and public knowledge surfaces | `Mintlify` | `Linear` proof restraint only | answer-first docs routing, reading rhythm, reference clarity |
| Command palette / transient quick actions | `Raycast` | `Linear` shell tone only | keyboard-first assistive chrome, never the full app identity |

Hard freeze:

- Do not inherit donor product identity.
- Do not inherit donor category worldview.
- Do not use `Mintlify` as the runtime shell.
- Do not use `Raycast` as the page identity.
- Do not reopen donor choice through screenshots or prompt wording.

## Real Absorption Scope

The active donor doctrine comes from the extracted design archives for:

- `linear.app`
- `mintlify`
- `raycast`

Switchyard treats those as doctrine donors, not runtime or product mothers.

That means Switchyard may absorb:

- layout grammar
- hierarchy
- typography rules
- color restraint
- utility chrome patterns

Switchyard may not absorb:

- hosted SaaS worldview
- launcher-product identity
- docs-product identity inside authenticated shells
- decorative redesign with no product-truth payoff

## Governed Surfaces

These are the main surfaces currently under active design contract:

- `auth-portal`
- provider debug workbench
- docs front door
- public help/reference shelves
- read-only runtime companion entrypoints

The detailed, row-by-row approval matrix lives in
`design-system/DONOR_ABSORPTION_LEDGER.md`.

## Anti-Drift Questions

Before landing a UI or public-surface change, answer all of these with `yes`:

1. Does the page still tell the truth about what Switchyard is and is not?
2. Does the surface still read like the right room:
   runtime shell, docs router, or utility chrome?
3. Did the change stay inside the donor boundary already approved for that
   surface?
4. Does the first screen reduce cognitive load instead of adding decorative
   complexity?
5. Would a future contributor know which deeper contract to open next?

If any answer is `no`, stop and update the governing contract before styling
further.
