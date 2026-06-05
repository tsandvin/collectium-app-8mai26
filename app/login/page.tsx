/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Login route
 *
 * Definering / formal:
 * Login og registrering i global Collectium AppShell.
 *
 * Bruksomrade:
 * Vises paa /login og brukes som ny kanonisk login-side.
 *
 * Berorte sider / routes:
 * - /login
 * - /sign-in
 * - /sign-up
 *
 * Berorte DB-brytere / feature_keys:
 * - auth.login
 * - auth.register
 * - auth.session.create
 *
 * Berorte API-ruter:
 * - POST /api/auth/login
 * - POST /api/auth/register
 * - GET /api/auth/session
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_sessions
 * - ct_login_attempts
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: login.page
 *
 * Versjon:
 * CT-FILE-ROUTE-LOGIN-0001 / CHANGE-2026-06-05-0001
 */

import { Suspense } from "react";
import AppShell from "../components/AppShell";
import CollectiumLoginClient from "@/components/auth/CollectiumLoginClient";

export default function LoginPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="ct-panel-card ct-signature-frame">Laster login...</div>}>
        <CollectiumLoginClient />
      </Suspense>
    </AppShell>
  );
}
