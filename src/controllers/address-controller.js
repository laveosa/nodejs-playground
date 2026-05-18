import ApiService from "#src/utils/services/api/api-service.js";
import AddressApiService from "#src/utils/services/api/address-api-service.js";
export default class AddressController {
    static addressApiService = new AddressApiService();
    static async requestHandler(req, res, body) {
        try {
            const dbRes = await this.addressApiService.createAddress(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(dbRes));
        }
        catch (error) {
            ApiService.responseErrorHandler(error, res);
        }
        res.end();
    }
}
//# sourceMappingURL=address-controller.js.map