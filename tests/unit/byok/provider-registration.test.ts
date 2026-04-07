import { describe, expect, test } from 'vitest';
import {
  createDefaultByokRegistry,
  supportedByokProviders,
} from '../../../packages/lanes/byok/src/index.js';

describe('BYOK provider registration', () => {
  test('registers the full Kernel Alpha BYOK catalog', () => {
    const registry = createDefaultByokRegistry();
    const registrations = registry.list();

    expect(registrations).toHaveLength(supportedByokProviders.length);
    expect(registrations.map(provider => provider.provider)).toEqual(
      [...supportedByokProviders],
    );
    expect(
      registrations.every(provider => provider.lane === 'byok'),
    ).toBeTruthy();
    expect(
      registrations.every(provider =>
        provider.implementation === 'executable-baseline' ||
        provider.implementation === 'descriptor-baseline',
      ),
    ).toBeTruthy();
    expect(
      registrations.every(provider => provider.transport.method === 'POST'),
    ).toBeTruthy();
    expect(
      registrations.every(provider => provider.transport.auth.envNames.length > 0),
    ).toBeTruthy();
  });
});
