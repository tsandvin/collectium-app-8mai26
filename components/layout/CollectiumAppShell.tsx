/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium AppShell
 *
 * Definering / formål:
 * One global Collectium shell for topbar, sidebar, mobile behavior and page frame.
 *
 * Bruksområde:
 * Used by app/layout.tsx. Individual pages must not create shell/topbar/sidebar.
 *
 * Berørte sider / routes:
 * - All routes
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.app_shell
 *
 * Dataretning:
 * Template/layout only. Data remains API/MariaDB controlled.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import type { ReactNode } from "react";
import { CollectiumPageFrame } from "./CollectiumPageFrame";
import { CollectiumSidebar } from "./CollectiumSidebar";
import { CollectiumTopbar } from "./CollectiumTopbar";

export type CollectiumAppShellProps = {
  readonly children: ReactNode;
};

export function CollectiumAppShell({ children }: CollectiumAppShellProps): JSX.Element {
  return (
    <div className="ct-app-shell">
      <CollectiumTopbar />
      <CollectiumSidebar />
      <main className="ct-main" id="main-content">
        <CollectiumPageFrame>{children}</CollectiumPageFrame>
      </main>
    </div>
  );
}
