"use client";
import Image from "next/image";
import { TikTokIcon } from "@/components/icons";
import { XUBIE_DATA } from "@/lib/data";

const tiktokHighlights = [
  {
    title: "First Bite Reactions",
    description:
      "Customers trying Xubie Snacks for the first time — every expression is real, unscripted, and usually followed by a second order.",
    image: "/branding/community-closeup.jpeg",
    views: "2.1K",
  },
  {
    title: "Pop-Up Setup ASMR",
    description:
      "Watch the booth come together — tablecloth, menu board, spin wheel, desserts, QR codes, the whole Xubie world in 60 seconds.",
    image: "/branding/community-hero.jpeg",
    views: "1.8K",
  },
  {
    title: "Banana Pudding Process",
    description:
      "From layering to lid — the signature Banana Pudding Cup built live in-booth. The video that made DMs flood.",
    image: "/branding/community-smile.jpeg",
    views: "3.4K",
  },
  {
    title: "Lake Merritt Snack Sundays",
    description:
      "Bay Area sunshine, a packed booth, and desserts moving fast. This is what Snack Sundays look and feel like.",
    image: "/branding/instagram-grid.png",
    views: "1.5K",
  },
  {
    title: "Xubie Cake Reveal",
    description:
      "The moment the Xubie Cake comes out of the box — soft, sweet, and built for the camera. The crowd favorite that earned its name.",
    image: "/branding/community-side.jpeg",
    views: "2.7K",
  },
  {
    title: "Behind the Brand",
    description:
      "Nina Lux on building Xubie Snacks from a school project to a Bay Area booth brand. The story behind every pop-up.",
    image: "/branding/tiktok-avatar.jpeg",
    views: "1.2K",
  },
];

export function TikTokSection() {
  const { tiktok } = XUBIE_DATA.company;

  return (
    <section id="tiktok" className="py-24 bg-[var(--card)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            Watch &amp; Follow
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            <span className="text-[var(--primary)]">@xubiesnacks</span> on
            TikTok
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-2xl mx-auto">
            {tiktok.stats.videos} videos, {tiktok.stats.followers.toLocaleString()}{" "}
            followers, and {tiktok.stats.likes.toLocaleString()} likes — first-bite
            reactions, booth setups, behind-the-scenes builds, and the energy that
            makes Xubie a movement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiktokHighlights.map((item, index) => (
            <a
              key={index}
              href={tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/30 transition-all duration-300"
            >
              <div className="relative aspect-[9/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>

                {/* Views badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  {item.views}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-white font-serif text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <TikTokIcon size={18} />
            Follow @xubiesnacks
          </a>
          <a
            href="https://www.instagram.com/xubie_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-full text-sm text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors"
          >
            Also on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
