"use client";
import { useState } from "react";
import { Mail, MapPin, DollarSign, Send, MessageCircle, CreditCard, Smartphone, Wallet } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { XUBIE_DATA } from "@/lib/data";

const contactInfo = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: XUBIE_DATA.company.whatsappDisplay,
    sub: "Fastest way to order & reach us",
    href: `https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to place an order.")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: XUBIE_DATA.company.email,
    sub: "We respond within 24 hours",
    href: `mailto:${XUBIE_DATA.company.email}`,
  },
  {
    icon: MapPin,
    label: "Pickup Location",
    value: "2095 Fruitdale Avenue",
    sub: "San Jose, CA 95128",
    href: null,
  },
];

const paymentMethods = [
  {
    icon: DollarSign,
    name: "CashApp",
    value: XUBIE_DATA.company.cashapp,
    available: true,
    href: "https://cash.app/$XULANIN7",
  },
  {
    icon: Wallet,
    name: "Zelle",
    value: XUBIE_DATA.company.zelle,
    available: true,
    href: null,
  },
  {
    icon: CreditCard,
    name: "Debit / Credit",
    value: "Coming Soon",
    available: false,
    href: null,
  },
  {
    icon: Smartphone,
    name: "Apple Pay",
    value: "Coming Soon",
    available: false,
    href: null,
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Place a Custom Order",
  "Corporate / Event Catering",
  "Wholesale Partnership",
  "Feedback / Suggestion",
  "Press / Media",
];

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
      setFormState({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
                Contact
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
                Let&apos;s Create Something{" "}
                <span className="text-[var(--primary)]">Delicious</span>
              </h2>
              <p className="text-[var(--muted-foreground)] mt-4 text-sm sm:text-base">
                Whether you&apos;re planning an event, need a custom snack box,
                or just want to say hi — message us on WhatsApp!
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest text-[var(--muted-foreground)] uppercase">
                Get in Touch
              </h3>
              <div className="grid gap-3">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-[var(--primary)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors block mt-0.5"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">
                          {item.value}
                        </p>
                      )}
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment methods */}
            <div className="space-y-3">
              <h3 className="text-xs tracking-widest text-[var(--muted-foreground)] uppercase">
                Payment Options
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className={`p-4 border rounded-xl transition-colors ${
                      method.available
                        ? "border-[var(--border)] hover:border-[var(--primary)]/30"
                        : "border-dashed border-[var(--border)] opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <method.icon
                        size={16}
                        className={method.available ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}
                      />
                      <span className="text-xs font-medium text-[var(--foreground)]">
                        {method.name}
                      </span>
                    </div>
                    {method.href ? (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--primary)] hover:underline"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className={`text-sm font-semibold ${method.available ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)] italic"}`}>
                        {method.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/xubie_snacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
              >
                <InstagramIcon size={22} />
              </a>
              <a
                href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted-foreground)] hover:text-green-500 transition-colors"
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">Message Sent!</h3>
                  <p className="text-[var(--muted-foreground)]">
                    We&apos;ll get back to you soon. For faster response, message
                    us on WhatsApp!
                  </p>
                  <a
                    href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Us
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formState.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
                      >
                        <option value="">Select...</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 resize-none"
                      placeholder="Tell us what you need..."
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-sm text-[var(--destructive)]">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
