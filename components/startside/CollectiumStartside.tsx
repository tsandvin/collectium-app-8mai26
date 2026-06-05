/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Startside Content
 *
 * Definering / formal:
 * Innholdskomponent for offentlig startside. Komponenten bruker kun globale template-klasser
 * og data-attributter. Den definerer ikke egen design, skin, bakgrunn, ramme, shadow,
 * topbar, designmeny eller responsiv shell.
 *
 * Bruksomrade:
 * Renderes fra app/startside/page.tsx.
 *
 * Berorte sider / routes:
 * - /startside
 *
 * Berorte DB-brytere / feature_keys:
 * - landing.view
 * - landing.login
 * - landing.register
 * - landing.membership
 * - catalog.view
 * - auction.view
 * - dealer.view
 *
 * Berorte API-ruter:
 * - Ingen direkte API-kall. Senere status/featured data skal hentes via API/server layer.
 *
 * Berorte tabeller / views:
 * - Ingen direkte tabell/view i denne komponenten.
 *
 * Dataretning:
 * MariaDB/API/backend -> Next.js -> React -> UI ved dynamiske data. Denne filen viser kun public tekststruktur.
 *
 * Logging:
 * log_category: landing
 * log_action: view
 *
 * Versjon:
 * CT-STARTSIDE-CONTENT-V2 / CHANGE-2026-06-05-STARTSIDE-TEMPLATE-COMPLIANT
 *
 * Endringsregel:
 * Komponenten skal ikke importere egen CSS-modul. Template/tokens styrer alt visuelt.
 */

import { startsideSections } from "./CollectiumStartsideData";

function SectionActions({ actions }: { actions?: Array<{ label: string; href: string; variant?: "primary" | "secondary" }> }) {
  if (!actions?.length) return null;
  return (
    <div className="ct-actions" data-ct-actions>
      {actions.map((action) => (
        <a key={action.href + action.label} className="ct-button" data-variant={action.variant ?? "secondary"} href={action.href}>
          {action.label}
        </a>
      ))}
    </div>
  );
}

function SectionCards({ cards }: { cards?: Array<{ title: string; text: string }> }) {
  if (!cards?.length) return null;
  return (
    <div className="ct-card-grid" data-ct-card-grid>
      {cards.map((card) => (
        <article className="ct-card" data-ct-card key={card.title}>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </article>
      ))}
    </div>
  );
}

function CatalogPreview() {
  return (
    <div className="ct-object-preview" data-ct-object-preview>
      <div className="ct-segment-switch" role="tablist" aria-label="Katalogsegmenter" data-ct-segment-switch>
        <button type="button" data-segment="samler" aria-selected="true">Samler</button>
        <button type="button" data-segment="historie">Historie</button>
        <button type="button" data-segment="finans">Finans</button>
      </div>
      <article className="ct-object-card" data-ct-object-card>
        <div className="ct-object-media" data-ct-object-media>
          <img src="/collectium-logo-mask.png" alt="Collectium merke" />
          <span>Sedler</span>
        </div>
        <div className="ct-object-content" data-ct-object-content>
          <p className="ct-eyebrow">Forenklet visningskort</p>
          <h3>10 kroner · 1949 · Litra A</h3>
          <p>Norges Bank · Haakon VII · Norske sedler</p>
          <div className="ct-chip-row" data-ct-chip-row>
            <span>Samling</span>
            <span>Ønskeliste</span>
            <span>Favoritt</span>
            <span>Kjøpspris</span>
          </div>
          <p className="ct-object-value">15 000 kr <span>samling</span></p>
        </div>
      </article>
    </div>
  );
}

export default function CollectiumStartside() {
  return (
    <main className="ct-page ct-page--public ct-page--startside" data-page="startside">
      {startsideSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="ct-section"
          data-section={section.id}
          data-tone={section.tone ?? "light"}
          data-layout={section.layout ?? "split"}
        >
          <div className="ct-section-inner">
            <div className="ct-copy" data-ct-copy>
              {section.eyebrow ? <p className="ct-eyebrow">{section.eyebrow}</p> : null}
              {section.layout === "hero" ? <h1>{section.title}</h1> : <h2>{section.title}</h2>}
              {section.lead ? <p className="ct-lead">{section.lead}</p> : null}
              {section.body ? <p>{section.body}</p> : null}
              <SectionActions actions={section.actions} />
            </div>

            {section.layout === "catalog-preview" ? <CatalogPreview /> : null}
            {section.cards ? <SectionCards cards={section.cards} /> : null}
            {section.image ? (
              <figure className="ct-media" data-ct-media>
                <img src={section.image} alt={section.imageAlt ?? "Collectium illustrasjon"} />
              </figure>
            ) : null}
          </div>
        </section>
      ))}
    </main>
  );
}
