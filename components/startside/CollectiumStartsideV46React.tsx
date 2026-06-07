"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV46React
 *
 * Definering / formål:
 * React-basert innholdskomponent for V46-startside. Dette er ikke HTML-preview.
 * Komponenten eier kun innhold, tekst, lokale segmentbrytere og presentasjonsstate.
 * Global topbar, sidemeny, skall, body/html og skin eies av global layout/template.
 *
 * Bruksområde:
 * Brukes av /startside som innhold inne i global Collectium layout.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - catalog.view
 * - membership.view
 *
 * Berørte API-ruter:
 * - none in this static first React version
 *
 * Berørte tabeller / views:
 * - none in this static first React version
 *
 * Dataretning:
 * MariaDB → API/backend → Next.js → React → UI
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Endringsregel:
 * Ikke legg AppShell, Topbar, Sidebar, DesignPanel, body eller html i denne komponenten.
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumStartsideV46React.module.css";

type SegmentKey = "samler" | "historie" | "finans";
type BillingKey = "monthly" | "yearly";

type SegmentContent = {
  label: string;
  eyebrow: string;
  title: string;
  text: string;
  fields: string[];
};

const segmentContent: Record<SegmentKey, SegmentContent> = {
  samler: {
    label: "Samler",
    eyebrow: "Visningskort · Samler",
    title: "Samlerstatus på objektet",
    text:
      "Kortet prioriterer hjerte, stjerne, Min samling, kvalitet, sjeldenhet og brukerens egne kjøp, salg og dokumentasjon.",
    fields: ["Overskrift", "Valørutgave / serie", "Utgave", "Variant", "Sjeldenhet"],
  },
  historie: {
    label: "Historie",
    eyebrow: "Visningskort · Historie",
    title: "Historien er en relasjon",
    text:
      "Kortet viser produsent, utgave, år, regent, signatur, materiale, funn, periode og relaterte objekter slik at objektet leses i historisk sammenheng.",
    fields: ["Regent / konge", "Historisk periode", "Signatur / personer", "Materiale", "Relaterte objekter"],
  },
  finans: {
    label: "Finans",
    eyebrow: "Visningskort · Finans",
    title: "Marked i kontekst",
    text:
      "Kortet prioriterer verdi, trendprosent, likviditet, kjøpspris, fortjeneste, auksjon, nettbutikk og prisgraf. 0 kr betyr manglende vurdering, ikke reell verdi.",
    fields: ["Markedsverdi", "Trend", "Likviditet", "Auksjon", "Prisobservasjoner"],
  },
};

const memberPrices = [
  { name: "Free", monthly: "0 kr", yearly: "0 kr", text: "Kom i gang med offentlig katalogutdrag og enkel utforsking." },
  { name: "Bronze", monthly: "149 kr/mnd", yearly: "1 490 kr/år", text: "For samlere som vil bruke ønskeliste, favoritter og grunnleggende samlingsverktøy." },
  { name: "Silver", monthly: "499 kr/mnd", yearly: "3 000 kr/år", text: "For aktive samlere som vil ha flere filter, mer historikk og bedre oversikt." },
  { name: "Gold", monthly: "2 999 kr/mnd", yearly: "20 000 kr/år", text: "For avansert bruk, forhandlertilgang eller profesjonell samleraktivitet." },
  { name: "Platinum", monthly: "Kun år", yearly: "100 000 kr/år", text: "Full tilgang, flere kilder og profesjonell analyse." },
];

const historyRows = [
  {
    year: "800-1000",
    title: "Vikingtid og tidlige handelssteder",
    text: "Kaupang, rikssamling, handelssteder og tidlige mynt-/maktrelasjoner.",
  },
  {
    year: "1349-1350",
    title: "Svartedauden",
    text: "Befolkning, økonomisk nedgang og historisk kontekst for utvikling i Norge.",
  },
  {
    year: "1624",
    title: "Kongsberg bergverk",
    text: "Sølv, metall, mynt, industri og økonomisk råvarehistorie kobles til katalogen.",
  },
  {
    year: "1873",
    title: "Kroner og øre",
    text: "Overgang til moderne myntenhet og viktig skille for mynt- og seddelkatalogen.",
  },
];

