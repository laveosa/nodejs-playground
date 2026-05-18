import * as http from "node:http";
import ApiService from "#src/utils/services/api/api-service.js";
import { ENV_CONFIG } from "#src/config/env-config.js";
const serverConfig = {};
export function runDbServer() {
    const server = http.createServer(serverConfig);
    server.on("request", async (req, res) => {
        await ApiService.mapEntityControllers(req, res);
    });
    server.listen(ENV_CONFIG.DB_PORT, () => console.log(`[DB-SERVER] running on port: ${ENV_CONFIG.DB_PORT}`));
}
//# sourceMappingURL=db-server.js.map