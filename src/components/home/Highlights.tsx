
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SchoolHighlight } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";

interface HighlightsProps {
  highlights: SchoolHighlight[];
  isLoading: boolean;
}

export function Highlights({ highlights, isLoading }: HighlightsProps) {

  const displayData = highlights.filter(h => h.icon === 'carousel').sort((a, b) => (a.order || 0) - (b.order || 0));
  const slides = [...displayData, ...displayData];

  return (
    <section id="highlights" className="py-28 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">School Highlights</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Celebrating our achievements and milestones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group"
        >
          <div
            className="relative w-full overflow-hidden"
          >
            <motion.div
              className="flex"
              animate={{
                x: ['-100%', '0%'],
                transition: {
                  ease: 'linear',
                  duration: 20,
                  repeat: Infinity,
                },
              }}
            >
              {slides.map((slide, index) => (
                <div key={slide.id + index} className="relative flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src={slide.linkUrl!}
                      alt={slide.title}
                      data-ai-hint={slide.icon}
                      fill
                      className="object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">{slide.title}</h3>
                      <p className="text-white/80 mt-1">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild size="lg">
            <Link href="/about#highlights">View All Highlights</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
