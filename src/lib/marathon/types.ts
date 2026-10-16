/**
 * Shared data contract between the ABX Motion app and theRunhouse website.
 *
 * These shapes mirror the Flutter models:
 *   lib/features/marathon/models/marathon_event.dart
 *   lib/features/marathon/models/marathon_registration.dart
 *   lib/core/db/run_record.dart (+ the new split capture)
 *
 * Firestore layout (project: docucraft-cd41b)
 *   marathons/{marathonId}
 *   marathons/{marathonId}/registrations/{registrationId}
 *   public_runs/{runId}                     ← community run projection
 *   users/{uid}                             ← display name / avatar only
 */

export type MarathonType = "live" | "virtual";
export type MarathonStatus = "upcoming" | "ongoing" | "completed" | "cancelled";
export type RegistrationStatus =
  | "registered"
  | "confirmed"
  | "completed"
  | "withdrew";
export type ParticipationMode = "in-person" | "virtual";

/** A single per-kilometre (or per-checkpoint) split of a run. */
export interface RunSplit {
  /** 1-based split index (kilometre 1, 2, 3 …). */
  km: number;
  /** Seconds taken for this split alone. */
  splitSeconds: number;
  /** Cumulative elapsed seconds at the end of this split. */
  elapsedSeconds: number;
  /** Pace for this split, in seconds per kilometre. */
  paceSecPerKm: number;
}

export interface MarathonEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  type: MarathonType;
  distanceKm: number;
  startDate: string | null;
  registrationStartDate: string | null;
  registrationEndDate: string | null;
  maxParticipants: number;
  registrationCount: number;
  price: number;
  imageUrl: string | null;
  routeMapUrl: string | null;
  status: MarathonStatus;
  /** Clock-derived status (upcoming / ongoing / completed) for display. */
  effectiveStatus: MarathonStatus;
}

export interface MarathonRegistration {
  id: string;
  marathonId: string;
  userId: string;
  userName: string;
  bibNumber: number | null;
  status: RegistrationStatus;
  startedAt: string | null;
  completedAt: string | null;
  finishTimeSeconds: number | null;
  distanceCoveredKm: number | null;
  avgPaceMinPerKm: number | null;
  participationMode: ParticipationMode;
  /** Live progress, updated by the app as the runner advances. */
  currentDistanceKm: number | null;
  lastSplitAt: string | null;
  splits: RunSplit[];
  createdAt: string | null;
}

/** A public community run shown on the website. */
export interface PublicRun {
  id: string;
  userId: string;
  displayName: string;
  photoUrl: string | null;
  activityType: string;
  distanceMeters: number;
  durationMs: number;
  avgPaceSecsPerKm: number;
  calories: number;
  startedAt: string | null;
  endedAt: string | null;
  splits: RunSplit[];
}

export interface LeaderboardEntry {
  rank: number;
  registrationId: string;
  userId: string;
  userName: string;
  bibNumber: number | null;
  status: RegistrationStatus;
  finishTimeSeconds: number | null;
  distanceCoveredKm: number;
  avgPaceMinPerKm: number | null;
  completed: boolean;
}

/** Public-safe projection of `users/{uid}` (never exposes email). */
export interface PublicAthlete {
  userId: string;
  displayName: string;
  photoUrl: string | null;
}
