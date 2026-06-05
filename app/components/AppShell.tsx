"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium AppShell
 *
 * Definering / formal:
 * Globalt skall for Collectium med sidemeny, toppbar, mobilmeny og sideinnhold.
 *
 * Bruksomrade:
 * Brukes rundt alle vanlige app-sider som /, /login, /min-side, /katalog og /admin.
 *
 * Berorte sider / routes:
 * - /
 * - /login
 * - /min-side
 * - /katalog
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - local.template.view
 * - profile.view
 * - activity.view
 * - notifications.view
 *
 * Berorte API-ruter:
 * - GET /api/auth/session
 * - GET /api/activity/feed
 *
 * Berorte tabeller / views:
 * - ct_v_app_menu
 * - ct_activity_log
 * - ct_notifications
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: layout
 * log_action: shell.render
 *
 * Versjon:
 * CT-FILE-SHELL-0002 / CHANGE-2026-06-05-0001
 *
 * Endringsregel:
 * Ingen runtime skin/design-switching. Sideinnhold skal ikke lage eget shell.
 */

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ct-app" data-shell="collectium-standard">
      <Sidebar />
      <div className="ct-main">
        <Topbar />
        <main className="ct-content" id="ct-main-content">
          <div className="ct-page-watermark" aria-hidden />
          <div className="ct-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
