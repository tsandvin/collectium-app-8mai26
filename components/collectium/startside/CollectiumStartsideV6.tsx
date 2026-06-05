/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV6
 *
 * Definering / formal:
 * Innholdskomponent for ny Collectium startside basert pa startsideide v5.
 * Komponenten eier ikke globalt skall, DB eller tilgangslogikk.
 *
 * Bruksomrade:
 * Brukes av /startside som presentasjon av Collectium-konseptet.
 *
 * Berorte sider / routes:
 * - /startside
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.view
 * - landing.register
 * - landing.login
 * - landing.membership
 * - catalog.view
 * - auction.view
 * - dealer.view
 *
 * Berorte API-ruter:
 * - Fremtidig: GET /api/catalog/featured
 * - Fremtidig: GET /api/membership/plans
 *
 * Berorte tabeller / views:
 * - Fremtidig: ct_v_catalog_objects_resolved
 * - Fremtidig: ct_membership_plans
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Versjon:
 * CT-FILE-STARTSIDE-MINSIDE-V6-0002
 */
import Link from 'next/link';
import styles from './CollectiumStartsideV6.module.css';

const conceptCards = [
  {
    title: 'Samler',
    body: 'Bygg samling, onskeliste, favoritter, notater og dokumentasjon.',
  },
  {
    title: 'Historie',
    body: 'Se objekter i sammenheng med utgaver, regenter, personer, perioder og materiale.',
  },
  {
    title: 'Finans',
    body: 'Folg verdi, trend, auksjon, nettbutikk og utvikling over tid.',
  },
];

const memberships = [
  ['Free', 'Kom i gang med offentlig katalogutdrag og enkel utforsking.'],
  ['Bronze', 'For samlere som vil bruke onskeliste, favoritter og grunnleggende samlingsverktoy.'],
  ['Silver', 'For aktive samlere som vil ha flere filter, mer historikk og bedre oversikt.'],
  ['Gold', 'For avansert bruk, forhandlertilgang eller profesjonell samleraktivitet.'],
  ['Platinum', 'For full tilgang, flere kilder og profesjonell analyse.'],
] as const;

