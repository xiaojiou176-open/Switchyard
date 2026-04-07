import { createDescriptorProvider } from '../../shared/provider-factory.js';

const groqByokProvider = createDescriptorProvider({
  provider: 'groq',
  displayName: 'Groq',
  credential: {
    mode: 'api-key',
    envNames: ['GROQ_API_KEY'],
    description: 'User supplied Groq API key.',
    presence: {
      kind: 'any',
    },
  },
  modelCatalog: {
    mode: 'provider-owned',
  },
  capabilities: {
    toolCalling: true,
  },
  transport: {
    family: 'openai-compatible',
    method: 'POST',
    requestShape: 'chat-completions',
    baseUrl: 'https://api.groq.com/openai/v1',
    baseUrlEnvNames: ['GROQ_BASE_URL'],
    path: '/chat/completions',
    auth: {
      scheme: 'bearer',
    },
    sdkBinding: {
      packageName: '@ai-sdk/openai-compatible',
      exportName: 'createOpenAICompatible',
      setup: 'create-provider',
      modelInvocation:
        "createOpenAICompatible({ name: 'groq', baseURL: 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY }).chatModel('llama-3.3-70b-versatile')",
    },
  },
});

export default groqByokProvider;
