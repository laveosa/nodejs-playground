import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";

import UserController from "#src/controllers/user-controller.js";
import { EntityRequest } from "#src/const/enums/entity-request.js";
import type { EntityType } from "#src/const/enums/entity-request.js";
import ProductController from "#src/controllers/product-controller.js";
import AddressController from "#src/controllers/address-controller.js";
import BundleController from "#src/controllers/bundle-controller.js";
import { getEntityChunk } from "#src/utils/helpers/url-helper.js";

export default class ApiService {
  constructor() {}

  static async mapEntityControllers(req: IncomingMessage, res: ServerResponse) {
    const entity: EntityType = getEntityChunk(req.url);

    try {
      const controller = this.getEntityController(entity);
      await controller.requestHandler(req, res);
    } catch (error: unknown) {
      this.responseErrorHandler(error, res);
    }
  }

  static getBody<T = unknown>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      req.on("data", (chunk: Buffer) => chunks.push(chunk));

      req.on("end", () => {
        try {
          const rawBody = Buffer.concat(chunks).toString("utf-8");

          if (!rawBody) return resolve(null as T);

          const parsedData = JSON.parse(rawBody) as T;
          resolve(parsedData);
        } catch {
          reject(new Error("Invalid JSON body"));
        }
      });

      req.on("error", (error) => reject(error));
    });
  }

  static responseErrorHandler(
    error: unknown,
    res: ServerResponse,
    code: number = 500,
  ) {
    let errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    console.error(`Server Error: `, errorMessage);

    if (!res.writableEnded) {
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: errorMessage }));
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
        const _exhaustiveCheck: never = entity;
        throw new Error(`Unhandled entity: ${_exhaustiveCheck}`);
    }
  }
}
