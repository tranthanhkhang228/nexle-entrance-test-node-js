function getOptional(name: string): string | null {
  return process.env[name] || null;
}

function getRequired(name: string): string {
  const val = getOptional(name);
  if (!val) {
    throw new Error(`${name} environment variable is required.`);
  }
  return val;
}

// Environments, used globally
export const NODE_ENV = getOptional("NODE_ENV") || "development";
export const IS_DEVELOPMENT = NODE_ENV !== "production";

export const LOG_LEVEL =
  getOptional("LOG_LEVEL") || (IS_DEVELOPMENT ? "DEBUG" : "INFO");

// URLs
export const PORT: number = +(getOptional("PORT") || 8000);

// MySQL
export const KNEX_CONNECTION_STRING = getRequired("TYPEORM_URL");
export const KNEX_LOGGING = getOptional("TYPEORM_LOGGING") || IS_DEVELOPMENT;
export const DB_POOL_SIZE = getOptional("DB_POOL_SIZE") || 30;

export const JWT_SECRET = getRequired("JWT_SECRET");
