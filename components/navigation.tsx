"use client";
import Image from "next/image";
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
          ? "bg-[var(--background)]/98 backdrop-blur-md shadow-sm py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative w-12 h-12 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/20 transition-all duration-300 group-hover:scale-110 shadow-lg">
            <Image
              src="/branding/xubie-logo.png"
              alt="Xubie Snacks logo"
              fill
              className="object-cover"
              sizes="48px"
              priority
            />
          </div>
          <div>
            <span className="font-serif text-base sm:text-lg tracking-wide text-[var(--foreground)] block leading-tight">
              Xubie Snacks
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              Snacks That Smack
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

        {/* Mobile right side: cart + hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/menu"
            className="relative p-2.5 text-[var(--foreground)]"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 -mr-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--background)]/98 backdrop-blur-md border-b border-[var(--border)]">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base py-3 px-2 text-[var(--foreground)] rounded-lg active:bg-[var(--secondary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 mt-3 px-2 pb-1">
              <a
                href="https://www.instagram.com/xubie_snacks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
              >
                <InstagramIcon size={16} className="text-[var(--primary)]" />
                @xubie_snacks
              </a>
            </div>
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 text-center px-6 py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium tracking-wide rounded-full"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
