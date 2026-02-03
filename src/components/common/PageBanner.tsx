"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageBannerProps {
    title: string;
    subtitle?: string;
    image?: string;
}

export default function PageBanner({
    title,
    subtitle,
    image = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
}: PageBannerProps) {
    return (
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gold/90 font-medium max-w-2xl mx-auto tracking-wide"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
