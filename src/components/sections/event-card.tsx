import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/lib/data/events";

export interface EventCardProps {
  event: EventItem;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-surface transition duration-200 hover:-translate-y-1 hover:border-[#F4C95D]/50", className)}>
      <div className="relative h-56 w-full overflow-hidden">
        <Image src={event.image} alt={event.title} fill quality={70} sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 hover:scale-105" />
      </div>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{event.type}</Badge>
          {(event.featured ? ["Featured"] : []).concat(event.type === "Race" ? ["Timed"] : []).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <CardTitle className="text-2xl">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted">
        <div className="flex items-center justify-between gap-3">
          <span>{event.date}</span>
          <span className="text-right">{event.location}</span>
        </div>
        <p className="leading-6 text-muted">{event.description}</p>
      </CardContent>
    </Card>
  );
}
