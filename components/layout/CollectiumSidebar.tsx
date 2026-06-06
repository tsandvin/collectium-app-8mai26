import Link from "next/link";

const menu = [
  ["ST", "Startside", "/startside"],
  ["KA", "Katalog", "/katalog"],
  ["AU", "Auksjon", "/auksjoner"],
  ["MS", "Min side", "/min-side"],
  ["AD", "Admin", "/admin"],
] as const;

export function CollectiumSidebar(): JSX.Element {
  return (
    <aside className="ct-sidebar">
      <p className="ct-sidebarTitle">Plattform</p>

      <nav className="ct-sidebarNav" aria-label="Sidemeny">
        {menu.map(([code, label, href]) => (
          <Link key={href} href={href} className="ct-sidebarLink">
            <span>{code}</span>
            <strong>{label}</strong>
          </Link>
        ))}
      </nav>

      <div className="ct-sidebarCard">
        <strong>Collectium</strong>
        <p>Katalog · samling · auksjon · marked</p>
      </div>
    </aside>
  );
}
