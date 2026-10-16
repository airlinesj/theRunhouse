import { getDb } from "@/lib/firebase/admin";
import {
  isAuthorizedIngest,
  jsonError,
  jsonOk,
  requireFirebase,
} from "@/lib/firebase/http";
import { getPublicRun } from "@/lib/marathon/service";
import type { RunSplit } from "@/lib/marathon/types";
import { emitEvent } from "@/lib/webhooks/dispatch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface IngestRunBody {
  runId?: string;
  userId?: string;
  displayName?: string;
  photoUrl?: string | null;
  activityType?: string;
  distanceMeters?: number;
  durationMs?: number;
  avgPaceSecsPerKm?: number;
  calories?: number;
  startedAt?: string;
  endedAt?: string;
  splits?: RunSplit[];
}

/**
 * POST /api/ingest/run
 * Upsert a public community run (with splits). The app writes these to
 * Firestore directly; this endpoint exists so external tooling or a manual
 * backfill can push the same shape.
 *
 * Auth: `Authorization: Bearer <INGEST_API_KEY>`.
 */
export async function POST(request: Request) {
  const guard = requireFirebase();
  if (guard) return guard;

  if (!isAuthorizedIngest(request)) {
    return jsonError("Unauthorized ingest request.", 401);
  }

  let body: IngestRunBody;
  try {
    body = (await request.json()) as IngestRunBody;
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }

  if (!body.runId) return jsonError("runId is required.", 400);
  if (!body.userId) return jsonError("userId is required.", 400);

  try {
    await getDb()
      .collection("public_runs")
      .doc(body.runId)
      .set(
        {
          userId: body.userId,
          displayName: body.displayName ?? "Runner",
          photoUrl: body.photoUrl ?? null,
          activityType: body.activityType ?? "running",
          distanceMeters: body.distanceMeters ?? 0,
          durationMs: body.durationMs ?? 0,
          avgPaceSecsPerKm: body.avgPaceSecsPerKm ?? 0,
          calories: body.calories ?? 0,
          startedAt: body.startedAt ? new Date(body.startedAt) : new Date(),
          endedAt: body.endedAt ? new Date(body.endedAt) : new Date(),
          splits: body.splits ?? [],
          source: "ingest",
          updatedAt: new Date(),
        },
        { merge: true },
      );

    const run = await getPublicRun(body.runId);
    await emitEvent("run.public.updated", {
      runId: body.runId,
      userId: body.userId,
      distanceMeters: body.distanceMeters ?? 0,
    });
    return jsonOk(run);
  } catch (error) {
    console.error("[api/ingest/run] failed", error);
    return jsonError("Failed to ingest run.", 500);
  }
}
