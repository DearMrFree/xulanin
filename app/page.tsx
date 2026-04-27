import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MarqueeBanner } from "@/components/marquee-banner"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { CateringSection } from "@/components/catering-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { InstagramSection } from "@/components/instagram-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <ProductsSection />
      <CateringSection />
      <TestimonialsSection />
      <InstagramSection />
      <MarqueeBanner />
      <Footer />
    </main>
  )
}
