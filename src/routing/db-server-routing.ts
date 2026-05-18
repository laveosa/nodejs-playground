import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";

import UserDbController from "#src/controllers/db-server/user-db-controller.js";
import ProductDbController from "#src/controllers/db-server/product-db-controller.js";
import AddressDbController from "#src/controllers/db-server/address-db-controller.js";
import BundleDbController from "#src/controllers/db-server/bundle-db-controller.js";
import { getEntityChunk } from "#src/utils/helpers/url-helper.js";
import { responseErrorHandler } from "#src/utils/helpers/api-helper.js";
import { EntityRequest } from "#src/const/enums/entity-request.js";
import type { EntityType } from "#src/const/enums/entity-request.js";

export default class DbServiceRouting {
  constructor() {}

  static async route(req: IncomingMessage, res: ServerResponse) {
    const entity: EntityType = getEntityChunk(req.url, "db");

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
        return UserDbController;
      case EntityRequest.product:
        return ProductDbController;
      case EntityRequest.address:
        return AddressDbController;
      case EntityRequest.bundle:
        return BundleDbController;
      default:
        throw new Error(`Unhandled entity: ${entity as never}`);
    }
  }
}
