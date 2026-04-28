"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ShoppingBag } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";
import {
  DELIVERY_ZONES,
  calculateFees,
  formatEstimate,
  type OrderType,
} from "@/lib/delivery";

type MessageRole = "bot" | "user";

interface ChatMessage {
  role: MessageRole;
  text: string;
  options?: string[];
}

const WHATSAPP_URL = `https://wa.me/${XUBIE_DATA.company.whatsapp}`;

const products = XUBIE_DATA.products;

const deliveryZones = DELIVERY_ZONES.filter((z) => z.id !== "pickup");

function buildWhatsAppUrl(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

const GREETING: ChatMessage = {
  role: "bot",
  text: `Hey there! I'm Xulanin, your snack concierge at Xubie Snacks. How can I help you today?`,
  options: ["View Menu", "Place an Order", "Ask a Question", "Contact Us"],
};

export function XulaninChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [orderState, setOrderState] = useState<{
    step:
      | "idle"
      | "product"
      | "size"
      | "quantity"
      | "confirm"
      | "orderType"
      | "zone"
      | "address"
      | "review";
    productId?: number;
    size?: string;
    quantity?: number;
    items: Array<{ name: string; size: string; price: number; qty: number }>;
    orderType?: OrderType;
    zoneId?: string;
    address?: string;
  }>({ step: "idle", items: [] });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function addBotMessage(text: string, options?: string[]) {
    setMessages((prev) => [...prev, { role: "bot", text, options }]);
  }

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }

  function getOrderSummary(
    items: typeof orderState.items,
    oType?: OrderType,
    zId?: string
  ) {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const zone = DELIVERY_ZONES.find((z) => z.id === (zId ?? "pickup")) ?? null;
    const fees = calculateFees(subtotal, oType ?? "pickup", zone, 0);
    return { subtotal, zone, fees };
  }

  function processOption(option: string) {
    if (option === "View Menu") {
      const menuText = products
        .map(
          (p) =>
            `**${p.name}**\nReg $${p.priceReg} | Lrg $${p.priceLrg}`
        )
        .join("\n\n");
      addBotMessage(
        `Here's our menu:\n\n${menuText}\n\nWant to place an order?`,
        ["Place an Order", "Ask a Question", "Contact Us"]
      );
    } else if (option === "Place an Order" || option === "Add Another Item") {
      setOrderState((prev) => ({ ...prev, step: "product" }));
      addBotMessage(
        "Which treat would you like?",
        products.map((p) => p.name)
      );
    } else if (option === "Ask a Question") {
      addBotMessage(
        "Here are some common questions:",
        [
          "How do I pay?",
          "Do you deliver?",
          "What are the fees?",
          "What sizes are available?",
          "Do you cater events?",
          "Talk to a human",
        ]
      );
    } else if (option === "Contact Us" || option === "Talk to a human") {
      const waUrl = buildWhatsAppUrl(
        "Hi Xulanin! I have a question about Xubie Snacks."
      );
      addBotMessage(
        `You can reach us at:\n\nPhone: ${XUBIE_DATA.company.phone}\nWhatsApp: ${XUBIE_DATA.company.whatsappDisplay}\nEmail: ${XUBIE_DATA.company.email}\nCashApp: ${XUBIE_DATA.company.cashapp}\n\n[Message us on WhatsApp](${waUrl})`,
        ["View Menu", "Place an Order"]
      );
    } else if (option === "How do I pay?") {
      addBotMessage(
        `We accept CashApp (${XUBIE_DATA.company.cashapp}), Zelle, and cash at pop-ups!`,
        ["Place an Order", "Ask a Question"]
      );
    } else if (option === "Do you deliver?") {
      addBotMessage(
        "Yes! We deliver across the Bay Area:\n\n**Pickup** — FREE (15–30 min)\n**South Bay** — $3.99 (25–40 min)\n**Peninsula** — $5.99 (35–55 min)\n**East Bay** — $7.99 (40–60 min)\n**SF / North Bay** — $9.99 (50–75 min)\n\nPlus 5% service fee (max $5) and CA tax. Visit our menu page for full details!",
        ["Place an Order", "What are the fees?", "View Menu"]
      );
    } else if (option === "What are the fees?") {
      addBotMessage(
        "Here's how our fees work:\n\n**Delivery Fee** — Based on your zone ($0–$9.99)\n**Service Fee** — 5% of subtotal (capped at $5)\n**Small Order Fee** — $2 on orders under $15\n**Tax** — 9.375% CA sales tax\n**Tip** — Optional, always appreciated!\n\nPickup is always free!",
        ["Place an Order", "Do you deliver?", "View Menu"]
      );
    } else if (option === "What sizes are available?") {
      addBotMessage(
        "All items come in Regular and Large. Regular is perfect for one, Large is great for sharing!",
        ["Place an Order", "View Menu"]
      );
    } else if (option === "Do you cater events?") {
      addBotMessage(
        "Absolutely! We do dessert trays, tasting tables, and custom event spreads. Message us to discuss your event!",
        ["Contact Us", "Place an Order"]
      );
    } else if (
      products.some((p) => p.name === option) &&
      orderState.step === "product"
    ) {
      const product = products.find((p) => p.name === option);
      if (product) {
        setOrderState((prev) => ({
          ...prev,
          step: "size",
          productId: product.id,
        }));
        addBotMessage(
          `Great choice! What size ${product.name}?\n\nRegular — $${product.priceReg}\nLarge — $${product.priceLrg}`,
          ["Regular", "Large"]
        );
      }
    } else if (
      (option === "Regular" || option === "Large") &&
      orderState.step === "size"
    ) {
      const size = option === "Regular" ? "reg" : "lrg";
      setOrderState((prev) => ({ ...prev, step: "quantity", size }));
      addBotMessage("How many would you like?", ["1", "2", "3", "4", "5"]);
    } else if (/^[1-9]\d*$/.test(option) && orderState.step === "quantity") {
      const qty = parseInt(option, 10);
      const product = products.find((p) => p.id === orderState.productId);
      if (product) {
        const price =
          orderState.size === "lrg" ? product.priceLrg : product.priceReg;
        const sizeLabel = orderState.size === "lrg" ? "Large" : "Regular";
        const newItem = { name: product.name, size: sizeLabel, price, qty };
        const updatedItems = [...orderState.items, newItem];
        setOrderState({ step: "confirm", items: updatedItems });

        const summary = updatedItems
          .map(
            (i) =>
              `${i.qty}x ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`
          )
          .join("\n");
        const itemTotal = updatedItems.reduce(
          (s, i) => s + i.price * i.qty,
          0
        );

        addBotMessage(
          `Your order so far:\n\n${summary}\n\nSubtotal: $${itemTotal.toFixed(2)}\n\nWhat would you like to do?`,
          ["Checkout", "Add Another Item", "Start Over"]
        );
      }
    } else if (option === "Checkout" && orderState.step === "confirm") {
      setOrderState((prev) => ({ ...prev, step: "orderType" }));
      addBotMessage(
        "How would you like to receive your order?",
        ["Pickup (FREE)", "Delivery"]
      );
    } else if (option === "Pickup (FREE)" && orderState.step === "orderType") {
      setOrderState((prev) => ({
        ...prev,
        step: "review",
        orderType: "pickup",
        zoneId: "pickup",
      }));
      const { fees } = getOrderSummary(orderState.items, "pickup", "pickup");
      const itemSummary = orderState.items
        .map(
          (i) =>
            `${i.qty}x ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`
        )
        .join("\n");
      addBotMessage(
        `**Order Summary — Pickup**\n\n${itemSummary}\n\nSubtotal: $${fees.subtotal.toFixed(2)}\nDelivery: FREE\nService Fee: $${fees.serviceFee.toFixed(2)}${fees.smallOrderFee > 0 ? `\nSmall Order Fee: $${fees.smallOrderFee.toFixed(2)}` : ""}\nTax: $${fees.tax.toFixed(2)}\n**Total: $${fees.total.toFixed(2)}**\n\nPickup at: 2095 Fruitdale Ave, San Jose\nEstimated: 15–30 min`,
        ["Send Order via WhatsApp", "Change to Delivery", "Start Over"]
      );
    } else if (option === "Delivery" && orderState.step === "orderType") {
      setOrderState((prev) => ({ ...prev, step: "zone" }));
      const zoneList = deliveryZones
        .map(
          (z) =>
            `**${z.name}** — $${z.fee.toFixed(2)} (${formatEstimate(z)})`
        )
        .join("\n");
      addBotMessage(
        `Which delivery zone are you in?\n\n${zoneList}`,
        deliveryZones.map((z) => z.name)
      );
    } else if (
      deliveryZones.some((z) => z.name === option) &&
      orderState.step === "zone"
    ) {
      const zone = deliveryZones.find((z) => z.name === option);
      if (zone) {
        setOrderState((prev) => ({
          ...prev,
          step: "address",
          zoneId: zone.id,
          orderType: "delivery",
        }));
        addBotMessage(
          `Delivery to **${zone.name}** — $${zone.fee.toFixed(2)} fee, ${formatEstimate(zone)}${zone.minimumOrder > 0 ? `\nMinimum order: $${zone.minimumOrder}` : ""}\n\nPlease type your delivery address:`
        );
      }
    } else if (orderState.step === "address" && option.length > 5) {
      setOrderState((prev) => ({ ...prev, step: "review", address: option }));
      const { fees, zone } = getOrderSummary(
        orderState.items,
        "delivery",
        orderState.zoneId
      );
      const itemSummary = orderState.items
        .map(
          (i) =>
            `${i.qty}x ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`
        )
        .join("\n");
      const zoneName = zone?.name ?? "Delivery";
      addBotMessage(
        `**Order Summary — Delivery to ${zoneName}**\n\n${itemSummary}\n\nSubtotal: $${fees.subtotal.toFixed(2)}\nDelivery Fee: $${fees.deliveryFee.toFixed(2)}${fees.smallOrderFee > 0 ? `\nSmall Order Fee: $${fees.smallOrderFee.toFixed(2)}` : ""}\nService Fee: $${fees.serviceFee.toFixed(2)}\nTax: $${fees.tax.toFixed(2)}\n**Total: $${fees.total.toFixed(2)}**\n\nDelivering to: ${option}\nEstimated: ${zone ? formatEstimate(zone) : "TBD"}`,
        ["Send Order via WhatsApp", "Change to Pickup", "Start Over"]
      );
    } else if (option === "Change to Delivery") {
      setOrderState((prev) => ({ ...prev, step: "zone", orderType: undefined, zoneId: undefined, address: undefined }));
      const zoneList = deliveryZones
        .map(
          (z) =>
            `**${z.name}** — $${z.fee.toFixed(2)} (${formatEstimate(z)})`
        )
        .join("\n");
      addBotMessage(
        `Which delivery zone are you in?\n\n${zoneList}`,
        deliveryZones.map((z) => z.name)
      );
    } else if (option === "Change to Pickup") {
      setOrderState((prev) => ({
        ...prev,
        step: "review",
        orderType: "pickup",
        zoneId: "pickup",
        address: undefined,
      }));
      const { fees } = getOrderSummary(orderState.items, "pickup", "pickup");
      const itemSummary = orderState.items
        .map(
          (i) =>
            `${i.qty}x ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`
        )
        .join("\n");
      addBotMessage(
        `**Order Summary — Pickup**\n\n${itemSummary}\n\nSubtotal: $${fees.subtotal.toFixed(2)}\nDelivery: FREE\nService Fee: $${fees.serviceFee.toFixed(2)}${fees.smallOrderFee > 0 ? `\nSmall Order Fee: $${fees.smallOrderFee.toFixed(2)}` : ""}\nTax: $${fees.tax.toFixed(2)}\n**Total: $${fees.total.toFixed(2)}**\n\nPickup at: 2095 Fruitdale Ave, San Jose\nEstimated: 15–30 min`,
        ["Send Order via WhatsApp", "Change to Delivery", "Start Over"]
      );
    } else if (option === "Send Order via WhatsApp") {
      const oType = orderState.orderType ?? "pickup";
      const { fees, zone } = getOrderSummary(
        orderState.items,
        oType,
        orderState.zoneId
      );
      const summary = orderState.items
        .map(
          (i) =>
            `${i.qty}x ${i.name} (${i.size}) — $${(i.price * i.qty).toFixed(2)}`
        )
        .join("\n");
      const waText = `Hi Xulanin! I'd like to order:\n\n${summary}\n\nSubtotal: $${fees.subtotal.toFixed(2)}\nOrder type: ${oType === "pickup" ? "Pickup" : `Delivery — ${zone?.name ?? ""}`}${oType === "delivery" ? `\nDelivery Fee: $${fees.deliveryFee.toFixed(2)}` : ""}\nService Fee: $${fees.serviceFee.toFixed(2)}${fees.smallOrderFee > 0 ? `\nSmall Order Fee: $${fees.smallOrderFee.toFixed(2)}` : ""}\nTax: $${fees.tax.toFixed(2)}\nTotal: $${fees.total.toFixed(2)}${orderState.address ? `\nAddress: ${orderState.address}` : ""}\n\nPlease confirm!`;
      const waUrl = buildWhatsAppUrl(waText);
      window.open(waUrl, "_blank");
      addBotMessage(
        `Order sent to WhatsApp! We'll confirm shortly.\n\nPay via CashApp: ${XUBIE_DATA.company.cashapp}\n\nAnything else?`,
        ["Place an Order", "View Menu", "Contact Us"]
      );
      setOrderState({ step: "idle", items: [] });
    } else if (option === "Start Over") {
      setOrderState({ step: "idle", items: [] });
      addBotMessage(
        "No problem! How can I help you?",
        ["View Menu", "Place an Order", "Ask a Question", "Contact Us"]
      );
    } else {
      addBotMessage(
        "I'm not sure about that. Let me help you with something else!",
        ["View Menu", "Place an Order", "Ask a Question", "Contact Us"]
      );
    }
  }

  function handleOptionClick(option: string) {
    addUserMessage(option);
    processOption(option);
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");
    addUserMessage(text);

    if (orderState.step === "address") {
      processOption(text);
      return;
    }

    const lower = text.toLowerCase();
    if (
      lower.includes("menu") ||
      lower.includes("product") ||
      lower.includes("what do you")
    ) {
      processOption("View Menu");
    } else if (
      lower.includes("order") ||
      lower.includes("buy") ||
      lower.includes("want")
    ) {
      processOption("Place an Order");
    } else if (
      lower.includes("deliver") ||
      lower.includes("pickup") ||
      lower.includes("pick up")
    ) {
      processOption("Do you deliver?");
    } else if (
      lower.includes("pay") ||
      lower.includes("cash") ||
      lower.includes("zelle")
    ) {
      processOption("How do I pay?");
    } else if (
      lower.includes("fee") ||
      lower.includes("charge") ||
      lower.includes("cost") ||
      lower.includes("tax") ||
      lower.includes("tip")
    ) {
      processOption("What are the fees?");
    } else if (
      lower.includes("cater") ||
      lower.includes("event") ||
      lower.includes("party")
    ) {
      processOption("Do you cater events?");
    } else if (
      lower.includes("contact") ||
      lower.includes("phone") ||
      lower.includes("human") ||
      lower.includes("talk")
    ) {
      processOption("Contact Us");
    } else if (lower.includes("size")) {
      processOption("What sizes are available?");
    } else if (/^[1-9]\d*$/.test(text) && orderState.step === "quantity") {
      processOption(text);
    } else {
      const waUrl = buildWhatsAppUrl(`Hi Xulanin! ${text}`);
      addBotMessage(
        `Great question! For anything specific, I'd recommend reaching out directly:\n\n[Message us on WhatsApp](${waUrl})\n\nOr I can help with:`,
        ["View Menu", "Place an Order", "Ask a Question", "Contact Us"]
      );
    }
  }

  function renderText(text: string) {
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\n)/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline hover:opacity-80"
          >
            {linkMatch[1]}
          </a>
        );
      }
      const boldMatch = part.match(/\*\*(.*?)\*\*/);
      if (boldMatch) {
        return <strong key={i}>{boldMatch[1]}</strong>;
      }
      if (part === "\n") {
        return <br key={i} />;
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow"
        aria-label="Chat with Xulanin"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[min(560px,calc(100vh-6rem))] sm:h-[560px] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-bounce-in">
          {/* Header */}
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <ShoppingBag size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-base sm:text-lg leading-tight">Xulanin</h3>
              <p className="text-[10px] sm:text-xs opacity-80">Your Snack Concierge</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`max-w-[90%] sm:max-w-[85%] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-[var(--secondary)] text-[var(--foreground)] rounded-bl-md"
                      : "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-md ml-auto"
                  }`}
                >
                  {renderText(msg.text)}
                </div>
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="px-3 py-1.5 text-[11px] sm:text-xs border border-[var(--primary)]/30 text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] active:bg-[var(--primary)] active:text-[var(--primary-foreground)] transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--border)] p-2.5 sm:p-3 flex gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                orderState.step === "address"
                  ? "Type your delivery address..."
                  : "Type a message..."
              }
              className="flex-1 px-3.5 sm:px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
