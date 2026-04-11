# BYOK vs Web/Login in Switchyard

## Why Both Exist

`Switchyard V1` keeps both lanes because real users do not all arrive with the
same kind of access.

### BYOK

- official API key
- cleaner provider API path
- simpler production-style integration

### Web/Login

- browser login, OAuth, or subscription session
- useful when the user has real product access but no API key

## Why This Matters for AI App Builders

Many AI apps get trapped here:

- if they only support BYOK, many real users cannot enter
- if they only support Web/Login, the standard API-builder path stays
  incomplete

So these two lanes are not duplicates.

> one lane is for standard API access
>
> one lane is for real browser-backed user entitlement

## Truthful Status Today

- Gemini BYOK: live verification exists, but the current fresh rerun can still
  stop on missing local API-key material
- Web/Login:
  - all five providers have a real acquisition/remediation path in the repo
  - the current fresh rerun can still stop when the local browser session
    materials are missing
  - on a credentialed workstation, Gemini can narrow further to a
    browser-session repair blocker

This does **not** mean the lanes were deleted or that the repo regressed.

It means:

> the current workstation did not have the user-owned credential or browser
> session material ready at fresh rerun time