function Illustration({ label, tone = 'light' }: { label: string; tone?: 'light' | 'dark' | 'gold' }) {
  return (
    <figure className={`${styles.illustration} ${styles[tone]}`} aria-label={label}>
      <div className={styles.illustrationInner}>
        <span>{label}</span>
      </div>
    </figure>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

export default function CollectiumStartsideV6() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <SectionLabel>For samlere · for historien · for markedet</SectionLabel>
          <h1>For samlere. Av samlere. Alt på ett sted.</h1>
          <p className={styles.lead}>Samling, historie, marked og trygg oversikt i én strukturert plattform.</p>
          <p>
            Collectium samler katalog, egen samling, verdivurdering, historiske relasjoner,
            auksjoner, forhandlerkontakt og markedsutvikling i ett miljø.
          </p>
          <div className={styles.actionRow}>
            <Link href="/registrering" className={styles.primary}>Start gratis</Link>
            <Link href="/katalog" className={styles.secondary}>Se katalog</Link>
          </div>
        </div>
        <Illustration label="Illustrasjon av norske mynter og sedler" tone="gold" />
      </section>

      <section className={styles.intro}>
        <div className={styles.sectionHeading}>
          <SectionLabel>Hva er Collectium?</SectionLabel>
          <h2>En samlet plattform for samlere</h2>
          <p>Collectium skal gjøre det enklere å forstå, organisere og følge utviklingen i egne og offentlige samleobjekter.</p>
        </div>
        <div className={styles.cardGrid3}>
          {conceptCards.map((card) => (
            <article className={styles.signatureCard} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div>
          <SectionLabel>Samling</SectionLabel>
          <h2>Samling og familie</h2>
          <p className={styles.lead}>Samlinger har ofte historie, verdi og personlige minner.</p>
          <p>Collectium skal gjøre det enklere å organisere objekter, ta vare på opplysninger og bygge oversikt over tid.</p>
          <Link href="/min-side" className={styles.secondary}>Les om Min samling</Link>
        </div>
        <Illustration label="Familie som ser på en samling" />
      </section>

      <section className={styles.catalogSection}>
        <div>
          <SectionLabel>Katalog</SectionLabel>
          <h2>Sedler og mynter som relasjonskatalog</h2>
          <p className={styles.lead}>Katalogen skal ikke være en flat produktliste. Objektene vises med kilde, utgave, år, variant, relasjoner og markedskontekst.</p>
        </div>
        <div className={styles.demoCard} aria-label="Forenklet visningskort">
          <div className={styles.segmentTabs}>
            <span>Samler</span>
            <span>Historie</span>
            <span>Finans</span>
          </div>
          <div className={styles.demoBody}>
            <div className={styles.demoImage}>Sedler</div>
            <div>
              <p className={styles.demoKicker}>Forenklet visningskort</p>
              <h3>10 kroner · 1949 · Litra A</h3>
              <p>Norges Bank · Haakon VII · Norske sedler</p>
              <div className={styles.demoTags}>
                <span>Samling</span>
                <span>Ønskeliste</span>
                <span>Favoritt</span>
                <span>Kjøpspris</span>
              </div>
              <strong>15 000 kr <small>samling</small></strong>
            </div>
          </div>
        </div>
        <Illustration label="Illustrasjon av norske sedler" />
      </section>

      <section className={styles.splitSection}>
        <div>
          <SectionLabel>Historie</SectionLabel>
          <h2>Historie og konger</h2>
          <p className={styles.lead}>Objekter kan knyttes til regenter, signaturer, produsenter, perioder, hendelser, materiale og proveniens.</p>
          <Link href="/relasjon" className={styles.secondary}>Utforsk historie</Link>
        </div>
        <Illustration label="Illustrasjon av historie og konger" />
      </section>

      <section className={styles.splitSection}>
        <div>
          <SectionLabel>Eksempel på relasjon</SectionLabel>
          <h2>Karl Johan og historiske koblinger</h2>
          <p className={styles.lead}>En historisk relasjon kan åpne objektgrupper, perioder, personer, motiver og markedshistorikk på tvers av katalogen.</p>
        </div>
        <Illustration label="Illustrasjon av Karl Johan" tone="dark" />
      </section>

      <section className={styles.splitSectionAlt}>
        <div>
          <SectionLabel>Verdi og utvikling</SectionLabel>
          <h2>Følg verdiutvikling over tid</h2>
          <p className={styles.lead}>Markedsdata skal komme fra prisobservasjoner, auksjoner, nettbutikk og samlingshistorikk, ikke fra fiktive frontend-tall.</p>
          <Link href="/index" className={styles.secondary}>Se markedsoversikt</Link>
        </div>
        <Illustration label="Illustrasjon av verdi og utvikling" />
      </section>

      <section className={styles.splitSection}>
        <div>
          <SectionLabel>Auksjon</SectionLabel>
          <h2>Auksjon som kontrollert markedskanal</h2>
          <p className={styles.lead}>Godkjente objekter kan senere følges, vurderes, publiseres og brukes som prisobservasjoner etter salg.</p>
          <Link href="/auksjoner" className={styles.secondary}>Åpne auksjon</Link>
        </div>
        <Illustration label="Illustrasjon av auksjonshammer" tone="gold" />
      </section>

      <section className={styles.splitSection}>
        <div>
          <SectionLabel>Forhandlere og butikker</SectionLabel>
          <h2>For samlere, forhandlere og spesialister</h2>
          <p className={styles.lead}>Collectium skal gjøre det enklere å koble samlere, forhandlere og objekter på en ryddig måte.</p>
          <p>Forhandlere kan senere vise objekter, håndtere vurderinger, publisere salgsobjekter og bruke auksjon eller nettbutikk som kontrollerte markedskanaler.</p>
          <div className={styles.actionRow}>
            <Link href="/forhandler" className={styles.secondary}>Les om forhandler</Link>
            <Link href="/kontakt" className={styles.secondary}>Kontakt Collectium</Link>
          </div>
        </div>
        <Illustration label="Illustrasjon av forhandlere og butikker" />
      </section>

      <section className={styles.membershipSection}>
        <div className={styles.sectionHeading}>
          <SectionLabel>Medlemskap</SectionLabel>
          <h2>Velg tilgang etter hvordan du samler</h2>
          <p>Start gratis, bygg samling og utvid til mer historikk, flere filter og dypere markedsdata når du trenger det.</p>
          <Link href="/medlemskap" className={styles.secondary}>Se medlemskap</Link>
        </div>
        <div className={styles.membershipGrid}>
          {memberships.map(([title, body]) => (
            <article className={styles.signatureCard} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.splitSectionAlt}>
        <div>
          <SectionLabel>Internasjonalt</SectionLabel>
          <h2>Internasjonalt og annonsering</h2>
          <p className={styles.lead}>Collectium kan senere åpne for flere land, markedsnyheter, auksjonskoblinger og relevante annonseringsflater uten at katalogdata blandes.</p>
        </div>
        <Illustration label="Illustrasjon av internasjonalt og annonsering" />
      </section>

      <section className={styles.finalCta}>
        <SectionLabel>Kom i gang</SectionLabel>
        <h2>Start med katalogen. Bygg oversikt over tid.</h2>
        <p>Utforsk objekter, opprett bruker og gjør Collectium til samlerens arbeidsflate.</p>
        <div className={styles.actionRowCenter}>
          <Link href="/registrering" className={styles.primary}>Start gratis</Link>
          <Link href="/katalog" className={styles.secondary}>Utforsk katalogen</Link>
        </div>
      </section>
    </div>
  );
}
