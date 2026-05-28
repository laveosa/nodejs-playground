import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

import type { ILogModel } from "#src/const/models/log-model.js";
import { ENV_CONFIG } from "#src/config/env-config.js";

export default class LogApiService {
  private static socket: Socket | null = null;

  static connect() {
    if (this.socket) return;

    console.log("[LOG-CLIENT]: Initiating Socket.io handshake connection...");

    this.socket = io(`http://localhost:${ENV_CONFIG.LOG_PORT}`);

    this.socket.on("connect", () => {
      console.log(
        "[LOG-CLIENT]: Connected to Log Server successfully over Socket.io!",
      );
    });

    this.socket.on("disconnect", () => {
      console.warn("[LOG-CLIENT]: Connection broken with Log Server.");
    });

    this.socket.on("connect_error", (err) => {
      console.error("[LOG-CLIENT]: Handshake failed:", err.message);
    });
  }

  static sendLog(level: ILogModel["level"], context: string, message: string) {
    if (!this.socket || !this.socket.connected) {
      this.connect();
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
    };

    console.log(
      `[LOG-CLIENT] Attempting to emit to server. Socket connected state: ${this.socket?.connected}`,
    );

    this.socket.emit("log:record", payload);
  }

  static dumpLogs() {
    if (!this.socket) this.connect();
    this.socket!.emit("log:dump");
  }

  static getAllLogs(): Promise<any[]> {
    if (!this.socket) this.connect();

    return new Promise((resolve) => {
      this.socket!.emit("log:get-all", (response: any[]) => {
        resolve(response);
      });
    });
  }
}
