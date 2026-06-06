/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-root
 *
 * Definering / formål:
 * Global root-template for Collectium. Denne skal være inngang for global template/skall.
 * Foreløpig rendrer den ingen synlig meny, slik at forsiden fortsatt er blank.
 *
 * Bruksområde:
 * app/layout.tsx
 *
 * Berørte sider / routes:
 * - alle routes
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.root
 *
 * Berørte API-ruter:
 * - ingen i denne blanke grunnversjonen
 *
 * Berørte tabeller / views:
 * - ingen i denne blanke grunnversjonen
 *
 * Dataretning:
 * Template/local UI → React → UI
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-TEMPLATE-ROOT-0001 / CHANGE-2026-06-06-STRUCTURE-LOCK
 */

import { COLLECTIUM_SKIN, COLLECTIUM_TEMPLATE, COLLECTIUM_VIEWPORT_DEFAULT } from "./template-skins";
import { TemplatePageFrame } from "./template-page-frame";

export function TemplateRoot({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      data-template={COLLECTIUM_TEMPLATE}
      data-skin={COLLECTIUM_SKIN}
      data-vp={COLLECTIUM_VIEWPORT_DEFAULT}
      className="ct-template-root"
    >
      <TemplatePageFrame>{children}</TemplatePageFrame>
    </div>
  );
}