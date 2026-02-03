
"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Trophy, Users } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/card";

const features = [
    {
        icon: Users,
        title: "Qualified CBSE Faculty",
        description: "Experienced educators who understand the CBSE curriculum and mentor students for board exam success.",
    },
    {
        icon: Lightbulb,
        title: "English-Medium Instruction",
        description: "A strict focus on English fluency to prepare students for global opportunities and higher education.",
    },
    {
        icon: Shield,
        title: "Discipline & Values",
        description: "We prioritize character building, manners, and discipline alongside academic excellence.",
    },
    {
        icon: Trophy,
        title: "Infrastructure & Safety",
        description: "Secure 4-acre campus with modern labs, library, sports complex, and GPS-enabled transport.",
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function WhyChoose() {
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

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div key={feature.title} variants={fadeInUp}>
                            <Card className="text-center p-6 md:p-8 h-full card-premium border-gray-100 shadow-none hover:shadow-lg bg-white">
                                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-navy/5 text-navy mb-6 group-hover:bg-gold/10 group-hover:text-gold-dark transition-colors duration-300">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-display text-navy mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div
                className="max-w-4xl mx-auto text-center mt-8 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <p className="text-lg font-medium text-navy/80 italic">
                    "Sanskar International Academy aligns with these expectations, which is why many parents consider it among the leading CBSE English-medium schools in Khargone."
                </p>
            </motion.div>
        </Section>
    );
}
