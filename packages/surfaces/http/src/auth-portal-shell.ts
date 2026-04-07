import {
  AUTH_MODE_CATALOG,
  BYOK_PROVIDER_CATALOG,
  WEB_LOGIN_PROVIDER_CATALOG,
  createCredentialOwner,
  createCredentialRecord,
  type AuthModeId,
  type CredentialOwner,
  type CredentialRecord,
  type ProviderSupportDescriptor
} from '../../../credentials/src/index.js';
import {
  buildAuthRuntimeView,
  summarizeAuthRuntimeViews,
  type AuthRuntimeView,
  type AuthWorkflowSummary
} from '../../../diagnostics/src/index.js';

export interface AuthPortalShellOptions {
  owner?: CredentialOwner;
  userId?: string;
  records?: readonly CredentialRecord[];
  generatedAt?: string;
  title?: string;
  sections?: AuthPortalSection[];
  routeCatalog?: AuthPortalRouteCatalog;
}

export interface AuthPortalAcquisitionModeView {
  id:
    | "managed-browser"
    | "isolated-chrome-root"
    | "existing-chrome-profile"
    | "existing-browser-session";
  label: string;
  description: string;
  advanced: boolean;
  default: boolean;
}

export type AuthPortalCard = AuthRuntimeView & {
  availableModes?: readonly AuthPortalAcquisitionModeView[];
  mode?: string;
  modeLabel?: string;
  browserTarget?: {
    kind: string;
    label: string;
    summary: string;
  };
  captureRequest?: Record<string, unknown>;
};
export type AuthPortalActionView = AuthPortalCard['actions'][number];

export interface AuthPortalSection {
  id: AuthModeId;
  title: string;
  description: string;
  cards: AuthPortalCard[];
}

export interface AuthPortalShellModel {
  title: string;
  mode: 'local-first';
  generatedAt: string;
  trustBoundary: string;
  supportedPolicies: string[];
  workflows: AuthWorkflowSummary[];
  sections: AuthPortalSection[];
  routeCatalog?: AuthPortalRouteCatalog;
}

export interface AuthPortalRouteCatalog {
  authPortal: string;
  providerStatusTemplate: string;
  providerAcquisitionStartTemplate: string;
  providerAcquisitionCaptureTemplate: string;
}

const DEFAULT_WEB_ACQUISITION_MODES: readonly AuthPortalAcquisitionModeView[] = [
  {
    id: "isolated-chrome-root",
    label: "Use Isolated Chrome Root",
    description:
      "Reuse Switchyard's dedicated Chrome root and single repo-owned profile for login and capture.",
    advanced: true,
    default: true,
  },
  {
    id: "managed-browser",
    label: "Managed Browser",
    description:
      "Let Switchyard launch or reattach its dedicated fallback onboarding browser for login and capture.",
    advanced: false,
    default: false,
  },
  {
    id: "existing-browser-session",
    label: "Attach Existing Browser Session",
    description:
      "Attach to a browser session that is already exposing a reusable browser-session URL.",
    advanced: true,
    default: false,
  },
] as const;

function getOwner(options: AuthPortalShellOptions): CredentialOwner {
  if (options.owner) {
    return options.owner;
  }

  return createCredentialOwner(options.userId ?? 'local-user');
}

function getRecordKey(record: Pick<CredentialRecord, 'provider'>): string {
  return `${record.provider.authModeId}:${record.provider.providerId}`;
}

function getDescriptorKey(descriptor: ProviderSupportDescriptor): string {
  return `${descriptor.authModeId}:${descriptor.providerId}`;
}

function buildFallbackRecord(
  descriptor: ProviderSupportDescriptor,
  owner: CredentialOwner
): CredentialRecord {
  return createCredentialRecord({
    userId: owner.userId,
    providerId: descriptor.providerId,
    authModeId: descriptor.authModeId,
    origin: owner.origin
  });
}

function buildCard(
  descriptor: ProviderSupportDescriptor,
  owner: CredentialOwner,
  recordsByKey: ReadonlyMap<string, CredentialRecord>
): AuthPortalCard {
  const record = recordsByKey.get(getDescriptorKey(descriptor)) ?? buildFallbackRecord(descriptor, owner);
  return buildAuthRuntimeView(record);
}

