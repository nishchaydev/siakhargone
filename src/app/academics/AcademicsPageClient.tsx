
"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/card";
import { Baby, BookOpen, School, FlaskConical, Library, MonitorSmartphone, Palette, LucideIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";

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
    infrastructurePhotos?: string[];
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
    infrastructureImage,
    infrastructurePhotos = []
}: AcademicsPageClientProps) {
    return (
        <div className="bg-grain min-h-screen">
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    // Removed scroll animation to ensure visibility
                    >
                        {curriculumHighlights.map((card, index) => {
                            const Icon = iconMap[card.icon];
                            return (
                                <motion.div key={card.title} variants={fadeInUp} whileHover={{ y: -10, scale: 1.02 }} className="h-full">
                                    <Card className="text-center p-8 h-full card-premium hover:shadow-2xl hover:border-gold/30 transition-all duration-300 relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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

            <Section id="calendar" title="Academic Calendar" subtitle="Stay updated with upcoming events and holidays" bgColor="bg-white">
                <AcademicCalendar />
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
                            <motion.div key={item.title} variants={fadeInUp} whileHover={{ y: -5, scale: 1.02 }} className="h-full">
                                <Card className="p-6 text-center h-full card-premium flex flex-col items-center hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
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

                {infrastructurePhotos && infrastructurePhotos.length > 0 && (
                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                    stopOnInteraction: true,
                                    stopOnMouseEnter: true,
                                })
                            ]}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {infrastructurePhotos.map((photo, index) => (
                                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg group">
                                            <Image src={photo}
                                                alt={`Infrastructure ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>
                )}
            </Section>
        </div>
    );
}