export default function CollectiumStartsideV46React() {
  const [segment, setSegment] = useState<SegmentKey>("samler");
  const [billing, setBilling] = useState<BillingKey>("monthly");
  const active = segmentContent[segment];

  const billingLabel = useMemo(() => (billing === "monthly" ? "Månedlig" : "Årlig"), [billing]);

  return (
    <main className={styles.page} data-collectium-page="startside-v46-react">
      <section className={styles.hero} aria-labelledby="startside-title">
        <div className={styles.heroCopy}>
          <p className={styles.year}>2022</p>
          <p className={styles.kicker}>For samlere · For historien · For markedet</p>
          <h1 id="startside-title" className={styles.heroTitle}>
            For samlere.
            <br />
            Av samlere.
            <br />
            Alt på ett sted.
          </h1>
          <p className={styles.lead}>
            Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
          </p>
          <p className={styles.heroText}>
            Utforsk katalogobjekter, historiske relasjoner, samlingsverdi, auksjoner og forhandlerobjekter — samlet i én plattform under ett tak.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="/sign-up">Start gratis</a>
            <a className={styles.secondaryAction} href="/katalog">Se katalog</a>
          </div>
        </div>

        <div className={styles.heroPanel} aria-label="Collectium katalogkort">
          <div className={styles.cardToolbar} role="tablist" aria-label="Velg visningskort">
            {(Object.keys(segmentContent) as SegmentKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={key === segment ? styles.segmentActive : styles.segmentButton}
                onClick={() => setSegment(key)}
                aria-pressed={key === segment}
              >
                {segmentContent[key].label}
              </button>
            ))}
          </div>

          <article className={styles.objectCard}>
            <div className={styles.objectImage}>
              <span>Katalog</span>
            </div>
            <div className={styles.objectBody}>
              <p className={styles.objectMeta}>NSNR 23a · Norske sedler</p>
              <h2>1 krone · 1917-serien · Litra A</h2>
              <p>Norges Bank · Haakon VII · Seddel / sikkerhetspapir</p>
              <div className={styles.fieldGrid}>
                {active.fields.map((field) => (
                  <span key={field}>{field}</span>
                ))}
              </div>
            </div>
          </article>

          <div className={styles.segmentInfo}>
            <p>{active.eyebrow}</p>
            <h3>{active.title}</h3>
            <span>{active.text}</span>
          </div>
        </div>
      </section>

      <section className={styles.manifestSection} aria-labelledby="manifest-title">
        <div className={styles.manifestIntro}>
          <p className={styles.sectionKicker}>Manifest</p>
          <h2 id="manifest-title">En relasjonskatalog bygd på data.</h2>
          <p>
            Collectium er bygget rundt objekter som alltid skal forstås sammen med kilde, objektgruppe, årstall, variant, regent, materiale, relasjoner og markedsstatus. Katalogen er ikke en flat produktliste — den er et system der hvert objekt kan leses som samlerdata, historiedata og finansdata.
          </p>
        </div>
        <div className={styles.manifestGrid}>
          <article>
            <p>I · For samlere</p>
            <h3>Samlerstatus, på objektet.</h3>
            <span>Hjerte, stjerne, Min samling, egne lister, kjøp, salg og dokumentasjon følger objektet uten å blande private data med katalogens sannhet.</span>
          </article>
          <article>
            <p>II · For historien</p>
            <h3>Historien er en relasjon.</h3>
            <span>Tidslinjen går fra år 800 og kan koble objektår, publiseringsår, regent, union, historisk hendelse, befolkning og økonomisk kontekst.</span>
          </article>
          <article>
            <p>III · For markedet</p>
            <h3>Marked i kontekst.</h3>
            <span>0 kr betyr ikke reell verdi, men manglende vurdering. Finansvisning skal skille verdi, trend, likviditet, auksjon, nettbutikk og prisobservasjoner.</span>
          </article>
        </div>
      </section>

      <section className={styles.statsSection} aria-labelledby="stats-title">
        <div className={styles.sectionHead}>
          <p className={styles.sectionKicker}>Index · Katalog · Relasjoner</p>
          <h2 id="stats-title">Katalogoversikt, historisk kontekst og markedsinnsikt.</h2>
          <p>
            Dette området samler Collectium sin egen bearbeidede oversikt over objektgrunnlag, historiske relasjoner og markedsutvikling i tre tydelige visninger: Samler, Historie og Finans.
          </p>
        </div>
        <div className={styles.statsGrid}>
          <article>
            <strong>80 000</strong>
            <h3>Informasjon om relasjoner til mynter og sedler</h3>
            <p>Katalogen kan koble kilde, objektgruppe, valør, år, regent, materiale, historisk periode og markedsstatus.</p>
          </article>
          <article>
            <strong>3</strong>
            <h3>Samler · Historie · Finans</h3>
            <p>Samme objekt kan leses gjennom samlerstatus, historiske relasjoner og finansielle markedsdata.</p>
          </article>
          <article>
            <strong>800</strong>
            <h3>Tidslinje fra år 800</h3>
            <p>Historisk kontekst for perioder, regenter, unioner, hendelser, land og samfunnsutvikling.</p>
          </article>
        </div>
      </section>

      <section className={styles.historySection} aria-labelledby="history-title">
        <div className={styles.sectionHeadDark}>
          <p className={styles.sectionKicker}>Historisk og finansiell innsikt</p>
          <h2 id="history-title">Flere tidslag, én katalogisk sammenheng.</h2>
          <p>
            Collectium bygger oversikten på flere historiske datalag. De tidligste historiske opplysningene går tilbake til rundt 800-tallet, mens datagrunnlaget fra 1642 og utover blir mer anvendelig for systematisk kobling mellom årstall, objekter, hendelser og befolkning.
          </p>
        </div>
        <div className={styles.historyGrid}>
          {historyRows.map((row) => (
            <article key={row.year}>
              <strong>{row.year}</strong>
              <h3>{row.title}</h3>
              <p>{row.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dataSection} aria-labelledby="data-title">
        <div className={styles.dataPanel}>
          <p className={styles.sectionKicker}>Egen data fra kjente kilder</p>
          <h2 id="data-title">Historisk og finansiell innsikt gjennom flere tidslag.</h2>
          <p>
            Fra 1700- og 1800-tallet bygges oversikten videre med KPI, inflasjon, pengeverdi, lønnsvekst, realønnsvekst, folketall, engrosprisindeks, lånerente, gullpris, sølvpris, gull/sølv-forhold og valuta mot SEK, DKK, EUR, GBP, USD, DEM og FRF.
          </p>
          <p>
            Fra ca. 1920 finnes et særlig bredt spekter av finansielle opplysninger, der flere indikatorer kan brukes sammen for å forstå verdi, kjøpekraft, marked og utvikling over tid.
          </p>
        </div>
      </section>

      <section className={styles.membershipSection} aria-labelledby="membership-title">
        <div className={styles.sectionHead}>
          <p className={styles.sectionKicker}>Medlemskap</p>
          <h2 id="membership-title">Velg tilgang etter hvordan du samler.</h2>
          <p>Start gratis, bygg samling og utvid til mer historikk, flere filter og dypere markedsdata når du trenger det.</p>
          <div className={styles.billingToggle} aria-label="Velg prisperiode">
            <button type="button" className={billing === "monthly" ? styles.billingActive : ""} onClick={() => setBilling("monthly")}>Månedlig</button>
            <button type="button" className={billing === "yearly" ? styles.billingActive : ""} onClick={() => setBilling("yearly")}>Årlig</button>
          </div>
        </div>
        <div className={styles.memberGrid}>
          {memberPrices.map((plan) => (
            <article key={plan.name}>
              <p>{billingLabel}</p>
              <h3>{plan.name}</h3>
              <strong>{billing === "monthly" ? plan.monthly : plan.yearly}</strong>
              <span>{plan.text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">Bli en del av Collectium-arkivet.</h2>
          <p>Gratis å starte. Katalogen gir inngang til Samler, Historie og Finans — fra privat samling til historisk kontekst og markedsutvikling.</p>
          <a href="/sign-up">Opprett konto</a>
        </div>
      </section>
    </main>
  );
}
