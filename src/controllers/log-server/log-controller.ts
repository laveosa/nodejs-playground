import type { IncomingMessage, ServerResponse } from "node:http";

export default class LogController {
  static async requestHandler(req: IncomingMessage, res: ServerResponse) {}
}
