import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about theRunhouse, our inclusive running community, and the people helping members move with confidence.",
  openGraph: {
    title: "About theRunhouse",
    description: "Learn about theRunhouse, our inclusive running community, and the people helping members move with confidence.",
    images: ["https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80"],
  },
};

const values = [
  { title: "Inclusive by design", text: "We welcome runners who want to move, connect, and feel invited — not just those chasing personal bests." },
  { title: "Human coaching", text: "Support that feels motivating, practical, and rooted in real life, not perfectionism." },
  { title: "City energy", text: "Our group runs are built around neighborhoods, pace, and the joy of being outside together." },
];

const leaders = [
  { name: "Julius Tamangani", role: "CEO", detail: "Leads the club vision, community direction, and overall experience." },
  { name: "Shayne Kachepatsonga", role: "Pace Coach", detail: "Helps runners build confidence, improve pace, and move with intention." },
  { name: "Julius Tamangani", role: "Onboarding", detail: "Runs new member onboarding, first-run welcome, and the onboarding experience." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About the club"
        title="Built for runners who want more than solo miles"
        description="theRunhouse is a community-first running club for everyday athletes who want energy, structure, and a crew that shows up for them."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="overflow-hidden rounded-[32px] border border-border bg-surface">
          <Image
            src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80"
            alt="Members running together in the city"
            width={1200}
            height={900}
            className="h-[480px] w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <Badge>Community-first</Badge>
          <p className="text-lg leading-8 text-muted">
            We believe running should be energizing, welcoming, and rooted in actual life. Whether you’re building a 5K habit or training for a marathon, we help you feel steady, supported, and connected.
          </p>
          <p className="text-lg leading-8 text-muted">
            Our club is designed for city runners who want accountability without intimidation — thoughtful training, strong coaching, and a social rhythm that makes the miles easier to keep.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} className="bg-surface">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{value.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="Leadership"
          title="Guides who keep the culture strong"
          description="Meet the people helping the club stay grounded, welcoming, and built for lasting momentum."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {leaders.map((leader) => (
            <Card key={leader.name} className="bg-surface">
              <CardContent className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4C95D]/12 text-lg font-semibold text-[#F4C95D]">
                  {leader.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{leader.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-muted">{leader.role}</p>
                </div>
                <p className="text-sm leading-7 text-muted">{leader.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
