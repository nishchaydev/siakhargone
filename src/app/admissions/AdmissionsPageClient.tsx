
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImagePlaceholder {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
}

const steps = [
    { number: 1, title: "Application Form", description: "Fill out the online application form or collect it from the school office." },
    { number: 2, title: "Document Submission", description: "Submit required documents including birth certificate, previous report cards, and address proof." },
    { number: 3, title: "Interaction & Assessment", description: "Students may undergo a short interaction or assessment depending on grade level." },
    { number: 4, title: "Admission Confirmation", description: "On selection, parents complete the fee payment and receive confirmation from the administration." },
];


const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.2, },
    },
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    viewport: { once: true, amount: 0.3 }
};

interface AdmissionsPageClientProps {
    careerCounsellingImage?: ImagePlaceholder;
}

export default function AdmissionsPageClient({ careerCounsellingImage }: AdmissionsPageClientProps) {
    return (
        <div className="bg-grain min-h-screen">
            <Section id="career" title="Career Counselling" subtitle="Guiding students towards purposeful futures" isFirstSection={true}>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={fadeInUp} className="prose lg:prose-lg max-w-none text-muted-foreground">
                        <p>
                            At Sanskar International Academy, we help every learner discover their strengths and ambitions through structured <strong>career counselling</strong> and mentorship programs.
                            From psychometric assessments to personalized guidance, students receive the clarity and confidence they need to choose the right path.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> Aptitude and personality assessments</li>
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> One-on-one counselling and goal-setting</li>
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> Internship and work experience programs</li>
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> University and scholarship guidance</li>
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> Soft skills and employability training</li>
                        </ul>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        {careerCounsellingImage && (
                            <Image src={careerCounsellingImage.imageUrl} alt={careerCounsellingImage.description} width={600} height={400} className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" data-ai-hint={careerCounsellingImage.imageHint} priority unoptimized />
                        )}
                    </motion.div>
                </div>
            </Section>

            <Section id="process" title="Your Child’s Journey Begins Here" subtitle="Simple, transparent, and student-friendly" bgColor="bg-cream">
                <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12">
                    Admissions at Sanskar International Academy are open to all students who value learning, discipline, and holistic growth. We welcome learners from diverse backgrounds and help them seamlessly integrate into our academic community.
                </p>
                <div className="relative max-w-4xl mx-auto">
                    <motion.div className="space-y-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {steps.map((step, index) => (
                            <motion.div key={step.number} className="relative flex items-start gap-6" variants={fadeInUp}>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0 z-10 mt-1 ring-8 ring-muted/50">
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{step.title}</h3>
                                    <p className="text-muted-foreground mt-1">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <div className="text-center mt-12">
                    <Button asChild size="lg">
                        <Link href="/contact">Enquire Now</Link>
                    </Button>
                </div>
            </Section>



            <Section id="disclosure" title="Mandatory Disclosure" subtitle="In compliance with CBSE guidelines" bgColor="bg-cream">
                <Card className="card-premium p-8 text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-navy/5 rounded-full">
                            <Check className="h-8 w-8 text-navy" />
                        </div>
                    </div>
                    <CardContent className="p-0 space-y-6">
                        <h3 className="text-xl font-bold font-headline text-navy">Transparency & Compliance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We maintain complete transparency in our operations. All mandatory disclosure documents,
                            including affiliation certificates, safety clearances, and committee details,
                            are available for public viewing throughout the year.
                        </p>
                        <Button asChild size="lg" className="bg-navy hover:bg-navy-dark text-white">
                            <Link href="/mandatory-disclosure">View All Disclosure Documents</Link>
                        </Button>
                    </CardContent>
                </Card>
            </Section>
        </div>
    );
}
