import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/30 shadow-lg">
                <Image
                  src="/images/xubie-logo.jpeg"
                  alt="Xubie Snacks logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="font-serif text-xl block leading-tight font-semibold">
                  Xubie Snacks
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[var(--primary)] uppercase font-medium">
                  Snacks That Smack
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--background)]/60 leading-relaxed max-w-md">
              Handcrafted sweets and treats from San Jose, built for pickup,
              local delivery, pop-ups, and the kind of community moments people
              post before they even get home.
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
              <a
                href="https://www.tiktok.com/@xubiesnacks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--background)]/60 hover:text-[var(--primary)] transition-colors"
              >
                <TikTokIcon size={20} />
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
                { href: "/licensing", label: "Licensing & Compliance" },
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
              Built With
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
              <li>Devin (Software Engineer)</li>
              <li>The Xuliani AI Agent</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--background)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--background)]/40">
            &copy; {new Date().getFullYear()} Xubie Snacks by Nina Lux. All rights reserved.
          </p>
          <p className="text-xs text-[var(--background)]/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-[var(--primary)]" /> in San Jose, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
