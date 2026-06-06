"use client";

import { useEffect, useState } from "react";

type Skin = "collectium" | "enkel" | "museum" | "finans";

const skins: ReadonlyArray<{ key: Skin; label: string }> = [
  { key: "collectium", label: "Collectium" },
  { key: "enkel", label: "Enkel" },
  { key: "museum", label: "Museum" },
  { key: "finans", label: "Finans" },
];

const STORAGE_KEY = "ct-clean-skin-v1";

function isSkin(value: string | null): value is Skin {
  return value === "collectium" || value === "enkel" || value === "museum" || value === "finans";
}

function setDocumentSkin(skin: Skin): void {
  document.documentElement.dataset.ctSkin = skin;
  window.localStorage.setItem(STORAGE_KEY, skin);
}

export function CollectiumSkinController(): JSX.Element {
  const [active, setActive] = useState<Skin>("collectium");

  useEffect(() => {
    window.localStorage.removeItem("collectium-standard-skin");
    window.localStorage.removeItem("collectium-active-skin");

    const saved = window.localStorage.getItem(STORAGE_KEY);
    const skin = isSkin(saved) ? saved : "collectium";

    setActive(skin);
    setDocumentSkin(skin);
  }, []);

  return (
    <div className="ct-skins" aria-label="Velg skinn">
      {skins.map((skin) => (
        <button
          key={skin.key}
          type="button"
          className={active === skin.key ? "is-active" : ""}
          onClick={() => {
            setActive(skin.key);
            setDocumentSkin(skin.key);
          }}
        >
          {skin.label}
        </button>
      ))}
    </div>
  );
}
