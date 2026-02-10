import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/common/Section';
import PageBanner from '@/components/common/PageBanner';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { schoolComparison, comparisonCategories } from '@/data/schoolComparison';
import Schema from '@/components/seo/Schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Compare SIA with Other Schools in Khargone | Honest Comparison',
    description: 'Compare Sanskar International Academy with other top schools in Khargone. Facilities, fees, results, and parent reviews. Make an informed decision.',
    keywords: ['school comparison khargone', 'best school khargone', 'SIA vs other schools', 'CBSE schools comparison'],
    alternates: {
        canonical: 'https://siakhargone.in/compare',
    },
};

const faqs = [
    {
        question: "How does SIA compare to other CBSE schools in Khargone?",
        answer: "SIA stands out with modern infrastructure, experienced faculty (75+ teachers), smart classrooms in every room, and a strong focus on holistic development. Our student-teacher ratio of 22:1 ensures personalized attention."
    },
    {
        question: "What makes SIA's facilities better?",
        answer: "We have 1:1 computer access with AI curriculum, GPS-enabled transport covering 15+ routes, indoor and outdoor sports complexes, and CCTV surveillance throughout the campus."
    },
    {
        question: "Is SIA more expensive than other schools?",
        answer: "SIA offers competitive and transparent fee structure. We believe in providing world-class education at affordable rates with various scholarship options for deserving students."
    }
];

export default function ComparePage() {
    const sia = schoolComparison[0];
    const others = schoolComparison[1];

    return (
        <div className="min-h-screen bg-grain">
            <Schema type="FAQ" data={faqs} />

            <PageBanner
                title="Compare Schools in Khargone"
                subtitle="See how Sanskar International Academy stands out"
                image="https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png"
            />

            <Section id="comparison-intro" bgColor="bg-white">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-display font-bold text-navy mb-4">
                        Making the Right Choice for Your Child
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Choosing the right school is one of the most important decisions you'll make.
                        Here's an honest comparison to help you decide.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full max-w-5xl mx-auto border-collapse">
                        <thead>
                            <tr className="bg-navy text-white">
                                <th className="p-4 text-left font-bold rounded-tl-xl">Feature</th>
                                <th className="p-4 text-center bg-royal-blue border-b-4 border-gold font-bold">
                                    Sanskar International Academy
                                </th>
                                <th className="p-4 text-center bg-gray-600 rounded-tr-xl font-bold">
                                    Other Schools
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {comparisonCategories.map((category, idx) => {
                                const siaValue = sia[category.key as keyof typeof sia];
                                const othersValue = others[category.key as keyof typeof others];

                                return (
                                    <tr key={category.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="p-4 font-bold text-navy">{category.label}</td>
                                        <td className="p-4 text-center bg-blue-50/50">
                                            <div className="flex items-center justify-center gap-2">
                                                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                                <span className="font-semibold text-royal-blue">{siaValue}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center text-gray-600">
                                            {othersValue}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section id="highlights" bgColor="bg-light-grey">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Why Parents Choose SIA
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                            <Check className="h-6 w-6 text-green-600" />
                            SIA Advantages
                        </h3>
                        <ul className="space-y-3">
                            {sia.highlights?.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <Check className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                            <X className="h-6 w-6 text-red-500" />
                            Common Limitations Elsewhere
                        </h3>
                        <ul className="space-y-3">
                            {others.highlights?.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                    <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            <Section id="faq" bgColor="bg-white">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <AccordionItem
                                key={idx}
                                value={`item-${idx}`}
                                className="border rounded-lg px-4 bg-white"
                            >
                                <AccordionTrigger className="text-left font-bold text-navy hover:text-gold-dark">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Section>

            <Section id="cta" bgColor="bg-navy">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-display font-bold mb-4">
                        Ready to Experience the SIA Difference?
                    </h2>
                    <p className="text-xl mb-8 text-gray-200">
                        Schedule a campus visit and see our facilities firsthand
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy">
                            <Link href="/admissions">Apply Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            <Link href="/contact">Schedule Visit</Link>
                        </Button>
                    </div>
                </div>
            </Section>
        </div>
    );
}
