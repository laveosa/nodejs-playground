import fsP from "node:fs/promises";
import path from "node:path";

import FsService from "#src/utils/services/fs-service.js";
import { schemeValidation } from "#src/utils/validation/scheme-validation.js";
import { UserScheme } from "#src/const/schemes/user-scheme.js";
import type { UserModel } from "#src/const/models/user-model.js";
import { removeModelDuplicate } from "#src/utils/helpers/quick-helper.js";

const DB_ROOT_PATH = "./db/jsons";
const USERS_JSON_PATH = path.join(DB_ROOT_PATH, "users/data.json");

export default class UserDbServer {
  constructor() {}

  async getUser(id: string) {
    if (!id || id.length === 0) return null;

    try {
      let response: UserModel = {
        id: "1",
        name: "Nik",
        age: 43,
        email: "leviosa@yahoo.com",
      };

      const file = await fsP.open(USERS_JSON_PATH, "r");

      console.log("FILE: ", file);

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
    try {
      schemeValidation<UserModel>(UserScheme, data);

      const newUser: UserModel = structuredClone<UserModel>(data);
      let rawData: string;

      try {
        rawData = (await FsService.readFile(USERS_JSON_PATH)) as string;
      } catch (readError: any) {
        if (readError.code === "ENOENT") {
          rawData = "[]";
        } else {
          throw readError;
        }
      }

      const users: UserModel[] = rawData ? JSON.parse(rawData) : [];
      users.push(newUser);
      const cleanUsers = removeModelDuplicate<UserModel>(users, ["id"]);
      cleanUsers.forEach((user, index) => {
        user.id = (index + 1).toString(); // Makes IDs nice, clean, and 1-indexed (e.g., "1", "2")
      });

      await FsService.writeFile<UserModel>(
        USERS_JSON_PATH,
        JSON.stringify(cleanUsers, null, 2),
      );
      return data;
    } catch (fetchError) {
      throw fetchError;
    }
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
