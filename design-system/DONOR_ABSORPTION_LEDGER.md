# Switchyard Donor Absorption Ledger

## [Confirmed] Purpose

This ledger turns the donor boundary into an operational checklist.

Use it when a future design change asks:

> Can this surface borrow that donor move without drifting Switchyard's
> identity?

If a proposal does not fit an existing row, it is not approved by default.
Create or update the governing contract first.

## [Confirmed] Row Schema

Each row locks seven things:

1. `Surface`
   - the actual Switchyard page or sub-surface being shaped
2. `Governing asset`
   - the contract file that owns that surface
3. `Primary donor`
   - the donor that leads the surface identity
4. `Allowed borrowings`
   - the specific visual or structural moves that may be absorbed
5. `Forbidden borrowings`
   - the moves that must stay out even if they seem attractive
6. `Worldview freeze`
   - the product/category inheritance that is permanently blocked
7. `Anti-drift assertions`
   - the pass/fail questions future reviewers should be able to answer

## [Confirmed] Surface Ledger

| Surface | Governing asset | Primary donor | Allowed borrowings | Forbidden borrowings | Worldview freeze | Anti-drift assertions |
| --- | --- | --- | --- | --- | --- | --- |
| Auth portal shell | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` | dark operational shell, dense-but-calm grouping, border-led structure, sustained readability | `Mintlify` page shell, `Raycast` launcher shell, marketing hero composition | not a docs landing page, not a launcher app, not a hosted admin home | first screen is lane-first and verdict-first; shell still reads as local-first runtime front desk |
| Auth portal lane split and verdict strip | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` | clear hierarchy, evidence-first framing, mono runtime labels | feature marketing grid, KPI counter row, decorative comparison table | not a feature showroom, not a vanity dashboard | `BYOK` and `Web/Login` remain first split; verdicts appear before workflow detail |
| Auth portal provider cards | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` | action-first cards, calm metadata, quiet status grouping | enterprise module taxonomy, issue-tracker nouns, vanity metrics | not project-management software, not multi-tenant admin | cards tell builder what to do next; they do not sell, upsell, or summarize fake health scores |
| Auth portal quick actions | `design-system/switchyard-auth-portal/MASTER.md` | `Raycast` secondary chrome only | keyboard hints, compact quick actions, transient launcher grammar | full-page launcher personality, persistent floating desktop-tool styling | not a launcher product | utility chrome remains secondary to the `Linear` shell and may disappear without breaking page identity |
| Auth portal embedded help | `design-system/switchyard-auth-portal/MASTER.md` | `Linear` shell remains primary | `Mintlify` readability for subordinate help excerpts or reference snippets | docs-home hero, airy public-docs composition, white/light docs shell takeover | not a docs product | help improves clarity without outranking lane verdicts or trust-boundary language |
| Debug cockpit shell | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` | dense-but-calm shell, evidence-first grouping, long-session readability, border-led hierarchy | `Mintlify` page shell, `Raycast` launcher shell, glossy cockpit styling | not a hosted control plane, not a launcher app | page still reads as read-only diagnosis bench and keeps evidence above spectacle |
| Debug cockpit summary row | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` | first-row truth framing for local materials, current browser, next action | executive dashboard hero, scorecards, metric-wall composition | not an executive review surface | summary row explains three truths before deeper evidence and keeps read-only state visible |
| Debug cockpit evidence stacks and ladders | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` | panel/list/table discipline, mono evidence labels, calm density | fake observability charts, decorative telemetry, review-room slide framing | not a monitoring product, not an external stakeholder cockpit | evidence remains the proof surface; raw JSON and ladders stay functional, not ornamental |
| Debug cockpit quick actions | `design-system/switchyard-debug-cockpit/MASTER.md` | `Raycast` secondary chrome only | compact keyboard-first actions, transient overlays, launcher-like assistive controls | overlay-first navigation model, permanent launcher chrome takeover | not a launcher product | utility affordances stay secondary to the evidence flow and can be removed without changing page identity |
| Debug cockpit embedded help | `design-system/switchyard-debug-cockpit/MASTER.md` | `Linear` shell remains primary | `Mintlify` readability for subordinate help or reference excerpts | docs-first rhythm overtaking evidence layout, light docs shell takeover | not a docs product | help remains subordinate to current verdict and evidence ladder |
| README and public docs front row | `design-system/MASTER.md` | `Mintlify` | public reading rhythm, answer-first framing, proof-routing clarity, editorial hierarchy | authenticated runtime shell styling, launcher chrome, warehouse-style file inventory | not a runtime cockpit, not a landing-page theater shell | front row stays narrow and public-facing; proof and support links help route, not enumerate the whole repo |
| Docs front door | `design-system/MASTER.md` | `Mintlify` | answer-first router layout, light/editorial hierarchy, compact topbar, `Inter` typography on this surface only, subdued `Linear` proof-card restraint | runtime-shell density, `Raycast` launcher personality, file-cabinet IA, donor exceptions leaking back into runtime surfaces | not an authenticated operator shell, not a repo tree browser | page still reads as a shallow public router; `main` remains reachable within the first tab cycle; if nav grows beyond compact-router shape, visible skip link becomes mandatory |
| Public help/reference shelves | `design-system/MASTER.md` | `Mintlify` | docs clarity, glossary/reference rhythm, public support routing, calm proof framing | authenticated runtime shell borrowing, marketing hero inflation, launcher overlays as primary chrome | not part of authenticated runtime identity | public shelves stay readable and truthful; runtime nouns appear only to clarify support boundaries, never to impersonate the operator shell |

Historical drift anchor retained on purpose:

| Public docs and help surfaces | `private local-only design mother strategy contract` | `Mintlify` | docs hierarchy, reading rhythm, public knowledge clarity | `Raycast` primary shell, authenticated runtime shell borrowing | not part of authenticated runtime identity | included here so future work does not reopen donor choice; not edited in this wave |

## [Current Default] How To Use This Ledger

1. Find the row for the surface you want to change.
2. If the intended borrowing is absent from `Allowed borrowings`, treat it as
   rejected.
3. If the change introduces any phrase or composition listed under
   `Forbidden borrowings` or `Worldview freeze`, reject it even if the pixels
   look polished.
4. If the surface has no row yet, add the contract update first. Do not patch
   the page and "normalize later".
5. Do not reopen donor selection through screenshots, taste notes, or prompt
   wording. That requires a higher-layer contract change.
