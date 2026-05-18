import ApiService from "#src/utils/services/api/api-service.js";
import ProductApiService from "#src/utils/services/api/product-api-service.js";
export default class ProductController {
    static productApiService = new ProductApiService();
    static async requestHandler(req, res, body) {
        try {
            const dbRes = await this.productApiService.createProduct(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(dbRes));
        }
        catch (error) {
            ApiService.responseErrorHandler(error, res);
        }
        res.end();
    }
}
//# sourceMappingURL=product-controller.js.map