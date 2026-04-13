# Switchyard Canonical Design Mother Strategy

## [Confirmed] Contract Role

This file operationalizes
`docs/contracts/design-mother-strategy.md` for repo-local design assets.

Authority order for design assets is fixed:

1. `docs/contracts/design-mother-strategy.md`
2. `design-system/MASTER.md`
3. `design-system/switchyard-auth-portal/MASTER.md`
4. `design-system/switchyard-debug-cockpit/MASTER.md`
5. `.stitch/DESIGN.md`
6. generated screen specs or future implementation notes

Page masters may tighten or specialize a rule. They may not reopen donor
selection or widen the borrow boundary.

## [Confirmed] Product Truth

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

## [Confirmed] Donor Contribution Freeze

| Donor | Frozen contribution | Frozen non-contribution |
| --- | --- | --- |
| `Linear` | authenticated shell posture, dense-but-calm hierarchy, border-led grouping, long-session readability, evidence/panel/list discipline | issue-tracker worldview, project-management nouns, decorative indigo branding, product-category inheritance |
| `Raycast` | command palettes, quick actions, launcher/search affordances, transient utility overlays, keyboard-first assistive chrome | launcher worldview as the whole app, floating desktop-tool personality across primary shells, red/blue brand carry-over |
| `Mintlify` | docs/public information hierarchy, reading rhythm, help/reference clarity, public knowledge structure | light docs shell inside authenticated runtime surfaces, airy docs-marketing hero language in operator pages, docs-product worldview |

If a proposed borrowing is not explicitly listed in the `Frozen contribution`
column, it is out of bounds.

## [Confirmed] Surface-to-Donor Freeze

| Surface | Governing asset | Primary donor | Allowed secondary donor | Explicit freeze |
| --- | --- | --- | --- | --- |
| Auth portal shell and first screen | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` | `Raycast` utility chrome only | no `Mintlify` shell, no Raycast-as-shell |
| Auth portal embedded help/reference blocks | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` shell remains primary | `Mintlify` readability only inside subordinate help content | help must not flip the page into docs-first framing |
| Debug cockpit shell and evidence flow | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` | `Raycast` utility chrome only | no `Mintlify` shell, no desktop-launcher personality |
| Debug cockpit embedded help/reference blocks | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` shell remains primary | `Mintlify` readability only inside subordinate help content | help must not outrank evidence or verdicts |
| Command palette / quick action overlays | future local utility layer | `Raycast` | `Linear` shell tone | must stay transient, never become the app identity |
| README / docs front door / public help/reference | `design-system/MASTER.md` until a narrower page master exists | `Mintlify` | `Linear` restraint for proof cards and trust-boundary chips | no authenticated runtime shell, no Raycast launcher personality, no file-cabinet-first IA |

## [Confirmed] Forbidden Inheritances

The following are frozen out even if they look visually attractive:

- hosted SaaS theater
  - `Workspace`, `Billing`, `Seats`, `Users`, `Invite teammates`, or other
    multi-tenant admin nouns
- consumer-chat worldview
  - chat composer as the page hero
  - assistant persona as the product narrator
  - conversation timeline as the home surface
- donor category drag
  - `Linear` issue-tracker semantics
  - `Raycast` launcher product identity
  - `Mintlify` docs-product identity inside runtime shells
- proof inflation
  - fake KPI cards
  - fake observability walls
  - performance or success counters without runtime evidence

## [Current Default] Enforcement

- Use `design-system/DONOR_ABSORPTION_LEDGER.md` as the operational checklist
  before changing any governed surface.
- If a page mixes shell and docs concerns, the authenticated shell still follows
  `Linear`, while embedded docs/help may borrow `Mintlify` readability.
- If a local utility layer appears inside a `Linear` shell, it may borrow
  `Raycast` only as a secondary chrome language.
- Changing donor choice requires a contract update, not a new prompt, screenshot,
  or taste argument.

## [Current Default] Docs/Public Operational Contract

`README`, `docs front door`, and public help/reference shelves are now governed
surfaces, not "outside this wave" leftovers.

Their rules are intentionally narrow:

- `Mintlify` owns public docs hierarchy, editorial reading rhythm, and
  answer-first routing.
- `Linear` may appear only as restraint:
  - proof cards
  - trust-boundary badges
  - calm evidence framing
- `Raycast` does not lead any docs/public shell.

Typography and accessibility for these surfaces are also fixed:

- `Inter` is allowed only on `Mintlify`-governed docs/public surfaces.
- `IBM Plex Sans + JetBrains Mono` remains the default for runtime/operator
  surfaces and any mixed surface that still reads as a shell.
- Public docs routers may omit a visible skip link only while they remain
  compact, shallow, and `main` is reachable within the first tab cycle.
- Once docs/public navigation becomes nav-heavy, a visible
  `Skip to main content` link becomes mandatory again.

If a docs/public surface needs tighter page-level rules later, create a
dedicated page master. Until then, this section is the operational contract.

Historical drift anchor retained on purpose:

| README / docs front door / public help/reference | outside this wave | `Mintlify` | `Linear` restraint for proof cards | not a target for the current implementation slice |

## [Current Default] Runtime Tokens

Use the repo runtime shell defaults from `.stitch/DESIGN.md`:

- dark matte surfaces
- green primary action
- muted technical metadata
- monospaced runtime identifiers
- no neon glow, no fake KPI cards, no "Contact Sales" primary CTA
