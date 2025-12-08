import type { Metadata } from 'next';
import { fetchStrapi, getStrapiMedia } from '@/lib/strapi';
import AcademicsPageClient from './AcademicsPageClient';
import data from '@/lib/placeholder-images.json'; // Keep fallback for infrastructure

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, infrastructure, and modern learning methodology.',
};

const methodologyImage = data.placeholderImages.find(img => img.id === 'experiential-learning');
const infrastructureImage = data.placeholderImages.find(img => img.id === 'campus-infrastructure');

const infrastructureItems = [
  { icon: "FlaskConical", title: "Science & Computer Labs", description: "Fully equipped labs for Physics, Chemistry, Biology, and Computing, encouraging exploration and practical understanding." },
  { icon: "Library", title: "Library", description: "A modern, multi-resource library offering physical and digital collections that cultivate reading habits and research skills." },
  { icon: "MonitorSmartphone", title: "Smart Classrooms", description: "Interactive, tech-driven classrooms that make learning immersive and engaging." },
  { icon: "Palette", title: "Art, Music & Sports Facilities", description: "Dedicated creative zones and athletic spaces that encourage physical, emotional, and creative expression." },
];

export default async function AcademicsPage() {
  // Fetch Academic Stages
  const stagesRes = await fetchStrapi("academic-stages?populate=*");
  const stagesData = stagesRes?.data || [];

  const curriculumHighlights = stagesData.map((item: any) => ({
    icon: "BookOpen", // Default icon as CMS doesn't send icon string yet
    title: item.attributes.stageName,
    description: item.attributes.description, // Need to handle Rich Text vs String? assuming text for list
  }));

  // Fallback if empty (keep UI until CMS populated)
  if (curriculumHighlights.length === 0) {
    // Don't push mock data if we want to test "real" data connection, but safe for UI
  }

  return (
    <div>
      <AcademicsPageClient
        curriculumHighlights={curriculumHighlights.length > 0 ? curriculumHighlights : []}
        infrastructureItems={infrastructureItems}
        methodologyImage={methodologyImage}
        infrastructureImage={infrastructureImage}
      />
    </div>
  );
}
