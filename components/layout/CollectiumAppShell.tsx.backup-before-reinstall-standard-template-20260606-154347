"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumAppShell
 *
 * Definering / formål:
 * Globalt Collectium-skall for Next.js appen.
 * Eier toppbar, eventuell sidemeny, ruteavhengig public/app-layout og PageFrame.
 *
 * Bruksområde:
 * Brukes av app/layout.tsx rundt alle routes.
 *
 * Regler:
 * - /startside, /landingsside og / skal ikke ha sidemeny.
 * - App-sider som /katalog, /min-side, /auksjoner, /meldinger, /admin skal ha sidemeny.
 * - Ingen enkeltside skal lage egen AppShell, toppbar eller sidemeny.
 */

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CollectiumTopbar } from "./CollectiumTopbar";
import { CollectiumSidebar } from "./CollectiumSidebar";
import { CollectiumPageFrame } from "./CollectiumPageFrame";

type CollectiumAppShellProps = {
  children: ReactNode;
};

const PUBLIC_NO_SIDEBAR_ROUTES = new Set<string>([
  "/",
  "/startside",
  "/landingsside",
]);

export function CollectiumAppShell({ children }: CollectiumAppShellProps): JSX.Element {
  const pathname = usePathname() || "/";
  const isPublicNoSidebar = PUBLIC_NO_SIDEBAR_ROUTES.has(pathname);

  return (
    <div
      className={
        isPublicNoSidebar
          ? "ct-shell ct-shell--public"
          : "ct-shell ct-shell--app"
      }
      data-route-mode={isPublicNoSidebar ? "public" : "app"}
    >
      <CollectiumTopbar />

      <div className="ct-shell__body">
        {!isPublicNoSidebar ? <CollectiumSidebar /> : null}

        <main className="ct-shell__main" id="main-content">
          {isPublicNoSidebar ? (
            children
          ) : (
            <CollectiumPageFrame>{children}</CollectiumPageFrame>
          )}
        </main>
      </div>
    </div>
  );
}

export default CollectiumAppShell;
