/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side types
 *
 * Definering / formÃ¥l:
 * TypeScript-kontrakt for Min side. Holder datafelt og rolleflater samlet slik at React-komponenten
 * ikke finner opp egne datastrukturer lokalt.
 *
 * BruksomrÃ¥de:
 * Brukes av get-min-side-data.ts, API summary route og CollectiumMinSideClient.
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Versjon:
 * CT-MINSIDE-TYPES-0001 / CHANGE-2026-06-08-0001
 */

export type MinSideRole = "user" | "collector" | "dealer" | "admin" | "superadmin";
export type MinSideMembership = "Free" | "Bronze" | "Silver" | "Gold" | "Platinum" | "Admin";
export type MinSideStatus = "OK" | "VARSEL" | "FEIL" | "KRITISK" | "VENTER";

export type MinSideUser = {
  userId: string;
  name: string;
  email: string;
  roles: MinSideRole[];
  membership: MinSideMembership;
  membershipStatus: MinSideStatus;
  lastLoginLabel: string;
};

export type MinSideMetric = {
  key: string;
  label: string;
  value: string;
  note: string;
  status: MinSideStatus;
};

export type MinSideProcess = {
  id: string;
  category: "KjÃ¸p" | "Salg" | "Auksjon" | "Forhandler" | "Dokumentasjon" | "Betaling" | "System";
  title: string;
  objectLabel?: string;
  status: "Utkast" | "Sendt" | "Venter" | "Krever handling" | "Under behandling" | "Godkjent" | "Avvist" | "FullfÃ¸rt" | "Arkivert";
  dueLabel?: string;
  actionLabel?: string;
};

export type MinSideTransaction = {
  id: string;
  dateLabel: string;
  objectLabel: string;
  typeLabel: "KjÃ¸p" | "Salg" | "Bud" | "Auksjonsresultat" | "Betaling" | "OppgjÃ¸r" | "Gebyr";
  counterpartyLabel: string;
  amountLabel: string;
  status: MinSideStatus;
};

export type MinSideDealerSummary = {
  enabled: boolean;
  statusLabel: string;
  objectGroupsLabel: string;
  newConsignments: number;
  pendingReviews: number;
  readyForAuction: number;
  activeAuctions: number;
  shopObjects: number;
  settlementsWaiting: number;
};

export type MinSideAdminSummary = {
  enabled: boolean;
  systemStatus: MinSideStatus;
  usersWaiting: number;
  dealersWaiting: number;
  missingRoutes: number;
  catalogWarnings: number;
  apiStatus: MinSideStatus;
  dbStatus: MinSideStatus;
};

export type MinSideAccessItem = {
  featureKey: string;
  label: string;
  accessState: "allow" | "limited" | "locked" | "hidden" | "deny";
  reason?: string;
};

export type MinSideData = {
  source: "fallback" | "mariadb";
  user: MinSideUser;
  metrics: MinSideMetric[];
  processes: MinSideProcess[];
  transactions: MinSideTransaction[];
  dealer: MinSideDealerSummary;
  admin: MinSideAdminSummary;
  access: MinSideAccessItem[];
};
