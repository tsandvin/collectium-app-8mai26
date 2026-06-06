/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * template-signature-frame
 *
 * Definering / formål:
 * Global Collectium signatur-/rammekomponent.
 *
 * Bruksområde:
 * Brukes senere av paneler/kort som skal ha Collectium signaturdetalj.
 *
 * Berørte sider / routes:
 * - alle sider som bruker template-paneler
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.signature_frame
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
 * CT-FILE-TEMPLATE-SIGNATURE-FRAME-0001 / CHANGE-2026-06-06-STRUCTURE-LOCK
 */

export function TemplateSignatureFrame({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="ct-signature-frame">{children}</section>;
}