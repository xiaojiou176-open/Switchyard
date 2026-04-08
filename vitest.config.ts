import { fileURLToPath } from 'node:url';
import { defineConfig, defineProject } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('./', import.meta.url));

const commonProjectConfig = {
  root: repoRoot,
  environment: 'node' as const,
  passWithNoTests: false,
  exclude: ['**/node_modules/**', '**/dist/**', '**/build/**']
};

function createProject(
  name: string,
  include: string[],
  overrides: Record<string, unknown> = {},
) {
  return defineProject({
    test: {
      ...commonProjectConfig,
      name,
      include,
      ...overrides
    }
  });
}

export default defineConfig({
  test: {
    root: repoRoot,
    environment: 'node',
    passWithNoTests: false,
    exclude: commonProjectConfig.exclude,
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'json-summary'],
      reportsDirectory: 'coverage',
      exclude: [
        ...commonProjectConfig.exclude,
        '**/*.d.ts',
        '**/tests/**',
        '**/*.test.ts',
        '**/*.spec.ts'
      ]
    },
    projects: [
      createProject('contracts', [
        'tests/unit/core/capability-descriptor.test.ts',
        'tests/unit/core/lane-provider-invariants.test.ts',
        'tests/unit/core/model-reference.test.ts'
      ]),
      createProject('kernel', [
        'tests/unit/core/lane-dispatch.test.ts',
        'tests/unit/core/provider-registry-branches.test.ts',
        'tests/unit/core/runtime-kernel.test.ts',
        'tests/unit/core/model-resolution.test.ts',
        'tests/unit/core/lane-dispatch.test.ts',
        'tests/unit/core/provider-registry-branches.test.ts'
      ]),
      createProject('credentials', [
        'tests/unit/auth/credentials.test.ts',
        'tests/unit/auth/local-web-auth-store.test.ts'
      ]),
      createProject('diagnostics', ['tests/unit/auth/diagnostics.test.ts']),
      createProject('lane-byok', [
        'tests/unit/byok/provider-registration.test.ts',
        'tests/unit/byok/capability-alignment.test.ts',
        'tests/unit/byok/diagnostics.test.ts',
        'tests/unit/byok/provider-factory.test.ts',
        'tests/unit/byok/byok-dispatch.test.ts'
      ]),
      createProject('lanes-web', ['tests/unit/web/*.test.ts'], {
        // Web DOM transport tests execute mocked polling loops and can breach
        // Vitest's 5s default when the full gate runs under heavier load.
        testTimeout: 45_000
      }),
      createProject('sdk', [
        'tests/unit/byok/model-reference.test.ts',
        'tests/unit/byok/sdk-surface.test.ts',
        'tests/unit/byok/service-client-branches.test.ts'
      ]),
      createProject('surface-sdk-client', [
        'tests/unit/byok/gemini-baseline.test.ts',
        'tests/unit/byok/gemini-live-proof-branches.test.ts',
        'tests/unit/byok/service-client.test.ts',
        'tests/unit/web/switchyard-cli.test.ts'
      ]),
      createProject('surface-mcp', [
        'tests/unit/mcp/*.test.ts'
      ]),
      createProject('builder-starters', [
        'tests/integration/examples/*.test.ts'
      ], {
        fileParallelism: false,
        testTimeout: 150_000
      }),
      createProject('starter-packs', [
        'tests/integration/starter-packs/*.test.ts'
      ], {
        fileParallelism: false,
        testTimeout: 20_000
      }),
      createProject('consumer-compat', [
        'tests/unit/compat/*.test.ts'
      ]),
      createProject('auth-portal-integration', [
        'tests/integration/auth-portal/auth-portal-shell.test.ts'
      ]),
      createProject('surface-http-integration', [
        'tests/integration/service-http/http-surface.integration.test.ts'
      ]),
      createProject('docs-frontdoor', [
        'tests/integration/docs/frontdoor-docs.test.ts',
        'tests/integration/docs/package-ready-distribution.test.ts',
        'tests/integration/docs/sensitive-surface-hygiene.test.ts'
      ]),
      createProject('app-service-e2e', [
        'tests/e2e/web-login/web-login-lane.e2e.test.ts',
        'tests/e2e/web-login/high-stability-trio-runtime.test.ts',
        'tests/e2e/web-login/long-tail-provider-baseline.test.ts'
      ], {
        // These e2e files spin up multiple local HTTP services and immediately
        // self-connect over loopback. On this workstation, parallel file
        // execution can trip `EADDRNOTAVAIL` before the service logic is even
        // exercised, so keep the local-socket-heavy suite serialized.
        fileParallelism: false
      })
      ],
  }
});
