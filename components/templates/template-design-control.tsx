"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-design-control
 *
 * Definering / formål:
 * Lokal template-kontroll for valg av fire godkjente Collectium-skinn.
 * Dette er ikke DB-/tilgangslogikk og skal ikke styre katalog, API, medlemskap eller DB 8.4.
 *
 * Bruksområde:
 * Global toppmeny / template-toppmeny.
 *
 * Berørte sider / routes:
 * - alle sider via global template
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.design_skin
 *
 * Berørte API-ruter:
 * - ingen
 *
 * Berørte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Local UI → html[data-skin] → global CSS
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-TEMPLATE-DESIGN-CONTROL-0001 / CHANGE-2026-06-06-DESIGN-SKINS-4
 */

import { useEffect, useState } from "react";

type CollectiumSkin = "collectium" | "enkel" | "museum" | "finans";

const STORAGE_KEY = "ct-active-skin-v1";

const skins: ReadonlyArray<{
  key: CollectiumSkin;
  label: string;
}> = [
  { key: "collectium", label: "Collectium" },
  { key: "enkel", label: "Enkel" },
  { key: "museum", label: "Museum" },
  { key: "finans", label: "Finans" }
];

function isCollectiumSkin(value: string | null): value is CollectiumSkin {
  return value === "collectium" || value === "enkel" || value === "museum" || value === "finans";
}

function applySkin(skin: CollectiumSkin): void {
  document.documentElement.dataset.skin = skin;
  window.localStorage.setItem(STORAGE_KEY, skin);
}

export function TemplateDesignControl() {
  const [activeSkin, setActiveSkin] = useState<CollectiumSkin>("collectium");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const skin = isCollectiumSkin(saved) ? saved : "collectium";

    setActiveSkin(skin);
    applySkin(skin);
  }, []);

  return (
    <div className="ct-template-design">
      <button
        type="button"
        className="ct-template-design-button"
        aria-expanded={open}
        aria-label="Velg designskinn"
        onClick={() => setOpen((value) => !value)}
      >
        Design
        <span>{skins.find((skin) => skin.key === activeSkin)?.label}</span>
      </button>

      {open ? (
        <div className="ct-template-design-panel" role="menu" aria-label="Designskinn">
          {skins.map((skin) => (
            <button
              key={skin.key}
              type="button"
              role="menuitem"
              className={activeSkin === skin.key ? "is-active" : ""}
              onClick={() => {
                setActiveSkin(skin.key);
                applySkin(skin.key);
                setOpen(false);
              }}
            >
              {skin.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}