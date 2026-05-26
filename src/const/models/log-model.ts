import { z } from "zod";
import { LogScheme } from "#src/const/schemes/log-scheme.js";

export type ILogModel = z.infer<typeof LogScheme>;
