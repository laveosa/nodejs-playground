import type { IncomingMessage, ServerResponse } from "node:http";
export default class UserController {
    static entityService: any;
    static requestHandler(req: IncomingMessage, res: ServerResponse): Promise<void>;
    private static routeMap;
    private static apiServiceHandler;
    private static setEntityService;
}
//# sourceMappingURL=user-controller.d.ts.map