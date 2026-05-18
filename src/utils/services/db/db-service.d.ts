import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";
export default class DbService {
    constructor();
    static mapEntityControllers(req: IncomingMessage, res: ServerResponse): Promise<void>;
    static getBody<T = unknown>(req: IncomingMessage): Promise<T>;
    static responseErrorHandler(error: unknown, res: ServerResponse, code?: number): void;
    private static getEntityController;
}
//# sourceMappingURL=db-service.d.ts.map