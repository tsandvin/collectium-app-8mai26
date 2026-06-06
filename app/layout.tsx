/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root layout
 *
 * Definering / formål:
 * Global Next.js root layout for Collectium.
 * Bruker standard CollectiumAppShell og 4 kontrollerte skinn.
 *
 * Bruksområde:
 * Alle sider i app-router.
 *
 * Berørte sider / routes:
 * - Alle
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.root_layout
 *
 * Berørte API-ruter:
 * - Ingen direkte
 *
 * Berørte tabeller / views:
 * - Ingen direkte
 *
 * Dataretning:
 * Global template/layout → UI
 *
 * Logging:
 * Ingen direkte logging
 *
 * Versjon:
 * CT-ROOT-LAYOUT-4-SKINS-0001 / CHANGE-REINSTALL-4-SKINS
 */

import type { Metadata } from "next";
import "./globals.css";
import { CollectiumAppShell } from "@/components/layout/CollectiumAppShell";

export const metadata: Metadata = {
  title: "Collectium",
  description: "Samlerplattform for katalog, samling, auksjon og marked.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="no" data-ct-skin="collectium">
      <body>
        <CollectiumAppShell>{children}</CollectiumAppShell>
      </body>
    </html>
  );
}
