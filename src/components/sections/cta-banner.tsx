import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CTABannerProps {
  eyebrow?: string;
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}

const whatsappMemberLink = "https://wa.me/263771371597?text=Hi%20I%20want%20to%20become%20a%20member%20of%20theRunhouse";

export function CTABanner({
  eyebrow = "Join the club",
  title = "Lace up and meet your next running crew.",
  primaryHref = whatsappMemberLink,
  primaryLabel = "Become a member",
  secondaryHref = "/contact",
  secondaryLabel = "Ask a question",
  className,
}: CTABannerProps) {
  return (
    <Card className={cn("w-full overflow-hidden bg-surface-strong shadow-glow", className)}>
      <CardContent className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#F4C95D]">{eyebrow}</p>
          <h2 className="text-3xl font-black tracking-[-0.08em] text-foreground sm:text-5xl">{title}</h2>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full justify-center sm:w-auto">
            <a href={primaryHref} target="_blank" rel="noreferrer">
              {primaryLabel}
            </a>
          </Button>
          <Button variant="secondary" asChild size="lg" className="w-full justify-center sm:w-auto">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
