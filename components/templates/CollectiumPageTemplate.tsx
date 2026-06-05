/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Page Template
 *
 * Definering / formål:
 * Typed content template for normal pages. Pages provide content; template owns visual frame.
 *
 * Bruksområde:
 * Used by route page.tsx files.
 *
 * Berørte sider / routes:
 * - /
 * - /startside
 * - /landingsside
 * - /admin
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.page
 *
 * Dataretning:
 * Template/layout only.
 *
 * Versjon:
 * CT-PATCH-STRUCTURE-FIX-V1
 */

import type { ReactNode } from "react";

export type CollectiumPageVariant = "standard" | "landing" | "admin" | "catalog" | "object";

export type CollectiumPageTemplateProps = {
  readonly title: string;
  readonly eyebrow?: string;
  readonly description?: string;
  readonly variant?: CollectiumPageVariant;
  readonly actions?: ReactNode;
  readonly children: ReactNode;
};

export function CollectiumPageTemplate({
  title,
  eyebrow,
  description,
  variant = "standard",
  actions,
  children,
}: CollectiumPageTemplateProps): JSX.Element {
  return (
    <section className={`ct-page-template ct-page-template--${variant}`}>
      <header className="ct-page-hero">
        {eyebrow ? <p className="ct-eyebrow">{eyebrow}</p> : null}
        <h1 className="ct-page-title">{title}</h1>
        {description ? <p className="ct-page-description">{description}</p> : null}
        {actions ? <div className="ct-actions">{actions}</div> : null}
      </header>

      <div>{children}</div>
    </section>
  );
}
