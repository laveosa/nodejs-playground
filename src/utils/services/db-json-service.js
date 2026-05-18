import fsP from "node:fs/promises";
export default class DbJsonService {
    constructor() { }
    static async writeJson(targetPath, data) {
        console.log("targetPath: ", targetPath);
        console.log("data: ", data);
        const file = await fsP.open(targetPath, "r");
    }
}
//# sourceMappingURL=db-json-service.js.map