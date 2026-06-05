"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Public Topbar
 *
 * Definering / formal:
 * Public toppmeny uten sidemeny. Logo til venstre, menyvalg midtstilt,
 * og globale brytere til hoyre: sok, design-megameny og login/min side.
 *
 * Bruksomrade:
 * Brukes i CollectiumPublicStartTemplate.
 *
 * Berorte sider / routes:
 * - /startside
 * - public landingssider senere
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.login
 * - landing.register
 * - profile.view
 * - catalog.search
 * - local.template.view
 *
 * Berorte API-ruter:
 * - Ingen direkte API-kall i denne public preview-versjonen.
 *
 * Berorte tabeller / views:
 * - Ingen direkte tabell/view i denne komponenten.
 *
 * Dataretning:
 * Lokal templatekontroll -> UI. Login/status kobles senere til auth/session API.
 *
 * Logging:
 * log_category: navigation
 * log_action: public_topbar.view
 *
 * Versjon:
 * CT-PUBLIC-TOPBAR-V8 / CHANGE-2026-06-05-STARTSIDE-FILES-V8
 */

import { useState } from "react";
import { CollectiumDesignMegaMenu } from "./CollectiumDesignMegaMenu";
import styles from "./CollectiumPublicTopbar.module.css";

const menuItems = [
  { label: "Katalog", href: "/katalog" },
  { label: "Medlemskap", href: "/medlemskap" },
  { label: "Forhandlere", href: "/forhandler" },
  { label: "Auksjon", href: "/auksjon" },
];

export function CollectiumPublicTopbar() {
  const [openPanel, setOpenPanel] = useState<"search" | "design" | "user" | null>(null);
  const [isMemberPreview, setIsMemberPreview] = useState(false);

  const toggle = (panel: "search" | "design" | "user") => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <header className={styles.topbar} data-ct-topbar="public">
      <div className={styles.inner}>
        <a className={styles.logo} href="/startside" aria-label="Collectium startside">
          <img src="/collectium-tema/collectium-tema-logo-wide.png" alt="Collectium" />
        </a>

        <nav className={styles.nav} aria-label="Hovedmeny">
          {menuItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconButton} type="button" onClick={() => toggle("search")} aria-expanded={openPanel === "search"} aria-controls="collectium-public-search">
            <span aria-hidden="true">⌕</span>
            <span className={styles.srOnly}>Søk</span>
          </button>
          <button className={styles.actionButton} type="button" onClick={() => toggle("design")} aria-expanded={openPanel === "design"} aria-controls="collectium-design-mega">
            Design
          </button>
          <button className={styles.actionButton} type="button" onClick={() => toggle("user")} aria-expanded={openPanel === "user"} aria-controls="collectium-user-menu">
            {isMemberPreview ? "Min side" : "Logg inn"}
          </button>
          {!isMemberPreview ? (
            <a className={`${styles.actionButton} ${styles.primary}`} href="/medlemskap">
              Kom i gang gratis
            </a>
          ) : null}
        </div>
      </div>

      <div id="collectium-public-search" className={`${styles.panel} ${openPanel === "search" ? styles.open : ""}`}>
        <div className={styles.panelHeader}>
          <h2>Søk i Collectium</h2>
          <button type="button" onClick={() => setOpenPanel(null)}>Lukk</button>
        </div>
        <input type="search" placeholder="Søk i katalog · objekter, kilder, varianter..." />
        <div className={styles.searchTypes}>
          <span>Katalogsøk</span>
          <span>AI-søk</span>
          <span>Sidesøk</span>
        </div>
      </div>

      <CollectiumDesignMegaMenu open={openPanel === "design"} onClose={() => setOpenPanel(null)} />

      <div id="collectium-user-menu" className={`${styles.userPanel} ${openPanel === "user" ? styles.open : ""}`}>
        <div className={styles.panelHeader}>
          <h2>{isMemberPreview ? "Min side" : "Logg inn"}</h2>
          <button type="button" onClick={() => setOpenPanel(null)}>Lukk</button>
        </div>
        {isMemberPreview ? (
          <div className={styles.userLinks}>
            <a href="/min-side">Åpne Min side</a>
            <a href="/samling">Min samling</a>
            <a href="/meldinger">Meldinger</a>
            <button type="button" onClick={() => setIsMemberPreview(false)}>Simuler logg ut</button>
          </div>
        ) : (
          <div className={styles.userLinks}>
            <a href="/login">Logg inn</a>
            <a href="/medlemskap">Bli medlem</a>
            <button type="button" onClick={() => setIsMemberPreview(true)}>Simuler innlogget visning</button>
          </div>
        )}
      </div>
    </header>
  );
}
