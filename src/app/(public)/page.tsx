import HeroSection from "@/components/sections/HeroSection";
// Don't lazy load LatestNews to prevent "pop-in" if we have data instantly.
// But we still can if we want to reduce bundle, but passing props is key.
import { LatestNews } from "@/components/home/LatestNews";

import nextDynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// Lazy Load Non-Critical Components
const AtAGlance = nextDynamic(() => import("@/components/home/AtAGlance").then(mod => mod.AtAGlance));
const WhyChoose = nextDynamic(() => import("@/components/home/WhyChoose").then(mod => mod.WhyChoose), {
  loading: () => <div className="py-20"><Skeleton className="h-[400px] w-full max-w-7xl mx-auto rounded-xl" /></div>
});
const PrincipalMessage = nextDynamic(() => import("@/components/home/PrincipalMessage").then(mod => mod.PrincipalMessage));
// LatestNews is now imported directly for performance

const CTASection = nextDynamic(() => import("@/components/home/CTASection").then(mod => mod.CTASection));
const Academics = nextDynamic(() => import("@/components/home/Academics").then(mod => mod.Academics));
const StudentAchievers = nextDynamic(() => import("@/components/home/StudentAchievers").then(mod => mod.StudentAchievers));
const LifeAtSIA = nextDynamic(() => import("@/components/home/LifeAtSIA").then(mod => mod.LifeAtSIA));
// const AchievementsSection = dynamic(() => import("@/components/home/AchievementsSection").then(mod => mod.AchievementsSection)); // Deprecated
const Testimonials = nextDynamic(() => import("@/components/home/Testimonials").then(mod => mod.Testimonials));

import { albums, testimonials } from "@/lib/static-data";
import { cloudinary } from "@/lib/cloudinary-images";
import { getNewsService } from "@/services/newsService";
import { CMSNewsItem, getSiteAssets, SiteAsset, getCMSAchievers, CMSAchiever } from "@/lib/cms-fetch";

// Force dynamic rendering since we are fetching news which updates frequently
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Hybrid Fetching: News is dynamic, Assets/Achievers are static/manual
  const [newsData] = await Promise.all([
    // Direct Service Call (No Fetch API Overhead/Error)
    getNewsService().catch(e => { console.error("News Fetch Error:", e); return []; })
  ]);

  // Static data for assets and achievers (Manually updated by user)
  const achieversData: CMSAchiever[] = [];

  // Curate homepage gallery images (Static for now as Gallery module is separate, or can be hybridized)
  // For now keeping sidebar/gallery logic static but Hero/LifeAtSIA dynamic as requested

  const sessionStart = albums.find(a => a.albumName === "Session Start")?.photos || [];
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
      video: "https://www.youtube.com/watch?v=6-i18-xt8sI&list=PLISDuk-0k1nqv1ujqS45lfSRRQBwugKQW&index=6", // User requested video
      grid: [
        cloudinary.infrastructure.building[0],
        cloudinary.infrastructure.classrooms[0],
        cloudinary.rainyDay[2],
        cloudinary.infrastructure.library[1],
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

  const lifeAtSIAImages = {
    assembly: cloudinary.sessionStart[0],
    library: cloudinary.infrastructure.library[0],
    labs: cloudinary.lab.computer[0],
    sports: cloudinary.sportsAchievements[2]
  };

  return (
    <>
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <AtAGlance />
      <WhyChoose />
      <PrincipalMessage />
      <Academics />
      <StudentAchievers achievers={achieversData} />
      <LatestNews initialNews={newsData} />
      <LifeAtSIA images={lifeAtSIAImages} />
      <Testimonials testimonials={testimonials} isLoading={false} />
      <CTASection />
    </>
  );
}
