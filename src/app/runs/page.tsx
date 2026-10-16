import type { Metadata } from "next";

import { RunCard } from "@/components/run/run-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { isFirebaseConfigured } from "@/lib/firebase/admin";
import { listPublicRuns } from "@/lib/marathon/service";
import { cn } from "@/lib/utils";
import type { PublicRun } from "@/lib/marathon/types";

export const metadata: Metadata = {
  title: "Community runs",
  description:
    "Runs logged in the ABX Motion app by theRunhouse athletes — distances, times, pace and splits.",
};

export const dynamic = "force-dynamic";

const filters = [
  { label: "All", value: undefined },
  { label: "Running", value: "running" },
  { label: "Walking", value: "walking" },
  { label: "Cycling", value: "cycling" },
];

async function loadRuns(activityType?: string): Promise<PublicRun[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    return await listPublicRuns({ activityType, limit: 60 });
  } catch (error) {
    console.error("[runs] failed to load public runs", error);
    return [];
  }
}

export default async function RunsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const runs = await loadRuns(type);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Live from the app"
        title="Community runs"
        subtitle="Every kilometre logged in the ABX Motion app by athletes who share their activity publicly. Tap a name to see their splits."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = (type ?? undefined) === filter.value;
          const href = filter.value ? `/runs?type=${filter.value}` : "/runs";
          return (
            <a key={filter.label} href={href}>
              <Badge
                variant={active ? "default" : "outline"}
                className={cn("cursor-pointer", !active && "hover:text-foreground")}
              >
                {filter.label}
              </Badge>
            </a>
          );
        })}
      </div>

      {runs.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {runs.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted">
          No public runs yet.{" "}
          {isFirebaseConfigured()
            ? "Finish an activity in the app and enable “Share activity publicly” to appear here."
            : "Connect Firebase to stream runs from the app."}
        </p>
      )}
    </div>
  );
}
