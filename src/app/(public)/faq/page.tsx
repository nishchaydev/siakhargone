import type { Metadata } from "next";
import { Section } from "@/components/common/Section";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PageBanner from "@/components/common/PageBanner";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Sanskar International Academy",
    description: "Common questions about admissions, fees, transport, and academics at Sanskar International Academy, the best CBSE school in Khargone.",
    alternates: {
        canonical: "https://siakhargone.in/faq",
    },
};

const faqs = [
    {
        question: "Which is the best CBSE school in Khargone?",
        answer: "Sanskar International Academy is widely regarded as one of the best CBSE schools in Khargone due to its qualified faculty, English-medium curriculum, student discipline, and modern facilities. Established in 2016, SIA has 1100+ students and maintains a 4.5/5 rating from parents."
    },
    {
        question: "Is Sanskar International Academy CBSE affiliated?",
        answer: "Yes, Sanskar International Academy is a CBSE-affiliated school in Khargone (Affiliation No: 1031345) offering education from nursery to senior secondary level."
    },
    {
        question: "What makes SIA different from other schools in Khargone?",
        answer: "SIA focuses on academic consistency, moral values, student safety, and holistic growth rather than rote learning. With 50+ experienced teachers, modern computer labs, science laboratories, and GPS-enabled transport, SIA provides world-class infrastructure at Khandwa Road, Khargone."
    },
    {
        question: "What is the fee structure at Sanskar International Academy?",
        answer: "SIA offers competitive and transparent fee structure for quality CBSE education in Khargone. For detailed fee information and admission process, please contact +91 70491 10104 or visit our admission office at Gowadi Fata, Khandwa Highway."
    },
    {
        question: "Does SIA have transport facility in Khargone?",
        answer: "Yes, Sanskar International Academy provides safe GPS-enabled bus transport covering 15+ routes across Khargone district including Sanawad, Barwaha, Mandleshwar, and Kasrawad areas."
    },
    {
        question: "What is the age criteria for nursery admission?",
        answer: "For Nursery admission, the child must be 3+ years of age as of March 31st of the academic year. For Class 1, the minimum age is 6 years as per government guidelines."
    },
    {
        question: "Do you offer extra-curricular activities?",
        answer: "Yes, holistic development is a priority at SIA. We offer Cricket, Football, Basketball, Taekwondo, Music, Dance, Art & Craft, and Robotics. Our students regularly participate in district and state-level competitions."
    },
    {
        question: "How are the academic results of SIA students?",
        answer: "SIA consistently delivers excellent board results. Our students achieve 100% pass rates in Class 10 and 12 CBSE exams, with many securing top ranks in the district."
    },
    {
        question: "Are there scholarship programs available?",
        answer: "Yes, Sanskar International Academy offers merit-based scholarships for deserving students. We also have concessions for siblings studying in the school. Please contact the office for specific scholarship criteria."
    },
    {
        question: "How often are parent-teacher meetings held?",
        answer: "We believe in strong parent-school partnership. PTMs are held regularly after every exam cycle (approx. 4-5 times a year) to discuss student progress and development."
    },
    {
        question: "What safety measures are in place at the school?",
        answer: "Student safety is paramount. The entire campus is under CCTV surveillance. Buses are GPS-enabled with female attendants for younger children. Access to the school building is strictly monitored."
    }
];

export default function FAQPage() {


    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-grain">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PageBanner
                title="Frequently Asked Questions"
                subtitle="Why Sanskar International Academy is Among the Best Schools in Khargone"
                image="https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png"
            />

            <Section id="faq-list" bgColor="bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold font-display text-navy mb-4">Common Questions</h2>
                        <p className="text-muted-foreground">Find answers to the most frequently asked questions by parents.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 data-[state=open]:bg-gray-50/50 data-[state=open]:border-gold/30 transition-colors">
                                <AccordionTrigger className="text-left font-semibold text-navy hover:text-gold-dark py-4 text-base md:text-lg">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Section>
        </div>
    );
}
