import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#F4C95D]">404</p>
      <h1 className="text-4xl font-black tracking-[-0.08em] text-foreground sm:text-6xl">This route is off the map.</h1>
      <p className="mt-5 max-w-xl text-base text-muted">
        The page you’re looking for doesn’t exist in theRunhouse yet, but there’s always another run to join.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/schedule">View schedule</Link>
        </Button>
      </div>
    </div>
  );
}
