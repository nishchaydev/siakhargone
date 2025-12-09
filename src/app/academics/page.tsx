import type { Metadata } from 'next';
import { fetchStrapi, getStrapiMedia } from '@/lib/strapi';
import AcademicsPageClient from './AcademicsPageClient';
const methodologyImage = {
  id: 'experiential-learning',
  imageUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
  description: "Experiential Learning",
  imageHint: "students learning"
};

const infrastructureImage = {
  id: 'campus-infrastructure',
  imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
  description: "Campus Infrastructure",
  imageHint: "school building"
};

const infrastructureItems = [
  { icon: "FlaskConical", title: "Science & Computer Labs", description: "Fully equipped labs for Physics, Chemistry, Biology, and Computing, encouraging exploration and practical understanding." },
  { icon: "Library", title: "Library", description: "A modern, multi-resource library offering physical and digital collections that cultivate reading habits and research skills." },
  { icon: "MonitorSmartphone", title: "Smart Classrooms", description: "Interactive, tech-driven classrooms that make learning immersive and engaging." },
  { icon: "Palette", title: "Art, Music & Sports Facilities", description: "Dedicated creative zones and athletic spaces that encourage physical, emotional, and creative expression." },
];

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function AcademicsPage() {
  // Fetch Academic Stages
  const stagesRes = await fetchStrapi("academic-stages", "populate=deep,10");
  const stagesData = stagesRes?.data || [];

  const curriculumHighlights = stagesData.map((item: any) => ({
    icon: "BookOpen", // Default icon as we don't have icon mapping from CMS yet.
    title: item.attributes.title,
    description: item.attributes.description, // HTML/RichText
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
