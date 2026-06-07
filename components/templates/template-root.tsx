"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * TemplateRoot
 *
 * Definering / formål:
 * Global route-aware template root for Collectium.
 * Skiller mellom public routes og app routes.
 *
 * Bruksområde:
 * Brukes av app/layout.tsx som global wrapper rundt alle Next.js routes.
 *
 * Public routes:
 * - /
 * - /startside
 * - /landingsside
 * - /login
 * - /registrering
 * - /sign-in
 * - /sign-up
 *
 * App routes:
 * - /katalog
 * - /auksjoner
 * - /min-side
 * - /admin
 *
 * Berørte DB-brytere / feature_keys:
 * - template.root.view
 * - template.public.shell
 * - template.app.shell
 *
 * Berørte API-ruter:
 * - Ingen direkte.
 *
 * Berørte tabeller / views:
 * - Ingen direkte.
 *
 * Dataretning:
 * Route -> TemplateRoot -> riktig shell -> sideinnhold
 *
 * Logging:
 * Ingen DB-logging.
 *
 * Versjon:
 * CT-TEMPLATE-ROOT-8.5-ROUTE-AWARE-0002
 *
 * Endringsregel:
 * Public routes skal ikke pakkes i app-sidebar/app-topbar.
 * App routes skal fortsatt bruke global app-template.
 */

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TemplatePageFrame } from "./template-page-frame";

type TemplateRootProps = {
  children: ReactNode;
};

const publicRoutes = [
  "/",
  "/startside",
  "/landingsside",
  "/login",
  "/registrering",
  "/sign-in",
  "/sign-up",
];

function isPublicRoute(pathname: string | null): boolean {
  if (!pathname) return false;

  if (publicRoutes.includes(pathname)) {
    return true;
  }

  return publicRoutes.some((route) => {
    if (route === "/") return false;
    return pathname.startsWith(`${route}/`);
  });
}

export function TemplateRoot({ children }: TemplateRootProps) {
  const pathname = usePathname();

  if (isPublicRoute(pathname)) {
    return <>{children}</>;
  }

  return <TemplatePageFrame>{children}</TemplatePageFrame>;
}

export default TemplateRoot;
