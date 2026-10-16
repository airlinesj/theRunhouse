import { jsonError, jsonOk, requireFirebase } from "@/lib/firebase/http";
import { getPublicRun } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** GET /api/runs/[id] — a single community run, including its splits. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = requireFirebase();
  if (guard) return guard;

  const { id } = await params;
  try {
    const run = await getPublicRun(id);
    if (!run) return jsonError("Run not found.", 404);
    return jsonOk(run);
  } catch (error) {
    console.error(`[api/runs/${id}] failed`, error);
    return jsonError("Failed to load run.", 500);
  }
}
