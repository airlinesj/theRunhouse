import { getDb } from "@/lib/firebase/admin";
import {
  isAuthorizedIngest,
  jsonError,
  jsonOk,
  requireFirebase,
} from "@/lib/firebase/http";
import {
  applyRegistrationUpdate,
  getMarathon,
  getRegistration,
} from "@/lib/marathon/service";
import type { MarathonRegistration, RunSplit } from "@/lib/marathon/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface IngestBody {
  marathonId?: string;
  registrationId?: string;
  userId?: string;
  userName?: string;
  status?: MarathonRegistration["status"];
  bibNumber?: number;
  startedAt?: string;
  completedAt?: string;
  finishTimeSeconds?: number;
  distanceCoveredKm?: number;
  avgPaceMinPerKm?: number;
  currentDistanceKm?: number;
  splits?: RunSplit[];
}

/**
 * POST /api/ingest/marathon
 * Push registration and/or split updates for a marathon.
 *
 * Auth: `Authorization: Bearer <INGEST_API_KEY>`.
 * When `registrationId` is omitted, the athlete is looked up by `userId`.
 * A registration is auto-created if the athlete has not registered yet —
 * useful for live timing chips that report unknown entrants.
 */
export async function POST(request: Request) {
  const guard = requireFirebase();
  if (guard) return guard;

  if (!isAuthorizedIngest(request)) {
    return jsonError("Unauthorized ingest request.", 401);
  }

  let body: IngestBody;
  try {
    body = (await request.json()) as IngestBody;
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }

  const marathonId = body.marathonId?.trim();
  if (!marathonId) return jsonError("marathonId is required.", 400);

  try {
    const marathon = await getMarathon(marathonId);
    if (!marathon) return jsonError("Marathon not found.", 404);

    let registrationId = body.registrationId?.trim() ?? "";

    if (!registrationId && body.userId) {
      const db = getDb();
      const snap = await db
        .collection("marathons")
        .doc(marathonId)
        .collection("registrations")
        .where("userId", "==", body.userId)
        .limit(1)
        .get();
      if (!snap.empty) registrationId = snap.docs[0].id;
    }

    const update: Partial<MarathonRegistration> = {
      status: body.status,
      bibNumber: body.bibNumber,
      startedAt: body.startedAt,
      completedAt: body.completedAt,
      finishTimeSeconds: body.finishTimeSeconds,
      distanceCoveredKm: body.distanceCoveredKm,
      avgPaceMinPerKm: body.avgPaceMinPerKm,
      currentDistanceKm: body.currentDistanceKm,
      splits: body.splits,
    };

    if (!registrationId) {
      if (!body.userId) {
        return jsonError(
          "registrationId or userId is required to locate the athlete.",
          400,
        );
      }
      const created = await getDb()
        .collection("marathons")
        .doc(marathonId)
        .collection("registrations")
        .add({
          marathonId,
          userId: body.userId,
          userName: body.userName ?? "Athlete",
          userEmail: "",
          status: body.status ?? "registered",
          bibNumber: body.bibNumber ?? null,
          participationMode: "in-person",
          splits: body.splits ?? [],
          createdAt: new Date(),
          liveUpdatedAt: new Date(),
        });
      registrationId = created.id;
    } else {
      await applyRegistrationUpdate(marathonId, registrationId, update);
    }

    const registration = await getRegistration(marathonId, registrationId);
    return jsonOk(registration);
  } catch (error) {
    console.error("[api/ingest/marathon] failed", error);
    return jsonError("Failed to ingest marathon data.", 500);
  }
}
