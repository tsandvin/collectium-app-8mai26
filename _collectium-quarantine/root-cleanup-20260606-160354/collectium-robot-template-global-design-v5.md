# Collectium Robot Template — Global Design, Farge og Skin V5

**Dokumenttype:** AI-/robotregel for Collectium global template/design  
**Kilde:** `V5 Collectium template designe.zip` → `collectium-design-system.html`  
**Formål:** Gjøre alle designregler, farger, skins, tokens og globale template-detaljer enkle å finne for AI, Codex, utviklere og fremtidige endringer.

---

## 0. AI-finnbar nøkkel

```text
AI_TAGS: collectium, robot template, global design, designmotor, template skin, color tokens, --ct- tokens, Collectium V5, sidebar, topbar, signature frame, ANNO 2022, cards, panels, forms, tabs, catalog cards, museum, finans, enkel, collectium
```

Når AI skal lage eller endre Collectium UI, skal den først søke etter:

```text
collectium robot template global design v5
collectium global design color tokens
collectium template skin collectium enkel museum finans
collectium no page specific design
collectium signature frame anno 2022
```

---

## 1. Låst hovedregel

```text
Design skal ligge i global template/layout/token-lag.
Vanlige sider skal ikke eie designet.
```

Vanlige sider skal **ikke** definere:

```text
bakgrunn
shell/grid
sidemeny
toppmeny
rammer
kortstil
panelstil
skygger
hjørnesignatur
ANNO 2022-stempel
lokale farger
lokale fontsystemer
```

Vanlige sider skal kun levere:

```text
innhold
data
komponentvalg
feature_key/API-kobling
segment/view-state
semantisk struktur
```

Riktig flyt:

```text
Global template/designmotor
→ AppShell / Sidebar / Topbar / PageFrame
→ komponenter som leser --ct-* tokens
→ sideinnhold
```

Ikke:

```text
Sidefil
→ egne farger / egne rammer / egen bakgrunn / egen shadow / egen signatur
```

---

## 2. Fire låste templates/skins

Collectium V5 har fire template-skins. Alle bruker samme token-navn, men med ulike verdier.

| Template | Modus | Bruk | Visuell karakter |
|---|---|---|---|
| `collectium` | Lys standard | Arkiv, samler, hovedidentitet | Pergament, dyp grønn, antikk gull |
| `enkel` | Lys minimalistisk | Moderne appflater, lettlest UI | Hvit/blå, skandinavisk, ren |
| `museum` | Mørk formell | Sjeldne objekter, visning, deling, premium | Koks/svart, antikk gull, galleri |
| `finans` | Mørk datatung | Marked, auksjon, portefølje, analyse | Mørk teal, smaragd, monospace/tabeller |

Teknisk styring:

```html
<html data-template="collectium" data-vp="pc">
```

Tillatte template-verdier:

```text
collectium
enkel
museum
finans
```

Tillatte viewport-verdier:

```text
mobile
tablet
pc
wide
tv
```

Standard:

```text
data-template="collectium"
data-vp="pc"
```

---

## 3. Global tokenregel

Alle farger, flater, rammer, statuser, typografi og radius skal leses fra `--ct-*` tokens.

Komponenter skal bruke:

```css
color: var(--ct-text);
background: var(--ct-card-bg);
border: 1px solid var(--ct-panel-border);
font-family: var(--ct-font-ui);
```

Komponenter skal ikke bruke hardkodede verdier som:

```css
background: #ffffff;
color: #123456;
box-shadow: ...;
border-color: #ccc;
```

Unntak kan bare ligge i global template/tokens-fil.

---

## 4. Hovedtokens

