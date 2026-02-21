
"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card } from "@/components/ui/card";
import { Baby, BookOpen, School, FlaskConical, Library, MonitorSmartphone, Palette, LucideIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { AcademicStagesTabs } from "@/components/academics/AcademicStagesTabs";

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
    infrastructureItems: Highlight[];
    methodologyImage?: ImagePlaceholder;
    infrastructureImage?: ImagePlaceholder;
    infrastructurePhotos?: string[];
    bannerImage?: string;
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

// ... (staggerContainer and fadeInUp remain same, skipping for brevity in replacement context if possible, but replace_file_content is precise)
// To avoid strict matching issues with large blocks, I will target the Props interface and the component signature separately or carefully.

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


import PageBanner from "@/components/common/PageBanner";

export default function AcademicsPageClient({
    infrastructureItems,
    methodologyImage,
    infrastructureImage,
    infrastructurePhotos = [],
    bannerImage = "https://res.cloudinary.com/dkits80xk/image/upload/v1770866540/ba5fa378-c98b-4e8f-a4ec-bd5db243929f.png"
}: AcademicsPageClientProps) {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Academics"
                subtitle="Excellence in Education. Rooted in Values."
                image={bannerImage}
                objectPosition="12%"
                objectFit="cover"
            />
            <Section
                id="curriculum"
                title="Curriculum & Stages"
                subtitle="A comprehensive learning journey from Foundation to Senior Secondary"
                isFirstSection={true}
            >
                <div className="mb-12 max-w-3xl mx-auto text-center">
                    <motion.p
                        className="text-lg text-muted-foreground"
                        variants={fadeInUp}
                    >
                        Sanskar International Academy follows the <strong>CBSE curriculum</strong>, enriched with innovative teaching methodologies.
                        We believe in a student-centric approach that balances academic rigor with creative exploration.
                    </motion.p>
                </div>

                <AcademicStagesTabs />
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
