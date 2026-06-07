"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV46React
 *
 * Definering / formål:
 * React/Next.js-konvertering av opplastet Collectium-frontpage HTML.
 * Erstatter rå HTML/script med kontrollert React-state, CSS module og lokale assets.
 *
 * Bruksområde:
 * Brukes av /startside.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.catalog.preview
 * - public.theme.preview
 * - public.membership.preview
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Statisk preview-data -> React state -> UI
 *
 * Logging:
 * Ingen DB-logging.
 *
 * Versjon:
 * CT-STARTSIDE-V46-REACT-0001
 */

import { useState } from "react";
import styles from "./CollectiumStartsideV46React.module.css";

type TemplateKey = "collectium" | "enkel" | "museum" | "finans";
type CatalogSegment = "samler" | "historie" | "finans";
type ObjectKind = "banknote" | "coin";
type PeriodKey = "all" | "oscar" | "karl" | "haakon" | "modern";
type BillingMode = "monthly" | "yearly";

const templates: Array<{
  id: TemplateKey;
  label: string;
  desc: string;
  tone: string;
}> = [
  { id: "collectium", label: "Collectium", desc: "Pergament, grønn og gull.", tone: "Lys" },
  { id: "enkel", label: "Enkel", desc: "Ren blå/grå katalogflate.", tone: "Lys" },
  { id: "museum", label: "Museum", desc: "Mørk arkivflate med antikk gull.", tone: "Mørk" },
  { id: "finans", label: "Finans", desc: "Teal, data og markedsflate.", tone: "Mørk" },
];

const catalogSegments: Record<CatalogSegment, {
  title: string;
  text: string;
  meta: string;
}> = {
  samler: {
    title: "Samler",
    text: "Visningskortet viser ønskeliste, favoritt, Min samling, kvalitet og samlerhandlinger.",
    meta: "Hjerte · Stjerne · Min samling",
  },
  historie: {
    title: "Historie",
    text: "Objektet kobles mot regent, årstall, utgave, hendelser, personer, kilder og relasjoner.",
    meta: "Regent · Periode · Kilde",
  },
  finans: {
    title: "Finans",
    text: "Verdi, trend, likviditet, prisobservasjoner, auksjon og nettbutikk leses i sammenheng.",
    meta: "Verdi · Trend · Marked",
  },
};

const catalogCards = [
  {
    value: "100",
    ruler: "Oscar II · 1877",
    source: "NS 1 459",
    title: "100 kroner · 1. utgave",
    rarity: "RRR · Sjelden",
    price: "15 000 kr",
  },
  {
    value: "50",
    ruler: "Oscar II · 1901",
    source: "NS 1 502",
    title: "50 kroner · 2. utgave",
    rarity: "RR · Sjelden",
    price: "8 200 kr",
  },
  {
    value: "500",
    ruler: "Haakon VII · 1948",
    source: "NS 1 887",
    title: "500 kroner · 2. utgave",
    rarity: "RRR · Sjelden",
    price: "28 000 kr",
  },
  {
    value: "1000",
    ruler: "Haakon VII · 1942",
    source: "NS 1 991",
    title: "1000 kroner · krigsutgave",
    rarity: "RRRR · Ekstrem",
    price: "145 000 kr",
  },
];

const periodFilters: Array<{
  key: PeriodKey;
  label: string;
  years: string;
  text: string;
}> = [
  {
    key: "all",
    label: "Alle perioder",
    years: "1814–2024",
    text: "Viser hele tidslinjen for valgte objektgruppe.",
  },
  {
    key: "oscar",
    label: "Oscar II",
    years: "1872–1905",
    text: "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.",
  },
  {
    key: "karl",
    label: "Karl XV",
    years: "1859–1872",
    text: "Perioden brukes for eldre unionsobjekter og relaterte utgaver.",
  },
  {
    key: "haakon",
    label: "Haakon VII",
    years: "1905–1957",
    text: "Nasjonal overgang, moderne sedler, mynter og markedsdata.",
  },
  {
    key: "modern",
    label: "Moderne",
    years: "1957–2024",
    text: "Nyere serier, moderne samlerstatus og markedsutvikling.",
  },
];

