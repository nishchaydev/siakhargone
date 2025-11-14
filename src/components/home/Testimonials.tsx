
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@/lib/definitions";
import { Quote } from "lucide-react";

interface TestimonialsProps {
    testimonials: Testimonial[];
    isLoading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  },
};

export function Testimonials({ testimonials, isLoading }: TestimonialsProps) {

  const displayTestimonials = testimonials.slice(0, 5);

  return (
    <section 
        className="py-16 md:py-24 bg-muted"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C27A12' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Parent Voices</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stories of success and satisfaction from our community.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className={`
                ${index === 3 ? 'lg:col-start-2' : ''}
                ${index > 2 ? 'sm:col-span-1' : ''}
                ${index === 0 ? 'sm:col-span-1 lg:row-span-1' : ''}
                ${index === 1 ? 'sm:col-span-1 lg:row-span-1' : ''}
                ${index === 2 ? 'sm:col-span-1 lg:row-span-1' : ''}
              `}>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <Skeleton className="w-8 h-8 rounded-full mb-4" />
                  <div className="space-y-2 mb-6 flex-grow w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-14 h-14 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className={`
                  ${index === 3 ? 'lg:col-start-2' : ''}
                  ${index > 2 ? 'sm:col-span-1' : 'sm:col-span-1'}
                  h-full
                `}
              >
                <Card className="h-full rounded-xl shadow-lg transform transition-transform hover:scale-105 bg-card flex flex-col">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center flex-grow">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.relation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
