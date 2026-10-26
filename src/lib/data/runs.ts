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
  image?: string;
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
    image: "/first.jpeg",
  },
  {
    id: "run-2",
    title: "Tempo Session",
    day: "Saturday, 7 November 2026",
    time: "6:15 AM",
    location: "Resim Mall",
    distance: "6 km",
    pace: "Tempo",
    description: "Meet at Resim Mall for a 6 km tempo session.",
    attendees: 23,
    intensity: "High",
    image: "/launch.jpeg",
  },
  {
    id: "run-3",
    title: "Pyjama Run",
    day: "TBA",
    time: "6:15 AM",
    location: "Resim Mall",
    distance: "5 km",
    pace: "Easy",
    description: "Join us at Resim Mall for an easy 5 km social run in your pyjamas. Date to be announced.",
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
