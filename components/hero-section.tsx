"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Truck } from "lucide-react";

const trustBadges = [
  { icon: MessageCircle, text: "DM to Order" },
  { icon: Truck, text: "Pick Up / Local Delivery" },
  { icon: MapPin, text: "San Jose, CA" },
];

const marqueeItems = [
  "Banana Pudding",
  "Xubie Cake",
  "Lake Merritt Pop-Up",
  "Sweets and Treats",
  "Snack Sundays",
  "Bay Area Delivery",
  "Community Booths",
  "Handcrafted Desserts",
];

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[var(--primary)]/10 via-[var(--teal)]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)]/15 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--teal)]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-[var(--cookie)]/15 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-12 relative">
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
            <span className="inline-flex items-center gap-2 text-xs tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/15 px-5 py-2.5 rounded-full border border-[var(--primary)]/20 shadow-sm">
              <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></span>
              San Jose, CA • Pick Up + Local Delivery
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl leading-tight text-[var(--foreground)]">
              Snacks That{" "}
              <span className="relative inline-block text-[var(--primary)]">
                Smack
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q25,0 50,8 T100,8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" className="text-[var(--primary)]/40"/>
                </svg>
              </span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl">
              From Lake Merritt pop-ups to sweets-and-treats tables, Xubie Snacks
              brings handcrafted desserts, crowd-favorite bites, and real Bay Area
              community energy to every order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:bg-[var(--primary)]/90 transition-all shadow-lg hover:shadow-xl hover:shadow-[var(--primary)]/20 hover:-translate-y-0.5"
              >
                Order Now
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#instagram"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--accent)] text-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-all"
              >
                See the Brand in Motion
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm p-4">
                <p className="text-2xl font-semibold text-[var(--foreground)]">29</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mt-1">
                  Instagram Posts
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm p-4">
                <p className="text-2xl font-semibold text-[var(--foreground)]">614</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mt-1">
                  Followers
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm p-4">
                <p className="text-2xl font-semibold text-[var(--foreground)]">Local</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mt-1">
                  Delivery + Pickup
                </p>
              </div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="absolute left-6 right-6 bottom-6 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                      Real Bay Area Pop-Up Energy
                    </p>
                    <p className="font-serif text-2xl mt-2">
                      Sweets, treats, merch, QR codes, and community all in one frame.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-xl">
                    <Image
                      src="/branding/instagram-profile.png"
                      alt="Xubie Snacks Instagram profile showing brand bio and local delivery positioning"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-xl">
                    <Image
                      src="/branding/community-side.jpeg"
                      alt="Xubie Snacks event setup with menu board, desserts, and branded banner"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute left-5 right-5 bottom-5 text-white">
                      <p className="text-sm font-medium">Menu boards, spin wheel, and booth theatre</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 left-4 right-4 md:left-auto md:right-6 md:w-72 bg-[var(--background)]/95 backdrop-blur-sm px-6 py-4 rounded-3xl border border-[var(--border)] shadow-lg">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)] mb-2">
                  Brand Promise
                </p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  DM to order, pick up locally, or book a pop-up table that feels
                  alive before the first bite even lands.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0">
                {marqueeItems.map((item, i) => (
                  <span
                    key={`${setIndex}-${i}`}
                    className="px-8 py-3 text-sm text-[var(--muted-foreground)] whitespace-nowrap"
                  >
                    {item}
                    <span className="mx-8 text-[var(--primary)]">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
