"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Xubie Snacks"
              width={60}
              height={60}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Our Story
            </Link>
            <Link href="#products" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Menu
            </Link>
            <Link href="#catering" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Catering
            </Link>
            <Link href="/shop" className="text-sm uppercase tracking-widest text-primary hover:text-primary/80 transition-colors font-semibold">
              Order Now
            </Link>
            <Link 
              href="https://www.instagram.com/xubie_snacks/" 
              target="_blank"
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
              Follow
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="flex flex-col gap-4 p-6">
              <Link 
                href="#about" 
                className="text-lg uppercase tracking-widest text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link 
                href="#products" 
                className="text-lg uppercase tracking-widest text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="#catering" 
                className="text-lg uppercase tracking-widest text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Catering & Events
              </Link>
              <Link 
                href="/shop" 
                className="text-lg uppercase tracking-widest text-primary font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Order Now
              </Link>
              <Link 
                href="/inquiry" 
                className="text-lg uppercase tracking-widest text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Quote
              </Link>
              <Link 
                href="https://www.instagram.com/xubie_snacks/" 
                target="_blank"
                className="flex items-center gap-2 text-lg uppercase tracking-widest text-muted-foreground"
              >
                <Instagram className="h-5 w-5" />
                Follow Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
