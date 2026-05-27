import { runApiServer } from "#src/servers/api-server.js";
import { runDbServer } from "#src/servers/db-server.js";
import { runLogServiceOLD } from "#src/servers/log-server_OLD.js";
import { runLogServer } from "#src/servers/log-server.js";

runDbServer();
runApiServer();
runLogServer();
// runLogServiceOLD();
