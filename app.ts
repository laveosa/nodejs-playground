import { runApiServer } from "#src/servers/api-server.js";
import { runDbServer } from "#src/servers/db-server.js";
import { runLogService } from "#src/servers/log-server.js";

runDbServer();
runApiServer();
runLogService();
