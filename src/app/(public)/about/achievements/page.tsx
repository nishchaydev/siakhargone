import type { Metadata } from 'next';
import { StudentAchievements } from '@/components/about/StudentAchievements';

export const metadata: Metadata = {
    title: 'Student Achievements | SIA Khargone',
    description: 'Celebrating the academic, sports, and cultural achievements of our students.',
};

const achievementItems = [
    { icon: "Award", category: "Academics", title: "National Science Olympiad", description: "Our students secured top ranks in the National Science Olympiad, showcasing their exceptional scientific aptitude." },
    { icon: "Medal", category: "Sports", title: "State Level Football Champions", description: "The school's football team clinched the state-level championship with an undefeated record." },
    { icon: "Palette", category: "Arts & Culture", title: "National Art Competition Winner", description: "A student's artwork was recognized as the best entry in the junior category of a prestigious national competition." },
    { icon: "Globe", category: "Social Impact", title: "Community Service Award", description: "Our students were honored for their outstanding contributions to local community service and environmental initiatives." },
];

export default function AchievementsPage() {
    return (
        <div className="bg-grain min-h-screen pt-20">
            <StudentAchievements items={achievementItems} />
        </div>
    );
}
