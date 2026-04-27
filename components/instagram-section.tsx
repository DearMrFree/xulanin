"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  { id: 1, image: "/images/hero-snacks.jpg", likes: "2.4K", comments: "89" },
  { id: 2, image: "/images/product-1.jpg", likes: "1.8K", comments: "56" },
  { id: 3, image: "/images/product-2.jpg", likes: "3.1K", comments: "124" },
  { id: 4, image: "/images/lifestyle.jpg", likes: "4.2K", comments: "203" },
  { id: 5, image: "/images/product-3.jpg", likes: "2.9K", comments: "97" },
  { id: 6, image: "/images/hero-snacks.jpg", likes: "1.5K", comments: "45" },
]

export function InstagramSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="vibes"
      ref={sectionRef}
      className="py-32 px-6 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Instagram className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">@xubie_snacks</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            SWEET <span className="text-primary">VIBES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fresh bakes. Happy customers. Sweet moments.
            Follow us for new flavors and to place your order!
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://www.instagram.com/xubie_snacks/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={post.image}
                alt={`Xubie Snacks Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-6 text-foreground">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <Button 
            asChild
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base uppercase tracking-widest"
          >
            <a href="https://www.instagram.com/xubie_snacks/" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" />
              Follow @xubie_snacks
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
