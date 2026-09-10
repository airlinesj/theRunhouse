import type { Metadata } from "next";

import { JoinClient } from "./join-client";

export const metadata: Metadata = {
  title: "Join",
  description: "Join theRunhouse and connect with your pace group, running community, and next race training plan.",
  openGraph: {
    title: "Join theRunhouse",
    description: "Join theRunhouse and connect with your pace group, running community, and next race training plan.",
    images: ["https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function JoinPage() {
  return <JoinClient />;
}
