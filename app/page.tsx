/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root page redirect
 *
 * Definering / formål:
 * Kontrollerer rotadressen / og sender brukeren videre til Collectium sin
 * template-styrte startside. Dette erstatter standard Next.js startside.
 *
 * Bruksområde:
 * Hovedinngang for app.collectium.no og Vercel-preview.
 *
 * Berørte sider / routes:
 * - /
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 *
 * Berørte API-ruter:
 * - ingen
 *
 * Berørte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * Lokal Next.js route -> /startside.
 *
 * Logging:
 * log_category: landing
 * log_action: root.redirect
 *
 * Versjon:
 * CT-FILE-ROOT-REDIRECT-0001 / CHANGE-2026-06-05-ROOT-REDIRECT
 */

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/startside");
}
