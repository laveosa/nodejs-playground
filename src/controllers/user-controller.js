import { getEntityUrl, getUrlParams } from "#src/utils/helpers/url-helper.js";
import UserApiService from "#src/utils/services/api/user-api-service.js";
import ApiService from "#src/utils/services/api/api-service.js";
import { ApiRequestType } from "#src/const/enums/api-request-type.js";
import { ENV_CONFIG } from "#src/config/env-config.js";
import UserDbServer from "#src/utils/services/db/user-db-server.js";
export default class UserController {
    static entityService;
    static async requestHandler(req, res) {
        this.entityService = this.setEntityService(req);
        if (!this.entityService)
            return;
        try {
            const responseData = await this.apiServiceHandler(req);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(responseData || { success: true }));
        }
        catch (error) {
            if (error instanceof Error && error.isValidationError) {
                res.writeHead(422, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    status: "error",
                    message: error.message,
                    errors: error.details,
                }));
                return;
            }
            const isNotFound = error instanceof Error && error.message.includes("Not Found");
            ApiService.responseErrorHandler(error, res, isNotFound ? 404 : 400);
        }
    }
    // ========================================================================= PRIVATE
    static routeMap = {
        [`${ApiRequestType.GET}:/all`]: () => this.entityService.getAllUsers(),
        [`${ApiRequestType.DELETE}:/all`]: () => this.entityService.deleteAllUsers(),
        [`${ApiRequestType.GET}:/single`]: (ctx) => this.entityService.getUser(ctx.entityId.id),
        [`${ApiRequestType.POST}:/single`]: (ctx) => this.entityService.createUser(ctx.body),
        [`${ApiRequestType.PUT}:/single`]: (ctx) => this.entityService.updateUser(ctx.entityId.id, ctx.body),
        [`${ApiRequestType.DELETE}:/single`]: (ctx) => this.entityService.deleteUser(ctx.entityId.id),
    };
    static async apiServiceHandler(req) {
        const rType = req.method;
        const eUrl = getEntityUrl(req.url) || "/";
        const routeModifier = eUrl.endsWith("/all") ? "/all" : "/single";
        const lookupKey = `${rType}:${routeModifier}`;
        const action = this.routeMap[lookupKey];
        if (!action) {
            throw new Error(`Route Not Found: ${rType} ${eUrl}`);
        }
        const userId = getUrlParams(req);
        const body = await ApiService.getBody(req);
        return await action({ req, entityId: userId, body });
    }
    static setEntityService(req) {
        switch (req.socket.localPort) {
            case ENV_CONFIG.API_PORT:
                return new UserApiService();
            case ENV_CONFIG.DB_PORT:
                return new UserDbServer();
            default:
                return null;
        }
    }
}
//# sourceMappingURL=user-controller.js.map