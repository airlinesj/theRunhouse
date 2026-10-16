import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatEventDate } from "@/lib/marathon/format";
import type { MarathonEvent } from "@/lib/marathon/types";

const statusLabel: Record<MarathonEvent["effectiveStatus"], string> = {
  upcoming: "Upcoming",
  ongoing: "Live now",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function MarathonCard({
  event,
  className,
}: {
  event: MarathonEvent;
  className?: string;
}) {
  const spotsLeft =
    event.maxParticipants > 0
      ? Math.max(event.maxParticipants - event.registrationCount, 0)
      : null;

  return (
    <Card
      className={cn(
        "overflow-hidden bg-surface transition duration-200 hover:-translate-y-1",
        className,
      )}
    >
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative h-52 w-full overflow-hidden bg-surface-strong">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              quality={70}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#1B2A4A,#0A121E)] text-4xl font-black tracking-[-0.08em] text-[#F4C95D]">
              {event.distanceKm > 0 ? `${event.distanceKm}K` : "RUN"}
            </div>
          )}
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge
              variant={event.effectiveStatus === "ongoing" ? "default" : "secondary"}
            >
              {statusLabel[event.effectiveStatus]}
            </Badge>
          </div>
        </div>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{event.type === "virtual" ? "Virtual" : "Live"}</Badge>
            {event.distanceKm > 0 ? (
              <Badge variant="secondary">{event.distanceKm} km</Badge>
            ) : null}
          </div>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted">
          <div className="flex items-center justify-between gap-3">
            <span>{formatEventDate(event.startDate)}</span>
            <span className="text-right">{event.location || "Location TBA"}</span>
          </div>
          {event.description ? (
            <p className="line-clamp-3 leading-6 text-muted">{event.description}</p>
          ) : null}
          <div className="flex items-center justify-between pt-1 text-xs uppercase tracking-[0.14em]">
            <span>
              {event.registrationCount} registered
              {spotsLeft != null ? ` · ${spotsLeft} left` : ""}
            </span>
            <span className="text-[#F4C95D]">
              {event.price > 0 ? `$${event.price.toFixed(2)}` : "Free"}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
