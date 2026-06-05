"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Sidebar
 *
 * Definering / formal:
 * Global sidemeny for Collectium. Menyen viser hovedruter og rolleflater.
 *
 * Bruksomrade:
 * Brukes av AppShell paa desktop og som mobilmeny via CSS.
 *
 * Berorte sider / routes:
 * - /
 * - /katalog
 * - /min-side
 * - /samling
 * - /auksjoner
 * - /bors
 * - /meldinger
 * - /forhandler
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - menu.view
 * - catalog.view
 * - profile.view
 * - collection.view
 * - auction.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * Berorte API-ruter:
 * - GET /api/menu
 *
 * Berorte tabeller / views:
 * - ct_v_app_menu
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: layout
 * log_action: sidebar.render
 *
 * Versjon:
 * CT-FILE-SIDEBAR-0002 / CHANGE-2026-06-05-0001
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  group: "main" | "role" | "system";
};

const NAV: ReadonlyArray<NavItem> = [
  { href: "/", label: "Startside", icon: "ti-home", group: "main" },
  { href: "/katalog", label: "Katalog", icon: "ti-archive", group: "main" },
  { href: "/bors", label: "Index / Finans", icon: "ti-chart-line", group: "main" },
  { href: "/auksjoner", label: "Auksjon", icon: "ti-gavel", group: "main" },
  { href: "/samling", label: "Min samling", icon: "ti-bookmark", group: "role" },
  { href: "/min-side", label: "Min side", icon: "ti-user-circle", group: "role" },
  { href: "/meldinger", label: "Meldinger", icon: "ti-message", group: "role" },
  { href: "/forhandler", label: "Forhandler", icon: "ti-building-store", group: "role" },
  { href: "/admin", label: "Admin", icon: "ti-shield-lock", group: "system" },
];

function navGroupLabel(group: NavItem["group"]) {
  if (group === "main") return "Plattform";
  if (group === "role") return "Arbeidsflate";
  return "Kontroll";
}

export default function Sidebar() {
  const pathname = usePathname();
  const groups: NavItem["group"][] = ["main", "role", "system"];

  return (
    <aside className="ct-sidebar" aria-label="Hovedmeny">
      <Link href="/" className="ct-brand" aria-label="Collectium startside">
        <div className="ct-brand-mark" aria-hidden />
        <div>
          <div className="ct-brand-title">Collectium</div>
          <div className="ct-brand-sub">For samlere · For historien</div>
        </div>
      </Link>

      <nav className="ct-nav" aria-label="Collectium hovednavigasjon">
        {groups.map((group) => (
          <div key={group} className="ct-nav-group">
            <div className="ct-menu-label">{navGroupLabel(group)}</div>
            {NAV.filter((item) => item.group === group).map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={`ct-nav-link${isActive ? " is-active" : ""}`}>
                  <i className={`ti ${item.icon}`} aria-hidden />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="ct-sidebar-watermark" aria-hidden />

      <div className="ct-sidebar-footer">
        <Link href="/login" className="ct-sidebar-login">
          <i className="ti ti-login" aria-hidden />
          <span>Logg inn / registrer</span>
        </Link>
        <span className="ct-sidebar-note">Signature Light · DB 8.4</span>
      </div>
    </aside>
  );
}
