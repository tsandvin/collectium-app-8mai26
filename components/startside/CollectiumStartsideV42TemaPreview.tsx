"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV42TemaPreview
 *
 * Definering / formål:
 * Kontrollert Collectium startside-preview med fire visuelle skins:
 * Collectium, Museum, Enkel og Finans.
 *
 * Bruksområde:
 * Brukes av /startside som visuell frontend-preview.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - public.startside.view
 * - public.theme.preview
 * - public.catalog.preview
 *
 * Berørte API-ruter:
 * - Ingen direkte.
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
 * CT-STARTSIDE-V42-TEMA-PREVIEW-0003
 */

import { useState } from "react";
import styles from "./CollectiumStartsideV42TemaPreview.module.css";

type ThemeKey = "collectium" | "museum" | "enkel" | "finans";
type BillingMode = "monthly" | "annual";

const themes: Array<{ key: ThemeKey; label: string }> = [
  { key: "collectium", label: "Collectium" },
  { key: "museum", label: "Museum" },
  { key: "enkel", label: "Enkel" },
  { key: "finans", label: "Finans" },
];

const catalogCards = [
  {
    value: "100",
    title: "100 kroner · Lagmann",
    meta: "1. utgave · 1877",
    price: "15 000 kr",
  },
  {
    value: "50",
    title: "50 kroner · 2. utgave",
    meta: "Norges Bank · 1899",
    price: "9 200 kr",
  },
  {
    value: "500",
    title: "500 kroner · 3. utgave",
    meta: "Variant · 1948",
    price: "23 400 kr",
  },
  {
    value: "1000",
    title: "1000 kroner · Lagmann",
    meta: "Serie · 1975",
    price: "4 500 kr",
  },
];

const timeline = [
  { year: "800", title: "Vikingtid og tidlig handel", text: "Tidlige historiske lag gir kontekst til perioder, funn og handel." },
  { year: "1642", title: "Stabilere kilder", text: "Fra 1600-tallet blir datagrunnlaget tydeligere og mer anvendelig." },
  { year: "1700+", title: "Marked og valuta", text: "KPI, valuta, metall og økonomiske kilder kan kobles mot objekter." },
  { year: "1920+", title: "Bred finansdata", text: "Flere indikatorer kan brukes samlet for markedsforståelse." },
];

const membership = [
  {
    name: "Free",
    monthlyPrice: "0 kr",
    annualPrice: "0 kr",
    monthlyText: "Start med katalog og enkel oversikt.",
    annualText: "Gratis startnivå med enkel katalogtilgang.",
    cta: "Start gratis",
  },
  {
    name: "Bronze",
    monthlyPrice: "149 kr / mnd",
    annualPrice: "1 788 kr / år",
    monthlyText: "Ønskeliste, favoritter og samlingsverktøy måned for måned.",
    annualText: "Årlig Bronze gir samme tilgang samlet i én årsbetaling.",
    cta: "Velg Bronze",
  },
  {
    name: "Silver",
    monthlyPrice: "499 kr / mnd",
    annualPrice: "3 000 kr / år",
    monthlyText: "Flere filter, historikk og markedsoversikt månedlig.",
    annualText: "Årlig Silver gir dypere filter, historikk og markedsdata til lavere årsmodell.",
    cta: "Velg Silver",
    featured: true,
  },
  {
    name: "Gold",
    monthlyPrice: "2 999 kr / mnd",
    annualPrice: "10 000 kr / år",
    monthlyText: "Forhandler- og profesjonell samleraktivitet månedlig.",
    annualText: "Årlig Gold for forhandler, auksjon, nettbutikk og profesjonell bruk.",
    cta: "Gå Gold",
  },
  {
    name: "Platinum",
    monthlyPrice: "Kun år",
    annualPrice: "50 000 kr / år",
    monthlyText: "Platinum har ikke ordinær månedsplan.",
    annualText: "Utvidet arkiv, analyse, flere kilder og bredere tilgang.",
    cta: "Kontakt oss",
  },
];

