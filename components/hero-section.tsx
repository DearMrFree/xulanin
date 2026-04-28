"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Truck } from "lucide-react";
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
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--accent)]/5" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)]/8 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-36 pb-12 relative">
        <div className="flex flex-wrap items-center gap-6 mb-12">
          {trustBadges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
            >
              <badge.icon size={16} className="text-[var(--primary)]" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-8">
            <span className="inline-block text-xs tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-4 py-2 rounded-full">
              San Jose, CA &bull; Pick Up + Local Delivery
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl leading-tight text-[var(--foreground)]">
              Snacks That <span className="text-[var(--primary)]">Smack</span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl">
              Banana Pudding, Biscoff Banana Pudding, and Xubie Cake — handcrafted
              desserts from the booth to your door. Order via WhatsApp or right
              here on the site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                Order Now
                <ArrowRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${XUBIE_DATA.company.whatsapp}?text=${encodeURIComponent("Hi Xulanin! I'd like to order some snacks!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp Order
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
              {XUBIE_DATA.products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm p-4 hover:border-[var(--primary)]/30 transition-colors"
                >
                  <p className="text-lg font-semibold text-[var(--foreground)]">
                    {product.name}
                  </p>
                  <p className="text-xs text-[var(--primary)] font-medium mt-1">
                    Reg ${product.priceReg} | Lrg ${product.priceLrg}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-4 items-start">
                <div className="relative aspect-[4/4.6] rounded-[2rem] overflow-hidden shadow-2xl border border-white/40">
                  <Image
                    src="/branding/community-smile.jpeg"
                    alt="Xubie Snacks booth with community gathered around desserts and branded table"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-white/40">
                    <Image
                      src="/branding/community-closeup.jpeg"
                      alt="Banana Pudding Cup close-up with layered cream and wafers"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-white/40">
                    <Image
                      src="/branding/community-hero.jpeg"
                      alt="Biscoff Banana Pudding with caramel drizzle"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-16 -mx-6 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
              (item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-4 px-8 text-lg font-serif text-[var(--muted-foreground)]/40"
                >
                  {item}
                  <span className="text-[var(--primary)]">&bull;</span>
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
