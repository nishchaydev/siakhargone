
import { fetchStrapi, fetchStrapiSafe, getStrapiMedia } from "@/lib/strapi";
import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";



// ... imports ...

export default async function Home() {
  // Parallel fetch for performance with error swallowing (Safe Mode)
  const [homeRes, academicsRes, newsRes, albumRes] = await Promise.all([
    fetchStrapiSafe("homepage", "populate=deep,10"),
    fetchStrapiSafe("academic-stages", "populate=deep,10"),
    fetchStrapiSafe("news-items", "populate=deep,10"),
    fetchStrapiSafe("albums", "populate=deep,10")
  ]);

  const homeData = homeRes?.data?.attributes;
  const academicsData = academicsRes?.data || [];
  const newsData = newsRes?.data || [];

  // Gallery Logic: Get first album and extract photo URLs
  // User said: "Gallery shows real albums". GallerySection usually shows a preview.
  // We'll pick the first album's photos for the homepage slider if available, or just mix distinct photos from albums.
  // Let's just take all photos from the first album for now as a safe bet.
  const galleryImages = albumRes?.data?.[0]?.attributes?.photos?.data?.map((img: any) => getStrapiMedia(img.attributes.url)) || [];


  // Map Homepage Data
  const cmsData = {
    hero: {
      title: homeData?.heroTitle || "",
      subtitle: homeData?.heroSubtitleHindi || "", // Assuming subtitle is mapped here, user asked for heroSubtitleHindi in request
      sanskrit: homeData?.heroSubtitleHindi || "", // Keeping existing mapping logic or verifying schema? User said "heroSubtitleHindi".
      description: homeData?.heroDescription || "",
      video: getStrapiMedia(homeData?.heroVideo?.data?.attributes?.url),
      grid: homeData?.bentoTiles?.map((tile: any) => getStrapiMedia(tile.media?.data?.attributes?.url)) || [],
      cta1Href: "/admissions",
      cta2Href: "/gallery"
    },
    stats: homeData?.stats?.map((s: any) => ({
      label: s.label,
      value: s.value
    })) || [],
    academics: academicsData,
    news: newsData.map((item: any) => ({
      id: item.id,
      title: item.attributes.Title,
      description: item.attributes.Description,
      date: item.attributes.Date || item.attributes.createdAt, // Fallback to createdAt if Date not present
      image: getStrapiMedia(item.attributes.Cover?.data?.attributes?.url),
      slug: item.attributes.slug
    })),
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
      <Academics stages={cmsData.academics} />
      <AchievementsSection news={cmsData.news} />
      <GallerySection images={cmsData.gallery} />
      <Testimonials testimonials={[]} isLoading={false} />
      <CTASection />
    </>
  );
}
