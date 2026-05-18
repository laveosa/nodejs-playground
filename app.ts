import { runApiServer } from "#src/servers/api-server.js";
import { runDbServer } from "#src/servers/db-server.js";

runDbServer();
runApiServer();
