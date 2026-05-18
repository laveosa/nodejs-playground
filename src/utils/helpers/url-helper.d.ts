import type { IncomingMessage } from "node:http";
import { URL } from "node:url";
import type { EntityType } from "#src/const/enums/entity-request.js";
export declare function getEntityChunk(path: string, envChunk: "api" | "db"): EntityType;
export declare function getEntityUrl(path: string, withParams?: boolean): string;
export declare function getUrlParams(request: IncomingMessage): {
    [k: string]: string;
};
export declare function removeUrlParams(path: string): string;
export declare function getRequestFullUrl(request: IncomingMessage): URL;
export declare function isNoise(url: URL): boolean;
//# sourceMappingURL=url-helper.d.ts.map