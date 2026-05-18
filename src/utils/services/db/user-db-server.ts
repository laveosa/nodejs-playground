import fsP from "node:fs/promises";

import type { UserModel } from "#src/const/models/user-model.js";
import path from "node:path";
import { ENV_CONFIG } from "#src/config/env-config.js";

export default class UserDbServer {
  constructor() {}

  async getUser(id: string) {
    console.log("DB user server");

    if (!id || id.length === 0) return null;

    try {
      let response: UserModel = {
        id: "1",
        name: "Nik",
        age: 43,
        email: "leviosa@yahoo.com",
      };

      /*const file = fsP.open(
        path.join(ENV_CONFIG.DB_PATH, "users/data.json"),
        "r",
      );
      console.log("FILE: ", file);*/

      return response;
    } catch (fetchError) {
      console.error("[API Server Internal Fetch Error]: ", fetchError);
      throw fetchError;
    }
  }

  async getAllUsers() {
    /*try {
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
    }*/
  }

  async createUser(data: UserModel) {
    /*try {
      const validData: UserModel = schemeValidation<UserModel>(
        UserScheme,
        data,
      );

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
    }*/
  }

  async updateUser(id: string, data: UserModel) {
    /*if (!id || id.length === 0) return null;

    try {
      const validData: UserModel = schemeValidation<UserModel>(
        UserScheme,
        data,
      );

      const targetUrl = new URL("user", DB_SERVER_ROOT);
      targetUrl.searchParams.set("id", id);

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
    }*/
  }

  async deleteUser(id: string) {
    /*if (!id || id.length === 0) return null;

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
    }*/
  }

  async deleteAllUsers() {
    /*try {
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
    }*/
  }
}
