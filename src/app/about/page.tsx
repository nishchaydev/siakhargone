
import type { Metadata } from 'next';
import data from '@/lib/placeholder-images.json';
import { fallbackPrincipalMessage, fallbackChairmanMessage } from "@/data/fallbackData";
import AboutPageClient from './AboutPageClient';

const schoolImage = data.placeholderImages.find(img => img.id === 'about-school');

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover our vision, leadership, and commitment to holistic education.',
};

const achievementItems = [
    { icon: "Award", category: "Academics", title: "National Science Olympiad", description: "Our students secured top ranks in the National Science Olympiad, showcasing their exceptional scientific aptitude." },
    { icon: "Medal", category: "Sports", title: "State Level Football Champions", description: "The school's football team clinched the state-level championship with an undefeated record." },
    { icon: "Palette", category: "Arts & Culture", title: "National Art Competition Winner", description: "A student's artwork was recognized as the best entry in the junior category of a prestigious national competition." },
    { icon: "Globe", category: "Social Impact", title: "Community Service Award", description: "Our students were honored for their outstanding contributions to local community service and environmental initiatives." },
];

export default function AboutPage() {
  const principalMessage = fallbackPrincipalMessage[0];
  const chairmanMessage = fallbackChairmanMessage[0];
  const isLoading = !principalMessage || !chairmanMessage;

  return (
    <div>
      <AboutPageClient 
        principalMessage={principalMessage} 
        chairmanMessage={chairmanMessage}
        achievementItems={achievementItems}
        schoolImage={schoolImage}
        isLoading={isLoading}
      />
    </div>
  );
}
