import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";
export default class DbServiceRouting {
    constructor();
    static route(req: IncomingMessage, res: ServerResponse): Promise<void>;
    private static getEntityController;
}
//# sourceMappingURL=db-server-routing.d.ts.map