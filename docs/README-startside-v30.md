# Collectium startside / landingsside v30

## Status

Dette er en kontrollert Next.js/React-sidepakke for:

```txt
/startside
/landingsside
```

Pakken legger til egne sidefiler, egen template, egen topbar, egen sidemeny og eget innhold for offentlig presentasjon.

## Filer

```txt
app/startside/page.tsx
app/landingsside/page.tsx
components/templates/CollectiumStartTemplate.tsx
components/templates/CollectiumStartTemplate.module.css
components/layout/CollectiumPublicTopbar.tsx
components/layout/CollectiumPublicSidebar.tsx
components/startside/CollectiumStartContent.tsx
public/robots.txt
```

## Regel

Sidefilene skal ikke eie globalt design. Template-laget styrer shell, rammer, topbar, sidemeny, signatur, responsivitet og presentasjonsstil.

## DB/API

Denne versjonen bruker statisk presentasjonsinnhold. Ekte katalog-, marked-, medlemskap- og auksjonsdata skal senere hentes fra API/MariaDB.

## Feature keys som er markert i UI

```txt
landing.view
landing.register
landing.login
landing.membership
catalog.view
index.view
auction.public.view
dealer.public.view
```

## Viktig

Denne pakken overskriver ikke kjernefiler som:

```txt
app/layout.tsx
app/page.tsx
components/layout/AppShell.tsx
styles/globals.css
lib/db/*
```

## Build-feil rettet

Tidligere Vercel-build feilet fordi `CollectiumStartContent.tsx` og `CollectiumStartTemplate.module.css` manglet i commit som Vercel bygget fra. Begge filene er nå lagt inn på `main`.
