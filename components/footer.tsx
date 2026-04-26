import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <span className="text-[var(--primary-foreground)] font-serif text-lg font-bold">
                  X
                </span>
              </div>
              <div>
                <span className="font-serif text-lg block leading-tight">
                  Xubie Snacks
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[var(--background)]/50 uppercase">
                  By Xuliani LLC
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--background)]/60 leading-relaxed max-w-sm">
              Handcrafted snacks made with love in San Jose, California.
              From our kitchen to your door — every bite tells a story of
              passion, culture, and community.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/xubie_snacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--background)]/60 hover:text-[var(--primary)] transition-colors"
              >
                <InstagramIcon size={20} />
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
              <li>Xuliani (AI Agent)</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--background)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--background)]/40">
            &copy; {new Date().getFullYear()} Xuliani LLC (DBA Xubie Snacks).
            All rights reserved.
          </p>
          <p className="text-xs text-[var(--background)]/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-[var(--primary)]" /> in
            San Jose, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
