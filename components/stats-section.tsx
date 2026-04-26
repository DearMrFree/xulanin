"use client";
import { useEffect, useRef, useState } from "react";
import { XUBIE_DATA } from "@/lib/data";

const stats = [
  {
    value: XUBIE_DATA.company.stats.flavors,
    suffix: "+",
    label: "Handcrafted Flavors",
  },
  {
    value: XUBIE_DATA.company.stats.happyCustomers,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    value: XUBIE_DATA.company.stats.eventsServed,
    suffix: "+",
    label: "Events Served",
  },
  {
    value: XUBIE_DATA.company.stats.satisfactionRate,
    suffix: "%",
    label: "Satisfaction Rate",
  },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const start = performance.now();
          function step(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="font-serif text-4xl lg:text-5xl text-[var(--primary)]">
      {count}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 border-y border-[var(--border)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-[var(--muted-foreground)] mt-2 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
