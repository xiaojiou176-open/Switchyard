import "./load-local-env.mjs";

import { existsSync, readFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));

export const repoRoot = resolve(scriptDir, "..");
export const runtimeCacheRoot = join(repoRoot, ".runtime-cache");
export const managedBrowserProfileDir = join(
  runtimeCacheRoot,
  "switchyard-web-auth-browser",
);
export const browserDebugDir = join(runtimeCacheRoot, "browser-debug");
export const browserDebugBundlesDir = join(browserDebugDir, "bundles");
export const browserSupportDir = join(runtimeCacheRoot, "browser-support");
export const runtimeTempDir = join(runtimeCacheRoot, "temp");
export const localWebAuthStorePath = join(
  runtimeCacheRoot,
  "local-web-auth-store.json",
);
export const realityGateOutputPath = join(runtimeCacheRoot, "reality-gate.out");
export const realityGateExitPath = join(runtimeCacheRoot, "reality-gate.exit");

export const SWITCHYARD_BROWSER_MODE_ENV_NAME = "SWITCHYARD_BROWSER_MODE";
export const SWITCHYARD_CHROME_USER_DATA_DIR_ENV_NAME =
  "SWITCHYARD_CHROME_USER_DATA_DIR";
export const SWITCHYARD_CHROME_PROFILE_NAME_ENV_NAME =
  "SWITCHYARD_CHROME_PROFILE_NAME";
export const SWITCHYARD_EXTERNAL_CACHE_ROOT_ENV_NAME =
  "SWITCHYARD_EXTERNAL_CACHE_ROOT";
export const SWITCHYARD_CACHE_TTL_DAYS_ENV_NAME =
  "SWITCHYARD_CACHE_TTL_DAYS";
export const SWITCHYARD_CACHE_MAX_BYTES_ENV_NAME =
  "SWITCHYARD_CACHE_MAX_BYTES";
export const SWITCHYARD_WEB_AUTH_USER_DATA_DIR_ENV_NAME =
  "SWITCHYARD_WEB_AUTH_USER_DATA_DIR";
export const SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_DIR_ENV_NAME =
  "SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_DIR";
export const SWITCHYARD_LOCAL_WEB_AUTH_STORE_PATH_ENV_NAME =
  "SWITCHYARD_LOCAL_WEB_AUTH_STORE_PATH";
export const SWITCHYARD_REALITY_GATE_ARTIFACT_DIR_ENV_NAME =
  "SWITCHYARD_REALITY_GATE_ARTIFACT_DIR";
export const SWITCHYARD_REALITY_GATE_OUTPUT_PATH_ENV_NAME =
  "SWITCHYARD_REALITY_GATE_OUTPUT_PATH";
export const SWITCHYARD_REALITY_GATE_EXIT_PATH_ENV_NAME =
  "SWITCHYARD_REALITY_GATE_EXIT_PATH";

export const SWITCHYARD_ISOLATED_BROWSER_ROOT_MODE = "isolated-chrome-root";
export const LEGACY_EXISTING_PROFILE_MODE = "existing-chrome-profile";
export const MANAGED_BROWSER_MODE = "managed-browser";
export const EXISTING_BROWSER_SESSION_MODE = "existing-browser-session";
export const DISABLED_FOR_LIVE_MODE = "disabled-for-live";

export const DEFAULT_BROWSER_MODE = SWITCHYARD_ISOLATED_BROWSER_ROOT_MODE;
export const DEFAULT_EXTERNAL_CACHE_ROOT = join(
  homedir(),
  ".cache",
  "switchyard",
);
export const DEFAULT_CACHE_TTL_DAYS = 7;
export const DEFAULT_CACHE_MAX_BYTES = 5 * 1024 * 1024 * 1024;
export const DEFAULT_ISOLATED_CHROME_USER_DATA_DIR = join(
  DEFAULT_EXTERNAL_CACHE_ROOT,
  "browser",
  "chrome-user-data",
);
export const DEFAULT_ISOLATED_CHROME_PROFILE_DIRECTORY = "Profile 1";
export const DEFAULT_ISOLATED_CHROME_PROFILE_NAME = "switchyard";
export const DEFAULT_SOURCE_CHROME_USER_DATA_DIR = join(
  homedir(),
  "Library",
  "Application Support",
  "Google",
  "Chrome",
);
export const DEFAULT_SOURCE_CHROME_PROFILE_NAME = "switchyard";
export const DEFAULT_SOURCE_CHROME_PROFILE_DIRECTORY = "Profile 30";

function parsePositiveInteger(value, fallback) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function resolveHomePath(targetPath) {
  if (!targetPath) {
    return targetPath;
  }

  if (targetPath === "~") {
    return homedir();
  }

  if (targetPath.startsWith("~/")) {
    return join(homedir(), targetPath.slice(2));
  }

  return targetPath;
}

