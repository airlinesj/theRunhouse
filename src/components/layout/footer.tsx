import Link from "next/link";

import { Button } from "@/components/ui/button";

const whatsappMemberLink = "https://wa.me/263771371597?text=Hi%20I%20want%20to%20join%20theRunhouse";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_1.1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4C95D] text-xs font-black uppercase tracking-[0.2em] text-[#1B2A4A]">
              TR
            </div>
            <div className="leading-none">
              <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-muted">the</span>
              <span className="block text-base font-black tracking-[-0.08em] text-foreground">Runhouse</span>
            </div>
          </div>
          <p className="max-w-md text-sm text-muted">
            Building a citywide running community where every stride feels like momentum.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">Explore</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/schedule" className="hover:text-foreground">Schedule</Link></li>
            <li><Link href="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link href="/membership" className="hover:text-foreground">Membership</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">Stay connected</h3>
          <p className="mb-5 max-w-sm text-sm leading-6 text-muted">
            Get club updates directly from the team by email or WhatsApp.
          </p>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <a href="mailto:jairlines3@gmail.com?subject=theRunhouse%20updates">Email the club</a>
            </Button>
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <a href={whatsappMemberLink} target="_blank" rel="noreferrer">WhatsApp</a>
            </Button>
          </div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="https://www.instagram.com/therunhouse___?stkn=MXJud2RxazJhOGg%3D&utm_source=qr" target="_blank" rel="noreferrer">Instagram</Link>
            </Button>
          </div>
          <p className="text-sm text-muted">© 2026 theRunhouse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
