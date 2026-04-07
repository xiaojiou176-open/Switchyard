import { createDescriptorProvider } from '../../shared/provider-factory.js';

const anthropicByokProvider = createDescriptorProvider({
  provider: 'anthropic',
  displayName: 'Anthropic',
  credential: {
    mode: 'api-key',
    envNames: ['ANTHROPIC_API_KEY'],
    description: 'User supplied Anthropic API key.',
    presence: {
      kind: 'any',
    },
  },
  modelCatalog: {
    mode: 'provider-owned',
  },
  capabilities: {
    streaming: true,
    toolCalling: true,
    imageInput: true,
    fileInput: true,
  },
  transport: {
    family: 'anthropic-messages',
    method: 'POST',
    requestShape: 'messages',
    baseUrl: 'https://api.anthropic.com',
    baseUrlEnvNames: ['ANTHROPIC_BASE_URL'],
    path: '/v1/messages',
    headers: {
      'anthropic-version': '2023-06-01',
    },
    auth: {
      scheme: 'x-api-key',
    },
    sdkBinding: {
      packageName: '@ai-sdk/anthropic',
      exportName: 'anthropic',
      setup: 'default-provider',
      modelInvocation: "anthropic('claude-3-7-sonnet-latest')",
    },
  },
});

export default anthropicByokProvider;
