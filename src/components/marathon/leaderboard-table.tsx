import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDuration, formatPace } from "@/lib/marathon/format";
import type { LeaderboardEntry } from "@/lib/marathon/types";

const statusTone: Record<string, "default" | "secondary" | "outline"> = {
  completed: "default",
  confirmed: "secondary",
  registered: "outline",
  withdrew: "outline",
};

export function LeaderboardTable({
  entries,
  className,
}: {
  entries: LeaderboardEntry[];
  className?: string;
}) {
  if (entries.length === 0) {
    return (
      <p className={cn("text-sm text-muted", className)}>
        No entrants yet. Registrations from the app will appear here live.
      </p>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-surface-strong text-xs uppercase tracking-[0.14em] text-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium">#</th>
            <th className="px-4 py-2 text-left font-medium">Athlete</th>
            <th className="px-4 py-2 text-left font-medium">Bib</th>
            <th className="px-4 py-2 text-right font-medium">Distance</th>
            <th className="px-4 py-2 text-right font-medium">Time</th>
            <th className="px-4 py-2 text-right font-medium">Pace</th>
            <th className="px-4 py-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.registrationId}
              className="border-t border-border/70 odd:bg-[rgba(244,237,228,0.02)]"
            >
              <td className="px-4 py-3 font-black text-foreground">{entry.rank}</td>
              <td className="px-4 py-3">
                <Link
                  href={`/runners/${entry.userId}`}
                  className="font-medium text-foreground hover:text-accent"
                >
                  {entry.userName}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted">
                {entry.bibNumber ?? "—"}
              </td>
              <td className="px-4 py-3 text-right text-muted">
                {entry.distanceCoveredKm.toFixed(2)} km
              </td>
              <td className="px-4 py-3 text-right font-semibold text-foreground">
                {entry.completed ? formatDuration(entry.finishTimeSeconds) : "—"}
              </td>
              <td className="px-4 py-3 text-right text-muted">
                {formatPace(
                  entry.avgPaceMinPerKm != null
                    ? entry.avgPaceMinPerKm * 60
                    : null,
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <Badge variant={statusTone[entry.status] ?? "outline"}>
                  {entry.completed ? "Finished" : entry.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
