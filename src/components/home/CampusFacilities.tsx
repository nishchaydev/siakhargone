
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link as LinkIcon, MoveRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const facilities = [
    {
        title: "Smart Classrooms",
        description: "Tech-enabled learning spaces.",
        image: "/siakhargone-content/Album/Photo For Uploads/Lab/Computer/Computer Lab.webp",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        title: "Sports Complex",
        description: "Professional tracks & courts.",
        image: "/siakhargone-content/Album/Photo For Uploads/Sports & Achivements/1.webp",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Science Labs",
        description: "State-of-the-art equipment.",
        image: "/siakhargone-content/Album/Photo For Uploads/Lab/Chemistry/Chemistry Lab 1.webp",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Library",
        description: "A hub of knowledge.",
        image: "/siakhargone-content/Album/Photo For Uploads/Library/lab1.webp",
        className: "md:col-span-2 md:row-span-1",
    },
];

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export function CampusFacilities() {
    return (
        <Section
            id="campus"
            title="World-Class Campus"
            subtitle="An environment designed to inspire and empower."
        >
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
                {facilities.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className={`relative group rounded-3xl overflow-hidden shadow-lg ${item.className}`}
                        variants={fadeInScale}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-8">
                            <h3 className="text-2xl font-bold font-display text-yellow-400 drop-shadow-md">{item.title}</h3>
                            <p className="text-gray-100 mt-1 drop-shadow-sm font-medium">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Button asChild variant="outline" size="lg" className="rounded-full border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-all">
                    <Link href="/about">
                        Explore Our Campus <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </Section>
    );
}
