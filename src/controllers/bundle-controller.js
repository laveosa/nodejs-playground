import ApiService from "#src/utils/services/api/api-service.js";
import BundleApiService from "#src/utils/services/api/bundle-api-service.js";
export default class BundleController {
    static bundleApiService = new BundleApiService();
    static async requestHandler(req, res, body) {
        try {
            const dbRes = await this.bundleApiService.createBundle(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(dbRes));
        }
        catch (error) {
            ApiService.responseErrorHandler(error, res);
        }
        res.end();
    }
}
//# sourceMappingURL=bundle-controller.js.map