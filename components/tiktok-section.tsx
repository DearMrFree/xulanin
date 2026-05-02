"use client";
import Image from "next/image";
import { TikTokIcon } from "@/components/icons";
import { XUBIE_DATA } from "@/lib/data";

const tiktokHighlights = [
  {
    title: "First Bite Reactions",
    description: "Customers trying Xubie Snacks for the first time — every expression is real, unscripted, and usually followed by a second order.",
    image: "/branding/community-closeup.jpeg",
    views: "2.1K",
  },
  {
    title: "Pop-Up Setup ASMR",
    description: "Watch the booth come together — tablecloth, menu board, spin wheel, desserts, QR codes, the whole Xubie world in 60 seconds.",
    image: "/branding/community-hero.jpeg",
    views: "1.8K",
  },
  {
    title: "Banana Pudding Process",
    description: "From layering to lid — the signature Banana Pudding Cup built live in-booth. The video that made DMs flood.",
    image: "/branding/community-smile.jpeg",
    views: "3.4K",
  },
  {
    title: "Lake Merritt Snack Sundays",
    description: "Bay Area sunshine, a packed booth, and desserts moving fast. This is what Snack Sundays look and feel like.",
    image: "/branding/instagram-grid.png",
    views: "1.5K",
  },
  {
    title: "Xubie Cake Reveal",
    description: "The moment the Xubie Cake comes out of the box — soft, sweet, and built for the camera.",
    image: "/branding/community-side.jpeg",
    views: "2.7K",
  },
  {
    title: "Behind the Brand",
    description: "Nina Lux on building Xubie Snacks from a school project to a Bay Area booth brand.",
    image: "/branding/tiktok-avatar.jpeg",
    views: "1.2K",
  },
];

export function TikTokSection() {
  const { tiktok } = XUBIE_DATA.company;

  return (
    <section id="tiktok" className="py-28 bg-warm-gradient">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase font-medium">
              Watch &amp; Follow
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
              <span className="text-gradient">@xubiesnacks</span>
              <span className="block text-3xl lg:text-4xl text-[var(--muted-foreground)] mt-1">on TikTok</span>
            </h2>
            <div className="flex flex-wrap gap-6 mt-4">
              {[
                { val: tiktok.stats.videos, lbl: "Videos" },
                { val: tiktok.stats.followers.toLocaleString(), lbl: "Followers" },
                { val: tiktok.stats.likes.toLocaleString(), lbl: "Likes" },
              ].map((s) => (
                <div key={s.lbl}>
                  <span className="font-serif text-2xl text-[var(--foreground)]">{s.val}</span>
                  <span className="text-xs text-[var(--muted-foreground)] ml-1">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href={tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity self-start"
          >
            <TikTokIcon size={16} />
            Follow @xubiesnacks
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {tiktokHighlights.map((item, index) => (
            <a
              key={index}
              href={tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[9/11] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>

                {/* Views badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  {item.views}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-white font-serif text-base mb-1 leading-tight">{item.title}</h3>
                  <p className="text-white/65 text-xs leading-snug line-clamp-2">{item.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
