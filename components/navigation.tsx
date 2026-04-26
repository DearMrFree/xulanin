"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";

const navLinks = [
  { href: "/", label: "Home" },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--background)]/98 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-[var(--primary)] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <span className="text-[var(--primary-foreground)] font-serif text-xl font-bold">
              X
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-lg tracking-wide text-[var(--foreground)] block leading-tight">
              Xubie Snacks
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              Handcrafted Joy
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
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

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://www.instagram.com/xubie_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <InstagramIcon size={16} className="text-[var(--primary)]" />
            <span>@xubie_snacks</span>
          </a>
          <Link
            href="/menu"
            className="relative flex items-center gap-1.5 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/menu"
            className="px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm tracking-wide rounded-full hover:opacity-90 transition-opacity"
          >
            Order Now
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--background)]/98 backdrop-blur-md border-b border-[var(--border)]">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-3 text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 text-center px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm tracking-wide rounded-full"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
