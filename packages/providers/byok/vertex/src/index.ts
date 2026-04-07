import { createDescriptorProvider } from '../../shared/provider-factory.js';

const vertexByokProvider = createDescriptorProvider({
  provider: 'vertex',
  displayName: 'Google Vertex AI',
  credential: {
    mode: 'google-vertex',
    envNames: [
      'GOOGLE_VERTEX_API_KEY',
      'GOOGLE_VERTEX_PROJECT',
      'GOOGLE_VERTEX_LOCATION',
      'GOOGLE_APPLICATION_CREDENTIALS',
    ],
    description: 'User supplied Google Vertex project credentials or API key.',
    presence: {
      kind: 'any-set',
      envSets: [
        [
          'GOOGLE_VERTEX_API_KEY',
          'GOOGLE_VERTEX_PROJECT',
          'GOOGLE_VERTEX_LOCATION',
        ],
        [
          'GOOGLE_APPLICATION_CREDENTIALS',
          'GOOGLE_VERTEX_PROJECT',
          'GOOGLE_VERTEX_LOCATION',
        ],
      ],
    },
  },
  modelCatalog: {
    mode: 'inline-default',
    defaultModel: 'gemini-2.5-flash',
    recommendedModel: 'gemini-2.5-flash',
  },
  capabilities: {
    imageInput: true,
    fileInput: true,
  },
  transport: {
    family: 'google-vertex',
    method: 'POST',
    requestShape: 'vertex-generate-content',
    baseUrl: 'https://{location}-aiplatform.googleapis.com/v1',
    baseUrlEnvNames: ['GOOGLE_VERTEX_BASE_URL'],
    path: '/projects/{project}/locations/{region}/publishers/google/models/{model}:generateContent',
    auth: {
      scheme: 'google-vertex',
      envNames: ['GOOGLE_VERTEX_API_KEY', 'GOOGLE_APPLICATION_CREDENTIALS'],
    },
    sdkBinding: {
      packageName: '@ai-sdk/google-vertex',
      exportName: 'vertex',
      setup: 'default-provider',
      modelInvocation: "vertex('gemini-2.5-flash')",
    },
  },
});

export default vertexByokProvider;
