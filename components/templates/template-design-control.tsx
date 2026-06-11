"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-design-control
 *
 * Definering / formål:
 * Global template-kontroll for valg av fire låste Collectium UI 8.5 v36-tema.
 * Skinnene/temaene er: Collectium, Samler, Museum og Finans.
 * Komponenten bruker ThemeProvider som én sann lokal UI-state og skriver derfor både
 * html[data-theme] og html[data-skin] gjennom providerens setTheme.
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
 * - local.template.design_definition
 *
 * Berørte API-ruter:
 * - ingen i denne lokale template-versjonen
 * - senere /api/user/preferences/theme
 *
 * Berørte tabeller / views:
 * - senere ct_ui_skins
 * - senere ct_user_preferences.preferred_skin
 *
 * Dataretning:
 * TemplateDesignControl -> ThemeProvider -> html[data-theme] + html[data-skin] -> collectium-ui85-v36.css
 *
 * Logging:
 * - localStorage: ct-active-skin-v2 via ThemeProvider
 *
 * Versjon:
 * CT-FILE-TEMPLATE-DESIGN-CONTROL-0003 / CHANGE-2026-06-12-UI85-V36-PROVIDER
 */

import { useState } from "react";
import { type CollectiumTheme, useTheme } from "@/app/providers/theme-provider";

const skins: ReadonlyArray<{
  key: CollectiumTheme;
  label: string;
  description: string;
}> = [
  { key: "collectium", label: "Collectium", description: "Premium signatur" },
  { key: "samler", label: "Samler", description: "Lys katalog" },
  { key: "museum", label: "Museum", description: "Historisk arkiv" },
  { key: "finans", label: "Finans", description: "Marked og KPI" }
];

export function TemplateDesignControl() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

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
        <span>{skins.find((skin) => skin.key === theme)?.label}</span>
      </button>

      {open ? (
        <div className="ct-template-design-panel" role="menu" aria-label="Designskinn">
          {skins.map((skin) => (
            <button
              key={skin.key}
              type="button"
              role="menuitem"
              className={theme === skin.key ? "is-active" : ""}
              title={skin.description}
              onClick={() => {
                setTheme(skin.key);
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
