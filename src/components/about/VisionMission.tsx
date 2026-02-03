"use client";

import { Heart, Sparkles, ShieldCheck, Rocket } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/card";
import { MotionDiv, MotionLi } from '@/components/common/Motion';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    viewport: { once: true, amount: 0.2 }
};

export function VisionMission() {
    return (
        <>
            <Section id="vision" title="Our Vision & Motto" subtitle="Our guiding promise to our students.">
                <MotionDiv
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainer}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <MotionDiv variants={fadeInUp}>
                        <Card className="p-8 h-full card-premium">
                            <h3 className="text-2xl font-bold text-primary mb-2">Our Vision</h3>
                            <p className="text-lg text-muted-foreground">To shape future citizens who combine intellectual brilliance with cultural depth and moral strength.</p>
                        </Card>
                    </MotionDiv>
                    <MotionDiv variants={fadeInUp}>
                        <Card className="p-8 h-full card-premium">
                            <h3 className="text-2xl font-bold text-primary mb-2">Motto</h3>
                            <p className="text-lg text-muted-foreground">“विद्या ददाति विनयंम्”</p>
                        </Card>
                    </MotionDiv>
                </MotionDiv>
            </Section>

            <Section id="mission" title="Our Mission" subtitle="How we turn our vision into reality." bgColor="bg-muted">
                <MotionDiv
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainer}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                        <MotionLi variants={fadeInUp} className="flex items-start gap-4">
                            <MotionDiv
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <Heart className="h-6 w-6 text-primary" />
                            </MotionDiv>
                            <span className="text-muted-foreground pt-3">To provide holistic education that nurtures the mind, body, and soul.</span>
                        </MotionLi>
                        <MotionLi variants={fadeInUp} className="flex items-start gap-4">
                            <MotionDiv
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <Sparkles className="h-6 w-6 text-primary" />
                            </MotionDiv>
                            <span className="text-muted-foreground pt-3">To create an environment that encourages curiosity, creativity, and compassion.</span>
                        </MotionLi>
                        <MotionLi variants={fadeInUp} className="flex items-start gap-4">
                            <MotionDiv
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </MotionDiv>
                            <span className="text-muted-foreground pt-3">To uphold discipline, respect, and self-reliance as the cornerstones of student life.</span>
                        </MotionLi>
                        <MotionLi variants={fadeInUp} className="flex items-start gap-4">
                            <MotionDiv
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <Rocket className="h-6 w-6 text-primary" />
                            </MotionDiv>
                            <span className="text-muted-foreground pt-3">To empower learners with the confidence to face challenges and the humility to serve society.</span>
                        </MotionLi>
                    </ul>
                </MotionDiv>
            </Section>
        </>
    );
}
