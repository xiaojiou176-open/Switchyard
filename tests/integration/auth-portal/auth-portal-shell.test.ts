import { describe, expect, it } from 'vitest';

import {
  buildAuthPortalShellModel,
  renderAuthPortalShell
} from '../../../apps/auth-portal/src/index.js';
import {
  createCredentialOwner,
  createCredentialRecord
} from '../../../packages/credentials/src/index.js';

describe('auth portal shell', () => {
  it('surfaces login, status, and re-authentication entry points in a local-first shell', () => {
    const owner = createCredentialOwner('terry-local');

    const model = buildAuthPortalShellModel({
      owner,
      routeCatalog: {
        authPortal: '/v1/runtime/auth-portal',
        providerStatusTemplate: '/v1/runtime/providers/{providerId}/status',
        providerAcquisitionStartTemplate: '/v1/runtime/providers/{providerId}/acquisition/start',
        providerAcquisitionCaptureTemplate: '/v1/runtime/providers/{providerId}/acquisition/capture'
      },
      records: [
        createCredentialRecord({
          userId: owner.userId,
          providerId: 'gemini',
          authModeId: 'byok',
          accountId: 'gemini-key',
          accountLabel: 'Gemini key',
          lifecycleStage: 'check',
          status: {
            hasMaterial: true
          }
        }),
        createCredentialRecord({
          userId: owner.userId,
          providerId: 'chatgpt',
          authModeId: 'web-login',
          accountId: 'chatgpt-browser',
          accountLabel: 'ChatGPT browser session',
          lifecycleStage: 'expire-degrade',
          status: {
            hasMaterial: true,
            expired: true
          }
        })
      ]
    });

    const byokGeminiCard = model.sections[0]?.cards.find((card) => card.providerId === 'gemini');
    const missingClaudeCard = model.sections[1]?.cards.find((card) => card.providerId === 'claude');
    const expiredChatGptCard = model.sections[1]?.cards.find((card) => card.providerId === 'chatgpt');
    const workflowIds = model.workflows.map((workflow) => workflow.id);

    expect(byokGeminiCard?.actions.map((action) => action.label)).toContain('View Status');
    expect(missingClaudeCard?.actions.map((action) => action.label)).toContain('Start Login');
    expect(expiredChatGptCard?.actions.map((action) => action.label)).toContain('Re-authenticate');
    expect(missingClaudeCard?.handoff.kind).toBe('acquisition');
    expect(missingClaudeCard?.handoff.captureRequest?.artifacts[0]?.collectedBy).toBe('local-runtime');
    expect(expiredChatGptCard?.workflowId).toBe('re-auth');
    expect(expiredChatGptCard?.diagnostic?.contractCategoryLabel).toBe('expired session');
    expect(expiredChatGptCard?.handoff.kind).toBe('re-authentication');
    expect(workflowIds).toEqual(['login', 'status', 're-auth']);

    const html = renderAuthPortalShell(model);

    expect(html).toContain('Switchyard Auth Portal');
    expect(html).toContain('Local-first shell');
    expect(html).toContain('No shared credential pool');
    expect(html).toContain('Login');
    expect(html).toContain('Status');
    expect(html).toContain('Re-auth');
    expect(html).toContain('Acquisition Ticket');
    expect(html).toContain('Re-auth Ticket');
    expect(html).toContain('Capture Request');
    expect(html).toContain('Collected by: Local runtime');
    expect(html).toContain('Next step');
    expect(html).toContain('Start Login');
    expect(html).toContain('Managed Browser');
    expect(html).toContain('Attach Browser Session');
    expect(html).toContain('View Status');
    expect(html).toContain('Re-authenticate');
    expect(html).toContain('Contract label: expired session');
    expect(html).toContain('auth-portal-route-catalog');
    expect(html).toContain('/v1/runtime/providers/{providerId}/acquisition/start');
    expect(html).toContain('data-provider-id="claude"');
    expect(html).toContain('data-action-id="start-web-login"');
    expect(html).toContain('data-acquisition-mode="isolated-chrome-root"');
    expect(html).toContain('data-acquisition-mode="managed-browser"');
    expect(html).toContain('data-acquisition-mode="existing-browser-session"');
    expect(html).toContain('auth-portal-feedback');
    expect(html).not.toContain('&quot;authPortal&quot;');
    expect(html).toContain('payload.acquisition ?? {}');
    expect(html).toContain('!browser?.loginOpened');
    expect(html).toContain('data-capture-body');

    const routeCatalogMatch = html.match(
      /<script type="application\/json" id="auth-portal-route-catalog">([\s\S]*?)<\/script>/
    );

    expect(routeCatalogMatch?.[1]).toBeTruthy();
    expect(JSON.parse(routeCatalogMatch?.[1] ?? '')).toEqual(model.routeCatalog);
  });
});
