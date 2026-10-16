import "server-only";

import type { Query, Timestamp } from "firebase-admin/firestore";

import { getDb } from "@/lib/firebase/admin";
import type {
  LeaderboardEntry,
  MarathonEvent,
  MarathonRegistration,
  MarathonStatus,
  MarathonType,
  ParticipationMode,
  PublicRun,
  RegistrationStatus,
  RunSplit,
} from "./types";

const MARATHONS = "marathons";
const REGISTRATIONS = "registrations";
const PUBLIC_RUNS = "public_runs";

function toIso(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate().toISOString();
  }
  return null;
}

function num(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function numOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parseSplits(raw: unknown): RunSplit[] {
  if (!Array.isArray(raw)) return [];
  const splits: RunSplit[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const s = entry as Record<string, unknown>;
    const km = num(s.km, splits.length + 1);
    const splitSeconds = num(s.splitSeconds, 0);
    const elapsedSeconds = num(s.elapsedSeconds, 0);
    splits.push({
      km,
      splitSeconds,
      elapsedSeconds,
      paceSecPerKm: num(s.paceSecPerKm, splitSeconds),
    });
  }
  return splits.sort((a, b) => a.km - b.km);
}

/**
 * Mirror of `MarathonEvent.effectiveStatus` in the app: the stored `status`
 * is never mutated after creation, so derive from the clock.
 */
function effectiveStatus(
  stored: MarathonStatus,
  startDate: string | null,
): MarathonStatus {
  if (stored === "cancelled") return "cancelled";
  const now = Date.now();
  const start = startDate ? Date.parse(startDate) : NaN;
  if (Number.isNaN(start)) return stored;
  // Worst-case full-day window, matching the app's `estimatedEndDate`.
  const end = start + 24 * 60 * 60 * 1000;
  if (now > end) return "completed";
  if (now >= start) return "ongoing";
  return "upcoming";
}

function mapMarathon(id: string, data: Record<string, unknown>): MarathonEvent {
  const type = (data.type as MarathonType) ?? "live";
  const status = (data.status as MarathonStatus) ?? "upcoming";
  const distanceKm = num(data.distanceKm);
  const startDate = toIso(data.startDate);
  return {
    id,
    title: (data.title as string) ?? "Untitled event",
    description: (data.description as string) ?? "",
    location: (data.location as string) ?? "",
    type,
    distanceKm,
    startDate,
    registrationStartDate: toIso(data.registrationStartDate),
    registrationEndDate: toIso(data.registrationEndDate),
    maxParticipants: num(data.maxParticipants),
    registrationCount: num(data.registrationCount),
    price: num(data.price),
    imageUrl: (data.imageUrl as string) ?? null,
    routeMapUrl: (data.routeMapUrl as string) ?? null,
    status,
    effectiveStatus: effectiveStatus(status, startDate),
  };
}

function mapRegistration(
  id: string,
  marathonId: string,
  data: Record<string, unknown>,
): MarathonRegistration {
  return {
    id,
    marathonId,
    userId: (data.userId as string) ?? "",
    userName: (data.userName as string) ?? "Athlete",
    bibNumber: numOrNull(data.bibNumber),
    status: (data.status as RegistrationStatus) ?? "registered",
    startedAt: toIso(data.startedAt),
    completedAt: toIso(data.completedAt),
    finishTimeSeconds: numOrNull(data.finishTimeSeconds),
    distanceCoveredKm: numOrNull(data.distanceCoveredKm),
    avgPaceMinPerKm: numOrNull(data.avgPaceMinPerKm),
    participationMode: (data.participationMode as ParticipationMode) ?? "in-person",
    currentDistanceKm: numOrNull(data.currentDistanceKm),
    lastSplitAt: toIso(data.lastSplitAt),
    splits: parseSplits(data.splits),
    createdAt: toIso(data.createdAt),
  };
}

function mapPublicRun(id: string, data: Record<string, unknown>): PublicRun {
  return {
    id,
    userId: (data.userId as string) ?? "",
    displayName: (data.displayName as string) ?? "Runner",
    photoUrl: (data.photoUrl as string) ?? null,
    activityType: (data.activityType as string) ?? "running",
    distanceMeters: num(data.distanceMeters),
    durationMs: num(data.durationMs),
    avgPaceSecsPerKm: num(data.avgPaceSecsPerKm),
    calories: num(data.calories),
    startedAt: toIso(data.startedAt),
    endedAt: toIso(data.endedAt),
    splits: parseSplits(data.splits),
  };
}

export async function listMarathons(): Promise<MarathonEvent[]> {
  const snap = await getDb().collection(MARATHONS).orderBy("startDate", "asc").get();
  return snap.docs.map((d) => mapMarathon(d.id, d.data()));
}

export async function getMarathon(id: string): Promise<MarathonEvent | null> {
  const doc = await getDb().collection(MARATHONS).doc(id).get();
  if (!doc.exists) return null;
  return mapMarathon(doc.id, doc.data() ?? {});
}

export async function listRegistrations(
  marathonId: string,
): Promise<MarathonRegistration[]> {
  const snap = await getDb()
    .collection(MARATHONS)
    .doc(marathonId)
    .collection(REGISTRATIONS)
    .orderBy("createdAt", "asc")
    .get();
  return snap.docs.map((d) => mapRegistration(d.id, marathonId, d.data()));
}

export async function getRegistration(
  marathonId: string,
  registrationId: string,
): Promise<MarathonRegistration | null> {
  const doc = await getDb()
    .collection(MARATHONS)
    .doc(marathonId)
    .collection(REGISTRATIONS)
    .doc(registrationId)
    .get();
  if (!doc.exists) return null;
  return mapRegistration(doc.id, marathonId, doc.data() ?? {});
}

/**
 * Ranked leaderboard: finished runners first (fastest first), then runners
 * still on course ordered by distance covered.
 */
export async function getLeaderboard(
  marathonId: string,
): Promise<LeaderboardEntry[]> {
  const registrations = await listRegistrations(marathonId);
  const active = registrations.filter((r) => r.status !== "withdrew");

  const sorted = [...active].sort((a, b) => {
    const aDone = a.finishTimeSeconds != null;
    const bDone = b.finishTimeSeconds != null;
    if (aDone && bDone) {
      return (a.finishTimeSeconds as number) - (b.finishTimeSeconds as number);
    }
    if (aDone) return -1;
    if (bDone) return 1;
    const aDist = a.distanceCoveredKm ?? a.currentDistanceKm ?? 0;
    const bDist = b.distanceCoveredKm ?? b.currentDistanceKm ?? 0;
    return bDist - aDist;
  });

  return sorted.map((r, index) => {
    const completed = r.finishTimeSeconds != null;
    return {
      rank: index + 1,
      registrationId: r.id,
      userId: r.userId,
      userName: r.userName,
      bibNumber: r.bibNumber,
      status: r.status,
      finishTimeSeconds: r.finishTimeSeconds,
      distanceCoveredKm: r.distanceCoveredKm ?? r.currentDistanceKm ?? 0,
      avgPaceMinPerKm: r.avgPaceMinPerKm,
      completed,
    };
  });
}

/** Live view: only runners with recent progress, newest split first. */
export async function getLiveRegistrations(
  marathonId: string,
): Promise<MarathonRegistration[]> {
  const registrations = await listRegistrations(marathonId);
  return registrations
    .filter((r) => r.status !== "withdrew")
    .sort((a, b) => {
      const aTs = a.lastSplitAt ? Date.parse(a.lastSplitAt) : 0;
      const bTs = b.lastSplitAt ? Date.parse(b.lastSplitAt) : 0;
      return bTs - aTs;
    });
}

export async function listPublicRuns(options?: {
  limit?: number;
  activityType?: string;
}): Promise<PublicRun[]> {
  const limit = Math.min(Math.max(options?.limit ?? 50, 1), 200);
  const collection = getDb().collection(PUBLIC_RUNS);
  const query: Query = options?.activityType
    ? collection
        .where("activityType", "==", options.activityType)
        .orderBy("startedAt", "desc")
        .limit(limit)
    : collection.orderBy("startedAt", "desc").limit(limit);

  const snap = await query.get();
  return snap.docs.map((d) => mapPublicRun(d.id, d.data()));
}

export async function getPublicRun(id: string): Promise<PublicRun | null> {
  const doc = await getDb().collection(PUBLIC_RUNS).doc(id).get();
  if (!doc.exists) return null;
  return mapPublicRun(doc.id, doc.data() ?? {});
}

/** Public runs for a single athlete, newest first (used on runner profiles). */
export async function listPublicRunsByUser(
  userId: string,
  limit = 50,
): Promise<PublicRun[]> {
  const capped = Math.min(Math.max(limit, 1), 200);
  const snap = await getDb()
    .collection(PUBLIC_RUNS)
    .where("userId", "==", userId)
    .orderBy("startedAt", "desc")
    .limit(capped)
    .get();
  return snap.docs.map((d) => mapPublicRun(d.id, d.data()));
}

/** Admin ingest: apply a live registration/split update from timing or app. */
export async function applyRegistrationUpdate(
  marathonId: string,
  registrationId: string,
  update: Partial<MarathonRegistration>,
): Promise<MarathonRegistration | null> {
  const ref = getDb()
    .collection(MARATHONS)
    .doc(marathonId)
    .collection(REGISTRATIONS)
    .doc(registrationId);

  const payload: Record<string, unknown> = { liveUpdatedAt: new Date() };
  if (update.status) payload.status = update.status;
  if (update.bibNumber != null) payload.bibNumber = update.bibNumber;
  if (update.startedAt) payload.startedAt = new Date(update.startedAt);
  if (update.completedAt) payload.completedAt = new Date(update.completedAt);
  if (update.finishTimeSeconds != null) {
    payload.finishTimeSeconds = update.finishTimeSeconds;
  }
  if (update.distanceCoveredKm != null) {
    payload.distanceCoveredKm = update.distanceCoveredKm;
  }
  if (update.avgPaceMinPerKm != null) {
    payload.avgPaceMinPerKm = update.avgPaceMinPerKm;
  }
  if (update.currentDistanceKm != null) {
    payload.currentDistanceKm = update.currentDistanceKm;
  }
  if (update.splits && update.splits.length > 0) {
    payload.splits = update.splits;
    payload.lastSplitAt = new Date();
  }

  await ref.set(payload, { merge: true });
  return getRegistration(marathonId, registrationId);
}
