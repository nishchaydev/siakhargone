
"use client";

import type { Metadata } from 'next';
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/card";
import { Baby, BookOpen, School, FlaskConical, Library, MonitorSmartphone, Palette, LucideIcon } from "lucide-react";

interface ImagePlaceholder {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
}

interface Highlight {
    icon: string;
    title: string;
    description: string;
}

interface AcademicsPageClientProps {
    curriculumHighlights: Highlight[];
    infrastructureItems: Highlight[];
    methodologyImage?: ImagePlaceholder;
    infrastructureImage?: ImagePlaceholder;
}

const iconMap: { [key: string]: LucideIcon } = {
    Baby,
    BookOpen,
    School,
    FlaskConical,
    Library,
    MonitorSmartphone,
    Palette
};

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export default function AcademicsPageClient({
    curriculumHighlights,
    infrastructureItems,
    methodologyImage,
    infrastructureImage
}: AcademicsPageClientProps) {
  return (
    <div>
      <Section 
        id="curriculum" 
        title="Curriculum" 
        subtitle="Balanced learning with global standards" 
        isFirstSection={true}
      >
        <div className="max-w-4xl mx-auto">
            <motion.p 
                className="text-lg text-muted-foreground mb-12 text-center"
                variants={fadeInUp}
            >
              Sanskar International Academy follows a <strong>progressive and integrated curriculum</strong> designed to foster
              academic excellence, creativity, and personal growth. The curriculum is built around inquiry-based learning,
              ensuring students develop analytical, linguistic, and problem-solving skills from early years to senior levels.
            </motion.p>
            
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
              {curriculumHighlights.map((card, index) => {
                const Icon = iconMap[card.icon];
                return(
                    <motion.div key={card.title} variants={fadeInUp}>
                        <Card className="text-center p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full bg-card">
                            <motion.div 
                              className="flex justify-center mb-4"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {Icon && <Icon className="w-8 h-8 hover:scale-110 transition-transform duration-300" />}
                                </div>
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                            <p className="text-muted-foreground text-sm">{card.description}</p>
                        </Card>
                    </motion.div>
                )
              })}
            </motion.div>
        </div>
      </Section>

      <Section 
        id="methodology" 
        title="Methodology" 
        subtitle="Nurturing independent thinkers through experiential learning"
        bgColor="bg-muted/50"
      >
        <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div 
                className="md:col-span-3 prose lg:prose-lg max-w-none text-muted-foreground"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <p>
                    At Sanskar International Academy, we go beyond traditional instruction. Our
                    <strong>student-centered approach</strong> focuses on active learning, inquiry, and creativity.
                    Teachers act as mentors, guiding students to think critically and explore solutions to real-world problems.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Project-based learning with real-world applications.</li>
                    <li>Collaborative classroom discussions and peer learning.</li>
                    <li>Technology-enhanced lessons through smart classrooms.</li>
                    <li>Continuous assessment and constructive feedback system.</li>
                </ul>
            </motion.div>
            <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {methodologyImage && (
                    <Image
                        src={methodologyImage.imageUrl}
                        alt={methodologyImage.description}
                        data-ai-hint={methodologyImage.imageHint}
                        width={500}
                        height={350}
                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                    />
                )}
            </motion.div>
        </div>
      </Section>
      
      <Section id="infrastructure" title="Academic Infrastructure" subtitle="Spaces designed to inspire learning and innovation">
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {infrastructureItems.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                    <motion.div key={item.title} variants={fadeInUp}>
                        <Card className="p-6 text-center h-full bg-card flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    {Icon && <Icon className="h-8 w-8 hover:scale-110 transition-transform duration-300" />}
                                </div>
                            </motion.div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                        </Card>
                    </motion.div>
                )
            })}
        </motion.div>
        
        {infrastructureImage && (
            <motion.div 
                className="mt-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <Image
                    src={infrastructureImage.imageUrl}
                    alt={infrastructureImage.description}
                    data-ai-hint={infrastructureImage.imageHint}
                    width={1200}
                    height={600}
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
            </motion.div>
        )}
      </Section>
    </div>
  );
}
