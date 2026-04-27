"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[var(--secondary)]/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
              FAQ
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
              Got <span className="text-[var(--primary)]">Questions?</span>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-4">
              Can&apos;t find an answer? Chat with our AI concierge
              in the bottom-right corner for instant support!
            </p>
          </div>

          <div className="space-y-3">
            {XUBIE_DATA.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[var(--primary)] shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
