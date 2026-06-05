"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Login Client
 *
 * Definering / formal:
 * Login/register UI koblet til eksisterende authClient, plassert i Collectium global shell.
 *
 * Bruksomrade:
 * Brukes paa /login for innlogging og registrering.
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
 * - profile.view
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
 * - ct_user_profiles
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: auth
 * log_action: login.submit
 *
 * Versjon:
 * CT-FILE-AUTH-LOGIN-0001 / CHANGE-2026-06-05-0001
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function CollectiumLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = isRegister
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message ?? "Innlogging feilet. Kontroller e-post og passord.");
      return;
    }

    router.push("/min-side");
    router.refresh();
  }

  return (
    <section className="ct-auth-layout">
      <article className="ct-auth-intro ct-signature-frame">
        <p className="ct-kicker">Collectium konto</p>
        <h1>{isRegister ? "Bli medlem" : "Logg inn"}</h1>
        <p>
          Kontoen skal senere styre medlemskap, samling, hjerte, stjerne, transaksjoner,
          forhandlerroller, adminrettigheter og tilgang via DB 8.4.
        </p>
        <div className="ct-auth-bullets">
          <span>Min samling</span>
          <span>Index / Finans</span>
          <span>Varsler og prosesser</span>
          <span>Forhandler / Admin etter rolle</span>
        </div>
      </article>

      <form className="ct-auth-card ct-signature-frame" onSubmit={submit}>
        <div className="ct-auth-tabs" role="tablist" aria-label="Velg innloggingstype">
          <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>Logg inn</button>
          <button type="button" className={mode === "register" ? "is-active" : ""} onClick={() => setMode("register")}>Registrer</button>
        </div>

        {isRegister ? (
          <label className="ct-field">
            <span>Navn</span>
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required placeholder="Ditt navn" />
          </label>
        ) : null}

        <label className="ct-field">
          <span>E-post</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required placeholder="din@epost.no" />
        </label>

        <label className="ct-field">
          <span>Passord</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isRegister ? "new-password" : "current-password"} required minLength={8} placeholder="Minst 8 tegn" />
        </label>

        {error ? <p className="ct-auth-error" role="alert">{error}</p> : null}

        <button type="submit" className="ct-primary-action" disabled={loading}>
          {loading ? "Sender..." : isRegister ? "Opprett konto" : "Logg inn"}
        </button>

        <div className="ct-auth-links">
          <Link href="/">Til startside</Link>
          <Link href="/min-side">Apne demo av Min side</Link>
        </div>
      </form>
    </section>
  );
}
