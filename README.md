# Collectium Min side Next.js v3

React / Next.js App Router-pakke for Min side.

## Ruter

- `/minside`
- `/minside/profil`
- `/minside/aktivitet`
- `/minside/samling`
- `/minside/finans`
- `/minside/deling`
- `/minside/innstillinger`
- `/minside/forhandler`
- `/minside/admin`

Alias er også lagt inn for `/min-side/*` og videresender til `/minside/*`.

## Rolle-preview

- `?role=user`
- `?role=dealer`
- `?role=admin`

I produksjon skal dette erstattes med ekte session, medlemskap og DB 8.4 access.

## Viktige regler brukt

- Oversikt er ren inngang/statusside.
- Profil, Aktivitet, Samling, Index/Finans, Deling og Innstillinger er egne sidevisninger.
- Forhandler og Admin er egne rolleflater.
- Vanlig frontend viser ikke DB-navn, API-ruter eller feature keys.
- Aktivitet har venstrefilter over 700px og filter over resultat under 700px.
- Samling bruker katalog-lignende filter, segmenter og visningsvalg.
- Alle felter bruker globale klasser, ikke side-spesifikt skall.

## Kjøring

```bash
npm install
npm run dev
```
