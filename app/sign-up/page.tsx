/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Legacy sign-up alias
 *
 * Definering / formal:
 * Sender tidligere /sign-up til ny /login?mode=register.
 *
 * Bruksomrade:
 * Brukes for bakoverkompatibilitet.
 *
 * Berorte sider / routes:
 * - /sign-up
 * - /login
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.register
 *
 * Berorte API-ruter:
 * - Ingen direkte
 *
 * Berorte tabeller / views:
 * - Ingen direkte
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: sign_up.alias
 *
 * Versjon:
 * CT-FILE-ROUTE-SIGNUP-ALIAS-0001 / CHANGE-2026-06-05-0001
 */

import { redirect } from "next/navigation";

export default function SignUpAliasPage() {
  redirect("/login?mode=register");
}
