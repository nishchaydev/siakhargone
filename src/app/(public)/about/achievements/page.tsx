import type { Metadata } from 'next';
import { StudentAchievements } from '@/components/about/StudentAchievements';

export const metadata: Metadata = {
    title: 'Student Achievements | SIA Khargone',
    description: 'Celebrating the academic, sports, and cultural achievements of our students.',
};

const achievementItems = [
    { icon: "Award", category: "Academics", title: "Excellence in Board Exams", description: "Our students consistently achieve top ranks in CBSE Class 10th and 12th board examinations." },
    { icon: "Medal", category: "Sports", title: "District Level Champions", description: "Our school sports teams have secured multiple victories in district-level inter-school competitions." },
    { icon: "Palette", category: "Arts & Culture", title: "Cultural Fest Winners", description: "First prize winners in the annual inter-school cultural and arts competition." },
    { icon: "Globe", category: "Social Impact", title: "Green School Initiative", description: "Recognized for our student-led environmental awareness and tree plantation drives." },
];

export default function AchievementsPage() {
    return (
        <div className="bg-grain min-h-screen pt-20">
            <StudentAchievements items={achievementItems} />
        </div>
    );
}
