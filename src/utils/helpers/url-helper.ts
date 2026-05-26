import type { IncomingMessage } from "node:http";
import { URL } from "node:url";

import type { EntityType } from "#src/const/enums/entity-request.js";
import { noiseKeys } from "#src/const/enums/api-request-noise-keys.js";

export function getEntityChunk(
  path: string,
  envChunk: "api" | "db",
): EntityType {
  if (!path || path.length === 0) return null;

  const pathChunks: string[] = path.split("/");

  if (!pathChunks || pathChunks.length === 0) return null;

  let entityChunk: string;

  for (let i = 0; i < pathChunks.length; i++) {
    if (
      !entityChunk &&
      pathChunks[i] === envChunk &&
      pathChunks[i + 1]?.length > 0
    ) {
      entityChunk = pathChunks[++i];
      break;
    }
  }

  return removeUrlParams(entityChunk) as EntityType;
}

export function getEntityUrl(
  path: string,
  env: "api" | "db",
  withParams?: boolean,
): string {
  if (!path || path.length === 0) return null;

  const [urlWithoutParams, queryString] = path.split("?");

  if (!urlWithoutParams) return null;

  const pathChunks: string[] = urlWithoutParams.split("/");
  const apiIndex = pathChunks.indexOf(env);

  if (apiIndex === -1 || apiIndex === pathChunks.length - 1) return null;

  const relevantChunks = pathChunks.slice(apiIndex + 1);
  let entityUrl = "/" + relevantChunks.join("/");

  if (withParams && queryString) {
    entityUrl += `?${queryString}`;
  }

  return entityUrl || "/";
}

export function getUrlParams(request: IncomingMessage) {
  const fullUrl = getRequestFullUrl(request);
  return Object.fromEntries(fullUrl.searchParams);
}

export function removeUrlParams(path: string): string {
  if (!path || path.length === 0) return null;
  return path.split("?")[0];
}

export function getRequestFullUrl(request: IncomingMessage): URL {
  const isEncrypted =
    "encrypted" in request.socket && request.socket.encrypted === true;
  const forwardedProto = request.headers["x-forwarded-proto"];
  const protocol = isEncrypted || forwardedProto === "https" ? "https" : "http";
  const host = request.headers.host || "localhost";
  return new URL(request.url || "", `${protocol}://${host}`);
}

export function isNoise(url: URL) {
  if (!url || !noiseKeys || noiseKeys.length === 0) return null;
  return noiseKeys.some((key) => url.pathname.includes(key));
}
