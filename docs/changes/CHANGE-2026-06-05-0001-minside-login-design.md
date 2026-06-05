# CHANGE-2026-06-05-0001 — Min side, login, hoveddesign, sidebar og topbar

## Status

Klar som kontrollert Next.js/React-pakke.

## Hva er lagt inn

- Ny global AppShell uten runtime DesignMegaMenu.
- Ny Sidebar med Startside, Katalog, Index/Finans, Auksjon, Min samling, Min side, Meldinger, Forhandler og Admin.
- Ny Topbar med globalt sok, sokemodus, Aktiviteter-megameny, Min side og Login.
- Ny /login-side med login/register i Collectium-skall.
- Ny /min-side-side som rollebasert kontrollsenter for bruker, forhandler og admin.
- /minside, /sign-in og /sign-up beholdes som alias/redirect.
- Global CSS for signature-light standarddesign, responsive regler og Collectium-signatur.

## Viktige regler fulgt

- Vanlige sider lager ikke eget shell.
- Design styres globalt av AppShell, Sidebar, Topbar og globals.css.
- Runtime designvelger, fontslider og viewportknapper er fjernet fra ny shell.
- Min side viser feature_keys og er klar for API-kobling.
- Login bruker eksisterende authClient.

## Ruter

- /
- /login
- /min-side
- /minside -> /min-side
- /sign-in -> /login
- /sign-up -> /login?mode=register

## Neste API-koblinger

- GET /api/profile/overview
- GET /api/activity/feed
- GET /api/collection/summary
- GET /api/dealer/dashboard
- GET /api/admin/overview
