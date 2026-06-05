# CHANGE-2026-06-05-AUTH-BUILD-FIX-0002

## Overskrift
Build-fiks etter overgang fra Better Auth/PostgreSQL til Collectium MariaDB-auth.

## Formål
Vercel-build stoppet etter at Better Auth og pg ble fjernet, fordi eldre sider fortsatt importerte `auth` og gamle Drizzle-schema exports.

## Endringer
- `lib/auth.ts`
  - Beholder Collectium MariaDB-auth.
  - Legger til kompatibilitets-export `auth.api.getSession(...)`.

- `app/admin/page.tsx`
  - Fjerner Drizzle-importer.
  - Bruker session fra `auth.api.getSession(...)`.
  - Godkjenner `admin`, `super_admin` og `superadmin`.

- `app/actions/collectium.ts`
  - Erstatter Drizzle/PostgreSQL-importer med mysql2/MariaDB-baserte server actions.
  - Eksporterer samme hovedfunksjoner som eldre sider bruker.

## Ikke gjort
- Full DB 8.4 action-route-kontroll er ikke ferdigstilt i denne patchen.
- Queryene er defensiv overgangskode for å få build grønn.
