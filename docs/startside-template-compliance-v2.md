# Collectium startside template-compliant v2

## Formål
Denne pakken erstatter forrige startsidepakke med en versjon der startsiden ikke eier designet.

## Hovedregel

```txt
Template = design, skin, toppbar, designknapp, bakgrunn, rammer, kort, knapper, signatur, responsivitet
Startside = innhold, rekkefølge, tekst, bilder, lenker, data-section og data-tone
```

## Inneholder

```txt
app/startside/page.tsx
components/startside/CollectiumStartside.tsx
components/startside/CollectiumStartsideData.ts
public/globe/*.png
collectium-startside-template-preview.html
collectium-startside-content-only.html
docs/startside-template-compliance-v2.md
```

## Inneholder ikke

```txt
CollectiumStartside.module.css
egen side-CSS
egen topbar
egen sidemeny
egen designknapp-logikk i Next.js-komponenten
egen skin-definisjon i startsiden
synlig feature/API/DB-tekst for kunde
```

## HTML-filene

### collectium-startside-template-preview.html
Brukes bare for lokal visuell kontroll. Den har en innebygd preview-style som simulerer globale template-klasser, slik at siden kan åpnes direkte i nettleser.

Preview-CSS-en er ikke produksjonskode.

### collectium-startside-content-only.html
Content-only HTML. Den lenker til:

```txt
docs/design styles/collectium-template-tokens-v5.css
```

Denne viser hvordan markupen skal være i produksjon uten egen startside-design.

## Next.js-regel
`app/startside/page.tsx` skal rendres i public layout uten sidemeny. Hvis global `app/layout.tsx` pakker alle sider i AppShell med sidebar, må `/startside` ligge i en public route group eller public layout som ikke bruker sidebar.

## Template-klasser brukt

```txt
ct-page
ct-page--public
ct-page--startside
ct-section
ct-section-inner
ct-copy
ct-eyebrow
ct-lead
ct-actions
ct-button
ct-media
ct-card-grid
ct-card
ct-object-preview
ct-segment-switch
ct-object-card
ct-chip-row
```

Disse skal styles av global template/tokens, ikke av startsiden.

## Produksjonsbruk
1. Kopier `app/startside/page.tsx`.
2. Kopier `components/startside/CollectiumStartside.tsx`.
3. Kopier `components/startside/CollectiumStartsideData.ts`.
4. Kopier bildene til `public/globe/` hvis de ikke finnes.
5. Ikke kopier preview CSS inn i prosjektet.
6. La `docs/design styles/collectium-template-tokens-v5.css` og global template styre visuelt uttrykk.
