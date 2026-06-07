/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * getMinSideData
 *
 * Definering / formÃ¥l:
 * Server-side datalag for Min side. ForelÃ¸pig fallbackdata, men strukturert etter senere MariaDB/API-kontrakt.
 * React-komponenten skal ikke eie sannhet eller finne opp data.
 *
 * BruksomrÃ¥de:
 * Brukes av app/min-side/page.tsx og app/api/min-side/summary/route.ts.
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - user.dashboard.view
 * - collection.view
 * - dealer.dashboard.view
 * - admin.dashboard.view
 *
 * BerÃ¸rte tabeller / views senere:
 * - ct_users
 * - ct_user_profiles
 * - ct_user_memberships
 * - ct_v_feature_access_resolved
 * - ct_collection_items
 * - ct_collection_transactions
 * - ct_processes
 * - ct_notifications
 * - ct_messages
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Versjon:
 * CT-MINSIDE-DATA-0001 / CHANGE-2026-06-08-0001
 */

import type { MinSideData } from "./min-side-types";

export async function getMinSideData(): Promise<MinSideData> {
  return {
    source: "fallback",
    user: {
      userId: "demo-user-1042",
      name: "Tommy Sandvin",
      email: "tommy@collectium.no",
      roles: ["collector", "dealer", "admin"],
      membership: "Silver",
      membershipStatus: "OK",
      lastLoginLabel: "Sist innlogget: i dag",
    },
    metrics: [
      { key: "membership", label: "Medlemskap", value: "Silver", note: "Flere filter og mer markedsdata", status: "OK" },
      { key: "collection", label: "Min samling", value: "142", note: "Objekter registrert", status: "OK" },
      { key: "value", label: "Estimert verdi", value: "186 000 NOK", note: "0 kr tolkes som manglende verdi", status: "OK" },
      { key: "wishlist", label: "Ã˜nskeliste", value: "22", note: "Hjerte / Ã¸nskeliste", status: "OK" },
      { key: "favorites", label: "Favoritter", value: "14", note: "Stjerne / favoritt", status: "OK" },
      { key: "processes", label: "Prosesser", value: "3", note: "Krever oppfÃ¸lging", status: "VARSEL" },
      { key: "notifications", label: "Varsler", value: "5", note: "Uleste system- og objektvarsler", status: "VARSEL" },
      { key: "messages", label: "Meldinger", value: "2", note: "Uleste meldinger", status: "VARSEL" },
    ],
    processes: [
      {
        id: "proc-001",
        category: "Dokumentasjon",
        title: "Dokumentasjon mangler",
        objectLabel: "1 krone Â· 1917 Â· Litra A",
        status: "Krever handling",
        dueLabel: "Frist: 12.06.2026",
        actionLabel: "Last opp dokumentasjon",
      },
      {
        id: "proc-002",
        category: "Forhandler",
        title: "Auksjonsforslag venter bruker",
        objectLabel: "100 kroner Â· 1877 Â· Standardutgave",
        status: "Venter",
        dueLabel: "Forhandler-fee: 12 %",
        actionLabel: "Se forslag",
      },
      {
        id: "proc-003",
        category: "Betaling",
        title: "OppgjÃ¸r under behandling",
        objectLabel: "2 kroner Â· 1914 Â· Jubileumsutgave",
        status: "Under behandling",
        dueLabel: "OppgjÃ¸r venter",
        actionLabel: "Ã…pne oppgjÃ¸r",
      },
    ],
    transactions: [
      {
        id: "tx-001",
        dateLabel: "07.06.2026",
        objectLabel: "1 krone Â· 1917 Â· Litra A",
        typeLabel: "KjÃ¸p",
        counterpartyLabel: "Privat selger",
        amountLabel: "1 850 NOK",
        status: "OK",
      },
      {
        id: "tx-002",
        dateLabel: "04.06.2026",
        objectLabel: "100 kroner Â· 1877",
        typeLabel: "Bud",
        counterpartyLabel: "Auksjon",
        amountLabel: "12 000 NOK",
        status: "VENTER",
      },
      {
        id: "tx-003",
        dateLabel: "01.06.2026",
        objectLabel: "2 kroner Â· 1914",
        typeLabel: "OppgjÃ¸r",
        counterpartyLabel: "Forhandler",
        amountLabel: "8 400 NOK",
        status: "VARSEL",
      },
    ],
    dealer: {
      enabled: true,
      statusLabel: "Aktiv",
      objectGroupsLabel: "Sedler, Mynter",
      newConsignments: 7,
      pendingReviews: 4,
      readyForAuction: 3,
      activeAuctions: 11,
      shopObjects: 18,
      settlementsWaiting: 2,
    },
    admin: {
      enabled: true,
      systemStatus: "VARSEL",
      usersWaiting: 4,
      dealersWaiting: 2,
      missingRoutes: 1,
      catalogWarnings: 6,
      apiStatus: "OK",
      dbStatus: "OK",
    },
    access: [
      { featureKey: "user.dashboard.view", label: "Min side oversikt", accessState: "allow" },
      { featureKey: "collection.view", label: "Min samling", accessState: "allow" },
      { featureKey: "collection.wishlist.view", label: "Ã˜nskeliste", accessState: "allow" },
      { featureKey: "collection.favorite.view", label: "Favoritter", accessState: "allow" },
      { featureKey: "dealer.dashboard.view", label: "Forhandlerflate", accessState: "allow" },
      { featureKey: "admin.dashboard.view", label: "Adminflate", accessState: "limited", reason: "Teknisk kontroll krever admin/superadmin." },
    ],
  };
}
