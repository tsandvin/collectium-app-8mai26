"use client";

import { useEffect, useState } from "react";

type CollectiumSkin = "collectium" | "enkel" | "museum" | "finans";

const skins: ReadonlyArray<{ key: CollectiumSkin; label: string }> = [
  { key: "collectium", label: "Collectium" },
  { key: "enkel", label: "Enkel" },
  { key: "museum", label: "Museum" },
  { key: "finans", label: "Finans" },
];

const STORAGE_KEY = "collectium-standard-skin";

function isCollectiumSkin(value: string | null): value is CollectiumSkin {
  return value === "collectium" || value === "enkel" || value === "museum" || value === "finans";
}

function applySkin(skin: CollectiumSkin): void {
  document.documentElement.dataset.ctSkin = skin;
  window.localStorage.setItem(STORAGE_KEY, skin);
}

export function CollectiumSkinController(): JSX.Element {
  const [activeSkin, setActiveSkin] = useState<CollectiumSkin>("collectium");

  useEffect(() => {
    const savedSkin = window.localStorage.getItem(STORAGE_KEY);

    if (isCollectiumSkin(savedSkin)) {
      setActiveSkin(savedSkin);
      applySkin(savedSkin);
      return;
    }

    applySkin("collectium");
  }, []);

  return (
    <div className="ct-skin-switch" aria-label="Velg Collectium-skinn">
      {skins.map((skin) => (
        <button
          key={skin.key}
          type="button"
          className={activeSkin === skin.key ? "is-active" : ""}
          onClick={() => {
            setActiveSkin(skin.key);
            applySkin(skin.key);
          }}
        >
          {skin.label}
        </button>
      ))}
    </div>
  );
}
