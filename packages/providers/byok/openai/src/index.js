import { createDescriptorProvider } from '../../shared/provider-factory.js';
const openaiByokProvider = createDescriptorProvider({
    provider: 'openai',
    displayName: 'OpenAI',
    credential: {
        mode: 'api-key',
        envNames: ['OPENAI_API_KEY'],
        description: 'User supplied OpenAI API key.',
        presence: {
            kind: 'any',
        },
    },
    modelCatalog: {
        mode: 'provider-owned',
        recommendedModel: 'gpt-5-mini',
    },
    capabilities: {
        streaming: true,
        toolCalling: true,
        imageInput: true,
        fileInput: true,
    },
    transport: {
        family: 'openai-responses',
        method: 'POST',
        requestShape: 'responses',
        baseUrl: 'https://api.openai.com/v1',
        baseUrlEnvNames: ['OPENAI_BASE_URL'],
        path: '/responses',
        auth: {
            scheme: 'bearer',
        },
        sdkBinding: {
            packageName: '@ai-sdk/openai',
            exportName: 'openai',
            setup: 'default-provider',
            modelInvocation: "openai('gpt-5-mini')",
        },
    },
});
export default openaiByokProvider;
