"use client";
import { useEffect, useRef, useState } from "react";
import { XUBIE_DATA } from "@/lib/data";
import { TrendingUp, Users, Video, Star } from "lucide-react";

const stats = [
  {
    icon: Video,
    value: XUBIE_DATA.company.stats.tiktokVideos,
    suffix: "",
    label: "TikTok Videos",
    sub: "@xubiesnacks",
    color: "from-pink-500/10 to-rose-500/5",
    iconColor: "text-pink-500",
  },
  {
    icon: TrendingUp,
    value: XUBIE_DATA.company.stats.tiktokLikes,
    suffix: "",
    label: "TikTok Likes",
    sub: "and counting",
    color: "from-orange-500/10 to-amber-500/5",
    iconColor: "text-[var(--primary)]",
  },
  {
    icon: Users,
    value: XUBIE_DATA.company.stats.followers + XUBIE_DATA.company.stats.tiktokFollowers,
    suffix: "+",
    label: "Social Followers",
    sub: "Instagram + TikTok",
    color: "from-violet-500/10 to-purple-500/5",
    iconColor: "text-violet-500",
  },
  {
    icon: Star,
    value: XUBIE_DATA.company.stats.popUps,
    suffix: "+",
    label: "Pop-Ups & Events",
    sub: "Bay Area & beyond",
    color: "from-sky-500/10 to-blue-500/5",
    iconColor: "text-sky-500",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
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
          const duration = 2200;
          const start = performance.now();
          function step(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="font-serif text-4xl lg:text-5xl text-[var(--foreground)] tabular-nums">
      {count.toLocaleString()}
      <span className="text-[var(--primary)]">{suffix}</span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 border-y border-[var(--border)] bg-warm-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase font-medium">
            By the Numbers
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl mt-3 text-[var(--foreground)]">
            A Brand That Moves
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`relative rounded-3xl bg-gradient-to-br ${stat.color} border border-[var(--border)] p-6 lg:p-8 card-hover group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shadow-sm ${stat.iconColor}`}>
                  <stat.icon size={18} />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/40 group-hover:bg-[var(--primary)] transition-colors" />
              </div>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm font-semibold text-[var(--foreground)] mt-1">{stat.label}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
