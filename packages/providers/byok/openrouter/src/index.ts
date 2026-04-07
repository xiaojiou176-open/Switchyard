import { createDescriptorProvider } from '../../shared/provider-factory.js';

const openrouterByokProvider = createDescriptorProvider({
  provider: 'openrouter',
  displayName: 'OpenRouter',
  credential: {
    mode: 'api-key',
    envNames: ['OPENROUTER_API_KEY'],
    description: 'User supplied OpenRouter API key.',
    presence: {
      kind: 'any',
    },
  },
  modelCatalog: {
    mode: 'provider-owned',
  },
  capabilities: {
    toolCalling: true,
    imageInput: true,
    fileInput: true,
  },
  transport: {
    family: 'openai-compatible',
    method: 'POST',
    requestShape: 'chat-completions',
    baseUrl: 'https://openrouter.ai/api/v1',
    baseUrlEnvNames: ['OPENROUTER_BASE_URL'],
    path: '/chat/completions',
    auth: {
      scheme: 'bearer',
    },
    sdkBinding: {
      packageName: '@ai-sdk/openai-compatible',
      exportName: 'createOpenAICompatible',
      setup: 'create-provider',
      modelInvocation:
        "createOpenAICompatible({ name: 'openrouter', baseURL: 'https://openrouter.ai/api/v1', apiKey: process.env.OPENROUTER_API_KEY }).chatModel('openai/gpt-4.1-mini')",
    },
  },
});

export default openrouterByokProvider;