const objectPreviewData: Record<ObjectKind, Record<PeriodKey, {
  imageLabel: string;
  title: string;
  subtitle: string;
  value: string;
  issue: string;
  variant: string;
  rarity: string;
  relation: string;
  price: string;
  source: string;
  ruler: string;
  period: string;
  auctions: string;
  shops: string;
  hearts: string;
  stars: string;
}>> = {
  banknote: {
    all: {
      imageLabel: "100",
      title: "Norske sedler i katalog",
      subtitle: "Relasjonsbasert seddeloversikt",
      value: "Flere valører",
      issue: "Flere utgaver",
      variant: "Standard / variant",
      rarity: "Fra vanlig til ekstrem",
      relation: "Seddel · Norske sedler · Kilde",
      price: "15 000 kr",
      source: "DB-resolved",
      ruler: "Flere regenter",
      period: "1814–2024",
      auctions: "12",
      shops: "4",
      hearts: "38",
      stars: "19",
    },
    oscar: {
      imageLabel: "100",
      title: "100 kroner 1877",
      subtitle: "Oscar II · standardutgave",
      value: "100 kroner",
      issue: "1. utgave",
      variant: "Standardutgave",
      rarity: "Sjelden",
      relation: "Seddel · Norske sedler · Oscar II · NS 1459",
      price: "15 000 kr",
      source: "NS 1459",
      ruler: "Oscar II",
      period: "1872–1905",
      auctions: "3",
      shops: "1",
      hearts: "0",
      stars: "0",
    },
    karl: {
      imageLabel: "10",
      title: "10 speciedaler 1860",
      subtitle: "Karl XV · overgangsperiode",
      value: "10 speciedaler",
      issue: "Eldre utgave",
      variant: "Unionstid",
      rarity: "Meget sjelden",
      relation: "Seddel · Union · Karl XV · kilde",
      price: "42 000 kr",
      source: "Historisk kilde",
      ruler: "Karl XV",
      period: "1859–1872",
      auctions: "1",
      shops: "0",
      hearts: "4",
      stars: "2",
    },
    haakon: {
      imageLabel: "500",
      title: "500 kroner 1948",
      subtitle: "Haakon VII · etterkrigstid",
      value: "500 kroner",
      issue: "2. utgave",
      variant: "Standard",
      rarity: "Sjelden",
      relation: "Seddel · Haakon VII · etterkrigstid",
      price: "28 000 kr",
      source: "NS 1887",
      ruler: "Haakon VII",
      period: "1905–1957",
      auctions: "5",
      shops: "2",
      hearts: "12",
      stars: "6",
    },
    modern: {
      imageLabel: "200",
      title: "200 kroner nyere serie",
      subtitle: "Moderne norsk seddelhistorie",
      value: "200 kroner",
      issue: "Nyere serie",
      variant: "Standard",
      rarity: "Vanlig / samler",
      relation: "Seddel · Moderne periode · Norges Bank",
      price: "850 kr",
      source: "Moderne kilde",
      ruler: "Moderne periode",
      period: "1957–2024",
      auctions: "24",
      shops: "9",
      hearts: "61",
      stars: "22",
    },
  },
  coin: {
    all: {
      imageLabel: "M",
      title: "Norske mynter i katalog",
      subtitle: "Relasjonsbasert myntoversikt",
      value: "Flere valører",
      issue: "Flere perioder",
      variant: "Metall / variant",
      rarity: "Fra vanlig til ekstrem",
      relation: "Mynt · Norge · Materiale · Regent",
      price: "8 200 kr",
      source: "DB-resolved",
      ruler: "Flere regenter",
      period: "1814–2024",
      auctions: "18",
      shops: "7",
      hearts: "44",
      stars: "23",
    },
    oscar: {
      imageLabel: "2 kr",
      title: "2 kroner Oscar II",
      subtitle: "Unionstid · sølvmynt",
      value: "2 kroner",
      issue: "Oscar II",
      variant: "Sølv",
      rarity: "Sjelden",
      relation: "Mynt · Oscar II · sølv · union",
      price: "6 500 kr",
      source: "Myntkilde",
      ruler: "Oscar II",
      period: "1872–1905",
      auctions: "6",
      shops: "2",
      hearts: "14",
      stars: "8",
    },
    karl: {
      imageLabel: "1 spd",
      title: "1 speciedaler Karl XV",
      subtitle: "Eldre norsk/svensk unionsrelasjon",
      value: "1 speciedaler",
      issue: "Karl XV",
      variant: "Sølv",
      rarity: "Meget sjelden",
      relation: "Mynt · Karl XV · union · sølv",
      price: "32 000 kr",
      source: "Historisk myntkilde",
      ruler: "Karl XV",
      period: "1859–1872",
      auctions: "2",
      shops: "0",
      hearts: "7",
      stars: "3",
    },
    haakon: {
      imageLabel: "1 kr",
      title: "1 krone Haakon VII",
      subtitle: "Konge og nasjonsbygging",
      value: "1 krone",
      issue: "Haakon VII",
      variant: "Nikkel / sølv",
      rarity: "Varierer",
      relation: "Mynt · Haakon VII · nasjon",
      price: "1 250 kr",
      source: "Myntkilde",
      ruler: "Haakon VII",
      period: "1905–1957",
      auctions: "11",
      shops: "4",
      hearts: "29",
      stars: "12",
    },
    modern: {
      imageLabel: "20",
      title: "20 kroner moderne mynt",
      subtitle: "Nyere norsk myntserie",
      value: "20 kroner",
      issue: "Moderne serie",
      variant: "Sirkulasjon",
      rarity: "Vanlig",
      relation: "Mynt · Moderne periode · metall",
      price: "75 kr",
      source: "Moderne myntkilde",
      ruler: "Moderne periode",
      period: "1957–2024",
      auctions: "33",
      shops: "16",
      hearts: "78",
      stars: "31",
    },
  },
};

