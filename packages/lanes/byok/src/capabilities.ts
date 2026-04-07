import type { CapabilityMatrix } from './contracts.js';

export function createCapabilities(
  overrides: Partial<CapabilityMatrix> = {},
): CapabilityMatrix {
  return {
    textGeneration: true,
    streaming: false,
    toolCalling: false,
    imageInput: false,
    fileInput: false,
    webLogin: false,
    officialApi: true,
    ...overrides,
  };
}
