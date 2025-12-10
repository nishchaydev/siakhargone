import type { Metadata } from 'next';
import { loadAboutData, loadMessage, loadCommittee } from '@/lib/content';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us - Vision & Leadership',
  description: 'Discover the vision, mission, and leadership behind Sanskar International Academy. Meet our principal and learn about our commitment to holistic education.',
};

const achievementItems = [
  { icon: "Award", category: "Academics", title: "National Science Olympiad", description: "Our students secured top ranks in the National Science Olympiad, showcasing their exceptional scientific aptitude." },
  { icon: "Medal", category: "Sports", title: "State Level Football Champions", description: "The school's football team clinched the state-level championship with an undefeated record." },
  { icon: "Palette", category: "Arts & Culture", title: "National Art Competition Winner", description: "A student's artwork was recognized as the best entry in the junior category of a prestigious national competition." },
  { icon: "Globe", category: "Social Impact", title: "Community Service Award", description: "Our students were honored for their outstanding contributions to local community service and environmental initiatives." },
];

export default async function AboutPage() {
  // Fetch Data
  const [aboutData, principalMsg, directorMsg, committee] = await Promise.all([
    loadAboutData(),
    loadMessage("principal-message"),
    loadMessage("director-message"),
    loadCommittee()
  ]);

  // Map Data
  const principalMessage = principalMsg ? {
    name: principalMsg.name,
    role: principalMsg.role,
    message: principalMsg.message,
    image: principalMsg.image
  } : null;

  const chairmanMessage = directorMsg ? {
    name: directorMsg.name,
    role: directorMsg.role,
    message: directorMsg.message,
    image: directorMsg.image
  } : null;

  const schoolImage = (aboutData && aboutData.schoolImage) ? {
    src: aboutData.schoolImage.src,
    alt: aboutData.schoolImage.alt || "School Image"
  } : null;

  const isLoading = false;

  return (
    <div>
      <AboutPageClient
        aboutContent={aboutData?.content || ""}
        principalMessage={principalMessage}
        chairmanMessage={chairmanMessage}
        committeeMembers={committee?.members || []}
        achievementItems={achievementItems}
        schoolImage={schoolImage}
        isLoading={isLoading}
      />
    </div>
  );
}
