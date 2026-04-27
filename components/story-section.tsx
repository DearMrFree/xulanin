"use client";
import Image from "next/image";
import { XUBIE_DATA } from "@/lib/data";
import { GraduationCap, Sparkles, Heart, Bot } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "School of AI Founder",
    desc: "Building a real consumer brand through entrepreneurship and human flourishing.",
  },
  {
    icon: Sparkles,
    title: "Booth as Experience",
    desc: "Every table is designed to feel memorable before the first bite lands.",
  },
  {
    icon: Heart,
    title: "Community Pull",
    desc: "Friends, families, kids, and creators naturally gather around the brand.",
  },
  {
    icon: Bot,
    title: "AI-Powered Tools",
    desc: "The Xuliani AI agent supports ordering, discovery, and digital hospitality behind the scenes.",
  },
];

export function StorySection() {
  return (
    <section id="story" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
              Our Story
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
              Built in Public, <span className="text-[var(--primary)]">Loved in Person</span>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-6 leading-relaxed">
              {XUBIE_DATA.company.story}
            </p>
            <div className="mt-8 p-6 bg-[var(--secondary)] rounded-2xl border border-[var(--border)]">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-[var(--primary)]/20">
                  <Image
                    src="/images/xubie-logo.jpeg"
                    alt="Xubie Snacks logo badge"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[var(--foreground)]">
                    {XUBIE_DATA.founder.name}
                  </h4>
                  <p className="text-xs text-[var(--primary)] tracking-wide uppercase mb-2">
                    {XUBIE_DATA.founder.title}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {XUBIE_DATA.founder.bio}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-[var(--accent)]/10 rounded-full text-sm text-[var(--accent-foreground)]">
                Engineer: {XUBIE_DATA.founder.engineer}
              </div>
              <div className="px-4 py-2 bg-[var(--secondary)] rounded-full text-sm text-[var(--secondary-foreground)]">
                School: {XUBIE_DATA.founder.school}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden border border-[var(--border)] shadow-xl">
              <Image
                src="/branding/community-hero.jpeg"
                alt="Xubie Snacks full booth setup at a community event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/75">
                  Real-World Proof
                </p>
                <p className="font-serif text-2xl mt-2">
                  The brand already knows how to gather people around a table.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                    <item.icon size={22} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-serif text-base text-[var(--foreground)] mb-1">
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
