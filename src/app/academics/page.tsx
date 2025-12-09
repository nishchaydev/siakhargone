import { getAcademicStages } from "@/lib/content";
import AcademicsPageClient from "./AcademicsPageClient";

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const academicStages = await getAcademicStages();

  const curriculumHighlights = academicStages.map((stage: any) => ({
    icon: "BookOpen", // Default icon
    title: stage.title,
    description: stage.description,
    image: stage.images?.[0] || null
  }));

  const infrastructureItems = [
    { icon: "FlaskConical", title: "Science & Computer Labs", description: "Fully equipped labs for Physics, Chemistry, Biology, and Computing." },
    { icon: "Library", title: "Library", description: "A modern, multi-resource library." },
    { icon: "MonitorSmartphone", title: "Smart Classrooms", description: "Interactive, tech-driven learning." },
    { icon: "Palette", title: "Art, Music & Sports", description: "Creative zones and athletic spaces." },
  ];

  return (
    <AcademicsPageClient
      curriculumHighlights={curriculumHighlights}
      methodologyImage={null}
      infrastructureImage={null}
      infrastructureItems={infrastructureItems}
    />
  );
}
