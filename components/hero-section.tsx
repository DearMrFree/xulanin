"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Truck, Star } from "lucide-react";
import { XUBIE_DATA } from "@/lib/data";

const trustBadges = [
  { icon: MessageCircle, text: "WhatsApp to Order" },
  { icon: Truck, text: "Pick Up / Local Delivery" },
  { icon: MapPin, text: "San Jose, CA" },
];

const marqueeItems = [
  "Banana Pudding",
  "Biscoff Banana Pudding",
  "Xubie Cake",
  "Snacks That Smack",
  "Bay Area Delivery",
  "Community Pop-Ups",
  "Handcrafted Desserts",
  "CashApp $XULANIN7",
];

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-hero-gradient">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[640px] h-[640px] opacity-[0.07] animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.21 50), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[480px] h-[480px] opacity-[0.06] animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.70 0.15 230), transparent 70%)", animationDelay: "-4s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[320px] h-[320px] opacity-[0.04] animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.21 50), transparent 70%)", animationDelay: "-8s" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.15 0.04 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.15 0.04 250) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-10 relative">
        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-5 mb-14 animate-fade-in-up">
          {trustBadges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] bg-white/70 backdrop-blur-sm border border-[var(--border)] px-4 py-2 rounded-full shadow-sm"
            >
              <badge.icon size={14} className="text-[var(--primary)]" />
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="animate-fade-in-up delay-100">
              <span className="inline-flex items-center gap-2 text-xs tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-4 py-2 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                San Jose, CA &bull; Pick Up + Local Delivery
              </span>
            </div>

            <h1 className="font-serif leading-[1.05] animate-fade-in-up delay-200">
              <span className="block text-5xl lg:text-7xl text-[var(--foreground)]">Snacks That</span>
              <span className="block text-6xl lg:text-8xl text-gradient">Smack</span>
            </h1>

            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-lg animate-fade-in-up delay-300">
              Banana Pudding, Biscoff Banana Pudding, and Xubie Cake — handcrafted
              desserts from the booth to your door. Order via WhatsApp or right here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-medium shadow-primary hover:opacity-90 active:scale-[0.97] transition-all duration-200"
              >
                Order Now
                <ArrowRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to order some snacks!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 active:scale-[0.97] transition-all duration-200 shadow-lg"
              >
                <MessageCircle size={18} />
                WhatsApp Order
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-4 animate-fade-in-up delay-500">
              <div className="flex -space-x-2">
                {["🧁","🍮","🎂"].map((e, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-[var(--primary)]/10 flex items-center justify-center text-sm"
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  100% approval · 25+ pop-ups
                </p>
              </div>
            </div>

            {/* Product mini cards */}
            <div className="grid grid-cols-3 gap-3 animate-fade-in-up delay-600">
              {XUBIE_DATA.products.map((product) => (
                <Link
                  key={product.id}
                  href="/menu"
                  className="group rounded-2xl border border-[var(--border)] bg-white/80 backdrop-blur-sm p-3.5 hover:border-[var(--primary)]/40 hover:shadow-md transition-all duration-200"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-[var(--primary)] font-medium mt-1">
                    ${product.priceReg} · ${product.priceLrg}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — image collage */}
          <div className="lg:col-span-7 animate-fade-in-up delay-300">
            <div className="relative">
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 z-20 glass rounded-2xl px-4 py-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-[var(--foreground)]">Open for orders</span>
                </div>
              </div>

              {/* Floating rating badge */}
              <div className="absolute -bottom-2 -right-2 z-20 glass rounded-2xl px-4 py-3 shadow-lg animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-xs font-semibold text-[var(--foreground)]">5.0 · 100+ reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-[1.15fr_0.85fr] gap-4 items-start">
                <div className="relative aspect-[4/4.8] rounded-[2.5rem] overflow-hidden shadow-xl border border-white/60">
                  <Image
                    src="/branding/community-smile.jpeg"
                    alt="Xubie Snacks booth with community gathered around desserts"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 1024px) 60vw, 35vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-lg border border-white/60">
                    <Image
                      src="/branding/community-closeup.jpeg"
                      alt="Banana Pudding close-up"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 35vw, 20vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg border border-white/60">
                    <Image
                      src="/branding/community-side.jpeg"
                      alt="Xubie Snacks event setup"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 35vw, 20vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee banner */}
        <div className="mt-20 -mx-6 relative overflow-hidden border-y border-[var(--border)] bg-[var(--primary)]/4 py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-5 px-8 text-base font-medium text-[var(--foreground)]/55"
              >
                {item}
                <span className="text-[var(--primary)] font-bold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
