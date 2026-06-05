/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium register API
 *
 * Definering / formal:
 * Oppretter ny bruker i ct_users, profil i ct_user_profiles og member-rolle i ct_user_roles.
 *
 * Bruksomrade:
 * Brukes av registreringsskjema. Konto opprettes som aktiv/verifisert for teknisk test, men kan strammes til med e-postverifisering senere.
 *
 * Berorte sider / routes:
 * - /login?mode=register
 * - /sign-up
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.register
 * - auth.membership.create
 *
 * Berorte API-ruter:
 * - POST /api/auth/register
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_profiles
 * - ct_user_roles
 * - ct_roles
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: register
 *
 * Versjon:
 * CT-FILE-API-AUTH-REGISTER-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDbConnection } from '@/lib/db'

function fail(status: number, error_code: string, message: string) {
  return NextResponse.json(
    {
      ok: false,
      feature_key: 'auth.register',
      error_code,
      message,
      data: null,
      errors: [],
    },
    { status },
  )
}

export async function POST(request: Request) {
  let payload: { name?: string; email?: string; password?: string }

  try {
    payload = await request.json()
  } catch {
    return fail(400, 'INVALID_JSON', 'Ugyldig registreringsforesporsel.')
  }

  const email = String(payload.email || '').trim().toLowerCase()
  const name = String(payload.name || '').trim() || email
  const password = String(payload.password || '')

  if (!email || !password) {
    return fail(400, 'MISSING_FIELDS', 'E-post og passord maa fylles ut.')
  }

  if (password.length < 8) {
    return fail(400, 'PASSWORD_TOO_SHORT', 'Passordet maa ha minst 8 tegn.')
  }

  const conn = await getDbConnection()

  try {
    await conn.beginTransaction()

    const [existingRows] = await conn.query('SELECT id FROM ct_users WHERE LOWER(email) = ? LIMIT 1', [email])
    if (Array.isArray(existingRows) && existingRows.length > 0) {
      await conn.rollback()
      return fail(409, 'USER_EXISTS', 'Bruker med denne e-posten finnes allerede.')
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const [insertResult] = await conn.execute(
      `INSERT INTO ct_users (
        public_id, email, password_hash, display_name, public_display_name,
        first_name, last_name, preferred_language, preferred_theme,
        kyc_status, email_status, admin_approval_status, account_status,
        role, is_admin, is_active, created_at, updated_at
      )
      VALUES (
        UUID(), ?, ?, ?, ?,
        ?, ?, 'no', 'dark',
        'not_started', 'verified', 'approved', 'active',
        'member', 0, 1, NOW(), NOW()
      )`,
      [email, passwordHash, name, name, name, ''],
    )

    const userId = Number((insertResult as { insertId?: number }).insertId)

    await conn.execute(
      `INSERT INTO ct_user_profiles (
        user_id, public_member_code, anonymous_display_code, full_name,
        profile_visibility, collection_visibility, profile_status,
        kyc_status, bankid_status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, 'private', 'private', 'incomplete', 'not_started', 'not_started', NOW(), NOW())`,
      [userId, `CT-${userId}`, `ANON-${userId}`, name],
    )

    await conn.execute(
      `INSERT INTO ct_user_roles (user_id, role_id, role_key, granted_by, assigned_by, granted_at, assigned_at)
       VALUES (?, 2, 'member', NULL, NULL, NOW(), NOW())
       ON DUPLICATE KEY UPDATE role_key = 'member', assigned_at = NOW()`,
      [userId],
    )

    await conn.commit()

    return NextResponse.json({
      ok: true,
      feature_key: 'auth.register',
      source: 'mariadb',
      user: {
        id: userId,
        email,
        displayName: name,
        role: 'member',
      },
      message: 'Bruker opprettet. Du kan logge inn.',
      errors: [],
    })
  } catch (error) {
    await conn.rollback()
    return fail(500, 'REGISTER_FAILED', error instanceof Error ? error.message : 'Registrering feilet.')
  } finally {
    conn.release()
  }
}
