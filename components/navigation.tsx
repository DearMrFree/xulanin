"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { XUBIE_DATA } from "@/lib/data";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Our Story" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/50 transition-all duration-300 shadow-sm">
              <Image
                src="/branding/xubie-logo-new.jpeg"
                alt="Xubie Snacks"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="44px"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg tracking-wide text-[var(--foreground)]">
                Xubie Snacks
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[var(--primary)] uppercase font-medium">
                Snacks That Smack
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to order some snacks!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <Link
              href="/menu"
              className="relative p-2.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] flex items-center justify-center font-bold animate-bounce-in shadow-primary">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/menu"
              className="px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium tracking-wide rounded-full hover:opacity-90 active:scale-[0.97] transition-all shadow-primary"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-1">
            <Link href="/menu" className="relative p-2.5 text-[var(--foreground)]">
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[9px] flex items-center justify-center font-bold shadow-primary">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-[var(--foreground)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-[var(--background)] shadow-2xl md:hidden transition-transform duration-400 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/20">
              <Image src="/branding/xubie-logo-new.jpeg" alt="Xubie Snacks" fill className="object-cover" sizes="40px" />
            </div>
            <span className="font-serif text-base text-[var(--foreground)]">Xubie Snacks</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[var(--muted-foreground)]">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3.5 px-4 text-base font-medium text-[var(--foreground)] rounded-xl hover:bg-[var(--secondary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] font-medium rounded-full shadow-primary"
            >
              Order Now
            </Link>
            <a
              href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to order some snacks!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-3.5 bg-emerald-500 text-white font-medium rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              WhatsApp Order
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--muted-foreground)] mb-2">Payment</p>
            <div className="flex flex-wrap gap-2">
              {["CashApp $XULANIN7", "Zelle", "Cash"].map((p) => (
                <span key={p} className="text-xs bg-[var(--secondary)] rounded-full px-3 py-1.5 text-[var(--foreground)]">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
