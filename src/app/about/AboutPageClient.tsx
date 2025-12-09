
"use client";

import Image from "next/image";
import { Heart, Award, Medal, Palette, Globe, Sparkles, ShieldCheck, Rocket, Quote, LucideIcon, BookOpen, BrainCircuit, Trophy } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv, MotionLi } from '@/components/common/Motion';
import dynamic from 'next/dynamic';

const Stats = dynamic(() => import('@/components/home/Stats').then(mod => mod.Stats), {
    loading: () => <Skeleton className="h-[280px] w-full" />,
    ssr: false,
});

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

interface MessageData {
    name: string;
    role: string;
    message: string;
    image: string | null;
}

interface AchievementItem {
    icon: string;
    category: string;
    title: string;
    description: string;
}

interface AboutPageClientProps {
    principalMessage: MessageData | null;
    chairmanMessage: MessageData | null;
    achievementItems: AchievementItem[];
    statItems?: any[];
    schoolImage: {
        src: string | null;
        alt: string;
    } | null;
    aboutContent?: string | null;
    isLoading: boolean;
}

const iconMap: { [key: string]: LucideIcon } = {
    Award,
    Medal,
    Palette,
    Globe
};

export default function AboutPageClient({ principalMessage, chairmanMessage, achievementItems, statItems, schoolImage, aboutContent, isLoading }: AboutPageClientProps) {

    return (
        <div className="bg-grain min-h-screen">
            <Section id="overview" title="About Sanskar International Academy" subtitle="Where Knowledge Meets Values" isFirstSection={true}>
                <div className="grid md:grid-cols-2 gap-12 items-center relative">
                    <MotionDiv variants={fadeInUp} className="prose lg:prose-lg max-w-none text-muted-foreground">
                        {aboutContent ? (
                            <div className="whitespace-pre-line">
                                {aboutContent}
                            </div>
                        ) : (
                            // Fallback or empty if not provided. User requested NO MOCKS, so we show what we have.
                            <p>Content is loading or not available.</p>
                        )}
                    </MotionDiv>
                    <MotionDiv variants={fadeInUp}>
                        {schoolImage?.src && (
                            <Image
                                src={schoolImage.src}
                                alt={schoolImage.alt}
                                width={600} height={400}
                                className="rounded-lg shadow-lg"
                                priority
                            />
                        )}
                    </MotionDiv>
                </div>
            </Section>

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

            <Section id="principal" title="A Word from Our Principal" subtitle="Guidance from our academic leader">
                <MotionDiv
                    className="grid md:grid-cols-2 gap-12 items-center"
                    initial="initial"
                    whileInView="whileInView"
                    variants={fadeInUp}
                >
                    <div className="md:order-2">
                        <div className="rounded-full shadow-lg overflow-hidden w-64 h-64 md:w-96 md:h-96 mx-auto">
                            {isLoading || !principalMessage ? (
                                <Skeleton className="w-full h-full" />
                            ) : (
                                principalMessage.image && (
                                    <Image
                                        src={principalMessage.image}
                                        alt={principalMessage.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="space-y-4 md:order-1">
                        {isLoading || !principalMessage ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-6 w-48 mt-4" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10" />
                                    <p className="text-lg text-muted-foreground italic z-10 relative">
                                        “{principalMessage.message}”
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <p className="font-bold text-lg text-primary">{principalMessage.name}</p>
                                    <p className="text-muted-foreground">{principalMessage.role}</p>
                                </div>
                            </>
                        )}
                    </div>
                </MotionDiv>
            </Section>

            <Section id="chairman" title="Our Chairman's Vision" subtitle="Guiding with purpose and values" bgColor="bg-muted">
                <MotionDiv
                    className="grid md:grid-cols-2 gap-12 items-center"
                    initial="initial"
                    whileInView="whileInView"
                    variants={fadeInUp}
                >
                    <div>
                        <div className="rounded-full shadow-lg overflow-hidden w-64 h-64 md:w-96 md:h-96 mx-auto">
                            {isLoading || !chairmanMessage ? (
                                <Skeleton className="w-full h-full" />
                            ) : (
                                chairmanMessage.image && (
                                    <Image
                                        src={chairmanMessage.image}
                                        alt={chairmanMessage.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {isLoading || !chairmanMessage ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-6 w-48 mt-4" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10" />
                                    <p className="text-lg text-muted-foreground italic z-10 relative">
                                        “{chairmanMessage.message}”
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <p className="font-bold text-lg text-primary">{chairmanMessage.name}</p>
                                    <p className="text-muted-foreground">{chairmanMessage.role}</p>
                                </div>
                            </>
                        )}
                    </div>
                </MotionDiv>
            </Section>

            <Section id="achievements" title="Student Achievements" subtitle="Celebrating our students' success stories">
                <MotionDiv
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {achievementItems.map((item, index) => {
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

            <Stats stats={statItems} />

        </div>
    );
}
