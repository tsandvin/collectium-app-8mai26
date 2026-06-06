# Collectium — Min side, login, hoveddesign, sidebar og topbar v1

Dette er en kontrollert Next.js/React-pakke basert på `collectium-website.zip`, med ny global Collectium shell og nye sider for login og Min side.

## Innhold

```txt
app/layout.tsx
app/page.tsx
app/components/AppShell.tsx
app/components/Sidebar.tsx
app/components/Topbar.tsx
app/login/page.tsx
app/min-side/page.tsx
app/minside/page.tsx
app/sign-in/page.tsx
app/sign-up/page.tsx
components/auth/CollectiumLoginClient.tsx
components/minside/MinsideDashboard.tsx
components/minside/minside-data.ts
app/globals.css
docs/changes/CHANGE-2026-06-05-0001-minside-login-design.md
```

## Viktig

Denne pakken er laget for å erstatte/oppdatere prosjektet kontrollert. Ta snapshot eller commit før du kopierer inn filene.

## Installer og test

```bash
npm install
npm run build
```

Hvis prosjektet bruker pnpm:

```bash
pnpm install
pnpm build
```

## Ruter å teste

```txt
/
/login
/login?mode=register
/min-side
/min-side?role=dealer
/min-side?role=admin
/minside
/sign-in
/sign-up
/katalog
/admin
```

## Designregel

Runtime designvelger er fjernet fra ny shell. Responsivitet styres av globale CSS-regler, og designet er låst til Collectium signature-light.
