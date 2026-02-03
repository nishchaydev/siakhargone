import type { Metadata } from 'next';
import { Section } from "@/components/common/Section";
import PageBanner from '@/components/common/PageBanner';
import { Button } from "@/components/ui/button";
import { Newspaper, Award, ExternalLink, Mail } from "lucide-react";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Press & Media Coverage | Sanskar International Academy',
    description: 'See how Sanskar International Academy is recognized as a top CBSE school in Khargone by leading newspapers and media outlets.',
};

const pressItems = [
    {
        title: "Media Feature Pending",
        source: "News Channel / Publication",
        date: "Coming Soon",
        excerpt: "An upcoming feature story covering our school's innovative approach to education.",
        icon: Newspaper,
        color: "bg-blue-50 text-blue-600"
    },
    {
        title: "Infrastructure Excellence",
        source: "Education Magazine",
        date: "Coming Soon",
        excerpt: "A detailed review of our campus facilities and academic performance is scheduled for publication.",
        icon: Award,
        color: "bg-gold/10 text-gold-dark"
    },
    {
        title: "Student Achievements Coverage",
        source: "Local Media",
        date: "Coming Soon",
        excerpt: "Coverage of our recent inter-school sports and academic achievements will be available shortly.",
        icon: Newspaper,
        color: "bg-green-50 text-green-600"
    },
    {
        title: "Awards Recognition",
        source: "Industry Body",
        date: "Pending Update",
        excerpt: "Official announcement regarding recent award nominations and recognitions.",
        icon: Award,
        color: "bg-purple-50 text-purple-600"
    }
];

export default function PressPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Press & Media"
                subtitle="Celebrating our achievements and recognition in the community."
                image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
            />

            <Section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-navy mb-4">In The Headlines</h2>
                        <p className="text-muted-foreground">
                            Read about our milestones, academic victories, and contributions to education in Khargone as covered by trusted media outlets.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {pressItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="group bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start">
                                    <div className={`p-4 rounded-full shrink-0 ${item.color}`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
                                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{item.source}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-display font-bold text-navy group-hover:text-gold transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                    <div className="shrink-0 self-center md:self-start">
                                        <Button variant="outline" className="gap-2" disabled title="Article coming soon" aria-label="Article coming soon - Read More button currently unavailable">
                                            Read More <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-16 bg-navy text-white p-8 md:p-12 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold font-display mb-4">Media Inquiries?</h3>
                        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                            For press kits, official comments, or interview requests with our Principal or Management, please contact our media relations team.
                        </p>
                        <Button asChild className="bg-gold text-navy hover:bg-white hover:text-navy px-8 py-6 text-lg rounded-full">
                            <Link href="/contact" className="inline-flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Contact Media Team
                            </Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    );
}
