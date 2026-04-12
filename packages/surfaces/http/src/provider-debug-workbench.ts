import type {
  ServiceProviderCurrentConsoleView,
  ServiceProviderCurrentNetworkView,
  ServiceProviderDebugSupportView,
  ServiceProviderDiagnoseStepView,
} from "./service-language.js";

function escapeHtml(value: string): string {
  return `${value ?? ""}`
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderOptionalCode(label: string, value?: string): string {
  if (!value) {
    return "";
  }

  return `<span><strong>${escapeHtml(label)}</strong> <code>${escapeHtml(value)}</code></span>`;
}

function mapTone(status: string): "ok" | "warning" | "danger" {
  if (status === "live-ready" || status === "ready" || status === "captured") {
    return "ok";
  }

  if (
    status === "live-blocked" ||
    status === "limited" ||
    status === "blocked" ||
    status === "recommended" ||
    status === "refreshable-but-degraded"
  ) {
    return "warning";
  }

  return "danger";
}

interface DebugTruthFocus {
  eyebrow: string;
  summary: string;
  detail: string;
  runtimeSummary: string;
}

interface SharedDiagnosticState {
  repeatedRaw?: string;
  condensedSummary?: string;
}

function getDebugTruthFocus(debug: ServiceProviderDebugSupportView): DebugTruthFocus | null {
  const classification = debug.currentPage.classification;
  const requiredUserAction = debug.auth.session?.requiredUserAction?.trim();
  const pageDiagnostic = debug.currentPage.diagnostic;

  switch (classification) {
    case "account-action-required":
      return {
        eyebrow: "Owner action first",
        summary:
          requiredUserAction ||
          pageDiagnostic ||
          "The current browser is still blocked on an owner/manual account step.",
        detail:
          "Current browser evidence can still look reusable. That does not clear the blocker. Finish the owner/manual account step first, then rerun the provider live gate.",
        runtimeSummary:
          "Owner/manual account action is still blocking runtime use. A reusable-looking browser page does not clear this blocker by itself.",
      };
    case "human-verification-required":
      return {
        eyebrow: "Verification first",
        summary:
          requiredUserAction ||
          pageDiagnostic ||
          "The current browser still needs a human verification step before this provider can be treated as reusable.",
        detail:
          "Do the verification step in the current browser first. Only rerun the provider live gate after the blocker is visibly gone.",
        runtimeSummary:
          "Runtime use is still blocked on a human verification step. Current browser reachability is not the same as access being restored.",
      };
    case "session-incomplete":
    case "login-required":
    case "provider-adjacent":
    case "permission-gated":
      return {
        eyebrow: "Browser session first",
        summary:
          pageDiagnostic ||
          requiredUserAction ||
          "The current browser session has not reached a reusable workspace yet.",
        detail:
          "Finish the current browser session until this provider reaches a real workspace. Rerun the provider live gate only after the page is visibly ready.",
        runtimeSummary:
          "Runtime use is still blocked because the current browser session has not reached a reusable workspace yet.",
      };
    default:
      if (debug.auth.session?.state === "user-action-required" && requiredUserAction) {
        return {
          eyebrow: "Owner action first",
          summary: requiredUserAction,
          detail:
            "Switchyard already knows this is an end-user blocker. Finish that action first, then rerun the provider live gate for fresh proof.",
          runtimeSummary:
            "Runtime use is still blocked on an explicit end-user action. Do not treat reruns as the primary fix until that action is complete.",
        };
      }

      return null;
  }
}

function normalizeDiagnosticText(value: string | undefined): string {
  return `${value ?? ""}`.replace(/\s+/g, " ").trim();
}

function getSharedDiagnosticState(debug: ServiceProviderDebugSupportView): SharedDiagnosticState {
  const diagnostics = [
    debug.currentPage.diagnostic,
    debug.currentConsole.diagnostic,
    debug.currentNetwork.diagnostic,
  ]
    .map((value) => normalizeDiagnosticText(value))
    .filter(Boolean);

  const repeated = diagnostics.find(
    (candidate, index) => diagnostics.indexOf(candidate) !== index,
  );

  if (!repeated) {
    return {};
  }

  return {
    repeatedRaw: repeated,
    condensedSummary:
      "The same browser-inspection failure is feeding multiple sections. Keep the primary verdict above, then use the detailed diagnostics tray below for the raw technical message.",
  };
}

function getSectionDiagnosticText(
  diagnostic: string,
  sharedDiagnostic: SharedDiagnosticState,
): string {
  if (
    sharedDiagnostic.repeatedRaw &&
    normalizeDiagnosticText(diagnostic) === sharedDiagnostic.repeatedRaw
  ) {
    return "Same browser-inspection failure as above. Open detailed browser diagnostics below for the raw technical message.";
  }

  return diagnostic;
}

function renderDetailedBrowserDiagnostics(sharedDiagnostic: SharedDiagnosticState): string {
  if (!sharedDiagnostic.repeatedRaw) {
    return "";
  }

  return `<section class="section">
    <header class="section-header">
      <h2>Detailed browser diagnostics</h2>
      <p>${escapeHtml(sharedDiagnostic.condensedSummary ?? "")}</p>
    </header>
    <pre>${escapeHtml(sharedDiagnostic.repeatedRaw)}</pre>
  </section>`;
}

function renderSummaryCard(title: string, status: string, summary: string, meta: string): string {
  const tone = mapTone(status);

  return `<article class="summary-card summary-card-${tone}">
    <p class="eyebrow eyebrow-compact">${escapeHtml(title)}</p>
    <h2>${escapeHtml(status)}</h2>
    <p>${escapeHtml(summary)}</p>
    ${meta ? `<div class="meta-row">${meta}</div>` : ""}
  </article>`;
}

function renderPrimaryVerdict(
  debug: ServiceProviderDebugSupportView,
  truthFocus: DebugTruthFocus,
): string {
  return `<section class="verdict-strip" aria-label="Primary verdict">
    <div class="verdict-copy">
      <p class="eyebrow">Primary verdict</p>
      <h2>${escapeHtml(truthFocus.eyebrow)}</h2>
      <p>${escapeHtml(truthFocus.summary)}</p>
      <p class="verdict-note">${escapeHtml(truthFocus.detail)}</p>
    </div>
    <div class="verdict-facts">
      <article class="verdict-fact">
        <p class="eyebrow eyebrow-compact">Stored material</p>
        <strong>${escapeHtml(debug.storeReadiness.credentialState)}</strong>
      </article>
      <article class="verdict-fact">
        <p class="eyebrow eyebrow-compact">Current browser</p>
        <strong>${escapeHtml(debug.liveReadiness.status)}</strong>
      </article>
      <article class="verdict-fact">
        <p class="eyebrow eyebrow-compact">Runtime path</p>
        <strong>${escapeHtml(debug.runtime.runtimeReadiness)}</strong>
      </article>
    </div>
  </section>`;
}

function renderConsoleEntries(currentConsole: ServiceProviderCurrentConsoleView): string {
  if (currentConsole.entries.length === 0) {
    return `<p class="empty-copy">No fresh console entries were captured during this inspection window.</p>`;
  }

  return `<ul class="evidence-list">
    ${currentConsole.entries
      .map(
        (entry) =>
          `<li><code>${escapeHtml(entry.type)}</code><span>${escapeHtml(entry.text)}</span></li>`,
      )
      .join("")}
  </ul>`;
}

function renderNetworkEntries(currentNetwork: ServiceProviderCurrentNetworkView): string {
  if (currentNetwork.entries.length === 0) {
    return `<p class="empty-copy">No fresh network events were captured for this provider during the current observation window.</p>`;
  }

  return `<table class="evidence-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Method</th>
        <th>Status</th>
        <th>Source</th>
      </tr>
    </thead>
    <tbody>
      ${currentNetwork.entries
        .map(
          (entry) => `<tr>
            <td>${escapeHtml(entry.name)}</td>
            <td><code>${escapeHtml(entry.method ?? "n/a")}</code></td>
            <td><code>${escapeHtml(`${entry.status ?? entry.outcome ?? "n/a"}`)}</code></td>
            <td>${escapeHtml(entry.source ?? "runtime")}</td>
          </tr>`,
        )
        .join("")}
    </tbody>
  </table>`;
}

function renderDiagnoseStep(step: ServiceProviderDiagnoseStepView): string {
  return `<li class="ladder-step ladder-step-${escapeHtml(step.status)}">
    <div>
      <strong>${escapeHtml(step.summary)}</strong>
      <p><code>${escapeHtml(step.id)}</code></p>
    </div>
    ${step.command ? `<pre>${escapeHtml(step.command)}</pre>` : ""}
  </li>`;
}

export function renderProviderDebugWorkbench(
  debug: ServiceProviderDebugSupportView,
  authPortalRoute = "/v1/runtime/auth-portal",
): string {
  const truthFocus = getDebugTruthFocus(debug);
  const sharedDiagnostic = getSharedDiagnosticState(debug);
  const storeMeta = [
    renderOptionalCode("validation", debug.storeReadiness.validationState),
    renderOptionalCode("account", debug.auth?.ownership?.accountLabel),
  ]
    .filter(Boolean)
    .join("");
  const browserMeta = [
    renderOptionalCode("attach", debug.attachTarget.cdpUrl),
    renderOptionalCode("page", debug.currentPage.url),
  ]
    .filter(Boolean)
    .join("");
  const nextAction =
    debug.diagnoseLadder.find((step) => step.status === "recommended") ??
    debug.diagnoseLadder.find((step) => step.status === "blocked") ??
    debug.diagnoseLadder[0];
  const nextStepEyebrow = truthFocus?.eyebrow ?? "Current next step";
  const nextStepSummary = truthFocus?.summary ?? nextAction?.summary ?? "No next step recorded.";
  const nextStepDetail = truthFocus?.detail;
  const runtimeSummary = truthFocus?.runtimeSummary ?? debug.auth.statusSummary;
  const currentBrowserSummary =
    sharedDiagnostic.repeatedRaw &&
    normalizeDiagnosticText(debug.liveReadiness.diagnostic) === sharedDiagnostic.repeatedRaw
      ? "Fresh browser inspection is currently unavailable. Use the detailed browser diagnostics tray below for the raw transport error."
      : debug.liveReadiness.diagnostic;
  const currentPageDiagnostic = getSectionDiagnosticText(debug.currentPage.diagnostic, sharedDiagnostic);
  const currentConsoleDiagnostic = getSectionDiagnosticText(
    debug.currentConsole.diagnostic,
    sharedDiagnostic,
  );
  const currentNetworkDiagnostic = getSectionDiagnosticText(
    debug.currentNetwork.diagnostic,
    sharedDiagnostic,
  );

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(debug.providerDisplayName)} debug workbench</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0f1412;
        --panel: #151c19;
        --panel-raised: #1b2420;
        --ink: #e8f1ec;
        --muted: #a9b7b0;
        --line: #2a3631;
        --accent: #3fa56b;
        --warning: #c78b2c;
        --danger: #c95a5a;
        --ok: #4cbc76;
        --shadow: 0 18px 48px rgba(0, 0, 0, 0.34);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background:
          radial-gradient(circle at top left, rgba(63, 165, 107, 0.16), transparent 24rem),
          radial-gradient(circle at bottom right, rgba(199, 139, 44, 0.14), transparent 18rem),
          var(--bg);
        color: var(--ink);
        font-family: "IBM Plex Sans", "Fira Sans", "Segoe UI", sans-serif;
      }

      main {
        width: min(1220px, calc(100vw - 2rem));
        margin: 0 auto;
        padding: 2rem 0 3rem;
      }

      a {
        color: inherit;
      }

      code,
      pre,
      th,
      td,
      .eyebrow,
      .meta-row span {
        font-family: "JetBrains Mono", "Fira Code", monospace;
      }

      .skip-link {
        position: absolute;
        left: 1rem;
        top: 1rem;
        transform: translateY(-240%);
        padding: 0.75rem 1rem;
        border-radius: 999px;
        background: var(--accent);
        color: #08100b;
        font-weight: 700;
        text-decoration: none;
        transition: transform 140ms ease;
        z-index: 20;
      }

      .skip-link:focus-visible {
        transform: translateY(0);
      }

      .hero,
      .summary-grid,
      .section {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 24px;
        box-shadow: var(--shadow);
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr);
        gap: 1rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
      }

      .hero-copy h1 {
        margin: 0 0 0.75rem;
        font-size: clamp(2rem, 4vw, 3.2rem);
        line-height: 1.04;
      }

      .eyebrow {
        margin: 0 0 0.45rem;
        color: var(--accent);
        font-size: 0.84rem;
        letter-spacing: 0.11em;
        text-transform: uppercase;
      }

      .eyebrow-compact {
        font-size: 0.75rem;
      }

      .hero-copy p,
      .section p,
      .empty-copy {
        color: var(--muted);
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        margin-top: 1rem;
      }

      .pill-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.65rem 0.95rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.04);
        text-decoration: none;
      }

      .pill-link-primary {
        background: var(--accent);
        color: #08100b;
        border-color: transparent;
      }

      .hero-meta {
        display: grid;
        gap: 0.85rem;
      }

      .hero-meta-card,
      .verdict-strip,
      .summary-card,
      .section-card {
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 1rem;
        background: var(--panel-raised);
      }

      .verdict-strip {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(320px, 1fr);
        gap: 1rem;
        padding: 1.2rem;
        margin-bottom: 1rem;
        border-color: rgba(201, 90, 90, 0.34);
      }

      .verdict-copy h2 {
        margin: 0 0 0.45rem;
        font-size: clamp(2rem, 3.8vw, 3.3rem);
        line-height: 0.98;
      }

      .verdict-note {
        color: var(--muted);
      }

      .verdict-facts {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.8rem;
      }

      .verdict-fact {
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 0.9rem 1rem;
        background: rgba(255, 255, 255, 0.03);
      }

      .verdict-fact strong {
        font-size: 1.1rem;
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .summary-card h2 {
        margin: 0 0 0.35rem;
        font-size: 1.2rem;
      }

      .summary-card-ok {
        border-color: rgba(76, 188, 118, 0.3);
      }

      .summary-card-warning {
        border-color: rgba(199, 139, 44, 0.3);
      }

      .summary-card-danger {
        border-color: rgba(201, 90, 90, 0.32);
      }

      .meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .meta-row span {
        color: var(--muted);
        font-size: 0.82rem;
      }

      .section {
        padding: 1.2rem;
        margin-bottom: 1rem;
      }

      .section-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1rem;
      }

      .section-card h3 {
        margin-top: 0;
      }

      .evidence-list,
      .ladder {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.8rem;
      }

      .evidence-list li,
      .ladder-step {
        display: grid;
        gap: 0.35rem;
        padding: 0.85rem;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
      }

      .evidence-table {
        width: 100%;
        border-collapse: collapse;
      }

      .evidence-table th,
      .evidence-table td {
        text-align: left;
        padding: 0.65rem;
        border-top: 1px solid var(--line);
        vertical-align: top;
      }

      .evidence-table th {
        color: var(--muted);
      }

      pre {
        margin: 0;
        padding: 0.8rem;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.04);
        white-space: pre-wrap;
        word-break: break-word;
      }

      .json-link-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .json-link-grid a {
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 0.45rem 0.8rem;
        text-decoration: none;
      }

      .section pre {
        margin-top: 0.85rem;
      }

      :focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      @media (max-width: 760px) {
        .hero {
          grid-template-columns: 1fr;
        }

        .verdict-strip,
        .verdict-facts {
          grid-template-columns: 1fr;
        }

        main {
          width: min(100vw - 1rem, 1220px);
          padding: 1rem 0 2rem;
        }
      }
    </style>
  </head>
  <body>
    <a class="skip-link" href="#debug-workbench-main">Skip to main content</a>
    <main id="debug-workbench-main">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Read-only inspection surface</p>
          <h1>${escapeHtml(debug.providerDisplayName)} debug workbench</h1>
          <p>This page compares <strong>stored material truth</strong> against <strong>the currently attached browser reality</strong>. It is a diagnosis bench, not a control plane, and it never invents green lights from missing evidence.</p>
          <div class="hero-actions">
            <a class="pill-link pill-link-primary" href="${escapeHtml(authPortalRoute)}">Back to auth portal</a>
            <a class="pill-link" href="${escapeHtml(debug.routes.debugSupportBundle)}" target="_blank" rel="noopener">Open support bundle JSON</a>
          </div>
        </div>
        <div class="hero-meta">
          <article class="hero-meta-card">
            <p class="eyebrow eyebrow-compact">Current attach target</p>
            <p>${escapeHtml(debug.attachTarget.note)}</p>
            <div class="meta-row">
              ${renderOptionalCode("source", debug.attachTarget.source)}
              ${renderOptionalCode("cdp", debug.attachTarget.cdpUrl)}
            </div>
          </article>
          <article class="hero-meta-card">
            <p class="eyebrow eyebrow-compact">${escapeHtml(nextStepEyebrow)}</p>
            <p>${escapeHtml(nextStepSummary)}</p>
            ${nextStepDetail ? `<p>${escapeHtml(nextStepDetail)}</p>` : ""}
            ${truthFocus ? "" : nextAction?.command ? `<pre>${escapeHtml(nextAction.command)}</pre>` : ""}
          </article>
        </div>
      </section>

      ${truthFocus ? renderPrimaryVerdict(debug, truthFocus) : ""}
      ${renderDetailedBrowserDiagnostics(sharedDiagnostic)}

      <section class="summary-grid" aria-label="Provider readiness summary">
        ${renderSummaryCard(
          "Stored material",
          debug.storeReadiness.credentialState,
          debug.storeReadiness.note,
          storeMeta,
        )}
        ${renderSummaryCard(
          "Current browser",
          debug.liveReadiness.status,
          currentBrowserSummary,
          browserMeta,
        )}
        ${renderSummaryCard(
          "Runtime path",
          debug.runtime.runtimeReadiness,
          runtimeSummary,
          [
            renderOptionalCode("policy", debug.runtime.degradedInvocationPolicy),
            renderOptionalCode("mode", debug.auth.modeLabel),
          ]
            .filter(Boolean)
            .join(""),
        )}
      </section>

      <section class="section">
        <header class="section-header">
          <h2>Current browser evidence</h2>
          <p>The safest way to reason about a web-login provider is: first what Switchyard stored, then what the current browser page actually shows, then what console and network saw during the same inspection window.</p>
        </header>
        <div class="section-grid">
          <article class="section-card">
            <h3>Current page</h3>
            <p>${escapeHtml(currentPageDiagnostic)}</p>
            <div class="meta-row">
              ${renderOptionalCode("classification", debug.currentPage.classification)}
              ${renderOptionalCode("url", debug.currentPage.url)}
              ${renderOptionalCode("title", debug.currentPage.title)}
            </div>
          </article>
          <article class="section-card">
            <h3>Capture provenance</h3>
            <div class="meta-row">
              ${renderOptionalCode("browser mode", debug.captureProvenance?.browserMode)}
              ${renderOptionalCode("captured", debug.captureProvenance?.capturedAt)}
              ${renderOptionalCode("profile", debug.captureProvenance?.profileName)}
            </div>
            <p>${escapeHtml(debug.persistenceAudit?.summary ?? "No persistence audit summary is currently available.")}</p>
          </article>
        </div>
      </section>

      <section class="section">
        <header class="section-header">
          <h2>Current console and network</h2>
          <p>These are evidence surfaces, not vanity metrics. Empty entries mean Switchyard did not see fresh events during this inspection window, not that the provider is automatically healthy.</p>
        </header>
        <div class="section-grid">
          <article class="section-card">
            <h3>Current console</h3>
            <p>${escapeHtml(currentConsoleDiagnostic)}</p>
            ${renderConsoleEntries(debug.currentConsole)}
          </article>
          <article class="section-card">
            <h3>Current network</h3>
            <p>${escapeHtml(currentNetworkDiagnostic)}</p>
            ${renderNetworkEntries(debug.currentNetwork)}
          </article>
        </div>
      </section>

      <section class="section">
        <header class="section-header">
          <h2>Diagnose ladder</h2>
          <p>Walk this in order. It is the repair ladder for this provider on this machine, not a product KPI wall.</p>
        </header>
        <ol class="ladder">
          ${debug.diagnoseLadder.map((step) => renderDiagnoseStep(step)).join("")}
        </ol>
      </section>

      <section class="section">
        <header class="section-header">
          <h2>JSON truth surfaces</h2>
          <p>Use these routes when you want the raw evidence that backs this page. They stay read-only on purpose.</p>
        </header>
        <div class="json-link-grid">
          <a href="${escapeHtml(debug.routes.status)}" target="_blank" rel="noopener">Status JSON</a>
          <a href="${escapeHtml(debug.routes.probe)}" target="_blank" rel="noopener">Probe JSON</a>
          <a href="${escapeHtml(debug.routes.remediation)}" target="_blank" rel="noopener">Remediation JSON</a>
          <a href="${escapeHtml(debug.routes.debugCurrentPage)}" target="_blank" rel="noopener">Current page JSON</a>
          <a href="${escapeHtml(debug.routes.debugCurrentConsole)}" target="_blank" rel="noopener">Current console JSON</a>
          <a href="${escapeHtml(debug.routes.debugCurrentNetwork)}" target="_blank" rel="noopener">Current network JSON</a>
          <a href="${escapeHtml(debug.routes.debugSupportBundle)}" target="_blank" rel="noopener">Support bundle JSON</a>
        </div>
      </section>
    </main>
  </body>
</html>`;
}