| Token | Rolle | Bruk |
|---|---|---|
| `--ct-app-bg` | Hovedbakgrunn | `<body>` / app-flate |
| `--ct-app-sidebar-bg` | Sidemeny | Sidebar-gradient |
| `--ct-app-topbar-bg` | Topbar | Toppmeny med blur |
| `--ct-panel-bg` | Panel | Hero/store paneler |
| `--ct-panel-solid` | Solid panel | Knapper/input der transparens ikke passer |
| `--ct-card-bg` | Kort | Fakta-, KPI- og katalogkort |
| `--ct-panel-border` | Ramme | Standard kort/panelramme |
| `--ct-border-strong` | Sterk ramme | Hover/fokus/aktiv |
| `--ct-line` | Skillelinje | Stiplede/innvendige linjer |
| `--ct-text` | Primærtekst | Titler og hovedfakta |
| `--ct-text-soft` | Sekundærtekst | Brødtekst/beskrivelser |
| `--ct-text-muted` | Dempet tekst | Labels/hjelpetekst/manglende verdi |
| `--ct-accent` | Aksent | Primærknapper/lenker/aktiv tilstand |
| `--ct-accent-dark` | Mørk aksent | Hover/fokusring/knappramme |
| `--ct-accent-soft` | Myk aksent | Gull/pastell/dekor/bilder |
| `--ct-signature` | Signatur | Collectium-hjørnesignatur |
| `--ct-watermark` | Vannmerke | ANNO 2022-stempel/dekor |
| `--ct-status-ok` | OK | Godkjent/aktiv/positiv trend |
| `--ct-status-pending` | Venter | Pågående/gul varsling |
| `--ct-status-rejected` | Avvist | Negativ/avvist/deaktivert |
| `--ct-font-display` | Display-font | H1/H2/objekttittel |
| `--ct-font-body` | Brødtekst | Prosa/forklaringer |
| `--ct-font-ui` | UI-font | Knapper/labels/brytere |
| `--ct-font-mono` | Mono | Tall/koder/katalognummer |
| `--ct-radius` | Stor radius | Hero/store paneler |
| `--ct-radius-card` | Kortradius | Vanlige kort |
| `--ct-radius-pill` | Pilleradius | Chips/status/eyebrow |
| `--ct-content-pad` | Innholdspadding | Sideinnhold |

---

## 5. Template: Collectium

**Bruk:** standard Collectium-identitet, arkiv, samlerflater, hovedsider.  
**Uttrykk:** klassisk samlerarkiv, pergament, dyp grønn, antikk gull.  
**Fontroller:** Display = Playfair Display, Body = Cormorant Garamond, UI = Inter, Mono = IBM Plex Mono.

Viktige farger:

```text
Bakgrunn: #f8f1e6 / #fffaf2 / #f3e2c8
Tekst: #143327
Myk tekst: #3a4a3e
Dempet tekst: #8a7b5a
Aksent: #145c38
Mørk aksent: #0f2e24
Myk aksent/gull: #d6a641
Signatur: #a17a3a
Vannmerke: #9c3a1f
```

---

## 6. Template: Enkel

**Bruk:** moderne og lettlest appflate, mindre dekor.  
**Uttrykk:** hvit/blå, skandinavisk, ren, nøytral.  
**Fontroller:** Display = Fraunces, Body = Inter.

Viktige farger:

```text
Bakgrunn: #f8fbff / #ffffff / #eef5fc
Tekst: #0b2a4a
Myk tekst: #3a4b62
Dempet tekst: #7a8aa0
Aksent: #1e5a9a
Mørk aksent: #0b2a4a
Myk aksent: #9fcdb2
Signatur: #1e5a9a
Vannmerke: #1e5a9a
```

---

## 7. Template: Museum

**Bruk:** objekter med høy verdi, sjeldne objekter, visning, eksterne delinger, museumspresentasjon.  
**Uttrykk:** mørk koks, antikk gull, formelt galleri.  
**Fontroller:** Display = Cinzel, Body = Source Serif 4, UI = Cinzel/Inter.

Viktige farger:

