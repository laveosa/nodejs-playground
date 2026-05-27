import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";

import type { EntityType } from "#src/const/enums/entity-request.js";
import { EntityRequest } from "#src/const/enums/entity-request.js";
import { getEntityChunk } from "#src/utils/helpers/url-helper.js";
import UserController from "#src/controllers/api-server/user-controller.js";
import ProductController from "#src/controllers/api-server/product-controller.js";
import AddressController from "#src/controllers/api-server/address-controller.js";
import BundleController from "#src/controllers/api-server/bundle-controller.js";
import { responseErrorHandler } from "#src/utils/helpers/api-helper.js";

export default class ApiService {
  constructor() {}

  static async mapEntityControllers(req: IncomingMessage, res: ServerResponse) {
    const entity: EntityType = getEntityChunk(req.url, "api");

    try {
      const controller = this.getEntityController(entity);
      await controller.requestHandler(req, res);
    } catch (error: unknown) {
      responseErrorHandler(error, res);
    }
  }

  // ========================================================================= PRIVATE

  private static getEntityController(entity: EntityType): any {
    if (!entity || entity.length === 0) return null;

    switch (entity) {
      case EntityRequest.user:
        return UserController;
      case EntityRequest.product:
        return ProductController;
      case EntityRequest.address:
        return AddressController;
      case EntityRequest.bundle:
        return BundleController;
      default:
        throw new Error(`Unhandled entity: ${entity as never}`);
    }
  }
}
