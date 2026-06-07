/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartsideV47
 *
 * Definering / formål:
 * Ny startside basert på HTML-referanse for Collectium-forside,
 * omskrevet til Next.js/React-standard med global topbar og fire skins.
 *
 * Bruksområde:
 * - /startside
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.login
 * - landing.register
 * - landing.catalog.open
 * - local.template.skin.switch
 *
 * Berørte API-ruter:
 * - Ingen i v1. Innholdet er presentasjonsflate uten direkte DB-skriving.
 *
 * Berørte tabeller / views:
 * - Ingen i v1.
 *
 * Dataretning:
 * Statisk presentasjonsinnhold → Next.js → React → UI
 *
 * Logging:
 * Ingen serverlogging i v1.
 *
 * Versjon:
 * CT-FILE-STARTSIDE-V47-0002
 *
 * Endringsregel:
 * Startside skal ikke eie sidebar. Topbar importeres som gjenbrukbar layout-komponent.
 */

'use client'

import { useState } from 'react'
import CollectiumTopbar, {
  type CollectiumDesignState,
} from '@/components/layout/CollectiumTopbar'
import styles from './CollectiumStartsideV47.module.css'

const catalogObjects = [
  {
    title: '100 kroner · Oscar II · 1877',
    meta: 'NS 1 459 · Norske sedler',
    details: '100 kroner · 1. utgave · Standardutgave',
    rarity: 'RRR · Sjelden',
    value: '15 000 kr',
  },
  {
    title: '50 kroner · Oscar II · 1901',
    meta: 'NS 1 502 · Norske sedler',
    details: '50 kroner · 2. utgave · Signaturvariant',
    rarity: 'RR · Sjelden',
    value: '8 200 kr',
  },
  {
    title: '500 kroner · Haakon VII · 1948',
    meta: 'NS 1 887 · Norske sedler',
    details: '500 kroner · 2. utgave · Etterkrig',
    rarity: 'RRR · Sjelden',
    value: '28 000 kr',
  },
  {
    title: '1000 kroner · Haakon VII · 1942',
    meta: 'NS 1 991 · Norske sedler',
    details: '1000 kr · krigsutgave · Historisk relasjon',
    rarity: 'RRRR · Eks.',
    value: '145 000 kr',
  },
]