```text
Bakgrunn: #1a1a1c / #0d0d0e
Tekst: #e8e3d6
Myk tekst: #c5bea9
Dempet tekst: #7a7568
Aksent: #b99a55
Mørk aksent: #a17a3a
Myk aksent: #d6c082
Signatur: #a17a3a
Vannmerke: #b99a55
```

---

## 8. Template: Finans

**Bruk:** auksjon, marked, portefølje, økonomi, analyse, datatunge flater.  
**Uttrykk:** mørk teal, smaragdgrønn aksent, tabeller, ticker, tall.  
**Fontroller:** Display/Body/UI = IBM Plex Sans, Mono = IBM Plex Mono.

Viktige farger:

```text
Bakgrunn: #162028 / #111a21
Tekst: #dde6ed
Myk tekst: #a8b8c5
Dempet tekst: #6b7d8c
Aksent: #27a777
Mørk aksent: #1f8a5f
Myk aksent: #b08a3e
Signatur: #27a777
Vannmerke: #27a777
Avvist/negativ: #d04b4b
```

---

## 9. App-shell-regel

Global app-shell skal styre:

```text
Sidebar
Topbar
Content area
PageFrame
PageContent
MobileMenu
Design/skin state hvis aktivert
```

Shell-geometri i V5:

```text
--ct-sidebar-w: 264px
--ct-topbar-h: 72px
--ct-content-pad: 32px
--ct-radius: 14px
--ct-radius-card: 10px
--ct-radius-pill: 99px
```

Sidebar bruker:

```css
background: var(--ct-app-sidebar-bg);
color: var(--ct-app-sidebar-text);
```

Topbar bruker:

```css
background: var(--ct-app-topbar-bg);
border-bottom: 1px solid var(--ct-app-topbar-border);
backdrop-filter: blur(12px);
```

Innholdsområdet arver:

```css
background: var(--ct-app-bg);
```

---

## 10. Collectium-signatur

Alle informasjonsbokser, kort og paneler skal kunne ha Collectium-signatur i hjørnet.

Regel:

```text
Signatur skal ligge i template/global komponentstil.
Ikke lag signatur på hver side manuelt.
```

Visuelt prinsipp:

```text
________________ Collectium
```

Bruk:

```text
Fakta-kort
KPI-kort
Katalogkort
Objektpanel
Adminpanel
Min side-panel
Relasjonspanel
```

Skal ikke brukes på:

```text
rene knapper
input-felt
små toggles
```

Token:

```css
color: var(--ct-signature);
```

---

## 11. ANNO 2022-stempel

ANNO 2022 er en låst merkevare-/bakgrunnsdetalj.

Innhold:

```text
★ ANNO · 2022 ★
COLLECTIUM
C
EST · MMXXII
```

Regel:

```text
Bruk som global vannmerkedekor, ikke som side-spesifikk pynt.
```

Anbefaling fra V5:

```text
4–6 instanser per side
varierende rotasjon
lav opasitet
styres av --ct-watermark og --ct-watermark-opacity-*
```

Museum kan ha litt høyere opasitet enn lyse skins. Finans skal holde stempelet smaragdgrønt og subtilt.

---

## 12. Komponentregler

### Knapper

```text
Primærknapp: aksentfylt, for hovedhandlinger.
Sekundærknapp: nøytral med ramme.
Disabled: 50% opasitet + cursor:not-allowed.
```

### Eyebrow-piller

```text
Korte kontekstmerker, maks ca. 4 ord.
Brukes over titler.
```

### Kort og paneler

Alle kort skal bruke:

```css
background: var(--ct-card-bg);
border: 1px solid var(--ct-panel-border);
border-radius: var(--ct-radius-card);
```

### Skjema

Input/select/textarea skal bruke:

```css
background: var(--ct-app-search-bg);
border: 1px solid var(--ct-panel-border);
```

Fokus:

```css
border-color: var(--ct-accent);
box-shadow: 0 0 0 3px color-mix(in srgb, var(--ct-accent) 18%, transparent);
```

