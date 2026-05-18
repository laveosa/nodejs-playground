import type { IncomingMessage, ServerResponse } from "node:http";

import AddressApiService from "#src/utils/services/api/address-api-service.js";
import { responseErrorHandler } from "#src/utils/helpers/api-helper.js";
import type { AddressModel } from "#src/const/models/address-model.js";

export default class AddressController {
  static addressApiService = new AddressApiService();

  static async requestHandler(
    req: IncomingMessage,
    res: ServerResponse,
    body?: AddressModel,
  ) {
    try {
      const dbRes = await this.addressApiService.createAddress(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(dbRes));
    } catch (error: unknown) {
      responseErrorHandler(error, res);
    }

    res.end();
  }
}
