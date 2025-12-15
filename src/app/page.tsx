




import HeroSection from "@/components/sections/HeroSection";
import dynamic from 'next/dynamic';

import { Skeleton } from "@/components/ui/skeleton";

// Lazy Load Non-Critical Components
const WhyChoose = dynamic(() => import("@/components/home/WhyChoose").then(mod => mod.WhyChoose), {
  loading: () => <div className="py-20"><Skeleton className="h-[400px] w-full max-w-7xl mx-auto rounded-xl" /></div>
});
const PrincipalMessage = dynamic(() => import("@/components/home/PrincipalMessage").then(mod => mod.PrincipalMessage));
const LatestNews = dynamic(() => import("@/components/home/LatestNews").then(mod => mod.LatestNews));

const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => mod.CTASection));
const Academics = dynamic(() => import("@/components/home/Academics").then(mod => mod.Academics));
const StudentAchievers = dynamic(() => import("@/components/home/StudentAchievers").then(mod => mod.StudentAchievers));
const LifeAtSIA = dynamic(() => import("@/components/home/LifeAtSIA").then(mod => mod.LifeAtSIA));
// const AchievementsSection = dynamic(() => import("@/components/home/AchievementsSection").then(mod => mod.AchievementsSection)); // Deprecated
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(mod => mod.Testimonials));

import { albums, testimonials } from "@/lib/static-data";
import { cloudinary } from "@/lib/cloudinary-images";

export default function Home() {
  // Curate homepage gallery images
  const sessionStart = albums.find(a => a.albumName === "Session Start")?.photos || [];
  // Skip first image (Main Photo) in Annual Function slice as it is added manually at the start
  const annualFunction = albums.find(a => a.albumName === "Annual Function")?.photos?.slice(1, 11) || [];
  const sports = albums.find(a => a.albumName === "Sports & Achivements")?.photos?.slice(0, 5) || [];
  const campus = albums.find(a => a.albumName === "Campus Life")?.photos?.slice(0, 4) || [];
  const womansDay = albums.find(a => a.albumName === "Woman_s Day Celebration")?.photos?.slice(0, 5) || [];

  const galleryImages = [
    cloudinary.annualFunction[0], // main-photo replacement
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
      video: "https://www.youtube.com/watch?v=6-i18-xt8sI", // Restored background video
      grid: [
        cloudinary.infrastructure.building[1],
        cloudinary.infrastructure.classrooms[0], // dsc_2821 replacement
        cloudinary.rainyDay[2], // rainy-day-3
        cloudinary.infrastructure.library[1], // library-2
      ],
      cta1Href: "/admissions",
      cta2Href: "https://www.youtube.com/watch?v=6-i18-xt8sI&list=PLISDuk-0k1nqv1ujqS45lfSRRQBwugKQW&index=6"
    },
    stats: [
      { label: "Students", value: "1100+" },
      { label: "Teachers", value: "50+" },
      { label: "Years of Experience", value: "10+" },
      { label: "Awards Won", value: "50+" }
    ],
    gallery: galleryImages
  };

  return (
    <>
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <WhyChoose />
      <PrincipalMessage />
      <Academics />
      <StudentAchievers />
      <LatestNews />
      <LifeAtSIA />
      <Testimonials testimonials={testimonials} isLoading={false} />
      <CTASection />
    </>
  );
}

