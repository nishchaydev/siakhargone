
import { fallbackHighlights, fallbackTestimonials, fallbackPrincipalMessage, fallbackChairmanMessage, fallbackHeroData, fallbackStats } from "@/data/fallbackData";
import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";

export default async function Home() {
  const principalMessage = fallbackPrincipalMessage[0];
  const chairmanMessage = fallbackChairmanMessage[0];
  const displayHighlights = fallbackHighlights;
  const displayTestimonials = fallbackTestimonials;

  // Use static data directly to avoid self-fetch overhead for better LCP/TTFB
  const cmsData = {
    hero: fallbackHeroData,
    stats: fallbackStats,
    gallery: [
      "https://picsum.photos/seed/gallery1/600/600",
      "https://picsum.photos/seed/gallery2/600/600",
      "https://picsum.photos/seed/gallery3/600/600",
      "https://picsum.photos/seed/gallery4/600/600",
      "https://picsum.photos/seed/gallery5/600/600",
      "https://picsum.photos/seed/gallery6/600/600"
    ]
  };

  return (
    <>
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <WhyChoose />
      <CampusFacilities />
      <Academics />
      <AchievementsSection />
      <GallerySection images={cmsData.gallery} />
      <Testimonials testimonials={displayTestimonials} isLoading={false} />
      <CTASection />
    </>
  );
}
