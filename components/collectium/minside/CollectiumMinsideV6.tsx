/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumMinsideV6
 *
 * Definering / formal:
 * Ny innholdskomponent for Min side som samler profil, medlemskap, samling,
 * varsler, prosesser, kjop/salg, transaksjonslogg og rolleflater.
 * Komponenten bruker midlertidige visningsdata og skal senere kobles til API/MariaDB.
 *
 * Bruksomrade:
 * Brukes av /min-side som brukerens kontrollsenter.
 *
 * Berorte sider / routes:
 * - /min-side
 *
 * Berorte DB-brytere / feature_keys:
 * - profile.view
 * - profile.edit
 * - profile.notifications
 * - profile.membership
 * - profile.activity
 * - collection.view
 * - collection.wishlist.toggle
 * - collection.favorite.toggle
 * - collection.transaction.view
 * - object.share.create
 * - dealer.dashboard.view
 * - admin.system.dashboard.view
 *
 * Berorte API-ruter:
 * - Fremtidig: GET /api/profile/overview
 * - Fremtidig: GET /api/membership/status
 * - Fremtidig: GET /api/collection/summary
 * - Fremtidig: GET /api/profile/activity
 * - Fremtidig: GET /api/profile/notifications
 *
 * Berorte tabeller / views:
 * - Fremtidig: ct_users
 * - Fremtidig: ct_user_profiles
 * - Fremtidig: ct_memberships
 * - Fremtidig: ct_collection_items
 * - Fremtidig: ct_user_object_states
 * - Fremtidig: ct_collection_transactions
 * - Fremtidig: ct_object_share_links
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: profile
 * log_action: view_dashboard
 *
 * Versjon:
 * CT-FILE-STARTSIDE-MINSIDE-V6-0003
 */
import Link from 'next/link';
import styles from './CollectiumMinsideV6.module.css';

const summaryCards = [
  ['Medlemskap', 'Silver', 'Aktiv tilgang'],
  ['Min samling', '142', 'Objekter registrert'],
  ['Estimert verdi', '186 000 kr', 'Mangler verdi på 37 objekter'],
  ['Ønskeliste', '22', 'Objekter'],
  ['Favoritter', '14', 'Objekter'],
  ['Prosesser', '3', 'Krever oppfølging'],
  ['Varsler', '5', 'Uleste'],
  ['Meldinger', '2', 'Uleste'],
] as const;

const processRows = [
  ['Dokumentasjon mangler', '1 krone · 1917 · Litra A', 'Krever handling', 'Last opp dokumentasjon'],
  ['Auksjonsforslag mottatt', '100 kroner · 1877', 'Venter bruker', 'Se forslag'],
  ['Delingslenke utløper', 'Samling · Norske sedler', '12 timer igjen', 'Administrer deling'],
] as const;

const collectionRows = [
  ['Min samling', '142 objekter', 'Samleroversikt, kvalitet, bilder og notater'],
  ['Ønskeliste', '22 objekter', 'Objekter du følger for senere kjøp eller vurdering'],
  ['Favoritter', '14 objekter', 'Objekter markert med stjerne'],
  ['Auksjon', '6 fulgte', 'Bud, overvåking og kommende auksjoner'],
  ['Nettbutikk', '4 fulgte', 'Salgsobjekter og forhandlerkontakt'],
] as const;

const transactionRows = [
  ['Kjøp', '10 kroner · 1949 · Litra A', '15 000 kr', 'Dokumentert'],
  ['Bud', '2 kroner · Jubileumsutgave', '2 400 kr', 'Aktivt'],
  ['Salg', '1 krone · 1917', '3 900 kr', 'Oppgjør venter'],
] as const;

const settingsRows = [
  ['Profil', 'Navn, bilde, kontaktinformasjon og persondata'],
  ['Medlemskap', 'Nivå, varighet, betaling og tilgang'],
  ['Varsler', 'Transaksjoner, auksjon, meldinger og systemstatus'],
  ['Sikkerhet', 'Passord, innlogginger og sesjoner'],
  ['Deling', 'Aktive, inaktive og foreslåtte delinger'],
] as const;

function StatusPill({ children, tone = 'info' }: { children: React.ReactNode; tone?: 'info' | 'warn' | 'ok' }) {
  return <span className={`${styles.statusPill} ${styles[tone]}`}>{children}</span>;
}

