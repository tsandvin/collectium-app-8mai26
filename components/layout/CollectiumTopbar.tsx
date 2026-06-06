import Link from "next/link";
import { CollectiumSkinController } from "./CollectiumSkinController";

export function CollectiumTopbar(): JSX.Element {
  return (
    <header className="ct-topbar">
      <div className="ct-brand">
        <Link href="/" className="ct-logo" aria-label="Collectium">
          C
        </Link>

        <div className="ct-brand-text">
          <strong>Collectium</strong>
          <span>Samlerplattform</span>
        </div>
      </div>

      <nav className="ct-topnav" aria-label="Hovedmeny">
        <Link href="/startside">Startside</Link>
        <Link href="/katalog">Katalog</Link>
        <Link href="/auksjoner">Auksjon</Link>
        <Link href="/min-side">Min side</Link>
        <Link href="/admin">Admin</Link>
      </nav>

      <form className="ct-search" role="search">
        <label htmlFor="collectium-search">Søk</label>
        <input id="collectium-search" type="search" placeholder="Søk i Collectium" />
      </form>

      <CollectiumSkinController />

      <div className="ct-auth">
        <Link href="/login">Logg inn</Link>
        <Link href="/sign-up">Registrer</Link>
      </div>
    </header>
  );
}

export default CollectiumTopbar;
