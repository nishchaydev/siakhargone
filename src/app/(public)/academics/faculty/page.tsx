import type { Metadata } from 'next';
import { FacultyList } from '@/components/faculty/FacultyList';

export const metadata: Metadata = {
    title: 'Our Faculty | SIA Khargone',
    description: 'Meet the experienced and dedicated teaching staff at Sanskar International Academy.',
};

export default function FacultyPage() {
    return (
        <div className="bg-grain min-h-screen pt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
                    <h1 className="text-4xl font-display font-bold text-navy">Our Faculty</h1>
                    <p className="text-muted-foreground">
                        Mentors, Guides, and Role Models. Committed to shaping the future.
                    </p>
                </div>

                <FacultyList />
            </div>
        </div>
    );
}
