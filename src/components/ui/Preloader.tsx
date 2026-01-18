"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cloudinary } from "@/lib/cloudinary-images";
import Image from "next/image";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate minimum loading time for the experience
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-32 h-32 md:w-40 md:h-40 mb-4"
            >
                <Image
                    src={cloudinary.schoolLogo || "/logo.png"}
                    alt="SIA Loader"
                    fill
                    className="object-contain"
                />
            </motion.div>

            <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
            </motion.div>
        </motion.div>
    );
}
