import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Mail, MapPin } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { XUBIE_DATA } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)] relative overflow-hidden">
      {/* Gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.62 0.21 50 / 0.6), transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 50%, oklch(0.62 0.21 50), transparent 40%), radial-gradient(circle at 90% 20%, oklch(0.70 0.15 230), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-6 py-20 relative">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 shadow-lg">
                <Image
                  src="/branding/xubie-logo-new.jpeg"
                  alt="Xubie Snacks logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="font-serif text-xl block leading-tight text-[var(--background)]">
                  Xubie Snacks
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[var(--primary)] uppercase font-medium">
                  Snacks That Smack
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--background)]/55 leading-relaxed max-w-sm mb-6">
              Handcrafted sweets and treats from San Jose, built for pickup,
              local delivery, pop-ups, and the kind of community moments people
              post before they even finish eating.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5 text-sm text-[var(--background)]/55">
                <MessageCircle size={14} className="text-emerald-400 shrink-0" />
                <span>{XUBIE_DATA.company.whatsappDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--background)]/55">
                <Mail size={14} className="text-[var(--primary)] shrink-0" />
                <span>{XUBIE_DATA.company.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--background)]/55">
                <MapPin size={14} className="text-sky-400 shrink-0" />
                <span>San Jose, CA · Bay Area Delivery</span>
              </div>
            </div>

            {/* Payment badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { label: "CashApp", value: XUBIE_DATA.company.cashapp },
                { label: "Zelle", value: XUBIE_DATA.company.zelle },
                { label: "Cash", value: "at pop-ups" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="bg-white/8 border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-[var(--background)]/70"
                >
                  <span className="text-[var(--background)]/40">{p.label} · </span>
                  {p.value}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  href: XUBIE_DATA.company.instagram,
                  icon: <InstagramIcon size={18} />,
                  label: "Instagram",
                  hover: "hover:text-pink-400",
                },
                {
                  href: XUBIE_DATA.company.tiktok.url,
                  icon: <TikTokIcon size={18} />,
                  label: "TikTok",
                  hover: "hover:text-sky-400",
                },
                {
                  href: `https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin!")}`,
                  icon: <MessageCircle size={18} />,
                  label: "WhatsApp",
                  hover: "hover:text-emerald-400",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-[var(--background)]/50 ${social.hover} hover:bg-white/15 hover:border-white/20 transition-all`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[var(--background)]/40 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Order Menu" },
                { href: "/#story", label: "Our Story" },
                { href: "/#reviews", label: "Reviews" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--background)]/55 hover:text-[var(--background)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-[var(--background)]/40 mb-5">
              Powered By
            </h4>
            <ul className="space-y-3">
              {[
                { label: "School of AI", href: "https://sof.ai", sub: "sof.ai" },
                { label: "Dr. Freedom Cheteni", href: null, sub: "Lead Professor" },
                { label: "Devin", href: null, sub: "AI Software Engineer" },
                { label: "Xuliani", href: null, sub: "AI Concierge" },
              ].map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--background)]/55 hover:text-[var(--background)] transition-colors"
                    >
                      {item.label}
                      <span className="block text-[10px] text-[var(--background)]/30 mt-0.5">{item.sub}</span>
                    </a>
                  ) : (
                    <div className="text-sm text-[var(--background)]/55">
                      {item.label}
                      <span className="block text-[10px] text-[var(--background)]/30 mt-0.5">{item.sub}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--background)]/30">
            &copy; {new Date().getFullYear()} Xuliani LLC (DBA Xubie Snacks). All rights reserved.
          </p>
          <p className="text-xs text-[var(--background)]/30 flex items-center gap-1.5">
            Made with <Heart size={11} className="text-[var(--primary)]" /> in San Jose, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
