/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Start Template
 *
 * Definering / formål:
 * Template for startside og landingsside. Template eier visuelt skall,
 * topbar, sidemenyvalg, footer, signatur og sideframe.
 *
 * Bruksområde:
 * Vanlige sidefiler sender kun inn innhold via children.
 *
 * Berørte sider / routes:
 * - /startside
 * - /landingsside
 *
 * Berørte DB-brytere / feature_keys:
 * - landing.view
 * - landing.register
 * - landing.login
 * - landing.membership
 *
 * Berørte API-ruter:
 * - GET /api/menu/public senere
 * - GET /api/auth/session senere
 *
 * Dataretning:
 * MariaDB/API senere -> Next.js -> React -> UI.
 *
 * Logging:
 * log_category: landing
 * log_action: template.view
 *
 * Versjon:
 * CT-FILE-START-V30-TEMPLATE / CHANGE-2026-06-05-START-V30
 */

import type { ReactNode } from "react";
import { CollectiumPublicSidebar } from "../layout/CollectiumPublicSidebar";
import { CollectiumPublicTopbar } from "../layout/CollectiumPublicTopbar";
import styles from "./CollectiumStartTemplate.module.css";

type CollectiumStartTemplateProps = {
  children: ReactNode;
  showSidebar?: boolean;
};

export function CollectiumStartTemplate({ children, showSidebar = true }: CollectiumStartTemplateProps) {
  return (
    <div className={styles.shell} data-template="collectium" data-skin="signature-light" data-vp="pc">
      <div className={showSidebar ? styles.shellWithSidebar : styles.shellFrame}>
        {showSidebar ? <CollectiumPublicSidebar /> : null}
        <div>
          <CollectiumPublicTopbar />
          <main className={styles.pageContent}>{children}</main>
          <footer className={styles.pageFooter}>
            <small>© 2026 Collectium AS · Alle rettigheter forbeholdt</small>
            <div className={styles.footerSignature}>Collectium</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
