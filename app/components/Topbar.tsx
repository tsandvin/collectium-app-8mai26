"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Topbar
 *
 * Definering / formal:
 * Global toppbar med sok, aktiviteter, varsler, login og min side.
 *
 * Bruksomrade:
 * Brukes i AppShell paa alle app-sider.
 *
 * Berorte sider / routes:
 * - /login
 * - /min-side
 * - /meldinger
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - search.global
 * - activity.view
 * - notifications.view
 * - messages.view
 * - profile.view
 * - auth.login
 *
 * Berorte API-ruter:
 * - GET /api/search
 * - GET /api/activity/feed
 * - GET /api/auth/session
 *
 * Berorte tabeller / views:
 * - ct_activity_log
 * - ct_notifications
 * - ct_messages
 * - ct_user_sessions
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: layout
 * log_action: topbar.render
 *
 * Versjon:
 * CT-FILE-TOPBAR-0002 / CHANGE-2026-06-05-0001
 */

import { useState } from "react";
import Link from "next/link";

const ACTIVITY = [
  { type: "Varsel", text: "3 prosesser krever handling", href: "/min-side?panel=prosesser" },
  { type: "Melding", text: "2 uleste meldinger", href: "/meldinger" },
  { type: "Auksjon", text: "1 fulgt objekt har nytt bud", href: "/auksjoner" },
  { type: "System", text: "DB 8.4 kontroll har 1 varsel", href: "/admin" },
];

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="ct-topbar" aria-label="Toppmeny">
      <label className="ct-topbar-search">
        <i className="ti ti-search" aria-hidden />
        <input type="search" placeholder="Sok i Collectium: objekter, kilder, relasjoner, brukere..." aria-label="Sok i Collectium" />
      </label>

      <div className="ct-search-switch" aria-label="Sokemodus">
        <button type="button" className="is-active">Katalog</button>
        <button type="button">AI-sok</button>
        <button type="button">Sider</button>
      </div>

      <div className="ct-topbar-actions">
        <div className="ct-activity-wrap">
          <button className="ct-topbar-pill" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="ct-activity-menu">
            <i className="ti ti-activity" aria-hidden />
            <span>Aktiviteter</span>
            <strong>7</strong>
          </button>
          {open ? (
            <section id="ct-activity-menu" className="ct-activity-menu" aria-label="Aktiviteter og varsler">
              <div className="ct-activity-menu-head">
                <span>Arkivlogg</span>
                <Link href="/min-side?panel=aktivitet">Apne alle</Link>
              </div>
              {ACTIVITY.map((item) => (
                <Link key={`${item.type}-${item.text}`} href={item.href} className="ct-activity-item">
                  <span>{item.type}</span>
                  <p>{item.text}</p>
                </Link>
              ))}
            </section>
          ) : null}
        </div>

        <Link href="/min-side" className="ct-topbar-pill ct-hide-mobile">
          <i className="ti ti-user-circle" aria-hidden />
          <span>Min side</span>
        </Link>
        <Link href="/login" className="ct-topbar-pill is-strong">
          <i className="ti ti-login" aria-hidden />
          <span>Logg inn</span>
        </Link>
      </div>
    </header>
  );
}
