/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Public Sidebar
 *
 * Definering / formål:
 * Egen sidemenyfil for offentlige Collectium-sider. Brukes som template-styrt
 * navigasjon på desktop og skjules av globale responsive regler på mindre skjermer.
 *
 * Bruksområde:
 * Brukes av CollectiumStartTemplate når showSidebar=true.
 *
 * Berørte sider / routes:
 * - /startside
 * - /landingsside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - catalog.view
 * - index.view
 * - collection.public.preview
 * - auction.public.view
 *
 * Berørte API-ruter:
 * - GET /api/menu/public senere
 *
 * Dataretning:
 * MariaDB/API senere -> Next.js -> React -> UI.
 *
 * Logging:
 * log_category: landing
 * log_action: sidebar.view
 *
 * Versjon:
 * CT-FILE-START-V30-SIDEBAR / CHANGE-2026-06-05-START-V30
 */

import Link from "next/link";
import styles from "../templates/CollectiumStartTemplate.module.css";

const sidebarItems = [
  { icon: "⌂", label: "Startside", href: "/startside", featureKey: "landing.view" },
  { icon: "□", label: "Katalog", href: "/katalog", featureKey: "catalog.view" },
  { icon: "◇", label: "Index", href: "/index", featureKey: "index.view" },
  { icon: "♡", label: "Samling", href: "/samling", featureKey: "collection.public.preview" },
  { icon: "◷", label: "Auksjon", href: "/auksjon", featureKey: "auction.public.view" },
  { icon: "◈", label: "Forhandler", href: "/forhandler", featureKey: "dealer.public.view" },
];

export function CollectiumPublicSidebar() {
  return (
    <aside className={styles.sidebar} data-ct-component="public-sidebar">
      <div>
        <Link className={styles.sidebarBrand} href="/startside" data-feature-key="landing.view">
          <span className={styles.sidebarMark} aria-hidden="true">C</span>
          <span>Collectium</span>
        </Link>
        <div className={styles.sidebarStamp}>Anno 2022 · Beta</div>
      </div>

      <nav className={styles.sidebarNav} aria-label="Sidemeny">
        {sidebarItems.map((item) => (
          <Link key={item.href} className={styles.sidebarLink} href={item.href} data-feature-key={item.featureKey}>
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <strong>Robotregel</strong>
        <span>Offentlig flate viser bare presentasjon. Admin, API, test og private data skal ikke eksponeres for crawlere.</span>
      </div>
    </aside>
  );
}
