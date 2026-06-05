# Startside filer v8 manifest

## Endring

```txt
CHANGE-2026-06-05-STARTSIDE-FILES-V8
```

## Formål

Lage komplett startsidefilpakke som følger Collectium-regelen:

```txt
Template = design, skall, meny, responsivitet
Sidefiler = innhold og funksjon
Frontend = viser data
MariaDB/API = sannhet
```

## Nye filer

```txt
app/startside/page.tsx
components/templates/CollectiumPublicStartTemplate.tsx
components/templates/CollectiumPublicStartTemplate.module.css
components/layout/CollectiumPublicTopbar.tsx
components/layout/CollectiumPublicTopbar.module.css
components/layout/CollectiumDesignMegaMenu.tsx
components/layout/CollectiumDesignMegaMenu.module.css
components/startside/CollectiumStartside.tsx
components/startside/CollectiumStartsideData.ts
components/startside/CollectiumStartsideSegmentDemo.tsx
```

## Nye assets

```txt
public/collectium-tema/collectium-tema-logo-wide.png
public/collectium-tema/collectium-tema-logo-c.png
public/collectium-tema/collectium-tema-logo-white.png
public/collectium-tema/collectium-tema-familie-samling.png
public/collectium-tema/collectium-tema-samleobjekter.png
public/collectium-tema/collectium-tema-katalog-objekter.png
public/collectium-tema/collectium-tema-auksjon.jpg
public/collectium-tema/collectium-tema-katalog-data.jpg
public/collectium-tema/collectium-tema-verdi-utvikling.png
public/collectium-tema/collectium-tema-anno-2022-konge.png
public/collectium-tema/collectium-tema-anno-2022-heraldikk.png
public/collectium-tema/collectium-tema-anno-2022-portrett.png
public/collectium-tema/collectium-tema-anno-2022-bygg.png
```

## Berørte routes

```txt
/startside
/katalog
/medlemskap
/forhandler
/auksjon
/min-side
/samling
/index
/kontakt
/login
```

## Feature keys omtalt i headers

```txt
landing.view
landing.login
landing.register
landing.membership
catalog.view
catalog.history.view
catalog.market.view
auction.view
dealer.view
profile.view
local.template.view
```

## Ikke inkludert

```txt
Ingen DB-write
Ingen API-write
Ingen auth/session-logikk
Ingen katalogdata hardkodet som sannhet
Ingen egen startside-CSS-modul
```

## Kontroll

Etter kopiering:

```bash
npm run build
```

Sjekk `/startside` i Vercel/Next.js.
