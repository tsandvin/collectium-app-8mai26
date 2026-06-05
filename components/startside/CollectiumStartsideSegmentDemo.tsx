"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Startside Segment Demo
 *
 * Definering / formal:
 * Interaktiv public demo av katalogens tre segmenter Samler, Historie og Finans.
 * Komponenten viser bare statisk presentasjonsinnhold. Den skriver ikke til DB og eier ikke design.
 *
 * Bruksomrade:
 * Brukes i CollectiumStartside.tsx i katalogseksjonen.
 *
 * Berorte sider / routes:
 * - /startside
 *
 * Berorte DB-brytere / feature_keys:
 * - catalog.view
 * - catalog.history.view
 * - catalog.market.view
 *
 * Berorte API-ruter:
 * - Ingen direkte API-kall i denne demoen.
 *
 * Berorte tabeller / views:
 * - Ingen direkte tabell/view i denne demoen.
 *
 * Dataretning:
 * Statisk public demo -> React -> UI.
 *
 * Logging:
 * log_category: landing
 * log_action: catalog_segment_demo.view
 *
 * Versjon:
 * CT-STARTSIDE-SEGMENT-DEMO-V8 / CHANGE-2026-06-05-STARTSIDE-FILES-V8
 */

import { useState } from "react";

type SegmentKey = "samler" | "historie" | "finans";

const segmentContent: Record<SegmentKey, { title: string; tags: string[]; value: string; note: string }> = {
  samler: {
    title: "10 kroner · 1949 · Litra A",
    tags: ["NSNR 23a", "Hjerte", "Stjerne", "Min samling", "Kjøpspris"],
    value: "15 000 kr · samling",
    note: "Samler-visningen viser brukerens forhold til objektet.",
  },
  historie: {
    title: "10 kroner · Haakon VII · 1949",
    tags: ["Norges Bank", "Haakon VII", "Signatur", "Seddelpapir", "Relasjoner"],
    value: "Historisk kontekst",
    note: "Historie-visningen viser utgave, regent, signaturer og relasjoner.",
  },
  finans: {
    title: "10 kroner · markedsutvikling",
    tags: ["Markedsverdi", "Trend", "Auksjon", "Likviditet", "Prisobservasjoner"],
    value: "Trend og utvikling",
    note: "Finans-visningen viser verdi, trend og markedsutvikling. Fargebruk hentes fra global template.",
  },
};

export function CollectiumStartsideSegmentDemo() {
  const [activeSegment, setActiveSegment] = useState<SegmentKey>("samler");
  const content = segmentContent[activeSegment];

  return (
    <div className="ct-object-preview" data-ct-object-preview>
      <div className="ct-segment-switch" role="tablist" aria-label="Katalogsegmenter">
        {(Object.keys(segmentContent) as SegmentKey[]).map((segment) => (
          <button
            key={segment}
            type="button"
            role="tab"
            aria-selected={activeSegment === segment}
            onClick={() => setActiveSegment(segment)}
          >
            {segment === "samler" ? "Samler" : segment === "historie" ? "Historie" : "Finans"}
          </button>
        ))}
      </div>

      <article className="ct-object-card" data-segment={activeSegment}>
        <div className="ct-object-media">
          <img src="/collectium-tema/collectium-tema-logo-c.png" alt="Collectium merke" />
          <span>Sedler</span>
        </div>
        <div>
          <p className="ct-eyebrow">Forenklet visningskort</p>
          <h3>{content.title}</h3>
          <p className="ct-body">Norges Bank · Haakon VII · Norske sedler</p>
          <div className="ct-tags">
            {content.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="ct-value">{content.value}</div>
          <p className="ct-body">{content.note}</p>
        </div>
      </article>
    </div>
  );
}
