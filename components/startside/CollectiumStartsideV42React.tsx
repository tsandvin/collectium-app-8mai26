"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV42React
 *
 * Definering / formÃ¥l:
 * React-basert startsideinnhold for Collectium V42.
 * Komponenten viser landingsside, manifest, katalogpresentasjon, historiske/finansielle statsfelt,
 * visningskort med Samler/Historie/Finans-bryter og medlemskap med mÃ¥ned/Ã¥r-bryter.
 *
 * BruksomrÃ¥de:
 * Brukes av /startside inne i globalt skall. Komponenten eier ikke topbar, sidebar eller global layout.
 *
 * BerÃ¸rte sider / routes:
 * - /startside
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - landing.view
 * - catalog.view
 * - index.view
 * - membership.view
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Endringsregel:
 * Dette er presentasjonsinnhold. Katalogdata, tilgang, filter og markedstall skal senere hentes fra API/MariaDB.
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumStartsideV42React.module.css";

type SegmentKey = "samler" | "historie" | "finans";
type BillingKey = "monthly" | "yearly";

type SegmentContent = {
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
  fields: Array<{ label: string; value: string }>;
  bullets: string[];
};

type Plan = {
  name: string;
  description: string;
  monthly: string;
  yearly: string;
  badge?: string;
  points: string[];
};

const segmentContent: Record<SegmentKey, SegmentContent> = {
  samler: {
    label: "Samler",
    eyebrow: "Visningskort Â· Samler",
    title: "Objektet som samlerkort",
    lead:
      "Samlerfeltet prioriterer identitet, privat status, Ã¸nskeliste, favoritt, samling, kvalitet og sjeldenhet.",
    fields: [
      { label: "Overskrift", value: "10 kroner Â· 1949 Â· Litra A" },
      { label: "ValÃ¸rutgave / serie", value: "10 kroner-serien" },
      { label: "Utgave", value: "Norges Bank Â· Haakon VII" },
      { label: "Variant", value: "Standardutgave Â· Seddelpapir" },
      { label: "Sjeldenhet", value: "Registrert som samlerrelevant variant" },
    ],
    bullets: [
      "Hjerte, stjerne og Min samling ligger nÃ¦r objektet.",
      "KjÃ¸p, salg, notater og dokumentasjon knyttes til brukerens egen samling.",
      "Katalogens sannhet blandes ikke med private samlerdata.",
    ],
  },
  historie: {
    label: "Historie",
    eyebrow: "Visningskort Â· Historie",
    title: "Objektet som historisk relasjon",
    lead:
      "Historiefeltet viser hvorfor objektet hÃ¸rer hjemme i en periode, en utgave, en regentlinje og et stÃ¸rre historisk bilde.",
    fields: [
      { label: "Overskrift", value: "10 kroner Â· 1949 Â· Litra A" },
      { label: "Regent / konge", value: "Haakon VII" },
      { label: "Historisk periode", value: "Etterkrigstid og moderne norsk pengehistorie" },
      { label: "Relasjoner", value: "Utgave, signatur, materiale, periode og relaterte objekter" },
      { label: "Kontekst", value: "Katalogkortet kan Ã¥pne personer, perioder, hendelser og objektgrupper" },
    ],
    bullets: [
      "Kaupang, rikssamling, handelssteder og tidlige mynt-/maktrelasjoner.",
      "Befolkning, Ã¸konomisk nedgang og historisk kontekst for utvikling i Norge.",
      "SÃ¸lv, metall, mynt, industri og Ã¸konomisk rÃ¥varehistorie kobles til katalogen.",
      "Overgang til moderne myntenhet og viktig skille for mynt- og seddelkatalogen.",
    ],
  },
  finans: {
    label: "Finans",
    eyebrow: "Visningskort Â· Finans",
    title: "Objektet som markedsdata",
    lead:
      "Finansfeltet skiller verdi, trend, likviditet, kjÃ¸pspris, fortjeneste, auksjon, nettbutikk og prisobservasjoner.",
    fields: [
      { label: "Overskrift", value: "10 kroner Â· 1949 Â· Litra A" },
      { label: "Markedsstatus", value: "Prisobservasjoner, auksjon, nettbutikk og samlingshistorikk" },
      { label: "Trend", value: "Trend opp, ned eller stabil vises med periode" },
      { label: "Verdi", value: "0 kr betyr manglende vurdering, ikke reell nullverdi" },
      { label: "Index", value: "Kan sammenlignes mot valuta, KPI, gull, sÃ¸lv og markedsutvikling" },
    ],
    bullets: [
      "Verdi og prisobservasjoner skal komme fra kildegrunnlag, ikke fiktive frontend-tall.",
      "Markedsutvikling kan sees sammen med historisk periode og Ã¸konomisk samtid.",
      "Finansvisning gjÃ¸r det tydelig hva som er vurdert og hva som mangler datagrunnlag.",
    ],
  },
};

