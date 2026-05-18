import "dotenv/config";

export const ENV_CONFIG = {
  API_PORT: Number(process.env.API_SERVER_PORT) || 3000,
  DB_PORT: Number(process.env.DB_SERVER_PORT) || 8000,
  DB_PATH: String(process.env.DB_ROOT_PATH) || "#db/jsons",
} as const;
