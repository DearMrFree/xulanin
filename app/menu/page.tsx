"use client";
import { useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { XUBIE_DATA } from "@/lib/data";
import { useCart, type ProductSize } from "@/lib/cart";
import {
  Plus,
  Minus,
  ShoppingBag,
  Star,
  Trash2,
  ArrowRight,
  X,
  Check,
  MessageCircle,
} from "lucide-react";

export default function MenuPage() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [orderId, setOrderId] = useState("");
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCart();

  const [selectedSizes, setSelectedSizes] = useState<Record<number, ProductSize>>(
    Object.fromEntries(XUBIE_DATA.products.map((p) => [p.id, "reg" as ProductSize]))
  );

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

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
            size: i.size,
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

  const handleWhatsAppOrder = () => {
    const summary = items
      .map(
        (i) =>
          `${i.quantity}x ${i.name} (${i.size === "lrg" ? "Large" : "Regular"}) — $${(i.price * i.quantity).toFixed(2)}`
      )
      .join("\n");
    const text = `Hi Xulanin! I'd like to order:\n\n${summary}\n\nTotal: $${total.toFixed(2)}\n\nName: ${customer.name || "TBD"}\nPhone: ${customer.phone || "TBD"}\n\nPlease confirm pickup/delivery details!`;
    window.open(
      `https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
              Our Menu
            </span>
            <h1 className="font-serif text-4xl lg:text-6xl mt-4 text-[var(--foreground)]">
              Snacks That{" "}
              <span className="text-[var(--primary)]">Smack</span>
            </h1>
            <p className="text-[var(--muted-foreground)] mt-4 max-w-lg mx-auto">
              Three signature treats, handcrafted in small batches.
              Pick your size and order fresh.
            </p>
          </div>

          {/* Product cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {XUBIE_DATA.products.map((product) => {
              const size = selectedSizes[product.id];
              const price = size === "lrg" ? product.priceLrg : product.priceReg;
              const cartItem = items.find(
                (i) => i.id === product.id && i.size === size
              );

              return (
                <div
                  key={product.id}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square relative overflow-hidden bg-[var(--muted)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium backdrop-blur-sm ${
                            tag === "bestseller"
                              ? "bg-[var(--primary)]/90 text-[var(--primary-foreground)]"
                              : tag === "new"
                                ? "bg-[var(--accent)]/90 text-[var(--accent-foreground)]"
                                : "bg-white/80 text-[var(--foreground)]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Star rating */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Size selector */}
                    <div className="flex gap-2 mb-5">
                      <button
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [product.id]: "reg",
                          }))
                        }
                        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                          size === "reg"
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                            : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--primary)]/10"
                        }`}
                      >
                        Reg ${product.priceReg}
                      </button>
                      <button
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [product.id]: "lrg",
                          }))
                        }
                        className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                          size === "lrg"
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg"
                            : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--primary)]/10"
                        }`}
                      >
                        Lrg ${product.priceLrg}
                      </button>
                    </div>

                    {/* Add / quantity controls */}
                    {cartItem ? (
                      <div className="flex items-center justify-between bg-[var(--secondary)] rounded-xl p-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              size,
                              cartItem.quantity - 1
                            )
                          }
                          className="w-10 h-10 rounded-lg bg-[var(--background)] flex items-center justify-center hover:bg-[var(--primary)]/10 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-lg font-semibold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              size,
                              cartItem.quantity + 1
                            )
                          }
                          className="w-10 h-10 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price,
                            size,
                          })
                        }
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity"
                      >
                        <Plus size={18} />
                        Add to Order — ${price}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mt-16">
            <p className="text-[var(--muted-foreground)] mb-4">
              Prefer to order directly? Message us on WhatsApp!
            </p>
            <a
              href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Order via WhatsApp
            </a>
          </div>

          {/* Floating cart button */}
          {itemCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-6 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-2xl hover:opacity-90 transition-opacity animate-pulse-glow"
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
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowCart(false)}
              />
              <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--background)] shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                  <h2 className="font-serif text-2xl">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <p className="text-center text-[var(--muted-foreground)] mt-8">
                      Your cart is empty
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex items-center gap-4 p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {item.size === "lrg" ? "Large" : "Regular"} — ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 rounded-full bg-[var(--secondary)] flex items-center justify-center text-xs"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-xs"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-[var(--primary)] w-16 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="p-6 border-t border-[var(--border)]">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total</span>
                      <span className="text-xl font-bold text-[var(--primary)]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setShowCart(false);
                          setShowCheckout(true);
                        }}
                        className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={() => {
                          setShowCart(false);
                          handleWhatsAppOrder();
                        }}
                        className="w-full py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Order via WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Checkout modal */}
          {showCheckout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => {
                  setShowCheckout(false);
                  setOrderStatus("idle");
                }}
              />
              <div className="relative bg-[var(--background)] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl">Checkout</h2>
                    <button
                      onClick={() => {
                        setShowCheckout(false);
                        setOrderStatus("idle");
                      }}
                      className="p-2 hover:bg-[var(--secondary)] rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {orderStatus === "success" ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-green-600" />
                      </div>
                      <h3 className="font-serif text-2xl mb-2">
                        Order Confirmed!
                      </h3>
                      <p className="text-[var(--muted-foreground)] mb-2">
                        Your order ID: <strong>{orderId}</strong>
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)] mb-4">
                        Pay via CashApp: <strong>{XUBIE_DATA.company.cashapp}</strong>
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)] mb-6">
                        We&apos;ll confirm via WhatsApp or email shortly.
                      </p>
                      <button
                        onClick={() => {
                          setShowCheckout(false);
                          setOrderStatus("idle");
                        }}
                        className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCheckout}>
                      <div className="bg-[var(--secondary)] rounded-xl p-4 mb-6">
                        <p className="text-sm font-medium">
                          {itemCount} item{itemCount !== 1 ? "s" : ""} &middot;{" "}
                          <span className="text-[var(--primary)]">
                            ${total.toFixed(2)}
                          </span>
                        </p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={customer.name}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={customer.email}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
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
                              setCustomer((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Delivery Address
                          </label>
                          <input
                            type="text"
                            value={customer.address}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="For delivery orders"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Special Instructions
                          </label>
                          <textarea
                            value={customer.notes}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                notes: e.target.value,
                              }))
                            }
                            rows={2}
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 resize-none"
                            placeholder="Any special requests?"
                          />
                        </div>
                      </div>

                      {orderStatus === "error" && (
                        <div className="mb-4 p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-xl">
                          <p className="text-sm text-[var(--destructive)]">
                            Something went wrong. Please try again or order via
                            WhatsApp.
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        <button
                          type="submit"
                          disabled={orderStatus === "submitting"}
                          className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                          {orderStatus === "submitting"
                            ? "Placing Order..."
                            : `Place Order — $${total.toFixed(2)}`}
                        </button>
                        <button
                          type="button"
                          onClick={handleWhatsAppOrder}
                          className="w-full py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={18} />
                          Or Order via WhatsApp
                        </button>
                      </div>

                      <p className="text-xs text-center text-[var(--muted-foreground)] mt-4">
                        Payment via CashApp ({XUBIE_DATA.company.cashapp}) or at pickup
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
