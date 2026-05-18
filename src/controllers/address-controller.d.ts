import type { IncomingMessage, ServerResponse } from "node:http";
import AddressApiService from "#src/utils/services/api/address-api-service.js";
import type { AddressModel } from "#src/const/models/address-model.js";
export default class AddressController {
    static addressApiService: AddressApiService;
    static requestHandler(req: IncomingMessage, res: ServerResponse, body?: AddressModel): Promise<void>;
}
//# sourceMappingURL=address-controller.d.ts.map