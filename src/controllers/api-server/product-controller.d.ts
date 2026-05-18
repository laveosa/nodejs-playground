import type { IncomingMessage, ServerResponse } from "node:http";
import ProductApiService from "../../utils/services/api/product-api-service.js";
import type { ProductModel } from "../../const/models/product-model.js";
export default class ProductController {
    static productApiService: ProductApiService;
    static requestHandler(req: IncomingMessage, res: ServerResponse, body?: ProductModel): Promise<void>;
}
//# sourceMappingURL=product-controller.d.ts.map