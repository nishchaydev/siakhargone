
import HeroSection from "@/components/sections/HeroSection";
import Schema from "@/components/seo/Schema";
// Don't lazy load LatestNews to prevent "pop-in" if we have data instantly.
import { LatestNews } from "@/components/home/LatestNews";

import nextDynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// Lazy Load Non-Critical Components
const AtAGlance = nextDynamic(() => import("@/components/home/AtAGlance").then(mod => mod.AtAGlance));
const WhyChoose = nextDynamic(() => import("@/components/home/WhyChoose").then(mod => mod.WhyChoose), {
  loading: () => <div className="py-20"><Skeleton className="h-[400px] w-full max-w-7xl mx-auto rounded-xl" /></div>
});
const PrincipalMessage = nextDynamic(() => import("@/components/home/PrincipalMessage").then(mod => mod.PrincipalMessage));
const StudentAchievers = nextDynamic(() => import("@/components/home/StudentAchievers").then(mod => mod.StudentAchievers));
const CTASection = nextDynamic(() => import("@/components/home/CTASection").then(mod => mod.CTASection));
const Academics = nextDynamic(() => import("@/components/home/Academics").then(mod => mod.Academics));
const LifeAtSIA = nextDynamic(() => import("@/components/home/LifeAtSIA").then(mod => mod.LifeAtSIA));
const Testimonials = nextDynamic(() => import("@/components/home/Testimonials").then(mod => mod.Testimonials));
const HomeFAQ = nextDynamic(() => import("@/components/home/HomeFAQ").then(mod => mod.HomeFAQ), {
  loading: () => <div className="py-20"><Skeleton className="h-[300px] w-full max-w-3xl mx-auto rounded-xl" /></div>
});

import { albums, testimonials, faqs } from "@/lib/static-data";
import { cloudinary } from "@/lib/cloudinary-images";
import { getNewsService } from "@/services/newsService";
import { getEventsService } from "@/services/eventsService";
import { getNoticesService } from "@/services/noticesService";

// Force dynamic rendering since we are fetching news which updates frequently
// CHANGED: Reduced revalidation time to 10 seconds for "ASAP" updates.
export const revalidate = 10;

// Basic shapes for the incoming data
interface BaseItem {
  id: string | number;
  date: string;
  title: string; // mapped from text or title
  description?: string;
  [key: string]: unknown; // Allow extra props from services if needed, but typed safely in union
}

interface NewsItem extends BaseItem {
  type: 'News';
}

interface EventItem extends BaseItem {
  type: 'Event';
}

interface NoticeItem extends BaseItem {
  type: 'Notice';
  text?: string;
}

type UpdateItem = NewsItem | EventItem | NoticeItem;


export default async function Home() {
  // Hybrid Fetching: News, Events & Notices
  const [newsItems, eventsItems, noticesItems] = await Promise.all([
    getNewsService().catch((e: unknown) => { console.error("News Fetch Error:", e); return []; }),
    getEventsService().catch((e: unknown) => { console.error("Events Fetch Error:", e); return []; }),
    getNoticesService().catch((e: unknown) => { console.error("Notices Fetch Error:", e); return []; })
  ]);


  const allUpdates: (UpdateItem & { timestamp: number })[] = [
    ...newsItems.map((item: any) => ({ ...item, type: 'News' } as UpdateItem)),
    ...eventsItems.map((item: any) => ({ ...item, type: 'Event' } as UpdateItem)),
    ...noticesItems.map((item: any) => ({ ...item, type: 'Notice', description: item.text || 'Important Notice' } as UpdateItem))
  ].map(item => {
    const timestamp = item.date ? new Date(item.date).getTime() : 0;
    return {
      ...item,
      timestamp: Number.isNaN(timestamp) ? 0 : timestamp
    };
  }).sort((a, b) => b.timestamp - a.timestamp);

  const latestUpdates = allUpdates.slice(0, 3);


  // Curate homepage gallery images
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
      title: "Sanskar International Academy",
      subtitle: "One of the most well-known and leading CBSE English-medium schools in Khargone, recognized for disciplined academics, modern infrastructure, and holistic student development.",
      sanskrit: "विद्या ददाति विनयम्",
      video: "https://res.cloudinary.com/dkits80xk/video/upload/v1770285411/Republic_Day_2026_Sanskar_International_Academy_-_Sanskar_International_Academy_Khargone_Official_720p_h264_cnliwr.mp4", // User requested video
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      <Schema
        type="VideoObject"
        data={{
          name: "Sanskar International Academy Republic Day 2026",
          description: "Official Republic Day 2026 celebration video of Sanskar International Academy, Khargone.",
          thumbnailUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png", // Fallback to logo or generate a thumbnail if available
          uploadDate: "2026-01-26T00:00:00Z",
          contentUrl: cmsData.hero.video,
          embedUrl: cmsData.hero.video
        }}
      />
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <AtAGlance />
      <WhyChoose />
      <PrincipalMessage />
      <Academics />
      <StudentAchievers />
      <LatestNews initialNews={latestUpdates} />
      <LifeAtSIA images={lifeAtSIAImages} />
      <Testimonials testimonials={testimonials} isLoading={false} />
      <HomeFAQ />
      <CTASection />
    </>
  );
}
