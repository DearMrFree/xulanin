"use client";
import Image from "next/image";
import { InstagramIcon } from "@/components/icons";

const instagramPosts = [
  {
    src: "/branding/instagram-grid.png",
    alt: "Xubie Snacks Instagram grid showing Lake Merritt pop-up videos and product reactions",
    caption: "Lake Merritt, Snack Sundays, first bites, and real-time customer reactions.",
  },
  {
    src: "/branding/community-hero.jpeg",
    alt: "Xubie Snacks event booth with branded tablecloth, desserts, and payment QR codes",
    caption: "The booth world: branded tablecloth, desserts, merch, and QR-powered ordering.",
  },
  {
    src: "/branding/community-closeup.jpeg",
    alt: "Xubie Snacks booth with friends, family, and desserts at an event",
    caption: "Community-first visuals that make the brand feel like a scene, not just a table.",
  },
  {
    src: "/branding/community-smile.jpeg",
    alt: "Xubie Snacks pop-up with smiling group and desserts on display",
    caption: "Sweets and treats that pull people in before they even ask the price.",
  },
  {
    src: "/branding/community-side.jpeg",
    alt: "Xubie Snacks event setup with menu board, spinner, and dessert display",
    caption: "Menu boards, spin wheel, tasting trays, and the kind of setup people remember.",
  },
  {
    src: "/branding/instagram-profile.png",
    alt: "Xubie Snacks Instagram profile highlighting DM to order and local delivery",
    caption: "DM to order. Pick up or local delivery. San Jose, CA. Snacks That Smack.",
  },
];

export function InstagramSection() {
  return (
    <section id="instagram" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            Follow Us
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            <span className="text-[var(--primary)]">@xubie_snacks</span> in
            Motion
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-2xl mx-auto">
            Real booth photos, reels, customer reactions, menu drops, and the Bay
            Area pop-up energy that defines the brand.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/xubie_snacks"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-white text-sm leading-snug">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/xubie_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm hover:bg-[var(--primary)]/90 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/20"
          >
            <InstagramIcon size={18} />
            Follow @xubie_snacks
          </a>
        </div>
      </div>
    </section>
  );
}
