import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

function createDb(): Database | null {
  if (!env.DATABASE_URL) {
    return null;
  }

  const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
  if (env.NODE_ENV !== "production") globalForDb.conn = conn;

  return drizzle(conn, { schema });
}

/**
 * Null until DATABASE_URL is configured. The public campaign site can ship
 * without Postgres; participation endpoints degrade until a DB is wired.
 */
export const db = createDb();