export default function CollectiumMinsideV6() {
  return (
    <div className={styles.page}>
      <section className={styles.heroPanel}>
        <div>
          <p className={styles.sectionLabel}>Min side</p>
          <h1>Din Collectium-arbeidsflate</h1>
          <p>
            Profil, medlemskap, samling, kjøp/salg, prosesser, varsler, meldinger og innstillinger samlet i ett kontrollsenter.
          </p>
        </div>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>C</div>
          <div>
            <h2>Samlerprofil</h2>
            <p>Brukernavn · Silver-medlem · Norge</p>
            <StatusPill tone="ok">Aktiv</StatusPill>
          </div>
        </div>
      </section>

      <section className={styles.summaryGrid} aria-label="Statusoversikt">
        {summaryCards.map(([title, value, meta]) => (
          <article className={styles.metricCard} key={title}>
            <p>{title}</p>
            <strong>{value}</strong>
            <span>{meta}</span>
          </article>
        ))}
      </section>

      <section className={styles.workspaceGrid}>
        <article className={styles.panelLarge}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.sectionLabel}>Samling</p>
              <h2>Oversikt over samling og brukerstatus</h2>
            </div>
            <Link href="/samling">Åpne samling</Link>
          </div>
          <div className={styles.rowList}>
            {collectionRows.map(([title, count, body]) => (
              <div className={styles.dataRow} key={title}>
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className={styles.panelSmall}>
          <p className={styles.sectionLabel}>Medlemskap</p>
          <h2>Silver</h2>
          <p>Flere filter, mer historikk og bedre samlingsoversikt.</p>
          <div className={styles.accessList}>
            <StatusPill tone="ok">Katalogfilter</StatusPill>
            <StatusPill tone="ok">Samling</StatusPill>
            <StatusPill tone="info">Mer finansdata</StatusPill>
            <StatusPill tone="warn">Platinum-data låst</StatusPill>
          </div>
          <Link href="/medlemskap" className={styles.panelButton}>Se medlemskap</Link>
        </aside>
      </section>

      <section className={styles.workspaceGrid}>
        <article className={styles.panelLarge}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.sectionLabel}>Prosesser</p>
              <h2>Aktivitet, varsler og oppgaver</h2>
            </div>
            <Link href="/min-side/prosesser">Alle prosesser</Link>
          </div>
          <div className={styles.tabs}>
            <span>Alle</span>
            <span>Kjøp</span>
            <span>Salg</span>
            <span>Auksjon</span>
            <span>Forhandler</span>
            <span>Dokumentasjon</span>
            <span>Betaling</span>
            <span>Deling</span>
          </div>
          <div className={styles.rowList}>
            {processRows.map(([title, object, status, action]) => (
              <div className={styles.processRow} key={title}>
                <div className={styles.processIcon} aria-hidden="true">!</div>
                <div>
                  <strong>{title}</strong>
                  <p>{object}</p>
                </div>
                <StatusPill tone={status.includes('Krever') ? 'warn' : 'info'}>{status}</StatusPill>
                <button type="button">{action}</button>
              </div>
            ))}
          </div>
        </article>

        <aside className={styles.panelSmall}>
          <p className={styles.sectionLabel}>Varsler</p>
          <h2>5 uleste</h2>
          <p>Transaksjoner, bud, forhandlerprosesser, dokumentasjon og meldinger samles i aktivitetsarkivet.</p>
          <Link href="/meldinger" className={styles.panelButton}>Åpne meldinger</Link>
        </aside>
      </section>

      <section className={styles.workspaceGrid}>
        <article className={styles.panelLarge}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.sectionLabel}>Kjøp / salg</p>
              <h2>Transaksjonslogg</h2>
            </div>
            <Link href="/min-side/transaksjoner">Se logg</Link>
          </div>
          <div className={styles.rowList}>
            {transactionRows.map(([type, object, amount, status]) => (
              <div className={styles.dataRow} key={`${type}-${object}`}>
                <div>
                  <strong>{type}</strong>
                  <p>{object}</p>
                </div>
                <span>{amount}</span>
                <StatusPill tone={status === 'Dokumentert' ? 'ok' : 'info'}>{status}</StatusPill>
              </div>
            ))}
          </div>
        </article>

        <aside className={styles.panelSmall}>
          <p className={styles.sectionLabel}>Index / finans</p>
          <h2>Samlingen mot markedet</h2>
          <p>Viser estimert verdi, manglende verdier, utvikling og objekter som bør vurderes.</p>
          <Link href="/index" className={styles.panelButton}>Se markedsindex</Link>
        </aside>
      </section>

      <section className={styles.workspaceGrid}>
        <article className={styles.panelLarge}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.sectionLabel}>Innstillinger</p>
              <h2>Tilgang, profil og deling</h2>
            </div>
            <Link href="/min-side/innstillinger">Åpne innstillinger</Link>
          </div>
          <div className={styles.rowList}>
            {settingsRows.map(([title, body]) => (
              <div className={styles.dataRow} key={title}>
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
                <span>Åpne</span>
              </div>
            ))}
          </div>
        </article>

        <aside className={styles.panelSmall}>
          <p className={styles.sectionLabel}>Rolleflater</p>
          <h2>Forhandler / admin</h2>
          <p>Forhandler- og adminmoduler vises bare når rollen og medlemskapet gir tilgang.</p>
          <div className={styles.accessList}>
            <StatusPill tone="info">Forhandler skjult</StatusPill>
            <StatusPill tone="info">Admin skjult</StatusPill>
          </div>
        </aside>
      </section>
    </div>
  );
}
