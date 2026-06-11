"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-design-control
 *
 * Definering / formål:
 * Global template-kontroll for valg av fire låste Collectium UI 8.5-skinn.
 * Skinnene er: Collectium, Samler, Museum og Finans.
 * Dette er ikke DB-/tilgangslogikk og skal ikke styre katalog, API, medlemskap eller DB 8.4.
 *
 * Bruksområde:
 * Global toppmeny / template-toppmeny.
 *
 * Berørte sider / routes:
 * - alle sider via global template
 * - /admin/system/mariadb-neon som dokumenterer låst metode under Layout / Tema
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.design_skin
 * - local.template.theme_ui85
 *
 * Berørte API-ruter:
 * - ingen i denne lokale template-versjonen
 *
 * Berørte tabeller / views:
 * - senere ct_ui_skins
 * - senere ct_user_preferences.preferred_skin
 *
 * Dataretning:
 * Local UI -> html[data-skin] + .ct-template-root[data-skin] -> global CSS tokens
 *
 * Logging:
 * - localStorage: ct-active-skin-v2
 *
 * Versjon:
 * CT-FILE-TEMPLATE-DESIGN-CONTROL-0002 / CHANGE-2026-06-11-UI85-SKINS-LOCK
 */

import { useEffect, useState } from "react";

export type CollectiumSkin = "collectium" | "samler" | "museum" | "finans";

const STORAGE_KEY = "ct-active-skin-v2";
const LEGACY_STORAGE_KEY = "ct-active-skin-v1";

const skins: ReadonlyArray<{
  key: CollectiumSkin;
  label: string;
  description: string;
}> = [
  { key: "collectium", label: "Collectium", description: "Premium signatur" },
  { key: "samler", label: "Samler", description: "Lys katalog" },
  { key: "museum", label: "Museum", description: "Historisk arkiv" },
  { key: "finans", label: "Finans", description: "Marked og KPI" }
];

function normalizeSkin(value: string | null): CollectiumSkin | null {
  if (value === "collectium" || value === "samler" || value === "museum" || value === "finans") {
    return value;
  }

  if (value === "enkel") {
    return "samler";
  }

  return null;
}

function applySkin(skin: CollectiumSkin): void {
  document.documentElement.dataset.skin = skin;
  window.localStorage.setItem(STORAGE_KEY, skin);
}

export function TemplateDesignControl() {
  const [activeSkin, setActiveSkin] = useState<CollectiumSkin>("collectium");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved =
      normalizeSkin(window.localStorage.getItem(STORAGE_KEY)) ??
      normalizeSkin(window.localStorage.getItem(LEGACY_STORAGE_KEY)) ??
      "collectium";

    setActiveSkin(saved);
    applySkin(saved);
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
        Tema
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
              title={skin.description}
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
