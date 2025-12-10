
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { cloudinary } from "@/lib/cloudinary-images";

export default function HeroSection({ data, stats }: { data: any, stats?: any[] }) {
    // Fallback if no stats provided
    const displayStats = stats || [
        { value: "1100+", label: "Students" },
        { value: "50+", label: "Teachers" },
        { value: "10+", label: "Years of Experience" },
        { value: "50+", label: "Awards" }
    ];

    return (
        <section className="relative w-full bg-navy py-0">
            <div className="w-full px-0">

                {/* Bento Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 min-h-[85vh]">

                    {/* Main Hero Block (Left - Large) */}
                    <div className="lg:col-span-8 relative shadow-2xl group bg-navy-dark overflow-hidden">
                        {/* Mobile Background Image (Replaces Video) */}
                        <div className="absolute inset-0 w-full h-full md:hidden bg-navy-dark">
                            <Image src={data.grid?.[0] || cloudinary.infrastructure.building[1]}
                                alt="Hero Background"
                                fill
                                className="object-cover opacity-90"
                                priority
                                unoptimized />
                        </div>

                        {/* Desktop Background: Video or Image */}
                        <div className="absolute inset-0 w-full h-full hidden md:block bg-navy-dark">
                            {data.video && (data.video.includes("youtube.com") || data.video.includes("youtu.be")) ? (
                                <iframe
                                    className="absolute inset-0 w-full h-full object-cover scale-[1.35] pointer-events-none opacity-90 blur-[1px]"
                                    src={`https://www.youtube.com/embed/${data.video.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.video.split('v=')[1]?.split('&')[0]}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&hd=1&vq=hd1080`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="eager"
                                />
                            ) : data.video && !data.video.includes("http") ? (
                                <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 blur-[1px]">
                                    <source src={data.video} type="video/mp4" />
                                </video>
                            ) : (
                                /* Fallback to Image if no video */
                                <Image src={data.grid?.[0] || cloudinary.infrastructure.building[1]}
                                    alt="Hero Background"
                                    fill
                                    className="object-cover opacity-90"
                                    priority unoptimized />
                            )}
                        </div>
                        <div className="absolute inset-0 hero-overlay"></div>
                        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent opacity-90"></div>

                        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 text-white max-w-3xl">
                            {/* Sanskrit Motto */}
                            {data.sanskrit && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-4"
                                >
                                    <span className="text-gold font-headline text-2xl md:text-3xl italic tracking-wide">
                                        {data.sanskrit}
                                    </span>
                                </motion.div>
                            )}

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] drop-shadow-xl !text-white"
                                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
                            >
                                {data.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="mt-6 md:mt-8 text-base md:text-xl !text-white/90 max-w-lg mb-8 md:mb-10 font-light leading-relaxed"
                            >
                                {data.subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full"
                            >
                                <a href={data.cta1Href} className="bg-gold text-navy-dark font-bold px-8 py-3 md:px-10 md:py-4 rounded-full shadow-lg hover:bg-white transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center text-sm md:text-base">
                                    Enquire Now
                                </a>
                                <a href={data.cta2Href} className="flex items-center gap-4 text-white font-medium hover:text-gold transition-colors group w-full sm:w-auto justify-center sm:justify-start">
                                    <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-5 h-5 md:w-6 md:h-6 fill-navy-dark text-navy-dark ml-1" />
                                    </span>
                                    <span className="text-base md:text-lg">Watch Video</span>
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side Stack */}
                    <div className="hidden lg:flex lg:col-span-4 flex-col gap-1">

                        {/* Top Right - Sanskar Beyond Academics (New Image) */}
                        <div className="relative h-[45%] overflow-hidden shadow-xl group bg-navy-dark">
                            <Image src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349472/national-youth-day-2_xqxmhr.webp"
                                alt="Sanskar Beyond Academics"
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-6 right-6 text-white text-right">
                                <p className="font-handwriting text-3xl text-gold mb-1">Sanskar</p>
                                <p className="font-display text-2xl font-bold">Beyond Academics</p>
                            </div>
                        </div>

                        {/* Bottom Right - Holistic Growth (Moved Down) */}
                        <div className="relative h-[55%] overflow-hidden shadow-xl group bg-navy-dark">
                            <Image src={data.grid?.[0] || "https://res.cloudinary.com/dkits80xk/image/upload/v1765349451/annual-function-3_b9mu3t.webp"}
                                alt="Holistic Growth Student Interaction"
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="font-display text-xl">Holistic Growth</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="relative z-20 -mt-8 w-full card-premium rounded-none border-x-0 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
                    {displayStats.map((stat: any, idx: number) => (
                        <div key={idx} className={`text-center ${idx > 0 ? "pl-8" : ""}`}>
                            <h3 className="text-3xl md:text-4xl font-display font-bold text-gold mb-1">{stat.value}</h3>
                            <p className="text-navy font-medium uppercase tracking-wider text-xs md:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
