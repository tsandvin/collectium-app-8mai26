/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumStartTemplate
 *
 * Definering / formål:
 * Ren startside-/innholdstemplate uten egen toppbar eller sidemeny.
 * Templatefilen skal ikke importere PublicTopbar, PublicSidebar eller DesignMegaMenu.
 *
 * Bruksområde:
 * Brukes kun inne i global CollectiumAppShell fra app/layout.tsx.
 *
 * Berørte sider / routes:
 * - /startside
 * - /
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Dataretning:
 * MariaDB → API/backend → Next.js → React → UI
 *
 * Endringsregel:
 * Global toppbar/sidemeny skal kun eies av app/layout.tsx → CollectiumAppShell.
 */

import type { ReactNode } from "react";

type CollectiumStartTemplateProps = {
  children: ReactNode;
  showSidebar?: boolean;
};

export function CollectiumStartTemplate({
  children,
}: CollectiumStartTemplateProps) {
  return <>{children}</>;
}

export default CollectiumStartTemplate;
