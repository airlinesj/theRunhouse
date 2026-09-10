"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

const whatsappMemberLink = "https://wa.me/263771371597?text=Hi%20I%20want%20to%20join%20theRunhouse";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(27,42,74,0.8)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="theRunhouse home">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F4C95D]/50 bg-[#F4C95D]/10 text-xs font-black uppercase tracking-[0.2em] text-[#F4C95D]">
            TR
          </div>
          <div className="leading-none">
            <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-muted">the</span>
            <span className="block text-base font-black tracking-[-0.08em] text-foreground">Runhouse</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition",
                  isActive ? "text-accent" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" asChild className="h-11 px-5 text-sm">
            <a href={whatsappMemberLink} target="_blank" rel="noreferrer">
              Join the Run
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface px-5 pb-8 pt-6">
              <div className="mt-4 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F4C95D]/50 bg-[#F4C95D]/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#F4C95D]">
                    TR
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Menu</span>
                </div>
              </div>

              <motion.nav
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-8 flex flex-col gap-2"
              >
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex rounded-xl px-3 py-3 text-lg font-medium transition",
                          isActive ? "bg-[rgba(255,107,74,0.12)] text-accent" : "text-muted hover:bg-[rgba(244,237,228,0.04)] hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <Button asChild className="mt-4 h-12 w-full text-base" onClick={() => setMenuOpen(false)}>
                  <a href={whatsappMemberLink} target="_blank" rel="noreferrer">
                    Join the Run
                  </a>
                </Button>
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
