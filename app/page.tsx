/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root redirect
 *
 * Definering / formål:
 * Root-siden sender brukeren til kontrollert startside.
 *
 * Bruksområde:
 * /
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
 * Ingen data. Kun Next.js redirect.
 *
 * Logging:
 * ingen
 *
 * Versjon:
 * CT-FILE-HOME-REDIRECT-0001 / CHANGE-2026-06-06-ROOT-TO-STARTSIDE
 */

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/startside");
}