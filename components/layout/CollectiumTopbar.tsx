"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumTopbar
 *
 * Definering / formÃ¥l:
 * Global toppbar for Collectium. Eies av globalt AppShell/layout-lag.
 * Inneholder venstre logo, hovednavigasjon, sÃ¸kemeny, designmeny og
 * innlogging/registrering som global template-kontroll.
 *
 * BruksomrÃ¥de:
 * Brukes av globalt skall. Skal ikke importeres direkte i startsiden.
 *
 * BerÃ¸rte sider / routes:
 * - Alle sider som bruker global Collectium layout
 * - /startside
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - Ren template/UI-kontroll i denne fasen
 * - Senere kobles sÃ¸kevalg mot catalog.search, collection.search og page.search
 *
 * Dataretning:
 * MariaDB/API -> Next.js -> React -> UI
 *
 * Endringsregel:
 * Startside skal ikke eie egen toppbar. Denne filen er global toppbar.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SearchMode = "catalog" | "collection" | "page";
type SkinMode = "collectium" | "enkel" | "museum" | "finans";

type SearchOption = {
  key: SearchMode;
  label: string;
  description: string;
  href?: string;
};

type SkinOption = {
  key: SkinMode;
  label: string;
  description: string;
};

const searchOptions: readonly SearchOption[] = [
  {
    key: "catalog",
    label: "SÃ¸k i katalog",
    description: "Objekter, kilder, varianter, valÃ¸rer og relasjoner.",
    href: "/katalog",
  },
  {
    key: "collection",
    label: "SÃ¸k i min samling",
    description: "Egne objekter, Ã¸nskeliste, favoritter og notater.",
    href: "/min-side?panel=samling",
  },
  {
    key: "page",
    label: "SÃ¸k pÃ¥ siden",
    description: "Finn tekst og felt pÃ¥ siden du stÃ¥r pÃ¥.",
  },
];

const skinOptions: readonly SkinOption[] = [
  {
    key: "collectium",
    label: "Collectium",
    description: "Signature light med arkiv, grÃ¸nn og dempet gull.",
  },
  {
    key: "enkel",
    label: "Enkel blÃ¥/grÃ¥",
    description: "BlÃ¥ skin med grÃ¥ detaljer, ikke brun/gull.",
  },
  {
    key: "museum",
    label: "Museum",
    description: "MÃ¸rk historisk visning med dempet kontrast.",
  },
  {
    key: "finans",
    label: "Finans",
    description: "Marked, trend og analyse med grÃ¸nn/slate dybde.",
  },
];

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/medlemskap", label: "Medlemskap" },
  { href: "/forhandler", label: "Forhandlere" },
  { href: "/auksjoner", label: "Auksjon" },
] as const;

function applySkin(skin: SkinMode): void {
  document.documentElement.dataset.skin = skin;
  document.documentElement.dataset.template = "collectium";
  window.localStorage.setItem("collectium-active-skin", skin);
}

function openPageSearch(): void {
  window.dispatchEvent(new CustomEvent("collectium:page-search"));
  const selection = window.getSelection();
  if (selection) selection.removeAllRanges();
}

export function CollectiumTopbar(): JSX.Element {
  const [searchOpen, setSearchOpen] = useState(false);
  const [designOpen, setDesignOpen] = useState(false);
  const [activeSkin, setActiveSkin] = useState<SkinMode>("collectium");
  const topbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const savedSkin = window.localStorage.getItem("collectium-active-skin");
    if (
      savedSkin === "collectium" ||
      savedSkin === "enkel" ||
      savedSkin === "museum" ||
      savedSkin === "finans"
    ) {
      setActiveSkin(savedSkin);
      applySkin(savedSkin);
    }
  }, []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent): void {
      if (!topbarRef.current) return;
      if (!topbarRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setDesignOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setDesignOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function selectSkin(skin: SkinMode): void {
    setActiveSkin(skin);
    applySkin(skin);
  }

  return (
    <header className="ct-topbar-v42" ref={topbarRef}>
      <div className="ct-topbar-v42__inner">
        <Link className="ct-topbar-v42__brand" href="/startside" aria-label="Collectium startside">
          <span className="ct-topbar-v42__logoMark" aria-hidden="true">C</span>
          <span className="ct-topbar-v42__brandText">
            <strong>Collectium</strong>
            <small>For samlere Â· for historien</small>
          </span>
        </Link>

        <nav className="ct-topbar-v42__nav" aria-label="Hovedmeny">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ct-topbar-v42__actions">
          <div className="ct-topbar-v42__menuWrap">
            <button
              className="ct-topbar-v42__iconButton"
              type="button"
              aria-label="Ã…pne sÃ¸kemeny"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((value) => !value);
                setDesignOpen(false);
              }}
            >
              <span aria-hidden="true">âŒ•</span>
            </button>

            {searchOpen ? (
              <div className="ct-topbar-v42__dropdown ct-topbar-v42__dropdown--search" role="menu">
                <p className="ct-topbar-v42__dropdownKicker">SÃ¸k</p>
                {searchOptions.map((option) => {
                  if (option.key === "page") {
                    return (
                      <button
                        key={option.key}
                        type="button"
                        className="ct-topbar-v42__dropdownItem"
                        onClick={() => {
                          openPageSearch();
                          setSearchOpen(false);
                        }}
                      >
                        <strong>{option.label}</strong>
                        <span>{option.description}</span>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={option.key}
                      href={option.href ?? "/katalog"}
                      className="ct-topbar-v42__dropdownItem"
                      onClick={() => setSearchOpen(false)}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="ct-topbar-v42__menuWrap">
            <button
              className="ct-topbar-v42__button"
              type="button"
              aria-expanded={designOpen}
              onClick={() => {
                setDesignOpen((value) => !value);
                setSearchOpen(false);
              }}
            >
              Design
            </button>

            {designOpen ? (
              <div className="ct-topbar-v42__dropdown ct-topbar-v42__dropdown--design" role="menu">
                <p className="ct-topbar-v42__dropdownKicker">Skin / template</p>
                {skinOptions.map((skin) => (
                  <button
                    key={skin.key}
                    type="button"
                    className={
                      activeSkin === skin.key
                        ? "ct-topbar-v42__dropdownItem is-active"
                        : "ct-topbar-v42__dropdownItem"
                    }
                    onClick={() => selectSkin(skin.key)}
                  >
                    <strong>{skin.label}</strong>
                    <span>{skin.description}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="ct-topbar-v42__authSwitch" aria-label="Logg pÃ¥ eller registrer deg">
            <Link href="/login">Logg pÃ¥</Link>
            <Link href="/sign-up">Registrer deg</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CollectiumTopbar;