const statsTabs: Record<CatalogSegment, {
  title: string;
  text: string;
  rows: Array<[string, string, string]>;
}> = {
  samler: {
    title: "Samleroversikt",
    text: "Objekter, status, samling, ønskelister og private handlinger.",
    rows: [
      ["47", "Objekter i samling", "+8 siste 12 mnd"],
      ["18", "Ønskeliste", "6 sjeldne"],
      ["9", "Favoritter", "3 med prisvarsel"],
    ],
  },
  historie: {
    title: "Historisk kontekst",
    text: "Publiseringsår, regent, periode, hendelser og kilder.",
    rows: [
      ["800", "Tidligste historiske lag", "kontekst"],
      ["1642", "Sterkere strukturert grunnlag", "rikeligere data"],
      ["1905", "Unionsoppløsning", "relasjon"],
    ],
  },
  finans: {
    title: "Markedsinnsikt",
    text: "Verdi, trend, likviditet, historiske priser og økonomiske indikatorer.",
    rows: [
      ["3 124", "Prisobservasjoner", "+4,2 %"],
      ["12 mnd", "Trendperiode", "aktiv"],
      ["0 kr", "Manglende verdi", "ikke markedsverdi"],
    ],
  },
};

const tiers = [
  {
    name: "Free",
    tag: "Begrenset tilgang for å komme i gang.",
    monthly: { main: "0 kr", sub: "Alltid gratis", meta: "Ingen kortbinding" },
    yearly: { main: "0 kr", sub: "Alltid gratis", meta: "Ingen kortbinding" },
    features: ["Offentlig katalogutdrag", "Begrenset søk", "Medlemskapstilbud", "1 favorittobjekt"],
    cta: "Start gratis",
  },
  {
    name: "Bronze",
    tag: "Løpende månedsmedlemskap etter første år.",
    monthly: { main: "199 kr", sub: "per måned etter introår", meta: "Månedlig" },
    yearly: { main: "149 kr", sub: "første år", meta: "Introår · deretter 199 kr/mnd" },
    features: ["Flere katalogfilter", "Grunnleggende samling", "Hjerte og stjerne", "Enkel markedsverdi"],
    cta: "Velg Bronze",
  },
  {
    name: "Silver",
    tag: "Avansert samler- og analysemedlemskap.",
    monthly: { main: "500 kr", sub: "per måned", meta: "Månedlig tilgang" },
    yearly: { main: "3 000 kr", sub: "/år tilbud", meta: "Årlig · mest valgt" },
    features: ["Avansert katalog", "Flere filter og søk", "Mer historikk", "Samlingsanalyse", "Auksjonsvarsel"],
    cta: "Velg Silver",
    featured: true,
  },
  {
    name: "Gold",
    tag: "For samlere og aktører som trenger avansert tilgang.",
    monthly: { main: "Kun år", sub: "Ingen ordinær månedsplan", meta: "Årsavtale" },
    yearly: { main: "10 000 kr", sub: "første år", meta: "20 000 kr/år etterpå" },
    features: ["Avansert katalog", "Marked og index", "Forhandler kan søke separat", "Kun årsavtale"],
    cta: "Søk Gold",
  },
  {
    name: "Platinum",
    tag: "Profesjonell analyse, alle land og bredere kildegrunnlag.",
    monthly: { main: "Kun år", sub: "Ingen månedlig pris", meta: "Kontakt Collectium" },
    yearly: { main: "50 000 kr", sub: "/ 2 år", meta: "100 000 kr/år ordinært" },
    features: ["Ingen månedlig pris", "Alle land og kilder", "Full historikk", "Profesjonell analyse"],
    cta: "Kontakt oss",
  },
];

