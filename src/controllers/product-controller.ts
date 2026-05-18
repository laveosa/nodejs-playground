import type { IncomingMessage, ServerResponse } from "node:http";

import ApiService from "#src/utils/services/api/api-service.js";
import ProductApiService from "#src/utils/services/api/product-api-service.js";
import type { ProductModel } from "#src/const/models/product-model.js";

export default class ProductController {
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
      ApiService.responseErrorHandler(error, res);
    }

    res.end();
  }
}
