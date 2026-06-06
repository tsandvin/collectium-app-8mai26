/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-skins
 *
 * Definering / formål:
 * Låst skin-konfigurasjon for Collectium global template.
 *
 * Bruksområde:
 * Brukes av template-root og global CSS/tokens.
 *
 * Berørte sider / routes:
 * - alle routes via app/layout.tsx
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.skin
 *
 * Berørte API-ruter:
 * - ingen
 *
 * Berørte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Template/local UI → React → UI
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-TEMPLATE-SKINS-0002 / CHANGE-2026-06-06-DESIGN-SKINS-4
 */

export const COLLECTIUM_TEMPLATE = "collectium" as const;
export const COLLECTIUM_SKIN = "collectium" as const;
export const COLLECTIUM_VIEWPORT_DEFAULT = "pc" as const;