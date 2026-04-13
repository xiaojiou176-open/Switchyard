# Switchyard Canonical Design Mother Strategy

## Product Truth

Switchyard is a builder-facing shared provider runtime for AI apps.

It is not:

- a chat product
- a hosted multi-tenant control plane
- a generic enterprise admin dashboard
- a marketing-first launch shell

The design system must reinforce:

- local-first
- service/runtime first
- builder-facing
- verdict-first
- progressive disclosure
- truthful docs

## Donor Boundary

### Primary donor

- `Linear`
  - use for authenticated app/runtime/workbench surfaces
  - absorb:
    - dense but calm operational hierarchy
    - dark native shell
    - fine border layering
    - long-session readability
    - issue/panel/table style information density

### Secondary donor

- `Raycast`
  - utility chrome only
  - absorb only for:
    - command palette
    - quick actions
    - launcher/search affordances
    - transient utility overlays

### Docs/public donor

- `Mintlify`
  - docs/public knowledge surfaces only
  - absorb only for:
    - README and docs front door
    - help/reference layouts
    - reading rhythm
    - public information hierarchy

## Hard Rules

1. Do not use `Raycast` as the primary application shell.
2. Do not use `Mintlify` as the primary runtime/workbench shell.
3. Do not turn runtime surfaces into consumer marketing pages.
4. Do not inherit donor product identity, runtime worldview, or category language.
5. When a page mixes shell and docs concerns, the authenticated shell still
   follows `Linear`, while embedded docs/help sections may borrow `Mintlify`
   readability rules.

## Page Mapping

| Surface family | Primary donor | Allowed secondary donor | Forbidden primary donor |
| --- | --- | --- | --- |
| Authenticated app/runtime/workbench | `Linear` | `Raycast` utility chrome | `Mintlify` |
| Command palette / quick actions / launcher overlays | `Raycast` | `Linear` shell tone | `Mintlify` |
| README / docs front door / public help/reference | `Mintlify` | `Linear` restraint for proof cards | `Raycast` |

## Runtime Tokens

Use the repo runtime shell defaults from `.stitch/DESIGN.md`:

- dark matte surfaces
- green primary action
- muted technical metadata
- monospaced runtime identifiers
- no neon glow, no fake KPI cards, no "Contact Sales" primary CTA

## Relationship To Page Masters

The page-level master files under `design-system/` are allowed only as surface
overrides.

If a page-level file conflicts with this file, this file wins.
