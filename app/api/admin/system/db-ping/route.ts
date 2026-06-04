/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * DB ping route
 *
 * Definering / formål:
 * Trygg intern test-rute som kontrollerer om Vercel/Next.js har kontakt med MariaDB.
 * Ruten returnerer kun status og maskerte miljøvariabler, aldri passord, brukernavn eller host.
 *
 * Bruksområde:
 * Brukes midlertidig for å teste DB-kontakt etter at DB_HOST, DB_PORT, DB_NAME,
 * DB_USER og DB_PASSWORD er lagt inn i Vercel Environment Variables.
 *
 * Berørte sider / routes:
 * - /api/admin/system/db-ping
 *
 * Berørte DB-brytere / feature_keys:
 * - admin.system.db_ping.view
 * - admin.system.database_status.view
 *
 * Berørte API-ruter:
 * - GET /api/admin/system/db-ping
 *
 * Berørte tabeller / views:
 * - none required
 * - optional SELECT 1 only
 *
 * Dataretning:
 * Vercel Environment Variables -> Next.js Route Handler -> MariaDB SELECT 1 -> JSON status.
 *
 * Logging:
 * log_category: admin.system
 * log_action: db.ping
 *
 * Versjon:
 * CT-FILE-DB-PING-0001 / CHANGE-2026-06-05-DB-PING
 */

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DbPingResult = {
  ok: boolean;
  source: "mariadb";
  checked_at: string;
  env: {
    DB_HOST: "set" | "missing";
    DB_PORT: "set" | "missing";
    DB_NAME: "set" | "missing";
    DB_USER: "set" | "missing";
    DB_PASSWORD: "set" | "missing";
  };
  connection?: {
    reachable: boolean;
    select_1?: number;
    response_time_ms: number;
  };
  error?: {
    code: string;
    message: string;
  };
};

function envState(value: string | undefined): "set" | "missing" {
  return value && value.trim() !== "" ? "set" : "missing";
}

function getRequiredEnv() {
  return {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
}

export async function GET() {
  const startedAt = Date.now();
  const env = getRequiredEnv();
  const resultBase = {
    source: "mariadb" as const,
    checked_at: new Date().toISOString(),
    env: {
      DB_HOST: envState(env.host),
      DB_PORT: envState(env.port),
      DB_NAME: envState(env.database),
      DB_USER: envState(env.user),
      DB_PASSWORD: envState(env.password),
    },
  };

  const missing = Object.entries(resultBase.env)
    .filter(([, state]) => state === "missing")
    .map(([key]) => key);

  if (missing.length > 0) {
    const payload: DbPingResult = {
      ok: false,
      ...resultBase,
      error: {
        code: "MISSING_ENV",
        message: `Missing required DB environment variables: ${missing.join(", ")}`,
      },
    };

    return NextResponse.json(payload, { status: 500 });
  }

  let connection: mysql.Connection | null = null;

  try {
    connection = await mysql.createConnection({
      host: env.host,
      port: Number(env.port ?? "3306"),
      database: env.database,
      user: env.user,
      password: env.password,
      connectTimeout: 8000,
      charset: "utf8mb4",
    });

    const [rows] = await connection.query<mysql.RowDataPacket[]>("SELECT 1 AS ok");
    const selectValue = Number(rows?.[0]?.ok ?? 0);

    const payload: DbPingResult = {
      ok: selectValue === 1,
      ...resultBase,
      connection: {
        reachable: selectValue === 1,
        select_1: selectValue,
        response_time_ms: Date.now() - startedAt,
      },
    };

    return NextResponse.json(payload, { status: payload.ok ? 200 : 500 });
  } catch (error) {
    const safeError = error as { code?: string; message?: string };
    const payload: DbPingResult = {
      ok: false,
      ...resultBase,
      connection: {
        reachable: false,
        response_time_ms: Date.now() - startedAt,
      },
      error: {
        code: safeError.code ?? "DB_CONNECTION_FAILED",
        message: safeError.message ?? "Database connection failed.",
      },
    };

    return NextResponse.json(payload, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
