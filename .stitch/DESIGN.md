# Switchyard Design System

## 1. Product Truth

Switchyard is a shared provider runtime for AI apps. It is not a chat app, not
another hosted control plane, and not a multi-tenant admin console.

This design system exists to shape the repo's real local-first surfaces:

- `auth-portal`
- provider-scoped debug and readiness workbench
- read-only CLI and MCP companion entrypoints

Everything here must reinforce the same truth:

- `BYOK + Web/Login` are the only V1 supply lanes
- the service/runtime substrate is the primary public promise
- CLI and MCP are read-only inspection companions, not an execution brain
- credentials stay user-owned and local-first
- `store-ready` and `live-ready` are different truths and must never collapse

## 1.1 Canonical Design Mother Strategy

Switchyard now freezes the donor boundary instead of leaving it as chat-only
taste:

- `Linear` is the primary mother for authenticated app/runtime/workbench
  surfaces.
- `Raycast` is restricted to utility chrome only:
  - command palettes
  - quick actions
  - launcher/search affordances
  - transient overlays
- `Mintlify` is restricted to docs/public knowledge surfaces only:
  - README
  - docs front door
  - help/reference pages
  - public knowledge structure

Absorption is visual and structural only.

Do **not** inherit donor product identity, product category, or runtime
worldview.

## 1.2 Operational Donor Contribution Freeze

This file is the implementation-facing summary of the donor freeze.

| Donor | May contribute | Must not contribute |
| --- | --- | --- |
| `Linear` | authenticated shell posture, dense-but-calm hierarchy, evidence panels, long-session runtime readability | issue-tracker worldview, project-management nouns, decorative brand indigo, product-category inheritance |
| `Raycast` | command palette grammar, quick actions, keyboard-first utility affordances, transient overlays | launcher worldview as the whole app, floating desktop-tool personality across the full shell, red/blue brand carry-over |
| `Mintlify` | docs readability, help/reference information hierarchy, public knowledge rhythm | light docs shell inside authenticated runtime surfaces, airy marketing gradients inside operator pages, docs-product worldview |

If a desired borrowing is not explicitly allowed above, treat it as forbidden.

## 1.3 Surface Contract Hierarchy

Switchyard now has a fixed design contract stack:

1. `docs/contracts/design-mother-strategy.md` defines the canonical donor boundary.
2. `design-system/MASTER.md` is the root operational master for repo design
   assets.
3. `design-system/switchyard-auth-portal/MASTER.md` and
   `design-system/switchyard-debug-cockpit/MASTER.md` are page-level overrides
   that may tighten but not widen the donor boundary.
4. `design-system/DONOR_ABSORPTION_LEDGER.md` is the anti-drift ledger for
   surface-by-surface checks.
5. Generated `.stitch` assets follow the layers above rather than inventing a
   new donor mix.

Current operational mapping:

- `auth-portal`
  - shell, lane split, verdict strip, provider cards = `Linear`
  - quick actions or command-like overlays = `Raycast` utility chrome only
  - embedded help readability = `Mintlify` only when treated as docs content
- `debug workbench`
  - shell, summary row, evidence stacks, ladders = `Linear`
  - quick actions or overlays = `Raycast` utility chrome only
  - embedded help/reference readability = `Mintlify` only when clearly
    subordinate to the runtime shell

Do not reopen donor selection through prompt wording or local taste edits. The
only legal path is to change the canonical contract first.

## 2. Visual Theme & Atmosphere

The atmosphere is "machine room front desk".

That means:

- calm, precise, and technical
- dense enough for operators, but still humane
- high signal, low decoration
- grounded in local workstation reality, not cloud theater

This is not a marketing landing page and not a fake observability wall.
Interfaces should feel trustworthy, like a well-labeled repair bench, not a
fundraising deck.

Density target: `6/10`
Variance target: `4/10`
Motion target: `3/10`

