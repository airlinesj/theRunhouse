import type { Metadata } from "next";
import Image from "next/image";

import { MarathonCard } from "@/components/marathon/marathon-card";
import { EventCard } from "@/components/sections/event-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { events } from "@/lib/data/events";
import { isFirebaseConfigured } from "@/lib/firebase/admin";
import { listMarathons } from "@/lib/marathon/service";
import type { MarathonEvent } from "@/lib/marathon/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse theRunhouse social runs, races, workshops, and community events across the city.",
  openGraph: {
    title: "theRunhouse events",
    description:
      "Browse theRunhouse social runs, races, workshops, and community events across the city.",
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export const dynamic = "force-dynamic";

const gallery = [
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
];

/** Load live marathons without letting an unconfigured/offline Firestore break the page. */
async function loadMarathons(): Promise<MarathonEvent[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const all = await listMarathons();
    return all.filter((m) => m.effectiveStatus !== "cancelled");
  } catch (error) {
    console.error("[events] failed to load marathons", error);
    return [];
  }
}

export default async function EventsPage() {
  const marathons = await loadMarathons();
  const liveMarathons = marathons.filter(
    (m) => m.effectiveStatus === "ongoing" || m.effectiveStatus === "upcoming",
  );
  const pastMarathons = marathons.filter(
    (m) => m.effectiveStatus === "completed",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Live from the app"
        title="Races from the ABX Motion app"
        subtitle="Events you create in the app appear here automatically, with live registrations, results and splits."
      />

      {liveMarathons.length > 0 ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {liveMarathons.map((event) => (
            <MarathonCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted">
          No live races published yet.{" "}
          {isFirebaseConfigured()
            ? "Create one in the app and it will show up here."
            : "Connect Firebase to stream events from the app."}
        </p>
      )}

      {pastMarathons.length > 0 ? (
        <div className="mt-20">
          <SectionHeading eyebrow="Results" title="Past races" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {pastMarathons.map((event) => (
              <MarathonCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-20">
        <SectionHeading
          eyebrow="Club calendar"
          title="Social runs, sessions and workshops"
          subtitle="From race days to social meetups, we build moments that invite connection and keep momentum high."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading eyebrow="Photo gallery" title="Recent memories from the crew" />
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <Card
              key={`${image}-${index}`}
              className="mb-4 overflow-hidden border-border bg-surface p-0 break-inside-avoid"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={image}
                  alt={`Runhouse gallery image ${index + 1}`}
                  fill
                  quality={70}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
