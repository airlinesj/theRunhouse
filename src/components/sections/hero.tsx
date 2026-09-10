"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24 lg:pt-16">
        <motion.div
          className="relative z-10 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div custom={0} variants={fadeInUp}>
            <Badge className="mb-6 w-fit border-[#F4C95D]/40 bg-[#F4C95D]/12 text-[#F4C95D]">23 members & counting</Badge>
          </motion.div>
          <motion.h1
            custom={0.08}
            variants={fadeInUp}
            className="max-w-xl text-5xl font-black tracking-[-0.08em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Run with your people.
          </motion.h1>
          <motion.p custom={0.16} variants={fadeInUp} className="mt-6 max-w-md text-lg text-muted">
            Our first run is Saturday 26 September at the Resim Mall loop. We’re a fresh running crew building momentum together, with easy km, good energy, and a welcoming pace for everyone.
          </motion.p>
          <motion.div custom={0.22} variants={fadeInUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full justify-center sm:w-auto">
              <a href="https://wa.me/263771371597?text=Hi%20I%20want%20to%20join%20theRunhouse" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                Join the Run
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild className="w-full justify-center sm:w-auto">
              <Link href="/schedule" className="inline-flex items-center gap-2">
                <Play className="h-4 w-4" />
                View schedule
              </Link>
            </Button>
          </motion.div>
          <motion.div custom={0.3} variants={fadeInUp} className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#F4C95D]" />
              First run: Resim Mall loop, Sat 26 Sep
            </div>
            <div>Next sessions: TBA</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute -left-14 top-10 h-40 w-40 rounded-full bg-[#F4C95D]/16 blur-3xl" />
          <div className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-[#FF6B4A]/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-3 shadow-[0_30px_80px_rgba(10,18,30,0.35)]">
            <div className="relative overflow-hidden rounded-[24px]">
              <Image
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80"
                alt="Runners on a city street"
                width={1200}
                height={1400}
                className="h-[560px] w-full object-cover"
              />
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-border bg-[rgba(27,42,74,0.8)] p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Next pace group</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">Sunset social 5K</p>
                </div>
                <div className="rounded-full bg-[#F4C95D]/14 px-3 py-1 text-sm font-semibold text-[#F4C95D]">
                  6:30 PM
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
