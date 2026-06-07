"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV42TemaPreview
 *
 * Definering / formål:
 * Visuell startside-preview basert på Collectium V42/V35-retningen.
 * Bruker lokal Tema-kontroll: Collectium, Enkel, Museum, Finans.
 *
 * Bruksområde:
 * Brukes av /startside for å teste riktig visuell retning før global template-splitt.
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.theme.preview
 * - public.catalog.preview
 *
 * Berørte API-ruter:
 * - Ingen direkte i denne previewen.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Statisk preview-data -> React -> UI
 *
 * Logging:
 * Ingen DB-logging.
 *
 * Versjon:
 * CT-STARTSIDE-V42-TEMA-PREVIEW-0001
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumStartsideV42TemaPreview.module.css";

type TemaKey = "collectium" | "enkel" | "museum" | "finans";

const temaOptions: Array<{ key: TemaKey; label: string }> = [
  { key: "collectium", label: "Collectium" },
  { key: "enkel", label: "Enkel" },
  { key: "museum", label: "Museum" },
  { key: "finans", label: "Finans" },
];

const catalogCards = [
  { value: "100", title: "100 kroner · 1. utgave", meta: "1877 · seddelpapir", price: "15 000 kr" },
  { value: "50", title: "50 kroner · 2. utgave", meta: "1899 · banknote", price: "9 200 kr" },
  { value: "500", title: "500 kroner · 3. utgave", meta: "1948 · variant", price: "23 400 kr" },
  { value: "1000", title: "1000 kroner · lagmann", meta: "1975 · serie", price: "4 500 kr" },
];

const timeline = [
  { year: "800", title: "Vikingtid og tidlig handel", text: "De tidligste historiske lagene gir kontekst til perioder og funn." },
  { year: "1642", title: "Stabilere kilder", text: "Fra 1600-tallet blir datagrunnlaget mer anvendelig for koblinger." },
  { year: "1700+", title: "Marked og valuta", text: "KPI, valuta, metall og økonomiske kilder kan kobles mot objekter." },
  { year: "1920+", title: "Bred finansdata", text: "Flere indikatorer kan brukes samlet for markedsforståelse." },
];

const pricing = [
  { name: "Free", price: "0 kr", text: "Start med katalog og enkel oversikt." },
  { name: "Bronze", price: "149 kr", text: "Ønskeliste, favoritter og samlingsverktøy." },
  { name: "Silver", price: "3 000 kr", text: "Flere filter, historikk og markedsoversikt." },
  { name: "Gold", price: "10 000 kr", text: "Forhandler- og profesjonell samleraktivitet." },
  { name: "Platinum", price: "50 000 kr", text: "Utvidet arkiv, analyse og flere kilder." },
];

