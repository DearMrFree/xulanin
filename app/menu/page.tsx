"use client";
import { useState, useMemo } from "react";
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

  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [selectedZoneId, setSelectedZoneId] = useState<string>("pickup");
  const [tipPercent, setTipPercent] = useState<number | null>(0);
  const [customTip, setCustomTip] = useState("");
  const [showZoneSelector, setShowZoneSelector] = useState(false);
  const [showFeeInfo, setShowFeeInfo] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

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
      .map(
        (i) =>
          `${i.quantity}x ${i.name} (${i.size === "lrg" ? "Large" : "Regular"}) — $${(i.price * i.quantity).toFixed(2)}`
      )
      .join("\n");
    const zoneLabel = selectedZone?.name ?? "Pickup";
    const text = `Hi Xulanin! I'd like to order:\n\n${summary}\n\nSubtotal: $${total.toFixed(2)}\nOrder type: ${orderType === "pickup" ? "Pickup" : `Delivery (${zoneLabel})`}\nEstimated total: $${fees.total.toFixed(2)}\n\nName: ${customer.name || "TBD"}\nPhone: ${customer.phone || "TBD"}${customer.address ? `\nAddress: ${customer.address}` : ""}\n\nPlease confirm!`;
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
          <div className="text-center mb-12">
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

          {/* Order type toggle */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 p-1.5 bg-[var(--secondary)] rounded-2xl max-w-sm mx-auto">
              <button
                onClick={() => {
                  setOrderType("pickup");
                  setSelectedZoneId("pickup");
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  orderType === "pickup"
                    ? "bg-[var(--background)] text-[var(--foreground)] shadow-lg"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <Store size={16} />
                Pickup
                <span className="text-xs text-green-600 font-semibold">FREE</span>
              </button>
              <button
                onClick={() => {
                  setOrderType("delivery");
                  if (selectedZoneId === "pickup") setSelectedZoneId("south-bay");
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  orderType === "delivery"
                    ? "bg-[var(--background)] text-[var(--foreground)] shadow-lg"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <Truck size={16} />
                Delivery
              </button>
            </div>

            {/* Delivery zone info bar */}
            {selectedZone && (
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
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

            {/* Zone selector dropdown */}
            {showZoneSelector && orderType === "delivery" && (
              <div className="mt-3 max-w-lg mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xl">
                {deliveryZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSelectedZoneId(zone.id);
                      setShowZoneSelector(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 text-left hover:bg-[var(--secondary)] transition-colors border-b border-[var(--border)] last:border-b-0 ${
                      selectedZoneId === zone.id ? "bg-[var(--primary)]/5" : ""
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-medium ${selectedZoneId === zone.id ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}>
                        {zone.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {zone.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-sm font-semibold text-[var(--primary)]">
                        ${zone.fee.toFixed(2)}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {formatEstimate(zone)}
                      </p>
                      {zone.minimumOrder > 0 && (
                        <p className="text-[10px] text-[var(--muted-foreground)]">
                          Min ${zone.minimumOrder}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
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

                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

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

                    {cartItem ? (
                      <div className="flex items-center justify-between bg-[var(--secondary)] rounded-xl p-2">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, size, cartItem.quantity - 1)
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
                            updateQuantity(product.id, size, cartItem.quantity + 1)
                          }
                          className="w-10 h-10 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({ id: product.id, name: product.name, price, size })
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

          {/* Delivery zones info card */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
              <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2">
                Delivery Zones & Fees
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                We deliver across the Bay Area! Fee is based on distance from San Jose.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {DELIVERY_ZONES.map((zone) => (
                  <div
                    key={zone.id}
                    className={`p-4 rounded-xl border transition-all ${
                      zone.id === "pickup"
                        ? "border-green-300 bg-green-50"
                        : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {zone.id === "pickup" ? (
                        <Store size={16} className="text-green-600" />
                      ) : (
                        <Truck size={16} className="text-[var(--primary)]" />
                      )}
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {zone.name}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-[var(--primary)]">
                      {zone.fee === 0 ? "FREE" : `$${zone.fee.toFixed(2)}`}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      {formatEstimate(zone)}
                    </p>
                    {zone.minimumOrder > 0 && (
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        Min order ${zone.minimumOrder}
                      </p>
                    )}
                    <p className="text-[10px] text-[var(--muted-foreground)] mt-1 leading-tight">
                      {zone.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-xs text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1.5">
                  <DollarSign size={12} className="text-[var(--primary)]" />
                  5% service fee (max $5)
                </span>
                <span className="flex items-center gap-1.5">
                  <Info size={12} className="text-[var(--primary)]" />
                  $2 small order fee on orders under ${SMALL_ORDER_THRESHOLD}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign size={12} className="text-[var(--primary)]" />
                  9.375% CA sales tax
                </span>
              </div>
            </div>
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
                {fees.total.toFixed(2)}
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

                {/* Order type in cart */}
                <div className="px-6 pt-4">
                  <div className="flex gap-2 p-1 bg-[var(--secondary)] rounded-xl">
                    <button
                      onClick={() => {
                        setOrderType("pickup");
                        setSelectedZoneId("pickup");
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        orderType === "pickup"
                          ? "bg-[var(--background)] text-[var(--foreground)] shadow"
                          : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      <Store size={14} />
                      Pickup
                    </button>
                    <button
                      onClick={() => {
                        setOrderType("delivery");
                        if (selectedZoneId === "pickup") setSelectedZoneId("south-bay");
                      }}
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
                                updateQuantity(item.id, item.size, item.quantity - 1)
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
                                updateQuantity(item.id, item.size, item.quantity + 1)
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

                {/* Uber Eats-style fee breakdown in cart */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-[var(--border)]">
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
                          <span className="text-green-600 font-medium">FREE</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <button
                          onClick={() => setShowFeeInfo(!showFeeInfo)}
                          className="text-[var(--muted-foreground)] flex items-center gap-1 hover:text-[var(--foreground)]"
                        >
                          Service Fee
                          <Info size={12} />
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
                          <span className="text-[var(--muted-foreground)]">
                            Small Order Fee
                          </span>
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
                        <span className="text-lg text-[var(--primary)]">
                          ${fees.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {!meetsMinimum && selectedZone && (
                      <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-xs text-amber-700">
                          Minimum order for {selectedZone.name} delivery is ${selectedZone.minimumOrder}. Add ${(selectedZone.minimumOrder - total).toFixed(2)} more.
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setShowCart(false);
                          setShowCheckout(true);
                        }}
                        disabled={!meetsMinimum}
                        className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                      >
                        Proceed to Checkout — ${fees.total.toFixed(2)}
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
                      <p className="text-sm text-[var(--muted-foreground)] mb-1">
                        {orderType === "pickup"
                          ? "Pick up at: 2095 Fruitdale Ave, San Jose"
                          : `Delivering to your ${selectedZone?.name ?? ""} address`}
                      </p>
                      {selectedZone && (
                        <p className="text-sm text-[var(--muted-foreground)] mb-4">
                          Estimated: {formatEstimate(selectedZone)}
                        </p>
                      )}
                      <p className="text-sm text-[var(--muted-foreground)] mb-6">
                        Pay via CashApp: <strong>{XUBIE_DATA.company.cashapp}</strong>
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
                      {/* Order summary header */}
                      <div className="bg-[var(--secondary)] rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {orderType === "pickup" ? (
                              <Store size={16} className="text-[var(--primary)]" />
                            ) : (
                              <Truck size={16} className="text-[var(--primary)]" />
                            )}
                            <span className="text-sm font-medium">
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
                                {item.quantity}x {item.name} ({item.size === "lrg" ? "Lrg" : "Reg"})
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer fields */}
                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={customer.name}
                              onChange={(e) =>
                                setCustomer((prev) => ({ ...prev, name: e.target.value }))
                              }
                              className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              required
                              value={customer.phone}
                              onChange={(e) =>
                                setCustomer((prev) => ({ ...prev, phone: e.target.value }))
                              }
                              className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                              placeholder="(555) 123-4567"
                            />
                          </div>
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
                              setCustomer((prev) => ({ ...prev, email: e.target.value }))
                            }
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                            placeholder="you@email.com"
                          />
                        </div>
                        {orderType === "delivery" && (
                          <div>
                            <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                              Delivery Address *
                            </label>
                            <input
                              type="text"
                              required={orderType === "delivery"}
                              value={customer.address}
                              onChange={(e) =>
                                setCustomer((prev) => ({ ...prev, address: e.target.value }))
                              }
                              className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                              placeholder="123 Main St, City, CA 95000"
                            />
                          </div>
                        )}
                        <div>
                          <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                            Special Instructions
                          </label>
                          <textarea
                            value={customer.notes}
                            onChange={(e) =>
                              setCustomer((prev) => ({ ...prev, notes: e.target.value }))
                            }
                            rows={2}
                            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 resize-none"
                            placeholder="Any special requests?"
                          />
                        </div>
                      </div>

                      {/* Tip selector */}
                      <div className="mb-6">
                        <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-3">
                          Add a Tip
                        </label>
                        <div className="flex gap-2 mb-2">
                          {TIP_PRESETS.map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => {
                                setTipPercent(pct);
                                setCustomTip("");
                              }}
                              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                tipPercent === pct && !customTip
                                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow"
                                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--primary)]/10"
                              }`}
                            >
                              {pct === 0 ? "None" : `${Math.round(pct * 100)}%`}
                            </button>
                          ))}
                          <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)]">$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.50"
                              value={customTip}
                              onChange={(e) => {
                                setCustomTip(e.target.value);
                                setTipPercent(null);
                              }}
                              placeholder="Other"
                              className={`w-full pl-7 pr-3 py-2.5 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 ${
                                customTip
                                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] border-transparent"
                              }`}
                            />
                          </div>
                        </div>
                        {tipAmount > 0 && (
                          <p className="text-xs text-[var(--muted-foreground)]">
                            Tip: ${tipAmount.toFixed(2)} — Thank you for your generosity!
                          </p>
                        )}
                      </div>

                      {/* Fee breakdown */}
                      <div className="bg-[var(--secondary)] rounded-xl p-4 mb-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">Subtotal</span>
                            <span>${fees.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">
                              {orderType === "pickup" ? "Pickup" : "Delivery Fee"}
                            </span>
                            <span className={fees.deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
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
                          <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold text-lg">
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
                          className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                          {orderStatus === "submitting"
                            ? "Placing Order..."
                            : `Place Order — $${fees.total.toFixed(2)}`}
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
