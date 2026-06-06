/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-page-frame
 *
 * Definering / formål:
 * Global side-/innholdsramme. Vanlige sider skal ikke lage egne rammer, bakgrunner, shadows eller shell.
 *
 * Bruksområde:
 * Brukes av template-root og senere av sideinnhold.
 *
 * Berørte sider / routes:
 * - alle sider via global template
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.page_frame
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
 * CT-FILE-TEMPLATE-PAGE-FRAME-0001 / CHANGE-2026-06-06-STRUCTURE-LOCK
 */

export function TemplatePageFrame({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="ct-page-frame">{children}</main>;
}