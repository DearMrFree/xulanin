"use client";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { XUBIE_DATA } from "@/lib/data";
import { useCart, type ProductSize } from "@/lib/cart";
import {
  type OrderType,
  type DeliveryZone,
  DELIVERY_ZONES,
  TIP_PRESETS,
  SMALL_ORDER_THRESHOLD,
  calculateFees,
  formatEstimate,
  getZoneById,
} from "@/lib/delivery";
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
  MapPin,
  Clock,
  Truck,
  Store,
  Info,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Sparkles,
  Flame,
  Share2,
  ExternalLink,
  Gift,
  Heart,
} from "lucide-react";

/* ── Toast ─────────────────────────────────────────────────── */

interface ToastState {
  show: boolean;
  name: string;
  emoji: string;
  size: string;
}

/* ── Confetti piece ─────────────────────────────────────────── */

const CONFETTI_COLORS = ["#f59e0b", "#f43f5e", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"];

function ConfettiPiece({ color, delay, left }: { color: string; delay: number; left: number }) {
  return (
    <div
      className="absolute w-3 h-3 rounded-sm animate-confetti pointer-events-none"
      style={{
        backgroundColor: color,
        animationDelay: `${delay}ms`,
        left: `${left}%`,
        top: 0,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
}

/* ── Ingredient tag colors ──────────────────────────────────── */

const tagConfig: Record<string, string> = {
  bestseller: "bg-[var(--primary)]/90 text-[var(--primary-foreground)]",
  new: "bg-emerald-500/90 text-white",
  signature: "bg-violet-500/90 text-white",
  "crowd-favorite": "bg-[var(--primary)]/90 text-[var(--primary-foreground)]",
};

export default function MenuPage() {
  /* ── Cart state ─────────────────────────────────────────── */
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState("");
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  /* ── Product size selection ─────────────────────────────── */
  const [selectedSizes, setSelectedSizes] = useState<Record<number, ProductSize>>(
    Object.fromEntries(XUBIE_DATA.products.map((p) => [p.id, "reg" as ProductSize]))
  );

  /* ── Order / delivery ───────────────────────────────────── */
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [selectedZoneId, setSelectedZoneId] = useState<string>("pickup");
  const [tipPercent, setTipPercent] = useState<number | null>(0);
  const [customTip, setCustomTip] = useState("");
  const [showZoneSelector, setShowZoneSelector] = useState(false);
  const [showFeeInfo, setShowFeeInfo] = useState(false);

  /* ── Customer info ──────────────────────────────────────── */
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", notes: "" });

  /* ── Toast ──────────────────────────────────────────────── */
  const [toast, setToast] = useState<ToastState>({ show: false, name: "", emoji: "", size: "" });

  const showToast = useCallback((name: string, emoji: string, size: ProductSize) => {
    setToast({ show: true, name, emoji, size: size === "lrg" ? "Large" : "Regular" });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
  }, []);

  /* ── Derived ────────────────────────────────────────────── */
  const selectedZone: DeliveryZone | null = useMemo(
    () => getZoneById(orderType === "pickup" ? "pickup" : selectedZoneId),
    [orderType, selectedZoneId]
  );

  const tipAmount = useMemo(() => {
    if (customTip) return Math.max(0, parseFloat(customTip) || 0);
    if (tipPercent !== null) return total * tipPercent;
    return 0;
  }, [total, tipPercent, customTip]);

  const fees = useMemo(
    () => calculateFees(total, orderType, selectedZone, tipAmount),
    [total, orderType, selectedZone, tipAmount]
  );

  const meetsMinimum = useMemo(() => {
    if (!selectedZone) return true;
    return total >= selectedZone.minimumOrder;
  }, [total, selectedZone]);

  const deliveryZones = DELIVERY_ZONES.filter((z) => z.id !== "pickup");

  /* ── Upsell: products not yet in cart ──────────────────── */
  const cartProductIds = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  const upsellProducts = useMemo(
    () => XUBIE_DATA.products.filter((p) => !cartProductIds.has(p.id)),
    [cartProductIds]
  );

  /* ── Handlers ───────────────────────────────────────────── */
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus("submitting");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, size: i.size })),
          customer,
          orderType,
          zone: selectedZone?.id,
          fees: {
            subtotal: fees.subtotal,
            deliveryFee: fees.deliveryFee,
            serviceFee: fees.serviceFee,
            smallOrderFee: fees.smallOrderFee,
            tax: fees.tax,
            tip: fees.tip,
            total: fees.total,
          },
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
      .map((i) => `${i.quantity}x ${i.name} (${i.size === "lrg" ? "Large" : "Regular"}) — $${(i.price * i.quantity).toFixed(2)}`)
      .join("\n");
    const zoneLabel = selectedZone?.name ?? "Pickup";
    const text = `Hi Xulanin! I'd like to order:\n\n${summary}\n\nSubtotal: $${total.toFixed(2)}\nOrder type: ${orderType === "pickup" ? "Pickup" : `Delivery (${zoneLabel})`}\nEstimated total: $${fees.total.toFixed(2)}\n\nName: ${customer.name || "TBD"}\nPhone: ${customer.phone || "TBD"}${customer.address ? `\nAddress: ${customer.address}` : ""}\n\nPlease confirm!`;
    window.open(`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const addTrio = (size: ProductSize) => {
    XUBIE_DATA.products.forEach((p) => {
      const price = size === "lrg" ? p.priceLrg : p.priceReg;
      addItem({ id: p.id, name: p.name, price, size });
    });
    showToast("The Xubie Trio", "🎉", size);
  };

  const shareOnWhatsApp = () => {
    const text = `Just ordered from @xubiesnacks 🍮🎂 The Banana Pudding is unreal — you have to try it! Order at xulanin.com`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <>
      <Navigation />

      {/* ── Toast notification ────────────────────────────── */}
      {toast.show && (
        <div className="fixed bottom-24 right-4 z-[60] animate-toast">
          <div className="bg-[var(--foreground)] text-[var(--background)] rounded-2xl px-4 py-3.5 shadow-2xl flex items-center gap-3 min-w-[260px] max-w-[320px]">
            <span className="text-2xl shrink-0">{toast.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{toast.name}</p>
              <p className="text-xs opacity-60">{toast.size} · Added to your bag</p>
            </div>
            <button
              onClick={() => { setShowCart(true); setToast((t) => ({ ...t, show: false })); }}
              className="text-[var(--primary)] text-xs font-bold hover:underline whitespace-nowrap shrink-0"
            >
              View Bag →
            </button>
          </div>
        </div>
      )}

      <main className="pt-20 sm:pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6">

          {/* ── Page hero ───────────────────────────────────── */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-4 py-2 rounded-full font-medium mb-4">
              <Sparkles size={12} />
              Made Fresh Daily · Orders Close {XUBIE_DATA.company.orderCutoff}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-[var(--foreground)]">
              Snacks That <span className="text-gradient">Smack</span>
            </h1>
            <p className="text-[var(--muted-foreground)] mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Three signature treats, handcrafted in small batches. Pick your size and order fresh.
            </p>
          </div>

          {/* ── Order type toggle ────────────────────────────── */}
          <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 p-1.5 bg-[var(--secondary)] rounded-2xl max-w-xs sm:max-w-sm mx-auto">
              <button
                onClick={() => { setOrderType("pickup"); setSelectedZoneId("pickup"); }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  orderType === "pickup"
                    ? "bg-[var(--background)] text-[var(--foreground)] shadow-lg"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <Store size={15} />
                Pickup
                <span className="text-[10px] sm:text-xs text-green-600 font-bold">FREE</span>
              </button>
              <button
                onClick={() => { setOrderType("delivery"); if (selectedZoneId === "pickup") setSelectedZoneId("south-bay"); }}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  orderType === "delivery"
                    ? "bg-[var(--background)] text-[var(--foreground)] shadow-lg"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <Truck size={15} />
                Delivery
              </button>
            </div>

            {selectedZone && (
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                {orderType === "pickup" ? (
                  <>
                    <span className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                      <MapPin size={14} className="text-[var(--primary)]" />
                      2095 Fruitdale Ave, San Jose
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                      <Clock size={14} className="text-[var(--primary)]" />
                      {formatEstimate(selectedZone)}
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowZoneSelector(!showZoneSelector)}
                      className="flex items-center gap-1.5 text-[var(--primary)] font-medium hover:underline"
                    >
                      <MapPin size={14} />
                      {selectedZone.name}
                      {showZoneSelector ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <span className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                      <Clock size={14} className="text-[var(--primary)]" />
                      {formatEstimate(selectedZone)}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                      <Truck size={14} className="text-[var(--primary)]" />
                      ${selectedZone.fee.toFixed(2)} delivery
                    </span>
                  </>
                )}
              </div>
            )}

            {showZoneSelector && orderType === "delivery" && (
              <div className="mt-3 max-w-lg mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xl">
                {deliveryZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => { setSelectedZoneId(zone.id); setShowZoneSelector(false); }}
                    className={`w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-[var(--secondary)] transition-colors border-b border-[var(--border)] last:border-b-0 ${
                      selectedZoneId === zone.id ? "bg-[var(--primary)]/5" : ""
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-medium ${selectedZoneId === zone.id ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}>
                        {zone.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{zone.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-sm font-semibold text-[var(--primary)]">${zone.fee.toFixed(2)}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{formatEstimate(zone)}</p>
                      {zone.minimumOrder > 0 && (
                        <p className="text-[10px] text-[var(--muted-foreground)]">Min ${zone.minimumOrder}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product cards ────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 max-w-5xl mx-auto">
            {XUBIE_DATA.products.map((product) => {
              const size = selectedSizes[product.id];
              const price = size === "lrg" ? product.priceLrg : product.priceReg;
              const cartItem = items.find((i) => i.id === product.id && i.size === size);

              return (
                <div
                  key={product.id}
                  className="group bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Image with appetite-appeal gradient overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    {/* Strong gradient overlay for appetite/brand feel */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradientOverlay}`} />

                    {/* Tags top-left */}
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      {product.tags.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold backdrop-blur-sm shadow-sm ${tagConfig[tag] ?? "bg-white/80 text-[var(--foreground)]"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Weekly orders badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      <Flame size={10} className="text-orange-400" />
                      {product.weeklyOrders} this week
                    </div>

                    {/* Product name + emoji overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-serif text-white text-xl sm:text-2xl leading-tight drop-shadow">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-white/70 text-[10px] hidden sm:inline">5.0</span>
                          </div>
                        </div>
                        <span className="text-3xl drop-shadow">{product.emoji}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-3">
                      {product.description}
                    </p>

                    {/* Review snippet */}
                    <p className="text-[11px] italic text-[var(--muted-foreground)] mb-3 border-l-2 border-[var(--primary)]/30 pl-2.5">
                      &ldquo;{product.reviewSnippet}&rdquo;
                    </p>

                    {/* Ingredient pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full font-medium border border-amber-100"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    {/* Size selector cards */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: "reg" }))}
                        className={`relative p-3 rounded-2xl text-left transition-all border-2 ${
                          size === "reg"
                            ? "border-[var(--primary)] bg-[var(--primary)]/5"
                            : "border-[var(--border)] hover:border-[var(--primary)]/30"
                        }`}
                      >
                        <span className="block text-[10px] text-[var(--muted-foreground)] mb-0.5 font-medium uppercase tracking-wide">Regular</span>
                        <span className="block text-lg font-black text-[var(--foreground)]">${product.priceReg}</span>
                        <span className="block text-[10px] text-[var(--muted-foreground)] mt-0.5">{product.servingReg}</span>
                      </button>
                      <button
                        onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: "lrg" }))}
                        className={`relative p-3 rounded-2xl text-left transition-all border-2 ${
                          size === "lrg"
                            ? "border-[var(--primary)] bg-[var(--primary)]/5"
                            : "border-[var(--border)] hover:border-[var(--primary)]/30"
                        }`}
                      >
                        <span className="absolute -top-2.5 right-2 text-[9px] bg-[var(--primary)] text-white px-2 py-0.5 rounded-full font-bold tracking-wide">BEST VALUE</span>
                        <span className="block text-[10px] text-[var(--muted-foreground)] mb-0.5 font-medium uppercase tracking-wide">Large</span>
                        <span className="block text-lg font-black text-[var(--foreground)]">${product.priceLrg}</span>
                        <span className="block text-[10px] text-[var(--muted-foreground)] mt-0.5">{product.servingLrg}</span>
                      </button>
                    </div>

                    {/* Add to cart or quantity control */}
                    <div className="mt-auto">
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-[var(--secondary)] rounded-2xl p-2">
                          <button
                            onClick={() => updateQuantity(product.id, size, cartItem.quantity - 1)}
                            className="w-10 h-10 rounded-xl bg-[var(--background)] flex items-center justify-center hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/20 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <div className="text-center">
                            <span className="text-xl font-bold">{cartItem.quantity}</span>
                            <span className="text-[10px] text-[var(--muted-foreground)] block leading-none">in bag</span>
                          </div>
                          <button
                            onClick={() => updateQuantity(product.id, size, cartItem.quantity + 1)}
                            className="w-10 h-10 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            addItem({ id: product.id, name: product.name, price, size });
                            showToast(product.name, product.emoji, size);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-2xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-primary text-sm"
                        >
                          <ShoppingBag size={16} />
                          Add to Order — ${price}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Bundle / Trio section ────────────────────────── */}
          <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white shadow-2xl">
              {/* Shimmer */}
              <div className="absolute inset-0 bundle-shimmer pointer-events-none" />
              {/* Decorative circles */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/8 pointer-events-none" />

              <div className="relative p-6 sm:p-10">
                <div className="grid sm:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                      <Gift size={12} />
                      TRY EVERYTHING
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl mb-3">
                      {XUBIE_DATA.bundle.emoji} The Xubie Trio
                    </h3>
                    <p className="text-white/85 text-sm sm:text-base mb-5 leading-relaxed">
                      One of each — Banana Pudding, Biscoff Pudding, and Xubie Cake.
                      The ultimate way to discover your favorite Xubie treat.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {XUBIE_DATA.products.map((p) => (
                        <div key={p.id} className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/25">
                          <span>{p.emoji}</span>
                          <span>{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => addTrio("reg")}
                      className="w-full bg-white text-orange-600 font-bold py-4 px-6 rounded-2xl hover:bg-orange-50 active:scale-[0.98] transition-all shadow-lg text-left"
                    >
                      <span className="block text-base">Regular Trio — ${XUBIE_DATA.bundle.priceReg}</span>
                      <span className="block text-xs font-normal text-orange-400 mt-0.5">One of each · 3 items total</span>
                    </button>
                    <button
                      onClick={() => addTrio("lrg")}
                      className="w-full bg-white/20 border-2 border-white/40 text-white font-bold py-4 px-6 rounded-2xl hover:bg-white/30 active:scale-[0.98] transition-all text-left"
                    >
                      <span className="block text-base">Large Trio — ${XUBIE_DATA.bundle.priceLrg}</span>
                      <span className="block text-xs font-normal text-white/70 mt-0.5">Generous portions · Perfect for sharing</span>
                    </button>
                    <p className="text-white/60 text-xs text-center pt-1">
                      <Heart size={10} className="inline mr-1" />
                      Most popular way to order for first-timers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Delivery zones info ──────────────────────────── */}
          <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl text-[var(--foreground)] mb-2">
                Delivery Zones &amp; Fees
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-5 sm:mb-6">
                We deliver across the Bay Area — fee based on distance from San Jose.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                {DELIVERY_ZONES.map((zone) => (
                  <div
                    key={zone.id}
                    className={`p-3 sm:p-4 rounded-xl border transition-all ${
                      zone.id === "pickup"
                        ? "border-green-300 bg-green-50"
                        : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      {zone.id === "pickup" ? (
                        <Store size={14} className="text-green-600 shrink-0" />
                      ) : (
                        <Truck size={14} className="text-[var(--primary)] shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate">
                        {zone.name}
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-[var(--primary)]">
                      {zone.fee === 0 ? "FREE" : `$${zone.fee.toFixed(2)}`}
                    </p>
                    <p className="text-[10px] sm:text-xs text-[var(--muted-foreground)] mt-1">{formatEstimate(zone)}</p>
                    {zone.minimumOrder > 0 && (
                      <p className="text-[10px] sm:text-xs text-[var(--muted-foreground)] mt-0.5">Min ${zone.minimumOrder}</p>
                    )}
                    <p className="text-[9px] sm:text-[10px] text-[var(--muted-foreground)] mt-1 leading-tight hidden sm:block">{zone.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-6 text-[10px] sm:text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5"><DollarSign size={12} className="text-[var(--primary)]" />5% service fee (max $5)</span>
                <span className="flex items-center gap-1.5"><Info size={12} className="text-[var(--primary)]" />$2 small order fee under ${SMALL_ORDER_THRESHOLD}</span>
                <span className="flex items-center gap-1.5"><DollarSign size={12} className="text-[var(--primary)]" />9.375% CA sales tax</span>
              </div>
            </div>
          </div>

          {/* ── WhatsApp CTA ─────────────────────────────────── */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-[var(--muted-foreground)] mb-4 text-sm sm:text-base">
              Prefer to order directly? Message us on WhatsApp!
            </p>
            <a
              href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 active:scale-[0.98] transition-all shadow-lg text-sm sm:text-base"
            >
              <MessageCircle size={20} />
              Order via WhatsApp
            </a>
          </div>

          {/* ── Floating cart button ─────────────────────────── */}
          {itemCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-2xl hover:opacity-90 active:scale-[0.97] transition-all animate-pulse-glow text-sm sm:text-base"
            >
              <ShoppingBag size={18} />
              <span className="font-semibold">
                {itemCount} item{itemCount !== 1 ? "s" : ""} &middot; ${fees.total.toFixed(2)}
              </span>
              <ArrowRight size={14} />
            </button>
          )}

          {/* ── Cart drawer ──────────────────────────────────── */}
          {showCart && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-[var(--background)] shadow-2xl flex flex-col">

                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border)]">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl">Your Bag</h2>
                    {itemCount > 0 && (
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
                    )}
                  </div>
                  <button onClick={() => setShowCart(false)} className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Order type toggle */}
                <div className="px-4 sm:px-6 pt-4">
                  <div className="flex gap-2 p-1 bg-[var(--secondary)] rounded-xl">
                    <button
                      onClick={() => { setOrderType("pickup"); setSelectedZoneId("pickup"); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        orderType === "pickup"
                          ? "bg-[var(--background)] text-[var(--foreground)] shadow"
                          : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      <Store size={14} />
                      Pickup <span className="text-green-600 font-bold">FREE</span>
                    </button>
                    <button
                      onClick={() => { setOrderType("delivery"); if (selectedZoneId === "pickup") setSelectedZoneId("south-bay"); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        orderType === "delivery"
                          ? "bg-[var(--background)] text-[var(--foreground)] shadow"
                          : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      <Truck size={14} />
                      Delivery
                    </button>
                  </div>

                  {orderType === "delivery" && (
                    <div className="mt-3">
                      <select
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                      >
                        {deliveryZones.map((zone) => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name} — ${zone.fee.toFixed(2)} ({formatEstimate(zone)})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedZone && (
                    <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[var(--primary)]" />
                        {formatEstimate(selectedZone)}
                      </span>
                      {orderType === "delivery" && (
                        <span className="flex items-center gap-1">
                          <Truck size={12} className="text-[var(--primary)]" />
                          ${selectedZone.fee.toFixed(2)} delivery
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {items.length === 0 ? (
                    /* ── Empty cart state ─────────────────── */
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-4xl">
                        🍮
                      </div>
                      <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
                      <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-xs">
                        Add your favorite Xubie treat to get started!
                      </p>
                      <div className="space-y-2 w-full max-w-xs">
                        {XUBIE_DATA.products.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              addItem({ id: p.id, name: p.name, price: p.priceReg, size: "reg" });
                              showToast(p.name, p.emoji, "reg");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--secondary)] hover:bg-[var(--primary)]/10 rounded-xl text-left text-sm transition-colors"
                          >
                            <span className="text-xl">{p.emoji}</span>
                            <div className="flex-1">
                              <p className="font-medium text-[var(--foreground)]">{p.name}</p>
                              <p className="text-xs text-[var(--muted-foreground)]">Reg ${p.priceReg}</p>
                            </div>
                            <Plus size={16} className="text-[var(--primary)]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.size}`}
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {item.size === "lrg" ? "Large" : "Regular"} — ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-[var(--secondary)] flex items-center justify-center text-xs"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-xs"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-[var(--primary)] w-14 sm:w-16 text-right">
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

                      {/* ── Upsell: add what's missing ──────── */}
                      {upsellProducts.length > 0 && (
                        <div className="pt-2">
                          <p className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-medium mb-2">
                            Complete the Trio
                          </p>
                          {upsellProducts.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                addItem({ id: p.id, name: p.name, price: p.priceReg, size: "reg" });
                                showToast(p.name, p.emoji, "reg");
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 mb-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left text-sm transition-colors"
                            >
                              <span className="text-lg">{p.emoji}</span>
                              <div className="flex-1">
                                <p className="font-medium text-amber-900 text-xs">{p.name}</p>
                                <p className="text-[10px] text-amber-700">Add Regular for ${p.priceReg}</p>
                              </div>
                              <Plus size={14} className="text-amber-600" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Cart footer ─────────────────────────── */}
                {items.length > 0 && (
                  <div className="p-4 sm:p-6 border-t border-[var(--border)]">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">Subtotal</span>
                        <span>${fees.subtotal.toFixed(2)}</span>
                      </div>
                      {fees.deliveryFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted-foreground)]">Delivery Fee</span>
                          <span>${fees.deliveryFee.toFixed(2)}</span>
                        </div>
                      )}
                      {orderType === "pickup" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted-foreground)]">Delivery</span>
                          <span className="text-green-600 font-semibold">FREE</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <button
                          onClick={() => setShowFeeInfo(!showFeeInfo)}
                          className="text-[var(--muted-foreground)] flex items-center gap-1 hover:text-[var(--foreground)]"
                        >
                          Service Fee <Info size={12} />
                        </button>
                        <span>${fees.serviceFee.toFixed(2)}</span>
                      </div>
                      {showFeeInfo && (
                        <p className="text-xs text-[var(--muted-foreground)] bg-[var(--secondary)] rounded-lg p-2">
                          5% service fee (capped at $5) helps cover operations and payment processing.
                        </p>
                      )}
                      {fees.smallOrderFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted-foreground)]">Small Order Fee</span>
                          <span>${fees.smallOrderFee.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">Tax</span>
                        <span>${fees.tax.toFixed(2)}</span>
                      </div>
                      {fees.tip > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted-foreground)]">Tip</span>
                          <span>${fees.tip.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-lg text-[var(--primary)]">${fees.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {!meetsMinimum && selectedZone && (
                      <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-xs text-amber-700">
                          Minimum order for {selectedZone.name} is ${selectedZone.minimumOrder}. Add ${(selectedZone.minimumOrder - total).toFixed(2)} more.
                        </p>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <button
                        onClick={() => { setShowCart(false); setShowCheckout(true); }}
                        disabled={!meetsMinimum}
                        className="w-full py-3.5 sm:py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 shadow-primary"
                      >
                        Proceed to Checkout — ${fees.total.toFixed(2)}
                      </button>
                      <button
                        onClick={() => { setShowCart(false); handleWhatsAppOrder(); }}
                        className="w-full py-3 sm:py-3.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <MessageCircle size={16} />
                        Order via WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Checkout modal ───────────────────────────────── */}
          {showCheckout && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => { setShowCheckout(false); setOrderStatus("idle"); }}
              />
              <div className="relative bg-[var(--background)] rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="font-serif text-xl sm:text-2xl">
                      {orderStatus === "success" ? "Order Confirmed!" : "Checkout"}
                    </h2>
                    <button
                      onClick={() => { setShowCheckout(false); setOrderStatus("idle"); }}
                      className="p-2 hover:bg-[var(--secondary)] rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* ── Success state ───────────────────────── */}
                  {orderStatus === "success" ? (
                    <div className="text-center py-4 sm:py-8">
                      {/* Confetti */}
                      <div className="relative h-8 mb-2 overflow-hidden">
                        {CONFETTI_COLORS.flatMap((color, ci) =>
                          [0, 1, 2].map((j) => (
                            <ConfettiPiece
                              key={`${ci}-${j}`}
                              color={color}
                              delay={ci * 80 + j * 150}
                              left={10 + ci * 15 + j * 5}
                            />
                          ))
                        )}
                      </div>

                      <div className="text-6xl sm:text-7xl mb-4 animate-success-pop">🎉</div>
                      <h3 className="font-serif text-2xl sm:text-3xl mb-1">You&apos;re all set!</h3>
                      <p className="text-[var(--muted-foreground)] text-sm mb-1">
                        Order ID: <strong className="text-[var(--foreground)] font-mono">{orderId}</strong>
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mb-6">
                        {orderType === "pickup"
                          ? "📍 Pick up at 2095 Fruitdale Ave, San Jose"
                          : `🚚 Delivering to your ${selectedZone?.name ?? ""} address`}
                        {selectedZone && ` · Est. ${formatEstimate(selectedZone)}`}
                      </p>

                      {/* CashApp payment card */}
                      <div className="bg-[var(--secondary)] rounded-2xl p-4 mb-4 text-left border border-[var(--border)]">
                        <p className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold mb-2">
                          Complete Your Payment
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-black text-lg text-[var(--foreground)]">{XUBIE_DATA.company.cashapp}</p>
                            <p className="text-sm text-[var(--muted-foreground)]">Total: ${fees.total.toFixed(2)}</p>
                          </div>
                          <a
                            href={XUBIE_DATA.company.cashappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00D632] text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-colors shadow-lg"
                          >
                            Pay Now
                            <ExternalLink size={12} />
                          </a>
                        </div>
                        <p className="text-[10px] text-[var(--muted-foreground)] mt-2">
                          Or pay via Zelle · {XUBIE_DATA.company.zelle} · Cash at pickup
                        </p>
                      </div>

                      {/* Share section */}
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-5 text-left">
                        <p className="text-xs font-semibold text-amber-800 mb-1.5">
                          🍮 Love your order? Tell your people!
                        </p>
                        <p className="text-[11px] text-amber-700 mb-3">
                          Every share helps Xubie Snacks grow — and gets your friends on the pudding train.
                        </p>
                        <button
                          onClick={shareOnWhatsApp}
                          className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-xl transition-colors"
                        >
                          <Share2 size={12} />
                          Share on WhatsApp
                        </button>
                      </div>

                      <button
                        onClick={() => { setShowCheckout(false); setOrderStatus("idle"); }}
                        className="w-full py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-semibold hover:opacity-90 transition-all"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    /* ── Checkout form ─────────────────────── */
                    <form onSubmit={handleCheckout}>
                      {/* Order summary */}
                      <div className="bg-[var(--secondary)] rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {orderType === "pickup" ? (
                              <Store size={16} className="text-[var(--primary)]" />
                            ) : (
                              <Truck size={16} className="text-[var(--primary)]" />
                            )}
                            <span className="text-sm font-semibold">
                              {orderType === "pickup" ? "Pickup" : `Delivery — ${selectedZone?.name ?? ""}`}
                            </span>
                          </div>
                          {selectedZone && (
                            <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                              <Clock size={12} />
                              {formatEstimate(selectedZone)}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-sm">
                          {items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex justify-between">
                              <span className="text-[var(--muted-foreground)]">
                                {item.quantity}× {item.name} ({item.size === "lrg" ? "Lrg" : "Reg"})
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer fields */}
                      <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="text-[10px] sm:text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5 sm:mb-2">Full Name *</label>
                            <input
                              type="text" required value={customer.name}
                              onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] sm:text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5 sm:mb-2">Phone *</label>
                            <input
                              type="tel" required value={customer.phone}
                              onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))}
                              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] sm:text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5 sm:mb-2">Email *</label>
                          <input
                            type="email" required value={customer.email}
                            onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))}
                            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="you@email.com"
                          />
                        </div>
                        {orderType === "delivery" && (
                          <div>
                            <label className="text-[10px] sm:text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5 sm:mb-2">Delivery Address *</label>
                            <input
                              type="text" required={orderType === "delivery"} value={customer.address}
                              onChange={(e) => setCustomer((p) => ({ ...p, address: e.target.value }))}
                              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                              placeholder="123 Main St, City, CA 95000"
                            />
                          </div>
                        )}
                        <div>
                          <label className="text-[10px] sm:text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5 sm:mb-2">Special Instructions</label>
                          <textarea
                            value={customer.notes}
                            onChange={(e) => setCustomer((p) => ({ ...p, notes: e.target.value }))}
                            rows={2}
                            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 resize-none"
                            placeholder="Any special requests?"
                          />
                        </div>
                      </div>

                      {/* Tip selector */}
                      <div className="mb-5 sm:mb-6">
                        <label className="text-[10px] sm:text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2 sm:mb-3">
                          Add a Tip <span className="normal-case">(supports Nina directly 💛)</span>
                        </label>
                        <div className="flex gap-1.5 sm:gap-2 mb-2">
                          {TIP_PRESETS.map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => { setTipPercent(pct); setCustomTip(""); }}
                              className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                tipPercent === pct && !customTip
                                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow"
                                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--primary)]/10"
                              }`}
                            >
                              {pct === 0 ? "None" : `${Math.round(pct * 100)}%`}
                            </button>
                          ))}
                          <div className="flex-1 relative">
                            <span className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-[var(--muted-foreground)]">$</span>
                            <input
                              type="number" min="0" step="0.50" value={customTip}
                              onChange={(e) => { setCustomTip(e.target.value); setTipPercent(null); }}
                              placeholder="Other"
                              className={`w-full pl-6 sm:pl-7 pr-2 sm:pr-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 ${
                                customTip
                                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] border-transparent"
                              }`}
                            />
                          </div>
                        </div>
                        {tipAmount > 0 && (
                          <p className="text-xs text-[var(--muted-foreground)]">
                            Tip: ${tipAmount.toFixed(2)} — Thank you! 💛
                          </p>
                        )}
                      </div>

                      {/* Fee breakdown */}
                      <div className="bg-[var(--secondary)] rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">Subtotal</span>
                            <span>${fees.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">{orderType === "pickup" ? "Pickup" : "Delivery Fee"}</span>
                            <span className={fees.deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
                              {fees.deliveryFee === 0 ? "FREE" : `$${fees.deliveryFee.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">Service Fee (5%)</span>
                            <span>${fees.serviceFee.toFixed(2)}</span>
                          </div>
                          {fees.smallOrderFee > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-[var(--muted-foreground)]">Small Order Fee</span>
                              <span>${fees.smallOrderFee.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">Tax (9.375%)</span>
                            <span>${fees.tax.toFixed(2)}</span>
                          </div>
                          {fees.tip > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-[var(--muted-foreground)]">Tip</span>
                              <span>${fees.tip.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold text-base sm:text-lg">
                            <span>Total</span>
                            <span className="text-[var(--primary)]">${fees.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {orderStatus === "error" && (
                        <div className="mb-4 p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-xl">
                          <p className="text-sm text-[var(--destructive)]">
                            Something went wrong. Please try again or order via WhatsApp.
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        <button
                          type="submit"
                          disabled={orderStatus === "submitting" || !meetsMinimum}
                          className="w-full py-3.5 sm:py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-primary"
                        >
                          {orderStatus === "submitting" ? "Placing Order..." : `Place Order — $${fees.total.toFixed(2)}`}
                        </button>
                        <button
                          type="button"
                          onClick={handleWhatsAppOrder}
                          className="w-full py-3.5 sm:py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={18} />
                          Or Order via WhatsApp
                        </button>
                      </div>

                      <p className="text-xs text-center text-[var(--muted-foreground)] mt-4">
                        Pay via CashApp ({XUBIE_DATA.company.cashapp}), Zelle, or cash at pickup
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