function buildSection(
  id: AuthModeId,
  owner: CredentialOwner,
  recordsByKey: ReadonlyMap<string, CredentialRecord>
): AuthPortalSection {
  const descriptors = id === 'byok' ? BYOK_PROVIDER_CATALOG : WEB_LOGIN_PROVIDER_CATALOG;

  return {
    id,
    title: AUTH_MODE_CATALOG[id].label,
    description: AUTH_MODE_CATALOG[id].description,
    cards: descriptors.map((descriptor) => buildCard(descriptor, owner, recordsByKey))
  };
}

function buildSections(options: AuthPortalShellOptions, owner: CredentialOwner) {
  if (options.sections) {
    return options.sections;
  }

  const recordsByKey = new Map(
    (options.records ?? []).map((record) => [getRecordKey(record), record] as const)
  );

  return [
    buildSection('byok', owner, recordsByKey),
    buildSection('web-login', owner, recordsByKey)
  ];
}

export function buildAuthPortalShellModel(
  options: AuthPortalShellOptions = {}
): AuthPortalShellModel {
  const owner = getOwner(options);
  const sections = buildSections(options, owner);
  const workflows = summarizeAuthRuntimeViews(sections.flatMap((section) => section.cards)).workflowSummary;

  return {
    title: options.title ?? 'Switchyard Auth Portal',
    mode: 'local-first',
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    trustBoundary:
      'Local-first shell. Credentials remain end-user owned. No shared credential pool, no automatic account rotation, no implicit failover.',
    supportedPolicies: ['BYOK', 'Web/Login', 'single-provider-single-account', 'user-owned credentials'],
    workflows,
    sections,
    routeCatalog: options.routeCatalog
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderAction(card: AuthPortalCard, action: AuthPortalCard['actions'][number]): string {
  const baseButton = `<button class="action action-${action.emphasis}" data-action-key="${escapeHtml(
    action.actionKey
  )}" data-action-id="${escapeHtml(action.id)}" data-provider-id="${escapeHtml(
    card.providerId
  )}" data-auth-mode-id="${escapeHtml(card.authModeId)}" data-workflow-id="${escapeHtml(
    card.workflowId
  )}" data-acquisition-mode="${escapeHtml(
    card.authModeId === "web-login" &&
      (action.id === "start-web-login" || action.id === "reauthenticate")
      ? "isolated-chrome-root"
      : ""
  )}" type="button">${escapeHtml(action.label)}</button>`;

  if (
    card.authModeId !== "web-login" ||
    (action.id !== "start-web-login" && action.id !== "reauthenticate")
  ) {
    return baseButton;
  }

  const advancedButtons = [
    {
      label: "Managed Browser",
      mode: "managed-browser",
    },
    {
      label: "Attach Browser Session",
      mode: "existing-browser-session",
    },
  ]
    .map(
      (advancedAction) =>
        `<button class="action action-secondary" data-action-key="${escapeHtml(
          `${action.actionKey}:${advancedAction.mode}`
        )}" data-action-id="${escapeHtml(action.id)}" data-provider-id="${escapeHtml(
          card.providerId
        )}" data-auth-mode-id="${escapeHtml(card.authModeId)}" data-workflow-id="${escapeHtml(
          card.workflowId
        )}" data-acquisition-mode="${escapeHtml(advancedAction.mode)}" type="button">${escapeHtml(
          advancedAction.label
        )}</button>`,
    )
    .join("");

  return `${baseButton}${advancedButtons}`;
}

function renderAcquisitionModes(card: AuthPortalCard): string {
  if (card.authModeId !== "web-login") {
    return "";
  }

  const modes = card.availableModes ?? DEFAULT_WEB_ACQUISITION_MODES;

  return `<div class="acquisition-modes">
    <p class="handoff-caption"><strong>Login Paths</strong></p>
    <ul class="handoff-artifact-list">
      ${modes
        .map(
          (mode) =>
            `<li>
              <strong>${escapeHtml(mode.label)}</strong>
              <span>${escapeHtml(mode.description)}</span>
              <span>${mode.default ? "Default path" : "Advanced path"}</span>
            </li>`,
        )
        .join("")}
    </ul>
  </div>`;
}

function renderWorkflowSummary(workflow: AuthWorkflowSummary): string {
  return `<article class="workflow-card">
    <header class="workflow-header">
      <div>
        <h2>${escapeHtml(workflow.label)}</h2>
        <p>${escapeHtml(workflow.description)}</p>
      </div>
      <span class="workflow-count">${workflow.count}</span>
    </header>
    <ul class="workflow-provider-list">
      ${workflow.providers
        .map(
          (provider) =>
            `<li><strong>${escapeHtml(provider.providerDisplayName)}</strong><span>${escapeHtml(
              provider.stateLabel
            )}</span></li>`
        )
        .join('')}
    </ul>
  </article>`;
}

function renderCaptureRequest(card: AuthPortalCard): string {
  if (!card.handoff.captureRequest) {
    return '';
  }

  return `<div class="handoff-capture">
    <p class="handoff-caption"><strong>Capture Request</strong>: ${escapeHtml(
      card.handoff.captureRequest.summary
    )}</p>
    <p class="handoff-copy">${escapeHtml(card.handoff.captureRequest.description)}</p>
    <ul class="handoff-artifact-list">
      ${card.handoff.captureRequest.artifacts
        .map(
          (artifact) =>
            `<li>
              <strong>${escapeHtml(artifact.label)}</strong>
              <span>${escapeHtml(artifact.description)}</span>
              <span>Source: ${escapeHtml(artifact.sourceLabel)}</span>
              <span>Collected by: ${escapeHtml(artifact.collectedByLabel)}</span>
              <span>Handoff: ${escapeHtml(artifact.handoffChannelLabel)}</span>
            </li>`
        )
        .join('')}
    </ul>
  </div>`;
}

function renderHandoff(card: AuthPortalCard): string {
  return `<section class="handoff">
    <header class="handoff-header">
      <div>
        <h4>${escapeHtml(card.handoff.kindLabel)}</h4>
        <p>${escapeHtml(card.handoff.summary)}</p>
      </div>
      <span class="handoff-status">${escapeHtml(card.handoff.statusLabel)}</span>
    </header>
    ${renderCaptureRequest(card)}
    <p class="handoff-step">
      <strong>Next step</strong>: ${escapeHtml(card.handoff.nextStep.label)} by ${escapeHtml(
        card.handoff.nextStep.actorLabel
      )}.
    </p>
    <p class="handoff-copy">${escapeHtml(card.handoff.nextStep.description)}</p>
    ${
      card.handoff.fallbackStep
        ? `<p class="handoff-fallback"><strong>Fallback</strong>: ${escapeHtml(
            card.handoff.fallbackStep.label
          )} by ${escapeHtml(card.handoff.fallbackStep.actorLabel)}.</p>`
        : ''
    }
  </section>`;
}

function renderCard(card: AuthPortalCard): string {
  const diagnosticHtml = card.diagnostic
    ? `<div class="diagnostic diagnostic-${card.diagnostic.severity}">
        <strong>${escapeHtml(card.diagnostic.summary)}</strong>
        <p>${escapeHtml(card.diagnostic.detail)}</p>
        <p class="diagnostic-contract">Contract label: ${escapeHtml(
          card.diagnostic.contractCategoryLabel
        )}</p>
      </div>`
    : '<div class="diagnostic diagnostic-ok"><strong>No active diagnostic</strong><p>The current local state is healthy enough for the auth shell.</p></div>';

  return `<article class="card">
    <header class="card-header">
      <div>
        <h3>${escapeHtml(card.providerDisplayName)}</h3>
        <p>${escapeHtml(card.authModeLabel)}</p>
      </div>
      <span class="state state-${escapeHtml(card.state)}">${escapeHtml(card.stateLabel)}</span>
    </header>
    <p class="workflow"><strong>${escapeHtml(card.workflowLabel)}</strong>: ${escapeHtml(
      card.workflowDescription
    )}</p>
    <p class="status">${escapeHtml(card.statusSummary)}</p>
    ${
      card.modeLabel
        ? `<p class="ownership"><strong>Current login path</strong>: ${escapeHtml(card.modeLabel)}</p>`
        : ""
    }
    <p class="ownership">${escapeHtml(card.ownership.summary)}</p>
    ${diagnosticHtml}
    ${renderHandoff(card)}
    ${renderAcquisitionModes(card)}
    <div class="actions">${card.actions.map((action) => renderAction(card, action)).join('')}</div>
  </article>`;
}

function renderSection(section: AuthPortalSection): string {
  return `<section class="section">
    <header class="section-header">
      <h2>${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.description)}</p>
    </header>
    <div class="card-grid">${section.cards.map((card) => renderCard(card)).join('')}</div>
  </section>`;
}

function renderRouteCatalog(routeCatalog?: AuthPortalRouteCatalog): string {
  if (!routeCatalog) {
    return "";
  }

  const serialized = JSON.stringify(routeCatalog)
    .replaceAll("<", "\\u003c")
    .replaceAll("</script", "<\\/script");

  return `<script type="application/json" id="auth-portal-route-catalog">${serialized}</script>`;
}

function renderPortalScript(routeCatalog?: AuthPortalRouteCatalog): string {
  if (!routeCatalog) {
    return "";
  }

  return `<script type="module">
const routeCatalogEl = document.getElementById('auth-portal-route-catalog');
const routeCatalog = routeCatalogEl ? JSON.parse(routeCatalogEl.textContent ?? '{}') : {};
const feedback = document.getElementById('auth-portal-feedback');

function replaceProvider(template, providerId) {
  return template.replace('{providerId}', providerId);
}

function setFeedback(title, summary, raw, actionHtml = '') {
  if (!feedback) return;
  feedback.hidden = false;
  feedback.innerHTML = \`
    <h2>\${title}</h2>
    <p>\${summary}</p>
    \${raw ? \`<pre>\${raw}</pre>\` : ''}
    \${actionHtml}\`;
}

async function callJson(url, body = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  return { response, payload };
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action-id]');

  if (!button) {
    return;
  }

  const providerId = button.dataset.providerId;
  const authModeId = button.dataset.authModeId;
  const actionId = button.dataset.actionId;

  if (!providerId || !actionId) {
    return;
  }

  if (actionId === 'view-status') {
    window.open(replaceProvider(routeCatalog.providerStatusTemplate, providerId), '_blank', 'noopener');
    return;
  }

  if (authModeId !== 'web-login') {
    setFeedback('BYOK action', 'BYOK 仍然保持本地 key 管理路径，不通过网页登录 acquisition。');
    return;
  }

  try {
    if (actionId === 'start-web-login' || actionId === 'reauthenticate') {
      const acquisitionMode = button.dataset.acquisitionMode ?? 'isolated-chrome-root';
      const { payload } = await callJson(
        replaceProvider(routeCatalog.providerAcquisitionStartTemplate, providerId),
        {
          mode: acquisitionMode,
        }
      );
      const acquisition = payload.acquisition ?? {};
      const browser = acquisition.browser;
      const captureRequest = acquisition.captureRequest ?? { mode: acquisitionMode };
      const captureUrl =
        acquisition.status === 'ready-for-user-login' ? acquisition.captureUrl : undefined;
      const captureBody = encodeURIComponent(JSON.stringify(captureRequest));
      const captureButton = captureUrl
        ? \`<button class="action action-primary" data-capture-url="\${captureUrl}" data-capture-body="\${captureBody}" type="button">Capture Session</button>\`
        : '';
      if (acquisition.loginUrl && !browser?.loginOpened) {
        window.open(acquisition.loginUrl, '_blank', 'noopener');
      }
      const details = [
        acquisition.modeLabel ? \`Mode: \${acquisition.modeLabel}\` : '',
        acquisition.browserTarget?.summary,
        browser?.summary,
        acquisition.instructions,
      ].filter(Boolean).join('\\n\\n');
      setFeedback(
        acquisition.status === 'ready-for-user-login' ? 'Acquisition started' : 'Acquisition blocked',
        acquisition.summary ?? 'Browser login flow started.',
        details,
        captureButton
      );
      return;
    }

    if (actionId === 'retry-refresh') {
      const { payload } = await callJson(
        replaceProvider(routeCatalog.providerAcquisitionCaptureTemplate, providerId)
      );
      setFeedback(
        'Acquisition capture',
        payload.acquisition?.summary ?? 'Acquisition capture finished.',
        payload.acquisition?.storePath ?? ''
      );
      if (payload.acquisition?.status === 'success') {
        window.setTimeout(() => window.location.reload(), 500);
      }
      return;
    }
  } catch (error) {
    setFeedback('Action failed', error instanceof Error ? error.message : 'Unknown auth portal failure.');
  }
});

document.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-capture-url]');

  if (!button) {
    return;
  }

  try {
    const captureBody = button.dataset.captureBody
      ? JSON.parse(decodeURIComponent(button.dataset.captureBody))
      : {};
    const { payload } = await callJson(button.dataset.captureUrl, captureBody);
    setFeedback(
      'Acquisition capture',
      payload.acquisition?.summary ?? 'Acquisition capture finished.',
      payload.acquisition?.storePath ?? ''
    );
    if (payload.acquisition?.status === 'success') {
      window.setTimeout(() => window.location.reload(), 500);
    }
  } catch (error) {
    setFeedback('Capture failed', error instanceof Error ? error.message : 'Unknown capture failure.');
  }
});
</script>`;
}

export function renderAuthPortalShell(model: AuthPortalShellModel): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(model.title)}</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f6f3ec;
        --panel: rgba(255, 255, 255, 0.88);
        --ink: #1f1b18;
        --muted: #6f665f;
        --line: rgba(31, 27, 24, 0.12);
        --accent: #136f63;
        --warning: #b45309;
        --danger: #b42318;
        --ok: #1d6f42;
        --shadow: 0 18px 50px rgba(31, 27, 24, 0.1);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background:
          radial-gradient(circle at top left, rgba(19, 111, 99, 0.14), transparent 24rem),
          radial-gradient(circle at bottom right, rgba(180, 83, 9, 0.15), transparent 22rem),
          var(--bg);
        color: var(--ink);
        font-family: "Avenir Next", "Segoe UI", sans-serif;
      }

      main {
        width: min(1120px, calc(100vw - 2rem));
        margin: 0 auto;
        padding: 2rem 0 3rem;
      }

      .hero,
      .section,
      .policy-list,
      .workflow-grid {
        background: var(--panel);
        backdrop-filter: blur(10px);
        border: 1px solid var(--line);
        border-radius: 24px;
        box-shadow: var(--shadow);
      }

      .hero {
        padding: 2rem;
        margin-bottom: 1.5rem;
      }

      .eyebrow {
        margin: 0 0 0.5rem;
        color: var(--accent);
        font-size: 0.9rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h1,
      h2,
      h3,
      p {
        margin-top: 0;
      }

      .hero p:last-child,
      .section-header p:last-child,
      .diagnostic p:last-child,
      .card p:last-child {
        margin-bottom: 0;
      }

      .policy-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: 1rem;
        margin-bottom: 1.5rem;
      }

      .workflow-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1.5rem;
      }

      .workflow-card {
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.72);
      }

      .workflow-header {
        display: flex;
        gap: 0.75rem;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 0.75rem;
      }

      .workflow-count {
        display: inline-flex;
        min-width: 2rem;
        min-height: 2rem;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: rgba(19, 111, 99, 0.12);
        color: var(--accent);
        font-weight: 600;
      }

      .workflow-provider-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 0.6rem;
      }

      .workflow-provider-list li {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        color: var(--muted);
      }

      .policy-pill {
        padding: 0.5rem 0.85rem;
        border-radius: 999px;
        background: rgba(19, 111, 99, 0.1);
        color: var(--accent);
        font-size: 0.92rem;
      }

      .section {
        padding: 1.5rem;
        margin-bottom: 1.25rem;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
      }

      .card {
        border: 1px solid var(--line);
        border-radius: 20px;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.78);
      }

      .card-header {
        display: flex;
        gap: 1rem;
        align-items: start;
        justify-content: space-between;
        margin-bottom: 0.85rem;
      }

      .state {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 0.35rem 0.7rem;
        font-size: 0.84rem;
        background: rgba(31, 27, 24, 0.08);
      }

      .state-ready {
        background: rgba(29, 111, 66, 0.12);
        color: var(--ok);
      }

      .state-expiring,
      .state-refreshable-but-degraded,
      .state-provider-unavailable {
        background: rgba(180, 83, 9, 0.12);
        color: var(--warning);
      }

      .state-expired,
      .state-missing,
      .state-user-action-required {
        background: rgba(180, 35, 24, 0.12);
        color: var(--danger);
      }

      .status,
      .ownership,
      .workflow,
      .diagnostic-contract,
      .handoff-copy,
      .handoff-step,
      .handoff-fallback,
      .handoff-artifact-list,
      .handoff-header p {
        color: var(--muted);
        font-size: 0.95rem;
      }

      .diagnostic {
        border-radius: 16px;
        padding: 0.75rem;
        margin: 0.85rem 0;
      }

      .handoff {
        border-radius: 16px;
        padding: 0.85rem;
        margin: 0.85rem 0;
        background: rgba(19, 111, 99, 0.08);
        border: 1px solid rgba(19, 111, 99, 0.18);
      }

      .handoff-header {
        display: flex;
        gap: 0.75rem;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 0.7rem;
      }

      .handoff-header h4,
      .handoff-caption {
        margin-bottom: 0.25rem;
      }

      .handoff-status {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 0.3rem 0.65rem;
        background: rgba(19, 111, 99, 0.14);
        color: var(--accent);
        font-size: 0.82rem;
        white-space: nowrap;
      }

      .handoff-artifact-list {
        list-style: none;
        padding: 0;
        margin: 0.75rem 0;
        display: grid;
        gap: 0.55rem;
      }

      .handoff-artifact-list li {
        display: grid;
        gap: 0.15rem;
        padding: 0.65rem 0.75rem;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.78);
      }

      .diagnostic-warning {
        background: rgba(180, 83, 9, 0.1);
      }

      .diagnostic-error {
        background: rgba(180, 35, 24, 0.1);
      }

      .diagnostic-ok {
        background: rgba(29, 111, 66, 0.08);
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .action {
        border: none;
        border-radius: 999px;
        padding: 0.65rem 1rem;
        font: inherit;
        cursor: pointer;
      }

      .action-primary {
        background: var(--accent);
        color: white;
      }

      .action-secondary {
        background: rgba(31, 27, 24, 0.08);
        color: var(--ink);
      }

      .action-warning {
        background: rgba(180, 83, 9, 0.16);
        color: #7a2f0b;
      }

      .feedback {
        padding: 1rem;
        margin-bottom: 1.5rem;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.82);
        box-shadow: var(--shadow);
      }

      .feedback pre {
        white-space: pre-wrap;
        word-break: break-word;
        color: var(--muted);
        background: rgba(31, 27, 24, 0.05);
        border-radius: 14px;
        padding: 0.8rem;
      }

      @media (max-width: 720px) {
        main {
          width: min(100vw - 1rem, 1120px);
          padding: 1rem 0 2rem;
        }

        .hero,
        .section,
        .workflow-grid {
          padding: 1.1rem;
          border-radius: 18px;
        }

        .card-header {
          flex-direction: column;
        }

        .workflow-header,
        .workflow-provider-list li,
        .handoff-header {
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <p class="eyebrow">${escapeHtml(model.mode)}</p>
        <h1>${escapeHtml(model.title)}</h1>
        <p>${escapeHtml(model.trustBoundary)}</p>
        <p>Generated at ${escapeHtml(model.generatedAt)}</p>
      </section>
      <section class="policy-list" aria-label="Supported policies">
        ${model.supportedPolicies
          .map((policy) => `<span class="policy-pill">${escapeHtml(policy)}</span>`)
          .join('')}
      </section>
      <section class="workflow-grid" aria-label="Auth workflows">
        ${model.workflows.map((workflow) => renderWorkflowSummary(workflow)).join('')}
      </section>
      <section id="auth-portal-feedback" class="feedback" hidden></section>
      ${model.sections.map((section) => renderSection(section)).join('')}
    </main>
    ${renderRouteCatalog(model.routeCatalog)}
    ${renderPortalScript(model.routeCatalog)}
  </body>
</html>`;
}

export function renderDefaultAuthPortalShell(userId = 'local-user'): string {
  return renderAuthPortalShell(
    buildAuthPortalShellModel({
      owner: createCredentialOwner(userId)
    })
  );
}
