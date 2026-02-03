"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { MotionDiv } from '@/components/common/Motion';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    viewport: { once: true, amount: 0.2 }
};

interface AboutOverviewProps {
    content: string;
    schoolImage?: {
        src: string | null;
        alt: string;
    } | null;
}

export function AboutOverview({ content, schoolImage }: AboutOverviewProps) {
    return (
        <Section id="overview" isFirstSection={true}>
            <div className="grid md:grid-cols-2 gap-12 items-start relative">
                <MotionDiv variants={fadeInUp} className="prose lg:prose-lg max-w-none text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: content }} />

                    <div className="mt-6 p-4 bg-amber-50 border-l-4 border-gold rounded-r-lg">
                        <p className="text-navy font-medium">
                            Looking for the top-rated education in the city? <a href="/best-school-in-khargone" className="text-royal-blue underline hover:text-gold transition-colors">See why SIA is rated the Best School in Khargone.</a>
                        </p>
                    </div>
                </MotionDiv>
                <MotionDiv variants={fadeInUp} className="sticky top-24">
                    {schoolImage?.src && (
                        <Image src={schoolImage.src}
                            alt={schoolImage.alt}
                            width={600} height={400}
                            className="rounded-full aspect-square shadow-lg w-full object-cover border-4 border-white dark:border-gray-800"
                            priority />
                    )}
                </MotionDiv>
            </div>
        </Section>
    );
}
