import { jsonError, jsonOk, requireFirebase } from "@/lib/firebase/http";
import { getMarathon } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** GET /api/marathons/[id] — a single event with live registration count. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = requireFirebase();
  if (guard) return guard;

  const { id } = await params;
  try {
    const marathon = await getMarathon(id);
    if (!marathon) return jsonError("Marathon not found.", 404);
    return jsonOk(marathon);
  } catch (error) {
    console.error(`[api/marathons/${id}] failed`, error);
    return jsonError("Failed to load marathon.", 500);
  }
}
