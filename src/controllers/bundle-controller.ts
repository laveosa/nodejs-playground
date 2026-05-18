import type { IncomingMessage, ServerResponse } from "node:http";

import ApiService from "#src/utils/services/api/api-service.js";
import BundleApiService from "#src/utils/services/api/bundle-api-service.js";
import type { BundleModel } from "#src/const/models/bundle-model.js";

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
      ApiService.responseErrorHandler(error, res);
    }

    res.end();
  }
}
