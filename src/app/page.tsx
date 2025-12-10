




import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { albums, testimonials } from "@/lib/static-data";

export default function Home() {
  // Curate homepage gallery images
  const sessionStart = albums.find(a => a.albumName === "Session Start")?.photos || [];
  // Skip first image (Main Photo) in Annual Function slice as it is added manually at the start
  const annualFunction = albums.find(a => a.albumName === "Annual Function")?.photos?.slice(1, 11) || [];
  const sports = albums.find(a => a.albumName === "Sports & Achivements")?.photos?.slice(0, 5) || [];
  const campus = albums.find(a => a.albumName === "Campus Life")?.photos?.slice(0, 4) || [];
  const womansDay = albums.find(a => a.albumName === "Woman_s Day Celebration")?.photos?.slice(0, 5) || [];

  const galleryImages = [
    "/siakhargone-content/album/photo-for-uploads/main-photo.webp",
    ...sessionStart,
    ...annualFunction,
    ...womansDay,
    ...sports,
    ...campus
  ];

  const cmsData = {
    hero: {
      title: "Where Excellence Begins.",
      subtitle: "Nurturing tomorrow's leaders through a blend of tradition and innovation.",
      sanskrit: "विद्या ददाति विनयम्",
      video: "https://www.youtube.com/watch?v=6-i18-xt8sI",
      grid: [
        "/siakhargone-content/album/photo-for-uploads/infrastructure-photos/building-photos/infrastructure-building-2.webp",
        "/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2821.webp",
        "/siakhargone-content/album/photo-for-uploads/rainy-day-plantation/girldrawing.webp",
        "/siakhargone-content/album/photo-for-uploads/infrastructure-photos/library-photos/infrastructure-library-2.webp",
      ],
      cta1Href: "/admissions",
      cta2Href: "/gallery"
    },
    stats: [
      { label: "Students", value: "1500+" },
      { label: "Teachers", value: "75+" },
      { label: "Years of Excellence", value: "15+" },
      { label: "Awards Won", value: "50+" }
    ],
    gallery: galleryImages
  };

  return (
    <>
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <WhyChoose />
      <CampusFacilities />
      <Academics />
      <AchievementsSection />
      <GallerySection images={cmsData.gallery} />
      <Testimonials testimonials={testimonials} isLoading={false} />
      <CTASection />
    </>
  );
}

