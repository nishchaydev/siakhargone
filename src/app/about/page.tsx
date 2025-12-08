import type { Metadata } from 'next';
import { fetchStrapi, getStrapiMedia } from '@/lib/strapi';
import AboutPageClient from './AboutPageClient';

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

export default async function AboutPage() {
  // Fetch Data
  const [aboutRes, principalRes, directorRes] = await Promise.all([
    fetchStrapi("about?populate=*"),
    fetchStrapi("principal-messages?populate=*"),
    fetchStrapi("director-messages?populate=*")
  ]);

  const aboutData = aboutRes?.data?.attributes;
  const principalData = principalRes?.data?.[0]?.attributes;
  const directorData = directorRes?.data?.[0]?.attributes;

  // Map Data
  const principalMessage = principalData ? {
    name: principalData.name,
    role: principalData.designation,
    message: principalData.messageText, // Markdown/Richtext
    image: getStrapiMedia(principalData.photo?.data?.attributes?.url)
  } : null;

  const chairmanMessage = directorData ? {
    name: directorData.name,
    role: directorData.designation,
    message: directorData.messageText,
    image: getStrapiMedia(directorData.photo?.data?.attributes?.url)
  } : null;

  const schoolImage = aboutData?.mainImage?.data ? {
    src: getStrapiMedia(aboutData.mainImage.data.attributes.url),
    alt: aboutData.mainImage.data.attributes.alternativeText || "School Image"
  } : null;

  const isLoading = false; // SSG/SSR is always "loaded" initially

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
