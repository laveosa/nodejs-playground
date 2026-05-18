import * as http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

import { ENV_CONFIG } from "#src/config/env-config.js";
import DbServiceRouting from "#src/routing/db-server-routing.js";

const serverConfig = {
  highWaterMark: 32 * 1024,
  headersTimeout: 5000,
};

export function runDbServer() {
  const server = http.createServer(serverConfig);

  server.on("request", async (req: IncomingMessage, res: ServerResponse) => {
    await DbServiceRouting.route(req, res);
  });

  server.listen(ENV_CONFIG.DB_PORT, () =>
    console.log(`[DB-SERVER] running on port: ${ENV_CONFIG.DB_PORT}`),
  );
}
