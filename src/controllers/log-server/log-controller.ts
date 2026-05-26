import type { ILogModel } from "#src/const/models/log-model.js";
import FsService from "#src/utils/services/fs-service.js";
import { reassignIDs } from "#src/utils/helpers/quick-helper.js";

const LOGS_JSON_PATH = new URL(
  "../../../db/jsons/logs/log-list.json",
  import.meta.url,
).pathname;

export default class LogController {
  static async handleIncomingLog(rawMessage: string) {
    try {
      const logPayload: Omit<ILogModel, "id"> = JSON.parse(rawMessage);
      let rawData = "[]";

      try {
        rawData = (await FsService.readFile(LOGS_JSON_PATH)) as string;
      } catch (readError: any) {
        if (readError.code !== "ENOENT") {
          console.error(
            "[Log Controller File System Error]:",
            readError.message,
          );
          return;
        }
      }

      const logs: ILogModel[] = rawData ? JSON.parse(rawData) : [];
      const newLog: ILogModel = {
        id: "stub",
        timestamp: logPayload.timestamp || new Date().toISOString(),
        level: logPayload.level || "INFO",
        context: logPayload.context || "System",
        message: logPayload.message,
      };

      logs.push(newLog);

      const clearLogs = reassignIDs<ILogModel>(logs);

      await FsService.writeFile(
        LOGS_JSON_PATH,
        JSON.stringify(clearLogs, null, 2),
      );
    } catch (rootError: any) {
      console.error("[Log Controller Frame Worker Crash]:", rootError.message);
    }
  }
}
