/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium PageFrame
 *
 * Definering / formål:
 * Global page frame. All page content must render inside this frame.
 *
 * Bruksområde:
 * Used by CollectiumAppShell.
 *
 * Berørte sider / routes:
 * - All routes under app/layout.tsx
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.page_frame
 *
 * Dataretning:
 * Template/layout only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import type { ReactNode } from "react";

export type CollectiumPageFrameProps = {
  readonly children: ReactNode;
};

export function CollectiumPageFrame({ children }: CollectiumPageFrameProps): JSX.Element {
  return <div className="ct-page-frame">{children}</div>;
}
