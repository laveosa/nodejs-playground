import { URL } from "node:url";
import { noiseKeys } from "#src/const/enums/api-request-noise-keys.js";
export function getEntityChunk(path, envChunk = "api") {
    if (!path || path.length === 0)
        return null;
    const pathChunks = path.split("/");
    if (!pathChunks || pathChunks.length === 0)
        return null;
    let entityChunk;
    for (let i = 0; i < pathChunks.length; i++) {
        if (!entityChunk &&
            pathChunks[i] === envChunk &&
            pathChunks[i + 1]?.length > 0) {
            entityChunk = pathChunks[++i];
            break;
        }
    }
    return removeUrlParams(entityChunk);
}
export function getEntityUrl(path, withParams) {
    if (!path || path.length === 0)
        return null;
    const [urlWithoutParams, queryString] = path.split("?");
    if (!urlWithoutParams)
        return null;
    const pathChunks = urlWithoutParams.split("/");
    const apiIndex = pathChunks.indexOf("api");
    if (apiIndex === -1 || apiIndex === pathChunks.length - 1)
        return null;
    const relevantChunks = pathChunks.slice(apiIndex + 1);
    let entityUrl = "/" + relevantChunks.join("/");
    if (withParams && queryString) {
        entityUrl += `?${queryString}`;
    }
    return entityUrl;
}
export function getUrlParams(request) {
    const fullUrl = getRequestFullUrl(request);
    return Object.fromEntries(fullUrl.searchParams);
}
export function removeUrlParams(path) {
    if (!path || path.length === 0)
        return null;
    return path.split("?")[0];
}
export function getRequestFullUrl(request) {
    const isEncrypted = "encrypted" in request.socket && request.socket.encrypted === true;
    const forwardedProto = request.headers["x-forwarded-proto"];
    const protocol = isEncrypted || forwardedProto === "https" ? "https" : "http";
    const host = request.headers.host || "localhost";
    return new URL(request.url || "", `${protocol}://${host}`);
}
export function isNoise(url) {
    if (!url || !noiseKeys || noiseKeys.length === 0)
        return null;
    return noiseKeys.some((key) => url.pathname.includes(key));
}
//# sourceMappingURL=url-helper.js.map