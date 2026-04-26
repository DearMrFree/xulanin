import { Navigation } from "@/components/navigation";
import { StorySection } from "@/components/story-section";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <StorySection />
      </main>
      <Footer />
    </>
  );
}
