import { jsonError, jsonOk, requireFirebase } from "@/lib/firebase/http";
import { listRegistrations } from "@/lib/marathon/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/marathons/[id]/registrations
 * Every registration for an event, public-safe fields only (no email).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = requireFirebase();
  if (guard) return guard;

  const { id } = await params;
  try {
    const registrations = await listRegistrations(id);
    return jsonOk(
      registrations.map(({ userId, userName, bibNumber, status, participationMode, createdAt }) => ({
        userId,
        userName,
        bibNumber,
        status,
        participationMode,
        createdAt,
      })),
    );
  } catch (error) {
    console.error(`[api/marathons/${id}/registrations] failed`, error);
    return jsonError("Failed to load registrations.", 500);
  }
}
