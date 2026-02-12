
import HeroSection from "@/components/sections/HeroSection";
import Schema from "@/components/seo/Schema";
// Don't lazy load LatestNews to prevent "pop-in" if we have data instantly.
import { LatestNews } from "@/components/home/LatestNews";
import { PromotionalModal } from "@/components/common/PromotionalModal";

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
const DigitalCampus = nextDynamic(() => import("@/components/home/DigitalCampus").then(mod => mod.DigitalCampus));
const Testimonials = nextDynamic(() => import("@/components/home/Testimonials").then(mod => mod.Testimonials));
const HomeFAQ = nextDynamic(() => import("@/components/home/HomeFAQ").then(mod => mod.HomeFAQ), {
  loading: () => <div className="py-20"><Skeleton className="h-[300px] w-full max-w-3xl mx-auto rounded-xl" /></div>
});

import { albums, testimonials, faqs } from "@/lib/static-data";
import { cloudinary } from "@/lib/cloudinary-images";
import { getNewsService } from "@/services/newsService";
import { getEventsService } from "@/services/eventsService";
import { getNoticesService } from "@/services/noticesService";
import { getAchievementsService } from "@/services/achievementsService";
import { AnnouncementMarquee } from "@/components/layout/AnnouncementMarquee";
import { schoolData } from "@/data/schoolData";

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
  const [newsItems, eventsItems, noticesItems, achievementItems] = await Promise.all([
    getNewsService().catch((e: unknown) => { console.error("News Fetch Error:", e); return []; }),
    getEventsService().catch((e: unknown) => { console.error("Events Fetch Error:", e); return []; }),
    getNoticesService().catch((e: unknown) => { console.error("Notices Fetch Error:", e); return []; }),
    getAchievementsService().catch((e: unknown) => { console.error("Achievements Fetch Error:", e); return []; })
  ]);


  const allUpdates: (UpdateItem & { timestamp: number; priority: number })[] = [
    ...newsItems.map((item: any) => ({ ...item, type: 'News' } as UpdateItem)),
    ...eventsItems.map((item: any) => ({ ...item, type: 'Event' } as UpdateItem)),
    ...noticesItems.map((item: any) => ({ ...item, type: 'Notice', description: item.text || 'Important Notice' } as UpdateItem))
  ].map(item => {
    const timestamp = item.date ? new Date(item.date).getTime() : 0;
    const title = (item.title || "").toLowerCase();
    const description = (item.description || "").toLowerCase();

    // Priority calculation: 2 for extremely relevant keywords, 1 for urgent notices, 0 for others
    let priority = 0;
    if (title.includes('gujarat') || title.includes('admission') || description.includes('gujarat') || description.includes('admission')) {
      priority = 2;
    } else if (item.type === 'Notice') {
      priority = 1;
    }

    return {
      ...item,
      timestamp: Number.isNaN(timestamp) ? 0 : timestamp,
      priority
    };
  }).sort((a, b) => {
    // Sort by priority first, then by timestamp
    if (b.priority !== a.priority) return b.priority - a.priority;
    return b.timestamp - a.timestamp;
  });

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
      video: "https://res.cloudinary.com/dkits80xk/video/upload/q_auto,vc_auto/v1770285411/Republic_Day_2026_Sanskar_International_Academy_-_Sanskar_International_Academy_Khargone_Official_720p_h264_cnliwr.mp4", // User requested video
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
      { label: "Students", value: schoolData.stats.students },
      { label: "Teachers", value: schoolData.stats.teachers },
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
      <AnnouncementMarquee announcements={latestUpdates.map(u => ({
        id: u.id.toString(),
        title: u.title,
        content: u.description || u.title,
        date: u.date,
        isUrgent: u.type === 'Notice'
      }))} isLoading={false} />
      <HeroSection data={cmsData.hero} stats={cmsData.stats} />
      <AtAGlance />
      <WhyChoose />
      <PrincipalMessage />
      <Academics />
      <StudentAchievers achievers={achievementItems.slice(0, 3)} />
      <LatestNews initialNews={latestUpdates} />
      <LifeAtSIA images={lifeAtSIAImages} />
      <DigitalCampus />

      {/* Featured In Section */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-gray-400 font-medium tracking-wide uppercase text-sm">As Featured In</span>
          <a
            href="/achievements"
            className="flex items-center gap-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer group"
            aria-label="View our achievements featured in Dainik Bhaskar"
          >
            <div className="flex items-center gap-3">
              {/* Placeholder for Dainik Bhaskar Logo - Text fallback until image is added */}
              <span className="text-2xl font-bold font-serif text-gray-800 group-hover:text-navy transition-colors">Dainik Bhaskar</span>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Leading News</span>
            </div>
          </a>
        </div>
      </div>

      <Testimonials testimonials={testimonials} isLoading={false} />
      <HomeFAQ />
      <CTASection />
      <PromotionalModal />
    </>
  );
}
