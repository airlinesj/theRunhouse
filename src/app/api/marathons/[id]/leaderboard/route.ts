import { jsonError, jsonOk, requireFirebase } from "@/lib/firebase/http";
import { getLeaderboard } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/marathons/[id]/leaderboard
 * Ranked results: finishers (fastest first), then runners still on course
 * ordered by distance covered.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = requireFirebase();
  if (guard) return guard;

  const { id } = await params;
  try {
    return jsonOk(await getLeaderboard(id));
  } catch (error) {
    console.error(`[api/marathons/${id}/leaderboard] failed`, error);
    return jsonError("Failed to load leaderboard.", 500);
  }
}
