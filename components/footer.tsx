import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/icons";
import { XUBIE_DATA } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                <Image
                  src="/branding/xubie-logo.png"
                  alt="Xubie Snacks logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="font-serif text-lg block leading-tight">
                  Xubie Snacks
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[var(--background)]/50 uppercase">
                  Snacks That Smack
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--background)]/60 leading-relaxed max-w-md">
              Handcrafted sweets and treats from San Jose, built for pickup,
              local delivery, pop-ups, and the kind of community moments people
              post before they even get home.
            </p>
            <div className="mt-4 space-y-2 text-sm text-[var(--background)]/60">
              <p>Phone: {XUBIE_DATA.company.phone}</p>
              <p>WhatsApp: {XUBIE_DATA.company.whatsappDisplay}</p>
              <p>Email: {XUBIE_DATA.company.email}</p>
              <p>CashApp: {XUBIE_DATA.company.cashapp}</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/xubie_snacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--background)]/60 hover:text-[var(--primary)] transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@xubiesnacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--background)]/60 hover:text-[var(--primary)] transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
              <a
                href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--background)]/60 hover:text-green-400 transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/menu", label: "Menu" },
                { href: "/#story", label: "Our Story" },
                { href: "/#reviews", label: "Reviews" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--background)]/60 hover:text-[var(--background)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider mb-4">
              Powered By
            </h4>
            <ul className="space-y-2 text-sm text-[var(--background)]/60">
              <li>
                <a
                  href="https://sof.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--background)] transition-colors"
                >
                  School of AI (sof.ai)
                </a>
              </li>
              <li>Dr. Freedom Cheteni</li>
              <li>Devin (AI Engineer)</li>
              <li>Xulanin (AI Concierge)</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--background)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--background)]/40">
            &copy; {new Date().getFullYear()} Xuliani LLC (DBA Xubie Snacks). All rights reserved.
          </p>
          <p className="text-xs text-[var(--background)]/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-[var(--primary)]" /> in San Jose, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
