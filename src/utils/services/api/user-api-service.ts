import type { UserModel } from "#src/const/models/user-model.js";
import { ApiRequestType } from "#src/const/enums/api-request-type.js";
import { schemeValidation } from "#src/utils/validation/scheme-validation.js";
import { UserScheme } from "#src/const/schemes/user-scheme.js";

const DB_SERVER_ROOT = "http://localhost:8000/db/";

export default class UserApiService {
  constructor() {}

  // ------- each method necessary logic
  // parameters validation (implement Zod as a validation tool)
  // db request logs
  // db interaction
  // db response logs

  async getUser(id: string) {
    if (!id || id.length === 0) return null;

    try {
      const targetUrl = new URL("user", DB_SERVER_ROOT);
      targetUrl.searchParams.set("id", id);

      const response = await fetch(targetUrl.href, {
        method: ApiRequestType.GET,
      });

      if (!response.ok) {
        throw new Error(`DB Server responded with stats: ${response.status}`);
      }

      return (await response.json()) as UserModel;
    } catch (fetchError) {
      console.error("[API Server Internal Fetch Error]: ", fetchError);
      throw fetchError;
    }
  }

  async getAllUsers() {
    try {
      const targetUrl = new URL("user/all", DB_SERVER_ROOT);

      const response = await fetch(targetUrl.href, {
        method: ApiRequestType.GET,
      });

      if (!response) {
        throw new Error(`DB Server responded with status: ${response.status}`);
      }

      return (await response.json()) as UserModel[];
    } catch (fetchError) {
      throw fetchError;
    }
  }

  async createUser(data: UserModel) {
    if (!data || typeof data !== "object") return null;

    data.id = "stub";
    try {
      schemeValidation<UserModel>(UserScheme, data);

      const targetUrl = new URL("user", DB_SERVER_ROOT);

      const response = await fetch(targetUrl.href, {
        method: ApiRequestType.POST,
        body: JSON.stringify(data),
      });

      if (!response) {
        throw new Error(`DB Server responded with status: ${response.status}`);
      }

      return (await response.json()) as UserModel;
    } catch (fetchError) {
      throw fetchError;
    }
  }

  async updateUser(data: UserModel) {
    try {
      schemeValidation<UserModel>(UserScheme, data);

      const targetUrl = new URL("user", DB_SERVER_ROOT);

      const response = await fetch(targetUrl.href, {
        method: ApiRequestType.PUT,
        body: JSON.stringify(data),
      });

      if (!response) {
        throw new Error(`DB Server responded with status: ${response.status}`);
      }

      return (await response.json()) as UserModel;
    } catch (fetchError) {
      throw fetchError;
    }
  }

  async deleteUser(id: string) {
    if (!id || id.length === 0) return null;

    try {
      const targetUrl = new URL("user", DB_SERVER_ROOT);
      targetUrl.searchParams.set("id", id);

      const response = await fetch(targetUrl.href, {
        method: ApiRequestType.DELETE,
      });

      if (!response) {
        throw new Error(`DB Server responded with status: ${response.status}`);
      }

      return (await response.json()) as UserModel;
    } catch (fetchError) {
      throw fetchError;
    }
  }

  async deleteAllUsers() {
    try {
      const targetUrl = new URL("user/all", DB_SERVER_ROOT);

      const response = await fetch(targetUrl.href, {
        method: ApiRequestType.DELETE,
      });

      if (!response) {
        throw new Error(`DB Server responded with status: ${response.status}`);
      }

      return (await response.json()) as UserModel;
    } catch (fetchError) {
      throw fetchError;
    }
  }
}
