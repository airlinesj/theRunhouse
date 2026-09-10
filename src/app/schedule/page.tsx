import type { Metadata } from "next";

import { ScheduleClient } from "./schedule-client";

export const metadata: Metadata = {
  title: "Schedule",
  description: "See theRunhouse weekly run calendar, pace groups, and community training sessions.",
  openGraph: {
    title: "theRunhouse schedule",
    description: "See theRunhouse weekly run calendar, pace groups, and community training sessions.",
    images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function SchedulePage() {
  return <ScheduleClient />;
}
