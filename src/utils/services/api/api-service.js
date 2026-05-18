import { ServerResponse } from "node:http";
import UserController from "#src/controllers/user-controller.js";
import { EntityRequest } from "#src/const/enums/entity-request.js";
import ProductController from "#src/controllers/product-controller.js";
import AddressController from "#src/controllers/address-controller.js";
import BundleController from "#src/controllers/bundle-controller.js";
import { getEntityChunk } from "#src/utils/helpers/url-helper.js";
export default class ApiService {
    constructor() { }
    static async mapEntityControllers(req, res) {
        const entity = getEntityChunk(req.url);
        try {
            const controller = this.getEntityController(entity);
            await controller.requestHandler(req, res);
        }
        catch (error) {
            this.responseErrorHandler(error, res);
        }
    }
    static getBody(req) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            req.on("data", (chunk) => chunks.push(chunk));
            req.on("end", () => {
                try {
                    const rawBody = Buffer.concat(chunks).toString("utf-8");
                    if (!rawBody)
                        return resolve(null);
                    const parsedData = JSON.parse(rawBody);
                    resolve(parsedData);
                }
                catch {
                    reject(new Error("Invalid JSON body"));
                }
            });
            req.on("error", (error) => reject(error));
        });
    }
    static responseErrorHandler(error, res, code = 500) {
        let errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        console.error(`Server Error: `, errorMessage);
        if (!res.writableEnded) {
            res.writeHead(code, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: errorMessage }));
        }
    }
    // ========================================================================= PRIVATE
    static getEntityController(entity) {
        if (!entity || entity.length === 0)
            return null;
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
                const _exhaustiveCheck = entity;
                throw new Error(`Unhandled entity: ${_exhaustiveCheck}`);
        }
    }
}
//# sourceMappingURL=api-service.js.map