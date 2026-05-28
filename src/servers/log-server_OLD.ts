import type { IncomingMessage, ServerResponse } from "node:http";
import * as http from "node:http";
import type { Socket } from "node:net";
import { createHash } from "node:crypto";

import { ENV_CONFIG } from "#src/config/env-config.js";
import LogController from "#src/controllers/log-server/log-controller.js";
import { parseRawWsFrame } from "#src/utils/helpers/api-helper.js";
import type { ILogModel } from "#src/const/models/log-model.js";

const serverConfiguration = {};

export function runLogServiceOLD() {
  const server = http.createServer(serverConfiguration);

  server.on("request", async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(426, { "Content-Type": "text/plain" });
    res.end(
      "This is a dedicated WebSocket Log Server. Please connect via WS protocol.",
    );
  });

  server.on("upgrade", (req: IncomingMessage, socket: Socket, head: Buffer) => {
    const acceptKey = req.headers["sec-websocket-key"];

    if (!acceptKey) {
      socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
      socket.destroy();
      return;
    }

    const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    const hash = createHash("sha1")
      .update(acceptKey + WS_GUID)
      .digest("base64");
    const resHeader = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${hash}`,
      "\r\n",
    ];

    socket.write(resHeader.join("\r\n"));

    console.log(
      "[LOG-SERVER]: Persistent native WebSocket connection established!",
    );

    socket.on("data", async (buffer: Buffer) => {
      try {
        const message = parseRawWsFrame(buffer);

        if (!message) return;

        await LogController.handleIncomingLog(JSON.parse(message) as ILogModel);
      } catch (err: any) {
        console.error("[Log Server Frame Processing Error]:", err.message);
      }
    });
  });

  server.listen(ENV_CONFIG.LOG_PORT, () =>
    console.log(`[LOG-SERVER] running on port: ${ENV_CONFIG.LOG_PORT}`),
  );
}
