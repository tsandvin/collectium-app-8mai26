"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * TemplateTemaControl
 *
 * Definering / formål:
 * Frontend-kontroll for Collectium Tema.
 * Erstatter forvirrende skille mellom Design og Skin.
 *
 * Bruksområde:
 * Brukes i global toppmeny/template for å bytte mellom fire låste tema:
 * - Collectium lys
 * - Enkel lys
 * - Collectium mørk
 * - Enkel mørk
 *
 * Berørte sider / routes:
 * - alle sider som bruker global toppmeny
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.theme.switch
 *
 * Berørte API-ruter:
 * - ingen
 *
 * Berørte tabeller / views:
 * - ingen
 *
 * Dataretning:
 * localStorage -> document data-skin -> CSS variabler -> UI
 *
 * Logging:
 * ingen DB-logging
 *
 * Versjon:
 * CT-FILE-TEMPLATE-TEMA-CONTROL-0001
 */

import { useEffect, useState } from "react";
import {
  COLLECTIUM_TEMA_DEFAULT,
  COLLECTIUM_TEMA_OPTIONS,
  type CollectiumTemaKey
} from "./template-skins";

const STORAGE_KEY = "collectium-tema";

function isTemaKey(value: string | null): value is CollectiumTemaKey {
  return COLLECTIUM_TEMA_OPTIONS.some((option) => option.key === value);
}

function applyTema(value: CollectiumTemaKey) {
  if (typeof document === "undefined") return;

  const option = COLLECTIUM_TEMA_OPTIONS.find((item) => item.key === value);
  const root = document.documentElement;

  root.dataset.skin = value;
  root.dataset.theme = value;

  if (option) {
    root.dataset.themeMode = option.mode;
    root.dataset.themeFamily = option.family;
  }

  const templateRoot = document.querySelector<HTMLElement>(".ct-template-root");
  if (templateRoot) {
    templateRoot.dataset.skin = value;
    templateRoot.dataset.theme = value;
  }
}

export function TemplateTemaControl() {
  const [tema, setTema] = useState<CollectiumTemaKey>(COLLECTIUM_TEMA_DEFAULT);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const nextTema = isTemaKey(stored) ? stored : COLLECTIUM_TEMA_DEFAULT;

    setTema(nextTema);
    applyTema(nextTema);
  }, []);

  function handleChange(value: CollectiumTemaKey) {
    setTema(value);
    window.localStorage.setItem(STORAGE_KEY, value);
    applyTema(value);
  }

  return (
    <label className="ct-tema-control">
      <span>Tema</span>
      <select
        value={tema}
        aria-label="Velg tema"
        onChange={(event) => handleChange(event.target.value as CollectiumTemaKey)}
      >
        {COLLECTIUM_TEMA_OPTIONS.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
