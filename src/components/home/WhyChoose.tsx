
"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Trophy, Users } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/card";

const features = [
    {
        icon: Lightbulb,
        title: "Innovative Curriculum",
        description: "We blend CBSE standards with inquiry-based learning to spark curiosity and critical thinking.",
    },
    {
        icon: Users,
        title: "Expert Mentorship",
        description: "Our dedicated faculty act as mentors, guiding each child’s unique academic and personal journey.",
    },
    {
        icon: Shield,
        title: "Safe & Nurturing",
        description: "A secure, inclusive environment where every student feels valued, heard, and encouraged to grow.",
    },
    {
        icon: Trophy,
        title: "Holistic Excellence",
        description: "Beyond grades, we focus on sports, arts, and leadership to shape well-rounded individuals.",
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
            title="Why Choose SIA?"
            subtitle="Defining excellence in education through care and innovation."
            bgColor="bg-cream"
        >
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div key={feature.title} variants={fadeInUp}>
                            <Card className="text-center p-8 h-full card-premium hover:-translate-y-2 transition-transform duration-300">
                                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-royal-blue/10 text-royal-blue mb-6">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-display text-royal-blue-dark mb-3">
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
        </Section>
    );
}
