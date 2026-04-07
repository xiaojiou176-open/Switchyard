import { describe, expect, it } from 'vitest';

import {
  createCapabilityMatrix,
  listSupportedCapabilities,
  missingCapabilities,
  supportsCapabilities
} from '../../../packages/contracts/src/index';

describe('capability descriptor behavior', () => {
  it('creates a machine-readable capability matrix from terse input', () => {
    const matrix = createCapabilityMatrix({
      'text-generation': true,
      streaming: true,
      'tool-calling': {
        supported: true,
        maturity: 'preview',
        notes: 'Requires tool bridge wiring.'
      }
    });

    expect(matrix['text-generation'].supported).toBe(true);
    expect(matrix['tool-calling'].maturity).toBe('preview');
    expect(listSupportedCapabilities(matrix)).toEqual([
      'text-generation',
      'streaming',
      'tool-calling'
    ]);
  });

  it('explains missing capabilities instead of hiding them', () => {
    const matrix = createCapabilityMatrix({
      'text-generation': true,
      'official-api': true
    });

    expect(supportsCapabilities(matrix, ['text-generation'])).toBe(true);
    expect(supportsCapabilities(matrix, ['image-input'])).toBe(false);
    expect(missingCapabilities(matrix, ['image-input', 'tool-calling'])).toEqual([
      'image-input',
      'tool-calling'
    ]);
  });
});
