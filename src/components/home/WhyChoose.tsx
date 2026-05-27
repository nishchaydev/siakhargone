
"use client";

import { motion } from "framer-motion";
import { useAccessibleAnimation } from "@/hooks/use-accessible-animation";
import { Globe, Shield, Building2, Users } from "lucide-react";
import { Section } from "@/components/common/Section";

const features = [
    {
        icon: Users,
        title: "Qualified CBSE Faculty",
        description: "Experienced educators who understand the CBSE curriculum and mentor students for board exam success.",
    },
    {
        icon: Globe,
        title: "English-Medium Instruction",
        description: "A strict focus on English fluency to prepare students for global opportunities and higher education.",
    },
    {
        icon: Shield,
        title: "Discipline & Values",
        description: "We prioritize character building, manners, and discipline alongside academic excellence.",
    },
    {
        icon: Building2,
        title: "Infrastructure & Safety",
        description: "Secure 4-acre campus with modern labs, library, sports complex, and GPS-enabled transport.",
    },
];

export function WhyChoose() {
    const { safeInitial, safeTransition } = useAccessibleAnimation();

    return (
        <Section
            id="why-choose"
            title="Why Parents Choose Sanskar International Academy"
            subtitle="Defining excellence in education through care and innovation."
            bgColor="bg-white"
            className="relative overflow-hidden py-12 md:py-16"
        >
            <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Sanskar International Academy is one of the leading CBSE English-medium schools in Khargone, known for disciplined academics, modern infrastructure, and holistic student development.
                </p>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-bl-full -mr-20 -mt-20 z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-tr-full -ml-10 -mb-10 z-0 pointer-events-none" />

            {/* Changed from 4-col card grid to horizontal list with numbers — 
                breaks the repeated 4-col pattern (AtAGlance + WhyChoose + DigitalCampus) 
                per design-taste §4.7 Section-Layout-Repetition Ban */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 relative z-10">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={feature.title}
                            initial={safeInitial({ opacity: 0, y: 16 })}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={safeTransition({ duration: 0.4, delay: index * 0.08 })}
                            className="flex items-start gap-5 p-5 rounded-2xl hover:bg-navy/[0.02] transition-colors duration-200 group"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy group-hover:bg-gold/10 group-hover:text-gold-dark transition-colors duration-200">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold font-display text-navy leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
}
