
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SchoolHighlight } from "@/lib/definitions";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  viewport: { once: true, amount: 0.3 }
};

interface PrincipalMessageProps {
    principalMessage: SchoolHighlight | null;
}

export function PrincipalMessage({ principalMessage }: PrincipalMessageProps) {
  const isLoading = !principalMessage;

  return (
    <section id="principal" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="initial"
          whileInView="whileInView"
          variants={fadeInUp}
        >
          <div className="md:order-2">
             <div className="rounded-full shadow-lg overflow-hidden w-64 h-64 md:w-96 md:h-96 mx-auto">
                {isLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                        src={principalMessage.linkUrl!}
                        alt={principalMessage.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        data-ai-hint="woman portrait"
                    />
                )}
            </div>
          </div>
          <div className="space-y-4 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
              A Word from Our Principal
            </h2>
            <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10" />
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-lg text-muted-foreground italic z-10 relative">
                        “{principalMessage.description}”
                    </p>
                )}
            </div>
            <div className="pt-2">
                {isLoading ? (
                    <>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </>
                ) : (
                    <>
                        <p className="font-bold text-lg font-handwritten text-primary">{principalMessage.title}</p>
                        <p className="text-muted-foreground">Principal, SIA Khargone</p>
                    </>
                )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
