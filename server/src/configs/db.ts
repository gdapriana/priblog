import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { relations } from "../db/schema.js";
import { type Logger } from "drizzle-orm";
import { logger } from "./logger.js";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 5,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 10000,
  query_timeout: 5000,
});

const drizzleLogger: Logger = {
  logQuery(query, params) {
    logger.debug("Database query", {
      sql: query,
      parameterCount: params.length,
    });
  },
};

const db = drizzle({ client: pool, relations, logger: drizzleLogger });

export default db;
