import type { Metadata } from 'next';
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { cloudinary } from '@/lib/cloudinary-images';
import BeyondAcademicsPageClient from './BeyondAcademicsPageClient';
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageBanner from "@/components/common/PageBanner";

const sportsImage = {
  id: 'sports-infrastructure',
  imageUrl: cloudinary.infrastructure.indoreGames[0],
  description: "Sports Infrastructure",
  imageHint: "sports"
};
const leadershipImage = {
  id: 'student-leadership',
  imageUrl: cloudinary.beyondAcademics?.leadership || "https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png",
  description: "Personality Development & Leadership",
  imageHint: "leadership"
};

const coCurricularItems: { icon: string; title: string; description: string }[] = [
  { icon: "Music", title: "Performing Arts", description: "Dedicated spaces for music, drama, and dance where students develop creativity, confidence, and stage presence." },
  { icon: "Palette", title: "Visual Arts", description: "Art rooms equipped with modern supplies to nurture imagination through painting, sculpture, and crafts." },
  { icon: "Cpu", title: "STEM Clubs", description: "Robotics, coding, and science clubs help students innovate and connect academics with technology." },
  { icon: "ScrollText", title: "Debate & Literature", description: "Activities that enhance communication, critical thinking, and public speaking through English and Hindi clubs." },
  { icon: "HeartHandshake", title: "Cultural Events", description: "Annual festivals and national celebrations that help students appreciate diversity and heritage." },
  { icon: "Globe", title: "Social Responsibility", description: "Regular community outreach, environmental drives, and charity initiatives foster empathy and civic sense." },
];

const scholarshipItems = [
  { icon: "Award", text: "Academic Excellence Awards" },
  { icon: "Medal", text: "Sports Talent Scholarships" },
  { icon: "Palette", text: "Art & Culture Recognition Grants" },
  { icon: "Globe", text: "Social Leadership Fellowships" },
];



export const metadata: Metadata = {
  title: 'Beyond School - Sports, Arts & Co-Curricular Activities',
  description: 'Discover our holistic development programs including sports, performing arts, student leadership, and community service initiatives.',
};

export default function BeyondSchoolPage() {
  return (
    <div className="bg-background">
      <PageBanner
        title="Sports & Activities"
        subtitle="Cultivating excellence through physical education, creative expression, and holistic development."
        image="https://res.cloudinary.com/dkits80xk/image/upload/v1765349452/taekwando-2_snjgok.webp"
        objectPosition="70%"
      />

      <Section id="sports" title="Sports & Physical Development" subtitle="Building strength, teamwork, and discipline through play" className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="prose lg:prose-lg max-w-none text-muted-foreground">
            <p>
              At Sanskar International Academy, sports are a foundation for teamwork, discipline, and leadership. Our expansive sports infrastructure helps students develop their athletic skills.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
              <li>Indoor badminton and table tennis arenas</li>
              <li>Basketball and volleyball courts</li>
              <li>Football and cricket grounds with professional-grade turf</li>
              <li>Swimming pool with certified coaches</li>
              <li>Athletics track and fitness gymnasium</li>
            </ul>
            <p>
              Every student is encouraged to participate in sports, ensuring physical health and emotional balance. Annual inter-house and inter-school tournaments keep the competitive spirit alive.
            </p>
          </div>
          <div className="relative group">
            {sportsImage && (
              <Image src={sportsImage.imageUrl}
                alt={sportsImage.description}
                data-ai-hint={sportsImage.imageHint}
                width={600}
                height={400}
                className="rounded-lg shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority />
            )}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 rounded-full -z-10" />
          </div>
        </div>

        {/* Pinterest-style Sports Gallery: Life at SIA */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="text-left border-l-4 border-gold pl-6">
              <span className="text-gold font-bold tracking-widest text-sm uppercase mb-3 block">EXPERIENCE</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-navy mb-4">
                Athletic <span className="text-gold">Excellence</span>
              </h3>
              <p className="text-muted-foreground max-w-xl text-lg">
                A vibrant ecosystem where learning extends beyond classrooms. Every moment on the field is a step towards greatness.
              </p>
            </div>
            <Link href="/gallery">
              <Button variant="outline" className="rounded-full border-navy/20 text-navy hover:bg-navy hover:text-white group px-6 py-6 h-auto shadow-sm">
                View Full Gallery <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {/* Featured Hero: Action & Fun */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-[2.5rem] shadow-2xl min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              <Image
                src="https://res.cloudinary.com/dkits80xk/image/upload/v1770866553/241a7e4b-805d-4998-830a-43e016acf6a8.png"
                alt="Action & Fun"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-10 text-left">
                <span className="text-gold font-bold tracking-[0.2em] text-sm mb-2 block">VIBRANT CAMPUS</span>
                <span className="text-white font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight">ACTION & FUN<br /><span className="text-gold/80 text-xl font-sans font-medium tracking-normal">Unleashing Potential</span></span>
              </div>
            </div>

            {/* Top Right: Taekwando */}
            <div className="lg:col-span-2 relative group overflow-hidden rounded-[2rem] shadow-xl h-[320px]">
              <Image
                src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349453/taekwando-6_wn0vro.webp"
                alt="Martial Arts"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 text-left">
                <h4 className="text-white font-bold text-xl tracking-wide uppercase">MARTIAL ARTS</h4>
                <p className="text-white/80 text-sm">Discipline & Strength</p>
              </div>
            </div>

            {/* Bottom Right 1: Chess */}
            <div className="relative group overflow-hidden rounded-[1.5rem] shadow-lg h-[260px]">
              <Image
                src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349462/infrastructure-indoregames-2_ef5nyi.webp"
                alt="Strategy Games"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 text-left">
                <span className="text-white font-bold text-sm tracking-widest uppercase">STRATEGY</span>
              </div>
            </div>

            {/* Bottom Right 2: Achievers */}
            <div className="relative group overflow-hidden rounded-[1.5rem] shadow-lg h-[260px]">
              <div className="grid grid-cols-2 h-full gap-1">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349475/sports-achievements-2_nqqixj.webp"
                    alt="Sports Excellence"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349475/sports-achievements-1_xmyfg2.webp"
                    alt="Team Pride"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 text-left">
                <span className="text-white font-bold text-xs tracking-widest uppercase">ACHIEVERS</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <BeyondAcademicsPageClient
        coCurricularItems={coCurricularItems}
        scholarshipItems={scholarshipItems}
        leadershipImage={leadershipImage}
      />
    </div>
  );
}
