import { describe, expect, it } from 'vitest';

import { createCredentialRecord } from '../../../packages/credentials/src/index.js';
import {
  buildAuthRuntimeView,
  classifyAuthDiagnostic,
  summarizeAuthDiagnostics
} from '../../../packages/diagnostics/src/index.js';

describe('auth diagnostics taxonomy', () => {
  it('classifies the five required baseline diagnostic categories', () => {
    const records = [
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'chatgpt',
        authModeId: 'web-login'
      }),
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'claude',
        authModeId: 'web-login',
        accountId: 'claude-browser',
        lifecycleStage: 'expire-degrade',
        status: {
          hasMaterial: true,
          expired: true
        }
      }),
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'gemini',
        authModeId: 'web-login',
        accountId: 'gemini-browser',
        lifecycleStage: 'refresh-renew',
        status: {
          hasMaterial: true,
          degraded: true,
          refreshEligible: true
        }
      }),
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'grok',
        authModeId: 'web-login',
        accountId: 'grok-browser',
        lifecycleStage: 'check',
        status: {
          hasMaterial: true,
          providerAvailable: false
        }
      }),
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'openai',
        authModeId: 'byok',
        accountId: 'openai-key',
        lifecycleStage: 're-auth',
        status: {
          hasMaterial: true,
          userActionRequired: true
        }
      })
    ];

    const categories = records
      .map((record) => classifyAuthDiagnostic(record)?.category)
      .filter((category): category is NonNullable<typeof category> => Boolean(category));

    expect(categories).toEqual([
      'missing-credential',
      'expired-session',
      'refreshable-but-degraded',
      'provider-unavailable',
      'user-action-required'
    ]);
  });

  it('summarizes blocking vs warning auth diagnostics', () => {
    const diagnostics = summarizeAuthDiagnostics([
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'chatgpt',
        authModeId: 'web-login'
      }),
      createCredentialRecord({
        userId: 'terry-local',
        providerId: 'gemini',
        authModeId: 'web-login',
        accountId: 'gemini-browser',
        lifecycleStage: 'check',
        status: {
          hasMaterial: true,
          providerAvailable: false
        }
      })
    ]);

    expect(diagnostics.blockingCount).toBe(1);
    expect(diagnostics.warningCount).toBe(1);
    expect(diagnostics.categories).toEqual(['missing-credential', 'provider-unavailable']);
  });

  it('builds a shared auth runtime view with workflow and contract labels', () => {
    const record = createCredentialRecord({
      userId: 'terry-local',
      providerId: 'chatgpt',
      authModeId: 'web-login',
      accountId: 'chatgpt-browser',
      lifecycleStage: 'expire-degrade',
      status: {
        hasMaterial: true,
        expired: true
      }
    });
    const view = buildAuthRuntimeView(record);
    const diagnostic = classifyAuthDiagnostic(record);

    expect(view.workflowId).toBe('re-auth');
    expect(view.workflowLabel).toBe('Re-auth');
    expect(view.diagnostic?.contractCategoryLabel).toBe('expired session');
    expect(view.actions.map((action) => action.label)).toContain('Re-authenticate');
    expect(view.ownership.userOwned).toBe(true);
    expect(view.handoff.kind).toBe('re-authentication');
    expect(view.handoff.captureRequest?.artifacts[0]?.collectedBy).toBe('local-runtime');
    expect(diagnostic?.handoff.kind).toBe('re-authentication');
    expect(diagnostic?.detail).toContain('Next step: Re-authenticate by End user.');
  });
});