export default function CollectiumStartsideV42TemaPreview() {
  const [tema, setTema] = useState<TemaKey>("collectium");

  const titleAccent = useMemo(() => {
    if (tema === "museum") return "ett";
    if (tema === "finans") return "ett";
    if (tema === "enkel") return "ett";
    return "ett";
  }, [tema]);

  return (
    <div className={styles.previewShell} data-tema={tema}>
      <header className={styles.topbar}>
        <a href="/startside" className={styles.brand} aria-label="Collectium startside">
          <span className={styles.brandMark}>C</span>
          <span>
            <strong>Collectium</strong>
            <small>Samlerplattform</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Startside meny">
          <a href="/startside">Startside</a>
          <a href="/katalog">Katalog</a>
          <a href="/auksjoner">Auksjon</a>
          <a href="/katalog?segment=historie">Historie</a>
          <a href="/min-side">Min samling</a>
        </nav>

        <div className={styles.topActions}>
          <a href="/login">Logg inn</a>
          <a href="/registrering" className={styles.memberButton}>Bli medlem</a>

          <label className={styles.temaControl}>
            <span>Tema</span>
            <select value={tema} onChange={(event) => setTema(event.target.value as TemaKey)}>
              {temaOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>For samlere · For historien · For markedet</p>
            <h1>
              For samlere.
              <br />
              Av samlere.
              <br />
              Alt på <em>{titleAccent}</em>
              <br className={styles.mobileBreak} />
              sted.
            </h1>
            <p>
              Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
              Fra private samlinger til katalog, relasjoner og markedsdata.
            </p>
            <div className={styles.heroActions}>
              <a href="/registrering">Start gratis</a>
              <a href="/katalog">Se katalog</a>
            </div>
          </div>

          <div className={styles.yearMark}>2022</div>

          <div className={styles.metrics}>
            <span><strong>12 847</strong><small>katalogobjekter</small></span>
            <span><strong>1817 →</strong><small>aktive tidslag</small></span>
            <span><strong>5 land</strong><small>kilder og relasjoner</small></span>
            <span><strong>847</strong><small>registrerte koblinger</small></span>
          </div>
        </section>

        <section className={styles.manifest}>
          <div className={styles.sectionHead}>
            <p>I · Manifest</p>
            <h2>En <em>relasjonskatalog</em> bygd på data.</h2>
            <span>
              Collectium er bygget rundt objekter som alltid skal forstås sammen med kilde,
              objektgruppe, årstall, variant, regent, materiale, relasjoner og markedsstatus.
            </span>
          </div>

          <div className={styles.manifestGrid}>
            <article>
              <p>I · For samlere</p>
              <h3>Samlerstatus, <em>på objektet.</em></h3>
              <span>Hjerte, stjerne, Min samling, egne lister, kjøp, salg og dokumentasjon følger objektet.</span>
            </article>
            <article>
              <p>II · For historien</p>
              <h3>Historien er <em>en relasjon.</em></h3>
              <span>Tidslinjen går fra år 800 og kobler objektår, regent, union, hendelser og økonomi.</span>
            </article>
            <article>
              <p>III · For markedet</p>
              <h3>Marked i <em>kontekst.</em></h3>
              <span>0 kr betyr ikke reell verdi. Finansvisning skiller verdi, trend, likviditet og prisdata.</span>
            </article>
          </div>
        </section>

        <section className={styles.history}>
          <div className={styles.quote}>
            <p>II · Historie</p>
            <blockquote>
              Hver krone, hver seddel, hvert merke fra unionstiden bærer sporene av sin tid.
            </blockquote>
          </div>

          <div className={styles.timeline}>
            <p>Historien lever <em>i hver gjenstand.</em></p>
            {timeline.map((item) => (
              <article key={item.year}>
                <strong>{item.year}</strong>
                <span>
                  <b>{item.title}</b>
                  {item.text}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.catalog}>
          <div className={styles.sectionHead}>
            <p>III · Katalog</p>
            <h2>12 847 objekter, <em>én kilde.</em></h2>
            <span>
              Norske sedler, mynter og historiske objekter kan vises som samlerdata,
              historiedata og finansdata i samme katalogiske sammenheng.
            </span>
          </div>

          <div className={styles.catalogCards}>
            {catalogCards.map((card) => (
              <article key={card.value}>
                <div className={styles.cardImage}>
                  <strong>{card.value}</strong>
                  <span />
                </div>
                <h3>{card.title}</h3>
                <p>{card.meta}</p>
                <b>{card.price}</b>
              </article>
            ))}
          </div>

          <div className={styles.centerActions}>
            <a href="/katalog">Åpne katalogen</a>
            <a href="/katalog?segment=historie">Se historien</a>
          </div>
        </section>

        <section className={styles.context}>
          <div className={styles.sectionHead}>
            <p>IV · Relasjon</p>
            <h2>Katalogoversikt, historisk kontekst og <em>markedsinnsikt.</em></h2>
            <span>
              Ett objekt kan leses i flere lag: katalogfelt, relasjoner, historisk periode,
              regent, materialer, verdiutvikling og brukerstatus.
            </span>
          </div>

          <div className={styles.contextPanels}>
            <article>
              <h3>Katalogoversikt</h3>
              <ul>
                <li>Land / område</li>
                <li>Kilde</li>
                <li>Objekttype</li>
                <li>Valørutgave / serie</li>
              </ul>
            </article>
            <article className={styles.darkPanel}>
              <h3>Historisk kontekst</h3>
              <ul>
                <li>Regent / konge</li>
                <li>Historisk periode</li>
                <li>Hendelser</li>
                <li>Funn og proveniens</li>
              </ul>
            </article>
            <article>
              <h3>Markedsinnsikt</h3>
              <ul>
                <li>Markedsverdi</li>
                <li>Trend 12 mnd</li>
                <li>Likviditet</li>
                <li>Auksjon / butikk</li>
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.regent}>
          <div>
            <p>V · Relasjon</p>
            <h2>Fra Oscar II <br />til <em>Harald V.</em></h2>
            <span>
              Hver seddel og mynt kan kobles mot regent, periode, union, hendelser
              og historisk maktstruktur.
            </span>
            <div className={styles.microStats}>
              <b>1877</b>
              <b>1905</b>
              <b>2022</b>
              <b>5 land</b>
            </div>
          </div>

          <div className={styles.regentImage}>
            <span>ANN</span>
            <small>© Collectium</small>
          </div>
        </section>

        <section className={styles.collection}>
          <div className={styles.collectionCard}>
            <p>Min samling · 47 objekter</p>
            <div className={styles.miniTabs}>
              <span>47</span>
              <span>624 200</span>
              <span>12+</span>
            </div>
            <ul>
              <li><span />1 krone · 1917-serien <b>+ 4,2 %</b></li>
              <li><span />50 kroner · 2. utgave <b>+ 1,8 %</b></li>
              <li><span />100 kroner · Oscar II <b>- 0,7 %</b></li>
            </ul>
          </div>

          <div>
            <p>VI · Min samling</p>
            <h2>Ditt arkiv, <em>ditt valg av synlighet.</em></h2>
            <span>
              Registrer kvalitet, kjøpspris, proveniens, dokumentasjon og private notater.
              Velg selv hva som skal være privat eller delt.
            </span>
          </div>
        </section>

        <section className={styles.market}>
          <div className={styles.sectionHead}>
            <p>VII · Marked</p>
            <h2>Markedsdata fra <em>200 år.</em></h2>
            <span>
              Historisk og finansiell innsikt gjennom flere tidslag. KPI, valuta, gull,
              sølv og markedsobservasjoner kobles til objektets periode.
            </span>
          </div>

          <div className={styles.marketStats}>
            <article><strong>800-tallet</strong><span>tidligste historiske lag</span></article>
            <article><strong>1642+</strong><span>bedre struktur i kildene</span></article>
            <article><strong>1700+</strong><span>KPI, valuta og metall</span></article>
            <article><strong>1920+</strong><span>bred finanshistorikk</span></article>
          </div>

          <div className={styles.marketTable}>
            <span>1917 · 1 krone · prisobservasjon</span><b>15 000 kr</b>
            <span>1936 · variant · auksjon</span><b>8 400 kr</b>
            <span>1975 · 1000 kroner · privat salg</span><b>4 500 kr</b>
          </div>
        </section>

        <section className={styles.pricing}>
          <div className={styles.sectionHead}>
            <p>VIII · Medlemskap</p>
            <h2>Riktige priser, <em>riktig tilgangsnivå.</em></h2>
            <span>
              Fra gratis katalogstart til profesjonell bruker, forhandler og utvidet arkiv.
            </span>
          </div>

          <div className={styles.priceGrid}>
            {pricing.map((item) => (
              <article key={item.name} className={item.name === "Silver" ? styles.featuredPrice : ""}>
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.text}</p>
                <button type="button">{item.name === "Silver" ? "Velg Silver" : "Les mer"}</button>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Bli en del av <em>Collectium-arkivet.</em></h2>
          <p>Gratis å starte. Katalogen gir inngang til Samler, Historie og Finans.</p>
          <div className={styles.heroActions}>
            <a href="/registrering">Start gratis</a>
            <a href="/katalog">Utforsk katalogen</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <strong>© Collectium</strong>
          <span>Relasjonskatalog · samlerplattform · historisk og finansiell kontekst</span>
        </footer>
      </main>
    </div>
  );
}
