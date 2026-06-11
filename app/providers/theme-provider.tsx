"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * theme-provider
 *
 * Definering / formål:
 * Global React Context-provider for fire låste Collectium UI 8.5 v36-tema.
 * Provideren setter både html[data-theme] og html[data-skin] slik at ny v36-token-CSS
 * og eldre template-CSS kan fungere samtidig i overgangsperioden.
 *
 * Bruksområde:
 * app/layout.tsx
 * components/templates/template-design-control.tsx
 *
 * Berørte sider / routes:
 * - alle routes via app/layout.tsx
 * - /admin/system/mariadb-neon som dokumenterer låst metode under Layout / Tema
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.theme_ui85
 * - local.template.design_skin
 * - local.template.design_definition
 *
 * Berørte API-ruter:
 * - senere /api/user/preferences/theme
 * - senere /api/admin/design-definition
 *
 * Berørte tabeller / views:
 * - senere ct_ui_skins
 * - senere ct_user_preferences.preferred_skin
 *
 * Dataretning:
 * React Context -> html[data-theme]/html[data-skin] -> CSS tokens -> global template/UI
 * Senere: Neon ct_user_preferences.preferred_skin -> API -> React Context -> CSS tokens
 *
 * Logging:
 * - localStorage: ct-active-skin-v2
 * - leser legacy key ct-active-skin-v1 og migrerer enkel -> samler
 *
 * Versjon:
 * CT-FILE-THEME-PROVIDER-0001 / CHANGE-2026-06-12-UI85-V36-THEME-PROVIDER
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CollectiumTheme = "collectium" | "samler" | "museum" | "finans";

interface ThemeContextType {
  theme: CollectiumTheme;
  setTheme: (theme: CollectiumTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "ct-active-skin-v2";
const LEGACY_STORAGE_KEY = "ct-active-skin-v1";

function normalizeTheme(value: string | null): CollectiumTheme | null {
  if (value === "collectium" || value === "samler" || value === "museum" || value === "finans") {
    return value;
  }

  if (value === "enkel") {
    return "samler";
  }

  return null;
}

function writeThemeToDom(theme: CollectiumTheme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.skin = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<CollectiumTheme>("collectium");

  function setTheme(nextTheme: CollectiumTheme): void {
    setThemeState(nextTheme);
    writeThemeToDom(nextTheme);
  }

  useEffect(() => {
    const saved =
      normalizeTheme(window.localStorage.getItem(STORAGE_KEY)) ??
      normalizeTheme(window.localStorage.getItem(LEGACY_STORAGE_KEY)) ??
      "collectium";

    setTheme(saved);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be inside ThemeProvider");
  }

  return ctx;
}
