"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowDown, Instagram, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const scrollY = window.scrollY
        textRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
        textRef.current.style.opacity = `${1 - scrollY / 600}`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-snacks.jpg"
          alt="Xubie Snacks Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <Image
          src="/images/logo.jpg"
          alt="Xubie Snacks"
          width={180}
          height={180}
          className="mx-auto mb-8 rounded-full shadow-2xl animate-in fade-in zoom-in duration-700"
        />
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="text-foreground">BAKED WITH</span>
          <br />
          <span className="text-primary">LOVE</span>
        </h1>
        
        <p className="text-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Homemade cookies, cakes, puddings & more.
          Every bite is made with love and good vibes only.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <Link href="/shop">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base uppercase tracking-widest"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Order Now
            </Button>
          </Link>
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="border-foreground/20 hover:bg-foreground/10 px-8 py-6 text-base uppercase tracking-widest"
          >
            <a href="https://www.instagram.com/xubie_snacks/" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" />
              Follow
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-24 h-24 border border-primary/20 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-12 w-16 h-16 border border-accent/20 rounded-full animate-pulse delay-500" />
    </section>
  )
}
