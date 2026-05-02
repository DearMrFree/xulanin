"use client";
import { Star, Quote } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";

const avatarColors = [
  "bg-orange-100 text-orange-600",
  "bg-violet-100 text-violet-600",
  "bg-sky-100 text-sky-600",
  "bg-emerald-100 text-emerald-600",
];

const extraTestimonials = [
  {
    name: "Instagram follower",
    text: "Followed them for two weeks before finally showing up to a pop-up — worth every second of the wait. Banana pudding hit differently than anything I expected.",
    rating: 5,
    product: "Banana Pudding",
  },
  {
    name: "First-time customer",
    text: "Ordered through WhatsApp in under 60 seconds. Pickup was smooth and the Xubie Cake packaging looked like something out of a real bakery. Impressive for a pop-up brand.",
    rating: 5,
    product: "Xubie Cake",
  },
];

const allTestimonials = [...XUBIE_DATA.testimonials, ...extraTestimonials];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--secondary)]/60 via-[var(--secondary)]/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase font-medium">
            What People Say
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            Snack Lovers <span className="text-gradient">Don&apos;t Lie</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 text-base">
            Real words from real people who showed up, tasted, and told their friends.
          </p>
          {/* Stars aggregate */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-[var(--foreground)]">5.0</span>
            <span className="text-sm text-[var(--muted-foreground)]">· 100% approval rating</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allTestimonials.map((t, index) => {
            const initials = t.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            const colorClass = avatarColors[index % avatarColors.length];
            return (
              <div
                key={index}
                className="group relative bg-[var(--card)] border border-[var(--border)] rounded-3xl p-7 card-hover"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={32} className="text-[var(--primary)]" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-[var(--foreground)] leading-relaxed text-sm mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
                  <div className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center text-xs font-bold shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{t.name}</p>
                    <p className="text-xs text-[var(--primary)]">on {t.product}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://www.instagram.com/xubie_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 transition-all"
          >
            See more on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
