import type { AddressModel } from "#src/const/models/address-model.js";
export default class AddressApiService {
    constructor();
    getAddress(id: string): Promise<void>;
    getAllAddress(): Promise<void>;
    createAddress(data: AddressModel): Promise<void>;
    updateAddress(data: AddressModel): Promise<void>;
    deleteAddress(id: string): Promise<void>;
    deleteAllAddress(): Promise<void>;
}
//# sourceMappingURL=address-api-service.d.ts.map