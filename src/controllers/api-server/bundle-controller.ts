import type { IncomingMessage, ServerResponse } from "node:http";

import BundleApiService from "../../utils/services/api/bundle-api-service.js";
import { responseErrorHandler } from "#src/utils/helpers/api-helper.js";
import type { BundleModel } from "../../const/models/bundle-model.js";

export default class BundleController {
  static bundleApiService = new BundleApiService();

  static async requestHandler(
    req: IncomingMessage,
    res: ServerResponse,
    body?: BundleModel,
  ) {
    try {
      const dbRes = await this.bundleApiService.createBundle(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(dbRes));
    } catch (error: unknown) {
      responseErrorHandler(error, res);
    }

    res.end();
  }
}
