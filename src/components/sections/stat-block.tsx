"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface StatBlockProps {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
}

export function StatBlock({ value, label, suffix = "", className }: StatBlockProps) {
  const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""));
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !Number.isFinite(numericValue)) return;

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount((numericValue * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, numericValue]);

  const displayValue =
    Number.isFinite(numericValue) && count > 0
      ? `${count.toFixed(count >= 100 ? 0 : 1)}${suffix}`
      : value;

  return (
    <div ref={ref} className={cn("rounded-2xl border border-border bg-[rgba(244,237,228,0.02)] p-5", className)}>
      <p className="text-3xl font-black tracking-[-0.08em] text-foreground">{displayValue}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
