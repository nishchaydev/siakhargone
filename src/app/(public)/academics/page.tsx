import type { Metadata } from 'next';
import { loadAlbums } from '@/lib/content';
import AcademicsPageClient from './AcademicsPageClient';
import { cloudinary } from '@/lib/cloudinary-images';

export const metadata: Metadata = {
  title: 'Academics - CBSE Curriculum & Methodology',
  description: 'Explore our comprehensive CBSE curriculum, advanced science labs, smart classrooms, and innovative teaching methodology designed for student success.',
};

const methodologyImage = {
  id: 'experiential-learning',
  imageUrl: cloudinary.infrastructure.classrooms[0],
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
  const albums = await loadAlbums();

  // Extract photos for auto-scroll
  const labAlbum = albums.find(a => a.albumName === "Labs & Facilities");
  const infraAlbum = albums.find(a => a.albumName === "Campus Life") || albums.find(a => a.albumName === "Classrooms");

  // Combine photos (limit to 10-15 to avoid massive payload)
  const infrastructurePhotos = [
    ...(labAlbum?.photos || []),
    ...(infraAlbum?.photos || [])
  ].slice(0, 15);

  return (
    <div>
      <AcademicsPageClient
        infrastructureItems={infrastructureItems}
        methodologyImage={methodologyImage}
        infrastructurePhotos={infrastructurePhotos}
      />
    </div>
  );
}
