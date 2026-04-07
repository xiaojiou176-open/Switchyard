import { existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const packageDir = process.cwd();
const tsconfigPath = process.argv[2] ?? 'tsconfig.json';
const outDir = process.argv[3] ?? 'dist';
const relativeRootDir = path.relative(packageDir, repoRoot) || '.';
const removableDirectoryErrorCodes = new Set(['ENOTEMPTY', 'EBUSY', 'EPERM']);

function isPathInsideRoot(rootDir, targetPath) {
  return targetPath === rootDir || targetPath.startsWith(`${rootDir}${path.sep}`);
}

function resolveInsideRoot(rootDir, candidatePath, label) {
  const resolvedRootDir = path.resolve(rootDir);
  const resolvedCandidatePath = path.resolve(rootDir, candidatePath);

  if (!isPathInsideRoot(resolvedRootDir, resolvedCandidatePath)) {
    throw new Error(`${label} must stay inside ${resolvedRootDir}. Refusing ${resolvedCandidatePath}.`);
  }

  return resolvedCandidatePath;
}

if (!isPathInsideRoot(repoRoot, packageDir)) {
  console.error(`build-package must run inside ${repoRoot}`);
  process.exit(1);
}

const resolvedTsconfigPath = resolveInsideRoot(packageDir, tsconfigPath, 'build-package tsconfig');
const safeTsconfigPath = path.relative(packageDir, resolvedTsconfigPath) || '.';
const resolvedOutDir = resolveInsideRoot(packageDir, outDir, 'build-package outDir');
const safeOutDir = path.relative(packageDir, resolvedOutDir) || '.';

if (resolvedOutDir === packageDir) {
  console.error(`build-package outDir must not be the package root: ${packageDir}`);
  process.exit(1);
}

function isGeneratedSibling(filePath) {
  if (filePath.endsWith('.d.ts')) {
    return `${filePath.slice(0, -5)}.ts`;
  }

  if (filePath.endsWith('.d.ts.map')) {
    return `${filePath.slice(0, -9)}.ts`;
  }

  if (filePath.endsWith('.js')) {
    return `${filePath.slice(0, -3)}.ts`;
  }

  if (filePath.endsWith('.js.map')) {
    return `${filePath.slice(0, -7)}.ts`;
  }

  return undefined;
}

function cleanupGeneratedSourceArtifacts(currentDir) {
  if (!existsSync(currentDir)) {
    return;
  }

  for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
    const entryPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      cleanupGeneratedSourceArtifacts(entryPath);
      continue;
    }

    const siblingTs = isGeneratedSibling(entryPath);

    if (siblingTs && existsSync(siblingTs)) {
      rmSync(entryPath, { force: true });
    }
  }
}

function removeDirectoryWithRetries(targetPath) {
  if (!existsSync(targetPath)) {
    return;
  }

  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      rmSync(targetPath, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 50
      });
      return;
    } catch (error) {
      if (!existsSync(targetPath)) {
        return;
      }

      if (!removableDirectoryErrorCodes.has(error?.code)) {
        throw error;
      }

      lastError = error;
    }
  }

  throw lastError;
}

removeDirectoryWithRetries(resolvedOutDir);

const result = spawnSync(
  'pnpm',
  [
    'exec',
    'tsc',
    '-p',
    safeTsconfigPath,
    '--pretty',
    'false',
    '--noEmit',
    'false',
    '--declaration',
    'false',
    '--declarationMap',
    'false',
    '--rootDir',
    relativeRootDir,
    '--outDir',
    safeOutDir
  ],
  {
    cwd: packageDir,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  }
);

if (result.status === 0) {
  cleanupGeneratedSourceArtifacts(path.join(packageDir, 'src'));
}

process.exit(result.status ?? 1);
