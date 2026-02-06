"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cloudinary } from "@/lib/cloudinary-images";

interface HeroStat {
    value: string;
    label: string;
}

interface HeroData {
    grid?: string[];
    video?: string;
    sanskrit?: string;
    title: string;
    subtitle: string;
    cta1Href: string;
}

interface HeroSectionProps {
    data: HeroData;
    stats?: HeroStat[];
}

export default function HeroSection({ data, stats }: HeroSectionProps) {
    // Fallback if no stats provided
    const displayStats = stats || [
        { value: "1100+", label: "Students" },
        { value: "50+", label: "Teachers" },
        { value: "10+", label: "Years of Experience" },
        { value: "50+", label: "Awards" }
    ];

    const isExternal = (url: string) => url?.startsWith('http') || url?.startsWith('//');

    return (
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen min-h-[400px] md:min-h-[550px] bg-navy overflow-hidden">
            {/* Background Video/Image Layer */}
            <div className="absolute inset-0 w-full h-full">
                {/* 1. Base Image Layer (LCP Priority) - Always render for immediate paint */}
                <Image
                    src={data.grid?.[0] || cloudinary.infrastructure.building[1]}
                    alt="Sanskar International Academy Campus - Best CBSE School in Khargone"
                    fill
                    className="object-cover opacity-60 z-0"
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                />

                {/* 2. Video Layer (Overlay) */}
                {(() => {
                    const videoSrc = data.video || "";
                    // Generic YouTube ID extraction
                    const getYoutubeId = (url: string) => {
                        if (!url) return "";
                        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                        const match = url.match(regExp);
                        return (match && match[2].length === 11) ? match[2] : "";
                    };

                    let startParam = "";
                    if (videoSrc.startsWith("http")) {
                        try {
                            const urlObj = new URL(videoSrc);
                            startParam = urlObj.searchParams.get("start") || urlObj.searchParams.get("t") || "";
                        } catch (e) {
                            console.warn("Invalid Video URL:", videoSrc, e);
                        }
                    }


                    const videoId = getYoutubeId(videoSrc);

                    if (videoId) {
                        return (
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1${startParam ? `&start=${startParam}` : ''}`}
                                title="YouTube video player"
                                className="absolute inset-0 w-full h-full object-cover scale-[1.10] origin-center pointer-events-none blur-[1px] z-10 border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        );
                    } else if (videoSrc) {
                        // Fallback for direct video links (local or remote MP4)
                        return (
                            <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover blur-[0px] z-10">
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                        );
                    }
                    return null;
                })()}

                {/* Gradient Overlays for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/60 to-transparent z-20"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-dark to-transparent z-20"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-30 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                <div className="w-full max-w-5xl pt-20 md:pt-24 pb-24 md:pb-48"> {/* Increased bottom padding to clear stats bar */}
                    {/* Sanskrit Motto - Hidden on mobile to save space */}
                    {data.sanskrit && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="hidden md:block mb-4"
                        >
                            <span className="text-gold font-headline text-2xl md:text-3xl italic tracking-wide">
                                {data.sanskrit}
                            </span>
                        </motion.div>
                    )}


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 md:mb-8 text-center relative z-20"
                    >
                        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-2 md:mb-4 drop-shadow-2xl text-white block">
                            {(() => {
                                const rawTitle = (data.title || '').trim();
                                if (!rawTitle) return null; // Or return a default

                                const titleParts = rawTitle.split(' ');
                                const mainTitle = titleParts[0];
                                const subTitle = titleParts.slice(1).join(' ');
                                return (
                                    <>
                                        {mainTitle}
                                        {titleParts.length > 1 && (
                                            <span className="font-sans font-bold text-xs sm:text-base md:text-xl lg:text-2xl uppercase tracking-[0.25em] md:tracking-[0.4em] text-light-gold drop-shadow-md block mt-2">
                                                {subTitle}
                                            </span>
                                        )}
                                    </>
                                )
                            })()}
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-sm md:text-xl text-white/90 max-w-3xl mx-auto mb-8 font-light leading-relaxed line-clamp-3 md:line-clamp-none drop-shadow-md"
                    >
                        {data.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 relative z-50"
                    >
                        <Link
                            href={data.cta1Href}
                            target={isExternal(data.cta1Href) ? "_blank" : undefined}
                            rel={isExternal(data.cta1Href) ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center justify-center bg-gold text-navy-dark font-bold px-6 py-3 md:px-10 md:py-4 rounded-full shadow-lg hover:bg-white button-glow btn-magnetic transition-all transform w-full sm:w-auto text-center text-sm md:text-lg"
                        >
                            Enquire Now
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar - Floating at bottom */}
            <div className="absolute bottom-0 w-full z-40 border-t border-white/10 bg-navy-dark/80 backdrop-blur-md">
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 divide-x divide-white/10">  {/* Always 4 cols to save vertical space */}
                        {displayStats.map((stat, idx) => (
                            <div key={idx} className="py-3 md:py-6 px-1 md:px-4 text-center">
                                <div className="text-lg md:text-3xl font-display font-bold text-gold">{stat.value}</div>
                                <p className="text-white/70 text-[10px] md:text-sm uppercase tracking-wider font-medium leading-tight">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
