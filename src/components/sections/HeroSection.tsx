"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cloudinary } from "@/lib/cloudinary-images";

export default function HeroSection({ data, stats }: { data: any, stats?: any[] }) {
    // Fallback if no stats provided
    const displayStats = stats || [
        { value: "1100+", label: "Students" },
        { value: "50+", label: "Teachers" },
        { value: "10+", label: "Years of Experience" },
        { value: "50+", label: "Awards" }
    ];

    const isExternal = (url: string) => url?.startsWith('http') || url?.startsWith('//');

    return (
        <section className="relative w-full h-[85vh] md:h-screen min-h-[550px] bg-navy overflow-hidden">
            {/* Background Video/Image Layer */}
            <div className="absolute inset-0 w-full h-full">
                {data.video && (data.video.includes("youtube.com") || data.video.includes("youtu.be")) ? (
                    <iframe
                        className="absolute inset-0 w-full h-full object-cover scale-[4] md:scale-110 origin-center pointer-events-none opacity-60 blur-[1px]"
                        src={`https://www.youtube-nocookie.com/embed/${data.video.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.video.split('v=')[1]?.split('&')[0]}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&start=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="eager"
                    />
                ) : data.video && !data.video.includes("http") ? (
                    <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[0px]">
                        <source src={data.video} type="video/mp4" />
                    </video>
                ) : (
                    /* Fallback to Image if no video */
                    <Image src={data.grid?.[0] || cloudinary.infrastructure.building[1]}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                        sizes="100vw"
                    />
                )}
                {/* Gradient Overlays for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-dark to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
                <div className="max-w-4xl pt-16 md:pt-20 pb-40 md:pb-24"> {/* Added pb-40 (mobile) and pb-24 (desktop) for clearance */}
                    {/* Sanskrit Motto - Hidden on mobile to save space */}
                    {data.sanskrit && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="hidden md:block mb-6"
                        >
                            <span className="text-gold font-headline text-3xl italic tracking-wide">
                                {data.sanskrit}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] drop-shadow-xl text-white mb-3 md:mb-6"
                    >
                        {data.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-base md:text-2xl text-white/90 max-w-2xl mb-6 md:mb-10 font-light leading-relaxed line-clamp-3 md:line-clamp-none"
                    >
                        {data.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6"
                    >
                        <Link
                            href={data.cta1Href}
                            target={isExternal(data.cta1Href) ? "_blank" : undefined}
                            rel={isExternal(data.cta1Href) ? "noopener noreferrer" : undefined}
                            className="bg-gold text-navy-dark font-bold px-6 py-3 md:px-10 md:py-4 rounded-full shadow-lg hover:bg-white button-glow btn-magnetic transition-all transform w-full sm:w-auto text-center text-sm md:text-lg"
                        >
                            Enquire Now
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar - Floating at bottom */}
            <div className="absolute bottom-0 w-full z-20 border-t border-white/10 bg-navy-dark/80 backdrop-blur-md">
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 divide-x divide-white/10">  {/* Always 4 cols to save vertical space */}
                        {displayStats.map((stat: any, idx: number) => (
                            <div key={idx} className="py-3 md:py-6 px-1 md:px-4 text-center">
                                <h3 className="text-lg md:text-3xl font-display font-bold text-gold">{stat.value}</h3>
                                <p className="text-white/70 text-[10px] md:text-sm uppercase tracking-wider font-medium leading-tight">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
