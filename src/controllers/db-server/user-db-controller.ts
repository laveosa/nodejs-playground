import UserDbServer from "#src/utils/services/db/user-db-server.js";
import type { IncomingMessage, ServerResponse } from "node:http";
import { getEntityUrl, getUrlParams } from "#src/utils/helpers/url-helper.js";
import { ApiRequestType } from "#src/const/enums/api-request-type.js";
import {
  getRequestBody,
  responseErrorHandler,
} from "#src/utils/helpers/api-helper.js";
import type { IRequestContext } from "#src/const/interfaces/IRequestContext.js";
import type { UserModel } from "#src/const/models/user-model.js";

export default class UserDbController {
  private static entityService = new UserDbServer();

  static async requestHandler(req: IncomingMessage, res: ServerResponse) {
    try {
      const responseData = await this.apiServiceHandler(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseData || { success: true }));
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).isValidationError) {
        res.writeHead(422, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "error",
            message: error.message,
            errors: (error as any).details,
          }),
        );
        return;
      }

      const isNotFound =
        error instanceof Error && error.message.includes("Not Found");
      responseErrorHandler(error, res, isNotFound ? 404 : 400);
    }
  }

  // ========================================================================= PRIVATE

  private static routeMap: Record<
    string,
    (ctx: IRequestContext) => Promise<UserModel | UserModel[] | boolean | void>
  > = {
    [`${ApiRequestType.GET}:/all`]: () => this.entityService.getAllUsers(),
    [`${ApiRequestType.DELETE}:/all`]: () =>
      this.entityService.deleteAllUsers(),
    [`${ApiRequestType.GET}:/single`]: (ctx) =>
      this.entityService.getUser(ctx.entityId.id),
    [`${ApiRequestType.POST}:/single`]: (ctx) =>
      this.entityService.createUser(ctx.body),
    [`${ApiRequestType.PUT}:/single`]: (ctx) =>
      this.entityService.updateUser(ctx.entityId.id, ctx.body),
    [`${ApiRequestType.DELETE}:/single`]: (ctx) =>
      this.entityService.deleteUser(ctx.entityId.id),
  };

  private static async apiServiceHandler(req: IncomingMessage): Promise<any> {
    const rType = req.method as ApiRequestType;
    const eUrl = getEntityUrl(req.url) || "/";
    const routeModifier = eUrl.endsWith("/all") ? "/all" : "/single";
    const lookupKey = `${rType}:${routeModifier}`;
    const action = this.routeMap[lookupKey];

    if (!action) {
      throw new Error(`Route Not Found: ${rType} ${eUrl}`);
    }

    const userId = getUrlParams(req);
    const body = await getRequestBody(req);

    return await action({ req, entityId: userId, body });
  }
}
