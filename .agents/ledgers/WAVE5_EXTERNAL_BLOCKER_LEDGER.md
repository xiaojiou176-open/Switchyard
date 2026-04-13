# Wave 5 External Blocker Ledger

Updated: 2026-04-13 PDT
Owner: L1 Wave 5 Commander

## Current external-only blockers

| Provider | Current state | Type | What was tried | Current next step |
| --- | --- | --- | --- | --- |
| `Claude` | `claude-account-action-required` | `owner-manual later` | fresh same-turn service/web-login/reality reruns | restore provider account access / overdue subscription, then rerun Claude-scoped live proof |
| `Grok` | `grok-browser-session-incomplete` | `owner-manual later` | fresh same-turn web-login/reality reruns | finish sign-in or human verification until the attached browser reaches a reusable workspace |

## Important boundary

These are **not** repo-owned blockers for the three Wave 5 goals. They are workstation/browser/account reality.

## Resolved during this wave

- `ChatGPT`
  - temporary late-turn `chatgpt-cdp-unavailable / transport-instability`
  - repo-owned non-human fix tried:
    - recycle the dedicated Switchyard Chrome root
    - rerun `bootstrap:web-login-browser -- --provider chatgpt`
    - rerun the provider-scoped live gate
  - final result:
    - `chatgpt = success`