const plans: Plan[] = [
  {
    name: "Free",
    description: "Kom i gang med offentlig katalogutdrag og enkel utforsking.",
    monthly: "0 kr",
    yearly: "0 kr",
    points: ["Offentlig inngang", "Begrenset katalog", "Start gratis"],
  },
  {
    name: "Bronze",
    description: "For samlere som vil bruke Ã¸nskeliste, favoritter og grunnleggende samlingsverktÃ¸y.",
    monthly: "199 kr/mnd",
    yearly: "1 788 kr/Ã¥r",
    points: ["Hjerte og stjerne", "Min samling", "Grunnleggende historikk"],
  },
  {
    name: "Silver",
    description: "For aktive samlere som vil ha flere filter, mer historikk og bedre oversikt.",
    monthly: "499 kr/mnd",
    yearly: "6 000 kr/Ã¥r",
    badge: "Aktiv samler",
    points: ["Flere filter", "Historisk kontekst", "Marked og samlingsverdi"],
  },
  {
    name: "Gold",
    description: "For avansert bruk, forhandlertilgang eller profesjonell samleraktivitet.",
    monthly: "Kun Ã¥r",
    yearly: "20 000 kr/Ã¥r",
    points: ["Forhandlerflyt", "Auksjon og nettbutikk", "Avansert markedsdata"],
  },
  {
    name: "Platinum",
    description: "For full tilgang, flere kilder og profesjonell analyse.",
    monthly: "Kun Ã¥r",
    yearly: "100 000 kr/Ã¥r",
    points: ["Full tilgang", "Flere kilder", "Profesjonell analyse"],
  },
];

const historyHighlights = [
  {
    year: "800â€“1000",
    title: "Vikingtid og tidlig maktstruktur",
    text: "Kaupang, rikssamling, handelssteder og tidlige mynt-/maktrelasjoner.",
  },
  {
    year: "1349â€“1350",
    title: "Svartedauden",
    text: "Befolkning, Ã¸konomisk nedgang og historisk kontekst for utvikling i Norge.",
  },
  {
    year: "1624",
    title: "Kongsberg bergverk",
    text: "SÃ¸lv, metall, mynt, industri og Ã¸konomisk rÃ¥varehistorie kobles til katalogen.",
  },
  {
    year: "1873",
    title: "Kroner og Ã¸re",
    text: "Overgang til moderne myntenhet og viktig skille for mynt- og seddelkatalogen.",
  },
];

function SegmentSwitch({ active, onChange }: { active: SegmentKey; onChange: (segment: SegmentKey) => void }) {
  return (
    <div className={styles.segmentSwitch} aria-label="Velg visningskortsegment">
      {(Object.keys(segmentContent) as SegmentKey[]).map((segment) => (
        <button
          key={segment}
          type="button"
          className={active === segment ? styles.segmentActive : ""}
          onClick={() => onChange(segment)}
          aria-pressed={active === segment}
        >
          {segmentContent[segment].label}
        </button>
      ))}
    </div>
  );
}

