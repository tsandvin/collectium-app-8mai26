/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Mobile Menu placeholder
 *
 * Definering / formål:
 * Reserved typed mobile menu component for future controlled mobile navigation.
 *
 * Bruksområde:
 * Can be used by CollectiumAppShell or Topbar later.
 *
 * Berørte sider / routes:
 * - All routes under app/layout.tsx
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.mobile_menu
 *
 * Dataretning:
 * Template/layout only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import Link from "next/link";

export type CollectiumMobileMenuProps = {
  readonly isOpen?: boolean;
};

export function CollectiumMobileMenu({ isOpen = false }: CollectiumMobileMenuProps): JSX.Element | null {
  if (!isOpen) {
    return null;
  }

  return (
    <nav aria-label="Mobilmeny">
      <Link href="/login">Logg inn</Link>
      <Link href="/registrering">Registrering</Link>
      <Link href="/min-side">Min side</Link>
      <Link href="/katalog">Katalog</Link>
    </nav>
  );
}
