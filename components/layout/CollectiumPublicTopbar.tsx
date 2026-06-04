"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Public Topbar
 *
 * Definering / formål:
 * Egen topbar-fil for offentlige Collectium-sider. Topbaren bruker template-CSS
 * og eier ikke sidebakgrunn, rammer eller datalogikk.
 *
 * Bruksområde:
 * Brukes av CollectiumStartTemplate på /startside og /landingsside.
 *
 * Berørte sider / routes:
 * - /startside
 * - /landingsside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.login
 * - landing.register
 * - catalog.view
 *
 * Berørte API-ruter:
 * - GET /api/auth/session senere
 * - GET /api/menu/public senere
 *
 * Dataretning:
 * MariaDB/API senere -> Next.js -> React -> UI.
 *
 * Logging:
 * log_category: landing
 * log_action: topbar.view
 *
 * Versjon:
 * CT-FILE-START-V30-TOPBAR / CHANGE-2026-06-05-START-V30
 */

import Link from "next/link";
import { useState } from "react";
import styles from "../templates/CollectiumStartTemplate.module.css";

type PublicNavItem = {
  label: string;
  href: string;
  featureKey: string;
};

const publicNav: PublicNavItem[] = [
  { label: "Katalog", href: "/katalog", featureKey: "catalog.view" },
  { label: "Medlemskap", href: "/medlemskap", featureKey: "landing.membership" },
  { label: "Forhandlere", href: "/forhandler", featureKey: "dealer.public.view" },
  { label: "Auksjon", href: "/auksjon", featureKey: "auction.public.view" },
];

export function CollectiumPublicTopbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.topbar} data-ct-component="public-topbar">
      <Link className={styles.brand} href="/startside" data-feature-key="landing.view">
        <span className={styles.mark} aria-hidden="true">C</span>
        <span>Collectium</span>
      </Link>

      <nav className={styles.nav} aria-label="Hovedmeny">
        {publicNav.map((item) => (
          <Link key={item.href} href={item.href} data-feature-key={item.featureKey}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="collectium-mobile-public-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          Meny
        </button>
        <Link className={styles.ghost} href="/login" data-feature-key="landing.login">
          Logg inn
        </Link>
        <Link className={`${styles.button} ${styles.buttonGold}`} href="/registrering" data-feature-key="landing.register">
          Kom i gang gratis
        </Link>
      </div>

      <nav
        id="collectium-mobile-public-menu"
        className={styles.mobileMenu}
        data-open={isOpen ? "true" : "false"}
        aria-label="Mobilmeny"
      >
        {publicNav.map((item) => (
          <Link key={item.href} href={item.href} data-feature-key={item.featureKey} onClick={() => setIsOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/login" data-feature-key="landing.login" onClick={() => setIsOpen(false)}>Logg inn</Link>
        <Link href="/registrering" data-feature-key="landing.register" onClick={() => setIsOpen(false)}>Registrer deg</Link>
      </nav>
    </header>
  );
}
