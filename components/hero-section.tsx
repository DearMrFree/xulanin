"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Leaf } from "lucide-react";

const trustBadges = [
  { icon: Sparkles, text: "Handcrafted" },
  { icon: Heart, text: "Made with Love" },
  { icon: Leaf, text: "Natural Ingredients" },
];

const marqueeItems = [
  "Trail Mixes",
  "Energy Bites",
  "Plantain Chips",
  "Granola",
  "Nut Clusters",
  "Fruit Leather",
  "Crackers",
  "Caramel Corn",
];

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--primary)]/5" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--primary)]/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-12 relative">
        <div className="flex flex-wrap items-center gap-6 mb-12">
          {trustBadges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
            >
              <badge.icon size={16} className="text-[var(--primary)]" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-8">
            <span className="inline-block text-xs tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-4 py-2 rounded-full">
              San Jose, CA | Est. 2026
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl leading-tight text-[var(--foreground)]">
              Snacks That{" "}
              <span className="text-[var(--primary)]">Spark Joy</span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-lg">
              Handcrafted with premium ingredients and boundless love. From
              sweet bites to savory crunch, every Xubie snack is a celebration
              of flavor, culture, and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                Order Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#menu"
                className="inline-flex items-center justify-center px-8 py-4 border border-[var(--foreground)]/20 text-[var(--foreground)] rounded-full hover:bg-[var(--foreground)]/5 transition-colors"
              >
                Explore the Menu
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center p-8 animate-float">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🥜</div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        Golden Crunch
                      </p>
                    </div>
                  </div>
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--primary)]/10 flex items-center justify-center p-6" style={{ animationDelay: "1s" }}>
                    <div className="text-center">
                      <div className="text-5xl mb-2">🌿</div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        Wellness Bites
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--warm)]/30 flex items-center justify-center p-6" style={{ animationDelay: "0.5s" }}>
                    <div className="text-center">
                      <div className="text-5xl mb-2">🍫</div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        Sweet Bites
                      </p>
                    </div>
                  </div>
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--warm)]/20 to-[var(--accent)]/20 flex items-center justify-center p-8 animate-float" style={{ animationDelay: "1.5s" }}>
                    <div className="text-center">
                      <div className="text-6xl mb-2">🌶️</div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        Savory Crunch
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[var(--background)]/95 backdrop-blur-sm px-6 py-3 rounded-full border border-[var(--border)] shadow-lg">
                <p className="text-sm text-[var(--muted-foreground)]">
                  <span className="font-semibold text-[var(--primary)]">12</span>{" "}
                  handcrafted flavors &{" "}
                  <span className="font-semibold text-[var(--primary)]">counting</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {marqueeItems.map((item, i) => (
                  <span
                    key={`${setIndex}-${i}`}
                    className="px-8 py-3 text-sm text-[var(--muted-foreground)] whitespace-nowrap"
                  >
                    {item}
                    <span className="mx-8 text-[var(--primary)]">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
