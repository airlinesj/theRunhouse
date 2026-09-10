"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Coffee, HeartHandshake, Instagram, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { RunCard } from "@/components/sections/run-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatBlock } from "@/components/sections/stat-block";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { Button } from "@/components/ui/button";
import { runs } from "@/lib/data/runs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function HomeSections() {
  const prefersReducedMotion = useReducedMotion();
  const featuredRuns = runs.slice(0, 3);
  const motionState = prefersReducedMotion ? false : "hidden";

  return (
    <>
      <section id="proof" className="border-b border-border bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Small crew. Real momentum.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock value="23" label="Members in the crew" />
          <StatBlock value="5 km" label="First weekly loop" />
          <StatBlock value="3" label="Meetups in the mix" />
          <StatBlock value="2026" label="Year we started" />
        </div>
        </div>
      </section>

      <motion.section
        className="bg-surface py-16 sm:py-20"
        initial={motionState}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why we run" title="A better reason to lace up" description="No performance theatre. Just a welcoming rhythm that makes the next run easier to say yes to." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { title: "All paces welcome", text: "Find your rhythm without feeling like you need to prove anything first.", icon: <HeartHandshake className="h-5 w-5" /> },
              { title: "Show up, no pressure", text: "A missed week is not a missed chance. Come back when you are ready.", icon: <ShieldCheck className="h-5 w-5" /> },
              { title: "Coffee after", text: "The best part of the run is often the conversation that follows it.", icon: <Coffee className="h-5 w-5" /> },
            ].map((item) => (
              <div key={item.title} className="border border-border bg-background p-6 shadow-soft">
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B4A]/12 text-[#FF6B4A]">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20" initial={motionState} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="This week" title="Choose your run" description="Three ways to get moving, with the launch loop leading the way." />
          <Link href="/schedule" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B4A] hover:text-[#F4C95D]">Full schedule <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredRuns.map((run) => <RunCard key={run.id} run={run} />)}
        </div>
      </motion.section>

      <motion.section className="bg-surface py-16 sm:py-20" initial={motionState} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Social proof" title="The run is better together" description="A little accountability, a lot of belonging, and enough good stories to keep coming back." />
            <a href="https://www.instagram.com/therunhouse___?stkn=MXJud2RxazJhOGg%3D&utm_source=qr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B4A] hover:text-[#F4C95D]"><Instagram className="h-4 w-4" /> Follow the crew</a>
          </div>
          <div className="mt-10"><TestimonialCarousel /></div>
        </div>
      </motion.section>

      <motion.section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20" initial={motionState} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <SectionHeading eyebrow="How it works" title="Three simple steps to your next run" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Show up", "Pick your pace", "Run together"].map((step, index) => (
            <div key={step} className="border-t-2 border-[#F4C95D] pt-5">
              <p className="text-4xl font-black text-[#F4C95D]">0{index + 1}</p>
              <h3 className="mt-5 text-2xl font-semibold text-foreground">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{index === 0 ? "Turn up as you are, with the energy to take one step." : index === 1 ? "Settle into a pace that feels sustainable and social." : "Leave with more momentum than you arrived with."}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 sm:pb-20">
        <div className="relative overflow-hidden border border-[#F4C95D]/35 bg-surface p-8 shadow-glow sm:p-12">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#F4C95D]/10 blur-3xl" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F4C95D]">Start this week</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.08em] text-foreground sm:text-6xl">Your next run is waiting.</h2>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto"><Link href="/join">Join the Run <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
