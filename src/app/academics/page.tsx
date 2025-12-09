import type { Metadata } from 'next';
import { loadAcademicStages, loadAlbums } from '@/lib/content';
import AcademicsPageClient from './AcademicsPageClient';

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, infrastructure, and modern learning methodology.',
};

const methodologyImage = {
  id: 'experiential-learning',
  imageUrl: "/siakhargone-content/Album/Photo For Uploads/Infrastructure Photos/classroom (1).webp",
  description: "Interactive Learning Environment",
  imageHint: "Classroom"
};

const infrastructureItems = [
  { icon: "FlaskConical", title: "Science & Computer Labs", description: "Fully equipped labs for Physics, Chemistry, Biology, and Computing, encouraging exploration and practical understanding." },
  { icon: "Library", title: "Library", description: "A modern, multi-resource library offering physical and digital collections that cultivate reading habits and research skills." },
  { icon: "MonitorSmartphone", title: "Smart Classrooms", description: "Interactive, tech-driven classrooms that make learning immersive and engaging." },
  { icon: "Palette", title: "Art, Music & Sports Facilities", description: "Dedicated creative zones and athletic spaces that encourage physical, emotional, and creative expression." },
];

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export default async function AcademicsPage() {
  let curriculumHighlights: Highlight[] = [];
  const albums = await loadAlbums();

  // Extract photos for auto-scroll
  const labAlbum = albums.find(a => a.albumName === "Labs & Facilities");
  const infraAlbum = albums.find(a => a.albumName === "Campus Life") || albums.find(a => a.albumName === "Classrooms");

  // Combine photos (limit to 10-15 to avoid massive payload)
  const infrastructurePhotos = [
    ...(labAlbum?.photos || []),
    ...(infraAlbum?.photos || [])
  ].slice(0, 15);

  try {
    const stagesData = await loadAcademicStages();
    if (Array.isArray(stagesData)) {
      curriculumHighlights = stagesData.map((item: any) => ({
        icon: "BookOpen", // Keeping consistent icon
        title: item.title,
        description: item.description,
      }));
    }
  } catch (error) {
    console.error("Failed to load academic stages:", error);
  }

  return (
    <div>
      <AcademicsPageClient
        curriculumHighlights={curriculumHighlights}
        infrastructureItems={infrastructureItems}
        methodologyImage={methodologyImage}
        infrastructurePhotos={infrastructurePhotos}
      />
    </div>
  );
}
