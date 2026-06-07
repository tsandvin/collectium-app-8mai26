"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumDesignControls
 *
 * Definering / formål:
 * Kompakt global kontroll for template, skin, skjermmodus og skriftstørrelse.
 *
 * Bruksområde:
 * Brukes i PublicShell/topbar. Kan senere brukes i app-topbar.
 *
 * Berørte DB-brytere / feature_keys:
 * - template.skin.switch
 * - template.viewport.switch
 * - template.font.switch
 *
 * Versjon:
 * CT-DESIGN-CONTROLS-8.5-0002
 */

import { useEffect, useState } from "react";
import styles from "./CollectiumDesignControls.module.css";

type TemplateName = "collectium" | "enkel" | "museum" | "finans";
type SkinName = "signature-light" | "signature-dark" | "minimal-light" | "minimal-dark";
type ViewportName = "mobile" | "tablet" | "pc" | "wide" | "tv";
type FontName = "compact" | "normal" | "large" | "presentation";

const TEMPLATE_KEY = "collectium-ui-template";
const SKIN_KEY = "collectium-ui-skin";
const VP_KEY = "collectium-ui-vp";
const FONT_KEY = "collectium-ui-font";

const templates: Array<{ value: TemplateName; label: string }> = [
  { value: "collectium", label: "Collectium" },
  { value: "enkel", label: "Enkel" },
  { value: "museum", label: "Museum" },
  { value: "finans", label: "Finans" },
];

const skins: Array<{ value: SkinName; label: string }> = [
  { value: "signature-light", label: "Lys" },
  { value: "signature-dark", label: "Mørk" },
  { value: "minimal-light", label: "Minimal lys" },
  { value: "minimal-dark", label: "Minimal mørk" },
];

const viewports: Array<{ value: ViewportName; label: string }> = [
  { value: "mobile", label: "Mobil" },
  { value: "tablet", label: "Tablet" },
  { value: "pc", label: "PC" },
  { value: "wide", label: "Bred" },
  { value: "tv", label: "TV" },
];

const fonts: Array<{ value: FontName; label: string }> = [
  { value: "compact", label: "Kompakt" },
  { value: "normal", label: "Normal" },
  { value: "large", label: "Stor" },
  { value: "presentation", label: "TV" },
];

function readValue<T extends string>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  return (value || fallback) as T;
}

function applyCollectiumUi(template: TemplateName, skin: SkinName, vp: ViewportName, font: FontName) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.dataset.template = template;
  root.dataset.skin = skin;
  root.dataset.vp = vp;
  root.dataset.font = font;

  window.localStorage.setItem(TEMPLATE_KEY, template);
  window.localStorage.setItem(SKIN_KEY, skin);
  window.localStorage.setItem(VP_KEY, vp);
  window.localStorage.setItem(FONT_KEY, font);
}

export default function CollectiumDesignControls() {
  const [template, setTemplate] = useState<TemplateName>("collectium");
  const [skin, setSkin] = useState<SkinName>("signature-light");
  const [vp, setVp] = useState<ViewportName>("pc");
  const [font, setFont] = useState<FontName>("normal");

  useEffect(() => {
    const nextTemplate = readValue<TemplateName>(TEMPLATE_KEY, "collectium");
    const nextSkin = readValue<SkinName>(SKIN_KEY, "signature-light");
    const nextVp = readValue<ViewportName>(VP_KEY, "pc");
    const nextFont = readValue<FontName>(FONT_KEY, "normal");

    setTemplate(nextTemplate);
    setSkin(nextSkin);
    setVp(nextVp);
    setFont(nextFont);

    applyCollectiumUi(nextTemplate, nextSkin, nextVp, nextFont);
  }, []);

  function updateTemplate(value: TemplateName) {
    setTemplate(value);
    applyCollectiumUi(value, skin, vp, font);
  }

  function updateSkin(value: SkinName) {
    setSkin(value);
    applyCollectiumUi(template, value, vp, font);
  }

  function updateVp(value: ViewportName) {
    setVp(value);
    applyCollectiumUi(template, skin, value, font);
  }

  function updateFont(value: FontName) {
    setFont(value);
    applyCollectiumUi(template, skin, vp, value);
  }

  return (
    <div className={styles.controls} aria-label="Collectium visningskontroller">
      <label className={styles.pill}>
        <span>Design</span>
        <select value={template} onChange={(event) => updateTemplate(event.target.value as TemplateName)}>
          {templates.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>

      <label className={styles.pill}>
        <span>Skin</span>
        <select value={skin} onChange={(event) => updateSkin(event.target.value as SkinName)}>
          {skins.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>

      <label className={styles.pill}>
        <span>Skjerm</span>
        <select value={vp} onChange={(event) => updateVp(event.target.value as ViewportName)}>
          {viewports.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>

      <label className={styles.pill}>
        <span>Skrift</span>
        <select value={font} onChange={(event) => updateFont(event.target.value as FontName)}>
          {fonts.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
