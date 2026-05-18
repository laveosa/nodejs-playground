import fsP from "node:fs/promises";

export default class FsService {
  constructor() {}

  static async writeJson(targetPath: string, data: JSON) {
    console.log("targetPath: ", targetPath);
    console.log("data: ", data);

    // const file = await fsP.open(targetPath, "r");
  }
}
