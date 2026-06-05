# CHANGE-2026-06-05-AUTH-MARIADB-0001

## Tittel
Bytt Better Auth/PostgreSQL til Collectium-auth mot MariaDB.

## Formål
Better Auth og pg er fjernet fra prosjektet. Denne patchen legger inn ny auth-kjerne som bruker Collectium sine eksisterende MariaDB-tabeller.

## Berørte filer

```text
lib/db/index.ts
lib/db/schema.ts
lib/auth.ts
lib/auth-client.ts
app/api/auth/login/route.ts
app/api/auth/logout/route.ts
app/api/auth/session/route.ts
app/api/auth/register/route.ts
app/api/auth/[...all]/route.ts
components/auth/CollectiumLoginClient.tsx
components/auth-form.tsx
components/main-nav.tsx
```

## Berørte tabeller

```text
ct_users
ct_user_profiles
ct_user_roles
ct_roles
ct_user_sessions
```

## Berørte feature keys

```text
auth.login
auth.logout
auth.session
auth.register
auth.legacy.disabled
```

## Kontroll etter installasjon

```powershell
git status --short
npm.cmd run build
```

Søk etter gamle rester:

```powershell
$files = Get-ChildItem -Recurse -File | Where-Object {
  $_.FullName -notmatch "\\node_modules\\" -and
  $_.FullName -notmatch "\\.next\\" -and
  $_.FullName -notmatch "\\.git\\"
}

$files | Select-String -Pattern "better-auth|betterAuth|authClient|signIn|signUp|useSession|drizzle-orm/node-postgres|from 'pg'|from \"pg\"" | Select-Object Path, LineNumber, Line
```

## Merknad
`ct_user_sessions`-skjemaet var ikke fullt bekreftet i loggene. `lib/auth.ts` prover tre kjente tokenkolonne-varianter:

```text
token_hash
session_token_hash
session_token
```

Hvis alle feiler, maa `ct_user_sessions` beskrives og `persistSession()` justeres til faktisk kolonnenavn.
