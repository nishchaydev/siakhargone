import type { Metadata } from 'next';
import { Section } from '@/components/common/Section';
import PageBanner from '@/components/common/PageBanner';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Why Choose SIA | Best School in Khargone',
    description: 'Discover why parents choose Sanskar International Academy over other schools in Khargone. Compare facilities, faculty, and academic results.',
    alternates: {
        canonical: 'https://siakhargone.in/why-choose-sia',
    },
};

const features = [
    {
        title: "Academic Excellence",
        points: [
            "50+ qualified teachers (B.Ed, M.Ed certified)",
            "Regular parent-teacher meetings",
            "Individual attention to students",
            "Proven track record in board results"
        ]
    },
    {
        title: "Modern Infrastructure",
        points: [
            "4-acre campus on Khandwa Road",
            "Computer labs with latest systems",
            "Well-equipped science laboratories",
            "5000+ books library",
            "Sports complex and playground"
        ]
    },
    {
        title: "Safety & Transport",
        points: [
            "GPS-enabled buses",
            "CCTV surveillance campus-wide",
            "Female staff for girls' safety",
            "Safe drop-off zones"
        ]
    },
    {
        title: "Holistic Development",
        points: [
            "Sports: Basketball, Cricket, Athletics",
            "Cultural: Dance, Music, Art",
            "Academic: Science clubs, Maths olympiad",
            "Personality: Leadership, Public speaking"
        ]
    }
];

interface ComparisonItem {
    feature: string;
    sia: string;
    other: string;
}

const comparisonData: ComparisonItem[] = [
    { feature: "Teaching Staff", sia: "100% B.Ed/M.Ed Certified", other: "Mixed Qualifications" },
    { feature: "Class Size", sia: "30-35 Students (Personal Attention)", other: "40+ Students" },
    { feature: "Campus Area", sia: "4 Acres with Sports Complex", other: "Limited Space" },
    { feature: "Safety", sia: "CCTV & GPS Buses", other: "Basic Security" },
    { feature: "Digital Learning", sia: "Smart Classes & Labs", other: "Traditional Boards" }
];

export default function WhyChooseSIAPage() {

    return (
        <div className="min-h-screen bg-grain">
            <PageBanner
                title="Why Choose Sanskar International Academy?"
                subtitle="See why 1100+ parents trust us for their child's future."
                image="https://res.cloudinary.com/dkits80xk/image/upload/v1765349456/infrastructure-building-2_zx4im1.webp"
            />

            <Section id="features" className="bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-ivory p-8 rounded-2xl shadow-sm border border-gold/20 hover:shadow-md transition-shadow">
                                <h3 className="text-2xl font-display font-bold text-navy mb-6 border-b-2 border-gold pb-2 inline-block">
                                    {feature.title}
                                </h3>
                                <ul className="space-y-4">
                                    {feature.points.map((point, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-3 text-navy/80 font-medium">
                                            <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Comparison Section */}
                    <div className="bg-navy text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <div className="relative z-10 text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">SIA vs. Other Schools</h2>
                            <p className="text-white/80 max-w-2xl mx-auto">Compare the Sanskar Advantage directly. We believe in transparency and excellence.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th scope="col" className="py-4 px-6 text-lg font-bold text-gold w-1/3">Feature</th>
                                        <th scope="col" className="py-4 px-6 text-lg font-bold bg-white/10 rounded-t-lg w-1/3 text-center">Sanskar International Academy (SIA)</th>
                                        <th scope="col" className="py-4 px-6 text-lg font-bold text-white/50 w-1/3 text-center">Other Schools</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {comparisonData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6 font-medium text-white/90">{row.feature}</td>
                                            <td className="py-4 px-6 text-center bg-white/5 font-bold text-gold">
                                                <div className="flex items-center justify-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5" /> {row.sia}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center text-white/50">
                                                <div className="flex items-center justify-center gap-2">
                                                    {row.other}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-12 text-center">
                            <Button size="lg" className="bg-gold text-navy hover:bg-white hover:text-navy font-bold text-lg px-8 rounded-full shadow-lg" asChild>
                                <Link href="/admissions">Apply for Admission Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
