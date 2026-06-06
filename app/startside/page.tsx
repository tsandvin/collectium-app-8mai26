/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside
 *
 * Definering / formål:
 * Første kontrollerte startside for Collectium etter blank reset.
 * Siden skal kun levere innhold. Global template, skall, sidemeny,
 * toppmeny, rammer, skinn og responsivitet skal styres av template-laget.
 *
 * Bruksområde:
 * /startside
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.register
 * - landing.login
 * - landing.membership
 *
 * Berørte API-ruter:
 * - ingen i første statiske versjon
 *
 * Berørte tabeller / views:
 * - ingen i første statiske versjon
 *
 * Dataretning:
 * Første versjon er statisk innhold. Senere:
 * MariaDB → API/backend → Next.js → React → UI
 *
 * Logging:
 * ingen i første statiske versjon
 *
 * Versjon:
 * CT-FILE-STARTSIDE-0001 / CHANGE-2026-06-06-STARTSIDE-INIT
 */

export default function StartsidePage() {
  return (
    <section className="ct-startside-content" aria-label="Collectium startside">
      <p className="ct-startside-kicker">Collectium</p>

      <h1>Samlerplattformen for katalog, historie og marked.</h1>

      <p className="ct-startside-lead">
        Collectium samler katalog, objektpresentasjon, samling, relasjoner,
        auksjon og markedsutvikling i én kontrollert plattform.
      </p>

      <div className="ct-startside-grid" aria-label="Collectium hovedområder">
        <article>
          <h2>Samler</h2>
          <p>
            Bygg Min samling, ønskeliste, favoritter, kjøp/salg og privat
            transaksjonshistorikk.
          </p>
        </article>

        <article>
          <h2>Historie</h2>
          <p>
            Se objekter som relasjoner mellom kilde, land, produsent,
            utgave, personer, periode og historiske hendelser.
          </p>
        </article>

        <article>
          <h2>Finans</h2>
          <p>
            Følg verdi, trend, marked, auksjon, nettbutikk og utvikling over tid.
          </p>
        </article>
      </div>
    </section>
  );
}