
import type { Metadata } from 'next';
import Image from "next/image";
import { Section } from "@/components/common/Section";
import data from '@/lib/placeholder-images.json';
import { 
  Music,
  Palette,
  Cpu,
  ScrollText,
  HeartHandshake,
  BookUser,
  Medal,
  Award,
  Globe,
  type LucideIcon
} from "lucide-react";
import BeyondSchoolPageClient from './BeyondSchoolPageClient';

export const metadata: Metadata = {
  title: 'Beyond School',
  description: 'Explore our world-class sports, arts, and co-curricular programs that nurture talent and leadership.',
};

const sportsImage = data.placeholderImages.find(img => img.id === 'sports-infrastructure');
const leadershipImage = data.placeholderImages.find(img => img.id === 'student-leadership');

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

export default function BeyondSchoolPage() {
  return (
    <div>
        <Section id="sports" title="Sports & Physical Development" subtitle="Building strength, teamwork, and discipline through play" isFirstSection={true}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div 
                    className="prose lg:prose-lg max-w-none text-muted-foreground"
                >
                    <p>
                    At Sanskar International Academy, sports are more than just physical activity — they are a foundation for teamwork, discipline, and leadership. Our world-class sports infrastructure helps students unlock their full athletic potential.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
                    <li>Indoor badminton and table tennis arenas</li>
                    <li>Basketball and volleyball courts</li>
                    <li>Football and cricket grounds with professional-grade turf</li>
                    <li>Olympic-sized swimming pool with certified coaches</li>
                    <li>Athletics track and fitness gymnasium</li>
                    </ul>
                    <p>
                    Every student is encouraged to participate in sports, ensuring physical health and emotional balance. Annual inter-house and inter-school tournaments keep the competitive spirit alive.
                    </p>
                </div>
                <div>
                    {sportsImage && (
                    <Image 
                        src={sportsImage.imageUrl} 
                        alt={sportsImage.description}
                        data-ai-hint={sportsImage.imageHint}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl"
                        priority
                    />
                    )}
                </div>
            </div>
        </Section>

        <BeyondSchoolPageClient
            coCurricularItems={coCurricularItems}
            scholarshipItems={scholarshipItems}
            leadershipImage={leadershipImage}
        />
    </div>
  );
}
