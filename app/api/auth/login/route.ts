/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium login API
 *
 * Definering / formal:
 * Logger inn bruker mot ct_users.password_hash med bcryptjs og oppretter Collectium-session.
 *
 * Bruksomrade:
 * Brukes av /login, /sign-in og auth-komponenter.
 *
 * Berorte sider / routes:
 * - /login
 * - /sign-in
 * - /min-side
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
 * - auth.session.create
 *
 * Berorte API-ruter:
 * - POST /api/auth/login
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
 * log_action: login
 *
 * Versjon:
 * CT-FILE-API-AUTH-LOGIN-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { dbExecute, dbQuery } from '@/lib/db'
import { COLLECTIUM_SESSION_COOKIE, createSessionToken, getCookieOptions, getUserRoles, mapUserRow, persistSession } from '@/lib/auth'

type LoginUserRow = {
  id: number
  public_id: string
  email: string
  password_hash: string | null
  display_name: string
  public_display_name: string | null
  first_name: string | null
  last_name: string | null
  role: string
  is_admin: number
  is_active: number
  account_status: string
  email_status: string
  admin_approval_status: string
}

function fail(status: number, error_code: string, message: string) {
  return NextResponse.json(
    {
      ok: false,
      feature_key: 'auth.login',
      error_code,
      message,
      data: null,
      errors: [],
    },
    { status },
  )
}

export async function POST(request: Request) {
  let payload: { email?: string; password?: string }

  try {
    payload = await request.json()
  } catch {
    return fail(400, 'INVALID_JSON', 'Ugyldig login-foresporsel.')
  }

  const email = String(payload.email || '').trim().toLowerCase()
  const password = String(payload.password || '')

  if (!email || !password) {
    return fail(400, 'MISSING_CREDENTIALS', 'E-post og passord maa fylles ut.')
  }

  const rows = await dbQuery<LoginUserRow>(
    `SELECT id, public_id, email, password_hash, display_name, public_display_name, first_name, last_name,
            role, is_admin, is_active, account_status, email_status, admin_approval_status
     FROM ct_users
     WHERE LOWER(email) = ?
     LIMIT 1`,
    [email],
  )

  if (!rows.length || !rows[0].password_hash) {
    return fail(401, 'INVALID_CREDENTIALS', 'Innlogging feilet. Kontroller e-post og passord.')
  }

  const dbUser = rows[0]
  const passwordOk = await bcrypt.compare(password, dbUser.password_hash)

  if (!passwordOk) {
    return fail(401, 'INVALID_CREDENTIALS', 'Innlogging feilet. Kontroller e-post og passord.')
  }

  if (!Number(dbUser.is_active) || dbUser.account_status !== 'active') {
    return fail(403, 'ACCOUNT_INACTIVE', 'Brukeren er ikke aktiv.')
  }

  if (dbUser.email_status !== 'verified') {
    return fail(403, 'EMAIL_NOT_VERIFIED', 'E-postadressen er ikke verifisert.')
  }

  if (dbUser.admin_approval_status !== 'approved') {
    return fail(403, 'ADMIN_APPROVAL_REQUIRED', 'Kontoen venter paa godkjenning.')
  }

  const token = createSessionToken()
  await persistSession(Number(dbUser.id), token)

  await dbExecute(
    `UPDATE ct_users
     SET last_login_at = NOW(), last_active_at = NOW(), is_online = 1, updated_at = NOW()
     WHERE id = ?`,
    [dbUser.id],
  )

  const roles = await getUserRoles(Number(dbUser.id))
  const user = mapUserRow(dbUser, roles)

  const response = NextResponse.json({
    ok: true,
    authenticated: true,
    feature_key: 'auth.login',
    source: 'mariadb',
    user,
    redirectTo: user.isAdmin ? '/admin' : '/min-side',
    errors: [],
  })

  response.cookies.set(COLLECTIUM_SESSION_COOKIE, token, getCookieOptions())
  return response
}
