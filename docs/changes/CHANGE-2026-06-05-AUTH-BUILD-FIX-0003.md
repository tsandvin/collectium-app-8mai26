# CHANGE-2026-06-05-AUTH-BUILD-FIX-0003

## Overskrift
Andre build-fiks etter Collectium MariaDB-auth migration.

## Formål
Etter build-fix v2 var hovedfeilene redusert til:
- `getAuction` manglet fra `app/actions/collectium.ts`
- `sendDirectMessage` manglet fra `app/actions/collectium.ts`
- `app/meldinger/[partnerId]/page.tsx` importerte fortsatt `user` fra `lib/db/schema`

## Endringer
- `app/actions/collectium.ts`
  - Legger til `getAuction(...)` som alias til `getAuctionById(...)`
  - Legger til `sendDirectMessage(...)` som alias til `sendMessage(...)`

- `app/meldinger/[partnerId]/page.tsx`
  - Fjerner Drizzle/schema-importer.
  - Henter partner via `dbQuery` mot `ct_users`.

## Retning
Ingen reinstallasjon av Better Auth eller PostgreSQL. Videre auth og dataflyt skal gå via Collectium MariaDB-auth og server-side mysql2.
