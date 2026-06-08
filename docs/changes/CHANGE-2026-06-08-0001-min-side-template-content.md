# CHANGE-2026-06-08-0001 â€” Min side template-content

## Status
KLAR FOR TEST

## Hva er endret
- Opprettet / oppdatert `app/min-side/page.tsx`.
- Opprettet `components/min-side/CollectiumMinSideClient.tsx`.
- Opprettet `components/min-side/CollectiumMinSide.module.css`.
- Opprettet `lib/min-side/get-min-side-data.ts`.
- Opprettet `lib/min-side/min-side-types.ts`.
- Opprettet `app/api/min-side/summary/route.ts`.

## Viktig regel
Min side er nÃ¥ kun innhold inne i eksisterende standard template.
Den lager ikke:
- egen sidebar
- egen topbar
- egen AppShell
- egen body/html
- egen global bakgrunn
- egen global template

## Git-kommando
Scriptet kjÃ¸rer selv:
- npm run build
- git status
- git add relevante filer
- git commit
- git push

## Svar til ChatGPT
Min side fÃ¸lger nÃ¥ standard template og bruker ikke egen sidebar/topbar. Global sidebar/topbar/template skal fortsatt komme fra eksisterende Collectium layout.
