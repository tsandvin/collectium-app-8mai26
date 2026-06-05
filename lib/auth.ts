/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium server-auth mot MariaDB
 *
 * Definering / formal:
 * Erstatter Better Auth med kontrollert Collectium-auth basert paa ct_users, ct_user_roles, ct_roles og ct_user_sessions.
 *
 * Bruksomrade:
 * Brukes av API-ruter og serverkode for aa lese session, validere bruker og hente roller.
 *
 * Berorte sider / routes:
 * - /login
 * - /min-side
 * - /admin
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
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: session
 *
 * Versjon:
 * CT-FILE-LIB-AUTH-MARIADB-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { dbExecute, dbQuery } from "@/lib/db";

export const COLLECTIUM_SESSION_COOKIE = "collectium_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type UserRoleRow = {
  role_key: string | null;
  code?: string | null;
  priority?: number | null;
};

export type CollectiumSessionUser = {
  id: number;
  publicId: string;
  email: string;
  displayName: string;
  publicDisplayName: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
  roles: string[];
  isAdmin: boolean;
  isActive: boolean;
  accountStatus: string;
  emailStatus: string;
  adminApprovalStatus: string;
};

export type CollectiumSession = {
  authenticated: boolean;
  user: CollectiumSessionUser | null;
};

type UserRow = {
  id: number;
  public_id: string;
  email: string;
  display_name: string;
  public_display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string;
  is_admin: number;
  is_active: number;
  account_status: string;
  email_status: string;
  admin_approval_status: string;
};

function tokenHash(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createSessionToken(): string {
  return crypto.randomBytes(48).toString("base64url");
}

function normalizeRole(role: string | null | undefined): string | null {
  if (!role) return null;
  return String(role).trim();
}

export function isPrivilegedRole(role: string): boolean {
  return role === "admin" || role === "super_admin" || role === "superadmin";
}

export function mapUserRow(row: UserRow, roles: string[] = []): CollectiumSessionUser {
  const primaryRole = normalizeRole(row.role) ?? roles[0] ?? "user";
  const roleSet = Array.from(new Set([primaryRole, ...roles.filter(Boolean)]));

  return {
    id: Number(row.id),
    publicId: row.public_id,
    email: row.email,
    displayName: row.display_name,
    publicDisplayName: row.public_display_name,
    firstName: row.first_name,
    lastName: row.last_name,
    role: primaryRole,
    roles: roleSet,
    isAdmin: Boolean(Number(row.is_admin)) || roleSet.some(isPrivilegedRole),
    isActive: Boolean(Number(row.is_active)),
    accountStatus: row.account_status,
    emailStatus: row.email_status,
    adminApprovalStatus: row.admin_approval_status,
  };
}

export async function getUserRoles(userId: number): Promise<string[]> {
  const rows = await dbQuery<UserRoleRow>(
    `SELECT COALESCE(ur.role_key, r.role_key, r.code) AS role_key, r.code, r.priority
     FROM ct_user_roles ur
     LEFT JOIN ct_roles r ON r.id = ur.role_id
     WHERE ur.user_id = ?
     ORDER BY COALESCE(r.priority, 0) DESC`,
    [userId],
  );

  return rows
    .map((row) => normalizeRole(row.role_key ?? row.code))
    .filter((role): role is string => Boolean(role));
}

export async function getUserById(userId: number): Promise<CollectiumSessionUser | null> {
  const rows = await dbQuery<UserRow>(
    `SELECT id, public_id, email, display_name, public_display_name, first_name, last_name,
            role, is_admin, is_active, account_status, email_status, admin_approval_status
     FROM ct_users
     WHERE id = ?
     LIMIT 1`,
    [userId],
  );

  if (!rows.length) return null;
  const roles = await getUserRoles(Number(rows[0].id));
  return mapUserRow(rows[0], roles);
}

async function getSessionTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COLLECTIUM_SESSION_COOKIE)?.value ?? null;
}

async function findSessionUserByToken(token: string): Promise<CollectiumSessionUser | null> {
  const hashed = tokenHash(token);

  const sessionLookups = [
    {
      title: "token_hash",
      sql: `SELECT user_id FROM ct_user_sessions WHERE token_hash = ? AND (expires_at IS NULL OR expires_at > NOW()) LIMIT 1`,
      params: [hashed],
    },
    {
      title: "session_token_hash",
      sql: `SELECT user_id FROM ct_user_sessions WHERE session_token_hash = ? AND (expires_at IS NULL OR expires_at > NOW()) LIMIT 1`,
      params: [hashed],
    },
    {
      title: "session_token_plain",
      sql: `SELECT user_id FROM ct_user_sessions WHERE session_token = ? AND (expires_at IS NULL OR expires_at > NOW()) LIMIT 1`,
      params: [token],
    },
  ];

  for (const lookup of sessionLookups) {
    try {
      const rows = await dbQuery<{ user_id: number }>(lookup.sql, lookup.params);
      if (rows.length) {
        return getUserById(Number(rows[0].user_id));
      }
    } catch {
      // ct_user_sessions schema varies between environments. Try next known shape.
    }
  }

  return null;
}

export async function getCollectiumSession(): Promise<CollectiumSession> {
  const token = await getSessionTokenFromCookie();
  if (!token) {
    return { authenticated: false, user: null };
  }

  const user = await findSessionUserByToken(token);
  if (!user || !user.isActive || user.accountStatus !== "active") {
    return { authenticated: false, user: null };
  }

  return { authenticated: true, user };
}

export async function persistSession(userId: number, token: string): Promise<void> {
  const hashed = tokenHash(token);

  const attempts = [
    {
      sql: `INSERT INTO ct_user_sessions (user_id, token_hash, expires_at, created_at, updated_at)
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), NOW(), NOW())`,
      params: [userId, hashed],
    },
    {
      sql: `INSERT INTO ct_user_sessions (user_id, session_token_hash, expires_at, created_at, updated_at)
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), NOW(), NOW())`,
      params: [userId, hashed],
    },
    {
      sql: `INSERT INTO ct_user_sessions (user_id, session_token, expires_at, created_at, updated_at)
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY), NOW(), NOW())`,
      params: [userId, token],
    },
  ];

  let lastError: unknown = null;
  for (const attempt of attempts) {
    try {
      await dbExecute(attempt.sql, attempt.params);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Kunne ikke opprette ct_user_sessions-rad.");
}

export async function destroyCurrentSession(): Promise<void> {
  const token = await getSessionTokenFromCookie();
  if (!token) return;

  const hashed = tokenHash(token);
  const attempts = [
    { sql: `DELETE FROM ct_user_sessions WHERE token_hash = ?`, params: [hashed] },
    { sql: `DELETE FROM ct_user_sessions WHERE session_token_hash = ?`, params: [hashed] },
    { sql: `DELETE FROM ct_user_sessions WHERE session_token = ?`, params: [token] },
  ];

  for (const attempt of attempts) {
    try {
      await dbExecute(attempt.sql, attempt.params);
    } catch {
      // Ignore incompatible session-column shapes.
    }
  }
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
