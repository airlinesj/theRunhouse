import { jsonError, jsonOk, requireFirebase } from "@/lib/firebase/http";
import { getLiveRegistrations } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/marathons/[id]/live
 * Live progress feed for an in-progress event: runners with their latest
 * splits, newest activity first. Poll this from the website (or swap in a
 * streamed endpoint) while the race is running.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = requireFirebase();
  if (guard) return guard;

  const { id } = await params;
  try {
    const live = await getLiveRegistrations(id);
    return jsonOk(
      live.map((r) => ({
        registrationId: r.id,
        userId: r.userId,
        userName: r.userName,
        bibNumber: r.bibNumber,
        status: r.status,
        currentDistanceKm: r.currentDistanceKm ?? 0,
        lastSplitAt: r.lastSplitAt,
        splits: r.splits,
      })),
    );
  } catch (error) {
    console.error(`[api/marathons/${id}/live] failed`, error);
    return jsonError("Failed to load live progress.", 500);
  }
}
