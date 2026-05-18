import type { UserModel } from "#src/const/models/user-model.js";
export default class UserApiService {
    constructor();
    getUser(id: string): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }>;
    getAllUsers(): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }[]>;
    createUser(data: UserModel): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }>;
    updateUser(id: string, data: UserModel): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }>;
    deleteUser(id: string): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }>;
    deleteAllUsers(): Promise<{
        name: string;
        age: number;
        email: string;
        id?: string;
    }>;
}
//# sourceMappingURL=user-api-service.d.ts.map