"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const paceOptions = [
  "Under 5 min/km",
  "5–5:40 min/km",
  "5:40–6:15 min/km",
  "6:15–6:50 min/km",
  "6:50+ min/km",
  "Not sure yet",
] as const;

const joinSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  pace: z.enum(paceOptions, { errorMap: () => ({ message: "Please choose your current pace." }) }),
  emergencyContact: z.string().min(2, "Please add an emergency contact."),
  terms: z.literal(true, { errorMap: () => ({ message: "You must agree to the membership terms." }) }),
});

type JoinFormValues = z.infer<typeof joinSchema>;

export function JoinClient() {
  const [toast, setToast] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: { pace: "5:40–6:15 min/km" },
  });

  const onSubmit = (values: JoinFormValues) => {
    const whatsappMessage = encodeURIComponent(
      `Hi, I’m ${values.name}. I’d like to join theRunhouse. My email is ${values.email}. My pace is ${values.pace}. Emergency contact: ${values.emergencyContact}.`,
    );

    window.open(`https://wa.me/263771371597?text=${whatsappMessage}`, "_blank", "noopener,noreferrer");
    setToast("Thanks! WhatsApp is opening with your details.");
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Join the club"
        title="Sign up and find your crew"
        subtitle="Tell us a little about you and we’ll match you with the right run group, coach, and community."
      />

      <div className="mt-10">
        <Card className="bg-surface">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">Full name</label>
                <input id="name" {...register("name")} className="h-11 w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                {errors.name ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.name.message}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <input id="email" type="email" {...register("email")} className="h-11 w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                {errors.email ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.email.message}</p> : null}
              </div>

              <div>
                <label htmlFor="pace" className="mb-2 block text-sm font-medium text-foreground">Current pace</label>
                <select id="pace" {...register("pace")} className="h-11 w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  {paceOptions.map((option) => (
                    <option key={option} value={option} className="bg-surface text-foreground">
                      {option}
                    </option>
                  ))}
                </select>
                {errors.pace ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.pace.message}</p> : null}
              </div>

              <div>
                <label htmlFor="emergencyContact" className="mb-2 block text-sm font-medium text-foreground">Emergency contact</label>
                <input id="emergencyContact" {...register("emergencyContact")} placeholder="Name + phone number" className="h-11 w-full rounded-xl border border-border bg-[rgba(27,42,74,0.8)] px-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring" />
                {errors.emergencyContact ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.emergencyContact.message}</p> : null}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-start gap-3 text-sm text-foreground">
                  <input type="checkbox" {...register("terms")} className="mt-1 h-4 w-4 rounded border-border bg-[rgba(27,42,74,0.8)] text-accent focus:ring-ring" />
                  <span>
                    I agree to the club terms, safety waiver, and communication preferences.
                  </span>
                </label>
                {errors.terms ? <p className="mt-2 text-sm text-[#FFC3B2]">{errors.terms.message}</p> : null}
              </div>

              <div className="flex justify-end md:col-span-2">
                <Button type="submit" disabled={isSubmitting} className="min-w-48">
                  {isSubmitting ? "Submitting..." : "Join theRunhouse"}
                </Button>
              </div>
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
