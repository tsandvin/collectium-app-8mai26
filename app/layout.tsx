/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root layout
 *
 * Definering / formÃ¥l:
 * Global Next.js layout. Kobler appen til Collectium TemplateRoot.
 *
 * BruksomrÃ¥de:
 * Alle routes i app/
 *
 * BerÃ¸rte sider / routes:
 * - alle
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - local.template.root_layout
 *
 * BerÃ¸rte API-ruter:
 * - ingen
 *
 * BerÃ¸rte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Template/local UI â†’ Next.js â†’ React â†’ UI
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-ROOT-LAYOUT-0002 / CHANGE-2026-06-06-STRUCTURE-LOCK
 */

import "./globals.css";
import "@/styles/collectium-global.css";
import "../styles/collectium-template-skin-screen-font.css";
import { TemplateRoot } from "@/components/templates/template-root";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" data-template="collectium" data-skin="signature-light" data-vp="pc" data-font="normal">
      <body>
        <TemplateRoot>{children}</TemplateRoot>
      </body>
    </html>
  );
}
