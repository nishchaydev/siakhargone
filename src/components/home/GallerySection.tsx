
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/lib/definitions";
import Image from "next/image";

const duplicatedImages = (images: string[]) => [...images, ...images];

export function GallerySection({ images = [] }: { images?: string[] }) {
    // Fallback if no images provided
    const displayImages = images.length > 0 ? images : [
        "/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2323.webp",
        "/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2342.webp",
        "/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2410.webp",
        "/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2419.webp",
        "/siakhargone-content/album/photo-for-uploads/annual-function/dsc_2431.webp"
    ];

    const finalImages = duplicatedImages(displayImages);

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
                            <div key={`gallery-${index}`} className="flex-shrink-0 w-[300px] p-2">
                                <div className="group rounded-xl overflow-hidden relative aspect-[3/4]">
                                    <Image src={imageUrl}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        sizes="300px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

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
