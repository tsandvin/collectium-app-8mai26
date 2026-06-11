/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root layout
 *
 * Definering / formål:
 * Global Next.js layout. Kobler appen til Collectium TemplateRoot og UI 8.5 v36 ThemeProvider.
 * Importerer ny tema-tokenfil etter eksisterende globals slik at html[data-theme] blir aktiv designkilde.
 *
 * Bruksområde:
 * Alle routes i app/
 *
 * Berørte sider / routes:
 * - alle
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.root_layout
 * - local.template.theme_ui85
 * - local.template.design_definition
 *
 * Berørte API-ruter:
 * - ingen i denne versjonen
 *
 * Berørte tabeller / views:
 * - senere ct_ui_skins
 * - senere ct_user_preferences.preferred_skin
 *
 * Dataretning:
 * ThemeProvider -> html[data-theme]/html[data-skin] -> CSS tokens -> TemplateRoot -> UI
 *
 * Logging:
 * - localStorage: ct-active-skin-v2 via ThemeProvider
 *
 * Versjon:
 * CT-FILE-ROOT-LAYOUT-0003 / CHANGE-2026-06-12-UI85-V36-THEME-ACTIVE
 */

import "./globals.css";
import "@/styles/collectium-global.css";
import "@/styles/themes.css";
import "@/styles/collectium-ui85-v36.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { TemplateRoot } from "@/components/templates/template-root";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" data-theme="collectium" data-skin="collectium" data-screen="desktop">
      <body>
        <ThemeProvider>
          <TemplateRoot>{children}</TemplateRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
