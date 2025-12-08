

import { fallbackHighlights, fallbackTestimonials, fallbackPrincipalMessage, fallbackChairmanMessage, fallbackHeroData, fallbackStats } from "@/data/fallbackData";
import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";


// Data fetching function
async function getHomepageData() {
  const res = await fetch('http://localhost:3000/api/cms/homepage', { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data');
    return {
      hero: fallbackHeroData,
      stats: []
    }
  }
  return res.json();
}

export default async function Home() {
  const principalMessage = fallbackPrincipalMessage[0];
  const chairmanMessage = fallbackChairmanMessage[0];
  const displayHighlights = fallbackHighlights;
  const displayTestimonials = fallbackTestimonials;

  // Fetch data
  let cmsData;
  try {
    cmsData = await getHomepageData();
  } catch (e) {
    cmsData = { hero: fallbackHeroData, stats: fallbackStats };
  }

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
