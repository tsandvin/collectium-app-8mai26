/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root Layout
 *
 * Definering / formål:
 * One global Next.js layout for the Collectium application shell.
 *
 * Bruksområde:
 * Wraps every route in CollectiumAppShell.
 *
 * Berørte sider / routes:
 * - All app routes
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.root_layout
 *
 * Dataretning:
 * Template/layout only. API/MariaDB remains source of truth.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CollectiumAppShell } from "@/components/layout/CollectiumAppShell";
import "./globals.css";
import "@/styles/collectium-structure-fix.css";

export const metadata: Metadata = {
  title: "Collectium",
  description: "Samlerplattform for norske sedler, mynter, historie og markedsutvikling.",
};

export type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="no" data-template="collectium" data-skin="signature-light" data-vp="pc">
      <body>
        <CollectiumAppShell>{children}</CollectiumAppShell>
      </body>
    </html>
  );
}