### Faner

```text
Aktiv fane = underlinje i --ct-accent.
Ingen tung boksbakgrunn.
Count-badge kan stå etter teksten.
```

### Filterchips

```text
Aktiv = fylt med --ct-accent.
Inaktiv = ramme/soft bakgrunn.
Kan vise count.
```

### Statusmerker

Bruk kun tokenbaserte statusfarger:

```text
--ct-status-ok
--ct-status-pending
--ct-status-rejected
--ct-accent
```

Statusmerker skal være dempede/pastell, ikke massive varselsflater.

---

## 13. Katalogkort og objektkort

Katalogkort skal være inngang til full objektpresentasjon, ikke flate produktkort.

Minimum:

```text
Bilde
Tittel
Katalognummer
Kilde
Objekttype
Land
Produsent/utsteder
Valør
Årstall
Litra/detalj
Valørutgave/serie
Variant/type
Signatur/personer
Regent/konge
Sjeldenhet
Estimert verdi
Trend
Hjerte
Stjerne
Legg til samling
Åpne objekt
```

Teknisk nøkkel:

```text
object_id + object_group + source_key
```

URL-regel:

```text
/objekt/{source_key}/{object_group}/{object_id}
```

---

## 14. Filplassering i Next.js/React

Anbefalt plassering:

```text
styles/collectium-template-tokens-v5.css
components/templates/CollectiumTemplate.tsx
components/templates/CollectiumSignatureFrame.tsx
components/layout/AppShell.tsx
components/layout/Sidebar.tsx
components/layout/Topbar.tsx
docs/ai-rules/collectium-robot-template-global-design-v5.md
```

Designregler skal registreres i dokumentasjon/manifest slik at AI finner dem før kodeendring.

---

## 15. Kodeheader som skal brukes i designfiler

```ts
/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Global Template Design V5
 *
 * Definering / formål:
 * Global designmotor for Collectium: skins, farger, tokens, typografi, rammer, signatur og app-shell.
 *
 * Bruksområde:
 * Brukes av AppShell, Sidebar, Topbar, PageFrame, kort, paneler, skjema, faner og katalog-/objektflater.
 *
 * Berørte sider / routes:
 * - Alle frontend-sider
 *
 * Berørte DB-brytere / feature_keys:
 * - Ingen direkte. Dette er ren template/UI-kontroll.
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Dataretning:
 * MariaDB/API styrer data. Template styrer kun visuell presentasjon.
 *
 * Logging:
 * log_category: design
 * log_action: template.v5.loaded
 *
 * Endringsregel:
 * Vanlige sider skal ikke overstyre dette. Endringer skal gjøres globalt og loggføres.
 */
```

---

## 16. AI-sjekkliste før ny side eller komponent

AI skal sjekke:

```text
1. Bruker siden global AppShell?
2. Bruker siden PageFrame/PageContent?
3. Bruker komponentene --ct-* tokens?
4. Er alle farger tokenbaserte?
5. Er signaturen global, ikke lokal?
6. Er ANNO 2022-stempel globalt, ikke lokalt?
7. Er topbar/sidebar urørt dersom oppgaven ikke gjelder global layout?
8. Er sidefilen fri for lokal bakgrunn, ramme, shadow og shell-styling?
9. Er template-skin brukt via data-template, ikke lokal CSS?
10. Er designendringen dokumentert i manifest/logg?
```

---

## 17. Kort låsetekst for README / AI-instruks

```text
Collectium V5 design styres av global template/designmotor. Fire skins er låst: collectium, enkel, museum og finans. Alle komponenter skal lese farger, typografi, rammer, radius, status og signatur fra --ct-* tokens. Vanlige sider skal ikke definere egne bakgrunner, rammer, shadows, shell, sidebar, topbar eller Collectium-signatur. Endringer i design skal gjøres globalt i template/tokens-laget og dokumenteres før bruk.
```
