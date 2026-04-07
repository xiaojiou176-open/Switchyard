import { createDescriptorProvider } from '../../shared/provider-factory.js';

const bedrockByokProvider = createDescriptorProvider({
  provider: 'bedrock',
  displayName: 'AWS Bedrock',
  credential: {
    mode: 'aws-sigv4',
    envNames: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'],
    description: 'User supplied AWS credentials for Bedrock.',
    presence: {
      kind: 'all',
    },
  },
  modelCatalog: {
    mode: 'provider-owned',
  },
  capabilities: {
    imageInput: true,
    fileInput: true,
  },
  transport: {
    family: 'aws-bedrock',
    method: 'POST',
    requestShape: 'bedrock-converse',
    baseUrl: 'https://bedrock-runtime.{region}.amazonaws.com',
    baseUrlEnvNames: ['AWS_BEDROCK_BASE_URL'],
    path: '/model/{model}/converse',
    auth: {
      scheme: 'aws-sigv4',
    },
  },
});

export default bedrockByokProvider;