function normalizeRoot(value) {
  return resolve(resolveHomePath(value));
}

function uniqueSorted(values) {
  return [...new Set(values.map((value) => normalizeRoot(value)))].sort();
}

function resolveKnownBrowserFilesystemRoots(
  env = process.env,
  customRepoRoot = repoRoot,
) {
  const repoRuntimeCacheRoot = join(customRepoRoot, ".runtime-cache");
  const externalCacheRoot = resolveExternalCacheRoot(env, customRepoRoot);

  return uniqueSorted([
    DEFAULT_SOURCE_CHROME_USER_DATA_DIR,
    repoRuntimeCacheRoot,
    externalCacheRoot,
    tmpdir(),
  ]);
}

export function isPathInsideRoot(root, targetPath) {
  const normalizedRoot = normalizeRoot(root);
  const normalizedTarget = normalizeRoot(targetPath);

  if (normalizedRoot === normalizedTarget) {
    return true;
  }

  return normalizedTarget.startsWith(`${normalizedRoot}${sep}`);
}

export function assertPathInsideRoot(targetPath, root, label) {
  if (!isPathInsideRoot(root, targetPath)) {
    throw new Error(
      `${label} must stay inside ${root}. Refusing external path: ${targetPath}`,
    );
  }

  return normalizeRoot(targetPath);
}

export function assertPathInsideAllowedRoots(targetPath, roots, label) {
  for (const root of roots) {
    if (isPathInsideRoot(root, targetPath)) {
      return normalizeRoot(targetPath);
    }
  }

  throw new Error(
    `${label} must stay inside one of: ${roots.join(", ")}. Refusing path: ${targetPath}`,
  );
}

