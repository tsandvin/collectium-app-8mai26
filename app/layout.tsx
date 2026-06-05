/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Root layout for locked Collectium shell
 *
 * Definering / formal:
 * Setter global metadata, fonts og standard template-attributter for app.collectium.no.
 *
 * Bruksomrade:
 * Brukes av alle Next.js-sider i App Router.
 *
 * Berorte sider / routes:
 * - /
 * - /login
 * - /min-side
 * - /katalog
 * - /admin
 *
 * Berorte DB-brytere / feature_keys:
 * - local.template.view
 * - auth.login
 * - profile.view
 *
 * Berorte API-ruter:
 * - GET /api/auth/session
 * - POST /api/auth/login
 *
 * Berorte tabeller / views:
 * - ct_users
 * - ct_user_sessions
 * - ct_v_app_menu
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI
 *
 * Logging:
 * log_category: layout
 * log_action: render
 *
 * Versjon:
 * CT-FILE-LAYOUT-0002 / CHANGE-2026-06-05-0001
 *
 * Endringsregel:
 * Runtime designvelger er fjernet. Responsivitet styres av globale CSS-regler.
 */

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Collectium - For samlere, for historien',
  description: 'Collectium samler norske sedler, mynter, historiske relasjoner, samlingsverdi, auksjoner og forhandlerobjekter i en datadrevet plattform.',
  generator: 'Collectium Next.js',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f6f1e8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no" data-template="collectium" data-skin="signature-light" data-vp="pc" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700;800;900&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/[email protected]/dist/tabler-icons.min.css"
        />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
