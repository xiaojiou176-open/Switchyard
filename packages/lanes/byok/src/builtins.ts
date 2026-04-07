import anthropicByokProvider from '../../../providers/byok/anthropic/src/index.js';
import bedrockByokProvider from '../../../providers/byok/bedrock/src/index.js';
import geminiByokProvider from '../../../providers/byok/gemini/src/index.js';
import groqByokProvider from '../../../providers/byok/groq/src/index.js';
import openaiByokProvider from '../../../providers/byok/openai/src/index.js';
import openrouterByokProvider from '../../../providers/byok/openrouter/src/index.js';
import qwenByokProvider from '../../../providers/byok/qwen/src/index.js';
import vertexByokProvider from '../../../providers/byok/vertex/src/index.js';
import xaiByokProvider from '../../../providers/byok/xai/src/index.js';
import { ByokProviderRegistry } from './provider-registry.js';

export const defaultByokProviders = [
  openaiByokProvider,
  anthropicByokProvider,
  geminiByokProvider,
  xaiByokProvider,
  openrouterByokProvider,
  groqByokProvider,
  qwenByokProvider,
  vertexByokProvider,
  bedrockByokProvider,
] as const;

export function createDefaultByokRegistry(): ByokProviderRegistry {
  return new ByokProviderRegistry(defaultByokProviders);
}
