
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";

export default async function Home() {
  // 1. Fetch Homepage Data
  const homeRes = await fetchStrapi("homepage?populate[heroVideo]=*&populate[stats]=*&populate[bentoTiles][populate]=media");
  const homeData = homeRes?.data?.attributes;

  // 2. Fetch Gallery Album
  const albumRes = await fetchStrapi("albums?populate[photos]=*&pagination[limit]=1");
  const galleryImages = albumRes?.data?.[0]?.attributes?.photos?.data?.map((img: any) => getStrapiMedia(img.attributes.url)) || [];

  // 3. Map to Component Props
  const cmsData = {
    hero: {
      title: homeData?.heroTitle || "Where Excellence Begins.",
      subtitle: homeData?.heroDescription || "Nurturing tomorrow's leaders through a blend of tradition and innovation.",
      sanskrit: homeData?.heroSubtitleHindi || "विद्या ददाति विनयम्",
      video: getStrapiMedia(homeData?.heroVideo?.data?.attributes?.url),
      grid: homeData?.bentoTiles?.map((tile: any) => getStrapiMedia(tile.media?.data?.attributes?.url)) || [],
      cta1Href: "/admissions",
      cta2Href: "/gallery"
    },
    stats: homeData?.stats?.map((s: any) => ({
      label: s.label,
      value: s.value
    })) || [],
    gallery: galleryImages
  };

  if (!homeData) {
    console.warn("Strapi Homepage data missing. Is the server running and populated?");
  }

  return (
    <>
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <WhyChoose />
      <CampusFacilities />
      <Academics />
      <AchievementsSection />
      <GallerySection images={cmsData.gallery} />
      <Testimonials testimonials={[]} isLoading={false} />
      <CTASection />
    </>
  );
}
