import { createCapabilities } from '../../../lanes/byok/src/capabilities.js';
import { missingCredentialDiagnostic } from '../../../lanes/byok/src/diagnostics.js';
import { createModelReference } from '../../../lanes/byok/src/model-reference.js';
function normalizeBaseUrl(value) {
    return value.endsWith('/') ? value.slice(0, -1) : value;
}
function defaultRequestShape(family) {
    switch (family) {
        case 'openai-responses':
            return 'responses';
        case 'anthropic-messages':
            return 'messages';
        case 'google-generative-ai':
        case 'gemini-generative-language':
            return 'generate-content';
        case 'google-vertex':
            return 'vertex-generate-content';
        case 'aws-bedrock':
            return 'bedrock-converse';
        case 'openai-compatible':
        default:
            return 'chat-completions';
    }
}
function defaultAuthScheme(family) {
    switch (family) {
        case 'anthropic-messages':
            return 'x-api-key';
        case 'gemini-generative-language':
        case 'google-generative-ai':
            return 'query-api-key';
        case 'google-vertex':
            return 'google-vertex';
        case 'aws-bedrock':
            return 'aws-sigv4';
        case 'openai-responses':
        case 'openai-compatible':
        default:
            return 'bearer';
    }
}
function defaultPath(family, entrypoint) {
    if (entrypoint?.startsWith('/')) {
        return entrypoint;
    }
    switch (family) {
        case 'openai-responses':
            return '/v1/responses';
        case 'anthropic-messages':
            return '/v1/messages';
        case 'google-vertex':
            return '/publishers/google/models/{model}:generateContent';
        case 'aws-bedrock':
            return '/model/{model}/converse';
        case 'gemini-generative-language':
        case 'google-generative-ai':
            return '/models/{model}:generateContent';
        case 'openai-compatible':
        default:
            return '/v1/chat/completions';
    }
}
function cloneTransportContract(credential, transport) {
    return {
        ...transport,
        method: transport.method ?? 'POST',
        requestShape: transport.requestShape ?? defaultRequestShape(transport.family),
        path: transport.path ?? defaultPath(transport.family, transport.entrypoint),
        baseUrl: transport.baseUrl ? normalizeBaseUrl(transport.baseUrl) : undefined,
        baseUrlEnvNames: transport.baseUrlEnvNames
            ? [...transport.baseUrlEnvNames]
            : undefined,
        headers: transport.headers ? { ...transport.headers } : undefined,
        auth: {
            scheme: transport.auth?.scheme ?? defaultAuthScheme(transport.family),
            envNames: [...(transport.auth?.envNames ?? credential.envNames)],
        },
        sdkBinding: transport.sdkBinding ? { ...transport.sdkBinding } : undefined,
    };
}
export function createDescriptorProvider(options) {
    const capabilities = createCapabilities(options.capabilities);
    const credential = {
        ...options.credential,
        presence: options.credential.presence ?? {
            kind: 'any',
        },
    };
    const modelCatalog = { ...options.modelCatalog };
    const transport = cloneTransportContract(credential, options.transport);
    return {
        provider: options.provider,
        displayName: options.displayName,
        lane: 'byok',
        implementation: 'descriptor-baseline',
        credential,
        capabilities,
        modelCatalog,
        transport,
        createModel(modelId) {
            return createModelReference(options.provider, modelId);
        },
        prepareText(request, context) {
            if (!hasRequiredCredential(context.env, credential)) {
                return {
                    ok: false,
                    diagnostics: [
                        missingCredentialDiagnostic(options.provider, request.model.id, credential),
                    ],
                };
            }
            const resolvedBaseUrl = resolveTransportBaseUrl(context.env, transport.baseUrl, transport.baseUrlEnvNames);
            const descriptor = {
                kind: 'descriptor',
                contract: transport,
                resolvedBaseUrl,
            };
            return {
                ok: true,
                prepared: {
                    provider: options.provider,
                    model: request.model,
                    transport: descriptor,
                    credential,
                    capabilities,
                },
                diagnostics: [],
            };
        },
    };
}
export function createProviderModelFactory(provider) {
    const factory = (modelId) => createModelReference(provider, modelId);
    return Object.assign(factory, { provider });
}
export function resolveNamedValue(env, envNames) {
    for (const envName of envNames) {
        const value = env[envName]?.trim();
        if (value) {
            return {
                value,
                envName,
            };
        }
    }
    return undefined;
}
export function resolveTransportBaseUrl(env, defaultBaseUrl, envNames = []) {
    const resolved = resolveNamedValue(env, envNames);
    if (resolved) {
        return {
            value: normalizeBaseUrl(resolved.value),
            source: 'env',
            envName: resolved.envName,
        };
    }
    if (!defaultBaseUrl) {
        return undefined;
    }
    return {
        value: normalizeBaseUrl(defaultBaseUrl),
        source: 'default',
    };
}
export function hasRequiredCredential(env, credential) {
    switch (credential.presence.kind) {
        case 'all':
            return credential.envNames.every(envName => Boolean(env[envName]?.trim()));
        case 'any-set':
            return credential.presence.envSets.some(envSet => envSet.every(envName => Boolean(env[envName]?.trim())));
        case 'any':
        default:
            return credential.envNames.some(envName => Boolean(env[envName]?.trim()));
    }
}
export function resolveCredentialValue(env, envNames) {
    return resolveNamedValue(env, envNames)?.value;
}
