import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

let loaded = false;

export function loadLocalEnvFiles() {
  if (loaded) {
    return;
  }

  loaded = true;

  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const repoRoot = resolve(scriptDir, "..");
  const candidates = [join(repoRoot, ".env.local"), join(repoRoot, ".env")];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      process.loadEnvFile(candidate);
    }
  }
}

loadLocalEnvFiles();
