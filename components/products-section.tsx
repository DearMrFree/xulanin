"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Cookies",
    tagline: "Gooey & delicious",
    image: "/images/product-1.jpg",
    color: "from-primary/30 to-transparent"
  },
  {
    id: 2,
    name: "Banana Pudding",
    tagline: "Creamy perfection",
    image: "/images/product-2.jpg",
    color: "from-accent/30 to-transparent"
  },
  {
    id: 3,
    name: "Cakes",
    tagline: "For every occasion",
    image: "/images/product-3.jpg",
    color: "from-primary/30 to-transparent"
  }
]

export function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null)
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
      id="products" 
      ref={sectionRef}
      className="py-32 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-4">Sweet Treats</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            THE <span className="text-primary">MENU</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    activeProduct === product.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color}`} />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className={`transition-all duration-500 ${
                    activeProduct === product.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-80"
                  }`}>
                    <p className="text-primary text-sm uppercase tracking-widest mb-2">{product.tagline}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{product.name}</h3>
                    <div className={`flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground transition-all duration-300 ${
                      activeProduct === product.id ? "opacity-100" : "opacity-0"
                    }`}>
                      Coming Soon <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                0{product.id}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <p className="text-muted-foreground text-lg mb-4">DM us on Instagram to place your order!</p>
          <p className="text-primary text-sm uppercase tracking-widest">@xubie_snacks for custom orders & catering</p>
        </div>
      </div>
    </section>
  )
}
