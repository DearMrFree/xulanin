"use client";
import { XUBIE_DATA } from "@/lib/data";
import { Search, ShoppingBag, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

const stepConfig = [
  { icon: Search,       color: "bg-amber-50 text-amber-600 border-amber-200" },
  { icon: ShoppingBag,  color: "bg-orange-50 text-[var(--primary)] border-orange-200" },
  { icon: MapPin,       color: "bg-sky-50 text-sky-600 border-sky-200" },
  { icon: Sparkles,     color: "bg-violet-50 text-violet-600 border-violet-200" },
];

export function HowItWorks() {
  return (
    <section className="py-28 bg-[var(--foreground)] text-[var(--background)] relative overflow-hidden">
      {/* Subtle noise texture effect */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, oklch(0.62 0.21 50) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.70 0.15 230) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase font-medium">
            How It Works
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--background)]">
            From Our Kitchen to{" "}
            <span className="text-gradient-warm">Your Door</span>
          </h2>
          <p className="text-[var(--background)]/60 mt-4 text-base leading-relaxed">
            Four simple steps. Zero stress. A lot of smacking.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {XUBIE_DATA.howItWorks.map((step, index) => {
            const cfg = stepConfig[index];
            const Icon = cfg.icon;
            return (
              <div
                key={step.step}
                className="relative group"
              >
                {/* Connector line */}
                {index < XUBIE_DATA.howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-0 h-px border-t border-dashed border-white/15" />
                )}

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-7 h-full group-hover:bg-white/10 transition-all duration-300">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl border ${cfg.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-mono text-[var(--background)]/40 tracking-widest">
                      0{step.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[var(--background)] mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--background)]/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-medium shadow-primary hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Start Your Order
          </Link>
          <a
            href={`https://wa.me/14086796016?text=${encodeURIComponent("Hi Xulanin! I'd like to order some snacks!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-[var(--background)] border border-white/20 rounded-full font-medium hover:bg-white/15 transition-all"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
