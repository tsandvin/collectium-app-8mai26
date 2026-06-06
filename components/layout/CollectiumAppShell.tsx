/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumAppShell
 *
 * Definering / formål:
 * Globalt Collectium-skall med toppmeny, sidemeny og hovedinnhold.
 * Denne filen eier bare layoutstruktur, ikke data eller DB-logikk.
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
 * CT-APP-SHELL-STANDARD-0001 / CHANGE-REINSTALL-STANDARD-TEMPLATE
 */

import { CollectiumSidebar } from "./CollectiumSidebar";
import { CollectiumTopbar } from "./CollectiumTopbar";

export function CollectiumAppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="ct-standard-shell">
      <CollectiumTopbar />

      <div className="ct-standard-body">
        <CollectiumSidebar />

        <main className="ct-standard-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default CollectiumAppShell;
