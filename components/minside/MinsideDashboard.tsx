/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * MinsideDashboard
 *
 * Definering / formal:
 * Rollebasert kontrollsenter for bruker, forhandler og admin.
 *
 * Bruksomrade:
 * Vises paa /min-side og /minside.
 *
 * Berorte sider / routes:
 * - /min-side
 * - /minside
 *
 * Berorte DB-brytere / feature_keys:
 * - profile.view
 * - membership.view
 * - collection.view
 * - transactions.view
 * - activity.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * Berorte API-ruter:
 * - GET /api/profile/overview
 * - GET /api/activity/feed
 * - GET /api/dealer/dashboard
 * - GET /api/admin/overview
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_memberships
 * - ct_collection_items
 * - ct_activity_log
 * - ct_processes
 * - ct_dealers
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: profile
 * log_action: dashboard.render
 *
 * Versjon:
 * CT-FILE-MINSIDE-DASHBOARD-0001 / CHANGE-2026-06-05-0001
 */

import Link from "next/link";
import {
  adminPanels,
  archiveItems,
  dealerPanels,
  featureRows,
  roleLabels,
  userPanels,
  type MinsideRole,
  type MinsidePanel,
} from "./minside-data";

function getPanels(role: MinsideRole): MinsidePanel[] {
  if (role === "admin") return [...userPanels, ...dealerPanels, ...adminPanels];
  if (role === "dealer") return [...userPanels, ...dealerPanels];
  return userPanels;
}

export function MinsideDashboard({ role = "user" }: { role?: MinsideRole }) {
  const panels = getPanels(role);
  const roleOptions: MinsideRole[] = role === "admin" ? ["user", "dealer", "admin"] : role === "dealer" ? ["user", "dealer"] : ["user"];

  return (
    <div className="ct-minside-page">
      <header className="ct-page-hero ct-signature-frame">
        <div>
          <p className="ct-kicker">Collectium / Min side</p>
          <h1>Min side</h1>
          <p>
            Rollebasert kontrollsenter for profil, medlemskap, samling, kjop/salg, transaksjonslogg,
            prosesser, varsler, meldinger og innstillinger.
          </p>
        </div>
        <div className="ct-hero-status">
          <span>Rolle: {roleLabels[role]}</span>
          <strong>Silver aktiv</strong>
          <small>DB 8.4-kjede: vises som feature-koblinger</small>
        </div>
      </header>

      <nav className="ct-archive-tabs" aria-label="Rolle og arkivfaner">
        {roleOptions.map((item) => (
          <Link key={item} href={`/min-side?role=${item}`} className={item === role ? "is-active" : ""}>
            {roleLabels[item]}
          </Link>
        ))}
        <a href="#aktivitet">Aktivitet</a>
        <a href="#funksjoner">Funksjoner</a>
      </nav>

      <section className="ct-dashboard-grid" aria-label="Min side oversikt">
        {panels.map((panel) => (
          <Link key={`${panel.featureKey}-${panel.title}`} href={panel.href} className="ct-dashboard-card ct-signature-frame">
            <span className="ct-feature-key">{panel.featureKey}</span>
            <h2>{panel.title}</h2>
            <strong>{panel.value}</strong>
            <p>{panel.meta}</p>
          </Link>
        ))}
      </section>

      <section className="ct-two-column" id="aktivitet">
        <article className="ct-panel-card ct-signature-frame">
          <div className="ct-panel-head">
            <div>
              <p className="ct-kicker">Arkivlogg</p>
              <h2>Aktivitet, varsler og prosesser</h2>
            </div>
            <Link href="/meldinger" className="ct-small-action">Meldinger</Link>
          </div>
          <div className="ct-log-list">
            {archiveItems.map((item) => (
              <div key={`${item.type}-${item.title}-${item.object}`} className={`ct-log-row priority-${item.priority}`}>
                <div>
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.object}</p>
                </div>
                <div className="ct-log-meta">
                  <strong>{item.status}</strong>
                  <small>{item.date}</small>
                  <code>{item.featureKey}</code>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="ct-panel-card ct-signature-frame" id="funksjoner">
          <div className="ct-panel-head">
            <div>
              <p className="ct-kicker">DB-brytere</p>
              <h2>Aktive funksjoner</h2>
            </div>
            <Link href="/admin" className="ct-small-action">Admin kontroll</Link>
          </div>
          <div className="ct-feature-table" role="table" aria-label="Feature-koblinger">
            {featureRows.map(([key, label, status, source]) => (
              <div key={key} role="row" className="ct-feature-row">
                <code>{key}</code>
                <span>{label}</span>
                <strong>{status}</strong>
                <small>{source}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="ct-panel-card ct-signature-frame">
        <p className="ct-kicker">Neste API-kobling</p>
        <h2>Fra mock-kontrakt til MariaDB/API</h2>
        <p>
          Denne siden er laget som trygg frontend-start. Neste steg er aa la panelene lese fra
          <code> /api/profile/overview</code>, <code> /api/activity/feed</code>,
          <code> /api/collection/summary</code>, <code> /api/dealer/dashboard</code> og
          <code> /api/admin/overview</code>, med samme feature_keys som vises i kortene.
        </p>
      </section>
    </div>
  );
}
