export default function ScheduleLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded-full bg-[rgba(244,237,228,0.12)]" />
        <div className="h-12 w-full max-w-lg animate-pulse rounded-2xl bg-[rgba(244,237,228,0.12)]" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded-xl bg-[rgba(244,237,228,0.12)]" />
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-10 w-24 animate-pulse rounded-full bg-[rgba(244,237,228,0.12)]" />
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-[28px] border border-border bg-surface p-4">
            <div className="h-52 animate-pulse rounded-[20px] bg-[rgba(244,237,228,0.12)]" />
            <div className="mt-5 h-5 w-2/3 animate-pulse rounded-full bg-[rgba(244,237,228,0.12)]" />
            <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-[rgba(244,237,228,0.12)]" />
            <div className="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-[rgba(244,237,228,0.12)]" />
            <div className="mt-6 flex justify-between">
              <div className="h-4 w-20 animate-pulse rounded-full bg-[rgba(244,237,228,0.12)]" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-[#F4C95D]/12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
