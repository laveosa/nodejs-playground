import type { UserModel } from "#src/const/models/user-model.js";
export default class UserDbServer {
    constructor();
    getUser(id: string): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }>;
    getAllUsers(): Promise<void>;
    createUser(data: UserModel): Promise<void>;
    updateUser(id: string, data: UserModel): Promise<void>;
    deleteUser(id: string): Promise<void>;
    deleteAllUsers(): Promise<void>;
}
//# sourceMappingURL=user-db-server.d.ts.map