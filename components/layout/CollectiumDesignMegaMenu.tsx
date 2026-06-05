"use client";

/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Collectium Design Mega Menu
 *
 * Definering / formal:
 * Global design-megameny for public toppmeny. Denne er en templatekontroll,
 * ikke en sidefunksjon. Farger/skin hentes fra global designmotor.
 *
 * Bruksomrade:
 * Brukes av CollectiumPublicTopbar.
 *
 * Berorte DB-brytere / feature_keys:
 * - local.template.view
 *
 * Berorte API-ruter:
 * - Ingen.
 *
 * Berorte tabeller / views:
 * - Ingen.
 *
 * Logging:
 * log_category: template
 * log_action: design_menu.open
 *
 * Versjon:
 * CT-DESIGN-MEGA-MENU-V8 / CHANGE-2026-06-05-STARTSIDE-FILES-V8
 */

import styles from "./CollectiumDesignMegaMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

const skins = [
  { key: "collectium", title: "Collectium", note: "Signature · pergament, navy og gull." },
  { key: "enkel", title: "Enkel / blå", note: "Minimal · skandinavisk blå." },
  { key: "museum", title: "Museum", note: "Mørk galleri- og arkivfølelse." },
  { key: "finans", title: "Finans", note: "Marked og analyse. Farge hentes globalt." },
];

export function CollectiumDesignMegaMenu({ open, onClose }: Props) {
  return (
    <div id="collectium-design-mega" className={`${styles.mega} ${open ? styles.open : ""}`}>
      <div className={styles.head}>
        <div>
          <p>Design</p>
          <h2>Template og visningsmodus</h2>
        </div>
        <button type="button" onClick={onClose}>Lukk</button>
      </div>

      <div className={styles.body}>
        <section>
          <h3>Skinn / template</h3>
          <div className={styles.skinGrid}>
            {skins.map((skin) => (
              <button key={skin.key} type="button" className={styles.skinCard} data-template-key={skin.key}>
                <span className={styles.swatch} aria-hidden="true" />
                <strong>{skin.title}</strong>
                <small>{skin.note}</small>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3>Skjerm</h3>
          <div className={styles.modeGrid}>
            <button type="button">Mobil</button>
            <button type="button">Nettbrett</button>
            <button type="button" data-active="true">PC</button>
            <button type="button">Bredskjerm</button>
            <button type="button">TV 40+</button>
          </div>
          <p>Responsivitet og endelig fargebruk skal styres av global template/designmotor.</p>
        </section>

        <section>
          <h3>Regel</h3>
          <p>Startsiden skal ikke eie skinn eller farger. Denne menyen viser bare globale valg og plassering i toppmenyen.</p>
          <button type="button" onClick={onClose}>Tilbakestill / lukk</button>
        </section>
      </div>
    </div>
  );
}
