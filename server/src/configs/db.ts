import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {relations} from "../db/schema.js"


export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 5,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 10000,
  query_timeout: 5000
});

const db = drizzle({client: pool, relations });


export default db;
