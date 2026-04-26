"use client";
import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { XUBIE_DATA } from "@/lib/data";
import { useCart } from "@/lib/cart";
import {
  Plus,
  Minus,
  ShoppingBag,
  Star,
  Trash2,
  ArrowRight,
  X,
  Check,
} from "lucide-react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [orderId, setOrderId] = useState("");
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const filteredProducts =
    activeCategory === "all"
      ? XUBIE_DATA.products
      : XUBIE_DATA.products.filter((p) => p.category === activeCategory);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus("submitting");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          customer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOrderId(data.orderId);
      setOrderStatus("success");
      clearCart();
    } catch {
      setOrderStatus("error");
    }
  };

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
              Full Menu
            </span>
            <h1 className="font-serif text-4xl lg:text-6xl mt-4 text-[var(--foreground)]">
              Choose Your{" "}
              <span className="text-[var(--primary)]">Favorites</span>
            </h1>
            <p className="text-[var(--muted-foreground)] mt-4 max-w-lg mx-auto">
              Every snack is handcrafted in small batches. Add to cart and
              we&apos;ll prepare your order fresh.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--primary)]/10"
              }`}
            >
              All Snacks
            </button>
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

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const cartItem = items.find((i) => i.id === product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-square relative overflow-hidden bg-[var(--muted)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                                : tag === "spicy"
                                  ? "bg-red-500/90 text-white"
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
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
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
                      {cartItem ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                cartItem.quantity - 1
                              )
                            }
                            className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--primary)]/10 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                cartItem.quantity + 1
                              )
                            }
                            className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center hover:opacity-90 transition-opacity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
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
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating cart button */}
          {itemCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-2xl hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              <ShoppingBag size={20} />
              <span className="font-medium">
                {itemCount} item{itemCount !== 1 ? "s" : ""} &middot; $
                {total.toFixed(2)}
              </span>
              <ArrowRight size={16} />
            </button>
          )}

          {/* Cart drawer */}
          {showCart && (
            <div className="fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowCart(false)}
              />
              <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--background)] shadow-2xl flex flex-col">
                <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[var(--foreground)]">
                    Your Cart
                  </h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-[var(--secondary)] rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.length === 0 ? (
                    <p className="text-center text-[var(--muted-foreground)] py-12">
                      Your cart is empty
                    </p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-[var(--foreground)]">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full bg-[var(--secondary)] flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[var(--primary)] w-16 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                {items.length > 0 && (
                  <div className="p-6 border-t border-[var(--border)] space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-[var(--primary)]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Checkout modal */}
          {showCheckout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowCheckout(false)}
              />
              <div className="relative bg-[var(--background)] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-[var(--secondary)] rounded-full"
                >
                  <X size={20} />
                </button>

                {orderStatus === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2">
                      Order Confirmed!
                    </h3>
                    <p className="text-[var(--muted-foreground)] mb-4">
                      Your order <strong>{orderId}</strong> has been placed.
                      We&apos;ll start crafting your snacks right away!
                    </p>
                    <button
                      onClick={() => {
                        setShowCheckout(false);
                        setOrderStatus("idle");
                      }}
                      className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition-opacity"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl text-[var(--foreground)] mb-6">
                      Checkout
                    </h2>
                    <div className="mb-6 p-4 bg-[var(--secondary)] rounded-xl">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {items.length} item{items.length !== 1 ? "s" : ""}{" "}
                        &middot;{" "}
                        <span className="font-semibold text-[var(--primary)]">
                          ${total.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.name}
                          onChange={(e) =>
                            setCustomer((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                          placeholder="Nina Lux"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={customer.email}
                            onChange={(e) =>
                              setCustomer((p) => ({
                                ...p,
                                email: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={customer.phone}
                            onChange={(e) =>
                              setCustomer((p) => ({
                                ...p,
                                phone: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          value={customer.address}
                          onChange={(e) =>
                            setCustomer((p) => ({
                              ...p,
                              address: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                          placeholder="123 Main St, San Jose, CA"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                          Special Instructions
                        </label>
                        <textarea
                          value={customer.notes}
                          onChange={(e) =>
                            setCustomer((p) => ({
                              ...p,
                              notes: e.target.value,
                            }))
                          }
                          rows={2}
                          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 resize-none"
                          placeholder="Allergies, preferences, etc."
                        />
                      </div>

                      {orderStatus === "error" && (
                        <div className="p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-xl">
                          <p className="text-sm text-[var(--destructive)]">
                            Something went wrong. Please try again.
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={orderStatus === "submitting"}
                        className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {orderStatus === "submitting"
                          ? "Placing Order..."
                          : `Place Order — $${total.toFixed(2)}`}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
