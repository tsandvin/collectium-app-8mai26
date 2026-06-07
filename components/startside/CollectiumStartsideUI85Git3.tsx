import styles from "./CollectiumStartsideUI85Git3.module.css";

const skins = [
  "Collectium lys",
  "Enkel lys",
  "Museum mørk",
  "Finans mørk",
];

export default function CollectiumStartsideUI85Git3() {
  return (
    <main className={styles.page}>
      <section className={styles.skinBar} aria-label="Fire Collectium skin">
        {skins.map((skin, index) => (
          <span key={skin} className={index === 0 ? styles.activeSkin : ""}>
            {skin}
          </span>
        ))}
      </section>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Katalog</p>
          <h1>Katalogen viser objektet i sammenheng.</h1>
          <p className={styles.lead}>
            Periodefilteret viser overlapp mellom konger, signaturer, motiv og finansperioder.
            Visningskortet bytter innhold etter Samler, Historie, Finans og objektgruppe.
          </p>
        </div>

        <div className={styles.objectSwitch}>
          <button className={styles.active}>Seddel</button>
          <button>Mynt</button>
        </div>
      </section>

      <section className={styles.periodPanel}>
        <div className={styles.periodHeader}>
          <div>
            <p className={styles.kicker}>Periodefilter</p>
            <h2>Oscar II · 1872–1905</h2>
            <p>Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.</p>
          </div>

          <div className={styles.periodButtons}>
            <button className={styles.active}>Konge</button>
            <button>Signatur</button>
            <button>Motiv/person</button>
            <button>Finans</button>
          </div>
        </div>

        <div className={styles.timeline}>
          <span>Oscar I<br />1844–1859</span>
          <span>Karl XV<br />1859–1872</span>
          <span className={styles.selected}>Oscar II<br />1872–1905</span>
          <span>Haakon VII<br />1905–1957</span>
          <span>Olav V<br />1957–1985</span>
        </div>
      </section>

      <section className={styles.contentGrid}>
        <div>
          <div className={styles.tabs}>
            <button>Samler</button>
            <button className={styles.active}>Historie</button>
            <button>Finans</button>
          </div>

          <article className={styles.card}>
            <div className={styles.note}>
              <strong>100</strong>
              <span>NORGES BANK<br />1872–1905</span>
            </div>

            <div className={styles.info}>
              <h2>100 kroner · 1877</h2>
              <div className={styles.fields}>
                <p><span>Valørutgave</span><b>100 kroner</b></p>
                <p><span>Utgave</span><b>1. utgave</b></p>
                <p><span>Variant / type</span><b>Standardutgave</b></p>
                <p><span>Sjeldenhet</span><b>Sjelden</b></p>
              </div>
              <p className={styles.meta}>Seddel · Norske sedler · Oscar II · NS 1459</p>
            </div>

            <aside className={styles.actions}>
              <button>♡ Hjerte <b>0</b></button>
              <button>☆ Stjerne <b>0</b></button>
              <button>⚒ Auksjon <b>3</b></button>
              <button>▦ Nettbutikk <b>1</b></button>
              <div className={styles.price}>Estimert pris<br /><strong>15 000 kr</strong></div>
            </aside>
          </article>

          <section className={styles.dynamic}>
            <h3>Historie · dynamisk felt</h3>
            <div className={styles.dynamicGrid}>
              <p><span>Regent / konge</span><b>Oscar II</b></p>
              <p><span>Periode</span><b>1872–1905</b></p>
              <p><span>Signatur</span><b>Winge / Getz</b></p>
              <p><span>Motiv / person</span><b>Riksvåpen</b></p>
              <p><span>Historisk kontekst</span><b>Unionstid, norsk seddelhistorie</b></p>
              <p><span>Forklaring</span><b>Objektet kobles til regent, signatur og motiv/person.</b></p>
            </div>

            <div className={styles.links}>
              <a href="/katalog">Åpne objekt</a>
              <a href="/katalog">Se relasjon</a>
              <a href="/katalog">Legg i samling</a>
            </div>
          </section>
        </div>

        <aside className={styles.membership}>
          <p className={styles.kicker}>Medlemskap</p>
          <h2>Medlemskap og katalogtilgang</h2>
          <p>
            Som medlem kan du organisere din samling og bruke katalogen som arbeidsverktøy.
            Tilgangsnivået bestemmer hvor dypt du kan filtrere, sammenligne og lese historiske,
            samlermessige og finansielle datalag.
          </p>

          <dl>
            <div><dt>Free</dt><dd>Enkel katalogvisning</dd></div>
            <div><dt>Bronze</dt><dd>Samling og brukerstatus</dd></div>
            <div><dt>Silver</dt><dd>Flere katalogfiltre</dd></div>
            <div><dt>Gold</dt><dd>Dypere innsikt</dd></div>
            <div><dt>Platinum</dt><dd>Full filterdybde</dd></div>
          </dl>
        </aside>
      </section>
    </main>
  );
}
