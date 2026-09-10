import type { Metadata } from "next";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata: Metadata = {
  title: "Membership",
  description: "A social running club for young adults with easy km, city energy, and a welcoming crew.",
  openGraph: {
    title: "theRunhouse membership",
    description: "A social running club for young adults with easy km, city energy, and a welcoming crew.",
    images: ["https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80"],
  },
};

const faqs = [
  { question: "Do I need to be fast to join?", answer: "No. We design every session for mixed abilities and supportive pacing, so you can show up at your level and still feel part of the crew." },
  { question: "Where do runs start?", answer: "Our launch run starts at Resim Mall, and upcoming sessions are set to keep Karina in the mix while details are announced." },
  { question: "Is this more social than performance-focused?", answer: "Yes. theRunhouse is built for young adults who want community energy, easy km, and a fun place to stay consistent." },
  { question: "Can I join without a training plan?", answer: "Absolutely. Many members come for the lifestyle, the accountability, and the social momentum rather than structured race training." },
];

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Membership"
        title="A better way to run with the city"
        description="theRunhouse is a social running community for young adults — built around easy km, good energy, and a crew that actually shows up."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-border bg-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C95D]">What you get</p>
          <ul className="mt-6 space-y-4 text-base text-foreground">
            <li>• Weekly social and pace-based runs</li>
            <li>• Easy startup logistics from Resim Mall, with Karina sessions planned as we grow</li>
            <li>• A welcoming crew for young adults who want consistency and connection</li>
            <li>• Event access, coffee runs, and community check-ins</li>
          </ul>
          <Button className="mt-8" asChild>
            <a href="https://wa.me/263771371597?text=Hi%20I%20want%20to%20join%20theRunhouse" target="_blank" rel="noreferrer">
              Join the crew
            </a>
          </Button>
        </div>

        <div className="rounded-[28px] border border-border bg-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C95D]">Why the crew loves it</p>
          <p className="mt-6 text-lg leading-8 text-muted">
            We keep it intentional: accessible routes, good pacing, no pressure to be fast, and plenty of moments that feel just as social as they do athletic.
          </p>
          <div className="mt-6 space-y-3 text-sm text-foreground">
            <div className="rounded-2xl border border-border bg-[rgba(27,42,74,0.8)] px-4 py-3">Launch run is at Resim Mall loop, Saturday 26 September.</div>
            <div className="rounded-2xl border border-border bg-[rgba(27,42,74,0.8)] px-4 py-3">Routes are designed for easy city kms and consistent weekly momentum.</div>
            <div className="rounded-2xl border border-border bg-[rgba(27,42,74,0.8)] px-4 py-3">The vibe is social, relaxed, and built for momentum.</div>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Everything you need to know" />
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
