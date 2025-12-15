
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/lib/definitions";
import Image from "next/image";
import { cloudinary } from "@/lib/cloudinary-images";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

const duplicatedImages = (images: string[]) => [...images, ...images];

export function GallerySection({ images = [] }: { images?: string[] }) {
    // Fallback if no images provided
    const displayImages = images.length > 0 ? images : [
        cloudinary.annualFunction[3], // annual-function-3
        cloudinary.infrastructure.building[1], // Fallback/Placeholder
        cloudinary.sportsAchievements[0], // Fallback
        cloudinary.mixPhotos[0], // Fallback
        cloudinary.mixPhotos[1]  // Fallback
    ];

    const finalImages = duplicatedImages(displayImages);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <section id="life" className="section-xl bg-white">
            <div className="container mx-auto max-w-7xl px-4">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-navy">Life at SIA — Gallery</h2>
                    <p className="mt-4 text-lg text-muted-foreground">A few moments from our campus activities.</p>
                </motion.div>



                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full overflow-hidden relative"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                >
                    <motion.div
                        className="flex"
                        animate={{
                            x: ['-100%', '0%'],
                            transition: {
                                ease: 'linear',
                                duration: 40,
                                repeat: Infinity,
                            },
                        }}
                    >
                        {finalImages.map((imageUrl, index) => (
                            <div key={`gallery-${index}`} className="flex-shrink-0 w-[300px] p-2" onClick={() => setLightboxOpen(true)}>
                                <div className="group rounded-xl overflow-hidden relative aspect-[3/4] cursor-pointer">
                                    <Image src={imageUrl}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        sizes="300px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/90 p-2 rounded-full">
                                            <span className="text-navy font-bold text-xs">View</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={finalImages.map(src => ({ src }))}
                />

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button asChild size="lg">
                        <Link href="/gallery">View Full Gallery</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
