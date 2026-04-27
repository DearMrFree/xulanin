"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Office Manager",
    company: "Tech Startup",
    quote: "Xubie Snacks has become our go-to for all office celebrations. The team absolutely loves the banana pudding! We now have a standing monthly order.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "Event Planner",
    company: "Dream Events Co.",
    quote: "I've worked with many caterers, but Xubie stands out. They delivered 200 cupcakes for a corporate gala and every single one was perfect. Highly recommend!",
    rating: 5
  },
  {
    id: 3,
    name: "Lisa K.",
    role: "Mom of 3",
    company: "Birthday Party",
    quote: "The custom birthday cake for my daughter's party was AMAZING! All the parents were asking where I got it. Xubie made her day so special.",
    rating: 5
  },
  {
    id: 4,
    name: "David R.",
    role: "CEO",
    company: "Local Business",
    quote: "We've been ordering from Xubie Snacks for our client meetings for over a year. It's the little details that impress, and these treats always do.",
    rating: 5
  }
]

export function TestimonialsSection() {
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
      ref={sectionRef}
      className="py-24 px-6 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">Happy Customers</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            WHAT PEOPLE <span className="text-primary">SAY</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-background rounded-2xl p-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              
              {/* Quote */}
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} • {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
