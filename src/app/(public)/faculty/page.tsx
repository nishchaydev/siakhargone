
import React from 'react';
import Image from 'next/image';
import { facultyMembers } from '@/data/faculty';
import { Section } from '@/components/common/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

import Schema from '@/components/seo/Schema';

export const metadata = {
    title: 'Faculty & Staff | Sanskar International Academy',
    description: 'Meet the dedicated mentors and leaders shaping the future at SIA Khargone.',
};

export default function FacultyPage() {
    // Group faculty by display
    const leadership = facultyMembers.filter(f => f.department === 'Leadership');
    const coordinators = facultyMembers.filter(f => f.department === 'Coordinators');
    const teachingStaff = facultyMembers.filter(f => !['Leadership', 'Coordinators'].includes(f.department));

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* SEO Schema for Leadership */}
            {leadership.map(leader => (
                <Schema
                    key={leader.id}
                    type="Person"
                    data={{
                        name: leader.name,
                        jobTitle: leader.role,
                        image: leader.image,
                        description: leader.message
                    }}
                />
            ))}

            {/* Hero Section */}
            <Section
                id="faculty-hero"
                title="Meet Our Mentors"
                subtitle="The guiding lights behind every student's success"
                isFirstSection={true}
                className="pb-8"
                children={null}
            />

            <div className="container mx-auto px-4 pb-20 space-y-20">

                {/* LEADERSHIP SECTION */}
                <div className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold font-display text-navy mb-4">Visionary Leadership</h2>
                        <div className="h-1 w-20 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {leadership.map((leader) => (
                            <Card key={leader.id} className="overflow-hidden border-0 shadow-xl bg-white group hover:-translate-y-1 transition-transform duration-300">
                                <div className="grid md:grid-cols-2 h-full">
                                    <div className="relative h-64 md:h-full w-full">
                                        <Image
                                            src={leader.image}
                                            alt={leader.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <div className="p-6 flex flex-col justify-center bg-navy text-white">
                                        <h3 className="text-xl font-bold font-display text-gold mb-1">{leader.name}</h3>
                                        <p className="text-sm font-medium opacity-80 mb-4 uppercase tracking-wider">{leader.role}</p>

                                        {leader.message && (
                                            <div className="relative pl-6 italic text-sm text-white/80 leading-relaxed mb-4">
                                                <Quote className="absolute top-0 left-0 h-4 w-4 text-gold/40 transform -scale-x-100" />
                                                {leader.message}
                                            </div>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                                            <span className="opacity-70">Experience</span>
                                            <span className="font-bold text-gold">{leader.experience}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* COORDINATORS SECTION */}
                <div className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold font-display text-navy-dark">Academic Coordinators</h2>
                        <p className="text-muted-foreground mt-2">Ensuring academic excellence and curriculum integrity</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coordinators.map((member) => (
                            <FacultyCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>

                {/* TEACHING STAFF SECTION */}
                <div className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold font-display text-navy-dark">Our Esteemed Faculty</h2>
                        <p className="text-muted-foreground mt-2">Specialists dedicated to nurturing talent across disciplines</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teachingStaff.map((member) => (
                            <FacultyCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Card Component for Staff
function FacultyCard({ member }: { member: any }) {
    return (
        <Card className="overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all group bg-white">
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-navy text-xs font-bold shadow-sm backdrop-blur-sm">
                        {member.department}
                    </Badge>
                </div>
            </div>
            <CardContent className="p-5 text-center">
                <h3 className="font-bold text-lg text-navy mb-1 group-hover:text-gold transition-colors">{member.name}</h3>
                <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground bg-gray-50 py-1 px-2 rounded-full inline-block">
                    {member.qualification}
                </p>
            </CardContent>
        </Card>
    );
}
