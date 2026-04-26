"use client";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/icons";

const instagramPosts = [
  {
    emoji: "🥜",
    caption: "Golden Crunch Mix — our signature snack that started it all!",
    gradient: "from-amber-100 to-orange-100",
  },
  {
    emoji: "🌶️",
    caption: "Spiced Plantain Chips dropping this weekend!",
    gradient: "from-red-100 to-orange-100",
  },
  {
    emoji: "🍫",
    caption: "Cocoa Cashew Clusters — decadent but guilt-free",
    gradient: "from-amber-50 to-yellow-100",
  },
  {
    emoji: "🌿",
    caption: "Matcha Coconut Bites for your morning energy boost",
    gradient: "from-green-100 to-emerald-50",
  },
  {
    emoji: "🎉",
    caption: "Catering setup for the Bay Area Founders meetup!",
    gradient: "from-purple-100 to-pink-100",
  },
  {
    emoji: "👩‍🍳",
    caption: "Behind the scenes in our San Jose kitchen",
    gradient: "from-orange-100 to-amber-50",
  },
];

export function InstagramSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
            Follow Us
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
            <span className="text-[var(--primary)]">@xubie_snacks</span> on
            Instagram
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-lg mx-auto">
            Behind-the-scenes peeks, new flavor drops, event highlights, and
            the snack-fueled life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/xubie_snacks"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
              >
                <span className="text-6xl md:text-7xl group-hover:scale-125 transition-transform duration-500">
                  {post.emoji}
                </span>
              </div>
              <div className="absolute inset-0 bg-[var(--foreground)]/0 group-hover:bg-[var(--foreground)]/60 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <p className="text-white text-sm leading-snug">
                  {post.caption}
                </p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={18} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/xubie_snacks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-full text-sm text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-colors"
          >
            <InstagramIcon size={18} className="text-[var(--primary)]" />
            Follow @xubie_snacks
          </a>
        </div>
      </div>
    </section>
  );
}
