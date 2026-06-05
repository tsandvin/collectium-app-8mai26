/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium MariaDB databaseklient
 *
 * Definering / formal:
 * Erstatter PostgreSQL/Drizzle-kobling med server-only MariaDB/mysql2-kobling for Next.js API-ruter og serverkode.
 *
 * Bruksomrade:
 * Brukes av auth, admin, katalog og andre server-side moduler som skal lese/skrive til eksisterende MariaDB.
 *
 * Berorte sider / routes:
 * - /api/auth/login
 * - /api/auth/logout
 * - /api/auth/session
 * - /api/auth/register
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
 * - auth.logout
 * - auth.session
 * - auth.register
 *
 * Berorte API-ruter:
 * - POST /api/auth/login
 * - POST /api/auth/logout
 * - GET /api/auth/session
 * - POST /api/auth/register
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_sessions
 * - ct_user_roles
 * - ct_roles
 * - ct_user_profiles
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: db.connection
 *
 * Versjon:
 * CT-FILE-LIB-DB-MARIADB-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import "server-only";
import mysql, { type Pool, type PoolConnection, type RowDataPacket, type ResultSetHeader } from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var __collectiumMysqlPool: Pool | undefined;
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function createCollectiumPool(): Pool {
  return mysql.createPool({
    host: requiredEnv("DB_HOST"),
    port: Number(process.env.DB_PORT || 3306),
    user: requiredEnv("DB_USER"),
    password: requiredEnv("DB_PASSWORD"),
    database: requiredEnv("DB_NAME"),
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0,
    timezone: "Z",
    charset: "utf8mb4",
  });
}

export const dbPool: Pool = globalThis.__collectiumMysqlPool ?? createCollectiumPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.__collectiumMysqlPool = dbPool;
}

export const pool = dbPool;

export async function dbQuery<T extends RowDataPacket = RowDataPacket>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const [rows] = await dbPool.query<T[]>(sql, params);
  return rows;
}

export async function dbExecute(
  sql: string,
  params: unknown[] = [],
): Promise<ResultSetHeader> {
  const [result] = await dbPool.execute<ResultSetHeader>(sql, params);
  return result;
}

export async function getDbConnection(): Promise<PoolConnection> {
  return dbPool.getConnection();
}

export const db = {
  query: dbQuery,
  execute: dbExecute,
  getConnection: getDbConnection,
  pool: dbPool,
};