## 3. Color Palette & Roles

Use one neutral dark system with one green accent. No second accent family.

- **Canvas Night** `#0F1412` - App background
- **Panel Night** `#151C19` - Primary panel fill
- **Raised Night** `#1B2420` - Nested card or raised module fill
- **Line Quiet** `#2A3631` - Borders, dividers, structural lines
- **Text Strong** `#E8F1EC` - Primary text
- **Text Muted** `#A9B7B0` - Secondary text, helper copy, metadata
- **Text Faint** `#7E8D85` - Timestamps, tertiary labels
- **Signal Green** `#3FA56B` - Primary CTA, active states, focus rings
- **Signal Amber** `#C78B2C` - Warnings, degraded-but-recoverable states
- **Signal Red** `#C95A5A` - Blocking states, failed capture, hard errors
- **Info Steel** `#4B6675` - Read-only badges, technical note chips

Rules:

- Never use pure black `#000000`
- Never use neon or glow shadows
- Never use purple, magenta, or blue-gradient "AI" accents
- Use surface contrast and typography for hierarchy before color

## 4. Typography Rules

Primary pair:

- **Sans**: `IBM Plex Sans`
- **Mono**: `JetBrains Mono`

Allowed alternate pair only when a surface is more editorial than operational:

- **Sans**: `Fira Sans`
- **Mono**: `Fira Code`

Default choice for Switchyard surfaces remains `IBM Plex Sans + JetBrains Mono`.

Usage rules:

- Headings, labels, body copy: `IBM Plex Sans`
- Provider ids, routes, timestamps, acquisition modes, payload labels, command
  names, status signatures: `JetBrains Mono`
- Numbers tied to runtime artifacts must use mono
- Do not use `Inter`
- Do not use serif fonts
- Do not overscale the top heading; hierarchy comes from layout and weight, not
  giant hero text

Type scale:

- `12px / 0.75rem` - faint metadata
- `14px / 0.875rem` - secondary metadata and helper copy
- `16px / 1rem` - body default
- `18px / 1.125rem` - emphasized body
- `24px / 1.5rem` - section heading
- `32px / 2rem` - page heading cap

## 5. Layout Principles

### Global

- Prefer left-aligned information architecture
- Prefer stacked sections over broad dashboard mosaics
- Use a contained layout with `max-width: 1200px`
- Use grid or flex with `gap`, never cramped manual offsets
- Panels should feel like work surfaces, not floating glass cards

### Auth Portal

- First screen should answer:
  - what this page is
  - what it is not
  - which lane the user should touch next
- `BYOK` and `Web/Login` are the primary split, not feature categories
- Provider cards are action-first, not metric-first
- Workflow grouping belongs below the main action area, not as the hero

### Debug Workbench

- Provider switcher at the top
- Read-only badge always visible
- First row explains three truths:
  - local materials
  - current browser page
  - next diagnostic action
- Evidence blocks come after summary, not before it

### Empty Space

- Use breathing room to separate concepts, not to make a sparse marketing page
- Dense sections may use divider-based grouping instead of nested cards

## 6. Component Styling

### Shell

- Use a matte dark background with quiet borders
- Use subtle elevation only when it clarifies hierarchy
- Radius target: `16px` to `20px`
- Shadows must be soft and inward-looking, never glowing

### Buttons

- Primary action uses `Signal Green`
- Secondary actions are outline or muted fill
- Active state may shift down by `1px` or darken slightly
- No glossy gradients
- No icon-only critical action without visible label

### Badges and Pills

- Status pills must map to real runtime truth
- Read-only, local-first, and trust-boundary chips should use neutral or steel
  tones, not celebratory colors
- Never use badge rows as fake KPI counters

### Cards

- Cards exist to group one provider or one evidence block
- Avoid generic "three equal cards in a row"
- Nested cards should be used sparingly; divider stacks are preferred for dense
  evidence views

