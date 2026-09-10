import type { Metadata } from "next";

import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to theRunhouse about club questions, run groups, or your next step with the community.",
  openGraph: {
    title: "Contact theRunhouse",
    description: "Reach out to theRunhouse about club questions, run groups, or your next step with the community.",
    images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
