"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";

export function MenuPreview() {
  return (
    <section id="menu" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            The Menu
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            Three Treats,{" "}
            <span className="text-[var(--primary)]">One Mission</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4">
            Handcrafted in small batches. Order via WhatsApp, DM, or right here
            on the site.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {XUBIE_DATA.products.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[var(--muted)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium backdrop-blur-sm ${
                        tag === "bestseller"
                          ? "bg-[var(--primary)]/90 text-[var(--primary-foreground)]"
                          : tag === "new"
                            ? "bg-[var(--accent)]/90 text-[var(--accent-foreground)]"
                            : "bg-white/70 text-[var(--foreground)]"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-[var(--foreground)] mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[var(--primary)] font-semibold">
                    Reg ${product.priceReg}
                  </span>
                  <span className="text-[var(--muted-foreground)]">|</span>
                  <span className="text-[var(--primary)] font-semibold">
                    Lrg ${product.priceLrg}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
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

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm font-medium"
          >
            Order Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
