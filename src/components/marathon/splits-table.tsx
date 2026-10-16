import { cn } from "@/lib/utils";
import { formatDuration, formatPace } from "@/lib/marathon/format";
import type { RunSplit } from "@/lib/marathon/types";

/** Compact per-kilometre split table. */
export function SplitsTable({
  splits,
  className,
}: {
  splits: RunSplit[];
  className?: string;
}) {
  if (splits.length === 0) {
    return (
      <p className={cn("text-sm text-muted", className)}>
        No splits recorded yet.
      </p>
    );
  }

  const fastest = Math.min(...splits.map((s) => s.paceSecPerKm || Infinity));

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-surface-strong text-xs uppercase tracking-[0.14em] text-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium">KM</th>
            <th className="px-4 py-2 text-right font-medium">Split</th>
            <th className="px-4 py-2 text-right font-medium">Elapsed</th>
            <th className="px-4 py-2 text-right font-medium">Pace</th>
          </tr>
        </thead>
        <tbody>
          {splits.map((split) => {
            const isFastest = split.paceSecPerKm === fastest && fastest > 0;
            return (
              <tr
                key={split.km}
                className="border-t border-border/70 odd:bg-[rgba(244,237,228,0.02)]"
              >
                <td className="px-4 py-2 font-semibold text-foreground">
                  {split.km}
                </td>
                <td className="px-4 py-2 text-right text-muted">
                  {formatDuration(split.splitSeconds)}
                </td>
                <td className="px-4 py-2 text-right text-muted">
                  {formatDuration(split.elapsedSeconds)}
                </td>
                <td
                  className={cn(
                    "px-4 py-2 text-right",
                    isFastest ? "font-semibold text-[#F4C95D]" : "text-muted",
                  )}
                >
                  {formatPace(split.paceSecPerKm)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
