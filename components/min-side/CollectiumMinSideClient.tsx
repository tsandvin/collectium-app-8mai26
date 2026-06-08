"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumMinSideClient
 *
 * Definering / formÃ¥l:
 * Klientkomponent for Min side innhold. Komponenten er innholdsflate inne i global template
 * og skal ikke lage egen sidebar, topbar, AppShell, body/html, global bakgrunn eller shell.
 *
 * BruksomrÃ¥de:
 * Viser rollebaserte faner, statuskort, prosesser, transaksjoner, forhandlerflate og adminstatus.
 *
 * BerÃ¸rte sider / routes:
 * - /min-side
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - user.dashboard.view
 * - collection.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Versjon:
 * CT-MINSIDE-CLIENT-0002 / CHANGE-2026-06-08-0001
 */

import { useMemo, useState } from "react";
import styles from "./CollectiumMinSide.module.css";
import type { MinSideData } from "@/lib/min-side/min-side-types";

type TabKey = "oversikt" | "samling" | "prosesser" | "transaksjoner" | "forhandler" | "admin" | "tilgang";

type Props = {
  initialData: MinSideData;
};

const tabs: Array<{ key: TabKey; label: string; required?: "dealer" | "admin" }> = [
  { key: "oversikt", label: "Oversikt" },
  { key: "samling", label: "Min samling" },
  { key: "prosesser", label: "Prosesser" },
  { key: "transaksjoner", label: "KjÃ¸p / salg" },
  { key: "forhandler", label: "Forhandler", required: "dealer" },
  { key: "admin", label: "Admin", required: "admin" },
  { key: "tilgang", label: "Tilgang" },
];

function statusClass(status: string) {
  if (status === "OK") return styles.statusOk;
  if (status === "VARSEL" || status === "VENTER") return styles.statusWarning;
  if (status === "FEIL" || status === "KRITISK") return styles.statusError;
  return styles.statusNeutral;
}

