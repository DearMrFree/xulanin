"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, Flame, TrendingUp } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useState } from "react";

const tagConfig: Record<string, string> = {
  bestseller: "bg-[var(--primary)] text-[var(--primary-foreground)]",
  new: "bg-emerald-500 text-white",
  signature: "bg-violet-500 text-white",
};

const productReviews: Record<number, string> = {
  1: '"The cup that keeps showing up in everyone\'s reaction videos"',
  2: '"The Biscoff crumble is the upgrade nobody asked for but everyone loves"',
  3: '"Try it once and you\'ll immediately start telling your friends"',
};

export function MenuPreview() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  function handleQuickAdd(product: typeof XUBIE_DATA.products[0]) {
    addItem({ id: product.id, name: product.name, price: product.priceReg, size: "reg" });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  }

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
            Full Menu & Order
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {XUBIE_DATA.products.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden card-hover flex flex-col"
            >
              {/* Image with gradient overlay */}
              <div className="relative overflow-hidden h-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.gradientOverlay}`} />

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

                {/* Weekly orders badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Flame size={10} className="text-orange-400" />
                  {product.weeklyOrders} this week
                </div>

                {/* Product name + emoji overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-white text-xl leading-tight">{product.name}</h3>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-3xl leading-none">{product.emoji}</span>
                  </div>
                </div>

                {/* Quick add on hover */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all ${
                      addedId === product.id
                        ? "bg-emerald-500 text-white"
                        : "bg-white/95 backdrop-blur-sm text-[var(--foreground)] hover:bg-white"
                    }`}
                  >
                    {addedId === product.id ? (
                      <>✓ Added to bag!</>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        Quick Add (Reg ${product.priceReg})
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Pricing */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-[var(--primary)]">${product.priceReg}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">reg</span>
                  </div>
                  <span className="text-[var(--border)]">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-[var(--primary)]">${product.priceLrg}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">lrg</span>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} />
                    Popular
                  </span>
                </div>

                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3 line-clamp-2 flex-1">
                  {product.description}
                </p>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.ingredients.slice(0, 3).map((ing) => (
                    <span
                      key={ing}
                      className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full font-medium border border-amber-100"
                    >
                      {ing}
                    </span>
                  ))}
                </div>

                {/* Review snippet */}
                <p className="text-[11px] text-[var(--muted-foreground)] italic mb-4 line-clamp-1">
                  {productReviews[product.id]}
                </p>

                <Link
                  href="/menu"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-primary"
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
            className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-semibold shadow-primary hover:opacity-90 active:scale-[0.97] transition-all text-base"
          >
            View Full Menu & Order Now
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Free pickup · Bay Area delivery · CashApp, Zelle, Cash
          </p>
        </div>
      </div>
    </section>
  );
}