export default function CollectiumStartsideV42React() {
  const [segment, setSegment] = useState<SegmentKey>("samler");
  const [billing, setBilling] = useState<BillingKey>("yearly");
  const current = segmentContent[segment];

  const planLabel = useMemo(() => (billing === "yearly" ? "Ã…rlig" : "MÃ¥nedlig"), [billing]);

  return (
    <main className={styles.startside}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.anno}>2022</p>
          <p className={styles.eyebrow}>For samlere Â· For historien Â· For markedet</p>
          <h1>
            For samlere.
            <br />
            Av samlere.
            <br />
            Alt pÃ¥ ett sted.
          </h1>
          <p className={styles.heroLead}>
            Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
          </p>
          <p className={styles.heroText}>
            Utforsk katalogobjekter, historiske relasjoner, samlingsverdi, auksjoner og
            forhandlerobjekter â€” samlet i Ã©n plattform under ett tak.
          </p>
          <div className={styles.heroActions}>
            <a href="/sign-up" className={styles.primaryButton}>Start gratis</a>
            <a href="/katalog" className={styles.secondaryButton}>Se katalog</a>
          </div>
        </div>

        <aside className={styles.heroCard} aria-label="Collectium katalogkort eksempel">
          <div className={styles.cardTopline}>
            <span>Katalog</span>
            <span>Samler Â· Historie Â· Finans</span>
          </div>
          <SegmentSwitch active={segment} onChange={setSegment} />
          <div className={styles.objectPreview}>
            <div className={styles.objectImage}>Norske sedler</div>
            <div className={styles.objectText}>
              <p>{current.eyebrow}</p>
              <h2>{current.title}</h2>
              <span>{current.lead}</span>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.manifest}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>IManifest</p>
          <h2>En relasjonskatalog bygd pÃ¥ data.</h2>
          <p>
            Collectium er bygget rundt objekter som alltid skal forstÃ¥s sammen med kilde,
            objektgruppe, Ã¥rstall, variant, regent, materiale, relasjoner og markedsstatus.
            Katalogen er ikke en flat produktliste â€” den er et system der hvert objekt kan
            leses som samlerdata, historiedata og finansdata.
          </p>
        </div>

        <div className={styles.manifestGrid}>
          <article>
            <span>I Â· For samlere</span>
            <h3>Samlerstatus, pÃ¥ objektet.</h3>
            <p>
              Hjerte, stjerne, Min samling, egne lister, kjÃ¸p, salg og dokumentasjon fÃ¸lger
              objektet uten Ã¥ blande private data med katalogens sannhet.
            </p>
          </article>
          <article>
            <span>II Â· For historien</span>
            <h3>Historien er en relasjon.</h3>
            <p>
              Tidslinjen gÃ¥r fra Ã¥r 800 og kan koble objektÃ¥r, publiseringsÃ¥r, regent,
              union, historisk hendelse, befolkning og Ã¸konomisk kontekst.
            </p>
          </article>
          <article>
            <span>III Â· For markedet</span>
            <h3>Marked i kontekst.</h3>
            <p>
              0 kr betyr ikke reell verdi, men manglende vurdering. Finansvisning skal skille
              verdi, trend, likviditet, auksjon, nettbutikk og prisobservasjoner.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.catalogShowcase}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Katalog</p>
          <h2>Visningskort med Samler, Historie og Finans.</h2>
          <p>
            Visningskortet er inngangen fra katalogen til full objektpresentasjon. Det skal
            vise objektets identitet, relasjoner, brukerstatus og marked uten Ã¥ bli en flat produktliste.
          </p>
        </div>

        <div className={styles.showcaseGrid}>
          <article className={styles.presentationCard}>
            <div className={styles.presentationHeader}>
              <span>ObjectPresentationCard</span>
              <SegmentSwitch active={segment} onChange={setSegment} />
            </div>

            <div className={styles.presentationBody}>
              <div className={styles.largeImage}>Seddel / mynt</div>
              <div className={styles.fieldGrid}>
                {current.fields.map((field) => (
                  <div key={field.label} className={styles.fieldItem}>
                    <span>{field.label}</span>
                    <strong>{field.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className={styles.segmentInfo}>
            <p className={styles.eyebrow}>{current.eyebrow}</p>
            <h3>{current.title}</h3>
            <p>{current.lead}</p>
            <ul>
              {current.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Index Â· Katalog Â· Statistikk</p>
          <h2>Katalogoversikt, historisk kontekst og markedsinnsikt.</h2>
          <p>
            Dette omrÃ¥det samler Collectium sin egen bearbeidede og kildekoblede oversikt
            over objektgrunnlag, historiske relasjoner og markedsutvikling i tre tydelige visninger.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <article>
            <span>01 Â· Katalogoversikt</span>
            <h3>Sedler, mynter og relasjoner</h3>
            <p>
              Gir oversikt over sedler, mynter, kilder, objektgrupper, valÃ¸rer, regenter,
              materialer, bilder og relasjonsdekning.
            </p>
            <strong>80 000</strong>
            <small>Informasjon om relasjoner til mynter og sedler</small>
          </article>
          <article>
            <span>02 Â· Historisk kontekst</span>
            <h3>Tidslinje fra Ã¥r 800</h3>
            <p>
              Kobler objektene til Ã¥rstall, perioder, regenter, unioner, historiske hendelser,
              land og befolkningsutvikling.
            </p>
            <strong>800</strong>
            <small>Tidligste historiske kontekstlag</small>
          </article>
          <article>
            <span>03 Â· Markedsinnsikt</span>
            <h3>Verdi, trend og prisobservasjoner</h3>
            <p>
              Viser markedsverdi, trend, prisobservasjoner, auksjon, nettbutikk,
              samlingsverdi og objekter som mangler vurdering.
            </p>
            <strong>3</strong>
            <small>Samler Â· Historie Â· Finans</small>
          </article>
        </div>
      </section>

      <section className={styles.historySection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Historie og museum</p>
          <h2>Historien mÃ¥ vÃ¦re lesbar, ikke bare dekorativ.</h2>
          <p>
            De historiske feltene under er satt med tydeligere stÃ¸rrelse og tynnere skrift for Ã¥
            kunne leses i bÃ¥de vanlig desktopvisning og mÃ¸rkere museumsflater.
          </p>
        </div>
        <div className={styles.historyGrid}>
          {historyHighlights.map((item) => (
            <article key={item.year}>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.membershipSection}>
        <div className={styles.memberHeader}>
          <div>
            <p className={styles.eyebrow}>Medlemskap</p>
            <h2>Velg tilgang etter hvordan du samler.</h2>
            <p>
              Start gratis, bygg samling og utvid til mer historikk, flere filter og dypere
              markedsdata nÃ¥r du trenger det.
            </p>
          </div>
          <div className={styles.billingToggle} aria-label="Velg prisperiode">
            <button
              type="button"
              className={billing === "monthly" ? styles.billingActive : ""}
              onClick={() => setBilling("monthly")}
            >
              MÃ¥nedlig
            </button>
            <button
              type="button"
              className={billing === "yearly" ? styles.billingActive : ""}
              onClick={() => setBilling("yearly")}
            >
              Ã…rlig
            </button>
          </div>
        </div>

        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <article key={plan.name} className={plan.badge ? styles.featuredPlan : ""}>
              {plan.badge ? <span className={styles.planBadge}>{plan.badge}</span> : null}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <strong>{billing === "yearly" ? plan.yearly : plan.monthly}</strong>
              <small>{planLabel}</small>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div>
          <h2>Bli en del av Collectium-arkivet.</h2>
          <p>
            Gratis Ã¥ starte. Katalogen gir inngang til Samler, Historie og Finans â€” fra privat
            samling til historisk kontekst og markedsutvikling.
          </p>
          <a href="/sign-up" className={styles.primaryButton}>Opprett konto</a>
        </div>
      </section>
    </main>
  );
}
