import type { ILogModel } from "#src/const/models/log-model.js";
import { constructRawWsFrame } from "#src/utils/helpers/api-helper.js";
import { createHash } from "node:crypto";
import * as http from "node:http";
import { ENV_CONFIG } from "#src/config/env-config.js";
import type { Socket } from "node:net";

export default class LogApiService {
  private static socket: Socket | null = null;
  private static isConnecting = false;

  static connect() {
    if (this.socket || this.isConnecting) return;
    this.isConnecting = true;

    console.log(
      "[LOG-CLIENT]: Initiating native handshake connection request...",
    );

    const randomKey = createHash("sha1")
      .update(Math.random().toString())
      .digest("base64");

    const requestOptions = {
      port: ENV_CONFIG.LOG_PORT,
      host: "localhost",
      headers: {
        Connection: "Upgrade",
        Upgrade: "websocket",
        "Sec-WebSocket-Key": randomKey,
        "Sec-WebSocket-Version": "13",
      },
    };

    const req = http.request(requestOptions as any);

    req.on("upgrade", (res, socket) => {
      this.socket = socket;
      this.isConnecting = false;

      console.log(
        "[LOG-CLIENT]: Connected to Log Server successfully over native WS line!",
      );

      this.socket.on("close", () => {
        console.warn(
          "[LOG-CLIENT]: Connection severed. Cleaning stream reference.",
        );
        this.socket = null;
      });

      this.socket.on("error", (err) => {
        console.error("[LOG-CLIENT]: Stream pipeline error:", err.message);
      });
    });

    req.on("error", (err) => {
      this.isConnecting = false;
      console.error(
        "[LOG-CLIENT]: Failed to establish handshake connection:",
        err.message,
      );
    });

    req.end();
  }

  static sendLog(level: ILogModel["level"], context: string, message: string) {
    if (!this.socket || this.socket.destroyed) {
      this.connect();
      return;
    }

    const payload = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
    });

    try {
      const frame = constructRawWsFrame(payload);
      this.socket.write(frame);
    } catch (err: any) {
      console.error(
        "[LOG-CLIENT]: Transmission structural failure:",
        err.message,
      );
    }
  }
}
