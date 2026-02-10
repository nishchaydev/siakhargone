import type { Metadata } from 'next';
import { Section } from '@/components/common/Section';
import PageBanner from '@/components/common/PageBanner';
import { CheckCircle2, FileText, Users, Calendar, CreditCard, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { schoolData } from '@/data/schoolData';
import Schema from '@/components/seo/Schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Admission Process 2026-27: Complete Guide | SIA Khargone',
    description: 'Step-by-step admission guide for Sanskar International Academy. Documents required, eligibility criteria, fee structure, and application process.',
    keywords: ['SIA admission process', 'school admission khargone', 'CBSE admission 2026', 'admission guide'],
    alternates: {
        canonical: 'https://siakhargone.in/admission-guide',
    },
};

const admissionSteps = [
    {
        step: 1,
        title: "Fill Enquiry Form",
        description: "Submit the online enquiry form or visit our campus to collect the admission form.",
        icon: FileText,
        checklist: [
            "Visit our website or campus",
            "Fill basic student details",
            "Provide contact information"
        ]
    },
    {
        step: 2,
        title: "Document Submission",
        description: "Submit required documents for verification.",
        icon: CheckCircle2,
        checklist: [
            "Birth certificate (original + 2 copies)",
            "Previous school TC (if applicable)",
            "Aadhar card (student & parents)",
            "Recent passport-size photos (4)",
            "Previous year mark sheet"
        ]
    },
    {
        step: 3,
        title: "Interaction/Assessment",
        description: "For higher grades, a brief interaction or assessment may be conducted.",
        icon: Users,
        checklist: [
            "Age-appropriate assessment",
            "Parent-teacher meeting",
            "Campus tour"
        ]
    },
    {
        step: 4,
        title: "Fee Payment",
        description: "Pay the admission fee and first-term fees to confirm admission.",
        icon: CreditCard,
        checklist: [
            "Admission fee",
            "First-term tuition fee",
            "Optional: Transport fee",
            "Payment via cash/card/online"
        ]
    },
    {
        step: 5,
        title: "Admission Confirmation",
        description: "Receive admission confirmation and student ID.",
        icon: GraduationCap,
        checklist: [
            "Admission receipt",
            "Student ID card",
            "Fee structure document",
            "Academic calendar"
        ]
    },
    {
        step: 6,
        title: "Orientation Day",
        description: "Attend orientation to meet teachers and understand school policies.",
        icon: Calendar,
        checklist: [
            "Meet class teacher",
            "Receive books and uniform details",
            "Understand school rules",
            "Join parent WhatsApp group"
        ]
    }
];

const faqs = [
    {
        question: "When do admissions open for 2026-27?",
        answer: `Admissions for academic year ${schoolData.academicYear} are now open. Early applications are encouraged as seats fill quickly.`
    },
    {
        question: "What is the age criteria for different classes?",
        answer: "For Nursery: 3+ years, LKG: 4+ years, UKG: 5+ years, Class 1: 6+ years as of March 31st of the admission year."
    },
    {
        question: "Is there an entrance exam?",
        answer: "For nursery to Class 2, no formal exam. For Classes 3 onwards, a simple age-appropriate assessment is conducted to understand the child's current level."
    },
    {
        question: "Can I get admission mid-session?",
        answer: "Yes, mid-session admissions are accepted subject to seat availability. Please contact our admission office for current availability."
    },
    {
        question: "Are scholarships available?",
        answer: "Yes, we offer merit-based scholarships and sibling discounts. Please inquire during the admission process."
    }
];

export default function AdmissionGuidePage() {
    return (
        <div className="min-h-screen bg-grain">
            <Schema type="FAQ" data={faqs} />

            <PageBanner
                title="Admission Process Made Simple"
                subtitle={`Step-by-step guide for ${schoolData.academicYear} admissions`}
                image="https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png"
            />

            <Section id="admission-steps" bgColor="bg-white">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    6 Simple Steps to Admission
                </h2>
                <div className="max-w-4xl mx-auto space-y-8">
                    {admissionSteps.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.step} className="flex gap-6 bg-light-grey p-6 rounded-xl">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                        {item.step}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="h-6 w-6 text-gold" />
                                        <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">{item.description}</p>
                                    <ul className="space-y-2">
                                        {item.checklist.map((checkItem, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                {checkItem}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section id="documents" bgColor="bg-light-grey">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Documents Checklist
                </h2>
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-navy mb-6">Required Documents:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Birth Certificate (original + 2 copies)",
                            "Aadhar Card (student)",
                            "Aadhar Card (both parents)",
                            "Previous School TC (if applicable)",
                            "Previous Year Mark Sheet",
                            "Passport Size Photos (4 nos)",
                            "Caste Certificate (if applicable)",
                            "Income Certificate (for scholarship)"
                        ].map((doc, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 text-royal-blue mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="contact-info" bgColor="bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-display font-bold text-navy mb-6">
                        Need Help with Admission?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Our admission team is here to assist you every step of the way.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-light-grey p-6 rounded-xl">
                            <h3 className="font-bold text-navy mb-2">Call Us</h3>
                            <a href={`tel:${schoolData.contact.phone[0]}`} className="text-royal-blue text-lg font-semibold hover:underline">
                                {schoolData.contact.phone[0]}
                            </a>
                            <br />
                            <a href={`tel:${schoolData.contact.phone[1]}`} className="text-royal-blue text-lg font-semibold hover:underline">
                                {schoolData.contact.phone[1]}
                            </a>
                        </div>
                        <div className="bg-light-grey p-6 rounded-xl">
                            <h3 className="font-bold text-navy mb-2">Email Us</h3>
                            <a href={`mailto:${schoolData.contact.email}`} className="text-royal-blue text-lg font-semibold hover:underline">
                                {schoolData.contact.email}
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-navy hover:bg-navy-dark text-white">
                            <Link href="/admissions">Start Application</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-navy text-navy hover:bg-navy/5">
                            <Link href="/contact">Schedule Campus Visit</Link>
                        </Button>
                    </div>
                </div>
            </Section>

            <Section id="faq" bgColor="bg-light-grey">
                <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
                    Admission FAQs
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
        </div>
    );
}
