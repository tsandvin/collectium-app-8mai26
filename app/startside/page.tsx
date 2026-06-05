/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Startside Public V7
 *
 * Definering / formål:
 * Offentlig Collectium startside i PDF-/HTML-retning.
 * Skal ikke eie AppShell, sidemeny, PageFrame, html, body eller global bakgrunn.
 *
 * Bruksområde:
 * Vises inne i global CollectiumAppShell. /startside har toppbar, men ingen sidemeny.
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 */

import Link from "next/link";

const reasons = [
  "Relasjonsbasert katalog med historisk dybde",
  "Samler, Historie og Finans i samme objektvisning",
  "Markedsdata, auksjon og index koblet til samme objektgrunnlag",
  "Forhandlerflyt for vurdering, salg, auksjon og oppgjør",
  "Museum- og historielag for personer, perioder, regenter og motiver",
  "Offentlig landing uten tekniske databasefelt eller intern systemtekst",
];

const plans = [
  {
    name: "Free",
    price: "0 kr",
    sub: "Gratis",
    text: "Begrenset tilgang for å komme i gang.",
    points: ["Offentlig katalogutdrag", "Begrenset søk", "Medlemskapstilbud"],
    action: "Start gratis",
  },
  {
    name: "Bronze",
    price: "149 kr første år",
    sub: "199 kr/mnd etterpå",
    text: "For samlere som vil bruke ønskeliste og grunnleggende samlingsverktøy.",
    points: ["Flere katalogfilter", "Grunnleggende samling", "Hjerte og stjerne", "Enkel markedsverdi"],
    action: "Velg Bronze",
  },
  {
    name: "Silver",
    price: "3 000 kr/år tilbud",
    sub: "6 000 kr/år eller 500 kr/mnd",
    text: "For aktive samlere som vil ha mer historikk og bedre oversikt.",
    points: ["Avansert katalog", "Flere filter", "Mer historikk", "Samlingsanalyse"],
    action: "Velg Silver",
    active: true,
  },
  {
    name: "Gold",
    price: "10 000 kr første år",
    sub: "20 000 kr/år etterpå",
    text: "For avansert bruk, forhandlertilgang eller profesjonell samleraktivitet.",
    points: ["Avansert katalog", "Marked og index", "Forhandler kan søke separat", "Kun årsavtale"],
    action: "Søk Gold",
  },
  {
    name: "Platinum",
    price: "50 000 kr / 2 år",
    sub: "100 000 kr/år",
    text: "For full tilgang, flere kilder og profesjonell analyse.",
    points: ["Ingen månedlig pris", "Alle land og kilder", "Full historikk", "Profesjonell analyse"],
    action: "Kontakt oss",
  },
];

const features = [
  ["Samler", "Start, organiser og bygg samlingen din med egne lister, hjerte, stjerne og private notater."],
  ["Organisering av samling", "Hold oversikt over objekter, familiehistorie, bilder, kjøp, salg og dokumentasjon."],
  ["Verdisettelse & innhold", "Følg verdi, utvikling, prisobservasjoner og samlingshistorikk over tid."],
  ["Forhandler kontakt", "Koble samlere og forhandlere på en ryddig måte for vurdering og salg."],
  ["Auksjoner", "Godkjente objekter kan senere vurderes, publiseres og brukes som prisobservasjoner."],
  ["Index marked", "Se utvikling mot marked, auksjon, nettbutikk og samlingsdata."],
  ["Objekt sammenligning", "Sammenlign objekter, varianter, perioder og relasjoner på tvers av katalogen."],
  ["Historisk-museum modul", "Vis personer, perioder, regenter, motiver og materiale som relasjoner."],
];

function SignatureCard({
  title,
  subtitle,
  text,
}: {
  title: string;
  subtitle: string;
  text: string;
}) {
  return (
    <article className="ctv7-card">
      <h3>{title}</h3>
      <p className="ctv7-card__sub">{subtitle}</p>
      <p>{text}</p>
      <span className="ctv7-signature">Collectium</span>
    </article>
  );
}

