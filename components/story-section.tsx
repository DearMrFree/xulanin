"use client";
import Image from "next/image";
import { XUBIE_DATA } from "@/lib/data";
import { GraduationCap, Sparkles, Heart, Bot } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "School of AI Founder",
    desc: "Building a real consumer brand through entrepreneurship and human flourishing.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: Sparkles,
    title: "Booth as Experience",
    desc: "Every table is designed to feel memorable before the first bite lands.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: Heart,
    title: "Community Pull",
    desc: "Friends, families, kids, and creators naturally gather around the brand.",
    color: "text-rose-600 bg-rose-50",
  },
  {
    icon: Bot,
    title: "AI-Backed Growth",
    desc: "Xuliani supports ordering, discovery, and digital hospitality behind the scenes.",
    color: "text-sky-600 bg-sky-50",
  },
];

export function StorySection() {
  return (
    <section id="story" className="py-28 relative overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.21 50), transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — copy */}
          <div>
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase font-medium">
              Our Story
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)] leading-tight">
              Built in Public,{" "}
              <span className="text-gradient">Loved in Person</span>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-6 leading-relaxed text-base">
              {XUBIE_DATA.company.story}
            </p>

            {/* Founder card */}
            <div className="mt-10 p-6 bg-gradient-to-br from-[var(--secondary)] to-[var(--card)] rounded-3xl border border-[var(--border)] shadow-sm">
              <div className="flex items-start gap-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[var(--primary)]/20 shrink-0 shadow-md">
                  <Image
                    src="/branding/xubie-logo.png"
                    alt="Xubie Snacks logo"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-lg text-[var(--foreground)]">
                    {XUBIE_DATA.founder.name}
                  </h4>
                  <p className="text-xs text-[var(--primary)] tracking-wide uppercase font-medium mb-3">
                    {XUBIE_DATA.founder.title}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {XUBIE_DATA.founder.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Credential badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)]/8 rounded-full text-sm text-[var(--primary)] font-medium">
                <GraduationCap size={13} />
                {XUBIE_DATA.founder.professor}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-full text-sm text-sky-700 font-medium">
                <Bot size={13} />
                {XUBIE_DATA.founder.engineer}
              </div>
              <div className="px-4 py-2 bg-[var(--secondary)] rounded-full text-sm text-[var(--secondary-foreground)]">
                {XUBIE_DATA.founder.school}
              </div>
            </div>
          </div>

          {/* Right — image + highlight grid */}
          <div className="space-y-5">
            {/* Hero image */}
            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-xl">
              <Image
                src="/branding/community-hero.jpeg"
                alt="Xubie Snacks full booth setup at a community event"
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 text-white">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
                  Real-World Proof
                </p>
                <p className="font-serif text-xl leading-snug">
                  The brand already knows how to gather people around a table.
                </p>
              </div>
            </div>

            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl card-hover group"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-serif text-sm text-[var(--foreground)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
