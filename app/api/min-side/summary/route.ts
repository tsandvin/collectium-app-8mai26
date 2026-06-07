/**
 * COLLECTIUM FILE HEADER
 *
 * Overskrift:
 * Min side API summary route
 *
 * Definering / formÃ¥l:
 * API-rute for Ã¥ hente samlet Min side-status. ForelÃ¸pig bruker den kontrollert fallbackdata
 * via getMinSideData(), men kontrakten er klar for MariaDB/API-kobling.
 *
 * BruksomrÃ¥de:
 * Brukes av /min-side for dashboard, faner, prosesser, varsler og rollebaserte moduler.
 *
 * BerÃ¸rte sider / routes:
 * - /min-side
 * - /api/min-side/summary
 *
 * BerÃ¸rte DB-brytere / feature_keys:
 * - user.dashboard.view
 *
 * BerÃ¸rte API-ruter:
 * - GET /api/min-side/summary
 *
 * Dataretning:
 * MariaDB â†’ API/backend â†’ Next.js â†’ React â†’ UI
 *
 * Logging:
 * log_category: user
 * log_action: min_side.summary
 *
 * Versjon:
 * CT-MINSIDE-API-0001 / CHANGE-2026-06-08-0001
 */

import { NextResponse } from "next/server";
import { getMinSideData } from "@/lib/min-side/get-min-side-data";

export async function GET() {
  try {
    const data = await getMinSideData();

    return NextResponse.json({
      ok: true,
      page_key: "next.min_side",
      feature_key: "user.dashboard.view",
      source: data.source,
      data,
      access: {
        allowed: true,
        reason: null,
      },
      meta: {
        read_view: "ct_v_user_dashboard_resolved",
        generated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        page_key: "next.min_side",
        feature_key: "user.dashboard.view",
        source: "api",
        error: error instanceof Error ? error.message : "Ukjent feil",
      },
      { status: 500 },
    );
  }
}
