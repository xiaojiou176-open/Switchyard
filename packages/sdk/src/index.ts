import {
  formatModelReference,
  parseModelReference,
} from '../../lanes/byok/src/index.js';
import {
  createSwitchyardSdkClient,
  createSwitchyardServiceClient,
  type SwitchyardSdkClientOptions,
  type SwitchyardServiceClientOptions,
} from '../../surfaces/sdk-client/src/index.js';
import {
  createDefaultWebRegistry,
  createSwitchyardWebSdk,
  type SwitchyardWebSdk,
  type SwitchyardWebSdkOptions,
} from './web.js';
import {
  anthropic,
  bedrock,
  gemini,
  getProviderProfile,
  groq,
  listProviderProfiles,
  openai,
  openrouter,
  providers,
  qwen,
  vertex,
  xai,
} from './providers.js';

export interface SwitchyardSdkOptions extends SwitchyardSdkClientOptions {
  service?: SwitchyardServiceClientOptions;
  web?: SwitchyardWebSdkOptions;
}

export function createSwitchyardSdk(options: SwitchyardSdkOptions = {}) {
  const client = createSwitchyardSdkClient(options);
  const service = options.service
    ? createSwitchyardServiceClient(options.service)
    : undefined;
  const web = createSwitchyardWebSdk(options.web);

  return {
    client,
    service,
    web,
    providers,
    registry: client.registry,
    listProviders: client.listProviders.bind(client),
    getProvider: client.getProvider.bind(client),
    listProviderProfiles: client.listProviderProfiles.bind(client),
    getProviderProfile: client.getProviderProfile.bind(client),
    createModel: client.createModel.bind(client),
    getDefaultModel: client.getDefaultModel.bind(client),
    getRecommendedModel: client.getRecommendedModel.bind(client),
    resolveModel: client.resolveModel.bind(client),
    prepareText: client.prepareText.bind(client),
    generateText: client.generateText.bind(client),
    parseModelReference,
    formatModelReference,
  };
}

export {
  createDefaultByokRegistry,
  formatModelReference,
  parseModelReference,
} from '../../lanes/byok/src/index.js';
export * from '../../surfaces/sdk-client/src/index.js';
export * from './web.js';
export {
  anthropic,
  bedrock,
  gemini,
  getProviderProfile,
  groq,
  listProviderProfiles,
  openai,
  openrouter,
  providers,
  qwen,
  vertex,
  xai,
};
export type * from '../../lanes/byok/src/index.js';
export type { SwitchyardProviderProfile } from './providers.js';
export type { SwitchyardWebSdk, SwitchyardWebSdkOptions };
