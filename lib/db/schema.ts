/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium DB schema placeholders
 *
 * Definering / formal:
 * Noytraliserer tidligere pg-core/Drizzle-schema etter at Better Auth/PostgreSQL er fjernet.
 * MariaDB-sannhet ligger i eksisterende ct_ tabeller og brukes via lib/db/index.ts.
 *
 * Bruksomrade:
 * Beholder trygge type-/tabellnavn for imports som fortsatt peker hit, uten aa importere pg/drizzle-postgres.
 *
 * Berorte sider / routes:
 * - globale serverkomponenter og API-ruter som tidligere importerte schema.ts
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
 * - auth.session
 *
 * Berorte API-ruter:
 * - /api/auth/*
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_roles
 * - ct_roles
 * - ct_user_sessions
 * - ct_user_profiles
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: system
 * log_action: schema.placeholder
 *
 * Versjon:
 * CT-FILE-LIB-DB-SCHEMA-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

export const collectiumTables = {
  users: "ct_users",
  userProfiles: "ct_user_profiles",
  userRoles: "ct_user_roles",
  roles: "ct_roles",
  userSessions: "ct_user_sessions",
  memberships: "ct_memberships",
} as const;

export type CollectiumUser = {
  id: number;
  public_id: string;
  email: string;
  display_name: string;
  public_display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string;
  is_admin: number | boolean;
  is_active: number | boolean;
  account_status: string;
  email_status: string;
  admin_approval_status: string;
};
