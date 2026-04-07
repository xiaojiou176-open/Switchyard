import { createDescriptorProvider } from '../../shared/provider-factory.js';
const xaiByokProvider = createDescriptorProvider({
    provider: 'xai',
    displayName: 'xAI',
    credential: {
        mode: 'api-key',
        envNames: ['XAI_API_KEY'],
        description: 'User supplied xAI API key.',
        presence: {
            kind: 'any',
        },
    },
    modelCatalog: {
        mode: 'user-specified',
    },
    capabilities: {
        toolCalling: true,
    },
    transport: {
        family: 'openai-compatible',
        method: 'POST',
        requestShape: 'chat-completions',
        baseUrl: 'https://api.x.ai/v1',
        baseUrlEnvNames: ['XAI_BASE_URL'],
        path: '/chat/completions',
        auth: {
            scheme: 'bearer',
        },
        sdkBinding: {
            packageName: '@ai-sdk/openai-compatible',
            exportName: 'createOpenAICompatible',
            setup: 'create-provider',
            modelInvocation: "createOpenAICompatible({ name: 'xai', baseURL: 'https://api.x.ai/v1', apiKey: process.env.XAI_API_KEY }).chatModel('grok-3-mini')",
        },
    },
});
export default xaiByokProvider;
