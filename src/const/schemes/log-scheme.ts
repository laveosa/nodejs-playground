import { z } from "zod";

export const LogScheme = z.object({
  id: z.string().min(1).max(200),
  timestamp: z.string().min(1).max(200),
  level: z.union([z.literal("INFO"), z.literal("WARN"), z.literal("ERROR")]),
  context: z.string(),
  message: z.string(),
});
