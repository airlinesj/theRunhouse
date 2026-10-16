"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  formatDuration,
  formatPace,
  relativeTime,
} from "@/lib/marathon/format";
import type { RunSplit } from "@/lib/marathon/types";

interface LiveEntry {
  registrationId: string;
  userId: string;
  userName: string;
  bibNumber: number | null;
  status: string;
  currentDistanceKm: number;
  lastSplitAt: string | null;
  splits: RunSplit[];
}

/**
 * Client-side live progress feed for an in-progress marathon. Polls the
 * site API so spectators see splits as runners cross each kilometre.
 */
export function LiveFeed({
  marathonId,
  initialEntries = [],
  pollMs = 15000,
}: {
  marathonId: string;
  initialEntries?: LiveEntry[];
  pollMs?: number;
}) {
  const [entries, setEntries] = useState<LiveEntry[]>(initialEntries);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/marathons/${marathonId}/live`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = (await res.json()) as { data: LiveEntry[] };
        if (!cancelled) {
          setEntries(payload.data ?? []);
          setLastUpdated(new Date());
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Live updates temporarily unavailable.");
      }
    }

    load();
    const timer = setInterval(load, pollMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [marathonId, pollMs]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted">
        <span>Live progress</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#F4C95D]" />
          {lastUpdated ? `updated ${relativeTime(lastUpdated.toISOString())}` : "connecting…"}
        </span>
      </div>

      {error ? <p className="text-sm text-muted">{error}</p> : null}

      {entries.length === 0 ? (
        <p className="text-sm text-muted">
          No runners on course right now. Live splits appear as they are tracked
          in the app.
        </p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => {
            const lastSplit = entry.splits.at(-1);
            return (
              <li
                key={entry.registrationId}
                className={cn(
                  "rounded-xl border border-border bg-surface-strong px-4 py-3",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {entry.userName}
                    </span>
                    {entry.bibNumber != null ? (
                      <span className="text-xs text-muted">#{entry.bibNumber}</span>
                    ) : null}
                  </div>
                  <span className="text-sm font-semibold text-[#F4C95D]">
                    {entry.currentDistanceKm.toFixed(2)} km
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
                  {lastSplit ? (
                    <>
                      <span>Last split km {lastSplit.km}</span>
                      <span>{formatDuration(lastSplit.splitSeconds)}</span>
                      <span>{formatPace(lastSplit.paceSecPerKm)}</span>
                      <span>elapsed {formatDuration(lastSplit.elapsedSeconds)}</span>
                    </>
                  ) : (
                    <span>Awaiting first split…</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
