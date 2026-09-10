export type RunPace = "Easy" | "Steady" | "Tempo" | "Trail" | "Recovery";

export type Run = {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  distance: string;
  pace: RunPace;
  description: string;
  attendees: number;
  intensity: "Low" | "Medium" | "High";
};

export const runs: Run[] = [
  {
    id: "run-1",
    title: "Launch Run",
    day: "Saturday",
    time: "7:00 AM",
    location: "Resim Mall loop",
    distance: "5 km",
    pace: "Easy",
    description: "Our first community run — a relaxed start, easy pacing, and a good first session for the crew.",
    attendees: 23,
    intensity: "Low",
  },
  {
    id: "run-2",
    title: "Karina Tempo Session",
    day: "TBA",
    time: "TBA",
    location: "Karina",
    distance: "6 km",
    pace: "Tempo",
    description: "Next session details to be announced, but we’re keeping the Karina pace session in the mix.",
    attendees: 23,
    intensity: "High",
  },
  {
    id: "run-3",
    title: "Next social run",
    day: "TBA",
    time: "TBA",
    location: "Karina",
    distance: "5 km",
    pace: "Easy",
    description: "The next social session is still being planned — stay tuned for the update.",
    attendees: 23,
    intensity: "Low",
  },
  {
    id: "run-4",
    title: "Next long run",
    day: "TBA",
    time: "TBA",
    location: "Karina",
    distance: "8 km",
    pace: "Trail",
    description: "A future longer effort with optional hills and a relaxed crew vibe, details TBA.",
    attendees: 23,
    intensity: "Medium",
  },
];
