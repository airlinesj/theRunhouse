import { MapPin, TimerReset } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Run } from "@/lib/data/runs";

const whatsappGroupLink = "https://chat.whatsapp.com/KSlBd8b2Drf0yWMw2ZkVW1";

export interface RunCardProps {
  run: Run;
  className?: string;
}

export function RunCard({ run, className }: RunCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-surface transition duration-200 hover:-translate-y-1", className)}>
      {run.image ? (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden p-0 text-left"
              aria-label={`View ${run.title} graphic`}
            >
              <Image
                src={run.image}
                alt={`${run.title} promotional graphic`}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-300 hover:scale-105"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-background p-3 sm:p-5">
            <DialogTitle className="text-xl text-foreground">{run.title}</DialogTitle>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-surface-strong">
              <Image
                src={run.image}
                alt={`${run.title} promotional graphic, enlarged`}
                fill
                sizes="(min-width: 768px) 720px, calc(100vw - 2rem)"
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary">{run.day}</Badge>
          <span className="text-xs uppercase tracking-[0.18em] text-muted">{run.distance}</span>
        </div>
        <CardTitle className="mt-3 text-2xl">{run.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>{run.time}</span>
          <span>{run.pace}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <MapPin className="h-4 w-4 text-[#F4C95D]" />
          {run.location}
        </div>
        <p className="text-sm leading-6 text-muted">{run.description}</p>
        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <TimerReset className="h-4 w-4 text-[#F4C95D]" />
            {run.attendees} runners
          </div>
          <span className="rounded-full bg-[rgba(244,237,228,0.04)] px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-foreground">
            {run.intensity}
          </span>
        </div>
        <Button className="mt-2 w-full" variant="secondary" asChild>
          <a href={whatsappGroupLink} target="_blank" rel="noreferrer">
            RSVP
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
