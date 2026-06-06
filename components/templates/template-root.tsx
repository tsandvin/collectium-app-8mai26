/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-root
 *
 * Definering / formål:
 * Global root-template for Collectium.
 * Eierskap til toppmeny, sidemeny, page-frame og globalt skall ligger her.
 *
 * Bruksområde:
 * app/layout.tsx
 *
 * Berørte sider / routes:
 * - alle routes
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.root
 * - local.template.toppmeny
 * - local.template.sidemeny
 *
 * Berørte API-ruter:
 * - ingen i denne grunnversjonen
 *
 * Berørte tabeller / views:
 * - senere ct_v_app_menu
 *
 * Dataretning:
 * Template/local UI → React → UI
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-TEMPLATE-ROOT-0002 / CHANGE-2026-06-06-TEMPLATE-MENUS
 */

import { COLLECTIUM_SKIN, COLLECTIUM_TEMPLATE, COLLECTIUM_VIEWPORT_DEFAULT } from "./template-skins";
import { TemplatePageFrame } from "./template-page-frame";
import { TemplateSidemeny } from "./template-sidemeny";
import { TemplateToppmeny } from "./template-toppmeny";

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
      <TemplateToppmeny />

      <div className="ct-template-shell">
        <TemplateSidemeny />
        <TemplatePageFrame>{children}</TemplatePageFrame>
      </div>
    </div>
  );
}