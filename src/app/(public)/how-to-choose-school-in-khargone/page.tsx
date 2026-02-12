import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cloudinary } from '@/lib/cloudinary-images';
import Image from 'next/image';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How to Choose the Right School in Khargone | Parent Checklist',
    description: 'A 7-point checklist for parents in Khargone to select the best school. Covers safety, faculty, transport, and academic results.',
    keywords: ['How to choose school Khargone', 'School selection checklist', 'Best school criteria', 'Parent guide education'],
    alternates: {
        canonical: 'https://siakhargone.in/how-to-choose-school-in-khargone',
    }
};

export default function HowToChooseSchoolGuide() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">How to Choose the Right School<br />in Khargone</h1>
                    <p className="text-muted-foreground text-lg">A practical 7-point checklist for concerned parents.</p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <p>
                        Selecting a school is one of the most critical decisions a parent makes. In a growing city like Khargone,
                        where options are multiplying, it is easy to get confused by marketing. Here is a factual,
                        point-by-point guide to help you make an informed choice.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 not-prose space-y-6">
                        <h2 className="text-2xl font-bold text-navy border-b border-gray-100 pb-4">The Ideal School Checklist</h2>

                        {[
                            { title: "Academic Track Record", desc: "Don't just look at '100% Pass'. Look for the number of distinctions and consistency over the last 5 years.", link: "/results" },
                            { title: "Teacher Quality", desc: "Are the teachers experienced? Do they undergo regular training? A school is only as good as its faculty.", link: "/academics#faculty" },
                            { title: "Holistic Development", desc: "Does the school offer sports, arts, and music? Education is incomplete without co-curricular activities.", link: "/beyond-academics" },
                            { title: "Safety Infrastructure", desc: "Look for CCTV cameras, gated security, and GPS-enabled buses. Safety is non-negotiable.", link: "/best-cbse-school-in-khargone" },
                            { title: "Digital Readiness", desc: `In ${new Date().getFullYear()}, smart boards and computer labs are basics, not luxuries. Ensure the school is tech-forward.`, link: "/best-cbse-school-in-khargone" },
                            { title: "Parent Community", desc: "Talk to existing parents. Their feedback is the most authentic source of truth." },
                            { title: "Distance & Transport", desc: "Long commutes can tire a child. Check if the school offers safe transport from your locality." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <div className="min-w-6 mt-1 text-gold">
                                    <Check className="w-6 h-6 bg-gold/10 rounded-full p-1" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy m-0">{item.title}</h3>
                                    <p className="text-gray-600 mt-1 leading-relaxed">
                                        {item.desc} {item.link && <Link href={item.link} className='text-gold hover:underline text-sm font-bold ml-1'>Check Here →</Link>}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-navy">The "Value" Factor</h2>
                    <p>
                        The most expensive school isn't always the best, and the cheapest isn't always the worst.
                        Look for <strong>value</strong>—what are you getting for the fees you pay? leading schools like
                        <Link href="/best-cbse-school-in-khargone" className="text-gold font-bold hover:underline"> Sanskar International Academy</Link> offer
                        a premium infrastructure and high-quality faculty at a justified fee structure.
                    </p>

                    <h2 className="text-2xl font-bold text-navy">Final Step: The Visit</h2>
                    <p>
                        Websites and brochures can only tell you so much. We strongly advise you to visit the campuses of your shortlisted schools.
                        Feel the vibe, observe the discipline, and meet the Principal.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gold/20 text-center">
                    <h3 className="text-2xl font-bold text-navy mb-4">See how SIA ticks all the boxes</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild className="bg-navy text-white hover:bg-gold hover:text-navy">
                            <Link href="/best-cbse-school-in-khargone">View SIA's Highlights</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-navy text-navy">
                            <Link href="/tour">Request a Campus Tour</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
