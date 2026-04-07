import { createDescriptorProvider } from '../../shared/provider-factory.js';

const qwenByokProvider = createDescriptorProvider({
  provider: 'qwen',
  displayName: 'Qwen',
  credential: {
    mode: 'api-key',
    envNames: ['QWEN_API_KEY', 'DASHSCOPE_API_KEY'],
    description: 'User supplied Qwen API key.',
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
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    baseUrlEnvNames: ['QWEN_BASE_URL', 'DASHSCOPE_BASE_URL'],
    path: '/chat/completions',
    auth: {
      scheme: 'bearer',
    },
    sdkBinding: {
      packageName: '@ai-sdk/openai-compatible',
      exportName: 'createOpenAICompatible',
      setup: 'create-provider',
      modelInvocation:
        "createOpenAICompatible({ name: 'qwen', baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', apiKey: process.env.QWEN_API_KEY ?? process.env.DASHSCOPE_API_KEY }).chatModel('qwen-plus')",
    },
  },
});

export default qwenByokProvider;
