/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumPageFrame
 *
 * Definering / formål:
 * App-sideinnramming for interne Collectium-sider.
 * Public routes som /startside bruker ikke PageFrame.
 */

import type { ReactNode } from "react";

type CollectiumPageFrameProps = {
  children: ReactNode;
};

export function CollectiumPageFrame({ children }: CollectiumPageFrameProps): JSX.Element {
  return <div className="ct-page-frame">{children}</div>;
}

export default CollectiumPageFrame;
