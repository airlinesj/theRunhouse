import {
  jsonError,
  jsonOk,
  requireFirebase,
} from "@/lib/firebase/http";
import { listMarathons } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/marathons
 * All marathon events created in the ABX Motion app, newest first.
 * Query: ?status=upcoming|ongoing|completed|cancelled  ?type=live|virtual
 */
export async function GET(request: Request) {
  const guard = requireFirebase();
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    let marathons = await listMarathons();
    if (status) {
      marathons = marathons.filter((m) => m.effectiveStatus === status);
    }
    if (type) {
      marathons = marathons.filter((m) => m.type === type);
    }

    return jsonOk(marathons);
  } catch (error) {
    console.error("[api/marathons] failed", error);
    return jsonError("Failed to load marathons.", 500);
  }
}
