"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-32 px-6 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <p className="text-primary text-sm uppercase tracking-[0.3em]">Our Story</p>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              HOMEMADE WITH
              <span className="text-primary"> HEART</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Xubie Snacks is all about bringing that homemade goodness straight to you. 
                From gooey chocolate chip cookies to creamy banana pudding, every treat is baked with love.
              </p>
              <p>
                We&apos;re not just selling sweets - we&apos;re creating experiences. 
                From corporate events that impress clients to birthday parties that steal the show, 
                we bring the wow factor to every occasion.
              </p>
              <p>
                Whether you&apos;re planning an office celebration, a milestone birthday, 
                or need weekly treats for your team - we&apos;ve got you covered with 
                custom packages and reliable delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Events Catered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">50+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Corporate Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Homemade</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/lifestyle.jpg"
                alt="Xubie Snacks Lifestyle"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
