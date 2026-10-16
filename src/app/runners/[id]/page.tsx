import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RunCard } from "@/components/run/run-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { isFirebaseConfigured } from "@/lib/firebase/admin";
import { listPublicRunsByUser } from "@/lib/marathon/service";
import { formatDistanceKm, formatDuration } from "@/lib/marathon/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  if (!isFirebaseConfigured()) return { title: "Runner" };
  const { id } = await params;
  const runs = await listPublicRunsByUser(id, 1).catch(() => []);
  return { title: runs[0]?.displayName ?? "Runner" };
}

export default async function RunnerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isFirebaseConfigured()) notFound();

  const { id } = await params;
  const runs = await listPublicRunsByUser(id, 100).catch(() => []);
  if (runs.length === 0) notFound();

  const displayName = runs[0].displayName;
  const totalMeters = runs.reduce((sum, r) => sum + r.distanceMeters, 0);
  const totalMs = runs.reduce((sum, r) => sum + r.durationMs, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Athlete"
        title={displayName}
        subtitle={`${runs.length} public ${
          runs.length === 1 ? "run" : "runs"
        } shared from the ABX Motion app.`}
      />

      <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
        <Metric label="Runs" value={String(runs.length)} />
        <Metric label="Distance" value={formatDistanceKm(totalMeters / 1000)} />
        <Metric label="Time" value={formatDuration(totalMs / 1000)} />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {runs.map((run) => (
          <RunCard key={run.id} run={run} />
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-5 text-center">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-xl font-black text-foreground">{value}</p>
    </div>
  );
}
