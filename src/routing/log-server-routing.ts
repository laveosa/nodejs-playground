import type { IncomingMessage, ServerResponse } from "node:http";
import { responseErrorHandler } from "#src/utils/helpers/api-helper.js";
import LogController from "#src/controllers/log-server/log-controller.js";

export default class LogServerRouting {
  constructor() {}

  static async route(req: IncomingMessage, res: ServerResponse) {
    try {
      await LogController.requestHandler(req, res);
    } catch (error: unknown) {
      responseErrorHandler(error, res);
    }
  }
}
