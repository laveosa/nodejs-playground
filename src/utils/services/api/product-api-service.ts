import type { ProductModel } from "#src/const/models/product-model.js";

export default class ProductApiService {
  constructor() {}

  async getProduct(id: string) {}

  async getAllProducts() {}

  async createProduct(data: ProductModel) {}

  async updateProduct(data: ProductModel) {}

  async deleteProduct(id: string) {}

  async deleteAllProducts() {}
}
