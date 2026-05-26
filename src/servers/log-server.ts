import * as http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { ENV_CONFIG } from "#src/config/env-config.js";
import LogServerRouting from "#src/routing/log-server-routing.js";

const serverConfiguration = {};

export function runLogService() {
  const server = http.createServer(serverConfiguration);

  server.on("request", async (req: IncomingMessage, res: ServerResponse) => {
    await LogServerRouting.route(req, res);
  });

  server.listen(ENV_CONFIG.LOG_PORT, () =>
    console.log(`[LOG-SERVER] running on port: ${ENV_CONFIG.LOG_PORT}`),
  );
}
