export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 text-sm text-muted shadow-glow">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#F4C95D]" />
        Loading theRunhouse...
      </div>
    </div>
  );
}
