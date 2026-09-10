"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please use a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const emailAddress = "jairlines3@gmail.com";

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactClient() {
  const [toast, setToast] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    const subject = encodeURIComponent("theRunhouse enquiry");
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setToast("Thanks! Your email app is opening.");
    reset();
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s get you connected"
        subtitle="Ask a question, join a run, or find the right pace group for your next step."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <Card className="bg-surface">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#F4C95D]" />
                <a href={`mailto:${emailAddress}`} className="text-foreground hover:text-accent">
                  {emailAddress}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#F4C95D]" />
                <a href="https://wa.me/263771371597?text=Hi%20I%20want%20to%20reach%20theRunhouse" target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
                  +263 77 137 1597
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#F4C95D]" />
                <a href="https://maps.app.goo.gl/7yeh3mk3btZzE43t8" target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">
                  Twinalakes (Govans)
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-[24px] border border-border bg-surface p-0">
            <iframe
              title="Runhouse location map"
              src="https://www.google.com/maps?q=Twinalakes%20Govans&output=embed"
              className="h-[300px] w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <Card className="bg-surface">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">Name</label>
                <input id="name" {...register("name")} className="h-11 w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                {errors.name ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.name.message}</p> : null}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <input id="email" type="email" {...register("email")} className="h-11 w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                {errors.email ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.email.message}</p> : null}
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">How can we help?</label>
                <textarea id="message" rows={6} {...register("message")} className="w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tell us what you’re looking for..." />
                {errors.message ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.message.message}</p> : null}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {toast ? (
        <div aria-live="polite" className="fixed bottom-5 right-5 z-50 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#F4C95D]/40 bg-surface px-4 py-3 text-sm text-[#F4C95D] shadow-glow">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
