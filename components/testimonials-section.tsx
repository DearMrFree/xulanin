"use client";
import { Star, Quote } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 bg-[var(--secondary)]/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            Reviews
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            What Our{" "}
            <span className="text-[var(--primary)]">Snack Lovers</span> Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {XUBIE_DATA.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <Quote
                size={24}
                className="text-[var(--primary)]/30 mb-4"
              />
              <p className="text-[var(--foreground)] leading-relaxed mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-[var(--foreground)]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    on {testimonial.product}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
