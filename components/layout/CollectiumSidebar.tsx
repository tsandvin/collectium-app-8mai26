import Link from "next/link";

const menuItems = [
  { href: "/startside", code: "ST", label: "Startside" },
  { href: "/katalog", code: "KA", label: "Katalog" },
  { href: "/auksjoner", code: "AU", label: "Auksjon" },
  { href: "/min-side", code: "MS", label: "Min side" },
  { href: "/admin", code: "AD", label: "Admin" },
] as const;

export function CollectiumSidebar(): JSX.Element {
  return (
    <aside className="ct-sidebar" aria-label="Collectium sidemeny">
      <div className="ct-sidebar-title">Plattform</div>

      <nav className="ct-sidebar-nav">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="ct-sidebar-link">
            <span>{item.code}</span>
            <strong>{item.label}</strong>
          </Link>
        ))}
      </nav>

      <div className="ct-sidebar-card">
        <strong>Collectium</strong>
        <span>Katalog · samling · auksjon · marked</span>
      </div>
    </aside>
  );
}

export default CollectiumSidebar;
