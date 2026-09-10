export type EventType = "Race" | "Social" | "Workshop" | "Training";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: EventType;
  description: string;
  image: string;
  featured?: boolean;
};

export const events: EventItem[] = [
  {
    id: "event-1",
    title: "Launch Run",
    date: "Saturday 26 September 2026",
    location: "Resim Mall loop",
    type: "Race",
    description: "Our first club run — an easy social start with a 5 km loop and a relaxed pace for the whole crew.",
    image:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "event-2",
    title: "Karina social run",
    date: "TBA",
    location: "Karina",
    type: "Social",
    description: "A future easy session with coffee, conversation, and a social pace for the club.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "event-3",
    title: "Karina tempo session",
    date: "TBA",
    location: "Karina",
    type: "Training",
    description: "Next pace-focused session details will be announced shortly.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "event-4",
    title: "Recovery mobility lab",
    date: "TBA",
    location: "Karina",
    type: "Workshop",
    description: "A future mobility session to keep the crew feeling fresh and consistent.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  },
];
