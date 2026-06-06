/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side page
 *
 * Definering / formål:
 * Ren Min side uten gammel V6-komponent.
 * Bruker kun globalt Collectium-skall og rene globale template-klasser.
 *
 * Bruksområde:
 * /min-side
 *
 * Berørte sider / routes:
 * - /min-side
 *
 * Berørte DB-brytere / feature_keys:
 * - user.dashboard.view
 * - user.collection.view
 * - user.membership.view
 *
 * Berørte API-ruter:
 * - Ingen direkte i denne rene førsteversjonen
 *
 * Berørte tabeller / views:
 * - Ingen direkte i denne rene førsteversjonen
 *
 * Dataretning:
 * Global template → statisk dashboardinnhold → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-MINSIDE-CLEAN-0001 / CHANGE-CLEAN-TEMPLATE-CSS
 */

const stats = [
  ["Medlemskap", "Silver", "Aktiv tilgang"],
  ["Min samling", "142", "Objekter registrert"],
  ["Estimert verdi", "186 000 kr", "Mangler verdi på 37 objekter"],
  ["Ønskeliste", "22", "Objekter"],
  ["Favoritter", "14", "Objekter"],
  ["Prosesser", "3", "Krever oppfølging"],
  ["Varsler", "5", "Uleste"],
  ["Meldinger", "2", "Uleste"],
] as const;

export default function MinSidePage(): JSX.Element {
  return (
    <section className="ct-minside-clean">
      <div className="ct-hero">
        <div>
          <p className="ct-kicker">Min side</p>
          <h1>Din Collectium-arbeidsflate</h1>
          <p className="ct-lead">
            Profil, medlemskap, samling, kjøp/salg, prosesser, varsler,
            meldinger og innstillinger samlet i ett kontrollsenter.
          </p>
        </div>

        <div className="ct-info-card">
          <p className="ct-kicker">Samlerprofil</p>
          <h2>Silver</h2>
          <p>Brukernavn · Silver-medlem · Norge</p>
          <div className="ct-chip-row">
            <span>Aktiv</span>
            <span>Samler</span>
          </div>
        </div>
      </div>

      <div className="ct-stat-grid">
        {stats.map(([label, value, note]) => (
          <article key={label} className="ct-stat-card">
            <p className="ct-kicker">{label}</p>
            <strong>{value}</strong>
            <span>{note}</span>
          </article>
        ))}
      </div>

      <div className="ct-section">
        <p className="ct-kicker">Samling</p>
        <h2>Oversikt over samling og brukerstatus</h2>
        <p>
          Her skal Min samling, ønskeliste, favoritter, auksjon, nettbutikk,
          transaksjoner og prosesser samles i rene arkivflater.
        </p>

        <div className="ct-card-grid">
          <article className="ct-info-card">
            <h3>Min samling</h3>
            <p>Samleroversikt, kvalitet, bilder, notater og verdi.</p>
          </article>
          <article className="ct-info-card">
            <h3>Ønskeliste</h3>
            <p>Objekter du følger for senere kjøp eller vurdering.</p>
          </article>
          <article className="ct-info-card">
            <h3>Prosesser</h3>
            <p>Kjøp, salg, innlevering, dokumentasjon og oppgjør.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