export default function CollectiumStartsideV46React() {
  const [template, setTemplate] = useState<TemplateKey>("collectium");
  const [designOpen, setDesignOpen] = useState(false);
  const [catalogSegment, setCatalogSegment] = useState<CatalogSegment>("samler");
  const [statsTab, setStatsTab] = useState<CatalogSegment>("historie");
  const [billing, setBilling] = useState<BillingMode>("yearly");
  const [fontSize, setFontSize] = useState(14);

  const selectedSegment = catalogSegments[catalogSegment];
  const selectedStats = statsTabs[statsTab];
  const yearly = billing === "yearly";

  return (
    <main
      className={styles.page}
      data-template={template}
      style={{ fontSize: `${fontSize}px` }}
    >
      <header className={styles.top}>
        <a className={styles.brand} href="/startside" aria-label="Collectium startside">
          <img src="/collectium-tema/collectium-tema-logo-c.png" alt="" />
          <span>Collectium</span>
        </a>

        <nav className={styles.nav} aria-label="Hovedmeny">
          <a href="/startside">Forsiden</a>
          <a href="/katalog">Katalog</a>
          <a href="/auksjoner">Auksjon</a>
          <a href="/katalog?segment=historie">Historie</a>
          <a href="/min-side">Min samling</a>
        </nav>

        <div className={styles.topActions}>
          <button
            type="button"
            className={styles.designTrigger}
            onClick={() => setDesignOpen(true)}
            aria-expanded={designOpen}
          >
            Design
          </button>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="/login">Logg inn</a>
          <a className={`${styles.btn} ${styles.btnGold}`} href="/sign-up">Bli medlem</a>
        </div>
      </header>

      <section className={`${styles.hero} ${styles.darkSection}`}>
        <div className={styles.heroBg} />
        <div className={styles.heroFade} />
        <div className={styles.heroYear}>2022</div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>For samlere · For historien · For markedet</p>
          <h1>
            For samlere.
            <br />
            Av samlere.
            <br />
            Alt på <em>ett</em> sted.
          </h1>
          <p className={styles.heroSub}>
            Collectium samler norske sedler, mynter, historiske relasjoner og markedsdata i én datadrevet katalog.
          </p>
          <p className={styles.heroLead}>
            Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
          </p>

          <div className={styles.heroActions}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="/katalog">Utforsk katalogen</a>
            <a className={`${styles.btn} ${styles.btnSecondary}`} href="#katalog">Se demoen</a>
          </div>

          <div className={styles.heroStats}>
            <Stat number="800 →" label="Tidslinje fra år" />
            <Stat number="80 000" label="Informasjon om relasjoner til mynter og sedler" />
            <Stat number="3" label="Samler · Historie · Finans" />
          </div>
        </div>
      </section>

      <section className={styles.manifest}>
        <div className={styles.wrap}>
          <Roman nr="I" label="Manifest" />
          <h2 className={styles.sectionH}>En relasjonskatalog bygd på data.</h2>
          <p className={styles.sectionLead}>
            Collectium er bygget rundt objekter som alltid skal forstås sammen med kilde,
            objektgruppe, årstall, variant, regent, materiale, relasjoner og markedsstatus.
            Katalogen er ikke en flat produktliste — den er et system der hvert objekt kan
            leses som samlerdata, historiedata og finansdata.
          </p>

          <div className={styles.manifestGrid}>
            <InfoCard nr="I · For samlere" title="Samlerstatus, på objektet." text="Hjerte, stjerne, Min samling, egne lister, kjøp, salg og dokumentasjon følger objektet uten å blande private data med katalogens sannhet." />
            <InfoCard nr="II · For historien" title="Historien er en relasjon." text="Tidslinjen går fra år 800 og kan koble objektår, publiseringsår, regent, union, historisk hendelse, befolkning og økonomisk kontekst." />
            <InfoCard nr="III · For markedet" title="Marked i kontekst." text="0 kr betyr ikke reell verdi, men manglende vurdering. Finansvisning skiller verdi, trend, likviditet, auksjon, nettbutikk og prisobservasjoner." />
          </div>
        </div>
      </section>

      <section className={`${styles.history} ${styles.darkSection}`}>
        <div className={styles.bgYear}>1877</div>
        <div className={styles.wrapWide}>
          <Roman nr="II" label="Historie" />
          <div className={styles.historyGrid}>
            <blockquote>
              Hver krone, hver seddel, hvert merke fra unionstiden bærer sporene av sin tid.
              Vi bevarer sporene.
            </blockquote>
            <div>
              <h2 className={styles.sectionH}>Historien lever <em>i hver gjenstand.</em></h2>
              <p className={styles.sectionLead}>
                Katalogen kan vise publiseringsår, objektår, regent, historisk periode,
                hendelser, funn, personer og kildegrunnlag som relasjoner rundt objektet.
              </p>
              <div className={styles.timeline}>
                <Timeline year="800" title="Tidlige historiske lag" text="Vikingtid, handel, kongemakt og regionale relasjoner." />
                <Timeline year="1642" title="Sterkere kildegrunnlag" text="Fra 1600-tallet blir strukturert historisk data mer anvendelig." />
                <Timeline year="1905" title="Union og nasjon" text="Objekter kan kobles mot politiske og historiske skifter." />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="katalog" className={styles.catalog}>
        <div className={styles.wrapWide}>
          <Roman nr="III" label="Katalogdemo" />
          <div className={styles.catalogIntro}>
            <div>
              <h2 className={styles.sectionH}>Katalogen viser objektet i sammenheng.</h2>
              <p className={styles.sectionLead}>
                Dette feltet demonstrerer Collectium sitt horisontale visningskort.
                Kortet endrer informasjon etter objektgruppe, periodefilter og valgt perspektiv:
                Samler, Historie eller Finans. I ferdig løsning skal valgene leses fra DB-resolved
                data, ikke hardkodes i frontend.
              </p>
            </div>

            <div className={styles.objectKindSwitch} aria-label="Velg objektgruppe">
              <button
                type="button"
                className={objectKind === "banknote" ? styles.on : ""}
                onClick={() => setObjectKind("banknote")}
                aria-pressed={objectKind === "banknote"}
              >
                Seddel
              </button>
              <button
                type="button"
                className={objectKind === "coin" ? styles.on : ""}
                onClick={() => setObjectKind("coin")}
                aria-pressed={objectKind === "coin"}
              >
                Mynt
              </button>
            </div>
          </div>

          <div className={styles.periodFilter}>
            <div className={styles.periodHead}>
              <div>
                <span>Periodefilter</span>
                <strong>{selectedPeriod.label} · {selectedPeriod.years}</strong>
                <p>{selectedPeriod.text}</p>
              </div>

              <div className={styles.segmentMiniSwitch} aria-label="Velg katalogperspektiv">
                {(["samler", "historie", "finans"] as CatalogSegment[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={catalogSegment === item ? styles.on : ""}
                    onClick={() => setCatalogSegment(item)}
                    aria-pressed={catalogSegment === item}
                  >
                    {catalogSegments[item].title}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.periodRail}>
              {periodFilters.map((period) => (
                <button
                  key={period.key}
                  type="button"
                  className={periodKey === period.key ? styles.activePeriod : ""}
                  onClick={() => setPeriodKey(period.key)}
                  aria-pressed={periodKey === period.key}
                >
                  <strong>{period.label}</strong>
                  <span>{period.years}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.horizontalObjectCard}>
            <div className={styles.cardTabs}>
              {(["samler", "historie", "finans"] as CatalogSegment[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={catalogSegment === item ? styles.activeTab : ""}
                  onClick={() => setCatalogSegment(item)}
                >
                  {catalogSegments[item].title}
                </button>
              ))}
            </div>

            <div className={styles.objectMain}>
              <div className={styles.objectImage}>
                <span>{selectedObject.imageLabel}</span>
                <strong>{objectKind === "banknote" ? "NORGES BANK" : "NORGES MYNT"}</strong>
                <em>{selectedObject.period}</em>
              </div>

              <div className={styles.objectInfo}>
                <h3>{selectedObject.title}</h3>
                <p>{selectedObject.subtitle}</p>

                <div className={styles.objectFacts}>
                  <div>
                    <span>Valørutgave</span>
                    <strong>{selectedObject.value}</strong>
                  </div>
                  <div>
                    <span>Utgave</span>
                    <strong>{selectedObject.issue}</strong>
                  </div>
                  <div>
                    <span>Variant</span>
                    <strong>{selectedObject.variant}</strong>
                  </div>
                  <div>
                    <span>Sjeldenhet</span>
                    <strong>{selectedObject.rarity}</strong>
                  </div>
                </div>

                <div className={styles.objectRelation}>
                  {selectedObject.relation}
                </div>
              </div>

              <aside className={styles.objectSide}>
                <div>
                  <span>Hjerte</span>
                  <strong>{selectedObject.hearts}</strong>
                </div>
                <div>
                  <span>Stjerne</span>
                  <strong>{selectedObject.stars}</strong>
                </div>
                <div>
                  <span>Auksjon</span>
                  <strong>{selectedObject.auctions}</strong>
                </div>
                <div>
                  <span>Nettbutikk</span>
                  <strong>{selectedObject.shops}</strong>
                </div>
                <div className={styles.estimatedPrice}>
                  <span>Estimert pris</span>
                  <strong>{selectedObject.price}</strong>
                  <em>Vurdert</em>
                </div>
              </aside>
            </div>

            <div className={styles.dynamicField}>
              <div className={styles.dynamicIcon}>
                {catalogSegment === "samler" ? "♡" : catalogSegment === "historie" ? "Ⅲ" : "↗"}
              </div>

              <div className={styles.dynamicText}>
                <h3>{selectedSegment.title} · dynamisk felt</h3>

                {catalogSegment === "samler" ? (
                  <div className={styles.dynamicGrid}>
                    <DataPair label="Brukerstatus" value="Hjerte, stjerne og Min samling" />
                    <DataPair label="Samling" value="Privat som standard" />
                    <DataPair label="Dokumentasjon" value="Bilder, kvalitet og kjøp/salg" />
                    <DataPair label="Handling" value="Åpne objekt · legg i samling" />
                  </div>
                ) : null}

                {catalogSegment === "historie" ? (
                  <div className={styles.dynamicGrid}>
                    <DataPair label="Regent / konge" value={selectedObject.ruler} />
                    <DataPair label="Periode" value={selectedObject.period} />
                    <DataPair label="Kilde" value={selectedObject.source} />
                    <DataPair label="Kort forklaring" value="Objektet kobles til regent, periode, signatur, motiv og kilde som egne relasjoner." />
                  </div>
                ) : null}

                {catalogSegment === "finans" ? (
                  <div className={styles.dynamicGrid}>
                    <DataPair label="Estimert pris" value={selectedObject.price} />
                    <DataPair label="Trend" value="+4,2 % · 12 mnd" />
                    <DataPair label="Marked" value="Auksjon og nettbutikk vises separat" />
                    <DataPair label="Prisregel" value="0 kr betyr manglende vurdering, ikke markedsverdi." />
                  </div>
                ) : null}

                <div className={styles.cardActions}>
                  <a className={`${styles.btn} ${styles.btnPrimary}`} href="/katalog">Åpne objekt</a>
                  <a className={`${styles.btn} ${styles.btnSecondary}`} href="/katalog?relasjon=1">Se relasjon</a>
                  <a className={`${styles.btn} ${styles.btnSecondary}`} href="/min-side">Legg i samling</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.catalogDefinition}>
            <strong>Definisjon</strong>
            <p>
              Denne modulen viser hvordan Collectium skal lese ett objekt gjennom flere datalag.
              Objektgruppe velger mynt eller seddel. Periodefilteret snevrer inn historisk kontekst.
              Samler, Historie og Finans endrer hvilke felt som vektlegges i visningskortet.
            </p>
          </div>
        </div>
      </section>
<section className={styles.statsIndex}>
        <div className={styles.wrapWide}>
          <Roman nr="IV" label="Index" />
          <h2 className={styles.sectionH}>Katalogoversikt, historisk kontekst og markedsinnsikt.</h2>

          <div className={styles.statsTabs}>
            {(["samler", "historie", "finans"] as CatalogSegment[]).map((item) => (
              <button
                key={item}
                type="button"
                className={statsTab === item ? styles.on : ""}
                onClick={() => setStatsTab(item)}
              >
                {catalogSegments[item].title}
              </button>
            ))}
          </div>

          <div className={styles.statsPanel}>
            <div>
              <h3>{selectedStats.title}</h3>
              <p>{selectedStats.text}</p>
            </div>
            <div className={styles.statsRows}>
              {selectedStats.rows.map(([num, label, meta]) => (
                <div className={styles.statsRow} key={`${num}-${label}`}>
                  <strong>{num}</strong>
                  <span>{label}</span>
                  <em>{meta}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.deepData} ${styles.darkSection}`}>
        <div className={styles.wrapWide}>
          <Roman nr="V" label="Datalag" />
          <h2 className={styles.deepTitle}>Dybdedata i praksis</h2>
          <div className={styles.deepGrid}>
            <InfoCard nr="01" title="Samleobjekt" text="Objekt-ID, kilde, objektgruppe, valør, utgave, variant og brukerstatus." />
            <InfoCard nr="02" title="Historisk kontekst" text="Regent, årstall, periode, hendelser, personer, funn og kildelag." />
            <InfoCard nr="03" title="Markedsdata" text="Prisobservasjoner, trend, verdi, likviditet, auksjon og nettbutikk." />
          </div>
        </div>
      </section>

      <section className={`${styles.regents} ${styles.darkSection}`}>
        <div className={styles.wrapWide}>
          <Roman nr="VI" label="Regenter" />
          <div className={styles.regentGrid}>
            <div>
              <h2 className={styles.sectionH}>Fra Oscar II <em>til Harald V.</em></h2>
              <p className={styles.sectionLead}>
                Objektene kan bindes mot regenter, dynastier, unioner og lokale historiske perioder.
              </p>
              <div className={styles.smallStats}>
                <Stat number="1872" label="Oscar II" />
                <Stat number="1905" label="Unionsskifte" />
                <Stat number="1991" label="Harald V" />
              </div>
            </div>
            <div className={styles.regentPanel}>
              <span>ANNO</span>
              <strong>Relasjonspresentasjon</strong>
              <p>Regent · Periode · Objekt · Kilde · Historisk hendelse</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.collection}>
        <div className={styles.wrapWide}>
          <Roman nr="VII" label="Min samling" />
          <div className={styles.collectionGrid}>
            <div className={styles.dashboard}>
              <span>Min samling · 47 objekter</span>
              <div className={styles.dashboardNums}>
                <strong>47</strong>
                <strong>624 200</strong>
                <strong>+12%</strong>
              </div>
              <Progress label="Norske sedler" value="82%" />
              <Progress label="Mynter" value="46%" />
              <Progress label="Historiske dokumenter" value="21%" />
            </div>
            <div>
              <h2 className={styles.sectionH}>Ditt arkiv, <em>ditt valg av synlighet.</em></h2>
              <p className={styles.sectionLead}>
                Registrer kjøp, salg, kvalitet, dokumentasjon, bilder og historikk.
                Samlingen er privat som standard og kan deles kontrollert.
              </p>
              <div className={styles.heroActions}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="/min-side">Start samlingen</a>
                <a className={`${styles.btn} ${styles.btnSecondary}`} href="/samling">Slik fungerer det</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.market} ${styles.darkSection}`}>
        <div className={styles.wrapWide}>
          <Roman nr="VIII" label="Marked" />
          <h2 className={styles.sectionH}>Historisk og finansiell innsikt gjennom flere tidslag.</h2>
          <p className={styles.sectionLead}>
            Verdi, trend, likviditet, auksjoner, valuta, metall og KPI kan samles i samme analyseflate.
          </p>

          <div className={styles.marketGrid}>
            <InfoCard nr="A" title="Fra perioder til objektforståelse" text="Objektets markedsposisjon leses sammen med historisk og økonomisk kontekst." />
            <InfoCard nr="B" title="Indikatorer i flere lag" text="Valuta, metall, prisobservasjoner og historiske data settes sammen." />
            <InfoCard nr="C" title="Hvorfor verdi utvikler seg" text="Trend og likviditet forklares gjennom både objektdata og markedshendelser." />
          </div>
        </div>
      </section>

      <section className={`${styles.membership} ${styles.darkSection}`}>
        <div className={styles.wrapWide}>
          <div className={styles.membershipHead}>
            <div>
              <Roman nr="IX" label="Medlemskap" />
              <h2 className={styles.sectionH}>Riktige priser, <em>riktig</em> tilgangsnivå.</h2>
              <p className={styles.sectionLead}>
                Fem nivåer fra gratis-tilgang til profesjonell analyse. Velg månedlig eller årlig fakturering.
              </p>
            </div>

            <div className={styles.billingToggle} role="group" aria-label="Velg fakturering">
              <button
                type="button"
                className={billing === "monthly" ? styles.on : ""}
                onClick={() => setBilling("monthly")}
                aria-pressed={billing === "monthly"}
              >
                Månedlig
              </button>
              <button
                type="button"
                className={billing === "yearly" ? styles.on : ""}
                onClick={() => setBilling("yearly")}
                aria-pressed={billing === "yearly"}
              >
                Årlig
              </button>
            </div>
          </div>

          <div className={styles.tierGrid}>
            {tiers.map((tier) => {
              const price = yearly ? tier.yearly : tier.monthly;
              return (
                <article
                  className={`${styles.tier} ${tier.featured ? styles.featured : ""}`}
                  key={tier.name}
                >
                  {tier.featured ? <span className={styles.tierBadge}>Aktiv samler</span> : null}
                  <h3>{tier.name}</h3>
                  <p>{tier.tag}</p>
                  <div className={styles.tierPrice}>
                    <strong>{price.main}</strong>
                    <span>{price.sub}</span>
                    <em>{price.meta}</em>
                  </div>
                  <ul>
                    {tier.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <button type="button" className={styles.tierCta}>{tier.cta}</button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={styles.ctaContent}>
          <h2>Bli en del av <em>Collectium-arkivet.</em></h2>
          <p>
            Gratis å starte. Katalogen gir inngang til Samler, Historie og Finans — fra privat samling til historisk kontekst og markedsutvikling.
          </p>
          <div className={styles.centerActions}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="/sign-up">Opprett konto</a>
            <a className={`${styles.btn} ${styles.btnSecondary}`} href="/katalog">Se katalogen</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src="/collectium-tema/collectium-tema-logo-wide.png" alt="Collectium" />
        <p>Norske sedler · mynter · historie · marked · samling</p>
      </footer>

      {designOpen ? (
        <aside className={styles.designMenu} role="dialog" aria-modal="true" aria-label="Design">
          <div className={styles.designHead}>
            <strong>Design</strong>
            <button type="button" onClick={() => setDesignOpen(false)} aria-label="Lukk designpanel">×</button>
          </div>

          <h3>Tema</h3>
          <div className={styles.designList}>
            {templates.map((item) => (
              <button
                key={item.id}
                type="button"
                className={template === item.id ? styles.on : ""}
                onClick={() => setTemplate(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.desc}</small>
                <em>{item.tone}</em>
              </button>
            ))}
          </div>

          <h3>Tekststørrelse</h3>
          <input
            type="range"
            min={12}
            max={18}
            value={fontSize}
            onChange={(event) => setFontSize(Number(event.target.value))}
          />
          <p>{fontSize}px</p>

          <button type="button" className={styles.resetButton} onClick={() => {
            setTemplate("collectium");
            setFontSize(14);
          }}>
            Tilbakestill
          </button>
        </aside>
      ) : null}
    </main>
  );
}

function Roman({ nr, label }: { nr: string; label: string }) {
  return (
    <div className={styles.roman}>
      <span>{nr}</span>
      <strong>{label}</strong>
      <i />
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className={styles.stat}>
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}

function InfoCard({ nr, title, text }: { nr: string; title: string; text: string }) {
  return (
    <article className={styles.infoCard}>
      <span>{nr}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Timeline({ year, title, text }: { year: string; title: string; text: string }) {
  return (
    <div className={styles.timelineRow}>
      <strong>{year}</strong>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function DataPair({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.dataPair}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Progress({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.progress}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}



