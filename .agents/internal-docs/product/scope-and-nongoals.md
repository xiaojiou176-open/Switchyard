# Switchyard V1 Scope and Non-Goals

## Purpose

This page does one job:

> lock the V1 boundary so the project does not expand into every “important”
> idea at once

It is not the implementation plan, a runbook, or a contract deep-dive. It
exists so future agents know:

- what V1 includes
- what V1 excludes
- what is only later roadmap
- what still looks attractive but must not be smuggled into the current scope

## V1 In Scope

### 1. V1 only ships two supply lanes

`Switchyard V1` only ships:

1. `BYOK`
2. `Web/Login`

Those are the only two primary supply-side lanes.

### 2. Fixed Web/Login provider set

The fixed V1 list is:

1. `ChatGPT`
2. `Gemini`
3. `Claude`
4. `Grok`
5. `Qwen`

This is a committed set, not an open wish list.

### 3. Web/Login completion depth

Every Web/Login provider in V1 must support:

- one-account operation
- user login or OAuth inside Switchyard
- session renewal
- expiry signaling
- basic diagnostics
- real E2E connectivity

The important rule here is:

> structural support alone does not count as completion

### 4. Higher-stability target

These three providers are the higher-stability V1 targets:

- `ChatGPT`
- `Gemini`
- `Claude`

The other two still need real connectivity, but the stability bar can be lower.

### 5. BYOK lane scope

#### Must be truly live

- `Gemini API Key`

#### Must have code-level support in V1

- `OpenAI`
- `Anthropic`
- `Grok / xAI`
- `OpenRouter`
- `Groq`
- `Qwen API`
- `Vertex AI`
- `Bedrock`

Code-level support means:

- provider entry exists
- model/provider reference rules have a home
- the contract layer can represent the lane truth

It does **not** mean every provider needs full live-account validation in V1.

### 6. Credential boundary

V1 keeps one hard rule:

> Switchyard only accepts end-user-owned credentials

That means:

- no shared account pool
- no maintainer-owned public credentials
- no platform-held public AI entitlement

### 7. Runtime shape

V1 remains:

- `API substrate first`
- `service-first`
- `local-first`
- deployable later

SDK/client stays as a formal consumer surface, but it must not replace the main
runtime story.

The first-party integration phase continues to prefer:

- `service-first`

## V1 Non-Goals

The following are explicitly outside V1.

### 1. No `Agent Input Lane`

That means:

- no `Codex` as a supply-side input source
- no `Claude Code` as a supply-side input source
- no `Gemini CLI`

### 2. No Web/Login multi-account pooling

That means:

- no provider-side account pool
- no automatic account rotation
- no silent account switching
- no implicit failover

### 3. No raw fork product

V1 does not allow any upstream repo to be renamed, trimmed, and re-published as
Switchyard.

### 4. No control-plane-first product

V1 is not:

- an admin dashboard product
- an operator shell product
- a multi-tenant SaaS account system
- a channel aggregation product

### 5. No compat implementation as the main delivery track

These remain later compat targets, not the V1 main build surface:

- `Codex`
- `Claude Code`
- `OpenClaw`

### 6. No “support every future provider now”

These do not enter the V1 committed scope:

- `DeepSeek`
- `HuggingFace`
- `MiniMax`

The architecture should leave room for them later, but V1 does not promise
them.

## Stage Gates

### `Kernel Alpha`

This stage exists when:

- the provider-runtime boundary is locked
- `BYOK + Web/Login` both have a minimum runnable spine
- the fixed five Web/Login providers are connected
- the service surface exists

### `Kernel Beta`

This stage exists when:

- `ChatGPT / Gemini / Claude` reach the higher stability target
- auth/session flows are stable
- diagnostics are stable
- the service surface is ready for the first-party samples

### `First-party Integration`

Only after Kernel Beta do the three first-party repos enter the integration
phase.

### `Consumer Compat`

Only after first-party integration passes do these compat targets move into
implementation:

1. `Codex`
2. `Claude Code`
3. `OpenClaw`

## Risk Philosophy

The V1 default philosophy stays:

- explicit user control
- transparent diagnostics
- no hidden fallback story that pretends the runtime is more stable than it is
