"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";
import { useCart } from "@/lib/cart";

const tagConfig: Record<string, string> = {
  bestseller: "bg-[var(--primary)] text-[var(--primary-foreground)]",
  new: "bg-emerald-500 text-white",
  signature: "bg-violet-500 text-white",
};

export function MenuPreview() {
  const { addItem } = useCart();

  return (
    <section id="menu" className="py-28">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase font-medium">
              The Menu
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)] leading-tight">
              Three Treats,{" "}
              <span className="text-gradient">One Mission</span>
            </h2>
            <p className="text-[var(--muted-foreground)] mt-3 text-base max-w-md">
              Handcrafted in small batches. Order via WhatsApp, DM, or right here on the site.
            </p>
          </div>
          <Link
            href="/menu"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-full text-sm font-medium text-[var(--foreground)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 transition-all self-start md:self-auto"
          >
            Full Menu
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {XUBIE_DATA.products.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden bg-[var(--muted)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold backdrop-blur-sm shadow-sm ${tagConfig[tag] ?? "bg-white/80 text-[var(--foreground)]"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Quick add button on hover */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.priceReg, size: "reg" })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/90 backdrop-blur-sm text-[var(--foreground)] text-sm font-semibold rounded-xl shadow hover:bg-white transition-colors"
                  >
                    <ShoppingBag size={15} />
                    Quick Add (Reg)
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl text-[var(--foreground)] leading-tight">
                    {product.name}
                  </h3>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-semibold text-[var(--primary)]">
                      ${product.priceReg} <span className="text-[var(--muted-foreground)] font-normal text-xs">reg</span>
                    </div>
                    <div className="text-sm font-semibold text-[var(--primary)]">
                      ${product.priceLrg} <span className="text-[var(--muted-foreground)] font-normal text-xs">lrg</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5 line-clamp-2">
                  {product.description}
                </p>

                <Link
                  href="/menu"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--secondary)] text-[var(--secondary-foreground)] text-sm font-medium rounded-xl hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all"
                >
                  Order This
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-medium shadow-primary hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Order Now
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Pickup free · Bay Area delivery available · CashApp, Zelle, Cash
          </p>
        </div>
      </div>
    </section>
  );
}