export default function CollectiumStartsideV47() {
  const [design, setDesign] = useState<CollectiumDesignState>({
    skin: 'collectium',
    fontSize: 'normal',
    screenSize: 'normal',
  })

  const [segment, setSegment] = useState<'samler' | 'historie' | 'finans'>('samler')

  return (
    <div
      className={styles.page}
      data-skin={design.skin}
      data-font={design.fontSize}
      data-screen={design.screenSize}
    >
      <CollectiumTopbar onDesignChange={setDesign} />

      <main className={styles.main}>
        <section id="intro" className={styles.hero}>
          <div className={styles.heroBackdrop} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>For samlere · For historien · For markedet</p>
            <h1>For samlere. Av samlere. Alt på ett sted.</h1>
            <p className={styles.lead}>
              Collectium samler norske sedler, mynter, historiske relasjoner og
              markedsdata i én datadrevet katalog.
            </p>

            <div className={styles.heroActions}>
              <a href="/katalog">Utforsk katalogen</a>
              <a href="#katalog" className={styles.secondaryAction}>
                Se katalogvisning
              </a>
            </div>

            <div className={styles.heroStats}>
              <article>
                <strong>800 →</strong>
                <span>Tidslinje fra år</span>
              </article>
              <article>
                <strong>80 000</strong>
                <span>Relasjoner til mynter og sedler</span>
              </article>
              <article>
                <strong>3</strong>
                <span>Samler · Historie · Finans</span>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.introGrid} aria-label="Collectium hovedprinsipper">
          <article>
            <span>I.</span>
            <h2>En relasjonskatalog bygd på data.</h2>
            <p>
              Objekter skal forstås sammen med kilde, objektgruppe, årstall,
              variant, regent, materiale, relasjoner og markedsstatus.
            </p>
          </article>

          <article>
            <span>II.</span>
            <h2>Historien er en relasjon.</h2>
            <p>
              Tidslinjen kan koble objektår, publiseringsår, regent, union,
              historisk hendelse, befolkning og økonomisk kontekst.
            </p>
          </article>

          <article>
            <span>III.</span>
            <h2>Marked i kontekst.</h2>
            <p>
              Finansvisning skiller verdi, trend, likviditet, auksjon,
              nettbutikk og prisobservasjoner. 0 kr betyr manglende vurdering.
            </p>
          </article>
        </section>

        <section id="katalog" className={styles.catalogSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Katalog</p>
            <h2>Katalogen viser objektet i sammenheng.</h2>
            <p>
              Sedler og mynter skal ikke blandes som flate produkter. Hvert
              objekt leses med kilde, objektgruppe og objekt-ID.
            </p>
          </div>

          <div className={styles.segmentPanel}>
            <div className={styles.segmentSwitch} role="tablist" aria-label="Katalogsegment">
              <button
                type="button"
                className={segment === 'samler' ? styles.activeSegment : ''}
                onClick={() => setSegment('samler')}
              >
                Samler
              </button>
              <button
                type="button"
                className={segment === 'historie' ? styles.activeSegment : ''}
                onClick={() => setSegment('historie')}
              >
                Historie
              </button>
              <button
                type="button"
                className={segment === 'finans' ? styles.activeSegment : ''}
                onClick={() => setSegment('finans')}
              >
                Finans
              </button>
            </div>

            <div className={styles.segmentContent}>
              {segment === 'samler' ? (
                <>
                  <h3>Samler</h3>
                  <p>
                    Viser ønskeliste, favoritt, Min samling, kvalitet,
                    sjeldenhet, kjøp/salg og dokumentasjon.
                  </p>
                </>
              ) : null}

              {segment === 'historie' ? (
                <>
                  <h3>Historie</h3>
                  <p>
                    Viser produsent, utgave, publiseringsår, regent, personer,
                    signaturer, materiale, funn, proveniens og relasjoner.
                  </p>
                </>
              ) : null}

              {segment === 'finans' ? (
                <>
                  <h3>Finans</h3>
                  <p>
                    Viser estimert verdi, trend, prisobservasjoner, auksjon,
                    nettbutikk, likviditet og historisk kjøpekraft.
                  </p>
                </>
              ) : null}
            </div>
          </div>

          <div className={styles.catalogGrid}>
            {catalogObjects.map((item) => (
              <a
                key={item.meta}
                className={styles.objectCard}
                href="/objekt/norske_sedler/banknote/demo"
              >
                <div className={styles.objectImage}>
                  <span>Collectium</span>
                </div>
                <div className={styles.objectBody}>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                  <p>{item.details}</p>
                  <div className={styles.objectMetaLine}>
                    <span>{item.rarity}</span>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="historie" className={styles.timelineSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Historie</p>
            <h2>Historisk og finansiell innsikt gjennom flere tidslag.</h2>
            <p>
              Collectium bygger oversikten på historiske datalag fra ca.
              800-tallet, tydeligere struktur fra 1642 og bredere økonomisk
              grunnlag fra 1700-, 1800- og 1900-tallet.
            </p>
          </div>

          <div className={styles.timelineGrid}>
            <article>
              <strong>800-tallet</strong>
              <span>Vikingtid, rikssamling, handelssteder og tidlige perioder.</span>
            </article>
            <article>
              <strong>1642 →</strong>
              <span>Mer anvendelig kobling mellom årstall, objekter og hendelser.</span>
            </article>
            <article>
              <strong>1700–1800</strong>
              <span>Pris, inflasjon, lønn, valuta, metall og pengeverdi.</span>
            </article>
            <article>
              <strong>1920 →</strong>
              <span>Bredere finansielt grunnlag med flere økonomiske indikatorer.</span>
            </article>
          </div>
        </section>

        <section id="finans" className={styles.financeSection}>
          <div>
            <p className={styles.eyebrow}>Finans</p>
            <h2>Fra objekt til markedsutvikling.</h2>
            <p>
              Index og katalog skal vise objektets historiske periode, økonomiske
              samtid, pengeverdi, kjøpekraft, metall, valuta, trend og
              markedsobservasjoner.
            </p>
          </div>

          <div className={styles.financeCards}>
            <article>
              <span>Verdi</span>
              <strong>Ikke vurdert ≠ 0 kr</strong>
            </article>
            <article>
              <span>Trend</span>
              <strong>6 / 12 / 18 / 24 mnd</strong>
            </article>
            <article>
              <span>Marked</span>
              <strong>Auksjon · Nettbutikk · Samling</strong>
            </article>
          </div>
        </section>

        <section id="medlemskap" className={styles.memberSection}>
          <p className={styles.eyebrow}>Medlemskap</p>
          <h2>Bli en del av Collectium-arkivet.</h2>
          <p>
            Gratis å starte. Katalogen gir inngang til Samler, Historie og
            Finans — fra privat samling til historisk kontekst og
            markedsutvikling.
          </p>
          <div className={styles.heroActions}>
            <a href="/registrering">Registrer deg</a>
            <a href="/login" className={styles.secondaryAction}>
              Logg inn
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
