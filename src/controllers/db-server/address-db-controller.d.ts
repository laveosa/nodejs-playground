import type { IncomingMessage, ServerResponse } from "node:http";
import AddressApiService from "../../utils/services/api/address-api-service.js";
import type { AddressModel } from "../../const/models/address-model.js";
export default class AddressDbController {
    static addressApiService: AddressApiService;
    static requestHandler(req: IncomingMessage, res: ServerResponse, body?: AddressModel): Promise<void>;
}
//# sourceMappingURL=address-db-controller.d.ts.map