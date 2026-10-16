import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LeaderboardTable } from "@/components/marathon/leaderboard-table";
import { LiveFeed } from "@/components/marathon/live-feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { isFirebaseConfigured } from "@/lib/firebase/admin";
import {
  getLeaderboard,
  getLiveRegistrations,
  getMarathon,
} from "@/lib/marathon/service";
import { formatEventDate, formatEventTime } from "@/lib/marathon/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  if (!isFirebaseConfigured()) return { title: "Event" };
  const { id } = await params;
  const event = await getMarathon(id).catch(() => null);
  return {
    title: event?.title ?? "Event",
    description: event?.description || "A race from the ABX Motion app.",
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isFirebaseConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Live events"
          title="Event data is not connected yet"
          subtitle="Set up Firebase credentials on the server to stream races from the app."
        />
        <Button asChild className="mt-8">
          <Link href="/events">Back to events</Link>
        </Button>
      </div>
    );
  }

  const { id } = await params;
  const [event, leaderboard, live] = await Promise.all([
    getMarathon(id),
    getLeaderboard(id),
    getLiveRegistrations(id),
  ]);

  if (!event) notFound();

  const initialLive = live.map((r) => ({
    registrationId: r.id,
    userId: r.userId,
    userName: r.userName,
    bibNumber: r.bibNumber,
    status: r.status,
    currentDistanceKm: r.currentDistanceKm ?? 0,
    lastSplitAt: r.lastSplitAt,
    splits: r.splits,
  }));

  return (
    <article className="pb-24">
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#1B2A4A,#0A121E)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,30,0.1),rgba(10,18,30,0.92))]" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <Badge>{event.type === "virtual" ? "Virtual" : "Live race"}</Badge>
              <Badge variant="secondary">{event.distanceKm} km</Badge>
              <Badge variant="outline">
                {event.effectiveStatus === "ongoing"
                  ? "Live now"
                  : event.effectiveStatus}
              </Badge>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.08em] text-foreground sm:text-6xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[2fr,1fr] lg:px-8">
        <div className="space-y-12">
          <section className="space-y-4">
            <SectionHeading eyebrow="About this race" title="The route & the vibe" />
            <p className="max-w-2xl leading-7 text-muted">
              {event.description || "Details for this race are coming soon."}
            </p>
            {event.routeMapUrl ? (
              <Button asChild variant="secondary">
                <a href={event.routeMapUrl} target="_blank" rel="noreferrer">
                  View route map
                </a>
              </Button>
            ) : null}
          </section>

          <section className="space-y-4">
            <SectionHeading eyebrow="Results" title="Leaderboard" />
            <LeaderboardTable entries={leaderboard} />
          </section>
        </div>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <dl className="space-y-4 text-sm">
              <Detail label="Date" value={formatEventDate(event.startDate)} />
              {event.startDate ? (
                <Detail label="Start" value={formatEventTime(event.startDate)} />
              ) : null}
              <Detail label="Location" value={event.location || "To be confirmed"} />
              <Detail
                label="Distance"
                value={event.distanceKm > 0 ? `${event.distanceKm} km` : "—"}
              />
              <Detail
                label="Entry"
                value={event.price > 0 ? `$${event.price.toFixed(2)}` : "Free"}
              />
              <Detail
                label="Registered"
                value={
                  event.maxParticipants > 0
                    ? `${event.registrationCount} / ${event.maxParticipants}`
                    : `${event.registrationCount}`
                }
              />
            </dl>
            <p className="mt-6 text-xs leading-6 text-muted">
              Registration lives in the ABX Motion app. Join from there and your
              bib, live splits and results appear here automatically.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <LiveFeed marathonId={event.id} initialEntries={initialLive} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="text-right font-semibold text-foreground">{value}</dd>
    </div>
  );
}
