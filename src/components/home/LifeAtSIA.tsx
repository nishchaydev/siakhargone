
"use client";

import { Section } from "@/components/common/Section";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cloudinary } from "@/lib/cloudinary-images";


interface LifeAtSIAProps {
    images?: {
        assembly?: string;
        library?: string;
        labs?: string;
        sports?: string;
    };
}

export const LifeAtSIA = ({ images }: LifeAtSIAProps) => {
    // Fallback to static if dynamic props not provided (or empty)
    const lifeImages = [
        {
            src: images?.assembly || cloudinary.sessionStart[0],
            alt: "Morning Assembly",
            caption: "Morning Assembly",
            size: "col-span-2 md:col-span-2 row-span-1 md:row-span-2"
        },
        {
            src: images?.library || cloudinary.infrastructure.library[0],
            alt: "Library Time",
            caption: "Library & Research",
            size: "col-span-1"
        },
        {
            src: images?.labs || cloudinary.lab.computer[0],
            alt: "Computer Lab",
            caption: "Innovation Labs",
            size: "col-span-1"
        },
        {
            src: images?.sports || cloudinary.sportsAchievements[2],
            alt: "Sports Complex",
            caption: "Sports & Fitness",
            size: "col-span-2 md:col-span-2",
            className: "object-top"
        }
    ];

    return (
        <Section id="life-at-sia" className="bg-white">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                    <span className="text-gold-dark font-bold tracking-wider uppercase text-sm">Experience</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-navy">
                        Life at <span className="text-gold-dark">SIA</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl">
                        A vibrant ecosystem where learning extends beyond classrooms. From morning prayers to evening sports, every moment is designed to inspire.
                    </p>
                </div>
                <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white group" asChild>
                    <Link href="/gallery">
                        View Full Gallery <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {lifeImages.map((img, index) => (
                    <motion.div
                        key={index}
                        className={`relative rounded-2xl overflow-hidden group ${img.size}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${img.className || ''}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm font-bold uppercase tracking-wider">{img.caption}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
