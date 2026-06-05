/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Legacy sign-in alias
 *
 * Definering / formal:
 * Sender tidligere /sign-in til ny /login.
 *
 * Bruksomrade:
 * Brukes for bakoverkompatibilitet.
 *
 * Berorte sider / routes:
 * - /sign-in
 * - /login
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
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
 * log_action: sign_in.alias
 *
 * Versjon:
 * CT-FILE-ROUTE-SIGNIN-ALIAS-0001 / CHANGE-2026-06-05-0001
 */

import { redirect } from "next/navigation";

export default function SignInAliasPage() {
  redirect("/login");
}
