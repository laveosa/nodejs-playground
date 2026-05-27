import * as http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { Server } from "socket.io";
import { ENV_CONFIG } from "#src/config/env-config.js";
import LogController from "#src/controllers/log-server/log-controller.js";

const serverConfiguration = {};

export function runLogServer() {
  const httpServer = http.createServer(serverConfiguration);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  httpServer.on("request", (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(426, { "Content-Type": "text/plain" });
    res.end("This is a dedicated Socket.io Log Server.");
  });

  io.on("connection", (socket) => {
    console.log("[LOG-SERVER]: Persistent Socket.io connection established!");

    socket.on("log:record", async (payload: string) => {
      console.log(`[Log Server Event Received]: ${payload}`);
      await LogController.handleIncomingLog(payload);
    });

    socket.on("disconnect", () => {
      console.log("[LOG-SERVER]: Client disconnected from channel.");
    });
  });

  httpServer.listen(ENV_CONFIG.LOG_PORT, () =>
    console.log(`[LOG-SERVER] running on port: ${ENV_CONFIG.LOG_PORT}`),
  );
}
