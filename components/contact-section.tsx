"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { InstagramIcon } from "@/components/icons";

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "(650) 656-0483",
    sub: "Mon-Sat, 9AM - 6PM PST",
    href: "tel:6506560483",
  },
  {
    icon: Mail,
    label: "Email",
    value: "xubiesnacks@yahoo.com",
    sub: "We respond within 24 hours",
    href: "mailto:xubiesnacks@yahoo.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "2095 Fruitdale Avenue",
    sub: "San Jose, CA 95128",
    href: null,
  },
  {
    icon: Clock,
    label: "Local Pickup",
    value: "Same-Day Available",
    sub: "For Bay Area orders",
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
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
                Contact
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
                Let&apos;s Create Something{" "}
                <span className="text-[var(--primary)]">Delicious</span>
              </h2>
              <p className="text-[var(--muted-foreground)] mt-4">
                Whether you&apos;re planning an event, need a custom snack box,
                or just want to say hi — we&apos;d love to hear from you.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="p-4 border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/30 transition-colors"
                >
                  <item.icon
                    size={18}
                    className="text-[var(--primary)] mb-3"
                  />
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors block mt-1"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-[var(--foreground)] mt-1">
                      {item.value}
                    </p>
                  )}
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/xubie_snacks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:bg-[var(--primary)]/90 transition-all hover:shadow-lg"
            >
              <InstagramIcon size={18} />
              <span className="text-sm font-medium">
                Follow @xubie_snacks
              </span>
            </a>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 transition-shadow"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 transition-shadow"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 transition-shadow"
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
                    required
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 transition-shadow"
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

              <div className="mb-6">
                <label className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 transition-shadow resize-none"
                  placeholder="Tell us about your snack needs..."
                />
              </div>

              {status === "error" && (
                <div className="mb-4 p-3 bg-[var(--destructive)]/10 border border-[var(--destructive)]/20 rounded-xl">
                  <p className="text-sm text-[var(--destructive)]">
                    {errorMessage}
                  </p>
                </div>
              )}

              {status === "success" && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-700">
                    Thanks for reaching out! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide disabled:opacity-50"
              >
                <Send size={16} />
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
