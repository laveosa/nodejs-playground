import type { IncomingMessage, ServerResponse } from "node:http";

import ProductApiService from "../../utils/services/api/product-api-service.js";
import { responseErrorHandler } from "#src/utils/helpers/api-helper.js";
import type { ProductModel } from "../../const/models/product-model.js";

export default class ProductDbController {
  static productApiService = new ProductApiService();

  static async requestHandler(
    req: IncomingMessage,
    res: ServerResponse,
    body?: ProductModel,
  ) {
    try {
      const dbRes = await this.productApiService.createProduct(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(dbRes));
    } catch (error: unknown) {
      responseErrorHandler(error, res);
    }

    res.end();
  }
}
