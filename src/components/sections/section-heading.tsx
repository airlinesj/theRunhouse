import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const text = subtitle ?? description;

  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#F4C95D]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black tracking-[-0.08em] text-foreground sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted">{text}</p> : null}
    </div>
  );
}
