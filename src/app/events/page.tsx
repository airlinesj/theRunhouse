import type { Metadata } from "next";
import Image from "next/image";

import { EventCard } from "@/components/sections/event-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { events } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse theRunhouse social runs, races, workshops, and community events across the city.",
  openGraph: {
    title: "theRunhouse events",
    description: "Browse theRunhouse social runs, races, workshops, and community events across the city.",
    images: ["https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80"],
  },
};

const gallery = [
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Highlight reel"
        title="Events that turn training into community"
        subtitle="From race days to social meetups, we build moments that invite connection and keep momentum high."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="Photo gallery"
          title="Recent memories from the crew"
        />
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((image, index) => (
            <Card key={`${image}-${index}`} className="mb-4 overflow-hidden border-border bg-surface p-0 break-inside-avoid">
              <div className="relative h-72 overflow-hidden">
                <Image src={image} alt={`Runhouse gallery image ${index + 1}`} fill quality={70} sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
