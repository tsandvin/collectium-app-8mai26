/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideClean
 *
 * Definering / formål:
 * Ren startsidekomponent for Collectium.
 * Komponenten eier ikke globalt skall, topbar, sidebar eller body/html.
 * Den bruker bare globale template-klasser.
 *
 * Bruksområde:
 * /startside og /
 *
 * Berørte sider / routes:
 * - /
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.membership
 * - catalog.view
 *
 * Berørte API-ruter:
 * - Ingen direkte i denne statiske førsteversjonen
 *
 * Berørte tabeller / views:
 * - Ingen direkte i denne statiske førsteversjonen
 *
 * Dataretning:
 * Template/layout → statisk presentasjonsinnhold → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-STARTSIDE-CLEAN-0001 / CHANGE-REINSTALL-4-SKINS
 */

import Link from "next/link";

const areas = [
  {
    title: "Samler",
    text: "Bygg samling, ønskeliste, favoritter og egne transaksjoner rundt samme katalogobjekt.",
  },
  {
    title: "Historie",
    text: "Se relasjoner mellom sedler, mynter, perioder, regenter, personer, utgaver og hendelser.",
  },
  {
    title: "Finans",
    text: "Følg verdi, trend, markedsdata, auksjon, nettbutikk og utvikling over tid.",
  },
];

const memberships = [
  ["Free", "Start med offentlig katalogutdrag og enkel utforsking."],
  ["Bronze", "For samlere som vil lagre objekter og bruke grunnleggende funksjoner."],
  ["Silver", "For aktive samlere med behov for bedre filter, historikk og marked."],
  ["Gold", "For forhandlernær bruk, dypere data og avansert samlerarbeid."],
  ["Platinum", "For full tilgang, flere kilder, analyse, eksport og profesjonell bruk."],
] as const;

export function CollectiumStartsideClean(): JSX.Element {
  return (
    <section className="ct-startside">
      <div className="ct-hero">
        <div className="ct-hero-copy">
          <p className="ct-kicker">Norske sedler · mynter · historie · marked</p>
          <h1>Collectium</h1>
          <p className="ct-lead">
            Samlerplattformen for katalog, samling, relasjoner, auksjon og markedsutvikling.
          </p>

          <div className="ct-actions">
            <Link href="/katalog">Utforsk katalogen</Link>
            <Link href="/sign-up">Bli medlem</Link>
            <Link href="/login">Logg inn</Link>
          </div>
        </div>

        <div className="ct-hero-panel">
          <span className="ct-panel-label">Samme katalog · tre perspektiver</span>
          <div className="ct-segment-row">
            <strong>Samler</strong>
            <strong>Historie</strong>
            <strong>Finans</strong>
          </div>
          <p>
            Ett katalogobjekt kan brukes i samling, objektpresentasjon, auksjon,
            nettbutikk, historisk visning og markedsanalyse.
          </p>
        </div>
      </div>

      <div className="ct-section">
        <div className="ct-section-head">
          <p className="ct-kicker">I. Hva vil du utforske</p>
          <h2>Collectium samler katalog, historie og marked i én arbeidsflate.</h2>
        </div>

        <div className="ct-card-grid">
          {areas.map((area) => (
            <article key={area.title} className="ct-info-card">
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="ct-section ct-section-soft">
        <div className="ct-section-head">
          <p className="ct-kicker">II. Katalogen</p>
          <h2>Relasjonskatalog for objekter, personer, perioder og verdi.</h2>
          <p>
            Katalogen skal ikke være en flat produktliste. Den skal vise objektet
            med identitet, utgave, variant, relasjoner, brukerstatus og marked.
          </p>
        </div>

        <div className="ct-object-preview">
          <div className="ct-object-image">Objekt</div>
          <div>
            <p className="ct-kicker">Eksempelvisning</p>
            <h3>1 krone · 1917-serien · Litra A</h3>
            <p>
              Katalogkortet peker videre til full objektpresentasjon med Samler,
              Historie og Finans som egne visningslag.
            </p>
            <div className="ct-chip-row">
              <span>Samler</span>
              <span>Historie</span>
              <span>Finans</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ct-section">
        <div className="ct-section-head">
          <p className="ct-kicker">III. Medlemskap</p>
          <h2>Velg nivå etter hvor aktiv samler eller forhandler du er.</h2>
        </div>

        <div className="ct-plan-grid">
          {memberships.map(([name, text]) => (
            <article key={name} className="ct-plan-card">
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollectiumStartsideClean;
