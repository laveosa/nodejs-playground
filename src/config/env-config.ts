import "dotenv/config";

export const ENV_CONFIG = {
  API_PORT: Number(process.env.API_SERVER_PORT) || 3000,
  DB_PORT: Number(process.env.DB_SERVER_PORT) || 8000,
  LOG_PORT: Number(process.env.LOG_SERVER_PORT) || 8080,
} as const;
