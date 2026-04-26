"use client";
import { XUBIE_DATA } from "@/lib/data";
import { Search, Package, Truck, PartyPopper } from "lucide-react";

const stepIcons = [Search, Package, Truck, PartyPopper];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[var(--secondary)]/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            How It Works
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            From Our Kitchen to{" "}
            <span className="text-[var(--primary)]">Your Door</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {XUBIE_DATA.howItWorks.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={step.step} className="relative text-center group">
                {index < XUBIE_DATA.howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-[var(--primary)]/20" />
                )}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center group-hover:bg-[var(--primary)]/20 transition-colors">
                  <Icon size={28} className="text-[var(--primary)]" />
                </div>
                <div className="text-xs text-[var(--primary)] font-mono mb-2">
                  Step {step.step}
                </div>
                <h3 className="font-serif text-xl text-[var(--foreground)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
