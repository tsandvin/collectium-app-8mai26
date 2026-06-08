/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * CollectiumTopbar
 *
 * Definering / formål:
 * Global toppmeny for Collectium Next.js/React. Brukes på startside uten sidebar,
 * men er laget som gjenbrukbar topbar for alle sider.
 *
 * Bruksområde:
 * - /startside
 * - senere globalt template-/layout-lag
 *
 * Berørte sider / routes:
 * - /startside
 *
 * Berørte DB-brytere / feature_keys:
 * - local.template.skin.switch
 * - local.template.search.open
 * - auth.login.open
 * - auth.register.open
 *
 * Berørte API-ruter:
 * - Ingen i denne filen. Dette er lokal template-/UI-kontroll.
 *
 * Berørte tabeller / views:
 * - Ingen.
 *
 * Dataretning:
 * Lokal UI-state → React → UI
 *
 * Logging:
 * Ingen serverlogging i v1.
 *
 * Versjon:
 * CT-FILE-STARTSIDE-V47-0001
 *
 * Endringsregel:
 * Topbar er egen komponent. Ikke bygg lokal topbar direkte i sidefil.
 */

'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './CollectiumTopbar.module.css'

export type CollectiumSkin = 'collectium' | 'enkel' | 'museum' | 'finans'
export type CollectiumFontSize = 'kompakt' | 'normal' | 'stor'
export type CollectiumScreenSize = 'normal' | 'bred' | 'presentasjon'

export type CollectiumDesignState = {
  skin: CollectiumSkin
  fontSize: CollectiumFontSize
  screenSize: CollectiumScreenSize
}

type CollectiumTopbarProps = {
  onDesignChange?: (state: CollectiumDesignState) => void
}

const skins: Array<{ id: CollectiumSkin; label: string; note: string }> = [
  { id: 'collectium', label: 'Collectium', note: 'Signatur / arkiv' },
  { id: 'enkel', label: 'Enkel', note: 'Ren blå/hvit' },
  { id: 'museum', label: 'Museum', note: 'Historie / galleri' },
  { id: 'finans', label: 'Finans', note: 'Marked / indeks' },
]

const fontSizes: Array<{ id: CollectiumFontSize; label: string }> = [
  { id: 'kompakt', label: 'Kompakt' },
  { id: 'normal', label: 'Normal' },
  { id: 'stor', label: 'Stor' },
]

const screenSizes: Array<{ id: CollectiumScreenSize; label: string }> = [
  { id: 'normal', label: 'Normal' },
  { id: 'bred', label: 'Bred skjerm' },
  { id: 'presentasjon', label: 'Presentasjon' },
]

export default function CollectiumTopbar({ onDesignChange }: CollectiumTopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [skin, setSkin] = useState<CollectiumSkin>('collectium')
  const [fontSize, setFontSize] = useState<CollectiumFontSize>('normal')
  const [screenSize, setScreenSize] = useState<CollectiumScreenSize>('normal')

  const designState = useMemo(
    () => ({ skin, fontSize, screenSize }),
    [skin, fontSize, screenSize]
  )

  useEffect(() => {
    onDesignChange?.(designState)

    document.documentElement.dataset.ctSkin = skin
    document.documentElement.dataset.ctFont = fontSize
    document.documentElement.dataset.ctScreen = screenSize
  }, [designState, fontSize, onDesignChange, screenSize, skin])

  return (
    <header className={styles.topbar} data-skin={skin}>
      <div className={styles.left}>
        <a className={styles.logo} href="/startside" aria-label="Collectium startside">
          <span className={styles.logoMark}>C</span>
          <span className={styles.logoText}>Collectium</span>
        </a>

        <nav className={styles.nav} aria-label="Innhold på startsiden">
          <a href="#intro">Start</a>
          <a href="#katalog">Katalog</a>
          <a href="#historie">Historie</a>
          <a href="#finans">Finans</a>
          <a href="#medlemskap">Medlemskap</a>
        </nav>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchWrap} data-open={searchOpen ? 'true' : 'false'}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setSearchOpen((value) => !value)}
            aria-expanded={searchOpen}
            aria-controls="collectium-topbar-search"
          >
            Søk
          </button>

          {searchOpen ? (
            <label className={styles.searchLabel} htmlFor="collectium-topbar-search">
              <span>Søk i Collectium</span>
              <input
                id="collectium-topbar-search"
                type="search"
                placeholder="Søk etter seddel, mynt, konge, år eller kilde"
              />
            </label>
          ) : null}
        </div>

        <div className={styles.themeWrap}>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
          >
            Tema
          </button>

          {menuOpen ? (
            <div className={styles.themeMenu} role="dialog" aria-label="Tema og visning">
              <div className={styles.menuBlock}>
                <strong>4 låste tema</strong>
                <div className={styles.skinGrid}>
                  {skins.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={skin === item.id ? styles.activeChoice : styles.choice}
                      onClick={() => setSkin(item.id)}
                    >
                      <span>{item.label}</span>
                      <small>{item.note}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.menuBlock}>
                <strong>Skrift</strong>
                <div className={styles.inlineChoices}>
                  {fontSizes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={fontSize === item.id ? styles.activePill : styles.pill}
                      onClick={() => setFontSize(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.menuBlock}>
                <strong>Skjermstørrelse</strong>
                <div className={styles.inlineChoices}>
                  {screenSizes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={screenSize === item.id ? styles.activePill : styles.pill}
                      onClick={() => setScreenSize(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <a className={styles.loginButton} href="/login">
          Logg inn
        </a>

        <a className={styles.registerButton} href="/registrering">
          Registrer deg
        </a>
      </div>
    </header>
  )
}