export function assertSafePathSegment(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty path segment.`);
  }

  const normalized = value.trim();

  if (
    normalized === "." ||
    normalized === ".." ||
    normalized.includes("/") ||
    normalized.includes("\\")
  ) {
    throw new Error(`${label} must be a single path segment. Refusing: ${value}`);
  }

  return normalized;
}

export function resolveExternalCacheRoot(
  env = process.env,
  customRepoRoot = repoRoot,
) {
  const configured =
    env[SWITCHYARD_EXTERNAL_CACHE_ROOT_ENV_NAME]?.trim() ||
    DEFAULT_EXTERNAL_CACHE_ROOT;
  const resolved = normalizeRoot(configured);

  if (isPathInsideRoot(customRepoRoot, resolved)) {
    throw new Error(
      `Switchyard external cache root must live outside the repo worktree. Refusing ${resolved}.`,
    );
  }

  return resolved;
}

export function resolveCacheTtlDays(env = process.env) {
  return parsePositiveInteger(
    env[SWITCHYARD_CACHE_TTL_DAYS_ENV_NAME],
    DEFAULT_CACHE_TTL_DAYS,
  );
}

export function resolveCacheMaxBytes(env = process.env) {
  return parsePositiveInteger(
    env[SWITCHYARD_CACHE_MAX_BYTES_ENV_NAME],
    DEFAULT_CACHE_MAX_BYTES,
  );
}

export function isCiEnvironment(env = process.env) {
  return (
    env.CI === "true" ||
    env.GITHUB_ACTIONS === "true" ||
    env.BUILDKITE === "true" ||
    env.BUILD_ID !== undefined
  );
}

export function normalizeBrowserMode(value) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  switch (normalized) {
    case MANAGED_BROWSER_MODE:
    case SWITCHYARD_ISOLATED_BROWSER_ROOT_MODE:
    case EXISTING_BROWSER_SESSION_MODE:
    case DISABLED_FOR_LIVE_MODE:
      return normalized;
    case LEGACY_EXISTING_PROFILE_MODE:
      return SWITCHYARD_ISOLATED_BROWSER_ROOT_MODE;
    default:
      return undefined;
  }
}

function readChromeLocalState(userDataDir) {
  const safeUserDataDir = assertPathInsideAllowedRoots(
    userDataDir,
    resolveKnownBrowserFilesystemRoots(process.env, repoRoot),
    "Switchyard Chrome user-data root",
  );
  const localStatePath = join(safeUserDataDir, "Local State");

  if (!existsSync(localStatePath)) {
    return undefined;
  }

  try {
    return JSON.parse(readFileSync(localStatePath, "utf8"));
  } catch {
    return undefined;
  }
}

export function resolveChromeProfileDirectory(
  userDataDir,
  profileName,
  fallbackDirectory = profileName,
) {
  const normalizedUserDataDir = normalizeRoot(userDataDir);

  if (
    normalizeRoot(normalizedUserDataDir) ===
    normalizeRoot(DEFAULT_ISOLATED_CHROME_USER_DATA_DIR)
  ) {
    return DEFAULT_ISOLATED_CHROME_PROFILE_DIRECTORY;
  }

  const localState = readChromeLocalState(normalizedUserDataDir);
  const infoCache = localState?.profile?.info_cache;
  let profileDirectory = assertSafePathSegment(
    fallbackDirectory,
    "Switchyard Chrome profile directory",
  );

  if (infoCache && typeof infoCache === "object") {
    const wanted = profileName.toLowerCase();

    for (const [directoryName, payload] of Object.entries(infoCache)) {
      const profile = payload ?? {};
      const candidates = [
        directoryName,
        profile.name,
        profile.shortcut_name,
        profile.user_name,
      ]
        .map((value) => `${value ?? ""}`.trim().toLowerCase())
        .filter(Boolean);

      if (candidates.includes(wanted)) {
        profileDirectory = assertSafePathSegment(
          directoryName,
          "Switchyard Chrome profile directory",
        );
        break;
      }
    }
  }

  return profileDirectory;
}

export function resolveIsolatedChromeUserDataDir(env = process.env) {
  const userDataDir = assertPathInsideAllowedRoots(
    env[SWITCHYARD_CHROME_USER_DATA_DIR_ENV_NAME]?.trim() ||
      env[SWITCHYARD_WEB_AUTH_EXISTING_PROFILE_DIR_ENV_NAME]?.trim() ||
      DEFAULT_ISOLATED_CHROME_USER_DATA_DIR,
    [
      join(repoRoot, ".runtime-cache"),
      resolveExternalCacheRoot(env, repoRoot),
      tmpdir(),
    ],
    "Switchyard isolated Chrome user-data root",
  );

  if (isPathInsideRoot(DEFAULT_SOURCE_CHROME_USER_DATA_DIR, userDataDir)) {
    throw new Error(
      `Switchyard steady-state browser root must not live inside the default Chrome root ${DEFAULT_SOURCE_CHROME_USER_DATA_DIR}. Seed the isolated root first, then point SWITCHYARD_CHROME_USER_DATA_DIR there instead of reusing the default Chrome root.`,
    );
  }

  return userDataDir;
}

export function resolveIsolatedChromeProfileDisplayName(env = process.env) {
  return (
    env[SWITCHYARD_CHROME_PROFILE_NAME_ENV_NAME]?.trim() ||
    DEFAULT_ISOLATED_CHROME_PROFILE_NAME
  );
}

export function resolveIsolatedChromeProfileConfig(env = process.env) {
  const userDataDir = resolveIsolatedChromeUserDataDir(env);
  const profileName = resolveIsolatedChromeProfileDisplayName(env);
  const profileDirectory = resolveChromeProfileDirectory(
    userDataDir,
    profileName,
    DEFAULT_ISOLATED_CHROME_PROFILE_DIRECTORY,
  );

  return {
    userDataDir,
    profileName,
    profileDirectory,
    profileDir: join(userDataDir, profileDirectory),
    source:
      env[SWITCHYARD_CHROME_USER_DATA_DIR_ENV_NAME]?.trim() ||
      env[SWITCHYARD_CHROME_PROFILE_NAME_ENV_NAME]?.trim()
        ? `${SWITCHYARD_CHROME_USER_DATA_DIR_ENV_NAME}+${SWITCHYARD_CHROME_PROFILE_NAME_ENV_NAME}`
        : "default",
  };
}

export function resolveRealChromeProfileConfig(env = process.env) {
  return resolveIsolatedChromeProfileConfig(env);
}

export function resolveCredentialedBrowserMode(env = process.env) {
  const configuredMode = normalizeBrowserMode(
    env[SWITCHYARD_BROWSER_MODE_ENV_NAME],
  );

  if (configuredMode) {
    return configuredMode;
  }

  if (isCiEnvironment(env)) {
    return MANAGED_BROWSER_MODE;
  }

  return DEFAULT_BROWSER_MODE;
}

export function resolveSwitchyardCacheTtlDays(env = process.env) {
  return resolveCacheTtlDays(env);
}

export function resolveSwitchyardCacheMaxBytes(env = process.env) {
  return resolveCacheMaxBytes(env);
}

export function resolveSwitchyardCacheRoots(
  customRepoRoot = repoRoot,
  env = process.env,
) {
  const resolvedRepoRoot = resolve(customRepoRoot);
  return {
    repoRoot: resolvedRepoRoot,
    runtimeCacheRoot: join(resolvedRepoRoot, ".runtime-cache"),
    externalCacheRoot: resolveExternalCacheRoot(env, resolvedRepoRoot),
    isolatedChromeUserDataDir: resolveIsolatedChromeUserDataDir(env),
  };
}

export function resolveConfiguredChromeProfile(env = process.env) {
  return resolveRealChromeProfileConfig(env);
}

export function resolveManagedBrowserUserDataDir(
  env = process.env,
  customRepoRoot = repoRoot,
) {
  const repoRuntimeCacheRoot = join(customRepoRoot, ".runtime-cache");
  const configured =
    env[SWITCHYARD_WEB_AUTH_USER_DATA_DIR_ENV_NAME]?.trim() ||
    join(repoRuntimeCacheRoot, "switchyard-web-auth-browser");

  return assertPathInsideRoot(
    configured,
    repoRuntimeCacheRoot,
    "Switchyard managed browser profile",
  );
}

export function resolveLocalWebAuthStoreArtifactPath(
  env = process.env,
  customRepoRoot = repoRoot,
) {
  const repoRuntimeCacheRoot = join(customRepoRoot, ".runtime-cache");
  const configured =
    env[SWITCHYARD_LOCAL_WEB_AUTH_STORE_PATH_ENV_NAME]?.trim() ||
    join(repoRuntimeCacheRoot, "local-web-auth-store.json");

  return assertPathInsideRoot(
    configured,
    repoRuntimeCacheRoot,
    "Switchyard local web auth store",
  );
}

export function resolveRealityGateArtifactPaths(
  env = process.env,
  customRepoRoot = repoRoot,
) {
  const repoRuntimeCacheRoot = join(customRepoRoot, ".runtime-cache");
  const artifactRoot = assertPathInsideRoot(
    env[SWITCHYARD_REALITY_GATE_ARTIFACT_DIR_ENV_NAME]?.trim() ||
      repoRuntimeCacheRoot,
    repoRuntimeCacheRoot,
    "Switchyard reality gate artifact root",
  );
  const outputPath = assertPathInsideRoot(
    env[SWITCHYARD_REALITY_GATE_OUTPUT_PATH_ENV_NAME]?.trim() ||
      join(artifactRoot, "reality-gate.out"),
    repoRuntimeCacheRoot,
    "Switchyard reality gate output artifact",
  );
  const exitPath = assertPathInsideRoot(
    env[SWITCHYARD_REALITY_GATE_EXIT_PATH_ENV_NAME]?.trim() ||
      join(artifactRoot, "reality-gate.exit"),
    repoRuntimeCacheRoot,
    "Switchyard reality gate exit artifact",
  );

  return {
    runtimeCacheRoot: artifactRoot,
    outputPath,
    exitPath,
  };
}

export function resolveAllowedRuntimeArtifactRoots(
  env = process.env,
  customRepoRoot = repoRoot,
) {
  const externalCacheRoot = resolveExternalCacheRoot(env, customRepoRoot);
  return {
    repoRuntimeCacheRoot: join(customRepoRoot, ".runtime-cache"),
    externalCacheRoot,
    protectedBrowserRoot: resolveIsolatedChromeUserDataDir(env),
    externalDisposableRoots: [
      externalCacheRoot,
    ],
  };
}

export function resolveOptionalExistingChromeProfileRoot(
  env = process.env,
) {
  const isolatedProfile = resolveIsolatedChromeProfileConfig(env);

  return {
    userDataDir: isolatedProfile.userDataDir,
    profileName: isolatedProfile.profileName,
    profileDirectory: isolatedProfile.profileDirectory,
    profileDir: isolatedProfile.profileDir,
    source: isolatedProfile.source,
  };
}

export function describeProtectedUserOwnedProfile(env = process.env) {
  const isolatedProfile = resolveIsolatedChromeProfileConfig(env);

  return {
    userDataDir: isolatedProfile.userDataDir,
    profileName: isolatedProfile.profileName,
    profileDirectory: isolatedProfile.profileDirectory,
    profileDir: isolatedProfile.profileDir,
    exists: existsSync(isolatedProfile.userDataDir),
  };
}

export function resolveDefaultChromeSourceRoot() {
  return DEFAULT_SOURCE_CHROME_USER_DATA_DIR;
}

export function resolveSourceChromeProfileSelection(env = process.env) {
  const userDataDir = assertPathInsideAllowedRoots(
    env.SWITCHYARD_SOURCE_CHROME_USER_DATA_DIR?.trim() ||
      DEFAULT_SOURCE_CHROME_USER_DATA_DIR,
    resolveKnownBrowserFilesystemRoots(env, repoRoot),
    "Switchyard source Chrome user-data root",
  );
  const profileName =
    env.SWITCHYARD_SOURCE_CHROME_PROFILE_NAME?.trim() ||
    DEFAULT_SOURCE_CHROME_PROFILE_NAME;
  const profileDirectory = resolveChromeProfileDirectory(
    userDataDir,
    profileName,
    DEFAULT_SOURCE_CHROME_PROFILE_DIRECTORY,
  );

  return {
    userDataDir,
    profileName,
    profileDirectory,
    profileDir: join(userDataDir, profileDirectory),
  };
}
