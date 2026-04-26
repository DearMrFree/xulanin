"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, Star } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";
import { useCart } from "@/lib/cart";


export function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState("signature");
  const { addItem } = useCart();
  const filteredProducts = XUBIE_DATA.products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <section id="menu" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            The Menu
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            Taste the{" "}
            <span className="text-[var(--primary)]">Collection</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4">
            Handcrafted in small batches. DM to order, pick up locally, or
            catch us at the next pop-up.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {XUBIE_DATA.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--primary)]/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[var(--muted)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg text-[var(--foreground)] leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-lg font-semibold text-[var(--primary)] shrink-0">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        category: product.category,
                      })
                    }
                    className="flex items-center gap-1.5 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <Plus size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide"
          >
            View Full Menu & Order
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