### Tables and Lists

- Use table structure for console/network entries when fields line up
- Use definition-list or labeled rows for current-page and attach-target details
- Do not fake charts for diagnostic data

### Loading

- Use skeletons that match the final layout
- Avoid spinners as the primary loading language
- Loading copy must say what Switchyard is waiting for

### Empty States

- Empty states must tell the operator what is missing and what the next action
  is
- Never show blank containers

### Error States

- Error blocks must say:
  - what failed
  - whether the blocker is local, browser, provider, or human-action required
  - what the next safe action is

## 7. Motion & Interaction

- Motion is supportive, never decorative
- Default duration: `120ms` to `180ms`
- Only animate `opacity`, `transform`, and optional border-color
- Hover should not shift layout
- Focus states must be stronger than hover states
- Respect `prefers-reduced-motion`; reduce to near-static transitions
- No perpetual shimmer, orbit, or parallax
- No scroll-jacking

## 8. Accessibility Baseline

These are required, not optional:

- Provide a visible `Skip to main content` link on nav-heavy views
- Keyboard order must equal visual order
- Main actions must be reachable and operable by keyboard
- Feedback regions use `role="alert"` or `aria-live`
- Error text cannot be color-only
- Focus rings must be obvious against dark surfaces
- Use semantic headings and landmark regions
- Minimum touch target: `44px`
- Maintain WCAG AA contrast

## 9. Content & Runtime Language

Switchyard surfaces should translate runtime truth into operator language.

Preferred voice:

- direct
- specific
- calm
- fail-closed

Writing rules:

- Explain technical reality in plain language first
- Say what the user can do next
- Never claim success without runtime proof
- Never hide the trust boundary

Important semantic rules:

- "local materials ready" is not the same as "browser page live-ready"
- "start login" is transport to the worksite, not capture completion
- "capture session" means Switchyard stores the material
- "read-only" must stay visible on CLI/MCP companion views

## 10. Screen-Specific Laws

### Auth Portal must be

- a local-first front desk
- action-oriented
- trust-boundary explicit
- lane-first

### Auth Portal must not be

- a marketing hero page
- a fake productivity dashboard
- a SaaS admin home

### Debug Workbench must be

- provider-scoped
- read-only
- evidence-oriented
- ladder-driven

### Debug Workbench must not be

- a multi-tenant control plane
- a KPI wall
- a review shell for external stakeholders

## 11. If React or shadcn Is Introduced Later

Do not introduce React or shadcn just to look modern. The current server-rendered
shell is allowed to stay if it can express the right semantics.

If a future slice genuinely needs a richer local interaction layer:

- use `Alert` for callouts
- use `Skeleton` for loading
- use `Table` for structured console/network data
- use `Command` only if search/palette is truly needed
- use semantic tokens instead of raw colors
- use `gap` spacing, not ad hoc spacing hacks

## 12. Anti-Patterns (Banned)

- fake KPI cards
- invented uptime, latency, or success percentages
- multi-tenant navigation like `Teams`, `Billing`, `Users`, `Workspace`
- centered generic marketing hero
- "Contact Sales" primary CTA
- purple glow, neon gradient, or glassmorphism theater
- emoji icons
- fake observability charts
- "AI confidence" meters
- giant three-card feature rows
- floating decorative blobs
- copy that implies Switchyard is a hosted SaaS today
- copy that implies CLI or MCP can perform acquisition writes
- hiding the difference between `store-ready` and `live-ready`

## 13. Asset Output Rules

Files under `.stitch/designs/` are implementation-facing screen specs for the
real repo surfaces. They are not permission to invent a parallel product line.

Every design asset should answer:

1. which real Switchyard surface it corresponds to
2. which truths it must expose
3. which anti-patterns are forbidden
4. how success, loading, empty, and blocked states should look
5. which row in `design-system/DONOR_ABSORPTION_LEDGER.md` it still satisfies
