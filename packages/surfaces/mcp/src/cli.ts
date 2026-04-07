import process from "node:process";

import {
  parseMcpArgs,
  resolveMcpBaseUrl,
  runSwitchyardMcpStdioServer,
} from "./index.js";

export async function runSwitchyardMcpCli(argv = process.argv.slice(2)) {
  const options = parseMcpArgs(argv);
  const baseUrl = resolveMcpBaseUrl(process.env, options.baseUrl);

  return runSwitchyardMcpStdioServer({ baseUrl });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await runSwitchyardMcpCli();
}
