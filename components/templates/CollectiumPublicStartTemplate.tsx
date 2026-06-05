/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Public Start Template
 *
 * Definering / formal:
 * Public template for startside/landingsside uten sidemeny. Template eier skall,
 * toppmeny, footer, global seksjonsstruktur og template-klasser for public innhold.
 *
 * Bruksomrade:
 * Brukes av app/startside/page.tsx og kan senere brukes av public landingssider.
 *
 * Berorte sider / routes:
 * - /startside
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.view
 * - landing.login
 * - landing.register
 * - landing.membership
 *
 * Berorte API-ruter:
 * - Ingen direkte API-kall i denne template-versjonen.
 *
 * Berorte tabeller / views:
 * - Ingen direkte tabell/view i denne template-versjonen.
 *
 * Dataretning:
 * MariaDB -> API/backend -> Next.js -> React -> UI ved dynamiske data.
 *
 * Logging:
 * log_category: landing
 * log_action: template.view
 *
 * Versjon:
 * CT-PUBLIC-START-TEMPLATE-V8 / CHANGE-2026-06-05-STARTSIDE-FILES-V8
 *
 * Endringsregel:
 * Denne filen kan eie public template-skall. Vanlige sidefiler skal ikke eie design.
 */

import type { ReactNode } from "react";
import { CollectiumPublicTopbar } from "../layout/CollectiumPublicTopbar";
import styles from "./CollectiumPublicStartTemplate.module.css";

type CollectiumPublicStartTemplateProps = {
  children: ReactNode;
};

export function CollectiumPublicStartTemplate({ children }: CollectiumPublicStartTemplateProps) {
  return (
    <div className={styles.shell} data-ct-template="public-start" data-template="collectium" data-skin="signature-light">
      <CollectiumPublicTopbar />
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <img src="/collectium-tema/collectium-tema-logo-white.png" alt="Collectium" />
          <p>For samlere · for historien · for markedet</p>
          <small>Collectium AS 2026</small>
        </div>
      </footer>
    </div>
  );
}
