import type { BundleModel } from "#src/const/models/bundle-model.js";
export default class BundleApiService {
    constructor();
    getBundle(id: string): Promise<void>;
    getAllBundles(): Promise<void>;
    createBundle(data: BundleModel): Promise<void>;
    updateBundle(data: BundleModel): Promise<void>;
    deleteBundle(id: string): Promise<void>;
    deleteAllBundles(): Promise<void>;
}
//# sourceMappingURL=bundle-api-service.d.ts.map