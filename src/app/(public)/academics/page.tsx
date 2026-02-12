import type { Metadata } from 'next';
import { loadAlbums } from '@/lib/content';
import AcademicsPageClient from './AcademicsPageClient';
import { cloudinary } from '@/lib/cloudinary-images';
import Schema from '@/components/seo/Schema';

export const metadata: Metadata = {
  title: 'Academics - CBSE Curriculum & Methodology',
  description: 'Explore our comprehensive CBSE curriculum, advanced science labs, smart classrooms, and innovative teaching methodology designed for student success.',
  openGraph: {
    title: 'Academics | Learning at SIA',
    description: 'CBSE Curriculum, Smart Classrooms, and Holistic Development at Sanskar International Academy.',
    images: [
      {
        url: cloudinary.infrastructure.classrooms[0],
        width: 1200,
        height: 630,
        alt: "Smart Classrooms at SIA",
      }
    ]
  }
};

const methodologyImage = {
  id: 'experiential-learning',
  imageUrl: cloudinary.academics?.methodology || cloudinary.infrastructure.classrooms[0],
  description: "Interactive Learning Environment",
  imageHint: "Classroom"
};


const faqs = [
  {
    question: "What curriculum does SIA follow?",
    answer: "We follow the CBSE (Central Board of Secondary Education) curriculum, which is recognized nationally and internationally. Our affiliation number is 1031345."
  },
  {
    question: "What are the teaching methodologies used?",
    answer: "We use a blend of traditional and modern teaching methods including experiential learning, project-based learning, smart classroom technology, and hands-on practical sessions in our well-equipped labs."
  },
  {
    question: "Are there science and computer labs?",
    answer: "Yes, we have fully equipped Physics, Chemistry, Biology, and Computer labs with modern equipment. Students get hands-on experience with 1:1 computer access and regular practical sessions."
  },
  {
    question: "How do you prepare students for competitive exams?",
    answer: "We offer specialized coaching for JEE, NEET, and other competitive exams alongside the regular CBSE curriculum. Our experienced faculty provides additional support and practice materials."
  },
  {
    question: "What is the assessment pattern?",
    answer: "We follow the CBSE assessment pattern with continuous and comprehensive evaluation (CCE). This includes periodic tests, term exams, project work, and practical assessments throughout the year."
  }
];


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

// getSiteAssets removed
export const dynamic = 'force-dynamic';

export default async function AcademicsPage() {
  const albums = await loadAlbums();
  // Static banner fallback 
  const bannerImage = cloudinary.academics?.banner || "https://res.cloudinary.com/dkits80xk/image/upload/v1770866540/ba5fa378-c98b-4e8f-a4ec-bd5db243929f.png";

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
      <Schema type="FAQ" data={faqs} />
      <AcademicsPageClient
        infrastructureItems={infrastructureItems}
        methodologyImage={methodologyImage}
        infrastructurePhotos={infrastructurePhotos}
        bannerImage={bannerImage}
      />
    </div>
  );
}
