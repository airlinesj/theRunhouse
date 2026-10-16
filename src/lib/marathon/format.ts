/** Shared display formatters for marathon + run data. */

export function formatEventDate(iso: string | null): string {
  if (!iso) return "Date TBA";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Date TBA";
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatEventTime(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/** Seconds → H:MM:SS / MM:SS. */
export function formatDuration(totalSeconds: number | null | undefined): string {
  if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return "—";
  }
  const s = Math.round(totalSeconds);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

/** Seconds per km → M:SS /km. */
export function formatPace(secondsPerKm: number | null | undefined): string {
  if (
    secondsPerKm == null ||
    !Number.isFinite(secondsPerKm) ||
    secondsPerKm <= 0
  ) {
    return "—";
  }
  const s = Math.round(secondsPerKm);
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}/km`;
}

/** Metres → "5.00 km". */
export function formatDistanceKm(km: number | null | undefined): string {
  if (km == null || !Number.isFinite(km)) return "—";
  return `${km.toFixed(2)} km`;
}

export function formatKm(meters: number | null | undefined): string {
  if (meters == null || !Number.isFinite(meters)) return "—";
  return `${(meters / 1000).toFixed(2)} km`;
}

export function relativeTime(iso: string | null): string {
  if (!iso) return "—";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "—";
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
