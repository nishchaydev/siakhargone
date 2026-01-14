"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/components/common/Motion';

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

interface PrincipalMessageProps {
    messageData: MessageData | null;
    isLoading?: boolean;
    title?: string;
    subtitle?: string;
    variant?: 'principal' | 'chairman';
}

export function LeadershipMessage({ messageData, isLoading, title, subtitle, variant = 'principal' }: PrincipalMessageProps) {
    return (
        <Section id={variant} title={title || "A Word from Our Principal"} subtitle={subtitle || "Guidance from our academic leader"} bgColor={variant === 'chairman' ? 'bg-muted' : undefined}>
            <MotionDiv
                className="grid md:grid-cols-2 gap-12 items-start"
                initial="initial"
                whileInView="whileInView"
                variants={fadeInUp}
            >
                <div className={variant === 'principal' ? "md:order-2" : ""}>
                    <div className="relative aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 max-w-sm mx-auto">
                        {isLoading || !messageData ? (
                            <Skeleton className="w-full h-full" />
                        ) : (
                            messageData.image && (
                                <Image src={messageData.image}
                                    alt={messageData.name}
                                    width={400}
                                    height={533}
                                    className={`w-full h-full object-cover ${variant === 'chairman' ? 'scale-110 transform' : ''}`} />
                            )
                        )}
                    </div>
                </div>
                <div className={`space-y-6 ${variant === 'principal' ? "md:order-1" : ""}`}>
                    {isLoading || !messageData ? (
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
                                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-primary/10" />
                                <div
                                    className="prose text-lg text-muted-foreground relative z-10 italic"
                                    dangerouslySetInnerHTML={{ __html: messageData.message }}
                                />
                            </div>
                            <div className="pt-4 border-t">
                                <p className="font-bold text-xl text-primary">{messageData.name}</p>
                                <p className="text-muted-foreground font-medium">{messageData.role}</p>
                            </div>
                        </>
                    )}
                </div>
            </MotionDiv>
        </Section>
    );
}
