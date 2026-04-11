# Switchyard V1 Brief

## Purpose

This brief answers four questions that define the product, not just the code:

1. why Switchyard exists
2. who it serves
3. what V1 actually needs to solve
4. why it must stay an independent product even while borrowing deeply from
   strong upstreams

The default readers are:

- a zero-context new agent
- a future engineer who needs to continue the ADR, contract, or runbook work

## Product Sentence

> Switchyard is a shared provider runtime for AI apps.
>
> It turns real end-user AI access into reusable runtime capability that other
> AI products can consume.

That access is not limited to API keys. It includes:

- official API keys
- Web/Login, OAuth, or subscription-backed sessions
- future runtime-native capability sources that may be added later

## Why The Project Exists

### 1. It does not exist just to patch three first-party repos

The three first-party repos are the most important sample consumers, but they
are not the reason Switchyard exists.

The real target user is broader:

> any team building an AI product that needs multiple AI access lanes but does
> not want the provider layer to collapse into app-local chaos

The project exists because too many apps keep repeating the same problems:

- re-writing provider contracts
- juggling different auth models and model references
- handling brittle Web/Login access in app code
- rebuilding routing, refresh, remediation, and diagnostics in every product

### 2. It is not another chat product

Switchyard is not here to become the final assistant, chat shell, or channel
hub. It exists on the supply side:

- one provider directory
- one credential and session boundary
- one runtime request/response language
- one diagnostics model
- one service/SDK substrate for AI apps

In plain English:

> Switchyard is not another car.
> It is the shared drivetrain, power system, and port standard that many AI
> products can plug into.

### 3. It is not an `openclaw-zero-token` re-skin

`openclaw-zero-token` is valuable precisely because it already solved hard
Web/Login runtime problems. That does **not** erase Switchyard's value. It
raises the bar.

Switchyard still needs to answer:

- who the first user is
- what the first product identity is
- which parts of the upstream product world should become a cleaner shared
  runtime
- why its outward contract is better suited for AI app integration

## Target Users

### Primary users

- AI product builders
- teams that want multiple AI access lanes in one product
- teams that want to reduce end-user friction instead of forcing every user to
  prepare an API key

### First-party samples

These remain the most important first-party samples:

- `campus-copilot`
- `CortexPilot`
- `multi-ai-sidepanel`

But in the Switchyard product view, they are consumers, not the product
boundary.

### Future compat targets

These stay as future consumer-compat targets:

- `Codex`
- `Claude Code`
- `OpenClaw`

They are not the V1 primary build surface.

## What V1 Must Solve

The V1 problem is **not** “support more providers.”

The real V1 job is:

> turn different kinds of user-owned AI access into one stable provider runtime

That is why the two input lanes matter:

1. `BYOK`
2. `Web/Login`

Both are required because:

- BYOK-only blocks real users who only have subscriptions or web access
- Web/Login-only leaves the clean developer API path incomplete
- without one shared layer, every consumer product keeps rebuilding provider
  plumbing

## Why V1 Does Not Include An Agent Input Lane

That lane may matter later, but pulling it into V1 would blur the product:

- it would mix supply-side runtime semantics with consumer-side agent semantics
- `Codex`, `Claude Code`, and `Gemini CLI` would start polluting the V1 core
  product boundary
- the project would expand from “shared provider runtime” into “agent platform”

So the current rule is simple:

> V1 finishes `BYOK + Web/Login` first.

## V1 Success Criteria

### Kernel Alpha

- runtime terms, boundaries, lane model, and provider contract are locked
- both `BYOK` and `Web/Login` have a minimum runnable spine
- all five fixed Web/Login providers are connected
- the HTTP/service surface exists in one coherent direction

### Kernel Beta

These three providers need the higher stability target:

- `ChatGPT`
- `Gemini`
- `Claude`

At that point:

- auth and session flows are stable
- the diagnostics model is stable
- the service surface is usable for the first-party samples

### First-party Integration

After Kernel Beta, the three first-party repos enter service-first integration.

### Consumer Compat

Only after first-party integration stabilizes do these compat targets move into
implementation:

1. `Codex`
2. `Claude Code`
3. `OpenClaw`

## Product Personality

Switchyard is not a black-box middle layer that hides everything behind clever
fallbacks.

Its default personality is:

- explicit user control
- transparent diagnostics
- no silent identity or provider failover

The default failure strategy stays:

1. report the failure clearly
2. show where it broke
3. return the next decision to the user
