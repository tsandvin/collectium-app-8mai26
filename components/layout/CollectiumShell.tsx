import Link from "next/link";

const menu = [
  ["ST", "Startside", "/startside"],
  ["KA", "Katalog", "/katalog"],
  ["AU", "Auksjon", "/auksjoner"],
  ["MS", "Min side", "/min-side"],
  ["AD", "Admin", "/admin"]
] as const;

export function CollectiumShell({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="collectium-shell">
      <header className="collectium-topbar">
        <Link href="/" className="collectium-brand">
          <span className="collectium-logo">C</span>
          <span className="collectium-brandText">
            <strong>Collectium</strong>
            <span>Samlerplattform</span>
          </span>
        </Link>

        <nav className="collectium-nav" aria-label="Hovedmeny">
          <Link href="/startside">Startside</Link>
          <Link href="/katalog">Katalog</Link>
          <Link href="/auksjoner">Auksjon</Link>
          <Link href="/min-side">Min side</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        <form className="collectium-search" role="search">
          <input type="search" placeholder="Søk i Collectium" aria-label="Søk i Collectium" />
        </form>

        <nav className="collectium-auth" aria-label="Innlogging">
          <Link href="/login">Logg inn</Link>
          <Link href="/sign-up">Registrer</Link>
        </nav>
      </header>

      <div className="collectium-body">
        <aside className="collectium-sidebar">
          <p className="collectium-sidebarTitle">Plattform</p>

          <nav className="collectium-sidebarNav" aria-label="Sidemeny">
            {menu.map(([code, label, href]) => (
              <Link key={href} href={href}>
                <span>{code}</span>
                <strong>{label}</strong>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="collectium-main">{children}</main>
      </div>
    </div>
  );
}
