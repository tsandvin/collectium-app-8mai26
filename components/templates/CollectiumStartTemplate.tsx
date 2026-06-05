import type { ReactNode } from "react";
import { CollectiumPublicSidebar } from "../layout/CollectiumPublicSidebar";
import { CollectiumPublicTopbar } from "../layout/CollectiumPublicTopbar";
import styles from "./CollectiumStartTemplate.module.css";
import "./CollectiumPublicTemplateGlobals.css";

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
            <small>Collectium AS 2026</small>
            <div className={styles.footerSignature}>Collectium</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