export default function CollectiumStartsideV42TemaPreview() {
  const [theme, setTheme] = useState<ThemeKey>("collectium");
  const [billing, setBilling] = useState<BillingMode>("monthly");
return (
    <main className={styles.page} data-theme={theme}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/startside" aria-label="Collectium startside">
          <span className={styles.brandMark}>C</span>
          <span>Collectium</span>
        </a>

        <nav className={styles.nav} aria-label="Hovedmeny">
          <a href="/katalog">Katalog</a>
          <a href="/auksjoner">Auksjon</a>
          <a href="/min-side">Min side</a>
          <a href="/admin">Admin</a>
        </nav>

        <div className={styles.themeSwitch} aria-label="Velg tema">
          {themes.map((item) => (
            <button
              key={item.key}
              type="button"
              className={theme === item.key ? styles.themeActive : ""}
              onClick={() => setTheme(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.watermark}>2022</div>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>For samlere · fra markedsdata · for samling</p>
          <h1>
            For samlere.
            <br />
            Av samlere.
            <br />
            Alt på <em>ett</em> sted.
          </h1>
          <p className={styles.lead}>
            Samlerplattformen for norske sedler, mynter, historie og markedsutvikling.
            Katalog, samling, auksjon, relasjoner og verdi samlet i én struktur.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="/katalog">Utforsk katalogen</a>
            <a className={styles.secondary} href="/login">Logg inn</a>
          </div>

          <div className={styles.stats}>
            <Stat value="12 847" label="objekter" />
            <Stat value="1817" label="år i tidslinje" />
            <Stat value="5 land" label="kilder og områder" />
            <Stat value="847" label="aktive relasjoner" />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.archive}`}>
        <div className={styles.sectionInner}>
          <p className={styles.kicker}>I sentrum</p>
          <h2>Et arkiv <em>bygd av samlere.</em></h2>
          <p className={styles.sectionText}>
            Collectium er ikke en database alene. Det er en levende struktur der
            hvert objekt kan kobles mot samling, historie, marked, kilder og relasjoner.
          </p>

          <div className={styles.threeCols}>
            <InfoBlock title="Din samling, i ditt navn" text="Hjerte, stjerne, Min samling, transaksjoner, notater og deling." />
            <InfoBlock title="Hver mynt har en historie" text="Regent, periode, utgave, funn, signaturer, personer og hendelser." />
            <InfoBlock title="Verdi i kontekst" text="Markedsverdi, prisobservasjoner, trend, likviditet og historisk økonomi." />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.history}`}>
        <div className={styles.split}>
          <div className={styles.quoteBox}>
            <p className={styles.kicker}>Historie</p>
            <blockquote>
              Hver krone, hver seddel, hvert merke fra unionstiden bærer sporene
              av sin tid. Vi bevarer sporene.
            </blockquote>
          </div>

          <div className={styles.timeline}>
            <p className={styles.kicker}>Historisk kontekst</p>
            <h2>Historien lever <em>i hver gjenstand.</em></h2>
            <p className={styles.sectionText}>
              Fra tidlige kilder til moderne markedsdata bygger Collectium en
              relasjonsmodell som forklarer hvorfor et objekt betyr noe.
            </p>

            {timeline.map((item) => (
              <div className={styles.timelineRow} key={item.year}>
                <strong>{item.year}</strong>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.catalog}`}>
        <div className={styles.sectionInner}>
          <p className={styles.kicker}>Katalog</p>
          <h2>12 847 objekter, <em>én kilde.</em></h2>
          <p className={styles.sectionText}>
            Norske sedler, mynter og historiske objekter samlet med kilde,
            objektgruppe, relasjoner og markedsdata.
          </p>

          <div className={styles.cardRow}>
            {catalogCards.map((card) => (
              <article className={styles.catalogCard} key={card.value}>
                <div className={styles.cardValue}>{card.value}</div>
                <div className={styles.cardImage} />
                <h3>{card.title}</h3>
                <p>{card.meta}</p>
                <strong>{card.price}</strong>
              </article>
            ))}
          </div>

          <div className={styles.actionsCenter}>
            <a className={styles.primary} href="/katalog">Åpne katalogen</a>
            <a className={styles.secondary} href="/katalog?segment=historie">Historie</a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.king}`}>
        <div className={styles.split}>
          <div>
            <p className={styles.kicker}>Relasjon</p>
            <h2>Fra Oscar II <br />til <em>Harald V.</em></h2>
            <p className={styles.sectionText}>
              Koble sedler og mynter mot regenter, perioder, utgaver, signaturer,
              hendelser og markedsdata.
            </p>

            <div className={styles.smallStats}>
              <Stat value="1872" label="start" />
              <Stat value="1905" label="union" />
              <Stat value="2022" label="arkiv" />
              <Stat value="1848" label="objekter" />
            </div>

            <div className={styles.actions}>
              <a className={styles.primary} href="/relasjon/konge">Se relasjoner</a>
              <a className={styles.secondary} href="/katalog">Til katalog</a>
            </div>
          </div>

          <div className={styles.artPanel}>
            <span>ANNO</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.collection}`}>
        <div className={styles.split}>
          <div className={styles.miniDashboard}>
            <p className={styles.kicker}>Min samling · 47 objekter</p>
            <div className={styles.dashboardTop}>
              <strong>47</strong>
              <strong>624 200</strong>
              <strong>1+</strong>
            </div>
            <Progress label="Norske sedler" value="82%" />
            <Progress label="Mynter" value="46%" />
            <Progress label="Historiske dokumenter" value="21%" />
          </div>

          <div>
            <p className={styles.kicker}>Din samling</p>
            <h2>Ditt arkiv, <em>ditt valg av synlighet.</em></h2>
            <p className={styles.sectionText}>
              Registrer kjøp, salg, kvalitet, dokumentasjon, bilder og historikk.
              Del enkeltobjekter eller grupper med tidslenke.
            </p>

            <div className={styles.actions}>
              <a className={styles.primary} href="/min-side">Min side</a>
              <a className={styles.secondary} href="/samling">Samling</a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.market}`}>
        <div className={styles.sectionInner}>
          <p className={styles.kicker}>Marked</p>
          <h2>Markedsdata fra <em>200 år.</em></h2>
          <p className={styles.sectionText}>
            Historisk og finansiell innsikt gjennom flere tidslag. Verdi, trend,
            likviditet, auksjoner, valuta, metall og KPI samlet i samme analyseflate.
          </p>

          <div className={styles.marketStats}>
            <Stat value="8 432" label="markedsobjekter" />
            <Stat value="3 124" label="prisobservasjoner" />
            <Stat value="+4,2 %" label="trend 12 mnd" />
          </div>

          <div className={styles.dataTable}>
            <div><span>1877</span><span>100 kroner · 1. utgave</span><strong>+12,4 %</strong></div>
            <div><span>1917</span><span>1 krone · litra A</span><strong>+8,1 %</strong></div>
            <div><span>1942</span><span>London-regjeringen</span><strong>+6,8 %</strong></div>
            <div><span>1975</span><span>1000 kroner · serie</span><strong>-1,2 %</strong></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.pricing}`}>
        <div className={styles.sectionInner}>
          <div className={styles.pricingHead}>
            <div>
              <p className={styles.kicker}>Medlemskap</p>
              <h2>Riktige priser, <em>riktig tilgangsnivå.</em></h2>
              <p className={styles.sectionText}>
                Start gratis. Utvid tilgang når du trenger flere filter, dypere historikk
                og mer markedsdata.
              </p>
            </div>

            <div className={styles.togglePill} role="group" aria-label="Velg betalingsperiode">
              <button
                type="button"
                className={billing === "annual" ? styles.billingActive : ""}
                onClick={() => setBilling("annual")}
                aria-pressed={billing === "annual"}
              >
                Årlig
              </button>
              <button
                type="button"
                className={billing === "monthly" ? styles.billingActive : ""}
                onClick={() => setBilling("monthly")}
                aria-pressed={billing === "monthly"}
              >
                Mnd
              </button>
            </div>
          </div>

          <div className={styles.priceGrid}>
            {membership.map((plan) => (
              <article
                key={plan.name}
                className={`${styles.priceCard} ${plan.featured ? styles.featuredPlan : ""}`}
              >
                {plan.featured ? <span className={styles.badge}>Anbefalt</span> : null}
                <h3>{plan.name}</h3>
                <strong>{billing === "monthly" ? plan.monthlyPrice : plan.annualPrice}</strong>
                <p>{billing === "monthly" ? plan.monthlyText : plan.annualText}</p>
                <ul>
                  <li>Katalogtilgang</li>
                  <li>Samlerfunksjoner</li>
                  <li>Historisk kontekst</li>
                </ul>
                <a href="/medlemskap">{plan.cta}</a>
              </article>
            ))}
          </div>

          <p className={styles.note}>
            Prisene er introduksjonspriser. Tilgang styres senere av medlemskap,
            feature_keys og DB-brytere.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <h2>Bli en del av <em>Collectium-arkivet.</em></h2>
          <p>
            Gratis å starte. Katalogen gir inngang til Samler, Historie og Finans.
          </p>
          <div className={styles.actionsCenter}>
            <a className={styles.primary} href="/sign-up">Start gratis</a>
            <a className={styles.secondary} href="/katalog">Se katalogen</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.brandMark}>C</span>
        <strong>Collectium</strong>
        <p>Norske sedler · mynter · historie · marked · samling</p>
      </footer>
    </main>
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

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className={styles.infoBlock}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Progress({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.progressRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}





