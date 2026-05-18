import type { IncomingMessage, ServerResponse } from "node:http";
import BundleApiService from "../../utils/services/api/bundle-api-service.js";
import type { BundleModel } from "../../const/models/bundle-model.js";
export default class BundleController {
    static bundleApiService: BundleApiService;
    static requestHandler(req: IncomingMessage, res: ServerResponse, body?: BundleModel): Promise<void>;
}
//# sourceMappingURL=bundle-controller.d.ts.map