export default function CollectiumMinSideClient({ initialData }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("oversikt");

  const visibleTabs = useMemo(() => {
    return tabs.filter((tab) => {
      if (tab.required === "dealer") return initialData.dealer.enabled;
      if (tab.required === "admin") return initialData.admin.enabled;
      return true;
    });
  }, [initialData.admin.enabled, initialData.dealer.enabled]);

  return (
    <section className={styles.minSideContent} aria-labelledby="min-side-title">
      <header className={styles.headerBlock}>
        <div>
          <p className={styles.eyebrow}>Collectium Â· Rollebasert kontrollsenter</p>
          <h1 id="min-side-title">Min side</h1>
          <p className={styles.lead}>
            Profil, medlemskap, samling, kjÃ¸p/salg, prosesser, varsler og rolleflater samlet i Ã©n kontrollert innholdsflate.
          </p>
        </div>
        <aside className={styles.profileCard} aria-label="Brukerstatus">
          <strong>{initialData.user.name}</strong>
          <span>{initialData.user.email}</span>
          <span>{initialData.user.membership} Â· {initialData.user.lastLoginLabel}</span>
        </aside>
      </header>

      <nav className={styles.tabs} aria-label="Min side faner">
        {visibleTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={activeTab === tab.key ? styles.activeTab : undefined}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "oversikt" && (
        <div className={styles.sectionGrid}>
          {initialData.metrics.map((metric) => (
            <article className={styles.infoCard} key={metric.key}>
              <span className={`${styles.statusDot} ${statusClass(metric.status)}`}>{metric.status}</span>
              <h2>{metric.label}</h2>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </article>
          ))}
        </div>
      )}

      {activeTab === "samling" && (
        <div className={styles.twoColumn}>
          <article className={styles.panel}>
            <h2>Samling</h2>
            <p>Min samling bruker egne statuser for hjerte, stjerne, i samling og egne lister.</p>
            <dl className={styles.definitionList}>
              <div><dt>Objekter</dt><dd>142</dd></div>
              <div><dt>Ã˜nskeliste</dt><dd>22</dd></div>
              <div><dt>Favoritter</dt><dd>14</dd></div>
              <div><dt>Objekter uten verdi</dt><dd>37</dd></div>
            </dl>
          </article>
          <article className={styles.panel}>
            <h2>Samlerhandlinger</h2>
            <p>Handlingene skal senere kobles mot API og feature keys, ikke hardkodes i frontend.</p>
            <div className={styles.actionRow}>
              <button type="button">Ã…pne samling</button>
              <button type="button">Registrer kjÃ¸p</button>
              <button type="button">Del objekt</button>
            </div>
          </article>
        </div>
      )}

      {activeTab === "prosesser" && (
        <div className={styles.listPanel}>
          {initialData.processes.map((process) => (
            <article className={styles.listRow} key={process.id}>
              <div>
                <span className={styles.badge}>{process.category}</span>
                <h2>{process.title}</h2>
                {process.objectLabel ? <p>{process.objectLabel}</p> : null}
              </div>
              <div className={styles.rowMeta}>
                <span>{process.status}</span>
                {process.dueLabel ? <small>{process.dueLabel}</small> : null}
                {process.actionLabel ? <button type="button">{process.actionLabel}</button> : null}
              </div>
            </article>
          ))}
        </div>
      )}

      {activeTab === "transaksjoner" && (
        <div className={styles.tableLike} role="table" aria-label="Transaksjonslogg">
          <div className={styles.tableHead} role="row">
            <span>Dato</span><span>Objekt</span><span>Type</span><span>Motpart</span><span>BelÃ¸p</span><span>Status</span>
          </div>
          {initialData.transactions.map((tx) => (
            <div className={styles.tableRow} role="row" key={tx.id}>
              <span>{tx.dateLabel}</span>
              <span>{tx.objectLabel}</span>
              <span>{tx.typeLabel}</span>
              <span>{tx.counterpartyLabel}</span>
              <span>{tx.amountLabel}</span>
              <span className={statusClass(tx.status)}>{tx.status}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "forhandler" && (
        <div className={styles.twoColumn}>
          <article className={styles.panel}>
            <h2>Forhandlerdashboard</h2>
            <p>Status: {initialData.dealer.statusLabel}</p>
            <p>Objektgrupper: {initialData.dealer.objectGroupsLabel}</p>
          </article>
          <article className={styles.panel}>
            <h2>Forhandlerstatus</h2>
            <dl className={styles.definitionList}>
              <div><dt>Nye innleveringer</dt><dd>{initialData.dealer.newConsignments}</dd></div>
              <div><dt>Til vurdering</dt><dd>{initialData.dealer.pendingReviews}</dd></div>
              <div><dt>Klar for auksjon</dt><dd>{initialData.dealer.readyForAuction}</dd></div>
              <div><dt>Aktive auksjoner</dt><dd>{initialData.dealer.activeAuctions}</dd></div>
              <div><dt>Nettbutikk</dt><dd>{initialData.dealer.shopObjects}</dd></div>
              <div><dt>OppgjÃ¸r venter</dt><dd>{initialData.dealer.settlementsWaiting}</dd></div>
            </dl>
          </article>
        </div>
      )}

      {activeTab === "admin" && (
        <div className={styles.twoColumn}>
          <article className={styles.panel}>
            <h2>Adminstatus</h2>
            <p>Dette er kun en rolleflate inne i Min side, ikke et eget adminskall.</p>
            <p>Systemstatus: <span className={statusClass(initialData.admin.systemStatus)}>{initialData.admin.systemStatus}</span></p>
          </article>
          <article className={styles.panel}>
            <h2>Kontrollpunkter</h2>
            <dl className={styles.definitionList}>
              <div><dt>Brukere venter</dt><dd>{initialData.admin.usersWaiting}</dd></div>
              <div><dt>Forhandlere venter</dt><dd>{initialData.admin.dealersWaiting}</dd></div>
              <div><dt>Manglende routes</dt><dd>{initialData.admin.missingRoutes}</dd></div>
              <div><dt>Katalogvarsler</dt><dd>{initialData.admin.catalogWarnings}</dd></div>
              <div><dt>API</dt><dd>{initialData.admin.apiStatus}</dd></div>
              <div><dt>DB</dt><dd>{initialData.admin.dbStatus}</dd></div>
            </dl>
          </article>
        </div>
      )}

      {activeTab === "tilgang" && (
        <div className={styles.listPanel}>
          {initialData.access.map((item) => (
            <article className={styles.listRow} key={item.featureKey}>
              <div>
                <h2>{item.label}</h2>
                <p>{item.featureKey}</p>
              </div>
              <div className={styles.rowMeta}>
                <span>{item.accessState}</span>
                {item.reason ? <small>{item.reason}</small> : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
