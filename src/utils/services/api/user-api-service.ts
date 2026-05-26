import type { UserModel } from "#src/const/models/user-model.js";
import { ApiRequestType } from "#src/const/enums/api-request-type.js";
import { schemeValidation } from "#src/utils/validation/scheme-validation.js";
import { UserScheme } from "#src/const/schemes/user-scheme.js";

const DB_SERVER_ROOT = "http://localhost:8000/db/";

export default class UserApiService {
  constructor() {}

  async getUser(id: string) {
    if (!id || id.length === 0) return null;

    const targetUrl = new URL("user", DB_SERVER_ROOT);
    targetUrl.searchParams.set("id", id);

    const response = await fetch(targetUrl.href, {
      method: ApiRequestType.GET,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User with id "${id}" does not exist in the database.`);
      }

      throw new Error(`DB Server responded with status: ${response.status}`);
    }

    return (await response.json()) as UserModel;
  }

  async getAllUsers() {
    const targetUrl = new URL("user/all", DB_SERVER_ROOT);

    const response = await fetch(targetUrl.href, {
      method: ApiRequestType.GET,
    });

    if (!response.ok) {
      throw new Error(`DB Server responded with status: ${response.status}`);
    }

    return (await response.json()) as UserModel[];
  }

  async createUser(data: UserModel) {
    if (!data || typeof data !== "object") return null;

    data.id = "stub";
    schemeValidation<UserModel>(UserScheme, data);

    const targetUrl = new URL("user", DB_SERVER_ROOT);
    const response = await fetch(targetUrl.href, {
      method: ApiRequestType.POST,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`DB Server responded with status: ${response.status}`);
    }

    return (await response.json()) as UserModel;
  }

  async updateUser(data: UserModel) {
    schemeValidation<UserModel>(UserScheme, data);

    const targetUrl = new URL("user", DB_SERVER_ROOT);
    const response = await fetch(targetUrl.href, {
      method: ApiRequestType.PUT,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`DB Server responded with status: ${response.status}`);
    }

    return (await response.json()) as UserModel;
  }

  async deleteUser(id: string) {
    if (!id || id.length === 0) return null;

    const targetUrl = new URL("user", DB_SERVER_ROOT);
    targetUrl.searchParams.set("id", id);

    const response = await fetch(targetUrl.href, {
      method: ApiRequestType.DELETE,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User with id "${id}" does not exist in the database.`);
      }

      throw new Error(`DB Server responded with status: ${response.status}`);
    }

    return (await response.json()) as UserModel;
  }

  async deleteAllUsers() {
    const targetUrl = new URL("user/all", DB_SERVER_ROOT);

    const response = await fetch(targetUrl.href, {
      method: ApiRequestType.DELETE,
    });

    if (!response.ok) {
      throw new Error(`DB Server responded with status: ${response.status}`);
    }

    return (await response.json()) as UserModel;
  }
}
