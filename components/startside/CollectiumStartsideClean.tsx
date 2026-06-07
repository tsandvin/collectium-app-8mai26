"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideClean
 *
 * Definering / formål:
 * Ren Next.js/React startside for Collectium.
 * Én kontrollert komponent, én CSS-module, fire skinn og ingen globale knapp-overrides.
 *
 * Bruksområde:
 * /startside
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - landing.catalog.preview
 * - landing.membership.preview
 * - landing.regents.preview
 * - landing.market.preview
 *
 * Berørte API-ruter:
 * - Ingen i denne statiske frontend-previewen.
 * - Senere: /api/catalog, /api/membership, /api/market, /api/relations
 *
 * Berørte tabeller / views:
 * - Senere: ct_catalog_objects
 * - Senere: ct_v_feature_access_resolved
 * - Senere: ct_catalog_object_relations
 *
 * Dataretning:
 * Lokal preview-data -> React state -> UI.
 * MariaDB/API skal senere være sannhet.
 *
 * Logging:
 * Ingen i denne preview-komponenten.
 *
 * Versjon:
 * CT-STARTSIDE-CLEAN-0001 / CHANGE-2026-06-07-CLEAN-REACT-STARTSIDE
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumStartsideClean.module.css";


const marketImageStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, rgba(8, 10, 9, 0.96) 0%, rgba(8, 10, 9, 0.84) 42%, rgba(8, 10, 9, 0.92) 100%), url('/collectium-tema/anno-2022-konge-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
type ThemeKey = "collectium" | "enkel" | "museum" | "finans";
type SegmentKey = "samler" | "historie" | "finans";
type ObjectKind = "banknote" | "coin";
type PeriodMode = "king" | "signature" | "motif" | "finance";
type BillingMode = "monthly" | "annual";

const themes: Array<{ key: ThemeKey; label: string }> = [
  { key: "collectium", label: "Collectium" },
  { key: "enkel", label: "Enkel" },
  { key: "museum", label: "Museum" },
  { key: "finans", label: "Finans" }
];

const periods: Record<
  PeriodMode,
  {
    title: string;
    subtitle: string;
    text: string;
    items: Array<{ label: string; years: string; tone: "gold" | "green" | "dark" | "muted" }>;
  }
> = {
  king: {
    title: "Oscar II",
    subtitle: "1872–1905",
    text: "Kongeperioden filtrerer objekt, signaturer og historiske relasjoner.",
    items: [
      { label: "Oscar I", years: "1844–1859", tone: "gold" },
      { label: "Karl XV", years: "1859–1872", tone: "muted" },
      { label: "Oscar II", years: "1872–1905", tone: "green" },
      { label: "Haakon VII", years: "1905–1957", tone: "muted" },
      { label: "Olav V", years: "1957–1985", tone: "dark" }
    ]
  },
  signature: {
    title: "Winge / Getz",
    subtitle: "1877–1886",
    text: "Signaturperioden viser hvilke signaturer og personer som kobles til objektet.",
    items: [
      { label: "Winge / Getz", years: "1877–1886", tone: "green" },
      { label: "Bøhn / Kielland", years: "1886–1893", tone: "muted" },
      { label: "Rygg / Omsted", years: "1907–1913", tone: "dark" },
      { label: "Jahn / Broch", years: "1920–1939", tone: "gold" }
    ]
  },
  motif: {
    title: "Riksvåpen",
    subtitle: "1877–1901",
    text: "Motiv/person kobler symbol, portrett, motivfelt og relasjonssider.",
    items: [
      { label: "Riksvåpen", years: "1877–1901", tone: "green" },
      { label: "Oscar II portrett", years: "1872–1905", tone: "gold" },
      { label: "Norges Bank", years: "1890–1920", tone: "muted" },
      { label: "Haakon VII motiv", years: "1905–1957", tone: "dark" }
    ]
  },
  finance: {
    title: "Tidlig økonomi",
    subtitle: "1642+",
    text: "Finansiell periode styrer markeds-, indeks- og verdikontekst.",
    items: [
      { label: "Tidlig økonomi", years: "1642+", tone: "gold" },
      { label: "Kroner og øre", years: "1873+", tone: "green" },
      { label: "Bred finansbase", years: "ca. 1920+", tone: "muted" },
      { label: "Moderne marked", years: "1971–2024", tone: "dark" }
    ]
  }
};

const membership = [
  {
    name: "Free",
    desc: "Begrenset tilgang for å komme i gang.",
    monthly: "0 kr",
    annual: "0 kr",
    subMonthly: "Gratis",
    subAnnual: "Gratis",
    items: ["Offentlig katalogutdrag", "Begrenset søk", "Medlemskapstilbud", "1 favorittobjekt"],
    cta: "Start gratis"
  },
  {
    name: "Bronze",
    desc: "Løpende månedsmedlemskap etter første år.",
    monthly: "149 kr",
    annual: "149 kr",
    subMonthly: "første år · deretter 199 kr/mnd",
    subAnnual: "introår · deretter 199 kr/mnd",
    items: ["Flere katalogfilter", "Grunnleggende samling", "Hjerte og stjerne", "Enkel markedsverdi"],
    cta: "Velg Bronze"
  },
  {
    name: "Silver",
    desc: "Avansert samler- og analysemedlemskap.",
    monthly: "500 kr/mnd",
    annual: "3 000 kr",
    subMonthly: "månedlig tilgang",
    subAnnual: "/år tilbud · mest valgt",
    items: ["Avansert katalog", "Flere filter og søk", "Mer historikk", "Samlingsanalyse", "Auksjonsvarsel"],
    cta: "Velg Silver",
    featured: true
  },
  {
    name: "Gold",
    desc: "For samlere og aktører som trenger avansert tilgang.",
    monthly: "Kun år",
    annual: "10 000 kr",
    subMonthly: "årlig avtale kreves",
    subAnnual: "første år · 20 000 kr/år etterpå",
    items: ["Avansert katalog", "Marked og index", "Forhandler kan søke separat", "Kun årsavtale"],
    cta: "Søk Gold"
  },
  {
    name: "Platinum",
    desc: "Profesjonell analyse, alle land og bredere kildegrunnlag.",
    monthly: "Kun år",
    annual: "50 000 kr",
    subMonthly: "ingen månedlig pris",
    subAnnual: "/2 år · 100 000 kr/år ordinært",
    items: ["Ingen månedlig pris", "Alle land og kilder", "Full historikk", "Profesjonell analyse"],
    cta: "Kontakt oss"
  }
];

export default function CollectiumStartsideClean() {
  const [theme, setTheme] = useState<ThemeKey>("collectium");
  const [segment, setSegment] = useState<SegmentKey>("historie");
  const [objectKind, setObjectKind] = useState<ObjectKind>("banknote");
  const [periodMode, setPeriodMode] = useState<PeriodMode>("king");
  const [billing, setBilling] = useState<BillingMode>("annual");

  const period = periods[periodMode];

  const object = useMemo(() => {
    if (objectKind === "coin") {
      return {
        amount: "2",
        issuer: "NORGES MYNT",
        period: "1872–1905",
        title: "2 kroner · 1902",
        value: "2 kroner",
        issue: "Jubileumsmynt",
        variant: "Sølvmynt",
        rarity: "Etterspurt",
        meta: "Mynt · Norske mynter · Oscar II · KM 365",
        price: "1 850 kr",
        materialLabel: "Metall",
        material: "Sølv 0,800 · 15 g"
      };
    }

    return {
      amount: "100",
      issuer: "NORGES BANK",
      period: "1872–1905",
      title: "100 kroner · 1877",
      value: "100 kroner",
      issue: "1. utgave",
      variant: "Standardutgave",
      rarity: "Sjelden",
      meta: "Seddel · Norske sedler · Oscar II · NS 1459",
      price: "15 000 kr",
      materialLabel: "Signatur",
      material: "Winge / Getz"
    };
  }, [objectKind]);

  return (
    <main className={styles.page} data-theme={theme}>
      <TopNav theme={theme} setTheme={setTheme} />

      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>For samlere · fra markedsdata · for samling</p>
            <h1>
              For samlere.
              <br />
              Av samlere.
              <br />
              Alt på <em>ett</em> sted.
            </h1>
            <p>
              Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
              Katalog, samling, auksjon og markedsdata samlet i én struktur.
            </p>
            <div className={styles.heroLinks}>
              <a className={styles.primaryLink} href="/sign-up">Opprett konto</a>
              <a className={styles.textLink} href="/katalog">Se katalogen</a>
            </div>
            <div className={styles.stats}>
              <Stat value="12 847" label="objekter" />
              <Stat value="1817+" label="år med data" />
              <Stat value="5 land" label="kilder" />
              <Stat value="847" label="aktive analyser" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.archive}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>I perspektiv</p>
          <h2>Et arkiv bygd av samlere.</h2>
          <div className={styles.threeCols}>
            <Info title="Din samling, i ditt navn." text="Organiser objekter, hjerter, stjerner og historikk i en struktur som kan vokse." />
            <Info title="Hver mynt har en historie." text="Objekter kobles mot regenter, signaturer, motiv, perioder og historiske hendelser." />
            <Info title="Verdi i kontekst." text="Markedsdata kobles med prisobservasjoner, trend, indeks og tilgangsnivå." />
          </div>
        </div>
      </section>

      <section className={styles.historyDark}>
        <div className={styles.wrapTwo}>
          <div>
            <p className={styles.kicker}>Historie</p>
            <blockquote>
              Hver krone, hver seddel, hvert merke fra unionstiden bærer sporene av sin tid.
            </blockquote>
          </div>
          <div>
            <h2>Historien lever <em>i hver gjenstand.</em></h2>
            <Timeline rows={[
              ["1817", "Norges Bank finner sitt språk"],
              ["1875", "Standarden og kronen"],
              ["1905", "Selvstendighet og kongemotiv"],
              ["1942", "London-regjeringen"]
            ]} />
          </div>
        </div>
      </section>

      <section className={styles.catalog}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Katalog</p>
              <h2>Katalogen viser objektet i sammenheng.</h2>
              <p>
                Periodefilteret viser overlapp mellom konger, signaturer, motiv og finansperioder.
                Visningskortet bytter innhold etter Samler, Historie, Finans og objektgruppe.
              </p>
            </div>
            <div className={styles.switchGroup}>
              <button className={objectKind === "banknote" ? styles.active : ""} onClick={() => setObjectKind("banknote")}>Seddel</button>
              <button className={objectKind === "coin" ? styles.active : ""} onClick={() => setObjectKind("coin")}>Mynt</button>
            </div>
          </div>

          <div className={styles.periodBox}>
            <div className={styles.periodTop}>
              <div>
                <p className={styles.kicker}>Periodefilter</p>
                <h3>{period.title} · {period.subtitle}</h3>
                <p>{period.text}</p>
              </div>
              <div className={styles.periodButtons}>
                {([
                  ["king", "Konge"],
                  ["signature", "Signatur"],
                  ["motif", "Motiv/person"],
                  ["finance", "Finans"]
                ] as Array<[PeriodMode, string]>).map(([key, label]) => (
                  <button key={key} className={periodMode === key ? styles.active : ""} onClick={() => setPeriodMode(key)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.periodTrack}>
              {period.items.map((item) => (
                <button key={`${item.label}-${item.years}`} className={`${styles.periodPill} ${styles[item.tone]}`}>
                  <strong>{item.label}</strong>
                  <span>{item.years}</span>
                </button>
              ))}
            </div>
            <div className={styles.yearLine}>
              <span>1814</span><span>1872</span><span>1905</span><span>1957</span><span>2024</span>
            </div>
          </div>

          <div className={styles.catalogGrid}>
            <div>
              <div className={styles.segmentTabs}>
                {(["samler", "historie", "finans"] as SegmentKey[]).map((item) => (
                  <button key={item} className={segment === item ? styles.active : ""} onClick={() => setSegment(item)}>
                    {item[0].toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>

              <div className={styles.objectRow}>
                <div className={styles.objectStamp}>
                  <strong>{object.amount}</strong>
                  <span>{object.issuer}</span>
                  <small>{object.period}</small>
                </div>
                <div className={styles.objectFacts}>
                  <h3>{object.title}</h3>
                  <div className={styles.factGrid}>
                    <Fact label="Valørutgave" value={object.value} />
                    <Fact label="Utgave" value={object.issue} />
                    <Fact label="Variant / type" value={object.variant} />
                    <Fact label="Sjeldenhet" value={object.rarity} />
                  </div>
                  <p>{object.meta}</p>
                </div>
                <div className={styles.objectStatus}>
                  <Badge icon="♡" label="Hjerte" value="0" />
                  <Badge icon="☆" label="Stjerne" value="0" />
                  <Badge icon="⚒" label="Auksjon" value="3" />
                  <Badge icon="▦" label="Nettbutikk" value="1" />
                  <div className={styles.price}>
                    <span>Estimert pris</span>
                    <strong>{object.price}</strong>
                    <small>Vurdert</small>
                  </div>
                </div>
              </div>

              <div className={styles.dynamic}>
                <h3>{segment[0].toUpperCase() + segment.slice(1)} · dynamisk felt</h3>
                <div className={styles.dynamicGrid}>
                  <Fact label="Regent / konge" value={periodMode === "finance" ? "Tidlig økonomi" : "Oscar II"} />
                  <Fact label="Periode" value={period.subtitle} />
                  <Fact label={object.materialLabel} value={object.material} />
                  <Fact label="Motiv / person" value="Riksvåpen" />
                  <Fact label="Historisk kontekst" value="Unionstid, norsk seddelhistorie" />
                  <Fact label="Forklaring" value="Objektet kobles til regent, signatur og motiv/person." />
                </div>
                <div className={styles.actionLinks}>
                  <a href="/katalog">Åpne objekt</a>
                  <a href="/katalog?relasjoner=1">Se relasjon</a>
                  <a href="/min-samling">Legg i samling</a>
                </div>
              </div>
            </div>

            <aside className={styles.access}>
              <p className={styles.kicker}>Medlemskap</p>
              <h3>Medlemskap og katalogtilgang</h3>
              <p>
                Som medlem kan du organisere din samling og bruke katalogen som arbeidsverktøy.
                Tilgangsnivået bestemmer hvor dypt du kan filtrere, sammenligne og lese historiske,
                samlermessige og finansielle datalag.
              </p>
              <Access tier="Free" title="Enkel katalogvisning" />
              <Access tier="Bronze" title="Samling og brukerstatus" />
              <Access tier="Silver" title="Flere katalogfiltre" />
              <Access tier="Gold" title="Dypere innsikt" />
              <Access tier="Platinum" title="Full filterdybde" />
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.regents}>
        <div className={styles.wrapTwo}>
          <div>
            <p className={styles.kicker}>IV · Regenter</p>
            <h2>Fra Oscar II<br />til <em>Harald V.</em></h2>
            <p>
              Hver konge har sitt signaturpreg. Klikk på en regent og se alle objekter
              fra hans tid — sedler, mynter, medaljer og merker — sortert etter utgave,
              periode, motiv og signatursett.
            </p>
            <div className={styles.regentYears}>
              <a href="/katalog?regent=oscar-ii"><strong>1872</strong><span>Oscar II</span></a>
              <a href="/katalog?regent=haakon-vii"><strong>1905</strong><span>Haakon VII</span></a>
              <a href="/katalog?regent=olav-v"><strong>1957</strong><span>Olav V</span></a>
              <a href="/katalog?regent=harald-v"><strong>1991</strong><span>Harald V</span></a>
            </div>
            <div className={styles.regentLinks}>
              <a href="/katalog?segment=historie">Utforsk regenter</a>
              <a href="/katalog?view=tidslinje">Tidslinje</a>
            </div>
          </div>
          <div className={styles.regentImage} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.market} style={marketImageStyle}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>Index</p>
          <h2>Markedsdata fra <em>200 år.</em></h2>
          <p>Historisk og finansiell innsikt gjennom flere tidslag, med prisobservasjoner, indeks og valuta.</p>
          <div className={styles.marketStats}>
            <Stat value="8 432" label="observasjoner" />
            <Stat value="3 124" label="relasjoner" />
            <Stat value="+4,2 %" label="trend" />
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <div className={styles.wrap}>
          <div className={styles.pricingTop}>
            <div>
              <p className={styles.kicker}>Medlemskap</p>
              <h2>Riktige priser, <em>riktig</em> tilgangsnivå.</h2>
              <p>Fem nivåer fra gratis-tilgang til profesjonell analyse. Velg månedlig eller årlig fakturering.</p>
            </div>
            <div className={styles.billing}>
              <button className={billing === "monthly" ? styles.active : ""} onClick={() => setBilling("monthly")}>Månedlig</button>
              <button className={billing === "annual" ? styles.active : ""} onClick={() => setBilling("annual")}>Årlig</button>
            </div>
          </div>

          <div className={styles.priceGrid}>
            {membership.map((plan) => (
              <article key={plan.name} className={plan.featured ? styles.featuredPlan : ""}>
                {plan.featured ? <span className={styles.planBadge}>Aktiv samler</span> : null}
                <h3>{plan.name}</h3>
                <p>{plan.desc}</p>
                <strong>{billing === "annual" ? plan.annual : plan.monthly}</strong>
                <small>{billing === "annual" ? plan.subAnnual : plan.subMonthly}</small>
                <ul>
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a href="/sign-up">{plan.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.wrap}>
          <h2>Bli en del av<br /><em>Collectium-arkivet.</em></h2>
          <p>Gratis å starte. Premium og profesjonell tilgang kan bygges ut når samlingen vokser.</p>
          <div className={styles.heroLinks}>
            <a className={styles.primaryLink} href="/sign-up">Opprett konto</a>
            <a className={styles.textLink} href="/katalog">Se katalogen</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>© Collectium</footer>
    </main>
  );
}

function TopNav({ theme, setTheme }: { theme: ThemeKey; setTheme: (theme: ThemeKey) => void }) {
  return (
    <header className={styles.topbar}>
      <a className={styles.logo} href="/startside">◎ Collectium</a>
      <nav>
        <a href="/startside">Forsiden</a>
        <a href="/katalog">Katalog</a>
        <a href="/auksjon">Auksjon</a>
        <a href="/historie">Historie</a>
        <a href="/min-samling">Min samling</a>
      </nav>
      <div className={styles.themeBar}>
        {themes.map((item) => (
          <button key={item.key} className={theme === item.key ? styles.active : ""} onClick={() => setTheme(item.key)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.userLinks}>
        <a href="/login">Logg inn</a>
        <a href="/sign-up">Bli medlem</a>
      </div>
    </header>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.stat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Timeline({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className={styles.timeline}>
      {rows.map(([year, text]) => (
        <div key={year}><strong>{year}</strong><span>{text}</span></div>
      ))}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.fact}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Badge({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className={styles.badge}>
      <span>{icon}</span>
      <strong>{label}</strong>
      <b>{value}</b>
    </div>
  );
}

function Access({ tier, title }: { tier: string; title: string }) {
  return (
    <div className={styles.accessRow}>
      <strong>{tier}</strong>
      <span>{title}</span>
    </div>
  );
}