export default function StartsidePage() {
  return (
    <div className="ctv7-start">
      <section className="ctv7-hero">
        <div className="ctv7-watermark">ANNO 2022</div>

        <div className="ctv7-hero__copy">
          <p className="ctv7-eyebrow">For samlere · for historien · for markedet</p>
          <h1>
            For samlere.
            <br />
            Av samlere.
            <br />
            Alt på ett sted.
          </h1>
          <p className="ctv7-lead">
            Samling, historie, marked og trygg oversikt i én strukturert plattform.
          </p>
          <p className="ctv7-text">
            Collectium samler katalog, egen samling, verdivurdering, historiske relasjoner,
            auksjoner, forhandlerkontakt og markedsutvikling i ett miljø.
          </p>
          <div className="ctv7-actions">
            <Link href="/sign-up" className="ctv7-button ctv7-button--primary">
              Start gratis
            </Link>
            <Link href="/katalog" className="ctv7-button">
              Se katalog
            </Link>
          </div>
          <div className="ctv7-chiprow">
            <span>Relasjonsbasert katalog</span>
            <span>Oppdatert marked</span>
            <span>Sikker samling</span>
          </div>
        </div>

        <div className="ctv7-object-demo">
          <div className="ctv7-demo-tabs">
            <span>Samler</span>
            <span>Historie</span>
            <span>Finans</span>
          </div>
          <div className="ctv7-demo-card">
            <div className="ctv7-demo-image">Sedler</div>
            <div>
              <h2>10 kroner 1949 A</h2>
              <p>Norges Bank · Haakon VII · Norske sedler</p>
              <strong>15 000 kr</strong>
              <span> samling</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ctv7-section ctv7-section--split">
        <div>
          <p className="ctv7-eyebrow">Hva er Collectium?</p>
          <h2>En samlet plattform for samlere</h2>
          <p className="ctv7-lead">
            Collectium skal gjøre det enklere å forstå, organisere og følge utviklingen i egne og offentlige samleobjekter.
          </p>
        </div>
        <div className="ctv7-reasons">
          {reasons.map((reason) => (
            <div key={reason}>● {reason}</div>
          ))}
        </div>
      </section>

      <section className="ctv7-section">
        <div className="ctv7-three">
          <SignatureCard title="Samler" subtitle="Bygg oversikt" text="Bygg samling, ønskeliste, favoritter, notater og dokumentasjon." />
          <SignatureCard title="Historie" subtitle="Relasjoner" text="Se objekter i sammenheng med utgaver, regenter, personer, perioder og materiale." />
          <SignatureCard title="Finans" subtitle="Marked" text="Følg verdi, trend, auksjon, nettbutikk og utvikling over tid." />
        </div>
      </section>

      <section className="ctv7-section ctv7-section--split">
        <div>
          <p className="ctv7-eyebrow">Samling</p>
          <h2>Samling og familie</h2>
          <p className="ctv7-lead">Samlinger har ofte historie, verdi og personlige minner.</p>
          <p className="ctv7-text">
            Collectium skal gjøre det enklere å organisere objekter, ta vare på opplysninger og bygge oversikt over tid.
          </p>
          <Link href="/min-side" className="ctv7-button">Les om Min samling</Link>
        </div>
        <div className="ctv7-illustration">Familie som ser på en samling</div>
      </section>

      <section className="ctv7-section ctv7-section--catalog">
        <div>
          <p className="ctv7-eyebrow">Katalog</p>
          <h2>Sedler og mynter som relasjonskatalog</h2>
          <p className="ctv7-lead">
            Katalogen skal ikke være en flat produktliste. Objektene vises med kilde, utgave, år, variant, relasjoner og markedskontekst.
          </p>
        </div>

        <div className="ctv7-preview-card">
          <div className="ctv7-demo-tabs">
            <span>Samler</span>
            <span>Historie</span>
            <span>Finans</span>
          </div>
          <div className="ctv7-demo-card">
            <div className="ctv7-demo-image">Sedler</div>
            <div>
              <small>Forenklet visningskort</small>
              <h2>10 kroner · 1949 · Litra A</h2>
              <p>Norges Bank · Haakon VII · Norske sedler</p>
              <div className="ctv7-chiprow">
                <span>Samling</span>
                <span>Ønskeliste</span>
                <span>Favoritt</span>
                <span>Kjøpspris</span>
              </div>
              <strong>15 000 kr</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="ctv7-section ctv7-section--split">
        <div>
          <p className="ctv7-eyebrow">Historie</p>
          <h2>Historie og konger</h2>
          <p className="ctv7-lead">
            Objekter kan knyttes til regenter, signaturer, produsenter, perioder, hendelser, materiale og proveniens.
          </p>
          <Link href="/katalog" className="ctv7-button">Utforsk historie</Link>
        </div>
        <div className="ctv7-illustration">Illustrasjon av historie og konger</div>
      </section>

      <section className="ctv7-section ctv7-section--split">
        <div>
          <p className="ctv7-eyebrow">Verdi og utvikling</p>
          <h2>Følg verdiutvikling over tid</h2>
          <p className="ctv7-lead">
            Markedsdata skal komme fra prisobservasjoner, auksjoner, nettbutikk og samlingshistorikk, ikke fra fiktive frontend-tall.
          </p>
          <Link href="/bors" className="ctv7-button">Se markedsoversikt</Link>
        </div>
        <div className="ctv7-illustration">Illustrasjon av verdi og utvikling</div>
      </section>

      <section className="ctv7-section ctv7-section--split">
        <div>
          <p className="ctv7-eyebrow">Auksjon</p>
          <h2>Auksjon som kontrollert markedskanal</h2>
          <p className="ctv7-lead">
            Godkjente objekter kan senere følges, vurderes, publiseres og brukes som prisobservasjoner etter salg.
          </p>
          <Link href="/auksjoner" className="ctv7-button">Åpne auksjon</Link>
        </div>
        <div className="ctv7-illustration">Illustrasjon av auksjonshammer</div>
      </section>

      <section className="ctv7-section">
        <p className="ctv7-eyebrow">Medlemskap</p>
        <h2>Velg tilgang etter hvordan du samler</h2>
        <p className="ctv7-text">
          Start gratis, bygg samling og utvid til mer historikk, flere filter og dypere markedsdata når du trenger det.
        </p>
        <div className="ctv7-plan-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.active ? "ctv7-plan is-active" : "ctv7-plan"}>
              {plan.active ? <span className="ctv7-plan__badge">Aktiv samler</span> : null}
              <h3>{plan.name}</h3>
              <p>{plan.text}</p>
              <strong>{plan.price}</strong>
              <small>{plan.sub}</small>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link href="/sign-up">{plan.action}</Link>
              <span className="ctv7-signature">Collectium</span>
            </article>
          ))}
        </div>
      </section>

      <section className="ctv7-section ctv7-section--features">
        <div>
          <p className="ctv7-eyebrow">Funksjoner</p>
          <h2>Alt du trenger for å starte, organisere, forstå og selge</h2>
          <div className="ctv7-feature-list">
            {features.map(([title]) => (
              <button key={title} type="button">{title}</button>
            ))}
          </div>
        </div>
        <div className="ctv7-feature-panel">
          <p className="ctv7-eyebrow">Mulighet i Collectium</p>
          <h2>Samler</h2>
          <p>
            Start, organiser og bygg samlingen din med egne lister, hjerte, stjerne og private notater.
          </p>
          <strong>
            Etter innlogging vises funksjonene med riktig tilgang, data og global sidemeny.
          </strong>
          <span className="ctv7-signature">Collectium</span>
        </div>
      </section>

      <section className="ctv7-section ctv7-section--split">
        <div>
          <p className="ctv7-eyebrow">Kom i gang</p>
          <h2>Start med katalogen. Bygg oversikt over tid.</h2>
          <p className="ctv7-lead">
            Utforsk objekter, opprett bruker og gjør Collectium til samlerens arbeidsflate.
          </p>
          <div className="ctv7-actions">
            <Link href="/sign-up" className="ctv7-button ctv7-button--primary">Start gratis</Link>
            <Link href="/katalog" className="ctv7-button">Utforsk katalogen</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
