/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root layout
 *
 * Definering / formål:
 * Global Next.js layout. Kobler appen til Collectium TemplateRoot.
 *
 * Bruksområde:
 * Alle routes i app/
 *
 * Berørte sider / routes:
 * - alle
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.root_layout
 *
 * Berørte API-ruter:
 * - ingen
 *
 * Berørte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Template/local UI → Next.js → React → UI
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-ROOT-LAYOUT-0002 / CHANGE-2026-06-06-STRUCTURE-LOCK
 */

import "./globals.css";
import "@/styles/collectium-global.css";
import { TemplateRoot } from "@/components/templates/template-root";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>
        <TemplateRoot>{children}</TemplateRoot>
      </body>
    </html>
  );
}