"use client";

import { LayoutGrid, List } from "lucide-react";
import { useMemo, useState } from "react";

import { RunCard } from "@/components/sections/run-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { runs } from "@/lib/data/runs";
import { cn } from "@/lib/utils";

const filters = ["All", "Easy", "Moderate", "Tempo", "Long Run"] as const;
type Filter = (typeof filters)[number];

export function ScheduleClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visibleRuns = useMemo(() => {
    if (activeFilter === "All") return runs;

    return runs.filter((run) => {
      if (activeFilter === "Easy") return run.pace === "Easy" || run.pace === "Recovery";
      if (activeFilter === "Moderate") return run.pace === "Steady";
      if (activeFilter === "Tempo") return run.pace === "Tempo";
      if (activeFilter === "Long Run") return run.pace === "Trail" || run.distance.includes("8") || run.distance.includes("6");
      return true;
    });
  }, [activeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Weekly rhythm"
        title="Find your next run"
        subtitle="Explore the runs that match your current pace, distance, and energy level."
      />

      <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              type="button"
              variant={activeFilter === filter ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={cn(activeFilter === filter ? "bg-accent text-[#1B2A4A]" : "bg-[rgba(244,237,228,0.04)] text-foreground")}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="inline-flex gap-2 rounded-full border border-border bg-surface p-1">
          <Button
            type="button"
            variant={view === "grid" ? "default" : "secondary"}
            size="sm"
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={view === "list" ? "default" : "secondary"}
            size="sm"
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={cn(view === "grid" ? "mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "mt-8 space-y-4")}>
        {visibleRuns.map((run) => (
          <div key={run.id} className={cn(view === "list" && "max-w-3xl")}>
            <RunCard run={run} className={cn(view === "list" && "w-full")} />
          </div>
        ))}
      </div>
    </div>
  );
}
