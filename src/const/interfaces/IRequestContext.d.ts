import type { IncomingMessage } from "node:http";
export interface IRequestContext {
    req: IncomingMessage;
    entityId: Record<string, string>;
    body: any;
}
//# sourceMappingURL=IRequestContext.d.ts.map