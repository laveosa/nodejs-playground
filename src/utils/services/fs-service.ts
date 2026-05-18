import fsP from "node:fs/promises";
import { constants } from "node:fs";

export default class FsService {
  constructor() {}

  static async createFolder(targetPath: string) {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      await fsP.mkdir(targetPath, { recursive: true });
      console.log(`Folder operation complete for: "${targetPath}"`);
    } catch (error) {
      console.error(`Error creating folder: ${error.message}`);
      throw error;
    }
  }

  static async readFile(targetPath: string): Promise<void> {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      return await fsP.readFile(targetPath, "utf8");
    } catch (error) {
      console.error("Failed to read the file:", error);
      throw error;
    }
  }

  static async writeFile(targetPath: string, data: unknown): Promise<void> {
    if (!targetPath || targetPath.length === 0 || !data) return null;

    try {
      await fsP.writeFile(targetPath, data, "utf8");
    } catch (error) {
      console.error("Failed to write JSON file:", error);
      throw error;
    }
  }

  static async deleteFile(targetPath: string) {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      await fsP.unlink(targetPath);
      console.log(`File "${targetPath}" was successfully deleted`);
    } catch (error) {
      console.log(`File "${targetPath}" doesn't exist`);
      throw error;
    }
  }

  static async deleteFolder(targetPath: string) {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      await fsP.rm(targetPath, { recursive: true, force: true });
      console.log(`Folder "${targetPath}" (and contents) successfully deleted`);
    } catch (error) {
      console.log(`Error deleting folder "${targetPath}": ${error.message}`);
      throw error;
    }
  }

  // ======================================================= UTIL OPTIONS

  static async isFileExists(targetPath: string) {
    if (!targetPath || targetPath.length === 0) return null;

    try {
      await fsP.access(targetPath, constants.F_OK);
      return true;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return false;
      }

      throw error;
    }
  }
}
