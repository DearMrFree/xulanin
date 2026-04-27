"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Building2, PartyPopper, Heart, Users, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Events",
    description: "Impress clients and treat your team with our premium baked goods. Perfect for meetings, conferences, and office celebrations.",
    image: "/images/corporate-catering.jpg",
    features: ["Bulk ordering available", "Branded packaging options", "Recurring order discounts", "Delivery included"]
  },
  {
    id: "parties",
    icon: PartyPopper,
    title: "Parties & Celebrations",
    description: "Make your birthday, graduation, or milestone unforgettable with custom cakes, cupcakes, and dessert spreads.",
    image: "/images/party-events.jpg",
    features: ["Custom themes & colors", "Personalized cakes", "Full dessert tables", "Setup available"]
  },
  {
    id: "special",
    icon: Heart,
    title: "Special Occasions",
    description: "Weddings, baby showers, anniversaries - we create elegant dessert experiences for your most cherished moments.",
    image: "/images/special-occasions.jpg",
    features: ["Tasting sessions", "Custom designs", "Tiered cakes", "Dessert bars"]
  }
]

const stats = [
  { value: "500+", label: "Events Catered" },
  { value: "50+", label: "Corporate Clients" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24hr", label: "Rush Available" }
]

export function CateringSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeService, setActiveService] = useState("corporate")
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

  const currentService = services.find(s => s.id === activeService) || services[0]

  return (
    <section 
      id="catering" 
      ref={sectionRef}
      className="py-32 px-6 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">For Every Occasion</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            CATERING & <span className="text-primary">EVENTS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From boardroom meetings to birthday bashes, we bring the sweetness to your special moments. 
            Let us handle the treats while you focus on making memories.
          </p>
        </div>

        {/* Service Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  activeService === service.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card text-foreground hover:bg-card/80"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-semibold">{service.title}</span>
              </button>
            )
          })}
        </div>

        {/* Service Content */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-20 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src={currentService.image}
              alt={currentService.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-card-foreground text-2xl font-bold">{currentService.title}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {currentService.description}
            </p>
            
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold">What&apos;s Included</p>
              <ul className="space-y-3">
                {currentService.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/inquiry">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  Get a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="px-8">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-2xl">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trusted By */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-lg font-semibold">Local Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span className="text-lg font-semibold">Offices</span>
            </div>
            <div className="flex items-center gap-2">
              <PartyPopper className="h-6 w-6" />
              <span className="text-lg font-semibold">Event Planners</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6" />
              <span className="text-lg font-semibold">Families</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
