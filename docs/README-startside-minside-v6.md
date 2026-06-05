# Collectium startside + Min side v6

Denne pakken lager ny `/startside` og ny `/min-side` for Next.js/React.

## Innhold

```txt
app/startside/page.tsx
app/min-side/page.tsx
components/collectium/layout/CollectiumAppShellV6.tsx
components/collectium/layout/CollectiumAppShellV6.module.css
components/collectium/startside/CollectiumStartsideV6.tsx
components/collectium/startside/CollectiumStartsideV6.module.css
components/collectium/minside/CollectiumMinsideV6.tsx
components/collectium/minside/CollectiumMinsideV6.module.css
scripts/apply-collectium-startside-minside-v6.ps1
```

## Viktig installasjonsregel

Hvis prosjektet allerede har global `AppShell`, `Topbar` og `Sidebar` i `app/layout.tsx`, skal man ikke bruke `CollectiumAppShellV6` inne i sidene. Da skal sidene kun rendere:

```tsx
<CollectiumStartsideV6 />
<CollectiumMinsideV6 />
```

Hvis prosjektet ikke har globalt skall, kan sidene i denne pakken brukes slik de ligger.

## Ruter

```txt
/startside
/min-side
```

## Midlertidige data

Min side bruker midlertidige visningsdata. De skal senere erstattes av API-respons fra:

```txt
GET /api/profile/overview
GET /api/membership/status
GET /api/collection/summary
GET /api/profile/activity
GET /api/profile/notifications
```

## DB-/feature-prinsipp

Alle systemhandlinger skal senere kobles til:

```txt
feature_key
access_rule
action_route
API
read_view / write_table
logging
```

Frontend skal ikke bestemme tilgang, medlemskap, markedsverdi, samlingsstatus eller katalogdata alene.

## Test

Etter kopiering:

```powershell
npm run build
```

Hvis prosjektet har lint/typecheck:

```powershell
npm run lint
npm run typecheck
```
