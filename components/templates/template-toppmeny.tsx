import { TemplateTemaControl } from "./template-tema-control";
/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-toppmeny
 *
 * Definering / formÃ¥l:
 * Eneste godkjente templatefil for global toppmeny.
 * Toppmenyen eies av template-laget, ikke av vanlige sider.
 *
 * BruksomrÃ¥de:
 * Global Collectium template.
 *
 * BerÃ¸rte sider / routes:
 * - alle sider via app/layout.tsx
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - local.template.toppmeny
 * - navigation.view
 * - local.template.design_skin
 *
 * BerÃ¸rte API-ruter:
 * - senere /api/admin/menu
 *
 * BerÃ¸rte tabeller / views:
 * - senere ct_v_app_menu
 *
 * Dataretning:
 * ForelÃ¸pig statisk template â†’ React â†’ UI
 * Senere MariaDB/API â†’ Template â†’ React â†’ UI
 *
 * Logging:
 * ingen i fÃ¸rste versjon
 *
 * Versjon:
 * CT-FILE-TEMPLATE-TOPPMENY-0003 / CHANGE-2026-06-06-DESIGN-SKINS-4
 */

import Link from "next/link";
export function TemplateToppmeny() {
  return (
    <header className="ct-template-toppmeny" aria-label="Collectium toppmeny">
      <Link href="/startside" className="ct-template-brand" aria-label="Collectium startside">
        <span className="ct-template-logo">C</span>
        <span>
          <strong>Collectium</strong>
          <small>Samlerplattform</small>
        </span>
      </Link>

      <nav className="ct-template-topnav" aria-label="Hovedmeny">
        <Link href="/startside">Startside</Link>
        <Link href="/katalog">Katalog</Link>
        <Link href="/auksjon">Auksjon</Link>
        <Link href="/min-side">Min side</Link>
        <Link href="/admin">Admin</Link>
      </nav>

      <form className="ct-template-search" role="search">
        <label htmlFor="ct-search">SÃ¸k</label>
        <input id="ct-search" type="search" placeholder="SÃ¸k i Collectium" />
      </form>

      <nav className="ct-template-auth" aria-label="Bruker">
        <Link href="/login">Logg inn</Link>
        <Link href="/registrering">Registrer</Link>
      </nav>
      <TemplateTemaControl />
</header>
  );
}

