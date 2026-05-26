import fsP from "node:fs/promises";
import path from "node:path";

import FsService from "#src/utils/services/fs-service.js";
import { schemeValidation } from "#src/utils/validation/scheme-validation.js";
import { UserScheme } from "#src/const/schemes/user-scheme.js";
import type { UserModel } from "#src/const/models/user-model.js";
import {
  reassignIDs,
  removeModelDuplicate,
} from "#src/utils/helpers/quick-helper.js";
import { atob } from "node:buffer";

const DB_ROOT_PATH = "./db/jsons";
const USERS_JSON_PATH = path.join(DB_ROOT_PATH, "users/data.json");

export default class UserDbServer {
  constructor() {}

  async getUser(id: string) {
    if (!id || id.length === 0) return null;

    try {
      let response: UserModel;
      let rawData: string;

      try {
        rawData = (await FsService.readFile(USERS_JSON_PATH)) as string;
      } catch (readError: any) {
        if (readError?.code === "ENOENT") {
          rawData = "[]";
        } else {
          throw readError;
        }
      }

      const users: UserModel[] = rawData ? JSON.parse(rawData) : [];
      response = users.find((user) => user.id === id);

      if (!response) throw new Error(`User with id: "${id}" not found`);

      return response;
    } catch (error) {
      console.error("[API Server Internal Fetch Error]: ", error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      let responce: UserModel[];
      let rawData: string;

      try {
        rawData = (await FsService.readFile(USERS_JSON_PATH)) as string;
      } catch (readError: any) {
        if (readError?.code === "ENOENT") {
          rawData = "[]";
        } else {
          throw readError;
        }
      }

      responce = rawData ? (JSON.parse(rawData) as UserModel[]) : [];
      return responce;
    } catch (error) {
      throw error;
    }
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

      const users: UserModel[] = JSON.parse(rawData);
      users.push(newUser);
      const cleanUsers = removeModelDuplicate<UserModel>(users, ["id"]);

      await FsService.writeFile(
        USERS_JSON_PATH,
        JSON.stringify(reassignIDs<UserModel>(cleanUsers), null, 2),
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data: UserModel) {
    try {
      schemeValidation<UserModel>(UserScheme, data);

      const tmpUser: UserModel = structuredClone(data);
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

      let wasUpdate: boolean;
      const users: UserModel[] = JSON.parse(rawData);
      const updatedUsers: UserModel[] = users.map((user) => {
        if (user.id === tmpUser.id) {
          wasUpdate = true;
          return tmpUser;
        } else {
          return user;
        }
      });

      if (!wasUpdate) {
        throw new Error(`User with id "${tmpUser.id}" was not found`);
      } else {
        await FsService.writeFile(
          USERS_JSON_PATH,
          JSON.stringify(reassignIDs<UserModel>(updatedUsers), null, 2),
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    if (!id || id.length === 0) return null;

    try {
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

      let deleteUser: UserModel;
      const users: UserModel[] = JSON.parse(rawData);
      let updatedUsers: UserModel[] = [];
      users.map((user) => {
        if (user.id === id) {
          deleteUser = user;
        } else {
          updatedUsers.push(user);
        }
      });

      if (!deleteUser) {
        throw new Error(`User with id '${id}' was not found`);
      } else {
        await FsService.writeFile(
          USERS_JSON_PATH,
          JSON.stringify(reassignIDs<UserModel>(updatedUsers), null, 2),
        );
      }

      return deleteUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllUsers() {
    try {
      let rawData: string;

      try {
        rawData = await FsService.readFile(USERS_JSON_PATH);
      } catch (readError: any) {
        if (readError.code === "ENOENT") {
          rawData = "[]";
        } else {
          throw readError;
        }
      }

      const users: UserModel[] = JSON.parse(rawData) as UserModel[];

      if (!users || users.length === 0) {
        throw new Error("The is no users to delete");
      } else {
        await FsService.writeFile(USERS_JSON_PATH, JSON.stringify([], null, 2));
      }

      return users;
    } catch (error) {
      throw error;
    }
  }
}
