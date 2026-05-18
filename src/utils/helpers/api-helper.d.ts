import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";
export declare function getRequestBody<T = unknown>(req: IncomingMessage): Promise<T>;
export declare function responseErrorHandler(error: unknown, res: ServerResponse, code?: number): void;
//# sourceMappingURL=api-helper.d.ts.map