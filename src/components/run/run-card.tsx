import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatDistanceKm,
  formatDuration,
  formatPace,
  relativeTime,
} from "@/lib/marathon/format";
import type { PublicRun } from "@/lib/marathon/types";

export function RunCard({
  run,
  className,
}: {
  run: PublicRun;
  className?: string;
}) {
  const durationSeconds = run.durationMs / 1000;
  return (
    <Card className={cn("bg-surface", className)}>
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">
            <Link href={`/runners/${run.userId}`} className="hover:text-accent">
              {run.displayName}
            </Link>
          </CardTitle>
          <Badge variant="secondary" className="capitalize">
            {run.activityType}
          </Badge>
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          {relativeTime(run.startedAt)}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat label="Distance" value={formatDistanceKm(run.distanceMeters / 1000)} />
          <Stat label="Time" value={formatDuration(durationSeconds)} />
          <Stat label="Pace" value={formatPace(run.avgPaceSecsPerKm)} />
        </div>

        {run.splits.length > 0 ? (
          <details className="group rounded-lg border border-border/70">
            <summary className="cursor-pointer list-none px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted marker:content-none">
              {run.splits.length} splits
            </summary>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 px-3 pb-3 text-xs text-muted sm:grid-cols-3">
              {run.splits.map((split) => (
                <li key={split.km} className="flex items-center justify-between">
                  <span>km {split.km}</span>
                  <span className="text-foreground">{formatPace(split.paceSecPerKm)}</span>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-strong px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}
