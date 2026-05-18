import type { ProductModel } from "#src/const/models/product-model.js";
export default class ProductApiService {
    constructor();
    getProduct(id: string): Promise<void>;
    getAllProducts(): Promise<void>;
    createProduct(data: ProductModel): Promise<void>;
    updateProduct(data: ProductModel): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    deleteAllProducts(): Promise<void>;
}
//# sourceMappingURL=product-api-service.d.ts.map