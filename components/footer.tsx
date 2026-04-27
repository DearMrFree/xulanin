"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.jpg"
                alt="Xubie Snacks"
                width={100}
                height={100}
                className="rounded-full"
              />
            </Link>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              Homemade baked goods for every occasion. From corporate events to birthday parties, 
              we bring the sweetness. DM us on Instagram or request a quote!
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/xubie_snacks/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hello@xubiesnacks.com"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Order</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  Shop Menu
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="#catering" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  Catering & Events
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  Get a Quote
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                  Our Story
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://www.instagram.com/xubie_snacks/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  Instagram
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="tel:4088496090"
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  (408)-849-6090
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Xubie Snacks. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Snacks That Smack. Baked with Love. &nbsp;|&nbsp; San Jose, CA 95116
          </p>
        </div>
      </div>
    </footer>
  )
}
