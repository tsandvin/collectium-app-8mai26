/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Better Auth catch-all deaktivert
 *
 * Definering / formal:
 * Noytraliserer tidligere Better Auth route etter avinstallering. Nye auth-ruter ligger under /api/auth/login, /logout, /session og /register.
 *
 * Bruksomrade:
 * Hindrer build-feil fra gamle Better Auth-importer og gir kontrollert feilmelding dersom gammel endpoint treffes.
 *
 * Berorte sider / routes:
 * - /api/auth/[...all]
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.legacy.disabled
 *
 * Berorte API-ruter:
 * - /api/auth/[...all]
 *
 * Berorte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Ingen DB-skriving. Redirect/feil til ny authmodell.
 *
 * Logging:
 * log_category: auth
 * log_action: legacy.disabled
 *
 * Versjon:
 * CT-FILE-API-AUTH-LEGACY-DISABLED-0001 / CHANGE-2026-06-05-AUTH-MARIADB-0001
 */

import { NextResponse } from 'next/server'

function legacyDisabled() {
  return NextResponse.json(
    {
      ok: false,
      feature_key: 'auth.legacy.disabled',
      error_code: 'BETTER_AUTH_REMOVED',
      message: 'Better Auth er fjernet. Bruk /api/auth/login, /api/auth/logout, /api/auth/session eller /api/auth/register.',
      errors: [],
    },
    { status: 410 },
  )
}

export const GET = legacyDisabled
export const POST = legacyDisabled
export const PUT = legacyDisabled
export const PATCH = legacyDisabled
export const DELETE = legacyDisabled
