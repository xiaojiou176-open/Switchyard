export const CAPABILITY_IDS = [
  'text-generation',
  'streaming',
  'tool-calling',
  'image-input',
  'file-input',
  'official-api',
  'web-login'
] as const;

export type CapabilityId = (typeof CAPABILITY_IDS)[number];
export type CapabilityMaturity = 'stable' | 'preview' | 'experimental' | 'unsupported';

export interface CapabilityDescriptor {
  readonly capabilityId: CapabilityId;
  readonly supported: boolean;
  readonly maturity: CapabilityMaturity;
  readonly notes?: string;
}

export type CapabilityMatrix = Readonly<Record<CapabilityId, CapabilityDescriptor>>;
export type CapabilityInput =
  | boolean
  | {
      readonly supported?: boolean;
      readonly maturity?: Exclude<CapabilityMaturity, 'unsupported'>;
      readonly notes?: string;
    };

export type CapabilityMatrixInput = Partial<Record<CapabilityId, CapabilityInput>>;

function createCapabilityDescriptor(
  capabilityId: CapabilityId,
  input: CapabilityInput | undefined
): CapabilityDescriptor {
  if (typeof input === 'boolean') {
    return Object.freeze({
      capabilityId,
      supported: input,
      maturity: input ? 'stable' : 'unsupported'
    });
  }

  const supported = input?.supported ?? false;

  return Object.freeze({
    capabilityId,
    supported,
    maturity: supported ? (input?.maturity ?? 'stable') : 'unsupported',
    notes: input?.notes
  });
}

export function createCapabilityMatrix(input: CapabilityMatrixInput = {}): CapabilityMatrix {
  const matrix = Object.fromEntries(
    CAPABILITY_IDS.map((capabilityId) => [
      capabilityId,
      createCapabilityDescriptor(capabilityId, input[capabilityId])
    ])
  ) as Record<CapabilityId, CapabilityDescriptor>;

  return Object.freeze(matrix);
}

export function listSupportedCapabilities(matrix: CapabilityMatrix): readonly CapabilityId[] {
  return CAPABILITY_IDS.filter((capabilityId) => matrix[capabilityId].supported);
}

export function missingCapabilities(
  matrix: CapabilityMatrix,
  requiredCapabilities: readonly CapabilityId[]
): readonly CapabilityId[] {
  return requiredCapabilities.filter((capabilityId) => !matrix[capabilityId].supported);
}

export function supportsCapabilities(
  matrix: CapabilityMatrix,
  requiredCapabilities: readonly CapabilityId[]
): boolean {
  return missingCapabilities(matrix, requiredCapabilities).length === 0;
}
