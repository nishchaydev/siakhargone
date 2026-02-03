import type { Metadata } from 'next';
import { StudentAchievements } from '@/components/about/StudentAchievements';

export const metadata: Metadata = {
    title: 'Student Achievements | SIA Khargone',
    description: 'Celebrating the academic, sports, and cultural achievements of our students.',
};

const achievementItems = [
    { icon: "Award", category: "Academics", title: "Achievement to be Announced", description: "Details regarding recent academic excellence awards will be updated soon." },
    { icon: "Medal", category: "Sports", title: "Sports Achievement Pending", description: "Information about our sports team's recent championships is currently being updated." },
    { icon: "Palette", category: "Arts & Culture", title: "Cultural Award Recognition", description: "Our students' achievements in national art and culture competitions will be featured here shortly." },
    { icon: "Globe", category: "Social Impact", title: "Community Initiative Update", description: "Details about our latest community service projects and recognitions are coming soon." },
];

export default function AchievementsPage() {
    return (
        <div className="bg-grain min-h-screen pt-20">
            <StudentAchievements items={achievementItems} />
        </div>
    );
}
