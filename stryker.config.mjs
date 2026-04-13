/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
export default {
  testRunner: "vitest",
  packageManager: "pnpm",
  plugins: ["@stryker-mutator/vitest-runner"],
  // Runtime browser profiles and temp artifacts are not mutation inputs and can
  // disappear mid-copy while Stryker prepares its sandbox.
  ignorePatterns: [".agents/**", ".runtime-cache/**"],
  mutate: [
    "scripts/run-reality-gate.mjs",
  ],
  testFiles: [
    "tests/unit/web/closeout-gate.test.ts",
    "tests/unit/web/reality-gate-governance.test.ts",
    "tests/unit/web/reality-gate-script.test.ts",
  ],
  vitest: {
    configFile: "vitest.config.ts",
    related: false,
  },
  reporters: ["clear-text", "json"],
  jsonReporter: {
    fileName: ".runtime-cache/mutation/mutation.json",
  },
  concurrency: 2,
  thresholds: {
    high: 70,
    low: 55,
    break: 45,
  },
};
