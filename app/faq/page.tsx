import { Navigation } from "@/components/navigation";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function FaqPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
