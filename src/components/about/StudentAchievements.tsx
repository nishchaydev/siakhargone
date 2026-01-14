"use client";

import { Award, Medal, Palette, Globe, LucideIcon } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionDiv } from '@/components/common/Motion';

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

interface AchievementItem {
    icon: string;
    category: string;
    title: string;
    description: string;
}

const iconMap: { [key: string]: LucideIcon } = {
    Award,
    Medal,
    Palette,
    Globe
};

interface StudentAchievementsProps {
    items: AchievementItem[];
}

export function StudentAchievements({ items }: StudentAchievementsProps) {
    return (
        <Section id="achievements" title="Student Achievements" subtitle="Celebrating our students' success stories">
            <MotionDiv
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {items.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    return (
                        <MotionDiv key={item.title} variants={fadeInUp}>
                            <Card className="h-full card-premium hover:shadow-2xl transition-all duration-300">
                                <CardHeader className="flex-row items-start gap-4">
                                    <MotionDiv
                                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                                    >
                                        {Icon && <Icon className="h-6 w-6 hover:scale-110 transition-transform duration-300" />}
                                    </MotionDiv>
                                    <div>
                                        <p className="text-sm font-semibold text-primary">{item.category}</p>
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </MotionDiv>
                    )
                })}
            </MotionDiv>
        </Section>
    );
}
