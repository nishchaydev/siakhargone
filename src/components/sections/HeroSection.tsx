
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

export default function HeroSection({ data, stats }: { data: any, stats?: any[] }) {
    // Fallback if no stats provided
    const displayStats = stats || [
        { value: "2500+", label: "Students" },
        { value: "100%", label: "Results" },
        { value: "50+", label: "Awards" },
        { value: "30+", label: "Sports & Activities" }
    ];

    return (
        <section className="relative w-full bg-navy py-0">
            <div className="w-full px-0">

                {/* Bento Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 min-h-[85vh]">

                    {/* Main Hero Block (Left - Large) */}
                    <div className="lg:col-span-8 relative shadow-2xl group bg-navy-dark overflow-hidden">
                        {data.video?.includes("youtube.com") || data.video?.includes("youtu.be") ? (
                            <iframe
                                className="absolute inset-0 w-full h-full object-cover scale-[1.35] pointer-events-none opacity-90 blur-[1px]"
                                src={`https://www.youtube.com/embed/${data.video.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${data.video.split('v=')[1]?.split('&')[0]}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 blur-[1px]">
                                <source src={data.video ?? "/media/hero-loop.mp4"} type="video/mp4" />
                            </video>
                        )}
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
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-xl"
                                style={{ textShadow: "0 6px 24px rgba(12,46,83,0.35)" }}
                            >
                                {data.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="mt-6 text-lg md:text-xl text-white/90 max-w-lg mb-8"
                            >
                                {data.subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="flex flex-wrap gap-4"
                            >
                                <a href={data.cta1Href} className="bg-siaOrange text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-siaOrange/90 transition-all transform hover:-translate-y-1">
                                    Enquire Now
                                </a>
                                <a href={data.cta2Href} className="flex items-center gap-3 text-white font-medium hover:text-gold transition-colors px-4 py-3 group">
                                    <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-gold grp-hover:border-gold transition-all duration-300">
                                        <Play className="w-5 h-5 fill-white group-hover:fill-navy-dark transition-colors" />
                                    </span>
                                    Watch Video
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side Stack */}
                    <div className="lg:col-span-4 flex flex-col gap-1">

                        {/* Top Right - Students */}
                        <div className="relative h-[45%] overflow-hidden shadow-xl group bg-navy-dark">
                            <Image
                                src={data.grid?.[0] || "https://picsum.photos/seed/hero-top/600/600"}
                                alt="Students interacting"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="font-display text-xl">Holistic Growth</p>
                            </div>
                        </div>

                        {/* Bottom Right - Sports/Activity */}
                        <div className="relative h-[55%] overflow-hidden shadow-xl group bg-navy-dark">
                            <Image
                                src={data.grid?.[2] || "https://picsum.photos/seed/hero-bot/600/600"}
                                alt="Sports activity"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-6 right-6 text-white text-right">
                                <p className="font-handwriting text-3xl text-gold mb-1">Sanskar</p>
                                <p className="font-display text-2xl font-bold">Beyond Academics</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="relative z-20 -mt-16 mx-auto w-[95%] card-premium p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
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
