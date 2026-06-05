# Collectium startside filer v8

Dette er en produksjonsrettet filpakke for `/startside`.

## Innhold

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
public/collectium-tema/*
```

## Viktig designregel

Startsiden eier ikke egen design.

- `/app/startside/page.tsx` er bare route/metadata.
- `components/startside/*` er innhold, tekst, bilder og interaksjon.
- `components/templates/*` og `components/layout/*` er template-/skall-lag.
- Farge og skin skal hentes fra global designmotor/tokens.

Finansfarge er derfor ikke låst i startsiden. Den skal komme fra global template/skin.

## Toppmeny

Toppmenyen er public toppmeny uten sidemeny:

- logo til venstre
- menyvalg midtstilt
- søkeikon
- Design-megameny
- Logg inn / Min side
- Kom i gang gratis

## Bilder

Bilder ligger i:

```txt
public/collectium-tema/
```

Brukes med URL:

```txt
/collectium-tema/filnavn.png
```

## Installasjon

Kopier filene inn i Next.js-prosjektet med samme mappestruktur.

Hvis prosjektet allerede har filer med samme navn, ta snapshot eller commit før overskriving.

## Kontroll etter kopiering

Kjør:

```bash
npm run build
```

Kontroller deretter:

```txt
/startside
```

## Notat

Denne pakken legger ikke inn API-kall, DB-kall eller brukerhandlinger som skriver til MariaDB. Den er public startside og følger modellen:

```txt
MariaDB/API senere -> Next.js -> React -> UI
```
