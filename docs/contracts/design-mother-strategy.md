# Switchyard Canonical Design Mother Strategy

## Purpose

This document freezes the design donor boundary for Switchyard.

It exists so the repo no longer depends on chat memory or private taste for one
critical question:

> Which donor language is allowed to shape which Switchyard surface?

## Product Truth

Switchyard is a builder-facing shared provider runtime for AI apps.

That means the design system must optimize for:

- local-first operational work
- long-session readability
- verdict-first hierarchy
- truthful docs
- progressive disclosure

It must **not** optimize for:

- consumer marketing theater
- hosted control-plane SaaS language
- fake observability dashboards
- decorative redesign for its own sake

## Canonical Donor Boundary

### Primary donor for authenticated app/runtime surfaces

- `Linear`

Use `Linear` as the primary mother for:

- authenticated app shell
- runtime front desk
- provider/account status surfaces
- read-only diagnostics and workbench surfaces

What is borrowed:

- dark, precise, dense-but-calm shell language
- hierarchy through border, spacing, and typography
- sustained operator readability
- table/panel/list discipline for continuous work

What is **not** borrowed:

- product-management worldview
- issue-tracker category language
- generic "dark tech brand theater"

Canonical wording:

> Switchyard authenticated app/runtime/workbench surfaces are Linear-led: dark,
> dense, calm, builder-first, and optimized for sustained operational work
> rather than decorative product theater.

### Secondary donor for utility chrome only

- `Raycast`

Use `Raycast` only for:

- command palettes
- quick actions
- launcher/search affordances
- transient utility overlays

What is borrowed:

- compact utility chrome
- keyboard-first affordances
- quick-action surface grammar

What is **not** borrowed:

- launcher worldview as the whole product shell
- floating desktop-tool feel across the entire app
- brand/personality layer as primary shell language

Canonical wording:

> Raycast may inform only transient utility chrome: command palettes, quick
> actions, launcher entrypoints, and small assistive overlays. It must not
> define the primary application shell.

### Docs/public donor only

- `Mintlify`

Use `Mintlify` only for:

- README
- docs front door
- reference/help/FAQ pages
- public knowledge surfaces

What is borrowed:

- reading rhythm
- docs-first page hierarchy
- help/reference clarity

What is **not** borrowed:

- white/light docs language as the authenticated runtime shell
- marketing/docs cadence inside high-frequency operational surfaces

Canonical wording:

> Mintlify may inform only docs/public knowledge surfaces where readability,
> information hierarchy, and reference clarity dominate over operational
> density.

## Hard Rules

1. Do not use `Raycast` as the primary application shell.
2. Do not use `Mintlify` as the primary runtime/workbench shell.
3. Do not inherit donor product identity, runtime model, or category worldview.
4. If a page mixes shell and docs concerns, the authenticated shell still
   follows `Linear`, while embedded docs/help sections may borrow `Mintlify`
   readability.
5. If a local utility layer appears inside a `Linear` shell, it may borrow
   `Raycast` only as a secondary chrome language.

## Current Repo Assets

The following files are expected to stay aligned with this contract:

- `.stitch/DESIGN.md`
- `design-system/MASTER.md`
- `design-system/switchyard-auth-portal/MASTER.md`
- `design-system/switchyard-debug-cockpit/MASTER.md`

## Surface Mapping

| Surface family | Primary donor | Allowed secondary donor | Forbidden primary donor |
| --- | --- | --- | --- |
| Authenticated app/runtime/workbench | `Linear` | `Raycast` utility chrome | `Mintlify` |
| Command palette / quick action / launcher overlay | `Raycast` | `Linear` shell tone | `Mintlify` |
| README / docs front door / public help/reference | `Mintlify` | `Linear` proof-card restraint | `Raycast` |

## Notes

- This is a repo contract, not a prompt decoration.
- If future generated design assets disagree with this file, this file wins.
