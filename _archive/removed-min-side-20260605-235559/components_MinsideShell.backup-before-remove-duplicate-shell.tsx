/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * MinsideShell
 *
 * Definering / formål:
 * Ren innholdskomponent for Min side.
 * Skal ikke eie global template, AppShell, Sidebar, Topbar,
 * PageFrame, body, html, bakgrunn eller globalt skall.
 *
 * Bruksområde:
 * Brukes av /min-side som innhold inne i eksisterende global Collectium-layout.
 *
 * Berørte sider / routes:
 * - /min-side
 *
 * Berørte DB-brytere / feature_keys:
 * - profile.view
 * - membership.view
 * - collection.view
 * - activity.view
 * - notifications.view
 * - processes.view
 * - messages.view
 * - settings.view
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Viktig regel:
 * Global layout styres kun av app/layout.tsx og original global shell.
 * Min side skal ikke lage eget ct-app-shell, sidebar, topbar eller template.
 */

export default function MinsideShell() {
  return (
    <section className="ct-minside-content" data-page="min-side">
      <header className="ct-page-header">
        <p className="ct-eyebrow">Min side</p>
        <h1>Din Collectium-oversikt</h1>
        <p>
          Profil, medlemskap, samling, varsler, prosesser, meldinger, kjøp,
          salg og innstillinger samlet på ett sted.
        </p>
      </header>

      <div className="ct-dashboard-grid">
        <article className="ct-panel">
          <h2>Profil og medlemskap</h2>
          <p>
            Se brukerinformasjon, medlemsnivå, tilgang, varighet og aktive
            Collectium-funksjoner.
          </p>
        </article>

        <article className="ct-panel">
          <h2>Min samling</h2>
          <p>
            Oversikt over objekter, ønskeliste, favoritter, samlingsstatus,
            deling og dokumentasjon.
          </p>
        </article>

        <article className="ct-panel">
          <h2>Aktivitet og varsler</h2>
          <p>
            Varsler, prosesser, meldinger, kjøp, salg, bud og transaksjonslogg.
          </p>
        </article>

        <article className="ct-panel">
          <h2>Innstillinger</h2>
          <p>
            Administrer sikkerhet, varslinger, deling, profilvalg og
            funksjonstilgang.
          </p>
        </article>
      </div>
    </section>
  );
}
