"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Sparkles, Trophy } from "lucide-react";

import { CTABanner } from "@/components/sections/cta-banner";
import { EventCard } from "@/components/sections/event-card";
import { RunCard } from "@/components/sections/run-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatBlock } from "@/components/sections/stat-block";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { Card } from "@/components/ui/card";
import { events } from "@/lib/data/events";
import { runs } from "@/lib/data/runs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function HomeSections() {
  const featuredRuns = runs.slice(0, 3);
  const featuredEvents = events.slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock value="23" label="Members in the crew" />
          <StatBlock value="1" label="Launch run" />
          <StatBlock value="TBA" label="Next sessions" />
          <StatBlock value="5K" label="First loop" />
        </div>
      </section>

      <motion.section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <SectionHeading
          eyebrow="This week"
          title="Runs built for momentum"
          description="Choose your pace, meet your crew, and settle into a rhythm that keeps you moving."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredRuns.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </div>
      </motion.section>

      <motion.section className="bg-surface py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Why members stay"
                title="A club that sees the whole runner"
                description="We blend structured training, social energy, and real belonging — so your run life gets stronger without losing the fun."
              />
              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "Inclusive pace groups",
                    text: "From first 5K to first marathon, you’ll find a crew that matches your rhythm.",
                    icon: <Sparkles className="h-5 w-5 text-[#F4C95D]" />,
                  },
                  {
                    title: "Coach-led accountability",
                    text: "Clear guidance, training plans, and support for week-to-week progression.",
                    icon: <Trophy className="h-5 w-5 text-[#F4C95D]" />,
                  },
                  {
                    title: "Built for city life",
                    text: "Runs that fit around your schedule, neighborhood, and goals.",
                    icon: <MapPin className="h-5 w-5 text-[#F4C95D]" />,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-border bg-[rgba(27,42,74,0.55)] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4C95D]/12">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="overflow-hidden border-border bg-[rgba(27,42,74,0.55)] p-0">
              <div className="relative h-[440px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                  alt="Runners gathering"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <SectionHeading
          eyebrow="Upcoming"
          title="Events with a social spark"
          description="Race days, community meetups, and training sessions designed to keep the energy high."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </motion.section>

      <motion.section className="bg-surface py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Members run brighter together"
            align="center"
          />
          <div className="mt-8">
            <TestimonialCarousel />
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTABanner />
      </section>
    </>
  );
}
