
import type { Metadata } from 'next';
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Baby, BookOpen, School, FlaskConical, Library, MonitorSmartphone, Palette } from "lucide-react";
import data from '@/lib/placeholder-images.json';
import AcademicsPageClient from './AcademicsPageClient';

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, infrastructure, and modern learning methodology.',
};

const methodologyImage = data.placeholderImages.find(img => img.id === 'experiential-learning');
const infrastructureImage = data.placeholderImages.find(img => img.id === 'campus-infrastructure');

const curriculumHighlights = [
    {
        icon: "Baby",
        title: "Primary Years (Grades 1–5)",
        description: "Focuses on foundational learning through exploration, storytelling, and interactive experiences. Emphasis is placed on curiosity, empathy, and holistic growth.",
    },
    {
        icon: "BookOpen",
        title: "Middle Years (Grades 6–10)",
        description: "Builds academic depth across Science, Mathematics, Languages, and Social Studies while introducing real-world projects and cross-disciplinary skills.",
    },
    {
        icon: "School",
        title: "Senior Years (Grades 11–12)",
        description: "Prepares students for university-level education through research-based learning, leadership training, and exposure to national and global academic standards.",
    }
];

const infrastructureItems = [
    { icon: "FlaskConical", title: "Science & Computer Labs", description: "Fully equipped labs for Physics, Chemistry, Biology, and Computing, encouraging exploration and practical understanding." },
    { icon: "Library", title: "Library", description: "A modern, multi-resource library offering physical and digital collections that cultivate reading habits and research skills." },
    { icon: "MonitorSmartphone", title: "Smart Classrooms", description: "Interactive, tech-driven classrooms that make learning immersive and engaging." },
    { icon: "Palette", title: "Art, Music & Sports Facilities", description: "Dedicated creative zones and athletic spaces that encourage physical, emotional, and creative expression." },
];

export default function AcademicsPage() {
  return (
    <div>
      <AcademicsPageClient 
        curriculumHighlights={curriculumHighlights}
        infrastructureItems={infrastructureItems}
        methodologyImage={methodologyImage}
        infrastructureImage={infrastructureImage}
      />
    </div>
  );
}
