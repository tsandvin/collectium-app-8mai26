import Link from "next/link";
import { CollectiumSkinController } from "./CollectiumSkinController";

export function CollectiumTopbar(): JSX.Element {
  return (
    <header className="ct-topbar">
      <Link href="/" className="ct-brand" aria-label="Collectium">
        <span className="ct-logo">C</span>
        <span className="ct-brandText">
          <strong>Collectium</strong>
          <small>Samlerplattform</small>
        </span>
      </Link>

      <nav className="ct-topnav" aria-label="Hovedmeny">
        <Link href="/startside">Startside</Link>
        <Link href="/katalog">Katalog</Link>
        <Link href="/auksjoner">Auksjon</Link>
        <Link href="/min-side">Min side</Link>
        <Link href="/admin">Admin</Link>
      </nav>

      <form className="ct-search" role="search">
        <label htmlFor="ct-search">Søk</label>
        <input id="ct-search" type="search" placeholder="Søk i Collectium" />
      </form>

      <CollectiumSkinController />

      <nav className="ct-auth" aria-label="Innlogging">
        <Link href="/login">Logg inn</Link>
        <Link href="/sign-up">Registrer</Link>
      </nav>
    </header>
  );
}
