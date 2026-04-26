import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { MenuPreview } from "@/components/menu-preview";
import { HowItWorks } from "@/components/how-it-works";
import { StorySection } from "@/components/story-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { InstagramSection } from "@/components/instagram-section";
import { TikTokSection } from "@/components/tiktok-section";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <MenuPreview />
        <HowItWorks />
        <StorySection />
        <TestimonialsSection />
        <TikTokSection />
        <InstagramSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
