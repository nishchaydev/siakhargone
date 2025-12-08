
import { fallbackHighlights, fallbackTestimonials, fallbackPrincipalMessage, fallbackChairmanMessage, fallbackHeroData, fallbackStats } from "@/data/fallbackData";
import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";

import { getHomepageData } from "@/lib/cms";

export default async function Home() {
  const principalMessage = fallbackPrincipalMessage[0];
  const chairmanMessage = fallbackChairmanMessage[0];
  const displayHighlights = fallbackHighlights;
  const displayTestimonials = fallbackTestimonials;

  // Use centralized CMS data logic
  const cmsData = await getHomepageData();

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
