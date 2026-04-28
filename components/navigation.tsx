"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Story" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--background)]/98 backdrop-blur-md shadow-sm py-1.5 sm:py-2"
          : "bg-transparent py-2.5 sm:py-4"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo — prominent */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-14 h-14 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/25 transition-all duration-300 group-hover:scale-105 shadow-lg">
            <Image
              src="/branding/xubie-logo-new.jpeg"
              alt="Xubie Snacks"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </div>
          <span className="font-serif text-lg sm:text-xl tracking-wide text-[var(--foreground)] leading-tight">
            Xubie Snacks
          </span>
        </Link>

        {/* Desktop nav — minimal links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right — cart + CTA only */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/menu"
            className="relative p-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/menu"
            className="px-5 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm tracking-wide rounded-full hover:opacity-90 transition-opacity"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile right — cart + hamburger */}
        <div className="flex md:hidden items-center gap-1.5">
          <Link href="/menu" className="relative p-2.5 text-[var(--foreground)]">
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — clean, minimal */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--background)]/98 backdrop-blur-md border-b border-[var(--border)]">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-3 text-base text-[var(--foreground)] rounded-lg active:bg-[var(--secondary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 text-center py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium tracking-wide rounded-full"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
