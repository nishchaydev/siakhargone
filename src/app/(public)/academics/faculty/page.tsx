import type { Metadata } from 'next';
import { FacultyList } from '@/components/faculty/FacultyList';
import { departments } from '@/data/departments';

export const metadata: Metadata = {
    title: 'Our Faculty | SIA Khargone',
    description: 'Meet the experienced and dedicated teaching staff at Sanskar International Academy.',
};

import { escapeJsonForScript } from '@/lib/security';

export default function FacultyPage() {
    const facultySchema = {
        "@context": "https://schema.org",
        "@graph": departments.flatMap(dept => [
            // Head of Department Schema
            ...(dept.head ? [{
                "@type": "Person",
                "name": dept.head.name,
                "jobTitle": dept.head.role,
                "worksFor": {
                    "@type": "EducationalOrganization",
                    "name": "Sanskar International Academy"
                },
                "educationalCredential": dept.head.qualification,
                "description": `Teaching Experience: ${dept.head.experience || 'N/A'}`
            }] : []),
            // Department Members Schema
            ...dept.members.map(member => ({
                "@type": "Person",
                "name": member.name,
                "jobTitle": member.role,
                "worksFor": {
                    "@type": "EducationalOrganization",
                    "name": "Sanskar International Academy"
                },
                "educationalCredential": member.qualification
            }))
        ])
    };

    return (
        <div className="bg-grain min-h-screen pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: escapeJsonForScript(JSON.stringify(facultySchema)) }}
            />
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
