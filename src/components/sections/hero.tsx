"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-73px)] items-end overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=80"
        alt="Runners moving through a city at night"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,42,74,0.98)_0%,rgba(27,42,74,0.8)_45%,rgba(27,42,74,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(27,42,74,0.98)_0%,transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="max-w-3xl"
        >
          <motion.div custom={0} variants={fadeInUp}>
            <Badge className="mb-6 border-[#F4C95D]/40 bg-[#F4C95D]/12 text-[#F4C95D]">Community running club</Badge>
          </motion.div>
          <motion.h1 custom={0.08} variants={fadeInUp} className="max-w-2xl text-6xl font-black leading-[0.92] tracking-[-0.08em] text-foreground sm:text-8xl">
            theRunhouse
          </motion.h1>
          <motion.p custom={0.16} variants={fadeInUp} className="mt-5 text-2xl font-semibold text-[#F4C95D] sm:text-3xl">
            Where runners belong.
          </motion.p>
          <motion.p custom={0.22} variants={fadeInUp} className="mt-5 max-w-xl text-base leading-7 text-foreground-muted sm:text-lg">
            A welcoming city crew for easy km, good energy, and the kind of consistency that starts with showing up this week.
          </motion.p>
          <motion.div custom={0.28} variants={fadeInUp} className="mt-8">
            <Button asChild size="lg" className="w-full justify-center sm:w-auto">
              <Link href="#community" className="inline-flex items-center gap-2">
                Let&apos;s go through the community
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div custom={0.34} variants={fadeInUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground-muted">
            <span className="flex items-center gap-2"><span className="font-semibold text-[#F4C95D]">Next run</span> Saturday, 7:00 AM</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#F4C95D]" /> Resim Mall loop</span>
            <span><span className="font-semibold text-[#F4C95D]">Pace</span> Easy · 5 km</span>
          </motion.div>
        </motion.div>
        <a href="#proof" className="mt-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C95D] transition hover:text-foreground" aria-label="Scroll to club proof">
          See why we run <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
