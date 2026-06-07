/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-skins
 *
 * Definering / formål:
 * Global tema-/skin-definisjon for Collectium.
 * Frontend skal vise dette som "Tema", ikke som separate Design/Skin-knapper.
 *
 * Bruksområde:
 * Brukes av template-root og tema-kontroll i toppmeny.
 *
 * Berørte sider / routes:
 * - alle routes via global template
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.theme
 * - local.template.skin
 *
 * Berørte API-ruter:
 * - ingen
 *
 * Berørte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Tema-valg -> data-skin -> CSS variabler -> UI
 *
 * Logging:
 * ingen DB-logging
 *
 * Versjon:
 * CT-FILE-TEMPLATE-SKINS-0003 / CHANGE-2026-06-07-TEMA
 */

export type CollectiumTemaKey =
  | "collectium-light"
  | "simple-light"
  | "collectium-dark"
  | "simple-dark";

export type CollectiumTemaOption = {
  key: CollectiumTemaKey;
  label: string;
  mode: "light" | "dark";
  family: "collectium" | "simple";
};

export const COLLECTIUM_TEMA_OPTIONS: CollectiumTemaOption[] = [
  {
    key: "collectium-light",
    label: "Collectium lys",
    mode: "light",
    family: "collectium"
  },
  {
    key: "simple-light",
    label: "Enkel lys",
    mode: "light",
    family: "simple"
  },
  {
    key: "collectium-dark",
    label: "Collectium mørk",
    mode: "dark",
    family: "collectium"
  },
  {
    key: "simple-dark",
    label: "Enkel mørk",
    mode: "dark",
    family: "simple"
  }
];

export const COLLECTIUM_TEMA_DEFAULT: CollectiumTemaKey = "collectium-light";

/**
 * Bakoverkompatibilitet:
 * TemplateRoot bruker fortsatt COLLECTIUM_SKIN.
 * Nå betyr COLLECTIUM_SKIN valgt tema.
 */
export const COLLECTIUM_SKIN = COLLECTIUM_TEMA_DEFAULT;

/**
 * Beholdes for eksisterende template-root.
 * Skal ikke vises som egen frontend-knapp.
 */
export const COLLECTIUM_TEMPLATE = "collectium";

/**
 * Beholdes for eksisterende template-root.
 */
export const COLLECTIUM_VIEWPORT_DEFAULT = "pc";
