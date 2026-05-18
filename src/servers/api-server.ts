import * as http from "node:http";
import { IncomingMessage, ServerResponse } from "node:http";

import { ENV_CONFIG } from "#src/config/env-config.js";
import ApiServiceRouting from "#src/routing/api-server-routing.js";

const serverConfig = {
  highWaterMark: 32 * 1024,
  headersTimeout: 5000,
};

export function runApiServer() {
  const server = http.createServer(serverConfig);

  server.on("request", async (req: IncomingMessage, res: ServerResponse) => {
    await ApiServiceRouting.route(req, res);
  });

  server.listen(ENV_CONFIG.API_PORT, () =>
    console.log(`[API-SERVER] running on port: ${ENV_CONFIG.API_PORT}`),
  );
}
