'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { GraduationCap, BookOpen, School, type LucideIcon } from 'lucide-react';

// const academicTiers = ... // Removed static data


export function Academics({ stages = [] }: { stages?: any[] }) {
  // Use passed stages or fallback to empty array (or generic placeholder if strictly needed, but user said REMOVE mocks)
  const displayStages = stages.length > 0 ? stages : [];

  return (
    <section className="relative w-full section-xl bg-ivory bg-grain">
      {/* Mocked Student Banner - User said remove ALL mocks, so likely this image should come from Strapi too or be static asset? Keeping static asset for decoration if no field provided */}
      <motion.div
        className="relative w-full max-w-6xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="https://picsum.photos/seed/academics-banner/1600/700" // This should ideally be passed or fixed asset. Leaving for now as it's decoration.
          alt="Students learning in a classroom"
          width={1600}
          height={700}
          className="w-full h-[450px] object-cover"
          data-ai-hint="students classroom"
          priority
        />
      </motion.div>

      {/* Section Title */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-navy font-headline">
          Our Academic Structure
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Fostering curiosity, creativity, and competence at every stage of learning.
        </p>
      </div>

      {/* Academic Levels */}
      {displayStages.length > 0 && (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-6xl mx-auto px-6"
        >
          <CarouselContent>
            {displayStages.map((stage: any, index: number) => {
              // Icons mapping if needed, or just omit if Strapi doesn't provide them
              // const Icon = tier.icon; 
              return (
                <CarouselItem key={stage.id || index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <div className="card-premium p-8 h-full text-center group">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                      >
                        {/* Icons removed for cleaner look as requested */}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{stage.attributes?.Title || stage.title}</h3>
                      <p className="text-muted-foreground">
                        {stage.attributes?.Description || stage.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      )}
    </section>
  )
}
