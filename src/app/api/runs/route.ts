import { jsonError, jsonOk, requireFirebase } from "@/lib/firebase/http";
import { listPublicRuns } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/runs
 * Community runs from every athlete who shares activity publicly.
 * Query: ?limit=50  ?activityType=running
 */
export async function GET(request: Request) {
  const guard = requireFirebase();
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const limitParam = Number(searchParams.get("limit"));
    const runs = await listPublicRuns({
      limit: Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined,
      activityType: searchParams.get("activityType") ?? undefined,
    });
    return jsonOk(runs);
  } catch (error) {
    console.error("[api/runs] failed", error);
    return jsonError("Failed to load runs.", 500);
  }
}
