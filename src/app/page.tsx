




import HeroSection from "@/components/sections/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CampusFacilities } from "@/components/home/CampusFacilities";
import { CTASection } from "@/components/home/CTASection";
import { Academics } from "@/components/home/Academics";
import { GallerySection } from "@/components/home/GallerySection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { albums } from "@/lib/static-data";

export default function Home() {
  const galleryImages = albums[0]?.photos || [];

  const cmsData = {
    hero: {
      title: "Where Excellence Begins.",
      subtitle: "Nurturing tomorrow's leaders through a blend of tradition and innovation.",
      sanskrit: "विद्या ददाति विनयम्",
      video: "/video-poster.jpg", // Placeholder or use static-data value
      grid: [
        "/siakhargone-content/Photo For Uploads/Annual Function/DSC_2323.JPG",
        "/siakhargone-content/Photo For Uploads/Annual Function/DSC_2342.JPG",
        "/siakhargone-content/Photo For Uploads/Annual Function/DSC_2410.JPG",
        "/siakhargone-content/Photo For Uploads/Annual Function/DSC_2419.JPG",
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
      <Testimonials testimonials={[]} isLoading={false} />
      <CTASection />
    </>
  );
}

