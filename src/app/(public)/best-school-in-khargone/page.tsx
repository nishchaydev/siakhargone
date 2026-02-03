
import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/common/Section';
import { Check, Star, BookOpen, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cloudinary } from "@/lib/cloudinary-images";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Best School in Khargone – Sanskar International Academy | Top CBSE School',
    description: 'Looking for the best school in Khargone? Sanskar International Academy offers world-class CBSE education, modern labs, smart classes, and holistic development.',
    keywords: ['best school in khargone', 'cbse school in khargone', 'top school in khargone', 'best cbse school khandwa road', 'Sanskar International Academy'],
    alternates: {
        canonical: 'https://siakhargone.in/best-school-in-khargone',
    },
};

export default function BestSchoolInKhargonePage() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
                <Image
                    src={cloudinary.infrastructure.building[1]}
                    alt="Best CBSE School in Khargone - Sanskar International Academy Campus Building"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-navy/80" />
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-amber-400">
                        Best School in Khargone
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
                        Sanskar International Academy (SIA) – Nurturing Leaders, Inspiring Excellence.
                    </p>
                    <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy font-bold text-lg px-8 py-6 rounded-full shadow-lg">
                        <Link href="/admissions">Apply for Admission 2026-27</Link>
                    </Button>
                </div>
            </section>

            {/* Why We Are The Best */}
            <Section id="why-best" title="Why SIA Is Khargone’s Top CBSE School" subtitle="Excellence in every aspect of education">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="prose lg:prose-lg text-gray-700">
                        <p>
                            Choosing the right school is the most important decision for your child's future.
                            <strong>Sanskar International Academy</strong> stands out as the <em>best school in Khargone</em> because we combine academic rigor with values-based education.
                        </p>
                        <p>
                            Located on Khandwa Road, our sprawling campus provides a safe, pollution-free environment perfect for learning. We are committed to fostering critical thinking, creativity, and character in every student.
                        </p>
                        <ul className="space-y-3 mt-6">
                            {[
                                "Affiliated with CBSE New Delhi",
                                " Experienced & Qualified Faculty",
                                "Focus on Holistic Child Development",
                                "Advanced Digital Learning Tools"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium text-navy">
                                    <Check className="h-5 w-5 text-gold" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={cloudinary.infrastructure.classrooms[0]}
                            alt="Modern Smart Classroom at Top CBSE School Khargone"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Section>

            {/* Pillars of Excellence */}
            <section className="py-16 bg-light-grey">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">Pillars of Our Excellence</h2>
                        <div className="h-1 w-20 bg-gold mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md border-b-4 border-gold">
                            <BookOpen className="h-10 w-10 text-royal-blue mb-4" />
                            <h3 className="text-xl font-bold mb-3 text-navy">Academic Excellence (CBSE)</h3>
                            <p className="text-gray-600">
                                Our CBSE curriculum is designed to challenge students and prepare them for competitive exams like JEE, NEET, and Olympiads right from school level.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md border-b-4 border-gold">
                            <Trophy className="h-10 w-10 text-royal-blue mb-4" />
                            <h3 className="text-xl font-bold mb-3 text-navy">Sports & Co-curriculars</h3>
                            <p className="text-gray-600">
                                From state-level sports champions to national art winners, SIA students excel beyond textbooks. We offer Music, Dance, Drama, and Sports.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md border-b-4 border-gold">
                            <Users className="h-10 w-10 text-royal-blue mb-4" />
                            <h3 className="text-xl font-bold mb-3 text-navy">Mentorship in Khargone</h3>
                            <p className="text-gray-600">
                                With a healthy low teacher-student ratio, every child gets personal attention. We believe every student is unique and talented.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities */}
            <Section id="facilities" title="World-Class Facilities" subtitle="Infrastructure that inspires learning" bgColor="bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { name: "Smart Classrooms", img: cloudinary.infrastructure.classrooms[0] },
                        { name: "Science Labs", img: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349465/lab-biology-1_hz0ivq.webp" },
                        { name: "Library", img: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349462/infrastructure-library-1_cgdkdd.webp" },
                        { name: "Sports Complex", img: cloudinary.infrastructure.indoreGames[0] }
                    ].map((fac, idx) => (
                        <div key={idx} className="group">
                            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-3">
                                <Image src={fac.img} alt={fac.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="font-bold text-navy">{fac.name}</h4>
                        </div>
                    ))}
                </div>
            </Section>


            {/* Comparison Table */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">Why SIA Stands Out</h2>
                        <div className="h-1 w-20 bg-gold mx-auto mt-4 rounded-full" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto border-collapse">
                            <thead>
                                <tr className="bg-navy text-white text-lg">
                                    <th className="p-4 text-left rounded-tl-xl">Feature</th>
                                    <th className="p-4 text-center bg-royal-blue/90 border-b-4 border-gold">Sanskar International Academy</th>
                                    <th className="p-4 text-center rounded-tr-xl bg-gray-500">Other Schools</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                {[
                                    { feature: "Curriculum", sia: "CBSE (New Delhi) - Innovative", other: "State Board / Rigid" },
                                    { feature: "Classrooms", sia: "Smart Digital Classrooms", other: "Traditional Blackboards" },
                                    { feature: "Teacher Ratio", sia: "1:25 (Personal Attention)", other: "1:60 (Crowded)" },
                                    { feature: "Labs", sia: "Physics, Chem, Bio, Robotics", other: "Basic Science Kit" },
                                    { feature: "Sports", sia: "National Level Coaches & Turf", other: "Playground only" },
                                ].map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="p-4 font-bold text-navy">{row.feature}</td>
                                        <td className="p-4 text-center font-bold text-royal-blue bg-blue-50/50 flex flex-col items-center justify-center gap-1">
                                            <Check className="h-5 w-5 text-green-600 inline" /> {row.sia}
                                        </td>
                                        <td className="p-4 text-center text-gray-500">{row.other}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <Section id="faqs" title="Frequently Asked Questions" subtitle="Everything you need to know about the best school in Khargone" bgColor="bg-light-grey">
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            { q: "Why is SIA considered the best school in Khargone?", a: "SIA offers a unique blend of academic excellence (CBSE curriculum), state-of-the-art infrastructure (smart labs, digital libraries), and holistic development (sports, arts, leadership) that is unmatched in the region." },
                            { q: "Does the school provide transportation facilities?", a: "Yes, we have a fleet of GPS-enabled buses covering all major routes in Khargone and nearby tehsils, ensuring safe and comfortable travel for students." },
                            { q: "What is the admission process for 2026-27?", a: "Admissions are simple and transparent. You can fill out the enquiry form online or visit our campus. Selection is based on merit and interaction for higher grades." },
                            { q: "Are there opportunities for sports and extracurriculars?", a: "Absolutely! We have professional coaches for Cricket, Football, Basketball, and Skating, along with dedicated clubs for Music, Dance, Drama, and Robotics." },
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-gray-200 rounded-lg px-4">
                                <AccordionTrigger className="text-left font-bold text-navy text-lg hover:no-underline">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Section>

            {/* Testimonials Snippet */}
            <section className="py-20 bg-navy text-white text-center">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <Star key={i} className="h-8 w-8 text-gold fill-gold" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-light italic max-w-4xl mx-auto mb-8">
                        "We shifted to Khargone recently and were looking for the top school. SIA exceeded our expectations with their discipline and academic focus."
                    </blockquote>
                    <cite className="not-italic font-bold text-lg text-gold">– Parent of Grade 8 Student</cite>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-grain text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-navy mb-6">Ready to Join the Best School in Khargone?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Admissions are open for the 2026-27 academic session. Give your child the advantage of a world-class education.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-navy hover:bg-navy-dark text-white px-8">
                            <Link href="/admissions">Apply Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy/10 px-8">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>


            {/* JSON-LD Schema for FAQs & Page Specifics */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "@id": "https://siakhargone.in/best-school-in-khargone",
                                "url": "https://siakhargone.in/best-school-in-khargone",
                                "name": "Best School in Khargone - Sanskar International Academy",
                                "description": "Why SIA is the top CBSE school in Khargone. Compare facilities, academics, and results.",
                                "datePublished": "2026-01-15",
                                "dateModified": new Date().toISOString().split('T')[0],
                                "isPartOf": { "@id": "https://siakhargone.in/#website" },
                                "breadcrumb": {
                                    "@type": "BreadcrumbList",
                                    "itemListElement": [
                                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://siakhargone.in/" },
                                        { "@type": "ListItem", "position": 2, "name": "Best School in Khargone", "item": "https://siakhargone.in/best-school-in-khargone" }
                                    ]
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    { "@type": "Question", "name": "Why is SIA considered the best school in Khargone?", "acceptedAnswer": { "@type": "Answer", "text": "SIA offers a unique blend of academic excellence (CBSE curriculum), state-of-the-art infrastructure (smart labs, digital libraries), and holistic development (sports, arts, leadership) that is unmatched in the region." } },
                                    { "@type": "Question", "name": "Does the school provide transportation facilities?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we have a fleet of GPS-enabled buses covering all major routes in Khargone and nearby tehsils, ensuring safe and comfortable travel for students." } },
                                    { "@type": "Question", "name": "What is the admission process for 2026-27?", "acceptedAnswer": { "@type": "Answer", "text": "Admissions are simple and transparent. You can fill out the enquiry form online or visit our campus. Selection is based on merit and interaction for higher grades." } },
                                    { "@type": "Question", "name": "Are there opportunities for sports and extracurriculars?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We have professional coaches for Cricket, Football, Basketball, and Skating, along with dedicated clubs for Music, Dance, Drama, and Robotics." } }
                                ]
                            }
                        ]
                    })
                }}
            />
        </main>
    );
}
