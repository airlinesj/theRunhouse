"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "I joined after a year of solo runs. TheRunhouse made training feel social, practical, and genuinely fun again.",
    name: "Nina P.",
    role: "5K runner",
  },
  {
    quote:
      "The weekly pace groups are welcoming without being intimidating. It feels like a real community, not a performance club.",
    name: "Marcus T.",
    role: "Half marathon coach",
  },
  {
    quote:
      "I came for the group run and stayed for the accountability. There’s always someone to show up with you.",
    name: "Aisha L.",
    role: "Marathon trainee",
  },
];

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  autoplay = true,
  autoplayDelay = 5000,
  className,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, testimonials.length]);

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={cn("mx-auto max-w-3xl", className)}>
      <Card className="border-border bg-surface">
        <CardContent className="relative p-8 sm:p-10">
          <div className="mb-6 flex items-center justify-between">
            <Quote className="h-8 w-8 text-[#F4C95D]" />
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" aria-label="Previous quote" onClick={prev}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" aria-label="Next quote" onClick={next}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <p className="text-xl leading-8 text-foreground sm:text-2xl">“{current.quote}”</p>
              <div>
                <p className="text-lg font-semibold text-foreground">{current.name}</p>
                <p className="text-sm uppercase tracking-[0.18em] text-muted">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
