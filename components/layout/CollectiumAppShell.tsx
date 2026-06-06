/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumAppShell
 *
 * Definering / formål:
 * Globalt Collectium-skall med toppmeny, sidemeny og hovedinnhold.
 * Skallet støtter fire standard-skinn via globale CSS-variabler.
 *
 * Bruksområde:
 * Brukes av app/layout.tsx for alle sider.
 *
 * Berørte sider / routes:
 * - Alle sider
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.app_shell
 *
 * Berørte API-ruter:
 * - Ingen direkte
 *
 * Berørte tabeller / views:
 * - Ingen direkte
 *
 * Dataretning:
 * Template/layout → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-APP-SHELL-4-SKINS-0001 / CHANGE-REINSTALL-4-SKINS
 */

import { CollectiumSidebar } from "./CollectiumSidebar";
import { CollectiumTopbar } from "./CollectiumTopbar";

export function CollectiumAppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="ct-shell">
      <CollectiumTopbar />

      <div className="ct-shell-body">
        <CollectiumSidebar />

        <main className="ct-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default CollectiumAppShell;
