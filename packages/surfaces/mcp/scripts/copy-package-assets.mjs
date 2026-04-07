import { cpSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(packageRoot, "../../..");
const distRoot = resolve(packageRoot, "dist");

mkdirSync(distRoot, {
  recursive: true,
});

cpSync(resolve(repoRoot, "docs"), resolve(distRoot, "docs"), {
  recursive: true,
  force: true,
});

mkdirSync(resolve(distRoot, "examples/hosts"), {
  recursive: true,
});
cpSync(
  resolve(repoRoot, "examples/hosts/index.json"),
  resolve(distRoot, "examples/hosts/index.json"),
  { force: true },
);
cpSync(
  resolve(repoRoot, "examples/hosts/index.schema.json"),
  resolve(distRoot, "examples/hosts/index.schema.json"),
  { force: true },
);

mkdirSync(resolve(distRoot, "starter-packs"), {
  recursive: true,
});
cpSync(
  resolve(repoRoot, "starter-packs/index.json"),
  resolve(distRoot, "starter-packs/index.json"),
  { force: true },
);
cpSync(
  resolve(repoRoot, "starter-packs/index.schema.json"),
  resolve(distRoot, "starter-packs/index.schema.json"),
  { force: true },
);
