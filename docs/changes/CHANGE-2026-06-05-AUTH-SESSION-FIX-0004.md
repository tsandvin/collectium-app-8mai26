# CHANGE-2026-06-05-AUTH-SESSION-FIX-0004

## Overskrift
Fiks login 500 etter passordgodkjenning.

## Årsak
`ct_user_sessions` i MariaDB har kolonnen `session_token_hash`, men ikke `updated_at`.

Tidligere auth-kode forsøkte først:

```sql
INSERT INTO ct_user_sessions (..., session_token_hash, ..., updated_at)
```

Dette kunne gi 500 etter at passordet var riktig.

## Endringer
- `lib/auth.ts`
  - `persistSession()` bruker nå først faktisk DB-form:
    - `session_token_hash`
    - `expires_at`
    - `created_at`
    - `started_at`
    - `last_seen_at`
    - `device_type`
  - `updated_at` brukes ikke lenger i session insert.
  - logout/revoke bruker `revoked_at` og `ended_at` når mulig.

- `app/api/auth/login/route.ts`
  - hele login flyten er pakket i kontrollert try/catch.
  - API returnerer JSON ved intern auth-feil i stedet for blank/HTML 500.

## Test
Etter patch:
- `npm.cmd run build`
- `npm.cmd run dev`
- `POST /api/auth/login`
